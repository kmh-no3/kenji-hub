"use client"

import { ProjectCard } from '@/components/features/projects';
import Header from '@/components/layout/Header';
import { projects } from '@/config/projects';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ページヘッダー */}
        <section className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            PROJECTS
          </h1>
          <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto px-2">
            作成したWebアプリケーションやプロジェクトの一覧です。<br />
            技術的な挑戦と学習記録を共有しています。
          </p>
        </section>

        {/* プロジェクト一覧 */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
} 