'use client'

import { useEffect, useRef } from 'react'
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
  const lastPathnameRef = useRef<string>('')
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    // 最初にログを記録（useEffect が実行されたことを確認）
    mermaidDebugLog('H1', 'MermaidRenderer useEffect triggered (start)', {
      pathname,
      timestamp: Date.now()
    })
    
    const currentPathname = typeof window !== 'undefined' ? window.location.pathname : pathname
    const pathnameChanged = lastPathnameRef.current !== currentPathname
    
    // パスが変更された場合、既存の data-processed 属性を削除（ページ遷移時の再処理を強制）
    if (pathnameChanged && typeof window !== 'undefined') {
      const allMermaidElements = document.querySelectorAll('.mermaid')
      allMermaidElements.forEach((el) => {
        el.removeAttribute('data-processed')
        // SVG が既に生成されている場合は削除
        const svg = el.querySelector('svg')
        if (svg) {
          svg.remove()
        }
      })
      mermaidDebugLog('H14', 'pathname changed, cleared data-processed attributes', {
        oldPath: lastPathnameRef.current,
        newPath: currentPathname,
        clearedCount: allMermaidElements.length
      })
    }
    
    lastPathnameRef.current = currentPathname

    mermaidDebugLog('H1', 'MermaidRenderer useEffect triggered', {
      pathname,
      currentPathname,
      pathnameChanged,
      readyState: typeof document !== 'undefined' ? document.readyState : 'unknown',
      hasMermaid: typeof window !== 'undefined' && 'mermaid' in window
    })

    function renderMermaid(force = false) {
      if (typeof window === 'undefined' || !window.mermaid) {
        mermaidDebugLog('H2', 'mermaid not available, retry scheduled', {})
        setTimeout(() => renderMermaid(force), 100)
        return
      }

      try {
        // force が true の場合は、data-processed を無視してすべて処理
        const selector = force ? '.mermaid' : '.mermaid:not([data-processed])'
        const mermaidElements = Array.from(document.querySelectorAll(selector))
        
        if (force && mermaidElements.length > 0) {
          // 強制処理時は data-processed を削除
          mermaidElements.forEach((el) => {
            el.removeAttribute('data-processed')
            const svg = el.querySelector('svg')
            if (svg) {
              svg.remove()
            }
          })
        }
        
        mermaidDebugLog('H3', 'found unprocessed mermaid elements', {
          count: mermaidElements.length,
          pathname: currentPathname,
          force,
          texts: mermaidElements.map((el) => (el.textContent || '').slice(0, 120))
        })

        if (mermaidElements.length > 0) {
          window.mermaid.run({
            nodes: mermaidElements,
            suppressErrors: true
          })
          mermaidDebugLog('H4', 'mermaid.run completed', {
            processedCount: mermaidElements.length,
            pathname: currentPathname,
            force
          })

          // エラーアイコンの確認
          setTimeout(() => {
            const errorIcons = document.querySelectorAll('.mermaid svg .error-icon, .mermaid .error-icon')
            mermaidDebugLog('H5', 'error icons after run', {
              errorCount: errorIcons.length,
              pathname: currentPathname
            })
          }, 500)
        } else {
          mermaidDebugLog('H6', 'no unprocessed mermaid elements found', {
            pathname: currentPathname,
            totalMermaidCount: document.querySelectorAll('.mermaid').length,
            force
          })
        }
      } catch (e) {
        console.warn('Mermaid render error:', e)
        mermaidDebugLog('H7', 'mermaid.run threw exception', {
          error: String(e),
          pathname: currentPathname
        })
      }
    }

    // 初回実行（常に強制処理で、既存の data-processed をクリアして再描画）
    // 即座に実行（DOM は既に存在しているはず）
    mermaidDebugLog('H16', 'initial render (forced) - before call', { 
      pathname: currentPathname,
      pathnameChanged,
      mermaidAvailable: typeof window !== 'undefined' && 'mermaid' in window,
      mermaidCount: typeof document !== 'undefined' ? document.querySelectorAll('.mermaid').length : 0
    })
    
    // 強制的に data-processed をクリア
    if (typeof window !== 'undefined') {
      const allMermaidElements = document.querySelectorAll('.mermaid')
      allMermaidElements.forEach((el) => {
        el.removeAttribute('data-processed')
        const svg = el.querySelector('svg')
        if (svg) {
          svg.remove()
        }
      })
      mermaidDebugLog('H21', 'cleared all data-processed before initial render', {
        clearedCount: allMermaidElements.length
      })
    }
    
    renderMermaid(true)
    
    mermaidDebugLog('H22', 'initial render (forced) - after call', {
      pathname: currentPathname
    })
    
    // 念のため、少し遅延して再実行（DOM 更新を待つ）
    setTimeout(() => {
      mermaidDebugLog('H20', 'delayed initial render (forced)', { 
        pathname: currentPathname
      })
      renderMermaid(true)
    }, 200)

    // ポーリング: 定期的に .mermaid 要素をチェック（GitHub Pages の静的サイト対応）
    let pollCount = 0
    const maxPolls = 30 // 最大3秒間（100ms × 30）
    pollIntervalRef.current = setInterval(() => {
      pollCount++
      const unprocessedElements = document.querySelectorAll('.mermaid:not([data-processed])')
      if (unprocessedElements.length > 0) {
        mermaidDebugLog('H9', 'polling detected unprocessed mermaid elements', {
          count: unprocessedElements.length,
          pollCount,
          pathname: currentPathname
        })
        renderMermaid(false)
      }
      // ポーリングが一定回数に達しても、まだ未処理要素がある場合は強制処理
      if (pollCount === maxPolls) {
        const allMermaidElements = document.querySelectorAll('.mermaid')
        const processedElements = document.querySelectorAll('.mermaid[data-processed]')
        if (allMermaidElements.length > 0 && processedElements.length < allMermaidElements.length) {
          mermaidDebugLog('H15', 'polling timeout, forcing render for remaining elements', {
            total: allMermaidElements.length,
            processed: processedElements.length,
            pathname: currentPathname
          })
          renderMermaid(true)
        }
      }
      if (pollCount >= maxPolls) {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current)
          pollIntervalRef.current = null
        }
      }
    }, 100)

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
        mermaidDebugLog('H8', 'mutation detected, re-rendering mermaid', { pathname: currentPathname })
        setTimeout(() => renderMermaid(true), 50)
      }
    })

    // より広範囲を監視（document.body 全体）
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    observerRef.current = observer

    // ページロード完了後の再実行（GitHub Pages の静的サイト対応）
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        mermaidDebugLog('H10', 'DOMContentLoaded event, re-rendering mermaid', { pathname: currentPathname })
        setTimeout(() => renderMermaid(false), 200)
      })
    } else {
      // 既にロード済みの場合も少し遅延して実行
      setTimeout(() => {
        mermaidDebugLog('H11', 'delayed render after mount', { pathname: currentPathname })
        renderMermaid(false)
      }, 300)
    }

    // pageshow イベントでページ遷移を検知（静的サイトの通常ナビゲーション対応）
    const handlePageShow = (e: PageTransitionEvent) => {
      mermaidDebugLog('H17', 'pageshow event triggered', {
        pathname: currentPathname,
        persisted: e.persisted,
        location: typeof window !== 'undefined' ? window.location.pathname : ''
      })
      // persisted が true の場合は bfcache からの復元、false の場合は通常のナビゲーション
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.mermaid) {
          const allMermaidElements = document.querySelectorAll('.mermaid')
          allMermaidElements.forEach((el) => {
            el.removeAttribute('data-processed')
            const svg = el.querySelector('svg')
            if (svg) {
              svg.remove()
            }
          })
          if (allMermaidElements.length > 0) {
            window.mermaid.run({
              nodes: Array.from(allMermaidElements),
              suppressErrors: true
            })
            mermaidDebugLog('H18', 'mermaid.run after pageshow', {
              processedCount: allMermaidElements.length,
              pathname: typeof window !== 'undefined' ? window.location.pathname : ''
            })
          }
        }
      }, 200)
    }
    window.addEventListener('pageshow', handlePageShow)

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current)
        pollIntervalRef.current = null
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      window.removeEventListener('pageshow', handlePageShow)
    }
  }, [pathname])

  // window.location.pathname の変更も監視（静的サイトの通常ナビゲーション対応）
  useEffect(() => {
    let lastLocation = typeof window !== 'undefined' ? window.location.pathname : ''
    
    const checkLocation = () => {
      const currentLocation = typeof window !== 'undefined' ? window.location.pathname : ''
      if (currentLocation !== lastLocation) {
        if (lastLocation !== '') {
          // パス変更を検知
          mermaidDebugLog('H12', 'window.location.pathname changed', {
            oldPath: lastLocation,
            newPath: currentLocation
          })
        } else {
          // 初回実行
          mermaidDebugLog('H19', 'window.location.pathname initial check', {
            pathname: currentLocation
          })
        }
        
        // パス変更時は data-processed を削除して強制再処理
        setTimeout(() => {
          if (typeof window !== 'undefined' && window.mermaid) {
            const allMermaidElements = document.querySelectorAll('.mermaid')
            allMermaidElements.forEach((el) => {
              el.removeAttribute('data-processed')
              const svg = el.querySelector('svg')
              if (svg) {
                svg.remove()
              }
            })
            
            if (allMermaidElements.length > 0) {
              window.mermaid.run({
                nodes: Array.from(allMermaidElements),
                suppressErrors: true
              })
              mermaidDebugLog('H13', 'mermaid.run after location change', {
                processedCount: allMermaidElements.length,
                pathname: currentLocation
              })
            }
          }
        }, 300)
      }
      lastLocation = currentLocation
    }

    // 初回実行
    checkLocation()
    
    const interval = setInterval(checkLocation, 100)
    return () => clearInterval(interval)
  }, [])

  return null
}
