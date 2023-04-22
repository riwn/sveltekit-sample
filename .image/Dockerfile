# ビルド用
FROM node:18.12.1-slim as builder

WORKDIR /app

## パッケージをインストール
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

## 5173ポートのOpen
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
