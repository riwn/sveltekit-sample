import { superValidate, message } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';

import { users, userId, userSchema } from '../lib/users';
import type { Actions, PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

const schema = userSchema.extend({
	id: userSchema.shape.id.optional()
});

export const load: PageServerLoad = async ({ url }) => {
	// READ user
	// For simplicity, use the id query parameter instead of a route.
	const id = url.searchParams.get('id');
	const user = id ? users.find((u) => u.id == id) : null;

	if (id && !user) throw error(404, 'User not found.');

	// If user is null, default values for the schema will be returned.
	const form = await superValidate(user, schema);
	return { form, users };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, schema);

		if (!form.valid) return fail(400, { form });

		if (!form.data.id) {
			// CREATE user
			const user = { ...form.data, id: userId() };
			users.push(user);

			return message(form, 'User created!');
		} else {
			const user = users.find((u) => u.id == form.data.id);
			if (!user) throw error(404, 'User not found.');

			const index = users.indexOf(user);

			if (data.has('delete')) {
				// DELETE user
				users.splice(index, 1);
				throw redirect(303, '/');
			} else {
				// UPDATE user
				users[index] = { ...form.data, id: user.id };
				return message(form, 'User updated!');
			}
		}
	}
};
