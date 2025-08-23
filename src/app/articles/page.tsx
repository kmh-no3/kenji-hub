"use client"

import Image from 'next/image'
import Link from 'next/link'

// 記事データの型定義
interface Article {
  id: string
  title: string
  description: string
  publishedAt: string
  tags: string[]
  image?: string
}

// 記事データ（Container_VMリポジトリの内容を基に作成）
const articles: Article[] = [
  {
    id: 'container-vm-development-comparison',
    title: '開発環境比較検証：Native vs Docker での開発体験の違い（VM環境は準備中）',
    description: '異なる開発環境（Native、Docker）での開発パターンを比較検証した結果をまとめました。VM環境の比較は現在準備中です。セットアップの複雑さ、環境の一貫性、パフォーマンスなど、実践的な観点から詳しく解説します。',
    publishedAt: '2025-08-23',
    tags: ['Docker', '開発環境', '比較検証', 'Node.js', 'PostgreSQL'],
    image: '🐳⚡💻' // Docker + 高速化 + 開発環境の絵文字
  }
]

// 記事カードコンポーネント
function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
              {/* 記事サムネイル（絵文字） */}
        {article.image && (
          <Link href={`/articles/${article.id}`}>
            <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 cursor-pointer">
              <div className="text-6xl">
                {article.image}
              </div>
            </div>
          </Link>
        )}
      
      <div className="p-6">
        {/* 記事タイトル */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          <Link href={`/articles/${article.id}`}>
            {article.title}
          </Link>
        </h2>
        
        {/* 記事説明 */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* 記事メタ情報 */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
          </div>
          
          {/* 読むボタン */}
          <Link
            href={`/articles/${article.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            読む →
          </Link>
        </div>
      </div>
    </article>
  )
}

// ヘッダーコンポーネント
function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* サイトタイトル */}
          <Link href="/" className="flex items-center mr-8">
            <h1 className="text-2xl font-bold text-gray-900">Kenji Hub</h1>
          </Link>
          
          {/* メインナビゲーション */}
          <nav className="flex space-x-6">
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/works" className="text-gray-700 hover:text-blue-600 transition-colors">Works</Link>
            <Link href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors font-bold">Blog</Link>
          </nav>
          
          {/* SNSリンク */}
          <div className="ml-auto flex space-x-4">
            <a 
              href="https://twitter.com/your_twitter" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-500 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.264 23.771h4.984c.264 0 .498-.147.642-.382L19.614.874c.176-.293-.029-.667-.372-.667H14.24c-.264 0-.498.147-.642.382L.264 23.771zM17.916 23.419l3.254-5.436a.641.641 0 0 0-.642-.382h-4.984l5.436 5.818c.144.235.378.382.642.382h1.744z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
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
            技術的な学びや開発体験について発信しています。<br/>
            実践的な内容を中心に、開発者にとって役立つ情報をお届けします。
          </p>
        </section>
        
        {/* 記事一覧 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
        
        {/* 記事が見つからない場合のメッセージ */}
        {articles.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりません</h2>
            <p className="text-gray-600">現在、公開されている記事はありません。</p>
          </div>
        )}
      </main>
    </div>
  )
} 