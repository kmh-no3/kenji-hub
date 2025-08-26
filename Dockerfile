# 開発環境用Dockerfile
FROM node:20-alpine

# Gitをインストール
RUN apk add --no-cache git

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm ci

# ソースコードをコピー
COPY . .

# 開発サーバーのポートを公開
EXPOSE 3000

# デフォルトコマンド（docker-composeで上書きされる）
CMD ["npm", "run", "dev"] 