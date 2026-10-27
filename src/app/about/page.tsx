import Link from 'next/link';

const focusAreas = [
  {
    title: 'ERP導入・PMO',
    description:
      '進捗・課題・会議体・成果物の管理を通じて、関係者が同じ状況認識で判断できる状態づくりに取り組んでいます。',
  },
  {
    title: 'SAPと会計領域',
    description:
      'SAP周辺システムの保守・運用経験を土台に、S/4HANA導入のPMOとしてFI/COを含む領域横断の業務理解を深めています。',
  },
  {
    title: 'AI・業務効率化',
    description:
      '個人開発・検証を通じ、情報整理、反復作業の効率化、ナレッジの再利用を支える仕組みを研究しています。',
  },
] as const;

const approach = [
  {
    title: '事実と判断を分ける',
    description:
      '確認済みの事実、仮説、未決事項を区別し、次の意思決定に必要な論点を整理します。',
  },
  {
    title: '手順として再利用できる形にする',
    description:
      'その場限りの対応をチェックリストや判断基準に一般化し、継続的に改善します。',
  },
  {
    title: '業務と技術をつなぐ',
    description:
      '利用者の業務目的を理解したうえで、システムと運用の両面から実行可能な方法を考えます。',
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <header className="mb-12 sm:mb-16">
          <p className="text-sm font-semibold tracking-[0.16em] text-[color:var(--color-muted)] mb-3">
            ABOUT
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-[color:var(--color-fg)] mb-6">
            業務を理解し、整理し、前に進める。
          </h1>
          <p className="text-base sm:text-lg leading-8 text-[color:var(--color-muted)] max-w-3xl">
            SAP導入プロジェクトのPMOとして、進捗・課題管理、会議運営、関係者調整、
            成果物管理などに取り組んでいます。これまでのシステム保守・運用や開発の経験を活かし、
            会計業務への理解と技術的な視点の両方を磨いています。
          </p>
        </header>

        <section aria-labelledby="focus-heading" className="mb-12 sm:mb-16">
          <h2 id="focus-heading" className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] mb-6">
            取り組んでいる領域
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {focusAreas.map((area) => (
              <article key={area.title} className="rounded-xl border border-[color:var(--color-border)] p-5 sm:p-6">
                <h3 className="font-semibold text-lg text-[color:var(--color-fg)] mb-3">{area.title}</h3>
                <p className="text-sm leading-7 text-[color:var(--color-muted)]">{area.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="approach-heading" className="mb-12 sm:mb-16">
          <h2 id="approach-heading" className="text-xl sm:text-2xl font-bold text-[color:var(--color-fg)] mb-6">
            大切にしている考え方
          </h2>
          <div className="space-y-6">
            {approach.map((item) => (
              <div key={item.title} className="border-l-2 border-[color:var(--color-border)] pl-5">
                <h3 className="font-semibold text-[color:var(--color-fg)] mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base leading-7 text-[color:var(--color-muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="learning-heading" className="rounded-xl bg-[color:var(--color-surface)] p-6 sm:p-8">
          <h2 id="learning-heading" className="text-xl font-bold text-[color:var(--color-fg)] mb-3">
            学習・制作の記録
          </h2>
          <p className="text-sm sm:text-base leading-7 text-[color:var(--color-muted)] mb-5">
            SAP・業務改革の考察に加え、Webアプリケーション開発やAIを用いた個人実験を継続しています。
            記事と制作物では、実施したことと今後検証することを区別して紹介しています。
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/blog" className="font-semibold text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]">
              記事を読む →
            </Link>
            <Link href="/projects" className="font-semibold text-[color:var(--color-link)] hover:text-[color:var(--color-link-hover)]">
              制作物を見る →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
