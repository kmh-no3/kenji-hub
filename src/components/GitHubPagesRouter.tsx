"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function GitHubPagesRouter() {
  const router = useRouter()

  useEffect(() => {
    // GitHub Pages環境でのみ実行
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      const search = window.location.search
      
      // URLに/?/が含まれている場合（404.htmlからのリダイレクト）
      if (search.includes('?/')) {
        const pathFromQuery = search.replace('?/', '').replace(/~and~/g, '&')
        const newPath = pathFromQuery ? `/${pathFromQuery}` : '/'
        
        // 履歴を更新してリダイレクト
        window.history.replaceState(null, '', newPath)
        router.replace(newPath)
      }
      
      // ベースパスの処理（/kenji-hub/の場合）
      const basePath = '/kenji-hub'
      if (window.location.pathname.startsWith(basePath)) {
        const pathWithoutBase = window.location.pathname.replace(basePath, '')
        if (pathWithoutBase !== window.location.pathname) {
          window.history.replaceState(null, '', pathWithoutBase || '/')
        }
      }
    }
  }, [router])

  return null
} 