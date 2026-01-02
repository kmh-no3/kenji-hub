import { Project } from '@/types';
import { getStatusColor, getStatusText, getDemoButtonText, getDemoButtonClass } from '@/lib/project-utils';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-[color:var(--color-surface)] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-[color:var(--color-border)] flex flex-col">
      {/* プロジェクトサムネイル（絵文字） */}
      <div className="relative h-36 sm:h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-5xl sm:text-6xl">
          {project.image}
        </div>
        {/* ステータスバッジ */}
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
          <span
            className={`px-2 py-1 sm:px-3 sm:py-1.5 text-xs font-bold rounded-full shadow-lg ${getStatusColor(project.status)}`}
            style={{
              backgroundColor:
                project.status === 'completed' ? '#15803d' :
                  project.status === 'in-progress' ? '#1d4ed8' :
                    project.status === 'planned' ? '#374151' : '#374151',
              color: '#ffffff',
            }}
          >
            {getStatusText(project.status)}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* プロジェクトタイトル */}
        <h2 className="text-lg sm:text-xl font-bold text-[color:var(--color-fg)] mb-2 hover:text-[color:var(--color-link)] transition-colors">
          {project.title}
        </h2>

        {/* プロジェクト説明 */}
        <p className="text-sm sm:text-base text-[color:var(--color-muted)] mb-3 sm:mb-4 line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* 使用技術 */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4 min-h-[1.5rem] sm:min-h-[2rem]">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 sm:py-1 text-xs rounded-full bg-[color:rgba(62,168,255,0.16)] text-[color:var(--color-fg)]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* リンクボタン */}
        <div className="flex space-x-2 sm:space-x-3 mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition-colors text-xs sm:text-sm ${project.status === 'planned'
                ? 'bg-[color:rgba(0,0,0,0.12)] text-[color:var(--color-muted)] cursor-not-allowed'
                : 'bg-[color:rgba(0,0,0,0.88)] text-white hover:bg-[color:rgba(0,0,0,0.78)]'
              }`}
            onClick={project.status === 'planned' ? (e) => e.preventDefault() : undefined}
          >
            GitHub
          </a>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition-colors text-xs sm:text-sm ${project.status === 'planned' || !project.demoAvailable
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : getDemoButtonClass(project.demoUrl)
              }`}
            onClick={(project.status === 'planned' || !project.demoAvailable) ? (e) => e.preventDefault() : undefined}
          >
            {getDemoButtonText(project.demoUrl)}
          </a>
        </div>
      </div>
    </article>
  );
}

