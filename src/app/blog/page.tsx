"use client"

import { ArticleCard } from '@/components/features/blog';
import Header from '@/components/layout/Header';
import { articles } from '@/config/articles';

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ページヘッダー */}
        <section className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            BLOG
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          実践的な内容を中心に技術的な学びや開発体験について発信しています。<br/>
          </p>
        </section>
        
        {/* 記事一覧 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
        
        {/* 記事が見つからない場合のメッセージ */}
        {articles.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">記事が見つかりません</h2>
            <p className="text-sm sm:text-base text-gray-600">現在、公開されている記事はありません。</p>
          </div>
        )}
      </main>
    </div>
  )
} 