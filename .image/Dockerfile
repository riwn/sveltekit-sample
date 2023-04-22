# ビルド用
FROM node:slim

WORKDIR /app

## パッケージをインストール
COPY ./package.json ./
# COPY ./package-lock.json ./
# COPY ./tsconfig.json ./
RUN npm install

COPY . .

# RUN npm run build

WORKDIR /app

## 5173ポートのOpen
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
