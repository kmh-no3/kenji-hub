# Kenji Hub - ナビゲーション概要

## 基本的なページ遷移

```mermaid
flowchart LR
    %% エントリーポイント
    Root[🏠 ルート<br/>/]
    
    %% メインナビゲーション
    subgraph "メインナビゲーション"
        Works[💼 作品一覧<br/>/works]
        Blog[📚 記事一覧<br/>/blog]
        About[ℹ️ About<br/>/about]
    end
    
    %% 詳細ページ
    ArticleDetail[📄 記事詳細<br/>/blog/container-vm-development-comparison]
    
    %% 外部リンク
    subgraph "外部リンク"
        GitHub[🐙 GitHub<br/>外部リンク]
        Demo[🌐 Demo<br/>外部リンク]
    end
    
    %% ルートページのリダイレクト
    Root -.->|リダイレクト| Works
    
    %% メインナビゲーション間の双方向遷移
    Works <--> Blog
    Works <--> About
    Blog <--> About
    
    %% ブログ関連の遷移（双方向1本）
    Blog <--> ArticleDetail
    
    %% 記事詳細からの遷移
    ArticleDetail --> Works
    ArticleDetail --> About
    
    %% 外部リンク
    Works --> GitHub
    Works --> Demo
    
    %% スタイル設定
    style Works fill:#f3e5f5
    style Blog fill:#f3e5f5
    style About fill:#f3e5f5
    style ArticleDetail fill:#e8f5e8
    style Root fill:#e0f2f1,stroke:#00695c,stroke-width:2px,stroke-dasharray: 5 5
    style GitHub fill:#fff3e0
    style Demo fill:#fff3e0
```

## ナビゲーションメニュー（全ページ共通）

```mermaid
graph LR
    Logo[HOSODA KENJI<br/>/works] --> Nav[ナビゲーション]
    Nav --> About[ABOUT<br/>準備中]
    Nav --> Works[WORKS<br/>/works]
    Nav --> Blog[BLOG<br/>/blog]
    
    SNS[SNS] --> Twitter[🐦 Twitter<br/>準備中]
    SNS --> GitHub[🐙 GitHub<br/>外部リンク]
    SNS --> Zenn[📝 Zenn<br/>準備中]
    
    style Logo fill:#e3f2fd
    style Nav fill:#e1f5fe
    style About fill:#f3e5f5
    style Works fill:#f3e5f5
    style Blog fill:#f3e5f5
    style SNS fill:#fff3e0
```

## 現在のページ一覧

| ページ | URL | 説明 |
|--------|-----|------|
| 🏠 ルート | `/` | `/works`にリダイレクト |
| 💼 作品一覧 | `/works` | メインページ（プロジェクト一覧と自己紹介） |
| 📚 記事一覧 | `/blog` | ブログ記事の一覧 |
| 📄 記事詳細 | `/blog/container-vm-development-comparison` | Container VM比較記事 |
| ℹ️ About | `/about` | 準備中（現在は無効） |

## 外部リンク

| リンク | URL | 説明 |
|--------|-----|------|
| 🐦 Twitter | `https://twitter.com/your_twitter` | 準備中 |
| 🐙 GitHub | `https://github.com/kmh-no3` | GitHubアカウント |
| 📝 Zenn | `https://zenn.dev/your_zenn` | 準備中 |
| 🔐 PWA Demo | `https://kmh-no3.github.io/pwa-password-generator` | パスワードジェネレーター |
| 🐙 Container VM | `https://github.com/kmh-no3/Container_VM` | Container VM比較リポジトリ |

## ロゴリンクの動作

各ページでの「HOSODA KENJI」ロゴのリンク先：

| ページ | ロゴリンク先 | 説明 |
|--------|-------------|------|
| 🏠 ルート (`/`) | `/works` | 作品一覧ページへ（リダイレクト後） |
| 💼 作品一覧 (`/works`) | `/works` | 自己参照（現在ページ） |
| 📚 記事一覧 (`/blog`) | `/works` | 作品一覧ページへ |
| 📄 記事詳細 (`/blog/[id]`) | `/works` | 作品一覧ページへ |

## ナビゲーション構造の特徴

- **全ページ共通ヘッダー**: 全てのページで同じナビゲーションメニューが表示される
- **双方向遷移**: どのページからでも他のページに遷移可能
- **メインページ**: `/works`が実質的なメインページ
- **準備中ページ**: ABOUTページは現在準備中（無効）
- **外部リンク**: 作品ページからGitHubやDemoへの外部リンク
