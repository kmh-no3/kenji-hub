# Kenji Hub Monorepo

エンジニアとしての経験と技術を共有するポートフォリオサイトと、関連するWebアプリケーション群を管理するモノレポです。

## 🚀 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **モノレポ管理**: Turborepo
- **パッケージ管理**: npm workspaces
- **デプロイ**: Vercel / Docker
- **その他**: ESLint, PostCSS

## 📁 プロジェクト構造

```
kenji-hub/
├── apps/                       # アプリケーション群
│   ├── portfolio/             # ポートフォリオサイト (ポート: 3000)
│   │   ├── src/
│   │   │   ├── app/           # Next.js App Router
│   │   │   ├── components/    # ポートフォリオ専用コンポーネント
│   │   │   └── ...
│   │   └── package.json
│   ├── task-manager/          # タスク管理アプリ (ポート: 3001)
│   │   ├── src/
│   │   └── package.json
│   ├── blog-cms/              # ブログCMS (ポート: 3002)
│   │   ├── src/
│   │   └── package.json
│   └── dashboard/             # 管理ダッシュボード (ポート: 3003)
│       ├── src/
│       └── package.json
├── packages/                   # 共有ライブラリ
│   ├── ui/                    # 共有UIコンポーネント
│   │   ├── src/
│   │   └── package.json
│   ├── utils/                 # 共有ユーティリティ
│   │   ├── src/
│   │   └── package.json
│   └── types/                 # 共有型定義
│       ├── src/
│       └── package.json
├── tools/                      # 開発ツール
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ...
├── turbo.json                  # Turborepo設定
└── package.json               # ルートpackage.json
```

## 🛠️ セットアップ

### 前提条件

- Node.js 18.0.0以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール（全パッケージ）
npm install

# 開発サーバーの起動（全アプリケーション）
npm run dev

# 特定のアプリケーションのみ起動
npm run dev --filter=@kenji-hub/portfolio
npm run dev --filter=@kenji-hub/task-manager
npm run dev --filter=@kenji-hub/blog-cms
npm run dev --filter=@kenji-hub/dashboard
```

### 利用可能なスクリプト

```bash
# 全アプリケーションの開発サーバー起動
npm run dev

# 全アプリケーションのビルド
npm run build

# 全アプリケーションのリント実行
npm run lint

# 全アプリケーションのテスト実行
npm run test

# 全アプリケーションのクリーン
npm run clean

# 特定のアプリケーションのみ操作
npm run dev --filter=@kenji-hub/portfolio
npm run build --filter=@kenji-hub/portfolio
npm run lint --filter=@kenji-hub/portfolio
```

## 📱 アプリケーション詳細

### 1. Portfolio (ポート: 3000)
- **目的**: エンジニアとしてのポートフォリオサイト
- **機能**: 作品紹介、記事一覧、自己紹介
- **技術**: Next.js, TypeScript, Tailwind CSS

### 2. Task Manager (ポート: 3001)
- **目的**: タスク管理アプリケーション
- **機能**: タスク作成、編集、削除、カテゴリ分け
- **技術**: Next.js, Zustand, date-fns

### 3. Blog CMS (ポート: 3002)
- **目的**: ブログコンテンツ管理システム
- **機能**: 記事作成、編集、公開、認証
- **技術**: Next.js, NextAuth, Prisma, Markdown

### 4. Dashboard (ポート: 3003)
- **目的**: 管理ダッシュボード
- **機能**: 統計表示、データ可視化、管理機能
- **技術**: Next.js, Recharts, Lucide React

## 📦 共有パッケージ

### @kenji-hub/ui
- 再利用可能なUIコンポーネント
- Button, Card, Modal, Form components等

### @kenji-hub/utils
- 共通ユーティリティ関数
- 日付フォーマット、文字列処理、Tailwind CSS統合等

### @kenji-hub/types
- 共通型定義
- API型、コンポーネント型、データ型等

## 🐳 Docker

### 開発環境

```bash
# 開発環境の起動
docker-compose up dev

# バックグラウンドで起動
docker-compose up -d dev
```

### 本番環境

```bash
# 本番環境のビルドと起動
docker-compose up prod

# イメージのビルド
docker-compose build
```

## 📝 開発ガイドライン

### 新しいアプリケーションの追加

1. `apps/` ディレクトリに新しいアプリケーションを作成
2. `package.json` で適切なポート番号を設定
3. 共有パッケージを依存関係に追加
4. `turbo.json` に必要に応じて設定を追加

### 新しい共有パッケージの追加

1. `packages/` ディレクトリに新しいパッケージを作成
2. `package.json` で適切なエクスポート設定
3. 他のアプリケーションで使用する場合は依存関係に追加

### コンポーネント作成

1. **アプリケーション固有**: 各アプリの `src/components/` に配置
2. **共有コンポーネント**: `packages/ui/src/` に配置
3. **型定義**: `packages/types/src/` に配置

## 🚀 デプロイ

### Vercel

```bash
# 特定のアプリケーションをデプロイ
vercel --cwd apps/portfolio
vercel --cwd apps/task-manager
vercel --cwd apps/blog-cms
vercel --cwd apps/dashboard
```

### GitHub Pages

```bash
# ポートフォリオサイトを静的サイトとしてデプロイ
cd apps/portfolio
npm run export
npm run deploy
```

## 📚 ドキュメント

詳細なドキュメントは各アプリケーションの `docs/` ディレクトリを参照してください。

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
