# svelte-test

[公式日本語サイト](https://kit.svelte.jp/)

## 環境構築

初回の環境構築については`Makefile`に全て記載しています。
以下を実行することで環境構築が完了します。
```bash
make init
```
色々聞かれますが、初期設定についての質問が流れてくるので一つずつ選択していきます。

Dockerコンテナ内でSvelteKitのInstallまで行います。

```bash
cp compose.override.yml.sample compose.override.yml
docker compose exec svelte-init npm create svelte@latest svelte-test
```
