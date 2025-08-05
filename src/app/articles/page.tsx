"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

// 記事データの型定義
interface Article {
  id: string
  title: string
  description: string
  publishedAt: string
  readTime: string
  tags: string[]
  image?: string
  author: {
    name: string
    avatar: string
  }
}

// サンプル記事データ
const articles: Article[] = [
  {
    id: '1',
    title: 'Next.js 14でモダンなWebアプリケーションを構築する',
    description: 'Next.js 14の新機能を活用して、パフォーマンスと開発体験を向上させる方法を解説します。App Router、Server Components、そして最新の最適化技術について詳しく説明します。',
    publishedAt: '2025-01-15',
    readTime: '8分',
    tags: ['Next.js', 'React', 'Web開発'],
    image: '/next.svg',
    author: {
      name: '細田健司',
      avatar: '/globe.svg'
    }
  },
  {
    id: '2',
    title: 'Dockerを使った開発環境の構築とベストプラクティス',
    description: 'Dockerを活用した効率的な開発環境の構築方法と、本番環境での運用について実践的なガイドを提供します。',
    publishedAt: '2025-01-10',
    readTime: '12分',
    tags: ['Docker', 'DevOps', 'インフラ'],
    image: '/file.svg',
    author: {
      name: '細田健司',
      avatar: '/globe.svg'
    }
  },
  {
    id: '3',
    title: 'TypeScriptで型安全なアプリケーション開発',
    description: 'TypeScriptの高度な型システムを活用して、バグの少ない堅牢なアプリケーションを開発する方法を学びます。',
    publishedAt: '2025-01-05',
    readTime: '10分',
    tags: ['TypeScript', 'JavaScript', '型システム'],
    image: '/window.svg',
    author: {
      name: '細田健司',
      avatar: '/globe.svg'
    }
  },
  {
    id: '4',
    title: 'TailwindCSSで美しいUIを効率的に構築する',
    description: 'TailwindCSSのユーティリティファーストアプローチを使って、保守性の高い美しいUIを構築するテクニックを紹介します。',
    publishedAt: '2025-01-01',
    readTime: '6分',
    tags: ['CSS', 'TailwindCSS', 'UI/UX'],
    image: '/vercel.svg',
    author: {
      name: '細田健司',
      avatar: '/globe.svg'
    }
  }
]

// 記事カードコンポーネント
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.id}`} className="block">
      <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
        {article.image && (
          <div className="relative h-48 bg-gray-100">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                  unoptimized
                />
              </div>
              <span className="text-sm text-gray-600">{article.author.name}</span>
            </div>
            <div className="ml-auto text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readTime}
            </div>
          </div>
        </div>
      </article>
    </Link>
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
            <a href="https://kmh-no3.github.io/kenji-hub" className="hover:text-blue-600 transition-colors">
              HOSODA KENJI
            </a>
          </h1>
          {/* メインナビゲーション - デスクトップのみ表示 */}
          <nav className="hidden md:flex space-x-4 lg:space-x-6">
            <strong><a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">ABOUT</a></strong>
            <strong><a href="https://kmh-no3.github.io/kenji-hub/works" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">WORKS</a></strong>
            <strong><a href="https://kmh-no3.github.io/kenji-hub/articles" className="text-gray-700 hover:text-blue-600 transition-colors text-sm lg:text-base">BLOG</a></strong>
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
              href="https://kmh-no3.github.io/kenji-hub/works" 
              className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              WORKS
            </a>
            <a 
              href="https://kmh-no3.github.io/kenji-hub/articles" 
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

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページヘッダー */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BLOG
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            技術的な知見を共有する<br/>
            モダンなWeb開発技術やコンピュータサイエンスについて、実践的な内容を発信しています。
          </p>
        </section>
        
        {/* タグセクション */}
        <section className="mt-16 mb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">タグ一覧</h2>
          <div className="flex flex-wrap gap-3">
            {['Next.js', 'React', 'TypeScript', 'Docker', 'DevOps', 'Web開発', 'CSS', 'JavaScript'].map((tag) => (
              <a
                key={tag}
                href="#"
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-gray-700 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                {tag}
              </a>
            ))}
          </div>
        </section>

        {/* 記事一覧 */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">最新記事</h2>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
              すべての記事を見る →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
} 