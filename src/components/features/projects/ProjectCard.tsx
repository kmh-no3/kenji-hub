"use client"

import { Project } from '@/types';
import { getStatusColor, getStatusText, getDemoButtonText, getDemoButtonClass, getDemoButtonStyle } from '@/lib/project-utils';
import { useEffect, useRef } from 'react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const demoButtonRef = useRef<HTMLAnchorElement>(null);

  // #region agent log
  useEffect(() => {
    const applyStyles = () => {
      if (typeof window === 'undefined' || !demoButtonRef.current) {
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H9', location: 'src/components/features/projects/ProjectCard.tsx:applyStyles', message: 'applyStyles - early return', data: { projectId: project.id, hasWindow: typeof window !== 'undefined', hasRef: !!demoButtonRef.current }, timestamp: Date.now() }) }).catch(() => { });
        return;
      }
      const demoButton = demoButtonRef.current;
      const html = document.documentElement;
      if (project.status === 'planned' || !project.demoAvailable) {
        // 一時的な要素を作成してCSS変数の値を取得
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
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H8', location: 'src/components/features/projects/ProjectCard.tsx:applyStyles', message: 'applyStyles - disabled button', data: { projectId: project.id, computedBg, computedFg, appliedBg: demoButton.style.backgroundColor, appliedColor: demoButton.style.color, finalComputedBg: getComputedStyle(demoButton).backgroundColor, finalComputedColor: getComputedStyle(demoButton).color }, timestamp: Date.now() }) }).catch(() => { });
      } else {
        const isLocalhost = project.demoUrl.includes('localhost');
        const bgVar = isLocalhost ? '--color-button-demo-local-bg' : '--color-button-demo-bg';
        const fgVar = isLocalhost ? '--color-button-demo-local-fg' : '--color-button-demo-fg';
        const html = document.documentElement;
        const currentTheme = html.dataset.theme;
        // 現在のテーマとCSS変数の値を確認
        const cssVarBgValue = getComputedStyle(html).getPropertyValue(bgVar).trim();
        const cssVarFgValue = getComputedStyle(html).getPropertyValue(fgVar).trim();
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H12', location: 'src/components/features/projects/ProjectCard.tsx:applyStyles', message: 'applyStyles - before temp element', data: { projectId: project.id, isLocalhost, bgVar, fgVar, currentTheme, cssVarBgValue, cssVarFgValue }, timestamp: Date.now() }) }).catch(() => { });
        // 一時的な要素を作成してCSS変数の値を取得
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
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H12', location: 'src/components/features/projects/ProjectCard.tsx:applyStyles', message: 'applyStyles - after temp element', data: { projectId: project.id, isLocalhost, bgVar, fgVar, currentTheme, cssVarBgValue, cssVarFgValue, computedBg, computedFg }, timestamp: Date.now() }) }).catch(() => { });
        // 直接スタイルを適用（requestAnimationFrameを使用しない）
        demoButton.style.removeProperty('background-color');
        demoButton.style.removeProperty('color');
        demoButton.style.setProperty('background-color', computedBg, 'important');
        demoButton.style.setProperty('color', computedFg, 'important');
        // スタイル適用後の状態を確認
        const afterApply = {
          inlineBg: demoButton.style.backgroundColor,
          inlineColor: demoButton.style.color,
          computedBg: getComputedStyle(demoButton).backgroundColor,
          computedColor: getComputedStyle(demoButton).color,
          hasImportantBg: demoButton.style.getPropertyPriority('background-color'),
          hasImportantColor: demoButton.style.getPropertyPriority('color'),
        };
        // 少し遅延してから再確認（レンダリング後の状態を確認）
        setTimeout(() => {
          const afterRender = {
            inlineBg: demoButton.style.backgroundColor,
            inlineColor: demoButton.style.color,
            computedBg: getComputedStyle(demoButton).backgroundColor,
            computedColor: getComputedStyle(demoButton).color,
          };
          fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H10', location: 'src/components/features/projects/ProjectCard.tsx:applyStyles', message: 'applyStyles - after render check', data: { projectId: project.id, isLocalhost, bgVar, fgVar, computedBg, computedFg, afterApply, afterRender }, timestamp: Date.now() }) }).catch(() => { });
        }, 50);
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H8', location: 'src/components/features/projects/ProjectCard.tsx:applyStyles', message: 'applyStyles - active button', data: { projectId: project.id, isLocalhost, bgVar, fgVar, computedBg, computedFg, afterApply }, timestamp: Date.now() }) }).catch(() => { });
      }
    };
    const checkStyles = () => {
      const html = document.documentElement;
      const currentTheme = html.dataset.theme;
      fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H9', location: 'src/components/features/projects/ProjectCard.tsx:checkStyles', message: 'checkStyles called', data: { projectId: project.id, hasWindow: typeof window !== 'undefined', hasRef: !!demoButtonRef.current, currentTheme }, timestamp: Date.now() }) }).catch(() => { });
      if (typeof window === 'undefined' || !demoButtonRef.current) return;
      const beforeApply = {
        inlineBg: demoButtonRef.current.style.backgroundColor || '',
        inlineColor: demoButtonRef.current.style.color || '',
        computedBg: getComputedStyle(demoButtonRef.current).backgroundColor,
        computedColor: getComputedStyle(demoButtonRef.current).color,
      };
      // CSS変数が更新されるまで待つ（最大10回、10ms間隔でチェック）
      const checkCssVar = (attempt: number = 0) => {
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H15', location: 'src/components/features/projects/ProjectCard.tsx:checkCssVar', message: 'checkCssVar called', data: { projectId: project.id, attempt, currentTheme }, timestamp: Date.now() }) }).catch(() => { });
        if (attempt >= 10) {
          // タイムアウトした場合でもスタイルを適用
          applyStyles();
          // スタイル適用後の状態を確認（少し遅延してから）
          setTimeout(() => {
            const afterApply = {
              inlineBg: demoButtonRef.current?.style.backgroundColor || '',
              inlineColor: demoButtonRef.current?.style.color || '',
              computedBg: demoButtonRef.current ? getComputedStyle(demoButtonRef.current).backgroundColor : '',
              computedColor: demoButtonRef.current ? getComputedStyle(demoButtonRef.current).color : '',
            };
            fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H11', location: 'src/components/features/projects/ProjectCard.tsx:checkStyles', message: 'checkStyles - style application check (timeout)', data: { projectId: project.id, currentTheme, beforeApply, afterApply }, timestamp: Date.now() }) }).catch(() => { });
          }, 50);
          return;
        }
        const html = document.documentElement;
        const isLocalhost = project.demoUrl.includes('localhost');
        const bgVar = isLocalhost ? '--color-button-demo-local-bg' : '--color-button-demo-bg';
        const expectedBg = currentTheme === 'dark'
          ? (isLocalhost ? '#fb923c' : '#ffffff')
          : (isLocalhost ? '#f97316' : '#3ea8ff');
        const cssVarBgValue = getComputedStyle(html).getPropertyValue(bgVar).trim();
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H13', location: 'src/components/features/projects/ProjectCard.tsx:checkCssVar', message: 'checkCssVar - checking CSS variable', data: { projectId: project.id, attempt, currentTheme, isLocalhost, bgVar, expectedBg, cssVarBgValue, matches: cssVarBgValue === expectedBg }, timestamp: Date.now() }) }).catch(() => { });
        if (cssVarBgValue === expectedBg) {
          // CSS変数が更新されたので、スタイルを適用
          applyStyles();
          // スタイル適用後の状態を確認（少し遅延してから）
          setTimeout(() => {
            const afterApply = {
              inlineBg: demoButtonRef.current?.style.backgroundColor || '',
              inlineColor: demoButtonRef.current?.style.color || '',
              computedBg: demoButtonRef.current ? getComputedStyle(demoButtonRef.current).backgroundColor : '',
              computedColor: demoButtonRef.current ? getComputedStyle(demoButtonRef.current).color : '',
            };
            fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H11', location: 'src/components/features/projects/ProjectCard.tsx:checkStyles', message: 'checkStyles - style application check', data: { projectId: project.id, currentTheme, beforeApply, afterApply }, timestamp: Date.now() }) }).catch(() => { });
          }, 50);
        } else {
          // CSS変数がまだ更新されていないので、再試行
          setTimeout(() => checkCssVar(attempt + 1), 10);
        }
      };
      fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'H16', location: 'src/components/features/projects/ProjectCard.tsx:checkStyles', message: 'checkStyles - about to call checkCssVar', data: { projectId: project.id, currentTheme }, timestamp: Date.now() }) }).catch(() => { });
      checkCssVar();
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
  // #endregion agent log
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

