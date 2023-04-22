# ビルド用
FROM node:slim

WORKDIR /app

# パッケージをインストール
# NOTE: init時にjsを選択した場合はtsconfigは生成されないのでコメントアウトする
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
RUN npm install

COPY . .

WORKDIR /app

## 5173ポートのOpen
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
