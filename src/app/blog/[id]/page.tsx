import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'
import { TableOfContents } from '@/components/features/blog'

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
      
      <div class="callout callout-warn">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="callout-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="callout-body">
            <p class="callout-text">
              <strong>注意：</strong>VM環境の比較検証はまだ完了していません。完全な3環境比較は今後の更新で提供予定です。
            </p>
          </div>
        </div>
      </div>

      <h2>今後の予定</h2>
      <div class="callout callout-info">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="callout-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="callout-body">
            <p class="callout-text">
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
      <p>この検証で使用したリポジトリは <a href="https://github.com/kmh-no3/Container_VM" target="_blank" rel="noopener noreferrer" class="callout-link">GitHub - kmh-no3/Container_VM</a> で公開されています。</p>
    `,
    publishedAt: '2025-08-23',
    tags: ['Docker', '開発環境', '比較検証', 'Node.js', 'PostgreSQL'],
    image: '🐳⚡💻' // Docker + 高速化 + 開発環境の絵文字
  },
  {
    id: 'sap-introduction-1',
    title: 'SAP Introduction #1｜なぜSAPは「高い」のに選ばれ続けるのか？',
    description: 'SAPはなぜ『高い』と言われながらも選ばれ続けるのか。会計・IT・導入現場の視点から、その本質的な価値を解説する。',
    content: `
      <h2>はじめに</h2>
      <p>「SAPは高い」</p>
      <p>SAP導入の話をすると、ほぼ必ず聞く言葉です。<br />
      実際、ライセンス費用・導入コスト・運用コストだけを見れば、<br />
      他のERPや会計システムと比べて安いとは言えません。</p>
      <p>それでも、<br />
      世界中の大企業、グローバル企業、そして成長企業は、<br />
      何十年にもわたってSAPを選び続けています。</p>
      <p>なぜでしょうか。</p>
      <p>本記事では、<br />
      <strong>「SAPとは何か」ではなく、<br />
      「なぜSAPは"高いのに"選ばれ続けるのか」</strong><br />
      を、会計・IT・導入現場の視点から整理します。</p>
      <p>SAP導入を検討している方だけでなく、<br />
      「SAPをどう説明すればよいか悩んでいる方」にとっても、<br />
      判断材料になれば幸いです。</p>

      <h2>1. SAPは「会計ソフト」ではない</h2>
      <p>SAPはしばしば、</p>
      <ul>
        <li>高機能な会計ソフト</li>
        <li>大企業向けのERP</li>
      </ul>
      <p>として説明されます。</p>
      <p>しかし、これらはSAPの一側面でしかありません。</p>
      <p>SAPの本質は、<br />
      <strong>企業活動を「一つの事実（Single Source of Truth）」として管理するための基盤</strong><br />
      にあります。</p>
      <p>売上、仕入、在庫、原価、人件費。<br />
      本来は一続きの企業活動であるにもかかわらず、<br />
      多くの企業では部門やシステムごとにデータが分断されています。</p>
      <p>SAPでは、これらを<br />
      <strong>一つのデータモデル・一つのルール</strong><br />
      で管理します。</p>
      <p>その結果、会計データは<br />
      「後から集計された結果」ではなく、<br />
      <strong>事業活動そのものをリアルタイムに反映した数字</strong><br />
      になります。</p>
      <p>この思想こそが、<br />
      SAPが単なる会計ソフトと根本的に異なる理由です。</p>

      <h2>2. なぜSAPは「高い」と言われるのか</h2>
      <p>SAPが高いと言われる理由は、主に3つあります。</p>

      <h3>① コストが"見える"</h3>
      <p>SAPは、<br />
      ライセンス費用・導入費用・保守費用が明確に提示されます。</p>
      <p>一方で、Excel運用や既存システムの属人化コスト、<br />
      将来的な業務リスクは、<br />
      多くの場合「見えないコスト」として扱われます。</p>
      <p>SAPはコストを隠しません。<br />
      それが「高く見える」一因です。</p>

      <h3>② 業務整理の負荷がSAPに転嫁される</h3>
      <p>SAP導入では、業務の見直しや整理が避けられません。<br />
      しかし本来これは、<br />
      <strong>どのシステムを導入する場合でも必要な作業</strong>です。</p>
      <p>それがSAP導入のタイミングで顕在化するため、<br />
      「SAPは大変」「SAPは高い」という印象につながります。</p>

      <h3>③ 「今のやり方」を変える必要がある</h3>
      <p>SAPは、<br />
      現行業務をそのまま再現するためのシステムではありません。</p>
      <p>標準化・統制・再現性を重視するため、<br />
      これまでのやり方を見直す必要があります。</p>
      <p>この"変化のコスト"が、<br />
      SAPを高く感じさせる最大の理由かもしれません。</p>

      <h2>3. それでもSAPが選ばれ続ける理由</h2>
      <p>それでもSAPが選ばれ続けるのは、<br />
      <strong>経営視点で見たときのリターンが圧倒的に大きい</strong>からです。</p>

      <h3>グローバル標準であること</h3>
      <p>SAPは、世界中の企業で使われています。<br />
      多言語・多通貨・各国会計基準・税制への対応は、<br />
      後付けではなく設計思想の一部です。</p>

      <h3>内部統制・説明責任に強い</h3>
      <p>「その数字は、なぜそうなったのか？」</p>
      <p>SAPでは、<br />
      取引の流れを遡って説明することが可能です。<br />
      これは、上場企業やグローバル企業にとって<br />
      非常に大きな価値を持ちます。</p>

      <h3>成長や変化に耐えられる</h3>
      <p>M&A、事業拡大、組織再編。<br />
      企業が成長すればするほど、<br />
      場当たり的なシステムでは限界が来ます。</p>
      <p>SAPは、<br />
      <strong>「今」ではなく「将来」を前提に設計された基盤</strong><br />
      です。</p>

      <h2>4. SAPが本当に価値を発揮する瞬間</h2>
      <p>SAPの価値は、<br />
      導入直後よりも <strong>数年後</strong> に効いてきます。</p>
      <ul>
        <li>事業が拡大したとき</li>
        <li>組織が複雑化したとき</li>
        <li>数字の説明責任を強く求められたとき</li>
      </ul>
      <p>そのとき初めて、<br />
      「SAPを入れておいてよかった」<br />
      と実感する企業は少なくありません。</p>

      <h2>5. SAPが「安くなる会社」と「高くなる会社」</h2>

      <h3>SAPが安くなる会社</h3>
      <ul>
        <li>導入目的が明確</li>
        <li>業務を見直す覚悟がある</li>
        <li>経営が主体的に関与している</li>
      </ul>

      <h3>SAPが高くなる会社</h3>
      <ul>
        <li>現行業務をそのまま再現しようとする</li>
        <li>SAP導入をIT部門任せにする</li>
        <li>導入そのものがゴールになっている</li>
      </ul>
      <p>SAPの価格は、<br />
      <strong>システムではなく「向き合い方」で決まる</strong><br />
      と言っても過言ではありません。</p>

      <h2>おわりに</h2>
      <p>SAPは、確かに安いシステムではありません。<br />
      しかしそれは、<br />
      単なるITツールではなく、<br />
      <strong>企業経営の基盤そのもの</strong>だからです。</p>
      <p>SAP導入を検討する際は、<br />
      「いくらかかるか」だけでなく、<br />
      「何を得たいのか」「どこまで変われるのか」<br />
      という視点で考えることが重要です。</p>
      <p>本記事が、<br />
      SAP導入を検討するうえでの<br />
      一つの判断材料になれば幸いです。</p>
      <p>次回は、<br />
      <strong>「SAP導入で会社は何が変わるのか？」</strong><br />
      をテーマに、<br />
      より具体的な業務・会計の変化について掘り下げていきます。</p>
    `,
    publishedAt: '2026-01-13',
    tags: ['SAP', 'ERP', 'SAP導入', 'ITコンサル', '会計システム'],
    image: '💼📊'
  }
]

// 静的パラメータを生成する関数
export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }))
}

// 記事詳細ページコンポーネント
export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = articles.find(a => a.id === id)

  // #region agent log
  try {
    const h = await headers()
    await fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'SRV_BLOG_HIT',
        location: 'src/app/blog/[id]/page.tsx:ArticlePage',
        message: 'Server render blog detail',
        data: {
          id,
          found: !!article,
          ua: h.get('user-agent') ? 'present' : 'missing',
          referer: h.get('referer') ?? null,
        },
        timestamp: Date.now(),
      }),
    })

    // どのコード版がサーバーで動いているかをログで確定する
    await fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'H14',
        location: 'src/app/blog/[id]/page.tsx:ArticlePage',
        message: 'Server build marker',
        data: {
          buildMarker: 'hardcoded-probe-v4',
          id,
        },
        timestamp: Date.now(),
      }),
    })
  } catch {
    // ignore
  }
  // #endregion agent log

  if (!article) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] mb-3 sm:mb-4">記事が見つかりません</h1>
          <p className="text-sm sm:text-base text-[color:var(--color-muted)] mb-6 sm:mb-8">指定された記事は存在しないか、削除された可能性があります。</p>
          <Link href="/" className="text-sm sm:text-base text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)] font-medium">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">

      {/* モバイル用Sticky目次（記事の外に配置） */}
      <div className="lg:hidden" id="toc-wrapper">
        <TableOfContents content={article.content} />
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 lg:pt-4">
        {/* #region agent log */}
        {typeof window !== 'undefined' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const main = document.querySelector('main');
                  const toc = document.querySelector('.mobile-toc-fixed');
                  const header = document.querySelector('header');
                  if (main && toc && header) {
                    const mainRect = main.getBoundingClientRect();
                    const tocRect = toc.getBoundingClientRect();
                    const headerRect = header.getBoundingClientRect();
                    const mainComputedStyle = window.getComputedStyle(main);
                    fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        location: 'page.tsx:284',
                        message: 'main要素とTOCの位置関係（記事を上に移動する前）',
                        data: {
                          mainTop: mainRect.top,
                          mainPaddingTop: mainComputedStyle.paddingTop,
                          mainPaddingTopValue: parseFloat(mainComputedStyle.paddingTop) || 0,
                          tocTop: tocRect.top,
                          tocBottom: tocRect.bottom,
                          tocHeight: tocRect.height,
                          headerHeight: headerRect.height,
                          headerBottom: headerRect.bottom,
                          gapBetweenTocAndMain: mainRect.top - tocRect.bottom,
                          overlap: tocRect.bottom > mainRect.top,
                          windowHeight: window.innerHeight,
                          suggestedPaddingTop: Math.max(tocRect.bottom - headerRect.bottom + 20, 80) + 'px'
                        },
                        timestamp: Date.now(),
                        sessionId: 'debug-session',
                        runId: 'padding-top-adjustment',
                        hypothesisId: 'A'
                      })
                    }).catch(() => {});
                  }
                })();
              `
            }}
          />
        )}
        {/* #endregion agent log */}
        {/* #region agent log */}
        {typeof window !== 'undefined' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    const html = document.documentElement;
                    const article = document.querySelector('article');
                    const content = document.querySelector('.article-content');
                    const table = content ? content.querySelector('table') : null;
                    const inlineCode = content ? content.querySelector(':not(pre) > code') : null;
                    const data = {
                      htmlDataset: { theme: html.dataset.theme, themeMode: html.dataset.themeMode },
                      article: article ? {
                        bg: getComputedStyle(article).backgroundColor,
                        color: getComputedStyle(article).color,
                        borderColor: getComputedStyle(article).borderColor
                      } : null,
                      content: content ? {
                        color: getComputedStyle(content).color,
                        linkColor: (function(){
                          const a = content.querySelector('a');
                          return a ? getComputedStyle(a).color : null;
                        })()
                      } : null,
                      table: table ? {
                        bg: getComputedStyle(table).backgroundColor,
                        borderColor: getComputedStyle(table).borderColor
                      } : null,
                      inlineCode: inlineCode ? {
                        bg: getComputedStyle(inlineCode).backgroundColor,
                        color: getComputedStyle(inlineCode).color
                      } : null
                    };
                    fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        sessionId: 'debug-session',
                        runId: 'pre-fix',
                        hypothesisId: 'B1',
                        location: 'src/app/blog/[id]/page.tsx:theme-styles',
                        message: 'Article theme computed styles',
                        data,
                        timestamp: Date.now()
                      })
                    }).catch(()=>{});
                  } catch (e) {}
                })();
              `
            }}
          />
        )}
        {/* #endregion agent log */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 relative">
          {/* メインコンテンツ */}
          <div className="flex-1 w-full lg:max-w-4xl">

            {/* 記事ヘッダー */}
            <article className="bg-[color:var(--color-surface)] rounded-lg shadow-md overflow-hidden border border-[color:var(--color-border)]">
              {article.image && (
                <Link href={`/blog/${article.id}`}>
                  <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[color:var(--color-article-hero-from)] to-[color:var(--color-article-hero-to)] flex items-center justify-center transition-all duration-300 cursor-pointer">
                    <div className="text-5xl sm:text-7xl">
                      {article.image}
                    </div>
                  </div>
                </Link>
              )}

              <div className="p-4 sm:p-6 lg:p-8">
                {/* 記事メタ情報 */}
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="text-xs sm:text-sm text-[color:var(--color-muted)]">
                    {new Date(article.publishedAt).toLocaleDateString('ja-JP')}
                  </div>
                </div>

                {/* 記事タイトル */}
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[color:var(--color-fg)] mb-3 sm:mb-4">
                  {article.title}
                </h1>

                {/* 記事説明 */}
                <p className="text-sm sm:text-base lg:text-lg text-[color:var(--color-muted)] mb-4 sm:mb-6">
                  {article.description}
                </p>

                {/* タグ */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full bg-[color:var(--color-accent-alpha-16)] text-[color:var(--color-fg)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 記事本文 */}
                <div
                  className="prose prose-sm sm:prose-base lg:prose-lg max-w-none article-content"
                  dangerouslySetInnerHTML={{
                    __html: `
                      ${article.content}
                      <script>
                        (function() {
                          try {
                            var html = document.documentElement;
                            var articleEl = document.querySelector('article');
                            var contentEl = document.querySelector('.article-content');
                            var tableEl = contentEl ? contentEl.querySelector('table') : null;
                            var inlineCodeEl = null;
                            if (contentEl) {
                              var anyCodeEl = contentEl.querySelector('code');
                              if (anyCodeEl && !anyCodeEl.closest('pre')) {
                                inlineCodeEl = anyCodeEl;
                              }
                            }
                            var aEl = contentEl ? contentEl.querySelector('a') : null;
                            var data = {
                              htmlDataset: { theme: html.dataset.theme, themeMode: html.dataset.themeMode },
                              article: articleEl ? {
                                bg: getComputedStyle(articleEl).backgroundColor,
                                color: getComputedStyle(articleEl).color,
                                borderColor: getComputedStyle(articleEl).borderColor
                              } : null,
                              content: contentEl ? {
                                color: getComputedStyle(contentEl).color,
                                linkColor: aEl ? getComputedStyle(aEl).color : null
                              } : null,
                              table: tableEl ? {
                                bg: getComputedStyle(tableEl).backgroundColor,
                                borderColor: getComputedStyle(tableEl).borderColor
                              } : null,
                              inlineCode: inlineCodeEl ? {
                                bg: getComputedStyle(inlineCodeEl).backgroundColor,
                                color: getComputedStyle(inlineCodeEl).color
                              } : null
                            };
                            var payload = {
                              sessionId: 'debug-session',
                              runId: 'pre-fix',
                              hypothesisId: 'B1',
                              location: 'src/app/blog/[id]/page.tsx:article-html',
                              message: 'Article theme computed styles (html script)',
                              data: data,
                              timestamp: Date.now()
                            };
                            fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify(payload)
                            }).catch(function(){
                              try {
                                fetch('/api/agent-log', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify(payload)
                                }).catch(function(){});
                              } catch (e) {}
                            });
                          } catch (e) {}
                        })();
                      </script>
                      <script>
                        (function() {
                          if (typeof window !== 'undefined') {
                            setTimeout(function() {
                              const preElements = document.querySelectorAll('.article-content pre, .prose pre');
                              if (preElements.length > 0) {
                                const firstPre = preElements[0];
                                const computedStyle = window.getComputedStyle(firstPre);
                                fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    location: 'page.tsx:code-block-styles',
                                    message: 'コードブロックのスタイル確認',
                                    data: {
                                      preCount: preElements.length,
                                      backgroundColor: computedStyle.backgroundColor,
                                      color: computedStyle.color,
                                      backgroundImage: computedStyle.backgroundImage,
                                      opacity: computedStyle.opacity,
                                      classes: firstPre.className,
                                      parentClasses: firstPre.parentElement?.className || '',
                                      codeElement: firstPre.querySelector('code') ? {
                                        backgroundColor: window.getComputedStyle(firstPre.querySelector('code')).backgroundColor,
                                        color: window.getComputedStyle(firstPre.querySelector('code')).color
                                      } : null
                                    },
                                    timestamp: Date.now(),
                                    sessionId: 'debug-session',
                                    runId: 'code-block-styles-check',
                                    hypothesisId: 'A'
                                  })
                                }).catch(() => {});
                              }
                            }, 1000);
                          }
                        })();
                      </script>
                    `
                  }}
                />
              </div>
            </article>

            {/* 関連記事セクション */}
            <section className="mt-8 sm:mt-12">
              <h2 className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] mb-4 sm:mb-6">関連記事</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {articles
                  .filter(a => a.id !== article.id)
                  .slice(0, 2)
                  .map((relatedArticle) => (
                    <Link
                      key={relatedArticle.id}
                      href={`/blog/${relatedArticle.id}`}
                      className="block bg-[color:var(--color-surface)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[color:var(--color-border)]"
                    >
                      {relatedArticle.image && (
                        <div className="relative h-24 sm:h-32 bg-gradient-to-br from-[color:var(--color-article-hero-from)] to-[color:var(--color-article-hero-to)] flex items-center justify-center">
                          <div className="text-2xl sm:text-3xl">
                            {relatedArticle.image}
                          </div>
                        </div>
                      )}
                      <div className="p-3 sm:p-4">
                        <h3 className="text-sm sm:text-base font-semibold text-[color:var(--color-fg)] mb-1 sm:mb-2 line-clamp-2">
                          {relatedArticle.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[color:var(--color-muted)] line-clamp-2">
                          {relatedArticle.description}
                        </p>
                        <div className="flex items-center mt-2 sm:mt-3 text-xs text-[color:var(--color-muted)]">
                          <span>{new Date(relatedArticle.publishedAt).toLocaleDateString('ja-JP')}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </section>

            {/* 戻るボタン */}
            <div className="mt-6 sm:mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm sm:text-base text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)] font-medium"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                ホームに戻る
              </Link>
            </div>
          </div>

          {/* TOC（デスクトップのみ表示） - Sticky配置 */}
          <aside className="hidden lg:block w-64 xl:w-72 flex-shrink-0">
            <div className="toc-desktop-sticky overflow-y-auto">
              <TableOfContents content={article.content} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
} 