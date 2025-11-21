import { NavItem } from '@/types';

export const navigationConfig = {
  main: [
    { title: 'ABOUT', href: '#', isActive: false },
    { title: 'PROJECTS', href: '/projects', isActive: false },
    { title: 'BLOG', href: '/blog' },
  ] as NavItem[],
  social: {
    twitter: 'https://twitter.com/your_twitter',
    github: 'https://github.com/kmh-no3',
    zenn: 'https://zenn.dev/your_zenn',
  },
} as const;

