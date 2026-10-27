import Link from 'next/link';

const experience = [
  {
    period: '2025 – 現在',
    role: 'SAP S/4HANA導入支援・PMO',
    details:
      '進捗・WBS管理、会議運営、関係者調整、成果物のレビュー状況管理など。FI/COを含む領域横断のプロジェクト支援。',
  },
  {
    period: '2022 – 2025',
    role: '業務システムの保守・運用',
    details:
      '会計周辺システムを中心に、運用保守、問い合わせ対応、業務効率化に関わる取り組みを経験。',
  },
  {
    period: '2020 – 2022',
    role: 'SAPシステムの保守・開発',
    details:
      'SAPの購買・販売・在庫領域の保守、およびABAPによる帳票開発などを担当。',
  },
] as const;

const selectedWork = [
  {
    name: 'JournAPI',
    type: '個人開発',
    description: '複式簿記を題材にしたAPI開発。Java / Spring Boot / PostgreSQL。',
    href: 'https://github.com/kmh-no3/journAPI',
    external: true,
  },
  {
    name: 'PWA Password Generator',
    type: '個人開発',
    description: 'Web Crypto APIを利用したパスワード生成アプリ。',
    href: 'https://github.com/kmh-no3/pwa-password-generator',
    external: true,
  },
  {
    name: 'SAP Introduction',
    type: '執筆',
    description: 'SAPやERPの役割を、初めて学ぶ人に向けて整理した記事シリーズ。',
    href: '/blog/sap-introduction-1',
    external: false,
  },
] as const;

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <header className="mb-20 sm:mb-28">
          <p className="mb-8 text-xs tracking-[0.22em] text-[color:var(--color-muted)]">
            ABOUT
          </p>
          <h1 className="mb-4 text-3xl sm:text-4xl font-medium tracking-tight">
            細田 健司
          </h1>
          <p className="mb-10 text-sm text-[color:var(--color-muted)]">
            SAP / PMO / Software Development
          </p>
          <div className="max-w-2xl space-y-5 text-sm sm:text-base leading-8">
            <p>
              SAP S/4HANA導入プロジェクトのPMOとして、進捗管理、
              会議運営、関係者調整などに携わっています。
            </p>
            <p>
              これまでにSAPシステムや会計周辺システムの保守・運用、
              ABAPによる帳票開発を経験しました。
              業務で扱う技術とは別に、Webアプリケーションの個人開発やAI活用の検証も続けています。
            </p>
          </div>
        </header>

        <section aria-labelledby="experience-heading" className="mb-20 sm:mb-24">
          <h2 id="experience-heading" className="mb-5 text-sm font-semibold tracking-[0.12em]">
            EXPERIENCE
          </h2>
          <div className="border-t border-[color:var(--color-border)]">
            {experience.map((item) => (
              <div
                key={item.period}
                className="grid gap-3 border-b border-[color:var(--color-border)] py-6 sm:grid-cols-[128px_1fr] sm:gap-8"
              >
                <p className="text-xs sm:text-sm text-[color:var(--color-muted)]">
                  {item.period}
                </p>
                <div>
                  <h3 className="mb-2 text-sm sm:text-base font-medium">{item.role}</h3>
                  <p className="text-sm leading-7 text-[color:var(--color-muted)]">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="work-heading" className="mb-20 sm:mb-24">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="work-heading" className="text-sm font-semibold tracking-[0.12em]">
              SELECTED WORK
            </h2>
            <Link className="text-xs underline underline-offset-4 hover:opacity-70" href="/projects">
              All projects
            </Link>
          </div>
          <div className="border-t border-[color:var(--color-border)]">
            {selectedWork.map((item) => (
              <div
                key={item.name}
                className="grid gap-3 border-b border-[color:var(--color-border)] py-6 sm:grid-cols-[128px_1fr] sm:gap-8"
              >
                <p className="text-xs sm:text-sm text-[color:var(--color-muted)]">{item.type}</p>
                <div>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-medium underline underline-offset-4 hover:opacity-70"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-sm sm:text-base font-medium underline underline-offset-4 hover:opacity-70"
                    >
                      {item.name}
                    </Link>
                  )}
                  <p className="mt-2 text-sm leading-7 text-[color:var(--color-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap gap-6 border-t border-[color:var(--color-border)] pt-6 text-sm">
          <a
            href="https://github.com/kmh-no3"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-70"
          >
            GitHub
          </a>
          <Link href="/blog" className="underline underline-offset-4 hover:opacity-70">
            Writing
          </Link>
        </footer>
      </div>
    </main>
  );
}
