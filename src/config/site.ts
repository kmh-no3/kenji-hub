export const siteConfig = {
  name: 'HOSODA KENJI',
  description: 'SAP導入PMO・会計領域への理解と、Web開発・AI活用を横断して学び、実践を記録するポートフォリオサイト。',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://kmh-no3.github.io/kenji-hub/',
  ogImage: '/og-image.jpg',
  keywords: ['SAP', 'S/4HANA', 'PMO', 'FI', 'CO', '業務改革', 'Java', 'TypeScript', 'AI活用', 'ポートフォリオ'] as string[],
  author: '細田健司',
} as const;
