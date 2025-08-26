# Kenji Hub

エンジニアとしての経験と技術を共有するポートフォリオサイトです。

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **パッケージ管理**: npm
- **デプロイ**: GitHub Pages / Docker
- **その他**: ESLint, PostCSS

## 📁 プロジェクト構造

```
kenji-hub/
├── src/                    # ソースコード
│   ├── app/               # Next.js App Router
│   │   ├── blog/          # 記事関連ページ
│   │   ├── works/         # 作品ページ
│   │   └── layout.tsx     # ルートレイアウト
│   ├── components/        # 共通コンポーネント
│   │   ├── layout/        # レイアウトコンポーネント
│   │   └── ui/           # UIコンポーネント
│   ├── hooks/            # カスタムフック
│   └── lib/              # ユーティリティ
├── public/               # 静的ファイル
├── docs/                 # ドキュメント
├── .github/              # GitHub設定
└── 設定ファイル
```

## 🛠️ セットアップ

### 前提条件

- Node.js 22.0.0以上
- Docker (オプション)

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# Dockerでの開発サーバー起動
npm run docker:dev
```

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 静的サイト生成
npm run build:static

# リント実行
npm run lint

# クリーンアップ
npm run clean

# Docker関連
npm run docker:dev      # 開発環境
npm run docker:prod     # 本番環境
npm run docker:build    # イメージビルド
npm run docker:down     # コンテナ停止

# デプロイ
npm run deploy          # GitHub Pagesデプロイ
```

## 📱 アプリケーション詳細

### ページ構成

- **ホームページ** (`/`) - プロジェクト紹介
- **作品ページ** (`/works`) - プロジェクト一覧
- **記事一覧** (`/blog`) - ブログ記事一覧
- **記事詳細** (`/blog/[id]`) - 個別記事

### 機能

- レスポンシブデザイン
- 静的サイト生成
- 共通ヘッダーコンポーネント
- 記事管理システム

## 📚 ドキュメント

詳細なドキュメントは [`docs/`](./docs/) ディレクトリを参照してください：

- [開発ガイド](./docs/DEVELOPMENT.md)
- [ナビゲーション詳細仕様書](./docs/navigation-details.md)
- [ナビゲーション概要仕様書](./docs/navigation-overview.md)

## 🌐 アクセス

- **開発環境**: http://localhost:3000
- **本番環境**: https://kmh-no3.github.io/kenji-hub/