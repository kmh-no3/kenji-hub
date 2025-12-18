# ドキュメント

このディレクトリには、プロジェクトの仕様書や開発ガイドなどのドキュメントが含まれています。

## 📋 ドキュメント一覧

### 開発ガイド
- **[DEVELOPMENT.md](./DEVELOPMENT.md)**  
  プロジェクト構造、セットアップ、ローカル開発、利用可能なスクリプトなど「開発者向け」の情報をまとめたガイド。

### 運用ガイド
- **[OPERATION.md](./OPERATION.md)**  
  ブランチ戦略、デプロイフロー、運用フロー、コミットルールなど「運用・リリース時の手順」をまとめたガイド。
- **[BRANCH_SETUP.md](./BRANCH_SETUP.md)**  
  GitHub上でのブランチ保護ルールやブランチ命名規則など、ブランチ戦略を実際に設定するための手順書。

### 仕様書
- **[navigation-details.md](./navigation-details.md)** - ナビゲーションの詳細な仕様書
- **[navigation-overview.md](./navigation-overview.md)** - ナビゲーションの概要仕様書

## 🏗️ プロジェクト構成

```
kenji-hub/
├── src/                    # ソースコード
│   ├── app/               # Next.js App Router
│   ├── components/        # 共通コンポーネント
│   │   ├── layout/        # レイアウトコンポーネント
│   │   ├── ui/           # UIコンポーネント
│   │   ├── features/      # 機能別コンポーネント
│   │   └── utils/        # ユーティリティコンポーネント
│   ├── hooks/            # カスタムフック
│   ├── lib/              # ユーティリティ関数
│   ├── types/            # 型定義
│   └── config/           # 設定ファイル
├── public/               # 静的ファイル
├── docs/                 # ドキュメント（このディレクトリ）
├── scripts/              # スクリプト
├── .github/              # GitHub設定
└── 設定ファイル
```

## 📝 ドキュメントの更新

新しいドキュメントを追加する場合は、このREADME.mdも更新してください。
