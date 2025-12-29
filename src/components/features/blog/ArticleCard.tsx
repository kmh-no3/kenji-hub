import Link from 'next/link';
import { Article } from '@/types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* 記事サムネイル（絵文字） */}
      {article.image && (
        <Link href={`/blog/${article.id}`}>
          <div className="relative h-36 sm:h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 cursor-pointer">
            <div className="text-5xl sm:text-6xl">
              {article.image}
            </div>
          </div>
        </Link>
      )}
      
      <div className="p-4 sm:p-6">
        {/* 記事タイトル */}
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          <Link href={`/blog/${article.id}`}>
            {article.title}
          </Link>
        </h2>
        
        {/* 記事説明 */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
          {article.description}
        </p>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 sm:py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
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
            href={`/blog/${article.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            読む →
          </Link>
        </div>
      </div>
    </article>
  );
}

