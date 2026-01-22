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
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [recentlyChangedId, setRecentlyChangedId] = useState<string | null>(null)
    const [compactStyle, setCompactStyle] = useState<{ maxWidth?: string; minWidth?: string }>({})
    const observerRef = useRef<IntersectionObserver | null>(null)
    const itemsRef = useRef<TocItem[]>([])
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const isScrollingRef = useRef(false)
    const activeIdRef = useRef<string>('')
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const mobileNavRef = useRef<HTMLElement>(null)
    const activeItemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({})
    const overlayRef = useRef<HTMLDivElement>(null)

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

    // アクティブなアイテムのテキストを取得
    const activeItem = tocItems.find(item => item.id === activeId)

    // アクティブアイテムが変更されたときに一時的にハイライト
    useEffect(() => {
        if (activeId && isMobileOpen) {
            setRecentlyChangedId(activeId)
            const timer = setTimeout(() => {
                setRecentlyChangedId(null)
            }, 1500)
            return () => clearTimeout(timer)
        }
    }, [activeId, isMobileOpen])

    // 外部クリックでモバイルメニューを閉じる & ボディのスクロールを制御
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMobileOpen(false)
            }
        }

        if (isMobileOpen) {
            // ボディのスクロールを無効化
            document.body.style.overflow = 'hidden'
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            // ボディのスクロールを有効化
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMobileOpen])

    // ドロップダウンが開いている時、アクティブアイテムにスクロール
    useEffect(() => {
        if (isMobileOpen && activeId && activeItemRefs.current[activeId] && mobileNavRef.current) {
            const activeElement = activeItemRefs.current[activeId]
            const navElement = mobileNavRef.current

            // アクティブアイテムの位置を計算
            const elementTop = activeElement.offsetTop
            const elementHeight = activeElement.offsetHeight
            const navHeight = navElement.clientHeight
            const scrollTop = navElement.scrollTop

            // アクティブアイテムが見えていない場合はスクロール
            if (elementTop < scrollTop || elementTop + elementHeight > scrollTop + navHeight) {
                // アクティブアイテムを中央に配置
                const targetScroll = elementTop - (navHeight / 2) + (elementHeight / 2)
                navElement.scrollTo({
                    top: Math.max(0, targetScroll),
                    behavior: 'smooth'
                })
            }
        }
    }, [activeId, isMobileOpen])

    // ドロップダウンを開いた直後にアクティブアイテムにスクロール
    useEffect(() => {
        if (isMobileOpen && activeId && activeItemRefs.current[activeId] && mobileNavRef.current) {
            setTimeout(() => {
                const activeElement = activeItemRefs.current[activeId]
                const navElement = mobileNavRef.current
                if (activeElement && navElement) {
                    const elementTop = activeElement.offsetTop
                    const elementHeight = activeElement.offsetHeight
                    const navHeight = navElement.clientHeight
                    const targetScroll = elementTop - (navHeight / 2) + (elementHeight / 2)

                    navElement.scrollTo({
                        top: Math.max(0, targetScroll),
                        behavior: 'smooth'
                    })
                }
            }, 100)
        }
    }, [isMobileOpen, activeId])
    // #region agent log
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const updateCompactStyle = () => {
                const width = window.innerWidth
                if (width < 1024) {
                    setCompactStyle({
                        maxWidth: width >= 640 ? '160px' : '140px',
                        minWidth: '80px'
                    })
                } else {
                    setCompactStyle({})
                }
            }
            updateCompactStyle()
            window.addEventListener('resize', updateCompactStyle)
            return () => window.removeEventListener('resize', updateCompactStyle)
        }
    }, [])

    // デバッグログは本番環境では無効化

    return (
        <>
            {/* オーバーレイ背景（展開時のみ、親要素の外に配置） */}
            {isMobileOpen && tocItems.length > 0 && (
                <div
                    ref={overlayRef}
                    className="toc-overlay fixed backdrop-blur-sm z-30"
                    style={{ opacity: 1 }}
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="目次を閉じる"
                />
            )}
            {/* モバイル用ドロップダウン目次（小さく右寄せ） */}
            <div
                className={`lg:hidden mobile-toc-sticky mobile-toc-fixed mobile-toc-compact ${isMobileOpen ? 'mobile-toc-open' : ''}`}
                style={isMobileOpen ? {
                    width: '80vw',
                    maxWidth: '80vw',
                    right: '0.5rem',
                    left: 'auto',
                    marginLeft: 'auto',
                    marginRight: '0'
                } : compactStyle}
            >
                {tocItems.length > 0 && (
                    <>

                        <div
                            ref={mobileMenuRef}
                            className={`bg-[color:var(--color-surface)] rounded-lg border border-[color:var(--color-border)] relative z-40 transition-shadow duration-200 ${isMobileOpen ? 'mobile-toc-open shadow-lg' : 'shadow-md'
                                }`}
                            style={isMobileOpen ? { width: '80vw', maxWidth: '80vw', marginLeft: 'auto', marginRight: '0' } : compactStyle}
                        >
                            <button
                                onClick={() => setIsMobileOpen(!isMobileOpen)}
                                className="w-full px-2 py-1.5 flex items-center justify-between text-left hover:bg-[color:rgba(255,255,255,0.06)] transition-all duration-200 rounded-t-lg"
                                aria-expanded={isMobileOpen}
                                aria-label={isMobileOpen ? '目次を閉じる' : '目次を開く'}
                            >
                                <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                                    <svg className="w-4 h-4 text-[color:var(--color-muted)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <span className="text-xs font-semibold text-[color:var(--color-fg)] flex-shrink-0 whitespace-nowrap">目次</span>
                                    {activeItem && isMobileOpen && (
                                        <span className="text-xs text-[color:var(--color-muted)] flex-shrink-0 whitespace-nowrap">
                                            {tocItems.findIndex(item => item.id === activeId) + 1}/{tocItems.length}
                                        </span>
                                    )}
                                </div>
                                <svg
                                    className={`w-4 h-4 text-[color:var(--color-muted)] transition-transform duration-200 flex-shrink-0 ml-1 ${isMobileOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isMobileOpen && (
                                <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] rounded-b-lg">
                                    <nav
                                        ref={mobileNavRef}
                                        className="mobile-toc-dropdown mobile-toc-nav px-3 py-2 max-h-[calc(100vh-12rem)] overflow-y-auto relative z-50"
                                    >
                                        {tocItems.map((item) => {
                                            const isActive = activeId === item.id
                                            const isRecentlyChanged = recentlyChangedId === item.id
                                            return (
                                                <a
                                                    key={item.id}
                                                    ref={(el) => {
                                                        activeItemRefs.current[item.id] = el
                                                    }}
                                                    href={`#${item.id}`}
                                                    onClick={(e) => {
                                                        handleClick(e, item.id)
                                                        setIsMobileOpen(false)
                                                    }}
                                                    className={`block text-xs py-1.5 transition-all duration-200 rounded-md ${item.level === 2
                                                        ? 'pl-2 font-medium'
                                                        : item.level === 3
                                                            ? 'pl-4 text-xs'
                                                            : 'pl-6 text-xs'
                                                        } ${isActive
                                                            ? `text-[color:var(--color-link)] font-bold shadow-sm border-l-2 border-[color:var(--color-link)] pl-2 ${isRecentlyChanged ? 'mobile-toc-active-pulse' : 'bg-[color:var(--color-accent-alpha-12)]'}`
                                                            : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-link)] hover:bg-[color:rgba(255,255,255,0.06)]'
                                                        }`}
                                                >
                                                    <span className={`flex items-center ${isActive ? 'ml-2' : ''}`}>
                                                        {isActive && (
                                                            <svg className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {item.text}
                                                    </span>
                                                </a>
                                            )
                                        })}
                                    </nav>

                                    {/* 閉じるボタン */}
                                    <div className="border-t border-[color:var(--color-border)] px-3 py-1.5 bg-[color:rgba(255,255,255,0.04)]">
                                        <button
                                            onClick={() => setIsMobileOpen(false)}
                                            className="w-full py-1.5 px-3 text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)] hover:bg-[color:rgba(255,255,255,0.06)] font-medium transition-all duration-200 flex items-center justify-center space-x-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[color:var(--color-link)] focus:ring-offset-2"
                                            aria-label="目次を閉じる"
                                        >
                                            <span>閉じる</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* デスクトップ用Sticky目次 */}
            <div className="hidden lg:block">
                {tocItems.length === 0 ? (
                    <div className="bg-[color:var(--color-surface)] rounded-lg border border-[color:var(--color-border)] p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-[color:var(--color-fg)] mb-4 uppercase tracking-wide">
                            目次
                        </h3>
                        <p className="text-sm text-[color:var(--color-muted)]">読み込み中...</p>
                    </div>
                ) : (
                    <div className="bg-[color:var(--color-surface)] rounded-lg border border-[color:var(--color-border)] p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-[color:var(--color-fg)] mb-4 uppercase tracking-wide">
                            目次
                        </h3>
                        <nav className="relative border-l-2 border-[color:var(--color-border)]">
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
                                                ? 'text-[color:var(--color-link)] font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[color:var(--color-link)] before:-ml-0.5'
                                                : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-link)]'
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
        </>
    )
}
