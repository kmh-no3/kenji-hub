# 開発ガイド

## フォルダ構成

このプロジェクトは、TypeScript開発のベストプラクティスに従った構成になっています。

```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # ルートグループ
│   │   ├── blog/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   └── works/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/            # 再利用可能なコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   │   ├── Button.tsx
│   │   └── index.ts      # バレルエクスポート
│   ├── layout/           # レイアウトコンポーネント
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── index.ts
│   └── features/         # 機能別コンポーネント
│       ├── blog/
│       │   ├── ArticleCard.tsx
│       │   └── index.ts
│       └── projects/
│           ├── ProjectCard.tsx
│           └── index.ts
├── hooks/                # カスタムフック
│   ├── useLocalStorage.ts
│   └── index.ts
├── lib/                  # ユーティリティと設定
│   ├── constants.ts
│   ├── utils.ts
│   └── project-utils.ts
├── types/                # 型定義
│   ├── project.ts
│   ├── article.ts
│   ├── common.ts
│   └── index.ts
└── config/               # 設定ファイル
    ├── site.ts
    ├── navigation.ts
    ├── projects.ts
    └── articles.ts
```

## 開発環境のセットアップ

### 1. ローカル開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 2. Docker開発環境

#### 前提条件
- Docker
- Docker Compose

#### 基本的な使用方法

```bash
# Dockerイメージのビルド
npm run docker:build

# 開発サーバーの起動
npm run docker:dev

# クリーンな起動（既存プロセスを停止してから起動）
npm run docker:dev:clean

# コンテナの停止
npm run docker:down
```

#### 手動でのDocker操作

```bash
# 開発環境の起動
docker-compose up dev

# バックグラウンドで起動
docker-compose up -d dev

# コンテナの停止
docker-compose down

# ログの確認
docker-compose logs dev

# コンテナ内でコマンド実行
docker-compose exec dev npm run lint
```

#### 開発環境の特徴

- **ホットリロード**: ファイル変更時に自動でリロード
- **ボリュームマウント**: ローカルの変更がコンテナに即座に反映
- **ポートマッピング**: `localhost:3000` でアクセス可能
- **環境変数**: 開発用の設定が自動で適用

## ベストプラクティス

### 1. 型定義の分離
- 型定義は `types/` フォルダに機能別に分離
- バレルエクスポート（`index.ts`）でインポートを簡潔に

### 2. 設定の分離
- 環境依存の設定は `config/` フォルダに配置
- データ（プロジェクト、記事）も設定として管理

### 3. コンポーネントの再利用性
- 機能別に `features/` フォルダでグループ化
- 汎用的なUIコンポーネントは `ui/` フォルダに配置

### 4. ユーティリティ関数の整理
- 機能別にユーティリティ関数を分離
- 型安全性を重視した関数設計

## 開発フロー

### 新しい機能を追加する場合

1. **型定義の追加**
   ```typescript
   // types/new-feature.ts
   export interface NewFeature {
     // 型定義
   }
   ```

2. **設定の追加**
   ```typescript
   // config/new-feature.ts
   export const newFeatureConfig = {
     // 設定
   };
   ```

3. **コンポーネントの作成**
   ```typescript
   // components/features/new-feature/NewFeatureComponent.tsx
   export function NewFeatureComponent() {
     // コンポーネント実装
   }
   ```

4. **バレルエクスポートの更新**
   ```typescript
   // components/features/new-feature/index.ts
   export { NewFeatureComponent } from './NewFeatureComponent';
   ```

### メンテナンスのポイント

- **重複コードの削除**: 同じロジックは共通化
- **型安全性の確保**: TypeScriptの恩恵を最大限活用
- **設定の一元管理**: 変更箇所を最小限に抑制
- **コンポーネントの分離**: 責任の明確化

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Hooks
- **コンテナ化**: Docker & Docker Compose
- **デプロイ**: GitHub Pages

## 開発コマンド

```bash
# ローカル開発
npm run dev

# Docker開発
npm run docker:dev
npm run docker:dev:clean

# ビルド
npm run build

# リント
npm run lint

# 静的ビルド（GitHub Pages用）
npm run build:static

# デプロイ
npm run deploy

# Docker関連
npm run docker:build
npm run docker:down
```

## トラブルシューティング

### ポート3000が使用中の場合

```bash
# 既存プロセスの確認
lsof -ti:3000

# プロセスの停止
kill $(lsof -ti:3000)

# または、クリーンな起動を使用
npm run docker:dev:clean
```

### Dockerコンテナが起動しない場合

```bash
# コンテナのログを確認
docker-compose logs dev

# コンテナを再ビルド
docker-compose build --no-cache dev

# コンテナを再起動
docker-compose down && docker-compose up dev
``` 