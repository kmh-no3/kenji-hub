export const siteConfig = {
  name: 'HOSODA KENJI',
  description: 'Next.js、Docker、TypeScriptなど、モダンなWeb開発技術について実践的な内容を発信する技術ブログです。',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com',
  ogImage: '/og-image.jpg',
  keywords: ['Next.js', 'React', 'TypeScript', 'Docker', 'Web開発', '技術ブログ'] as string[],
  author: '細田健司',
} as const;
