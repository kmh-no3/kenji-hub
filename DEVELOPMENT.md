# 開発環境ガイド

## 開発サーバーの起動

### 1. 正しいディレクトリに移動
```bash
cd kenji-hub
```

### 2. 開発サーバーを起動
```bash
npm run dev
```

### 3. ブラウザでアクセス
- URL: `http://localhost:3000`
- 開発サーバーが正常に起動すると、ターミナルに以下のメッセージが表示されます：
```
▲ Next.js 14.2.31
- Local:        http://localhost:3000
✓ Starting...
✓ Ready in 1237ms
```

## 開発サーバーの停止

### 方法1: キーボードショートカット (推奨)
開発サーバーが起動しているターミナルで：
- **Windows/Linux**: `Ctrl + C`
- **Mac**: `Cmd + C`

### 方法2: プロセスキルコマンド
```bash
pkill -f "next dev"
```

### 方法3: ポート番号で停止
```bash
# ポート3000で動作しているプロセスを停止
lsof -ti:3000 | xargs kill

# または
lsof -ti:3001 | xargs kill  # ポート3001の場合
```

### 方法4: プロセス確認と停止
```bash
# 動作中のプロセスを確認
lsof -i :3000

# プロセスが存在する場合、停止
pkill -f "next dev"
```

## トラブルシューティング

### 開発サーバーが起動しない場合
1. **正しいディレクトリにいることを確認**
   ```bash
   pwd  # 現在のディレクトリを確認
   ls   # kenji-hubフォルダの内容を確認
   ```

2. **依存関係を再インストール**
   ```bash
   npm install
   ```

3. **別のポートで起動**
   ```bash
   PORT=3001 npm run dev
   ```

### ブラウザでアクセスできない場合
1. **ブラウザキャッシュのクリア**
   - Chrome: `Ctrl+Shift+R` (Windows) または `Cmd+Shift+R` (Mac)
   - Safari: `Cmd+Option+R`
   - Firefox: `Ctrl+F5` (Windows) または `Cmd+Shift+R` (Mac)

2. **シークレットモードで確認**
   - ブラウザのシークレットモード（プライベートブラウジング）でアクセス

3. **サーバーの状態確認**
   ```bash
   curl -I http://localhost:3000
   ```

## 環境設定

### 開発環境 vs 本番環境
- **開発環境**: `NODE_ENV=development`
  - basePath: 空文字
  - assetPrefix: 空文字
  - output: undefined (静的エクスポート無効)

- **本番環境**: `NODE_ENV=production`
  - basePath: `/kenji-hub`
  - assetPrefix: `/kenji-hub/`
  - output: `export` (静的エクスポート有効)

## よく使用するコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番環境用ビルド
npm run build

# 本番環境用サーバー起動
npm run start

# リンター実行
npm run lint

# 手動デプロイ
npm run deploy-manual
```

## 注意事項

- 開発環境では `http://localhost:3000` でアクセス
- 本番環境では `https://kmh-no3.github.io/kenji-hub/` でアクセス
- 画像パスは環境に応じて自動調整されます
- 開発サーバーを停止する際は、必ず `Ctrl+C` または `Cmd+C` を使用してください 