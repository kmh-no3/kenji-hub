import { ProjectStatus } from '@/types';

export function getStatusColor(status: ProjectStatus): string {
  switch (status) {
    case 'completed':
      return '!bg-green-700 !text-white shadow-lg';
    case 'in-progress':
      return '!bg-blue-700 !text-white shadow-lg';
    case 'planned':
      return '!bg-gray-700 !text-white shadow-lg';
    default:
      return '!bg-gray-700 !text-white shadow-lg';
  }
}

export function getStatusText(status: ProjectStatus): string {
  switch (status) {
    case 'completed':
      return '完了';
    case 'in-progress':
      return '開発中';
    case 'planned':
      return '計画中';
    default:
      return '不明';
  }
}

export function getDemoButtonText(demoUrl: string): string {
  return demoUrl.includes('localhost') ? 'ローカルデモ' : 'デモ';
}

export function getDemoButtonClass(demoUrl: string): string {
  return demoUrl.includes('localhost') 
    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
    : 'bg-blue-600 hover:bg-blue-700 text-white';
}

