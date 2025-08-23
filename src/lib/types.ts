// 記事の型定義
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags?: string[];
  slug: string;
  author?: string;
}

// 作品の型定義
export interface Work {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  publishedAt: Date;
  category: 'web' | 'mobile' | 'desktop' | 'other';
}

// ナビゲーションアイテムの型定義
export interface NavItem {
  title: string;
  href: string;
  icon?: string;
}

// メタデータの型定義
export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

// APIレスポンスの型定義
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
} 