"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// プロジェクトデータの型定義
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  githubUrl?: string
  demoUrl?: string
  status: 'completed' | 'in-progress' | 'planned'
}

// プロジェクトデータ
const projects: Project[] = [
  {
    id: 'password-generator-web',
    title: '🔐 PWAパスワードジェネレーター',
    description: 'セキュアなパスワードを生成するPWAアプリケーション。WebCrypto APIを使用した暗号学的に安全な乱数生成、パスワード履歴、強度チェック機能を実装。オフライン対応でホーム画面に追加可能。',
    technologies: ['React', 'TypeScript', 'Vite', 'PWA', 'WebCrypto API'],
    image: '/globe.svg',
    githubUrl: 'https://github.com/kmh-no3/pwa-password-generator',
    demoUrl: 'https://kmh-no3.github.io/pwa-password-generator',
    status: 'completed'
  },
  {
    id: 'password-generator-haskell',
    title: 'パスワード生成アプリ（Haskell）',
    description: 'Haskell学習の一環として作成したローカルパスワード生成アプリ。関数型プログラミングの概念を活用。',
    technologies: ['Haskell', 'Stack', 'Cabal'],
    image: '/file.svg',
    githubUrl: 'https://github.com/kmh-no3/password-generator-haskell',
    status: 'in-progress'
  },
  {
    id: 'bluesky-app',
    title: 'Bluesky/AT Protocol 連携アプリ',
    description: 'BlueskyのAT Protocolを使用したソーシャルメディア連携アプリ。投稿、タイムライン表示、ユーザー管理機能。',
    technologies: ['Next.js', 'TypeScript', 'AT Protocol', 'TailwindCSS'],
    image: '/vercel.svg',
    githubUrl: 'https://github.com/kmh-no3/bluesky-app',
    demoUrl: 'https://bluesky-app.vercel.app',
    status: 'in-progress'
  },
  {
    id: 'haskell-web-app',
    title: 'Haskell Web App（会計＆ブロックチェーン）',
    description: 'Haskellで構築したWebアプリケーション。会計機能とブロックチェーン技術を組み合わせた革新的なシステム。',
    technologies: ['Haskell', 'Yesod', 'PostgreSQL', 'Blockchain'],
    image: '/window.svg',
    githubUrl: 'https://github.com/kmh-no3/haskell-web-app',
    status: 'planned'
  }
]

// プロジェクトカードコンポーネント
function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'planned':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了'
      case 'in-progress':
        return '開発中'
      case 'planned':
        return '計画中'
      default:
        return '不明'
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* プロジェクト画像 */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          unoptimized
        />
        {/* ステータスバッジ */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {/* プロジェクトタイトル */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {project.title}
        </h2>
        
        {/* プロジェクト説明 */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        {/* 使用技術 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* リンクボタン */}
        <div className="flex space-x-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gray-900 text-white text-center py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
            >
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 text-white text-center py-2 px-4 rounded-md transition-colors text-sm ${
                project.demoUrl.includes('localhost') 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {project.demoUrl.includes('localhost') ? 'ローカルデモ' : 'デモ'}
            </a>
          )}
          {!project.githubUrl && !project.demoUrl && (
            <span className="flex-1 bg-gray-300 text-gray-600 text-center py-2 px-4 rounded-md text-sm">
              準備中
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

// ヘッダーコンポーネント
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* 左側: サイトタイトルとナビゲーション */}
        <div className="flex items-center">
          {/* サイトタイトル */}
          <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mr-4 sm:mr-8 whitespace-nowrap tracking-widest">
            <a href="/" className="hover:text-blue-600 transition-colors">
              HOSODA KENJI
            </a>
          </h1>
          {/* メインナビゲーション - デスクトップのみ表示 */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <strong><a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">ABOUT</a></strong>
            <strong><a href="/" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">WORKS</a></strong>
            <strong><a href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">BLOG</a></strong>
          </nav>
        </div>
        
        {/* 右側: SNSリンクとハンバーガーメニュー */}
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-12">
          {/* SNSリンク */}
          <div className="flex space-x-4 sm:space-x-6 lg:space-x-12">
            <a 
              href="https://twitter.com/your_twitter" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a 
              href="https://github.com/your_github" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://zenn.dev/your_zenn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-600 transition-colors"
              aria-label="Zenn"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.264 23.771h4.984c.264 0 .498-.147.642-.382L19.614.874c.176-.293-.029-.667-.372-.667H14.24c-.264 0-.498.147-.642.382L.264 23.771zM17.916 23.419l3.254-5.436a.641.641 0 0 0-.642-.382h-4.984l5.436 5.818c.144.235.378.382.642.382h1.744z"/>
              </svg>
            </a>
          </div>
          
          {/* ハンバーガーメニューボタン - モバイルのみ表示 */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
            aria-label="メニューを開く"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-2 space-y-1">
            <a 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <a 
              href="/" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              WORKS
            </a>
            <a 
              href="/articles" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              BLOG
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// メタデータを生成する関数
// Client Componentではmetadataエクスポートができないため削除
// export const metadata = {
//   title: 'HOSODA KENJI',
//   description: 'Next.js、Docker、TypeScriptなど、モダンなWeb開発技術について実践的な内容を発信する技術ブログです。',
// }

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページヘッダー */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WORKS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            作成したWebアプリケーションやプロジェクトの一覧です。<br/>
            技術的な挑戦と学びの記録を共有しています。
          </p>
        </section>
        
        {/* プロジェクト一覧 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}