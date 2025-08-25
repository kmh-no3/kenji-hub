# Kenji Hub - ページ遷移図

## サイト全体のページ遷移フロー

```mermaid
graph TD
    %% メインページ（同じ内容）
    A[🏠 プロジェクト紹介<br/>/] --> B[📚 記事一覧<br/>/blog]
    A --> C[💼 作品一覧<br/>/works]
    A --> D[ℹ️ About<br/>/about]
    
    %% 同じ内容のページを強調
    C -.->|同じ内容| A
    
    %% 記事関連
    B --> E[📄 記事詳細<br/>/blog/[id]]
    E --> B
    E --> A
    
    %% 作品関連
    C --> F[🔗 GitHub<br/>外部リンク]
    C --> G[🌐 Demo<br/>外部リンク]
    
    %% ナビゲーション
    B --> A
    B --> C
    B --> D
    C --> A
    C --> B
    C --> D
    E --> A
    E --> B
    E --> C
    E --> D
    
    %% 外部リンク
    A --> H[🐦 Twitter<br/>外部リンク]
    A --> I[🐙 GitHub<br/>外部リンク]
    A --> J[📝 Zenn<br/>外部リンク]
    
    %% スタイル設定
    classDef mainPage fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef subPage fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef externalLink fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef dynamicPage fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef sameContent fill:#fff8e1,stroke:#f57c00,stroke-width:3px,stroke-dasharray: 5 5
    
    class A,C sameContent
    class B,D subPage
    class E dynamicPage
    class F,G,H,I,J externalLink
```

## 詳細なページ構造

```mermaid
graph TD
    %% ルート構造
    Root[🌐 Kenji Hub] --> Home[🏠 プロジェクト紹介<br/>/]
    Root --> Articles[📚 記事セクション<br/>/blog]
    Root --> Works[💼 作品セクション<br/>/works]
    Root --> About[ℹ️ About<br/>/about]
    
    %% 同じ内容のページを強調
    Home -.->|同じ内容| Works
    
    %% 記事セクション詳細
    Articles --> ArticleList[📋 記事一覧<br/>/blog]
    Articles --> ArticleDetail[📄 記事詳細<br/>/blog/[id]]
    
    %% 記事詳細の内容
    ArticleDetail --> ContainerVM[🐳 Container VM比較<br/>/blog/container-vm-development-comparison]
    
    %% 作品セクション詳細
    Works --> WorksList[📋 作品一覧<br/>/works]
    Works --> Project1[🔐 PWAパスワードジェネレーター<br/>完了]
    Works --> Project2[📊💰 JournAPI<br/>開発中]
    Works --> Project3[λ⛓️ Haskell Web App<br/>計画中]
    
    %% 外部リンク
    Project1 --> Demo1[🌐 Demo<br/>https://kmh-no3.github.io/pwa-password-generator]
    Project1 --> GitHub1[🐙 GitHub<br/>https://github.com/kmh-no3/pwa-password-generator]
    Project2 --> GitHub2[🐙 GitHub<br/>https://github.com/kmh-no3/journAPI]
    Project3 --> GitHub3[🐙 GitHub<br/>https://github.com/kmh-no3/haskell-web-app]
    ContainerVM --> GitHub4[🐙 GitHub<br/>https://github.com/kmh-no3/Container_VM]
    
    %% スタイル設定
    classDef root fill:#e3f2fd,stroke:#1565c0,stroke-width:3px
    classDef page fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    classDef article fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef project fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    classDef external fill:#e0f2f1,stroke:#004d40,stroke-width:2px
    classDef sameContent fill:#fff8e1,stroke:#f57c00,stroke-width:3px,stroke-dasharray: 5 5
    
    class Root root
    class Home,Works sameContent
    class About page
    class ArticleList,ArticleDetail,ContainerVM article
    class WorksList,Project1,Project2,Project3 project
    class Demo1,GitHub1,GitHub2,GitHub3,GitHub4 external
```

## ナビゲーション構造

```mermaid
graph LR
    %% ヘッダーナビゲーション
    Header[📱 ヘッダー] --> Logo[HOSODA KENJI<br/>ロゴ]
    Header --> Nav[🧭 ナビゲーション]
    
    %% メインナビゲーション
    Nav --> AboutLink[ABOUT<br/>/about]
    Nav --> WorksLink[WORKS<br/>/works]
    Nav --> BlogLink[BLOG<br/>/blog]
    
    %% SNSリンク
    Header --> SNS[📱 SNSリンク]
    SNS --> Twitter[🐦 Twitter]
    SNS --> GitHub[🐙 GitHub]
    SNS --> Zenn[📝 Zenn]
    
    %% フッターナビゲーション
    Footer[🦶 フッター] --> FooterNav[🧭 フッターナビ]
    FooterNav --> AboutFooter[ABOUT<br/>/about]
    FooterNav --> WorksFooter[WORKS<br/>/works]
    FooterNav --> ArticlesFooter[BLOG<br/>/blog]
    
    %% スタイル設定
    classDef header fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px
    classDef nav fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef sns fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef footer fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    
    class Header,Logo header
    class Nav,AboutLink,WorksLink,BlogLink nav
    class SNS,Twitter,GitHub,Zenn sns
    class Footer,FooterNav,AboutFooter,WorksFooter,ArticlesFooter footer
```

