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
  },
  {
    id: 'sap-introduction-2',
    title: 'SAP Introduction #2｜SAP導入で会社は何が変わるのか？',
    description: 'SAP導入によって企業の業務・会計・経営はどのように変わるのか。現場から経営層までの視点で具体的に解説する。',
    content: `
      <h2>はじめに</h2>
      <p>SAP導入を検討する際、<br />
      よく聞かれる質問があります。</p>
      <ul>
        <li>「結局、何が良くなるのか？」</li>
        <li>「今のシステムと何が違うのか？」</li>
        <li>「導入したら現場は楽になるのか？」</li>
      </ul>
      <p>SAP導入は、<br />
      単なるシステム刷新ではありません。</p>
      <p><strong>業務・会計・経営のあり方そのものが変わる</strong><br />
      ——それがSAP導入です。</p>
      <p>本記事では、<br />
      SAP導入によって会社がどのように変わるのかを、<br />
      以下の3つの視点で整理します。</p>
      <ul>
        <li>業務の視点</li>
        <li>会計の視点</li>
        <li>経営の視点</li>
      </ul>

      <h2>1. 業務はどう変わるのか</h2>

      <h3>属人化から「再現できる業務」へ</h3>
      <p>SAP導入前の現場では、<br />
      以下のような状態が珍しくありません。</p>
      <ul>
        <li>Excelが乱立している</li>
        <li>手作業の転記・集計が多い</li>
        <li>特定の人しか分からない業務がある</li>
      </ul>
      <p>SAP導入によって、<br />
      業務はシステム上で定義され、<br />
      <strong>「誰がやっても同じ結果になる」</strong>形に近づきます。</p>
      <p>これは一見、<br />
      現場の自由度を奪うように見えるかもしれません。</p>
      <p>しかし実際には、</p>
      <ul>
        <li>引き継ぎが容易になる</li>
        <li>人が変わっても業務が回る</li>
        <li>ミスが起きにくくなる</li>
      </ul>
      <p>といった形で、<br />
      <strong>現場の持続性を高める効果</strong>をもたらします。</p>

      <h3>業務フローが「見える」ようになる</h3>
      <p>SAPでは、<br />
      取引の流れがシステム上で一貫して管理されます。</p>
      <p>たとえば、</p>
      <ul>
        <li>受注</li>
        <li>出荷</li>
        <li>請求</li>
        <li>入金</li>
      </ul>
      <p>といった一連の流れが、<br />
      途中で分断されることなくつながります。</p>
      <p>これにより、</p>
      <ul>
        <li>どこで業務が滞っているのか</li>
        <li>どこにボトルネックがあるのか</li>
      </ul>
      <p>が可視化され、<br />
      改善の議論ができるようになります。</p>

      <h2>2. 会計はどう変わるのか</h2>

      <h3>会計が「結果」ではなく「プロセス」になる</h3>
      <p>SAP導入前の会計は、<br />
      しばしば「最後に数字を合わせる作業」になりがちです。</p>
      <ul>
        <li>月末にまとめて仕訳</li>
        <li>Excelでの調整</li>
        <li>理由を後から説明</li>
      </ul>
      <p>SAPでは、<br />
      <strong>業務の発生と同時に会計データが生成</strong>されます。</p>
      <p>そのため会計は、</p>
      <ul>
        <li>後追いの集計</li>
        <li>調整ありきの数字</li>
      </ul>
      <p>ではなく、<br />
      <strong>業務プロセスそのものを反映した数字</strong>になります。</p>

      <h3>「なぜこの数字なのか」を説明できる</h3>
      <p>SAPでは、<br />
      会計仕訳の背景となる業務データを<br />
      辿ることが可能です。</p>
      <ul>
        <li>この売上は、どの受注から生まれたのか</li>
        <li>この原価は、どの取引に紐づくのか</li>
      </ul>
      <p>こうした説明ができることは、<br />
      経理部門にとって大きな武器になります。</p>
      <p>単に数字を作るだけでなく、<br />
      <strong>数字の意味を語れる会計</strong>へ変わるのです。</p>

      <h2>3. 経営はどう変わるのか</h2>

      <h3>数字を見るスピードが変わる</h3>
      <p>SAP導入後、<br />
      経営層が最初に実感する変化の一つが<br />
      <strong>「数字を見るスピード」</strong>です。</p>
      <ul>
        <li>月次決算の早期化</li>
        <li>リアルタイムに近い業績把握</li>
        <li>部門別・事業別の可視化</li>
      </ul>
      <p>これにより、<br />
      経営判断が「事後対応」から<br />
      「先手を打つ判断」へ変わっていきます。</p>

      <h3>経営と現場が同じ数字を見る</h3>
      <p>SAPでは、<br />
      現場・経理・経営が<br />
      <strong>同じデータを見て議論</strong>します。</p>
      <p>これは当たり前のようで、<br />
      実は非常に重要なポイントです。</p>
      <ul>
        <li>数字の正しさを疑う時間</li>
        <li>データの突き合わせ</li>
      </ul>
      <p>こうした無駄が減り、<br />
      「次に何をするか」という<br />
      本質的な議論に時間を使えるようになります。</p>

      <h2>4. SAP導入は「ITプロジェクト」ではない</h2>
      <p>ここまで見てきた通り、<br />
      SAP導入の影響範囲は<br />
      業務・会計・経営に及びます。</p>
      <p>そのため、<br />
      SAP導入を <strong>IT部門だけのプロジェクト</strong><br />
      として進めると、うまくいきません。</p>
      <ul>
        <li>業務部門の関与</li>
        <li>経理部門の視点</li>
        <li>経営の意思</li>
      </ul>
      <p>これらが揃って初めて、<br />
      SAPは本来の価値を発揮します。</p>

      <h2>5. 「変わる覚悟」があるかどうか</h2>
      <p>SAP導入で最も重要なのは、<br />
      システム選定でも、<br />
      パートナー選定でもありません。</p>
      <p><strong>「会社として、どこまで変わる覚悟があるか」</strong><br />
      です。</p>
      <ul>
        <li>業務を見直せるか</li>
        <li>標準に合わせる判断ができるか</li>
        <li>経営が関与できるか</li>
      </ul>
      <p>この覚悟がある会社では、<br />
      SAPは「高い投資」ではなく、<br />
      <strong>長期的に効き続ける経営基盤</strong>になります。</p>

      <h2>おわりに</h2>
      <p>SAP導入によって変わるのは、<br />
      画面や操作方法だけではありません。</p>
      <ul>
        <li>業務の進め方</li>
        <li>会計の考え方</li>
        <li>経営の判断スピード</li>
      </ul>
      <p>会社の「当たり前」が、<br />
      少しずつ、しかし確実に変わっていきます。</p>
      <p>次回は、<br />
      <strong>「SAPは全社システムなのか？ それとも会計システムなのか？」</strong><br />
      というテーマで、<br />
      SAP導入の入口としてのFI領域について掘り下げます。</p>
    `,
    publishedAt: '2026-01-14',
    tags: ['SAP', 'ERP', 'SAP導入', '業務改革', '会計', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-3',
    title: 'SAP Introduction #3｜SAPは全社システムか？それとも会計システムか？',
    description: 'SAPは全社システムなのか、それとも会計システムなのか。SAPの思想と導入実務の観点から、その本質と導入の入口としてのFI領域を解説する。',
    content: `
      <h2>はじめに</h2>
      <p>SAPについて話をしていると、<br />
      ほぼ必ず聞かれる質問があります。</p>
      <ul>
        <li>「SAPって全社システムですよね？」</li>
        <li>「まずは会計だけ入れることもできますか？」</li>
        <li>「最初から全部入れないと意味がないですか？」</li>
      </ul>
      <p>これらの質問は、<br />
      <strong>SAPの本質を理解しようとしているからこそ出てくる疑問</strong>です。</p>
      <p>本記事では、<br />
      SAPが「全社システム」なのか<br />
      「会計システム」なのか、<br />
      その問いに対して、導入現場の視点で整理します。</p>

      <h2>1. 結論：SAPは「全社システム」であり「会計が中核」</h2>
      <p>結論から言うと、<br />
      SAPは <strong>全社システム</strong> です。</p>
      <p>ただし、<br />
      その中核にあるのは <strong>会計（FI）</strong> です。</p>
      <p>SAPは、<br />
      販売・購買・在庫・生産といった<br />
      あらゆる業務データを集約し、<br />
      最終的に会計へとつなげる構造を持っています。</p>
      <p>つまり、</p>
      <ul>
        <li>業務が先</li>
        <li>会計が後</li>
      </ul>
      <p>ではなく、</p>
      <p><strong>業務と会計が最初から一体として設計されている</strong></p>
      <p>これがSAPの最大の特徴です。</p>

      <h2>2. なぜSAPでは会計が「中心」になるのか</h2>
      <p>SAPでは、<br />
      多くの業務処理が会計仕訳と直結しています。</p>
      <ul>
        <li>物を仕入れれば、原価が動く</li>
        <li>売上が立てば、収益が計上される</li>
        <li>在庫が動けば、資産が変動する</li>
      </ul>
      <p>これらはすべて、<br />
      <strong>業務の結果として自然に会計へ反映</strong>されます。</p>
      <p>そのためSAPでは、<br />
      会計は「最後に数字を作る部門」ではなく、<br />
      <strong>業務全体をつなぐハブ</strong>として機能します。</p>
      <p>この構造があるからこそ、<br />
      SAPは全社システムとして成立します。</p>

      <h2>3. 「まずは会計だけ導入する」は正解か？</h2>
      <p>実務上、<br />
      「まずは会計（FI）だけ導入したい」<br />
      という選択は、<strong>十分に現実的</strong>です。</p>
      <p>むしろ、</p>
      <ul>
        <li>すべてを一気に導入する</li>
        <li>現場がついてこられない</li>
      </ul>
      <p>といったリスクを考えると、<br />
      <strong>FIを入口に段階的に広げる</strong>のは<br />
      非常に理にかなったアプローチです。</p>
      <p>重要なのは、</p>
      <blockquote>
        <p>会計だけを「部分最適」で入れるのか<br />
        将来の全社展開を見据えて入れるのか</p>
      </blockquote>
      <p>この違いです。</p>

      <h2>4. 会計を入口にすることで得られるメリット</h2>

      <h3>数字の信頼性が上がる</h3>
      <p>FI導入により、<br />
      会計ルールがシステム上で統一されます。</p>
      <ul>
        <li>勘定科目</li>
        <li>仕訳ルール</li>
        <li>会計期間管理</li>
      </ul>
      <p>これにより、<br />
      会社全体で「同じ会計言語」を持つことができます。</p>

      <h3>後続モジュールをつなぎやすくなる</h3>
      <p>SAPでは、<br />
      販売（SD）や購買（MM）などのモジュールは、<br />
      最終的にFIへデータを渡します。</p>
      <p>そのためFIが整っていれば、</p>
      <ul>
        <li>販売管理の拡張</li>
        <li>購買・在庫管理の導入</li>
        <li>原価管理（CO）との連携</li>
      </ul>
      <p>を <strong>スムーズに進めやすくなります</strong>。</p>

      <h2>5. 失敗する「会計だけ導入」のパターン</h2>
      <p>一方で、<br />
      以下のような進め方をすると、<br />
      FI導入は失敗しやすくなります。</p>
      <ul>
        <li>将来の業務拡張を考えていない</li>
        <li>現行業務をそのまま再現しようとする</li>
        <li>会計部門だけで完結させてしまう</li>
      </ul>
      <p>会計だけ導入したつもりが、<br />
      結果的に <strong>全社システムとして使えなくなる</strong><br />
      ケースも少なくありません。</p>
      <p>FIは入口であって、<br />
      ゴールではないことを意識する必要があります。</p>

      <h2>6. SAP導入をどう説明すべきか（セールス視点）</h2>
      <p>SAPを説明する際、<br />
      以下の言い方は非常に有効です。</p>
      <blockquote>
        <p>「SAPは全社システムです。<br />
        ただし、導入の入口として<br />
        会計から始める企業が多いです。」</p>
      </blockquote>
      <p>この一言で、</p>
      <ul>
        <li>全社視点を持っている</li>
        <li>現実的な導入プランも分かっている</li>
      </ul>
      <p>という印象を与えることができます。</p>

      <h2>おわりに</h2>
      <p>SAPは、<br />
      全社システムか、会計システムか、<br />
      という二択で語れるものではありません。</p>
      <p><strong>全社を見据えた会計基盤</strong><br />
      ——それがSAPの正確な姿です。</p>
      <p>導入の第一歩としてFIを選ぶことは、<br />
      非常に合理的な判断です。</p>
      <p>重要なのは、<br />
      「どこまでを最終形と考えているか」。</p>
      <p>その視点を持つことが、<br />
      SAP導入を成功させる第一歩になります。</p>
      <p>次回は、<br />
      <strong>「SAP導入が失敗する本当の理由」</strong><br />
      というテーマで、<br />
      導入現場のリアルについて掘り下げていきます。</p>
    `,
    publishedAt: '2026-01-15',
    tags: ['SAP', 'ERP', 'SAP FI', '会計システム', '全社システム', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-4',
    title: 'SAP Introduction #4｜SAP導入が失敗する本当の理由',
    description: 'SAP導入が失敗すると言われる理由は何か。システムではなく、導入の進め方に潜む本当の失敗要因を、導入現場の視点から解説する。',
    content: `
      <h2>はじめに</h2>
      <p>「SAP導入は失敗しやすい」</p>
      <p>そういった話を、<br />
      一度は聞いたことがあるかもしれません。</p>
      <ul>
        <li>導入が長期化した</li>
        <li>予定よりコストが膨らんだ</li>
        <li>現場に定着しなかった</li>
      </ul>
      <p>確かに、<br />
      SAP導入がうまくいかなかった事例は存在します。</p>
      <p>しかし重要なのは、<br />
      <strong>それが本当に「SAPというシステムの問題」なのか</strong><br />
      という点です。</p>
      <p>本記事では、<br />
      SAP導入プロジェクトにおいて<br />
      繰り返し見られる「失敗の本質」を整理します。</p>

      <h2>1. 失敗の原因は「SAP」ではない</h2>
      <p>結論から言うと、<br />
      SAP導入が失敗する原因の多くは<br />
      <strong>SAPそのものではありません</strong>。</p>
      <p>失敗の正体は、<br />
      以下のような要素にあります。</p>
      <ul>
        <li>導入目的が曖昧</li>
        <li>業務を変える覚悟がない</li>
        <li>プロジェクトの進め方に無理がある</li>
      </ul>
      <p>SAPは、<br />
      「入れれば何とかしてくれる魔法の箱」<br />
      ではありません。</p>
      <p><strong>どう使うか、どう向き合うか</strong><br />
      がすべてです。</p>

      <h2>2. よくある失敗パターン①<br />
      導入の目的が共有されていない</h2>
      <p>SAP導入プロジェクトで、<br />
      最も多い失敗要因の一つが<br />
      <strong>目的の不一致</strong>です。</p>
      <ul>
        <li>経営：内部統制を強化したい</li>
        <li>経理：決算を早くしたい</li>
        <li>現場：今の業務を変えたくない</li>
        <li>IT：とにかくシステムを切り替えたい</li>
      </ul>
      <p>この状態でプロジェクトを進めると、<br />
      意思決定がブレ続けます。</p>
      <p>結果として、</p>
      <ul>
        <li>要件が膨らむ</li>
        <li>判断が遅れる</li>
        <li>不満だけが残る</li>
      </ul>
      <p>という状況に陥ります。</p>

      <h2>3. よくある失敗パターン②<br />
      現行業務をそのまま再現しようとする</h2>
      <p>「今の業務をそのままSAPで再現したい」</p>
      <p>これは非常によく聞く要望ですが、<br />
      <strong>失敗の入り口</strong>でもあります。</p>
      <p>SAPは、</p>
      <ul>
        <li>標準化</li>
        <li>再現性</li>
        <li>統制</li>
      </ul>
      <p>を重視して設計されています。</p>
      <p>現行業務を無理に再現しようとすると、</p>
      <ul>
        <li>アドオンが増える</li>
        <li>保守が難しくなる</li>
        <li>将来の拡張性が失われる</li>
      </ul>
      <p>結果として、<br />
      <strong>SAPの強みを自ら捨てる</strong>ことになります。</p>

      <h2>4. よくある失敗パターン③<br />
      Fit & Gapを「Gap探し」にしてしまう</h2>
      <p>Fit & Gap分析は、<br />
      SAP導入において重要なプロセスです。</p>
      <p>しかし現場では、<br />
      これが次のように誤解されがちです。</p>
      <blockquote>
        <p>「SAPに合わない部分（Gap）を洗い出す作業」</p>
      </blockquote>
      <p>本来のFit & Gapは、</p>
      <ul>
        <li>Fit：SAP標準でできること</li>
        <li>Gap：業務を変えるか、拡張するか判断する材料</li>
      </ul>
      <p>です。</p>
      <p>Gapを埋めることが目的ではありません。</p>
      <p><strong>「業務を変えるか」「システムを変えるか」<br />
      を判断するためのプロセス</strong><br />
      であることを忘れると、<br />
      プロジェクトは迷走します。</p>

      <h2>5. よくある失敗パターン④<br />
      SAP導入をIT部門任せにする</h2>
      <p>SAP導入は、<br />
      単なるITプロジェクトではありません。</p>
      <p>それにもかかわらず、</p>
      <ul>
        <li>IT部門が主導</li>
        <li>業務部門は受け身</li>
        <li>経営は進捗報告を見るだけ</li>
      </ul>
      <p>という体制で進めてしまうケースがあります。</p>
      <p>この場合、</p>
      <ul>
        <li>業務要件が固まらない</li>
        <li>意思決定が遅れる</li>
        <li>導入後に不満が噴出する</li>
      </ul>
      <p>といった問題が起きやすくなります。</p>

      <h2>6. 成功するプロジェクトに共通すること</h2>
      <p>一方で、<br />
      SAP導入がうまくいくプロジェクトには<br />
      共通点があります。</p>
      <ul>
        <li>導入目的が明確</li>
        <li>経営が意思決定に関与している</li>
        <li>業務を見直す前提で進めている</li>
        <li>SAP標準を理解し、尊重している</li>
      </ul>
      <p>これらは特別なことではありません。</p>
      <p><strong>当たり前のことを、当たり前にやっている</strong><br />
      だけです。</p>

      <h2>7. SAP導入で本当に問われるもの</h2>
      <p>SAP導入で問われるのは、<br />
      ITスキルや製品知識だけではありません。</p>
      <ul>
        <li>会社として何を変えたいのか</li>
        <li>どこまで標準に合わせられるのか</li>
        <li>経営としてどう関与するのか</li>
      </ul>
      <p>こうした問いに、<br />
      きちんと向き合えるかどうかです。</p>
      <p>SAP導入は、<br />
      <strong>会社の意思決定の質を映し出す鏡</strong><br />
      とも言えます。</p>

      <h2>おわりに</h2>
      <p>SAP導入が失敗する理由は、<br />
      SAPが難しいからでも、<br />
      SAPが高いからでもありません。</p>
      <p><strong>向き合い方を間違えるから</strong><br />
      失敗するのです。</p>
      <p>逆に言えば、<br />
      正しい視点と進め方を持てば、<br />
      SAPは非常に強力な経営基盤になります。</p>
      <p>次回は、<br />
      <strong>「SAP導入はITプロジェクトではない」</strong><br />
      というテーマで、<br />
      さらに一段踏み込んだ視点から解説します。</p>
    `,
    publishedAt: '2026-01-16',
    tags: ['SAP', 'SAP導入', 'ERP', 'プロジェクト管理', '業務改革', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-5',
    title: 'SAP Introduction #5｜SAP導入はITプロジェクトではない',
    description: 'SAP導入はITプロジェクトではなく、業務改革・経営改革のプロジェクトである。その理由と、成功に必要な視点を解説する。',
    content: `
      <h2>はじめに</h2>
      <p>SAP導入の話をすると、<br />
      次のような言葉を聞くことがあります。</p>
      <ul>
        <li>「IT部門で進めてもらえますよね？」</li>
        <li>「システムの話なので、業務側はあとで調整します」</li>
        <li>「とりあえず切り替えられれば大丈夫です」</li>
      </ul>
      <p>これらは一見、<br />
      自然な発言に聞こえるかもしれません。</p>
      <p>しかし、<br />
      <strong>この考え方こそがSAP導入を難しくする最大の要因</strong><br />
      でもあります。</p>
      <p>本記事では、<br />
      なぜSAP導入が<br />
      <strong>ITプロジェクトではないのか</strong>、<br />
      その理由を整理します。</p>

      <h2>1. ITプロジェクトとSAP導入の決定的な違い</h2>
      <p>一般的なITプロジェクトでは、<br />
      以下のような流れが多く見られます。</p>
      <ul>
        <li>要件を決める</li>
        <li>システムを作る</li>
        <li>テストして切り替える</li>
      </ul>
      <p>しかしSAP導入では、<br />
      この考え方がそのまま当てはまりません。</p>
      <p>なぜならSAPは、<br />
      <strong>業務そのものを定義するシステム</strong><br />
      だからです。</p>
      <p>画面や機能を作ることよりも、</p>
      <ul>
        <li>業務をどう回すか</li>
        <li>ルールをどう統一するか</li>
        <li>判断基準をどう揃えるか</li>
      </ul>
      <p>が先に来ます。</p>

      <h2>2. SAP導入で本当に変わるもの</h2>
      <p>SAP導入で変わるのは、<br />
      システム画面だけではありません。</p>
      <ul>
        <li>業務の流れ</li>
        <li>権限と責任の所在</li>
        <li>判断スピード</li>
        <li>数字の見え方</li>
      </ul>
      <p>つまり、<br />
      <strong>組織の動き方そのもの</strong>が変わります。</p>
      <p>これはIT部門だけで<br />
      完結できる話ではありません。</p>

      <h2>3. なぜIT部門任せにすると失敗するのか</h2>
      <p>SAP導入を<br />
      IT部門主導で進めた場合、<br />
      次のような問題が起きがちです。</p>
      <ul>
        <li>業務要件が固まらない</li>
        <li>判断が先送りされる</li>
        <li>導入後に「聞いていない」が発生する</li>
      </ul>
      <p>IT部門はシステムの専門家であって、<br />
      業務や経営判断の最終責任者ではありません。</p>
      <p>そのため、</p>
      <ul>
        <li>業務を変える判断</li>
        <li>標準に合わせる決断</li>
      </ul>
      <p>を下しきれず、<br />
      プロジェクトが停滞します。</p>

      <h2>4. SAP導入の本当の主体は誰か</h2>
      <p>SAP導入の主体は、<br />
      IT部門でも、コンサルでもありません。</p>
      <p><strong>業務部門と経営</strong>です。</p>
      <ul>
        <li>業務部門：現実を知っている</li>
        <li>経営：意思決定の責任を持つ</li>
      </ul>
      <p>この2者が前に出ない限り、<br />
      SAP導入は「形だけの導入」になります。</p>
      <p>IT部門やコンサルは、<br />
      あくまでそれを支える存在です。</p>

      <h2>5. 成功するSAP導入のプロジェクト像</h2>
      <p>うまくいくSAP導入には、<br />
      共通した特徴があります。</p>
      <ul>
        <li>経営が「なぜSAPを入れるのか」を語れる</li>
        <li>業務部門が主体的に関与している</li>
        <li>IT部門が全体を整理・調整している</li>
        <li>SAP標準を前提に議論している</li>
      </ul>
      <p>ここで重要なのは、<br />
      <strong>誰か一人が頑張る構図ではない</strong><br />
      という点です。</p>
      <p>役割が整理され、<br />
      適切に分担されているプロジェクトほど、<br />
      安定して進みます。</p>

      <h2>6. SAP導入は「業務改革プロジェクト」である</h2>
      <p>SAP導入を一言で表すなら、<br />
      <strong>業務改革プロジェクト</strong>です。</p>
      <ul>
        <li>業務を見直す</li>
        <li>無理や無駄を減らす</li>
        <li>再現性のある形にする</li>
      </ul>
      <p>この過程を避けて、<br />
      SAPだけを導入することはできません。</p>
      <p>逆に言えば、<br />
      業務改革を進めたい企業にとって、<br />
      SAPは非常に相性の良い基盤です。</p>

      <h2>7. SAP導入で問われる覚悟</h2>
      <p>SAP導入で本当に問われるのは、<br />
      技術力でも、予算でもありません。</p>
      <ul>
        <li>どこまで変われるか</li>
        <li>どこまで標準に合わせるか</li>
        <li>誰が責任を持つか</li>
      </ul>
      <p>こうした問いに、<br />
      組織として向き合えるかどうかです。</p>
      <p>SAPは、<br />
      その覚悟を可視化してしまうシステム<br />
      とも言えます。</p>

      <h2>おわりに</h2>
      <p>SAP導入は、<br />
      ITプロジェクトではありません。</p>
      <p><strong>会社の意思決定と業務の在り方を問うプロジェクト</strong><br />
      です。</p>
      <p>この前提を共有できたとき、<br />
      SAPは初めて<br />
      「高いシステム」ではなく<br />
      <strong>「意味のある投資」</strong>になります。</p>
      <p>次回は、<br />
      <strong>「SAPコンサルタントは何をしているのか？」</strong><br />
      というテーマで、<br />
      導入を支える側の役割について解説します。</p>
    `,
    publishedAt: '2026-01-17',
    tags: ['SAP', 'SAP導入', 'ERP', 'DX', '業務改革', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-6',
    title: 'SAP Introduction #6｜SAPコンサルタントは何をしているのか？',
    description: 'SAPコンサルタントは何をしているのか。エンジニアとの違いや、導入プロジェクトにおける役割、価値が発揮される瞬間について解説する。',
    content: `
      <h2>はじめに</h2>
      <p>「SAPコンサルタントって、何をしている人ですか？」</p>
      <p>この質問は、<br />
      SAPに関わったことがない人だけでなく、<br />
      IT業界の人からもよく聞かれます。</p>
      <ul>
        <li>設計をする人？</li>
        <li>要件定義を書く人？</li>
        <li>SAPを操作する人？</li>
      </ul>
      <p>どれも間違いではありませんが、<br />
      どれも <strong>本質を表しているとは言えません</strong>。</p>
      <p>本記事では、<br />
      SAP導入プロジェクトにおいて<br />
      <strong>SAPコンサルタントが何をしているのか</strong><br />
      を、導入現場の視点で整理します。</p>

      <h2>1. SAPコンサルタントは「システムを作る人」ではない</h2>
      <p>まず押さえておきたいのは、<br />
      SAPコンサルタントは<br />
      <strong>システムを作ることが主目的ではない</strong><br />
      という点です。</p>
      <p>SAP導入におけるゴールは、</p>
      <ul>
        <li>システムを入れること</li>
        <li>画面を完成させること</li>
      </ul>
      <p>ではありません。</p>
      <p><strong>業務が回り、数字が正しく出て、<br />
      経営判断に使える状態を作ること</strong><br />
      です。</p>
      <p>SAPコンサルタントは、<br />
      その状態を実現するために動く存在です。</p>

      <h2>2. エンジニアとの違いはどこにあるのか</h2>
      <p>SAP導入には、<br />
      さまざまな専門家が関わります。</p>
      <ul>
        <li>エンジニア</li>
        <li>SAPコンサルタント</li>
        <li>業務担当者</li>
      </ul>
      <p>エンジニアは主に、</p>
      <ul>
        <li>技術的な実現性</li>
        <li>システム構成</li>
        <li>プログラムの品質</li>
      </ul>
      <p>を担います。</p>
      <p>一方、SAPコンサルタントは、</p>
      <ul>
        <li>業務要件</li>
        <li>会計・業務ルール</li>
        <li>SAP標準との整合</li>
      </ul>
      <p>を考えます。</p>
      <p>どちらが上、という話ではありません。<br />
      <strong>役割が違う</strong>だけです。</p>

      <h2>3. SAPコンサルタントの主な役割</h2>
      <p>SAPコンサルタントの仕事は、<br />
      大きく分けると以下のようになります。</p>

      <h3>① 業務を理解する</h3>
      <ul>
        <li>現場で何が行われているか</li>
        <li>どこに無理や無駄があるか</li>
        <li>なぜその業務が存在しているのか</li>
      </ul>
      <p>業務を理解せずに、<br />
      SAPを語ることはできません。</p>

      <h3>② SAP標準と業務をつなぐ</h3>
      <p>SAPには「標準」があります。</p>
      <ul>
        <li>なぜその設計なのか</li>
        <li>何を前提としているのか</li>
      </ul>
      <p>を理解した上で、</p>
      <ul>
        <li>業務を変えるのか</li>
        <li>システムを拡張するのか</li>
      </ul>
      <p>を判断します。</p>

      <h3>③ 意思決定を支援する</h3>
      <p>SAP導入では、<br />
      「正解」が一つとは限りません。</p>
      <ul>
        <li>どこまで標準に合わせるか</li>
        <li>どこを残すか</li>
        <li>どこを捨てるか</li>
      </ul>
      <p>SAPコンサルタントは、<br />
      選択肢と影響を整理し、<br />
      <strong>意思決定を支援する役割</strong>を担います。</p>

      <h2>4. SAPコンサルタントの価値が出る瞬間</h2>
      <p>SAPコンサルタントの価値は、<br />
      画面を作ったときではなく、<br />
      <strong>判断が必要な場面</strong>で発揮されます。</p>
      <ul>
        <li>業務とSAPが噛み合わないとき</li>
        <li>部門間で意見が割れたとき</li>
        <li>将来を見据えた判断が必要なとき</li>
      </ul>
      <p>こうした場面で、</p>
      <ul>
        <li>業務</li>
        <li>会計</li>
        <li>SAP</li>
      </ul>
      <p>を横断して整理できることが、<br />
      SAPコンサルタントの強みです。</p>

      <h2>5. SAPコンサルタントは「翻訳者」である</h2>
      <p>SAPコンサルタントの仕事を<br />
      一言で表すなら、<br />
      <strong>翻訳者</strong>です。</p>
      <ul>
        <li>経営の言葉を、業務に翻訳する</li>
        <li>業務の言葉を、SAPに翻訳する</li>
        <li>SAPの制約を、経営に翻訳する</li>
      </ul>
      <p>この翻訳がうまくいかないと、<br />
      プロジェクトは簡単に崩れます。</p>

      <h2>6. なぜSAPコンサルタントが必要なのか</h2>
      <p>「SAPに詳しい人がいれば十分では？」</p>
      <p>そう思われることもあります。</p>
      <p>しかし、</p>
      <ul>
        <li>業務だけを知っている</li>
        <li>技術だけを知っている</li>
      </ul>
      <p>だけでは、<br />
      SAP導入はうまく進みません。</p>
      <p>SAPコンサルタントは、<br />
      <strong>複数の視点を行き来できる存在</strong><br />
      として必要とされます。</p>

      <h2>7. SAPコンサルタントという仕事の面白さ</h2>
      <p>SAPコンサルタントは、<br />
      決して楽な仕事ではありません。</p>
      <ul>
        <li>調整が多い</li>
        <li>判断が重い</li>
        <li>責任が大きい</li>
      </ul>
      <p>その一方で、</p>
      <ul>
        <li>会社の変化に深く関われる</li>
        <li>経営の意思決定を間近で見る</li>
        <li>長く使われる基盤を作れる</li>
      </ul>
      <p>という、<br />
      他では得がたい経験ができます。</p>

      <h2>おわりに</h2>
      <p>SAPコンサルタントは、<br />
      「SAPを知っている人」ではありません。</p>
      <p><strong>SAPを通じて、<br />
      会社を前に進める人</strong>です。</p>
      <p>その役割を理解したとき、<br />
      SAP導入は<br />
      単なるシステム導入ではなく、<br />
      価値ある変革のプロジェクトになります。</p>
      <p>次回は、<br />
      <strong>「SAP導入を成功させるために、最初に相談すべき人」</strong><br />
      というテーマで、<br />
      このシリーズの総まとめを行います。</p>
    `,
    publishedAt: '2026-01-18',
    tags: ['SAP', 'SAPコンサルタント', 'ERP', 'ITコンサル', '業務改革', 'キャリア'],
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