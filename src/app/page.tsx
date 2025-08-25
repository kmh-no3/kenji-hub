"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Header from '@/components/layout/Header'

// プロジェクトデータの型定義
interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  githubUrl: string
  demoUrl: string
  status: 'completed' | 'in-progress' | 'planned'
  demoAvailable?: boolean
}

// プロジェクトデータ
const projects: Project[] = [
  {
    id: 'password-generator-web',
    title: '🔐 PWAパスワードジェネレーター',
    description: 'セキュアなパスワードを生成するPWAアプリケーション。WebCrypto APIを使用した暗号学的に安全な乱数生成、パスワード履歴、強度チェック機能を実装。オフライン対応でホーム画面に追加可能。',
    technologies: ['React', 'TypeScript', 'Vite', 'PWA', 'WebCrypto API'],
    image: '🔐',
    githubUrl: 'https://github.com/kmh-no3/pwa-password-generator',
    demoUrl: 'https://kmh-no3.github.io/pwa-password-generator',
    status: 'completed',
    demoAvailable: true
  },
  {
    id: 'journapi',
    title: 'JournAPI - 複式簿記システムAPI',
    description: '複式簿記システムのAPIサーバー。仕訳帳、元帳、試算表の機能を提供し、外部公開を想定したセキュリティ機能を備えたバックエンドエンジニアリングのポートフォリオプロジェクト。',
    technologies: ['Spring Boot', 'Java 21', 'PostgreSQL', 'Flyway', 'Maven'],
    image: '📊💰',
    githubUrl: 'https://github.com/kmh-no3/journAPI',
    demoUrl: 'https://github.com/kmh-no3/journAPI',
    status: 'in-progress',
    demoAvailable: false
  },

  {
    id: 'haskell-web-app',
    title: 'Haskell Web App（会計＆ブロックチェーン）',
    description: 'Haskellで構築したWebアプリケーション。会計機能とブロックチェーン技術を組み合わせた革新的なシステム。',
    technologies: ['Haskell', 'Yesod', 'PostgreSQL', 'Blockchain'],
    image: 'λ⛓️',
    githubUrl: 'https://github.com/kmh-no3/haskell-web-app',
    demoUrl: 'https://github.com/kmh-no3/haskell-web-app',
    status: 'planned',
    demoAvailable: false
  }
]

// プロジェクトカードコンポーネント
function ProjectCard({ project }: { project: Project }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      case 'planned':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了'
      case 'in-progress':
        return '開発中'
      case 'planned':
        return '計画中'
      default:
        return '不明'
    }
  }

  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* プロジェクトサムネイル（絵文字） */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-6xl">
          {project.image}
        </div>
        {/* ステータスバッジ */}
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        {/* プロジェクトタイトル */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {project.title}
        </h2>
        
        {/* プロジェクト説明 */}
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        {/* 使用技術 */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* リンクボタン */}
        <div className="flex space-x-3 mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-2 px-4 rounded-md transition-colors text-sm ${
              project.status === 'planned' 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
            onClick={project.status === 'planned' ? (e) => e.preventDefault() : undefined}
          >
            GitHub
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-2 px-4 rounded-md transition-colors text-sm ${
              project.status === 'planned' || !project.demoAvailable
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : project.demoUrl.includes('localhost') 
                  ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            onClick={(project.status === 'planned' || !project.demoAvailable) ? (e) => e.preventDefault() : undefined}
          >
            {project.demoUrl.includes('localhost') ? 'ローカルデモ' : 'デモ'}
          </a>
        </div>
      </div>
    </article>
  )
}



// メタデータを生成する関数
// Client Componentではmetadataエクスポートができないため削除
// export const metadata = {
//   title: 'HOSODA KENJI',
//   description: 'Next.js、Docker、TypeScriptなど、モダンなWeb開発技術について実践的な内容を発信する技術ブログです。',
// }

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ページヘッダー */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WORKS
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            作成したWebアプリケーションやプロジェクトの一覧です。<br/>
            技術的な挑戦と学びの記録を共有しています。
          </p>
        </section>
        
        {/* プロジェクト一覧 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}