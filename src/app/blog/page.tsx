"use client"

import { ArticleCard } from '@/components/features/blog';
import Header from '@/components/layout/Header';
import { articles } from '@/config/articles';

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