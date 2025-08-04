# Docker開発環境セットアップ

このプロジェクトでは、Dockerを使用して開発環境と本番環境を構築できます。

## 前提条件

- Docker Desktop がインストールされていること
- Docker Compose が利用可能であること

## 開発環境の起動

### 1. 基本的な開発環境
```bash
# 開発環境を起動
docker-compose up dev

# バックグラウンドで起動する場合
docker-compose up -d dev
```

### 2. ホットリロード対応の開発環境
```bash
# ファイル変更を監視する開発環境を起動
docker-compose up dev-hot
```

## 本番環境の起動

```bash
# 本番環境を起動
docker-compose up prod
```

## 個別のDockerコマンド

### 開発環境
```bash
# イメージをビルド
docker build -t kenji-hub-dev .

# コンテナを起動
docker run -p 3000:3000 -v $(pwd):/app kenji-hub-dev
```

### 本番環境
```bash
# 本番用イメージをビルド
docker build -f Dockerfile.prod -t kenji-hub-prod .

# コンテナを起動
docker run -p 8080:80 kenji-hub-prod
```

## アクセス方法

- 開発環境: http://localhost:3000
- 本番環境: http://localhost:8080

## 便利なコマンド

```bash
# コンテナの停止
docker-compose down

# イメージの再ビルド
docker-compose build

# ログの確認
docker-compose logs dev

# コンテナ内でコマンド実行
docker-compose exec dev npm install <package-name>
```

## トラブルシューティング

### ポートが既に使用されている場合
```bash
# 使用中のポートを確認
lsof -i :3000

# 別のポートで起動
docker-compose up dev -p 3001:3000
```

### ボリュームのクリア
```bash
# ボリュームを削除してクリーンな状態にする
docker-compose down -v
docker system prune -f
```

## 学習ポイント

このDocker設定で学べる内容：

1. **マルチステージビルド**: 本番環境用のDockerfileで使用
2. **ボリュームマウント**: 開発時のホットリロード
3. **環境変数の管理**: 開発・本番環境の分離
4. **Nginxの設定**: 静的ファイル配信の最適化
5. **Docker Compose**: 複数サービスの管理 