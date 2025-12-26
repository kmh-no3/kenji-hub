"use client"

import { useEffect, useState, useRef, useCallback } from 'react'

interface TocItem {
    id: string
    text: string
    level: number
}

interface TableOfContentsProps {
    content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [tocItems, setTocItems] = useState<TocItem[]>([])
    const [activeId, setActiveId] = useState<string>('')
    const observerRef = useRef<IntersectionObserver | null>(null)
    const itemsRef = useRef<TocItem[]>([])
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isScrollingRef = useRef(false)
    const activeIdRef = useRef<string>('')

    // スクロール位置に基づいてアクティブなセクションを検出
    const updateActiveIdFromScroll = useCallback(() => {
        if (itemsRef.current.length === 0) {
            return
        }

        // スクロール中は更新しない
        if (isScrollingRef.current) {
            return
        }

        const header = document.querySelector('header')
        const headerHeight = header ? header.getBoundingClientRect().height : 80
        const offset = headerHeight + 20

        // 現在のスクロール位置
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0

        // 各見出しの位置を確認（下から上へ）
        // スクロール位置が要素の位置を超えた場合、その要素がアクティブ
        let currentActiveId = ''
        let closestElement: { id: string; distance: number } | null = null

        for (let i = itemsRef.current.length - 1; i >= 0; i--) {
            const item = itemsRef.current[i]
            // IDで要素を探す、見つからない場合はquerySelectorでフォールバック
            let element = document.getElementById(item.id)
            if (!element) {
                // フォールバック: article-content内で見出しを直接検索
                const articleContent = document.querySelector('.article-content')
                if (articleContent) {
                    const headings = articleContent.querySelectorAll('h2, h3, h4')
                    const headingArray = Array.from(headings)
                    const headingIndex = itemsRef.current.findIndex(h => h.id === item.id)
                    if (headingIndex >= 0 && headingIndex < headingArray.length) {
                        element = headingArray[headingIndex] as HTMLElement
                    }
                }
            }

            if (element) {
                const rect = element.getBoundingClientRect()
                // getBoundingClientRect().topはビューポート上端からの距離
                const elementTop = rect.top
                // ヘッダー位置からの距離を計算（負の値はヘッダーより上、正の値はヘッダーより下）
                const distanceFromHeader = elementTop - offset

                // 要素がヘッダーより上またはヘッダー位置にある場合（elementTop <= offset）
                if (elementTop <= offset + 10) {
                    currentActiveId = item.id
                    break
                } else {
                    // ヘッダーより下にある要素の中で、最も近いものを記録
                    if (!closestElement || distanceFromHeader < closestElement.distance) {
                        closestElement = { id: item.id, distance: distanceFromHeader }
                    }
                }
            }
        }

        // ヘッダーより上にある要素が見つからなかった場合、最も近い要素を選択
        if (!currentActiveId && closestElement) {
            currentActiveId = closestElement.id
        }

        // それでも見つからない場合、最初の見出しをアクティブにする
        if (!currentActiveId && itemsRef.current.length > 0) {
            currentActiveId = itemsRef.current[0].id
        }

        // アクティブIDが変更された場合のみ更新
        if (currentActiveId && currentActiveId !== activeIdRef.current) {
            activeIdRef.current = currentActiveId
            if (process.env.NODE_ENV === 'development') {
                console.log('[TOC] Scroll: アクティブIDを更新', currentActiveId, 'scrollY:', scrollY)
            }
            setActiveId(currentActiveId)
        }
    }, [])

