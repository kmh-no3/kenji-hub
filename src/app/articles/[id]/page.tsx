import Image from 'next/image'
import Link from 'next/link'

// 記事データの型定義
interface Article {
  id: string
  title: string
  description: string
  content: string
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
    content: `
      <h2>はじめに</h2>
      <p>Next.js 14は、Reactアプリケーションの開発をより効率的にするための多くの新機能を提供します。この記事では、App Router、Server Components、そして最新の最適化技術について詳しく解説します。</p>
      
      <h2>App Routerの利点</h2>
      <p>App Routerは、ファイルシステムベースのルーティングを提供し、より直感的なページ構造を作成できます。また、Server ComponentsとClient Componentsを適切に使い分けることで、パフォーマンスを向上させることができます。</p>
      
      <h2>Server Componentsの活用</h2>
      <p>Server Componentsを使用することで、サーバーサイドでレンダリングされたコンポーネントをクライアントに送信できます。これにより、初期ページロードの速度が向上し、SEOも改善されます。</p>
      
      <h2>最適化技術</h2>
      <p>Next.js 14では、画像の最適化、フォントの最適化、そしてコード分割が自動的に行われます。これらの機能を活用することで、ユーザー体験を大幅に向上させることができます。</p>
      
      <h2>まとめ</h2>
      <p>Next.js 14の新機能を活用することで、より高速で保守性の高いWebアプリケーションを構築できます。App RouterとServer Componentsを適切に使用し、最適化技術を活用することで、ユーザーに最高の体験を提供できます。</p>
    `,
    publishedAt: '2024-01-15',
    readTime: '8分',
    tags: ['Next.js', 'React', 'Web開発'],
    image: '/kenji-hub/next.svg',
    author: {
      name: '細田健司',
      avatar: '/kenji-hub/globe.svg'
    }
  },
  {
    id: '2',
    title: 'Dockerを使った開発環境の構築とベストプラクティス',
    description: 'Dockerを活用した効率的な開発環境の構築方法と、本番環境での運用について実践的なガイドを提供します。',
    content: `
      <h2>Dockerとは</h2>
      <p>Dockerは、アプリケーションをコンテナ化することで、一貫した環境でアプリケーションを実行できるツールです。開発環境から本番環境まで、同じ環境でアプリケーションを動作させることができます。</p>
      
      <h2>開発環境の構築</h2>
      <p>Docker Composeを使用することで、複数のサービスを簡単に管理できます。データベース、Webサーバー、キャッシュサーバーなど、必要なサービスを定義ファイルで管理し、一つのコマンドで起動できます。</p>
      
      <h2>本番環境での運用</h2>
      <p>本番環境では、マルチステージビルドを使用して、最終的なイメージサイズを小さくすることが重要です。また、セキュリティのベストプラクティスに従い、必要最小限の権限でコンテナを実行する必要があります。</p>
      
      <h2>監視とログ</h2>
      <p>本番環境では、コンテナの監視とログの収集が重要です。Prometheus、Grafana、ELKスタックなどを使用して、アプリケーションの健全性を監視し、問題の早期発見に努めましょう。</p>
    `,
    publishedAt: '2024-01-10',
    readTime: '12分',
    tags: ['Docker', 'DevOps', 'インフラ'],
    image: '/kenji-hub/file.svg',
    author: {
      name: '細田健司',
      avatar: '/kenji-hub/globe.svg'
    }
  }
]

// 静的パラメータを生成する関数
export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }))
}

// メタデータを生成する関数
export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = articles.find(a => a.id === params.id)
  
  if (!article) {
    return {
      title: '記事が見つかりません - Kenji Hub',
      description: '指定された記事は存在しないか、削除された可能性があります。',
    }
  }

  return {
    title: `${article.title} - Kenji Hub`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  }
}

// 記事詳細ページコンポーネント
export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = articles.find(a => a.id === params.id)

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">記事が見つかりません</h1>
          <p className="text-gray-600 mb-8">指定された記事は存在しないか、削除された可能性があります。</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            {/* サイトタイトル */}
            <Link href="/" className="flex items-center mr-8">
              <h1 className="text-2xl font-bold text-gray-900">Kenji Hub</h1>
            </Link>
            
            {/* メインナビゲーション */}
            <nav className="flex space-x-6">
              <Link href="/kenji-hub/about" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link href="/kenji-hub/work" className="text-gray-700 hover:text-blue-600 transition-colors">Work</Link>
              <Link href="/kenji-hub/blog" className="text-gray-700 hover:text-blue-600 transition-colors">Blog</Link>
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 記事ヘッダー */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.image && (
            <div className="relative h-64 bg-gray-100">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          
          <div className="p-8">
            {/* 記事メタ情報 */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <Image
                    src={article.author.avatar}
                    alt={article.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                    unoptimized
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-600">{article.author.name}</span>
                  <div className="text-xs text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString('ja-JP')} • {article.readTime}
                  </div>
                </div>
              </div>
            </div>

            {/* 記事タイトル */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* 記事説明 */}
            <p className="text-lg text-gray-600 mb-6">
              {article.description}
            </p>

            {/* タグ */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 記事本文 */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>

        {/* 関連記事セクション */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">関連記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles
              .filter(a => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/articles/${relatedArticle.id}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  {relatedArticle.image && (
                    <div className="relative h-32 bg-gray-100">
                      <Image
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedArticle.description}
                    </p>
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <span>{new Date(relatedArticle.publishedAt).toLocaleDateString('ja-JP')}</span>
                      <span className="mx-2">•</span>
                      <span>{relatedArticle.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* 戻るボタン */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  )
} 