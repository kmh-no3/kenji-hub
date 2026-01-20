'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// #region agent log (mermaid-client-debug)
const MERMAID_DEBUG_ENDPOINT = 'http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d'
function mermaidDebugLog(hypothesisId: string, message: string, data: any) {
  try {
    fetch(MERMAID_DEBUG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'debug-session',
        runId: 'mermaid-client-debug',
        hypothesisId,
        location: 'src/components/features/blog/MermaidRenderer.tsx:useEffect',
        message,
        data,
        timestamp: Date.now()
      })
    }).catch(() => {})
  } catch (e) {}
}
// #endregion agent log (mermaid-client-debug)

export function MermaidRenderer() {
  const pathname = usePathname()

  useEffect(() => {
    mermaidDebugLog('H1', 'MermaidRenderer useEffect triggered', {
      pathname,
      readyState: typeof document !== 'undefined' ? document.readyState : 'unknown',
      hasMermaid: typeof window !== 'undefined' && 'mermaid' in window
    })

    function renderMermaid() {
      if (typeof window === 'undefined' || !window.mermaid) {
        mermaidDebugLog('H2', 'mermaid not available, retry scheduled', {})
        setTimeout(renderMermaid, 100)
        return
      }

      try {
        const mermaidElements = Array.from(document.querySelectorAll('.mermaid:not([data-processed])'))
        mermaidDebugLog('H3', 'found unprocessed mermaid elements', {
          count: mermaidElements.length,
          pathname,
          texts: mermaidElements.map((el) => (el.textContent || '').slice(0, 120))
        })

        if (mermaidElements.length > 0) {
          window.mermaid.run({
            nodes: mermaidElements,
            suppressErrors: true
          })
          mermaidDebugLog('H4', 'mermaid.run completed', {
            processedCount: mermaidElements.length,
            pathname
          })

          // エラーアイコンの確認
          setTimeout(() => {
            const errorIcons = document.querySelectorAll('.mermaid svg .error-icon, .mermaid .error-icon')
            mermaidDebugLog('H5', 'error icons after run', {
              errorCount: errorIcons.length,
              pathname
            })
          }, 500)
        } else {
          mermaidDebugLog('H6', 'no unprocessed mermaid elements found', {
            pathname,
            totalMermaidCount: document.querySelectorAll('.mermaid').length
          })
        }
      } catch (e) {
        console.warn('Mermaid render error:', e)
        mermaidDebugLog('H7', 'mermaid.run threw exception', {
          error: String(e),
          pathname
        })
      }
    }

    // 初回実行（即座）
    renderMermaid()

    // MutationObserver で新しい .mermaid 要素の追加を監視
    const observer = new MutationObserver((mutations) => {
      let shouldRender = false
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as Element
            if (element.classList?.contains('mermaid') || element.querySelector?.('.mermaid')) {
              shouldRender = true
            }
          }
        })
      })
      if (shouldRender) {
        mermaidDebugLog('H8', 'mutation detected, re-rendering mermaid', { pathname })
        setTimeout(renderMermaid, 100)
      }
    })

    const articleContent = document.querySelector('.article-content')
    if (articleContent) {
      observer.observe(articleContent, {
        childList: true,
        subtree: true
      })
    }

    return () => {
      observer.disconnect()
    }
  }, [pathname])

  return null
}