## データフロー

```mermaid
graph TD
    %% データソース
    Data[📊 データ] --> ArticlesData[📚 記事データ]
    Data --> ProjectsData[💼 プロジェクトデータ]
    
    %% 記事データ
    ArticlesData --> Article1[🐳 Container VM比較<br/>id: container-vm-development-comparison]
    Article1 --> Article1Content[📝 記事内容<br/>HTML形式]
    Article1 --> Article1Meta[📋 メタデータ<br/>タイトル、説明、タグ]
    
    %% プロジェクトデータ
    ProjectsData --> Project1[🔐 PWAパスワードジェネレーター<br/>status: completed]
    ProjectsData --> Project2[📊💰 JournAPI<br/>status: in-progress]
    ProjectsData --> Project3[λ⛓️ Haskell Web App<br/>status: planned]
    
    %% データ表示
    Article1Content --> ArticlePage[📄 記事詳細ページ]
    Article1Meta --> ArticleListPage[📋 記事一覧ページ]
    Project1 --> WorksPage[💼 作品一覧ページ]
    Project2 --> WorksPage
    Project3 --> WorksPage
    
    %% スタイル設定
    classDef data fill:#e0f2f1,stroke:#004d40,stroke-width:2px
    classDef content fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef page fill:#f1f8e9,stroke:#33691e,stroke-width:2px
    
    class Data,ArticlesData,ProjectsData data
    class Article1Content,Article1Meta,Project1,Project2,Project3 content
    class ArticlePage,ArticleListPage,WorksPage page
```

## レスポンシブ対応

```mermaid
graph TD
    %% デバイス別表示
    Device[📱 デバイス] --> Desktop[🖥️ デスクトップ]
    Device --> Tablet[📱 タブレット]
    Device --> Mobile[📱 モバイル]
    
    %% デスクトップ表示
    Desktop --> DesktopHeader[📱 フルヘッダー<br/>ロゴ + ナビ + SNS]
    Desktop --> DesktopNav[🧭 横並びナビゲーション]
    Desktop --> DesktopGrid[📊 グリッドレイアウト<br/>3カラム]
    
    %% タブレット表示
    Tablet --> TabletHeader[📱 コンパクトヘッダー]
    Tablet --> TabletNav[🧭 折りたたみナビ]
    Tablet --> TabletGrid[📊 2カラムレイアウト]
    
    %% モバイル表示
    Mobile --> MobileHeader[📱 最小ヘッダー]
    Mobile --> MobileNav[🧭 ハンバーガーメニュー]
    Mobile --> MobileGrid[📊 1カラムレイアウト]
    
    %% スタイル設定
    classDef device fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    classDef desktop fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    classDef tablet fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef mobile fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    class Device device
    class Desktop,DesktopHeader,DesktopNav,DesktopGrid desktop
    class Tablet,TabletHeader,TabletNav,TabletGrid tablet
    class Mobile,MobileHeader,MobileNav,MobileGrid mobile
```

## ロゴリンクの動作

```mermaid
graph TD
    %% 各ページでのロゴリンク先
    RootPage[🏠 ルートページ<br/>/] --> LogoLink1[HOSODA KENJI<br/>→ /works]
    WorksPage[💼 作品ページ<br/>/works] --> LogoLink2[HOSODA KENJI<br/>→ /works]
    BlogPage[📚 ブログページ<br/>/blog] --> LogoLink3[HOSODA KENJI<br/>→ /blog]
    BlogDetailPage[📄 記事詳細<br/>/blog/[id]] --> LogoLink4[HOSODA KENJI<br/>→ /blog]
    
    %% 同じ内容のページを強調
    RootPage -.->|同じ内容| WorksPage
    
    %% スタイル設定
    classDef page fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef logo fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef sameContent fill:#fff8e1,stroke:#f57c00,stroke-width:3px,stroke-dasharray: 5 5
    
    class RootPage,WorksPage sameContent
    class BlogPage,BlogDetailPage page
    class LogoLink1,LogoLink2,LogoLink3,LogoLink4 logo
```

## 技術スタック

```mermaid
graph TD
    %% フロントエンド
    Frontend[🎨 フロントエンド] --> NextJS[⚛️ Next.js 14]
    Frontend --> React[⚛️ React 18]
    Frontend --> TypeScript[📘 TypeScript]
    Frontend --> TailwindCSS[🎨 Tailwind CSS]
    
    %% 開発環境
    DevEnv[🔧 開発環境] --> Docker[🐳 Docker]
    DevEnv --> Turbo[⚡ Turbo]
    DevEnv --> ESLint[🔍 ESLint]
    
    %% デプロイ
    Deploy[🚀 デプロイ] --> Vercel[▲ Vercel]
    Deploy --> GitHubPages[🐙 GitHub Pages]
    Deploy --> DockerProd[🐳 Docker Production]
    
    %% スタイル設定
    classDef frontend fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    classDef dev fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef deploy fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px
    
    class Frontend,NextJS,React,TypeScript,TailwindCSS frontend
    class DevEnv,Docker,Turbo,ESLint dev
    class Deploy,Vercel,GitHubPages,DockerProd deploy
```
