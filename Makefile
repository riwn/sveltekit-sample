# first: init build up tailwind

init:
	cp compose.override.yml.sample compose.override.yml
	docker compose exec svelte-init npm create svelte@latest svelte-test

build:
	docker compose build
up:
	docker compose up -d
down:
	docker compose down
