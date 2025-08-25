# 開発環境ガイド

## 開発サーバーの起動

### 1. ローカル開発
```bash
npm run dev
```

### 2. Docker開発
```bash
npm run docker:dev
```

### 3. ブラウザでアクセス
- URL: `http://localhost:3000`

## ビルドとデプロイ

### 静的サイト生成
```bash
npm run build:static
```

### GitHub Pagesデプロイ
```bash
npm run deploy
```

## 便利なコマンド

```bash
# 依存関係のインストール
npm install

# リント
npm run lint

# クリーンアップ
npm run clean

# Dockerコンテナの停止
npm run docker:down
```

## プロジェクト構成

```
src/
├── app/                 # Next.js App Router
│   ├── blog/           # 記事関連ページ
│   ├── works/          # 作品ページ
│   └── layout.tsx      # ルートレイアウト
├── components/         # 共通コンポーネント
│   ├── layout/         # レイアウトコンポーネント
│   └── ui/            # UIコンポーネント
├── hooks/             # カスタムフック
└── lib/               # ユーティリティ
``` 