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
  },
  {
    id: 'sap-introduction-2',
    title: 'SAP Introduction #2｜SAP導入で会社は何が変わるのか？',
    description: 'SAP導入によって企業の業務・会計・経営はどのように変わるのか。現場から経営層までの視点で具体的に解説する。',
    publishedAt: '2026-01-14',
    tags: ['SAP', 'ERP', 'SAP導入', '業務改革', '会計', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-3',
    title: 'SAP Introduction #3｜SAPは全社システムか？それとも会計システムか？',
    description: 'SAPは全社システムなのか、それとも会計システムなのか。SAPの思想と導入実務の観点から、その本質と導入の入口としてのFI領域を解説する。',
    publishedAt: '2026-01-15',
    tags: ['SAP', 'ERP', 'SAP FI', '会計システム', '全社システム', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-4',
    title: 'SAP Introduction #4｜SAP導入が失敗する本当の理由',
    description: 'SAP導入が失敗すると言われる理由は何か。システムではなく、導入の進め方に潜む本当の失敗要因を、導入現場の視点から解説する。',
    publishedAt: '2026-01-16',
    tags: ['SAP', 'SAP導入', 'ERP', 'プロジェクト管理', '業務改革', 'ITコンサル'],
    image: '💼📊'
  },
  {
    id: 'sap-introduction-5',
    title: 'SAP Introduction #5｜SAP導入はITプロジェクトではない',
    description: 'SAP導入はITプロジェクトではなく、業務改革・経営改革のプロジェクトである。その理由と、成功に必要な視点を解説する。',
    publishedAt: '2026-01-17',
    tags: ['SAP', 'SAP導入', 'ERP', 'DX', '業務改革', 'ITコンサル'],
    image: '💼📊'
  }
] as const;

