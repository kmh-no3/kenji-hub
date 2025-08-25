"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/layout/Header'

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
          <Link href={`/blog/${article.id}`}>
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
          <Link href={`/blog/${article.id}`}>
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
            href={`/blog/${article.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            読む →
          </Link>
        </div>
      </div>
    </article>
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