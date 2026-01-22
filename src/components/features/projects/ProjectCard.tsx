"use client"

import { Project } from '@/types';
import { getStatusColor, getStatusText, getDemoButtonText, getDemoButtonClass, getDemoButtonStyle } from '@/lib/project-utils';
import { useEffect, useRef } from 'react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const demoButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const applyStyles = () => {
      if (typeof window === 'undefined' || !demoButtonRef.current) return;
      
      const demoButton = demoButtonRef.current;
      
      if (project.status === 'planned' || !project.demoAvailable) {
        const tempEl = document.createElement('div');
        tempEl.style.setProperty('background-color', 'var(--color-button-demo-disabled-bg)');
        tempEl.style.setProperty('color', 'var(--color-button-demo-disabled-fg)');
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';
        tempEl.style.pointerEvents = 'none';
        document.body.appendChild(tempEl);
        const computedBg = getComputedStyle(tempEl).backgroundColor;
        const computedFg = getComputedStyle(tempEl).color;
        document.body.removeChild(tempEl);
        demoButton.style.removeProperty('background-color');
        demoButton.style.removeProperty('color');
        demoButton.style.setProperty('background-color', computedBg, 'important');
        demoButton.style.setProperty('color', computedFg, 'important');
      } else {
        const isLocalhost = project.demoUrl.includes('localhost');
        const bgVar = isLocalhost ? '--color-button-demo-local-bg' : '--color-button-demo-bg';
        const fgVar = isLocalhost ? '--color-button-demo-local-fg' : '--color-button-demo-fg';
        
        const tempEl = document.createElement('div');
        tempEl.style.setProperty('background-color', `var(${bgVar})`);
        tempEl.style.setProperty('color', `var(${fgVar})`);
        tempEl.style.position = 'absolute';
        tempEl.style.visibility = 'hidden';
        tempEl.style.pointerEvents = 'none';
        document.body.appendChild(tempEl);
        const computedBg = getComputedStyle(tempEl).backgroundColor;
        const computedFg = getComputedStyle(tempEl).color;
        document.body.removeChild(tempEl);
        
        demoButton.style.removeProperty('background-color');
        demoButton.style.removeProperty('color');
        demoButton.style.setProperty('background-color', computedBg, 'important');
        demoButton.style.setProperty('color', computedFg, 'important');
      }
    };

    const checkStyles = () => {
      if (typeof window === 'undefined' || !demoButtonRef.current) return;
      applyStyles();
    };

    checkStyles();
    const timeoutId = setTimeout(checkStyles, 100);
    const observer = new MutationObserver(checkStyles);
    if (typeof window !== 'undefined' && document.documentElement) {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-theme-mode'] });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [project]);

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
              className="px-2 py-0.5 sm:py-1 text-xs rounded-full bg-[color:var(--color-accent-alpha-16)] text-[color:var(--color-fg)]"
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
            className={`flex-1 text-center py-1.5 sm:py-2 px-3 sm:px-4 rounded-md transition-colors text-xs sm:text-sm font-medium ${project.status === 'planned'
              ? 'bg-[color:var(--color-button-github-disabled-bg)] text-[color:var(--color-button-github-disabled-fg)] cursor-not-allowed'
              : 'bg-[color:var(--color-button-github-bg)] text-[color:var(--color-button-github-fg)] hover:bg-[color:var(--color-button-github-hover-bg)]'
              }`}
            onClick={project.status === 'planned' ? (e) => e.preventDefault() : undefined}
          >
            GitHub
          </a>
          <a
            ref={demoButtonRef}
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-demo-button-debug="true"
            className={`flex-1 text-center py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium ${project.status === 'planned' || !project.demoAvailable
              ? 'cursor-not-allowed'
              : ''
              }`}
            onMouseEnter={(e) => {
              if (project.status !== 'planned' && project.demoAvailable) {
                const isLocalhost = project.demoUrl.includes('localhost');
                const hoverBgVar = isLocalhost
                  ? '--color-button-demo-local-hover-bg'
                  : '--color-button-demo-hover-bg';
                const hoverBg = getComputedStyle(document.documentElement).getPropertyValue(hoverBgVar).trim();
                if (hoverBg) {
                  e.currentTarget.style.setProperty('background-color', hoverBg, 'important');
                }
              }
            }}
            onMouseLeave={(e) => {
              if (project.status !== 'planned' && project.demoAvailable) {
                const isLocalhost = project.demoUrl.includes('localhost');
                const bgVar = isLocalhost ? '--color-button-demo-local-bg' : '--color-button-demo-bg';
                // 一時的な要素を作成してCSS変数の値を取得
                const tempEl = document.createElement('div');
                tempEl.style.setProperty('background-color', `var(${bgVar})`);
                tempEl.style.position = 'absolute';
                tempEl.style.visibility = 'hidden';
                tempEl.style.pointerEvents = 'none';
                document.body.appendChild(tempEl);
                const computedBg = getComputedStyle(tempEl).backgroundColor;
                document.body.removeChild(tempEl);
                if (computedBg && computedBg !== 'rgba(0, 0, 0, 0)') {
                  e.currentTarget.style.setProperty('background-color', computedBg, 'important');
                }
              }
            }}
            onClick={(project.status === 'planned' || !project.demoAvailable) ? (e) => e.preventDefault() : undefined}
          >
            {getDemoButtonText(project.demoUrl)}
          </a>
        </div>
      </div>
    </article>
  );
}

