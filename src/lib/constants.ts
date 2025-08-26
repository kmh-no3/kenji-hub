// ナビゲーション設定
export const NAV_ITEMS = [
  { title: 'Home', href: '/' },
  { title: 'Works', href: '/works' },
  { title: 'Articles', href: '/articles' },
  { title: 'About', href: '/about' },
] as const;

// 技術スタック
export const TECHNOLOGIES = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js'],
  backend: ['Node.js', 'Python', 'Django', 'FastAPI', 'Express'],
  database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
  devops: ['Docker', 'AWS', 'Vercel', 'GitHub Actions'],
  tools: ['Git', 'VS Code', 'Figma', 'Postman'],
} as const;

// 作品カテゴリ
export const WORK_CATEGORIES = [
  { value: 'web', label: 'Webアプリケーション' },
  { value: 'mobile', label: 'モバイルアプリ' },
  { value: 'desktop', label: 'デスクトップアプリ' },
  { value: 'other', label: 'その他' },
] as const;

// 記事カテゴリ
export const ARTICLE_CATEGORIES = [
  { value: 'tech', label: '技術' },
  { value: 'tutorial', label: 'チュートリアル' },
  { value: 'thoughts', label: '考え' },
  { value: 'news', label: 'ニュース' },
] as const;

// ソーシャルリンク
export const SOCIAL_LINKS = {
  github: 'https://github.com/kmh-no3',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername',
  email: 'contact@example.com',
} as const;

// API設定
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
} as const;

// ページネーション設定
export const PAGINATION = {
  defaultPageSize: 10,
  maxPageSize: 50,
} as const; 