import { Article } from '@/types';

export const articles: Article[] = [
  {
    id: 'container-vm-development-comparison',
    title: '開発環境比較検証：Native vs Docker での開発体験の違い（VM環境は準備中）',
    description: '異なる開発環境（Native、Docker）での開発パターンを比較検証した結果をまとめました。VM環境の比較は現在準備中です。セットアップの複雑さ、環境の一貫性、パフォーマンスなど、実践的な観点から詳しく解説します。',
    publishedAt: '2025-08-23',
    tags: ['Docker', '開発環境', '比較検証', 'Node.js', 'PostgreSQL'],
    image: '🐳⚡💻'
  },
  {
    id: 'sap-introduction-1',
    title: 'SAP Introduction #1｜なぜSAPは「高い」のに選ばれ続けるのか？',
    description: 'SAPはなぜ『高い』と言われながらも選ばれ続けるのか。会計・IT・導入現場の視点から、その本質的な価値を解説する。',
    publishedAt: '2026-01-13',
    tags: ['SAP', 'ERP', 'SAP導入', 'ITコンサル', '会計システム'],
    image: '💼📊'
  }
] as const;

