import Image from 'next/image'
import Link from 'next/link'

// 記事データの型定義
interface Article {
  id: string
  title: string
  description: string
  content: string
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
    content: `
      <h2>はじめに</h2>
      <p>このプロジェクトは、異なる開発環境（Native、Docker、VM）での開発パターンを比較検証することを目的としています。<strong>現在は、Native環境とDocker環境の比較結果のみをまとめており、VM環境の検証は今後の課題として残っています。</strong></p>
      
      <h2>プロジェクト概要</h2>
      <p><strong>現在完了している部分</strong>：Native環境とDocker環境で同じTODOアプリケーションを実装し、以下の仕様で比較検証を行いました：</p>
      <ul>
        <li><strong>フレームワーク</strong>: Express.js</li>
        <li><strong>データベース</strong>: PostgreSQL</li>
        <li><strong>API エンドポイント</strong>: GET /todos（TODO一覧取得）、POST /todos（新しいTODO作成）</li>
        <li><strong>ポート</strong>: 3000番</li>
      </ul>

      <h2>環境別セットアップ比較（現在完了分）</h2>
      
      <h3>Native環境</h3>
      <p>Native環境でのセットアップは以下の手順で行いました：</p>
      <pre><code># 必要なソフトウェアのインストール
brew install postgresql
brew services start postgresql

# プロジェクト初期化
npm init -y
npm install express pg

# データベース設定
createdb todo_app
psql -d todo_app -c "CREATE TABLE todos (id SERIAL PRIMARY KEY, task TEXT);"</code></pre>

      <h3>Docker環境</h3>
      <p>Docker環境でのセットアップは以下の手順で行いました：</p>
      <pre><code># 必要なソフトウェアのインストール
# Docker Desktopのみ必要

# プロジェクト初期化
npm init -y
npm install express pg

# コンテナ化設定
# Dockerfileとdocker-compose.ymlを作成</code></pre>

      <h2>詳細比較結果（Native vs Docker）</h2>
      
      <table class="w-full border-collapse border border-gray-300 my-6">
        <thead>
          <tr class="bg-gray-100">
            <th class="border border-gray-300 px-4 py-2 text-left">項目</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Native環境</th>
            <th class="border border-gray-300 px-4 py-2 text-left">Docker環境</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>セットアップの複雑さ</strong></td>
            <td class="border border-gray-300 px-4 py-2">中（OS依存の設定が必要）</td>
            <td class="border border-gray-300 px-4 py-2">低（Dockerのみ）</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2"><strong>環境の一貫性</strong></td>
            <td class="border border-gray-300 px-4 py-2">低（OS依存）</td>
            <td class="border border-gray-300 px-4 py-2">高（コンテナ化）</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>依存関係管理</strong></td>
            <td class="border border-gray-300 px-4 py-2">手動（brew、npm）</td>
            <td class="border border-gray-300 px-4 py-2">自動（Dockerfile）</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2"><strong>データベース設定</strong></td>
            <td class="border border-gray-300 px-4 py-2">手動（PostgreSQL設定）</td>
            <td class="border border-gray-300 px-4 py-2">自動（docker-compose）</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>起動時間</strong></td>
            <td class="border border-gray-300 px-4 py-2">短（直接実行）</td>
            <td class="border border-gray-300 px-4 py-2">中（コンテナビルド）</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2"><strong>リソース使用量</strong></td>
            <td class="border border-gray-300 px-4 py-2">低（直接実行）</td>
            <td class="border border-gray-300 px-4 py-2">中（コンテナオーバーヘッド）</td>
          </tr>
          <tr>
            <td class="border border-gray-300 px-4 py-2"><strong>開発者体験</strong></td>
            <td class="border border-gray-300 px-4 py-2">シンプル</td>
            <td class="border border-gray-300 px-4 py-2">統一された環境</td>
          </tr>
          <tr class="bg-gray-50">
            <td class="border border-gray-300 px-4 py-2"><strong>本番環境との差異</strong></td>
            <td class="border border-gray-300 px-4 py-2">大（環境依存）</td>
            <td class="border border-gray-300 px-4 py-2">小（コンテナ化）</td>
          </tr>
        </tbody>
      </table>

      <h2>パフォーマンス比較（Native vs Docker）</h2>
      
      <h3>起動時間</h3>
      <ul>
        <li><strong>Native</strong>: ~1秒（直接実行）</li>
        <li><strong>Docker</strong>: ~30秒（初回ビルド時）、~5秒（2回目以降）</li>
      </ul>

      <h3>メモリ使用量（実測値）</h3>
      <ul>
        <li><strong>Native</strong>: ~38MB（Node.js + Express）</li>
        <li><strong>Docker</strong>: ~38MB（アプリコンテナ20MB + DBコンテナ18MB）</li>
      </ul>

      <h3>ディスク使用量（実測値）</h3>
      <ul>
        <li><strong>Native</strong>: ~4.7MB（プロジェクト全体、node_modules: 4.6MB）</li>
        <li><strong>Docker</strong>: ~846MB（アプリイメージ196MB + PostgreSQLイメージ650MB）</li>
      </ul>

      <h2>メリット・デメリット分析</h2>
      
      <h3>Native環境</h3>
      <h4>メリット:</h4>
      <ul>
        <li>シンプルなセットアップ</li>
        <li>高速な起動</li>
        <li>リソース使用量が少ない</li>
        <li>直接的なデバッグが可能</li>
      </ul>
      <h4>デメリット:</h4>
      <ul>
        <li>OS依存の設定が必要</li>
        <li>環境の一貫性が保ちにくい</li>
        <li>チーム間での環境差異が生じやすい</li>
        <li>本番環境との差異が大きい</li>
      </ul>

      <h3>Docker環境</h3>
      <h4>メリット:</h4>
      <ul>
        <li>環境の一貫性が高い</li>
        <li>依存関係の管理が自動化</li>
        <li>チーム間での環境統一が容易</li>
        <li>本番環境との差異が小さい</li>
        <li>マイクロサービスアーキテクチャに適している</li>
      </ul>
      <h4>デメリット:</h4>
      <ul>
        <li>学習コストが高い</li>
        <li>コンテナオーバーヘッド</li>
        <li>ビルド時間がかかる</li>
        <li>デバッグが複雑になる場合がある</li>
      </ul>

      <h2>推奨用途</h2>
      
      <h3>Native環境が適している場合</h3>
      <ul>
        <li>個人開発・学習</li>
        <li>シンプルなプロトタイプ</li>
        <li>リソースが限られた環境</li>
        <li>高速な開発サイクルが必要</li>
      </ul>

      <h3>Docker環境が適している場合</h3>
      <ul>
        <li>チーム開発</li>
        <li>マイクロサービスアーキテクチャ</li>
        <li>CI/CDパイプライン</li>
        <li>本番環境との一貫性が重要</li>
        <li>複数のサービスを統合</li>
      </ul>

      <h2>現在の結論（Native vs Docker）</h2>
      <p>現在完了しているNative環境とDocker環境の比較では、両環境とも同じTODOアプリケーションを正常に動作させることができましたが、開発体験と運用面で大きな違いがあります。</p>
      
      <ul>
        <li><strong>Native環境</strong>は、シンプルで高速な開発に適しており、個人開発や学習用途に最適です。</li>
        <li><strong>Docker環境</strong>は、チーム開発や本番環境との一貫性が重要な場合に適しており、現代的な開発プラクティスに合致しています。</li>
      </ul>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              <strong>注意：</strong>VM環境の比較検証はまだ完了していません。完全な3環境比較は今後の更新で提供予定です。
            </p>
          </div>
        </div>
      </div>

      <h2>今後の予定</h2>
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-blue-700">
              <strong>進行中：</strong>VM環境での開発パターン実装と3環境の包括的比較を準備中です。
            </p>
          </div>
        </div>
      </div>
      
      <ul>
        <li><strong>VM環境での開発パターン実装</strong> - 現在準備中</li>
        <li><strong>3環境の包括的比較</strong> - Native vs Docker vs VM</li>
        <li><strong>パフォーマンスベンチマーク</strong> - 3環境での詳細な性能測定</li>
        <li><strong>セキュリティ比較</strong> - 各環境のセキュリティ特性分析</li>
        <li><strong>運用コスト比較</strong> - 開発・運用コストの定量的評価</li>
      </ul>

      <h2>参考リンク</h2>
      <p>この検証で使用したリポジトリは <a href="https://github.com/kmh-no3/Container_VM" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">GitHub - kmh-no3/Container_VM</a> で公開されています。</p>
    `,
    publishedAt: '2025-08-23',
    tags: ['Docker', '開発環境', '比較検証', 'Node.js', 'PostgreSQL'],
    image: '🐳⚡💻' // Docker + 高速化 + 開発環境の絵文字
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 記事ヘッダー */}
        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {article.image && (
            <Link href={`/articles/${article.id}`}>
              <div className="relative h-64 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center hover:from-blue-100 hover:to-indigo-200 transition-all duration-300 cursor-pointer">
                <div className="text-7xl">
                  {article.image}
                </div>
              </div>
            </Link>
          )}
          
          <div className="p-8">
            {/* 記事メタ情報 */}
            <div className="flex items-center mb-6">
              <div className="text-sm text-gray-500">
                {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
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
                    <div className="relative h-32 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <div className="text-3xl">
                        {relatedArticle.image}
                      </div>
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