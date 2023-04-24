<script lang="ts">
  import { page } from '$app/stores';
  import { superForm } from 'sveltekit-superforms/client';

  export let data;

  const {
    form,
    errors,
    enhance,
    delayed,
    message,
    reset,
    empty,
    constraints
  } = superForm(data.form, {
    onUpdated({form}) {
      // Need to do this because messages can't be preserved on redirect.
      // sveltekit-flash-message fixes this issue:
      // https://github.com/ciscoheat/sveltekit-flash-message
      if (form.valid && data.form.empty) {
        reset({keepMessage: true});
      }
    }
  });
</script>

<h1>Superforms CRUD demo</h1>

<h3>User list</h3>
<div class="users">
  {#each data.users as user}
    <a href="?id={user.id}">{user.name}</a>
  {/each}
  {#if !$empty}
    <form action="/">
      <button>Create new</button>
    </form>
  {/if}
</div>

{#if $message}
  <h3 class:success={$page.status < 400} class:invalid={$page.status >= 400}>{$message}</h3>
{/if}

<h2>{data.form.empty ? 'Create' : 'Update'} user</h2>

<form method="POST" use:enhance>
  <input type="hidden" name="id" bind:value={$form.id} />

  <label>
    Name<br />
    <input
      name="name"
      data-invalid={$errors.name}
      bind:value={$form.name}
      {...$constraints.name}
    />
    {#if $errors.name}<span class="invalid">{$errors.name}</span>{/if}
  </label>

  <label>
    E-mail<br />
    <input
      name="email"
      type="email"
      data-invalid={$errors.email}
      bind:value={$form.email}
      {...$constraints.email}
    />
    {#if $errors.email}<span class="invalid">{$errors.email}</span>{/if}
  </label>

  <button>Submit</button>
  {#if $delayed}Working...{/if}

  {#if !$empty}
    <button
      name="delete"
      value="delete"
      on:click={(e) => !confirm('Are you sure?') && e.preventDefault()}
      class="danger">Delete user</button
    >
  {/if}
</form>

<style>
  .invalid {
    color: red;
  }

  .success {
    color: green;
  }

  .danger {
    background-color: brown;
  }

  .users {
    columns: 3 150px;
  }

  .users > * {
    display: block;
    white-space: nowrap;
    overflow-x: hidden;
  }

  .users a:hover {
    border-bottom: none;
  }

  .follow {
    margin-top: 2rem;
  }
</style>
