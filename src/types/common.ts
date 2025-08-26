export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  isActive?: boolean;
}

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

