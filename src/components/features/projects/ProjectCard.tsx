import { Project } from '@/types';
import { getStatusColor, getStatusText, getDemoButtonText, getDemoButtonClass } from '@/lib/project-utils';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
      {/* プロジェクトサムネイル（絵文字） */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-6xl">
          {project.image}
        </div>
        {/* ステータスバッジ */}
        <div className="absolute top-4 right-4 z-10">
          <span 
            className={`px-3 py-1.5 text-xs font-bold rounded-full shadow-lg ${getStatusColor(project.status)}`}
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