    // HTMLコンテンツから見出しを抽出してIDを付与
    useEffect(() => {
        if (typeof window === 'undefined') return

        let mounted = true

        function processHeadings() {
            const articleContent = document.querySelector('.article-content')
            if (!articleContent) {
                return false
            }

            // 見出し要素を取得
            const headings = articleContent.querySelectorAll('h2, h3, h4')
            if (headings.length === 0) {
                return false
            }

            const items: TocItem[] = []

            headings.forEach((heading, index) => {
                const text = heading.textContent?.trim() || ''
                if (!text) return

                const level = parseInt(heading.tagName.charAt(1)) // h2 -> 2, h3 -> 3, etc.

                // IDを生成
                let id = heading.id
                if (!id) {
                    // シンプルなID生成
                    const sanitized = text
                        .toLowerCase()
                        .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g, '-')
                        .replace(/^-+|-+$/g, '')
                        .substring(0, 50)

                    id = sanitized ? `heading-${index}-${sanitized}` : `heading-${index}`
                    heading.id = id
                }

                items.push({ id, text, level })
            })

            if (items.length > 0 && mounted) {
                setTocItems(items)
                itemsRef.current = items

                // デバッグ用ログ（開発環境のみ）
                if (process.env.NODE_ENV === 'development') {
                    console.log('[TOC] 見出しを検出:', items.length, '個')
                    console.log('[TOC] 見出し一覧:', items.map(i => ({ id: i.id, text: i.text.substring(0, 30) })))
                }

                // IntersectionObserverを設定
                setupIntersectionObserver(items)
            }

            return true
        }

        function setupIntersectionObserver(items: TocItem[]) {
            // 既存のObserverをクリーンアップ
            if (observerRef.current) {
                observerRef.current.disconnect()
            }

            const header = document.querySelector('header')
            const headerHeight = header ? header.getBoundingClientRect().height : 80
            const rootMarginTop = headerHeight + 20
            const rootMarginBottom = '-40%' // 最適化: より多くのエントリを検出

            // IntersectionObserverの設定
            const observer = new IntersectionObserver(
                (entries) => {
                    if (!mounted || isScrollingRef.current) return

                    // 交差している見出しを取得（上から下へ）
                    const visibleEntries = entries
                        .filter((entry) => entry.isIntersecting)
                        .sort((a, b) => {
                            // ビューポート上部からの距離でソート
                            return a.boundingClientRect.top - b.boundingClientRect.top
                        })

                    if (visibleEntries.length > 0) {
                        // 最も上に近い見出しを選択（ヘッダー位置を考慮）
                        let selectedEntry: IntersectionObserverEntry | null = null
                        let minTop = Infinity

                        for (const entry of visibleEntries) {
                            const top = entry.boundingClientRect.top

                            // ヘッダーより下にある見出しで、最も上に近い（topが最小の）ものを選択
                            if (top >= headerHeight - 10 && top < minTop) {
                                minTop = top
                                selectedEntry = entry
                            }
                        }

                        // ヘッダーより下の見出しが見つからない場合は、最も上に近いものを選択
                        if (!selectedEntry && visibleEntries.length > 0) {
                            selectedEntry = visibleEntries[0]
                        }

                        if (selectedEntry) {
                            const newActiveId = selectedEntry.target.id
                            if (newActiveId && newActiveId !== activeIdRef.current) {
                                activeIdRef.current = newActiveId
                                if (process.env.NODE_ENV === 'development') {
                                    console.log('[TOC] IntersectionObserver: アクティブIDを更新', newActiveId)
                                }
                                setActiveId(newActiveId)
                            }
                        }
                    } else {
                        // 交差していない場合はスクロール位置から判定
                        updateActiveIdFromScroll()
                    }
                },
                {
                    root: null,
                    rootMargin: `-${rootMarginTop}px 0px ${rootMarginBottom} 0px`,
                    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
                }
            )

            observerRef.current = observer

            // 各見出しを監視
            items.forEach((item) => {
                const element = document.getElementById(item.id)
                if (element) {
                    observer.observe(element)
                }
            })

            // 初回のアクティブIDを設定
            setTimeout(() => {
                if (mounted) {
                    updateActiveIdFromScroll()
                }
            }, 300)
        }

        // 見出し処理を試行（複数回リトライ）
        const tryProcessHeadings = (retries = 15) => {
            if (processHeadings()) {
                return
            }

            if (retries > 0) {
                setTimeout(() => {
                    if (mounted) {
                        tryProcessHeadings(retries - 1)
                    }
                }, 150)
            }
        }

        // 初回実行
        tryProcessHeadings()

        // スクロールイベントリスナー（throttle付き）
        const handleScroll = () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
            }

            scrollTimeoutRef.current = setTimeout(() => {
                if (mounted && !isScrollingRef.current) {
                    updateActiveIdFromScroll()
                }
            }, 100)
        }

        // スクロールイベントを確実に登録
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll, { passive: true, capture: false })
            window.addEventListener('resize', handleScroll, { passive: true, capture: false })
        }

        // クリーンアップ
        return () => {
            mounted = false
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current)
                scrollTimeoutRef.current = null
            }
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [content, updateActiveIdFromScroll])

    // スムーズスクロール
    const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault()
        e.stopPropagation()

        const element = document.getElementById(id)
        if (!element) {
            return
        }

        // スクロール中フラグを設定
        isScrollingRef.current = true

        // ヘッダーの高さを取得
        const header = document.querySelector('header')
        const headerHeight = header ? header.getBoundingClientRect().height : 80
        const offset = headerHeight + 20

        // 要素の位置を計算
        const rect = element.getBoundingClientRect()
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0
        const elementTop = rect.top + scrollY

        // スクロール位置を計算
        const targetScrollPosition = Math.max(0, elementTop - offset)

        // アクティブIDを即座に更新
        activeIdRef.current = id
        setActiveId(id)

        // スクロール実行
        window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth',
        })

        // スクロール完了後に再確認
        setTimeout(() => {
            isScrollingRef.current = false
            updateActiveIdFromScroll()
        }, 600)
    }, [updateActiveIdFromScroll])

    return (
        <div className="hidden lg:block">
            {tocItems.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                        目次
                    </h3>
                    <p className="text-sm text-gray-500">読み込み中...</p>
                </div>
            ) : (
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                        目次
                    </h3>
                    <nav className="relative border-l-2 border-gray-200">
                        {tocItems.map((item) => {
                            const isActive = activeId === item.id
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => handleClick(e, item.id)}
                                    className={`relative block text-sm transition-all duration-200 py-2 ${item.level === 2
                                        ? 'pl-4 font-medium'
                                        : item.level === 3
                                            ? 'pl-6 text-sm'
                                            : 'pl-8 text-xs'
                                        } ${isActive
                                            ? 'text-blue-600 font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-blue-600 before:-ml-0.5'
                                            : 'text-gray-600 hover:text-blue-600'
                                        }`}
                                >
                                    {item.text}
                                </a>
                            )
                        })}
                    </nav>
                </div>
            )}
        </div>
    )
}
