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
    }
  }, [router])

  return null
} 