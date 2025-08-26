import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'password-generator-web',
    title: '🔐 PWAパスワードジェネレーター',
    description: 'セキュアなパスワードを生成するPWAアプリケーション。WebCrypto APIを使用した暗号学的に安全な乱数生成、パスワード履歴、強度チェック機能を実装。オフライン対応でホーム画面に追加可能。',
    technologies: ['React', 'TypeScript', 'Vite', 'PWA', 'WebCrypto API'],
    image: '🔐',
    githubUrl: 'https://github.com/kmh-no3/pwa-password-generator',
    demoUrl: 'https://kmh-no3.github.io/pwa-password-generator',
    status: 'completed',
    demoAvailable: true
  },
  {
    id: 'journapi',
    title: 'JournAPI - 複式簿記システムAPI',
    description: '複式簿記システムのAPIサーバー。仕訳帳、元帳、試算表の機能を提供し、外部公開を想定したセキュリティ機能を備えたバックエンドエンジニアリングのポートフォリオプロジェクト。',
    technologies: ['Spring Boot', 'Java 21', 'PostgreSQL', 'Flyway', 'Maven'],
    image: '📊💰',
    githubUrl: 'https://github.com/kmh-no3/journAPI',
    demoUrl: 'https://github.com/kmh-no3/journAPI',
    status: 'in-progress',
    demoAvailable: false
  },
  {
    id: 'haskell-web-app',
    title: 'Haskell Web App（会計＆ブロックチェーン）',
    description: 'Haskellで構築したWebアプリケーション。会計機能とブロックチェーン技術を組み合わせた革新的なシステム。',
    technologies: ['Haskell', 'Yesod', 'PostgreSQL', 'Blockchain'],
    image: 'λ⛓️',
    githubUrl: 'https://github.com/kmh-no3/haskell-web-app',
    demoUrl: 'https://github.com/kmh-no3/haskell-web-app',
    status: 'planned',
    demoAvailable: false
  }
] as const;

