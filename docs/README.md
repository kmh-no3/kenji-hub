# ドキュメント

このディレクトリには、プロジェクトの仕様書や開発ガイドなどのドキュメントが含まれています。

## 📋 ドキュメント一覧

### 開発ガイド
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** - プロジェクト構造、セットアップ、開発フロー、利用可能なスクリプト

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
