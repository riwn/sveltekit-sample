# first: init build up tailwind

init:
	cp compose.override.yml.sample compose.override.yml
	docker compose up -d svelte-init --build
	docker compose exec svelte-init bash -c "npm create svelte@latest svelte-test && cd svelte-test && npm install"

build:
	docker compose build
up:
	docker compose up -d web
down:
	docker compose down
