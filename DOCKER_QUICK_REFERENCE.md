# Docker クイックリファレンス

## 🚀 基本的な使用方法

### 開発環境の起動
```bash
# 開発環境を起動（ホットリロード対応）
npm run docker:dev
# または
docker compose up dev

# バックグラウンドで起動
docker compose up -d dev
```

### 本番環境の起動
```bash
# 本番環境を起動
npm run docker:prod
# または
docker compose up prod

# バックグラウンドで起動
docker compose up -d prod
```

### 停止
```bash
# すべてのコンテナを停止
npm run docker:down
# または
docker compose down
# 本番環境のみ
docker compose stop prod
# 開発環境のみ
docker compose stop dev
```

## 📍 アクセスURL

- **開発環境**: http://localhost:3000/kenji-hub/
- **本番環境**: http://localhost:8080/kenji-hub/

## 🔧 よく使用するコマンド

### コンテナ管理
```bash
# コンテナの状態確認
docker compose ps

# ログの確認
docker compose logs dev
docker compose logs prod

# 特定のコンテナでコマンド実行
docker compose exec dev npm install <package-name>
```

### イメージ管理
```bash
# イメージの再ビルド
npm run docker:build
# または
docker compose build

# 特定のサービスのみビルド
docker compose build dev
docker compose build prod
```

### クリーンアップ
```bash
# 未使用のリソースを削除
docker system prune -f

# ボリュームも含めて削除
docker compose down -v
```

## 🐛 トラブルシューティング

### ポートが使用中の場合
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :8080

# 別のポートで起動
docker compose up dev -p 3001:3000
```

### ビルドエラーの場合
```bash
# キャッシュをクリアしてビルド
docker compose build --no-cache

# 特定のサービスのみキャッシュクリア
docker compose build --no-cache dev
```

### コンテナが起動しない場合
```bash
# ログを確認
docker compose logs dev

# コンテナを再作成
docker compose up --force-recreate dev
```

## 📚 学習ポイント

このDocker設定で学べる内容：

1. **マルチステージビルド**: 本番環境でNode.jsでビルドし、Nginxで配信
2. **ボリュームマウント**: 開発時のホットリロード対応
3. **環境変数管理**: 開発・本番環境の分離
4. **Docker Compose**: 複数サービスの統合管理
5. **Nginx設定**: 静的ファイル配信の最適化
6. **.dockerignore**: 不要ファイルの除外
7. **ヘルスチェック**: コンテナの状態監視

## 🎯 次のステップ

1. **環境変数の追加**: `.env`ファイルで環境固有の設定
2. **データベースの追加**: PostgreSQLやMySQLのコンテナ化
3. **CI/CDパイプライン**: GitHub Actionsでの自動デプロイ
4. **監視とログ**: Prometheus、Grafanaの導入
5. **セキュリティ**: イメージの脆弱性スキャン 