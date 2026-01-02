"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ThemeDebugProbe() {
    const pathname = usePathname();

    const getRid = () => {
        try {
            return document.querySelector('meta[name="x-debug-rid"]')?.getAttribute('content') ?? null;
        } catch {
            return null;
        }
    };

    // 既存の初期計測（マウント時のみ）
    useEffect(() => {
        const scriptEl = document.getElementById('theme-script');
        const mode = (() => {
            try {
                const raw = localStorage.getItem('kenji-hub-theme');
                return raw ?? null;
            } catch {
                return 'localStorage_error';
            }
        })();

        // #region agent log
        fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H1', location: 'src/components/utils/ThemeDebugProbe.tsx:useEffect', message: 'Theme probe on mount', data: { hasThemeScript: !!scriptEl, themeScriptTag: scriptEl?.tagName ?? null, htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode }, storedRaw: mode, bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color }, timestamp: Date.now() }) }).catch(() => { });
        // #endregion agent log

        // ブラウザ側で /favicon.ico が本当に 500 を返しているかを確定する（サーバーログと突き合わせる）
        // #region agent log
        fetch('/favicon.ico', { cache: 'no-store' })
            .then((res) => {
                fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H8', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon', message: 'favicon fetch result', data: { status: res.status, ok: res.ok, contentType: res.headers.get('content-type'), url: res.url, iconLinks: Array.from(document.querySelectorAll('link[rel~=\"icon\"]')).map((el) => ({ rel: el.getAttribute('rel'), href: (el as HTMLLinkElement).href, type: el.getAttribute('type') })) }, timestamp: Date.now() }) }).catch(() => { });
            })
            .catch((e) => {
                fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H8', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon', message: 'favicon fetch error', data: { error: String(e) }, timestamp: Date.now() }) }).catch(() => { });
            });
        // #endregion agent log

        // 200/500 が混在していないかを、キャッシュバスター付きで複数回フェッチして確定する
        // #region agent log
        Promise.all(
            [0, 1, 2].map(async (i) => {
                const url = `/favicon.ico?probe=${Date.now()}-${i}`;
                try {
                    const r = await fetch(url, { cache: 'no-store' });
                    return {
                        url: r.url,
                        status: r.status,
                        ok: r.ok,
                        contentType: r.headers.get('content-type'),
                    };
                } catch (e) {
                    return { url, error: String(e) };
                }
            }),
        ).then((results) => {
            fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H9', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon-multi', message: 'favicon multi-fetch results', data: { results }, timestamp: Date.now() }) }).catch(() => { });
        });
        // #endregion agent log
    }, []);

    // ブログ本文がテーマ（特にダーク時のネイビー基調）に追従しているかを pathname 変更ごとに計測する
    useEffect(() => {
        // #region agent log
        // ブラウザ→127.0.0.1(別オリジン) は CORS/拡張機能で落ちやすいので、同一オリジン API 経由で ingest に転送する
        const send = (payload: any) => {
            const rid = getRid();
            if (payload && typeof payload === 'object') {
                payload.data = { ...(payload.data ?? {}), rid };
            }
            return fetch('/api/agent-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }).catch(() => { });
        };

        const readThemeVars = () => {
            const styles = getComputedStyle(document.documentElement);
            const pick = (name: string) => styles.getPropertyValue(name).trim() || null;
            return {
                '--color-bg': pick('--color-bg'),
                '--color-surface': pick('--color-surface'),
                '--color-fg': pick('--color-fg'),
                '--color-muted': pick('--color-muted'),
                '--color-border': pick('--color-border'),
                '--color-accent': pick('--color-accent'),
                '--color-accent-hover': pick('--color-accent-hover'),
                '--color-link': pick('--color-link'),
                '--color-article-callout-warn-bg': pick('--color-article-callout-warn-bg'),
                '--color-article-callout-info-bg': pick('--color-article-callout-info-bg'),
                '--color-header-bg': pick('--color-header-bg'),
                '--color-header-fg': pick('--color-header-fg'),
                '--color-header-fg-muted': pick('--color-header-fg-muted'),
                '--color-header-hover-bg': pick('--color-header-hover-bg'),
                '--color-popover-bg': pick('--color-popover-bg'),
                '--color-popover-fg': pick('--color-popover-fg'),
                '--color-popover-border': pick('--color-popover-border'),
                '--color-popover-hover-bg': pick('--color-popover-hover-bg'),
            };
        };

        const getVar = (el: Element | null, name: string) => {
            if (!el) return null;
            try {
                const v = getComputedStyle(el as Element).getPropertyValue(name).trim();
                return v || null;
            } catch {
                return null;
            }
        };

        send({
            sessionId: 'debug-session',
            runId: 'pre-fix',
            hypothesisId: 'B1-BOOT',
            location: 'src/components/utils/ThemeDebugProbe.tsx:boot',
            message: 'ThemeDebugProbe boot (article probe installed)',
            data: {
                probeVersion: 'tw-prose-vars-v1',
                path: pathname,
                htmlDataset: {
                    theme: document.documentElement.dataset.theme,
                    themeMode: document.documentElement.dataset.themeMode,
                },
                cssVars: readThemeVars(),
            },
            timestamp: Date.now(),
        });

        // #region agent log
        // ヘッダーがライト/ダークで切り替わっているかを一発判定（このログが出れば“最新版の計測コードが動いた”証拠にもなる）
        try {
            const headerEl = document.querySelector('header') as HTMLElement | null;
            send({
                sessionId: 'debug-session',
                runId: 'pre-fix',
                hypothesisId: 'H18',
                location: 'src/components/utils/ThemeDebugProbe.tsx:headerProbe',
                message: 'Header computed styles + css vars',
                data: {
                    version: 'header-probe-v1',
                    path: pathname,
                    htmlDataset: {
                        theme: document.documentElement.dataset.theme,
                        themeMode: document.documentElement.dataset.themeMode,
                    },
                    cssVars: readThemeVars(),
                    header: headerEl
                        ? {
                            className: headerEl.className ?? null,
                            bg: getComputedStyle(headerEl).backgroundColor,
                            color: getComputedStyle(headerEl).color,
                            borderColor: getComputedStyle(headerEl).borderColor,
                        }
                        : null,
                },
                timestamp: Date.now(),
            });
        } catch {
            // ignore
        }
        // #endregion agent log

        const isBlogDetail = pathname.startsWith('/blog/') && pathname !== '/blog' && pathname !== '/blog/';
        if (!isBlogDetail) return;

        send({
            sessionId: 'debug-session',
            runId: 'pre-fix',
            hypothesisId: 'H12',
            location: 'src/components/utils/ThemeDebugProbe.tsx:version',
            message: 'ThemeDebugProbe version marker',
            data: {
                version: 'hardcoded-probe-v4',
                path: pathname,
                htmlDataset: {
                    theme: document.documentElement.dataset.theme,
                    themeMode: document.documentElement.dataset.themeMode,
                },
                cssVars: readThemeVars(),
            },
            timestamp: Date.now(),
        });

        const probeArticleStyles = (attempt: number, reason: 'route' | 'raf' | 'theme-change') => {
            try {
                const contentEl = document.querySelector('.article-content') as HTMLElement | null;
                const articleEl = document.querySelector('article') as HTMLElement | null;
                const headerEl = document.querySelector('header') as HTMLElement | null;
                const tableEl = contentEl ? (contentEl.querySelector('table') as HTMLElement | null) : null;
                const codeEl = contentEl ? (contentEl.querySelector('code') as HTMLElement | null) : null;
                const inlineCodeEl = codeEl && !codeEl.closest('pre') ? codeEl : null;
                const aEl = contentEl ? (contentEl.querySelector('a') as HTMLElement | null) : null;

                const calloutWarnEl = contentEl ? (contentEl.querySelector('.callout-warn') as HTMLElement | null) : null;
                const calloutInfoEl = contentEl ? (contentEl.querySelector('.callout-info') as HTMLElement | null) : null;
                const calloutLinkEl = contentEl ? (contentEl.querySelector('a.callout-link') as HTMLElement | null) : null;
                const legacyWarnEl = contentEl ? (contentEl.querySelector('.bg-yellow-50') as HTMLElement | null) : null;
                const legacyInfoEl = contentEl ? (contentEl.querySelector('.bg-blue-50') as HTMLElement | null) : null;
                const legacyLinkEl = contentEl ? (contentEl.querySelector('a.text-blue-600') as HTMLElement | null) : null;

                const findByClassSubstring = (substr: string) => {
                    try {
                        const all = Array.from(document.querySelectorAll('*')) as HTMLElement[];
                        return all.find((el) => (el.className ?? '').toString().includes(substr)) ?? null;
                    } catch {
                        return null;
                    }
                };

                const hardBlue016El = findByClassSubstring('rgba(62,168,255,0.16)');
                const hardBlue012El = findByClassSubstring('rgba(62,168,255,0.12)');
                const hardBlueCssEl = findByClassSubstring('rgb(62, 168, 255)');

                const snapBg = (el: HTMLElement | null) =>
                    el
                        ? {
                            tag: el.tagName,
                            className: el.className ?? null,
                            bg: getComputedStyle(el).backgroundColor,
                            color: getComputedStyle(el).color,
                            borderColor: getComputedStyle(el).borderColor,
                        }
                        : null;

                if ((attempt === 1 && reason === 'route') || (attempt === 3 && reason === 'theme-change')) {
                    send({
                        sessionId: 'debug-session',
                        runId: 'pre-fix',
                        hypothesisId: 'H12',
                        location: 'src/components/utils/ThemeDebugProbe.tsx:hardcodedProbe',
                        message: 'Hardcoded rgba(62,168,255,*) presence',
                        data: {
                            path: pathname,
                            htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode },
                            found: {
                                rgba62_016: !!hardBlue016El,
                                rgba62_012: !!hardBlue012El,
                                rgb62: !!hardBlueCssEl,
                            },
                            sample: {
                                rgba62_016: snapBg(hardBlue016El),
                                rgba62_012: snapBg(hardBlue012El),
                            },
                        },
                        timestamp: Date.now(),
                    });
                }

                const sample = (() => {
                    if (!contentEl) return null;
                    const p = contentEl.querySelector('p');
                    const h2 = contentEl.querySelector('h2');
                    const h3 = contentEl.querySelector('h3');
                    const hardLink = contentEl.querySelector('a.text-blue-600, a.text-blue-700, a.text-blue-800');
                    const hardText = contentEl.querySelector('.text-gray-600, .text-gray-700, .text-gray-500, .text-blue-700, .text-blue-600');
                    const warn = contentEl.querySelector('.bg-yellow-50, .border-yellow-400, .text-yellow-700');
                    const info = contentEl.querySelector('.bg-blue-50, .border-blue-400, .text-blue-700');
                    const links = Array.from(contentEl.querySelectorAll('a')).slice(0, 3) as HTMLElement[];

                    const snap = (el: Element | null) =>
                        el
                            ? {
                                tag: el.tagName,
                                className: (el as HTMLElement).className ?? null,
                                color: getComputedStyle(el as Element).color,
                                bg: getComputedStyle(el as Element).backgroundColor,
                                borderColor: getComputedStyle(el as Element).borderColor,
                            }
                            : null;

                    return {
                        p: snap(p),
                        h2: snap(h2),
                        h3: snap(h3),
                        hardLink: snap(hardLink),
                        hardText: snap(hardText),
                        warn: snap(warn),
                        info: snap(info),
                        links: links.map((el) => ({
                            href: (el as HTMLAnchorElement).href ?? null,
                            className: el.className ?? null,
                            color: getComputedStyle(el).color,
                        })),
                    };
                })();

                const firstLink = aEl
                    ? {
                        href: (aEl as HTMLAnchorElement).href ?? null,
                        className: aEl.className ?? null,
                        isTextBlue600: !!(aEl as any).matches?.('.text-blue-600'),
                        isTextBlue700: !!(aEl as any).matches?.('.text-blue-700'),
                        isTextBlue800: !!(aEl as any).matches?.('.text-blue-800'),
                    }
                    : null;

                send({
                    sessionId: 'debug-session',
                    runId: 'pre-fix',
                    hypothesisId: 'B1',
                    location: 'src/components/utils/ThemeDebugProbe.tsx:probeArticleStyles',
                    message: 'Article theme computed styles (client probe)',
                    data: {
                        probeVersion: 'tw-prose-vars-v1',
                        calloutProbeVersion: 'callout-v1',
                        attempt,
                        reason,
                        path: pathname,
                        isBlogDetail,
                        htmlDataset: {
                            theme: document.documentElement.dataset.theme,
                            themeMode: document.documentElement.dataset.themeMode,
                        },
                        cssVars: readThemeVars(),
                        found: {
                            article: !!articleEl,
                            content: !!contentEl,
                            header: !!headerEl,
                            table: !!tableEl,
                            inlineCode: !!inlineCodeEl,
                            link: !!aEl,
                        },
                        header: headerEl
                            ? {
                                className: headerEl.className ?? null,
                                bg: getComputedStyle(headerEl).backgroundColor,
                                color: getComputedStyle(headerEl).color,
                                borderColor: getComputedStyle(headerEl).borderColor,
                            }
                            : null,
                        callouts: {
                            new: {
                                warn: calloutWarnEl
                                    ? { className: calloutWarnEl.className, bg: getComputedStyle(calloutWarnEl).backgroundColor, borderColor: getComputedStyle(calloutWarnEl).borderColor, color: getComputedStyle(calloutWarnEl).color }
                                    : null,
                                info: calloutInfoEl
                                    ? { className: calloutInfoEl.className, bg: getComputedStyle(calloutInfoEl).backgroundColor, borderColor: getComputedStyle(calloutInfoEl).borderColor, color: getComputedStyle(calloutInfoEl).color }
                                    : null,
                                link: calloutLinkEl
                                    ? { className: calloutLinkEl.className, color: getComputedStyle(calloutLinkEl).color }
                                    : null,
                            },
                            legacy: {
                                warn: legacyWarnEl
                                    ? { className: legacyWarnEl.className, bg: getComputedStyle(legacyWarnEl).backgroundColor, borderColor: getComputedStyle(legacyWarnEl).borderColor, color: getComputedStyle(legacyWarnEl).color }
                                    : null,
                                info: legacyInfoEl
                                    ? { className: legacyInfoEl.className, bg: getComputedStyle(legacyInfoEl).backgroundColor, borderColor: getComputedStyle(legacyInfoEl).borderColor, color: getComputedStyle(legacyInfoEl).color }
                                    : null,
                                link: legacyLinkEl
                                    ? { className: legacyLinkEl.className, color: getComputedStyle(legacyLinkEl).color }
                                    : null,
                            },
                        },
                        linkDebug: {
                            a: aEl
                                ? {
                                    className: aEl.className ?? null,
                                    color: getComputedStyle(aEl).color,
                                    isHovered: !!(aEl as any).matches?.(':hover'),
                                    varColorLink: getVar(aEl, '--color-link'),
                                    varColorAccent: getVar(aEl, '--color-accent'),
                                    varTwProseLinks: getVar(aEl, '--tw-prose-links'),
                                }
                                : null,
                            calloutLink: calloutLinkEl
                                ? {
                                    className: calloutLinkEl.className ?? null,
                                    color: getComputedStyle(calloutLinkEl).color,
                                    isHovered: !!(calloutLinkEl as any).matches?.(':hover'),
                                    varColorLink: getVar(calloutLinkEl, '--color-link'),
                                    varColorAccent: getVar(calloutLinkEl, '--color-accent'),
                                    varTwProseLinks: getVar(calloutLinkEl, '--tw-prose-links'),
                                }
                                : null,
                        },
                        hardcodedColorProbe: {
                            rgba62_016: snapBg(hardBlue016El),
                            rgba62_012: snapBg(hardBlue012El),
                            rgb62: snapBg(hardBlueCssEl),
                        },
                        article: articleEl
                            ? {
                                bg: getComputedStyle(articleEl).backgroundColor,
                                color: getComputedStyle(articleEl).color,
                                borderColor: getComputedStyle(articleEl).borderColor,
                            }
                            : null,
                        content: contentEl
                            ? {
                                className: contentEl.className,
                                twProseBody: getVar(contentEl, '--tw-prose-body'),
                                twProseLinks: getVar(contentEl, '--tw-prose-links'),
                                color: getComputedStyle(contentEl).color,
                                linkColor: aEl ? getComputedStyle(aEl).color : null,
                            }
                            : null,
                        firstLink,
                        sample,
                        table: tableEl
                            ? {
                                bg: getComputedStyle(tableEl).backgroundColor,
                                borderColor: getComputedStyle(tableEl).borderColor,
                            }
                            : null,
                        inlineCode: inlineCodeEl
                            ? {
                                bg: getComputedStyle(inlineCodeEl).backgroundColor,
                                color: getComputedStyle(inlineCodeEl).color,
                            }
                            : null,
                    },
                    timestamp: Date.now(),
                });

                if (attempt === 1 && reason === 'route') {
                    // #region agent log
                    fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            sessionId: 'debug-session',
                            runId: 'pre-fix',
                            hypothesisId: 'H10',
                            location: 'src/components/utils/ThemeDebugProbe.tsx:calloutPresence',
                            message: 'Callout class presence (new vs legacy)',
                            data: {
                                path: pathname,
                                htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode },
                                exists: {
                                    newWarn: !!calloutWarnEl,
                                    newInfo: !!calloutInfoEl,
                                    newLink: !!calloutLinkEl,
                                    legacyWarn: !!legacyWarnEl,
                                    legacyInfo: !!legacyInfoEl,
                                    legacyLink: !!legacyLinkEl,
                                },
                                cssVars: readThemeVars(),
                            },
                            timestamp: Date.now(),
                        }),
                    }).catch(() => { });
                    // #endregion agent log
                }
            } catch (e) {
                send({
                    sessionId: 'debug-session',
                    runId: 'pre-fix',
                    hypothesisId: 'B1',
                    location: 'src/components/utils/ThemeDebugProbe.tsx:probeArticleStyles',
                    message: 'Article theme computed styles (client probe) error',
                    data: { attempt, reason, path: pathname, error: String(e) },
                    timestamp: Date.now(),
                });
            }
        };

        probeArticleStyles(1, 'route');
        requestAnimationFrame(() => probeArticleStyles(2, 'raf'));

        // data-theme / data-theme-mode が切り替わった瞬間に再計測して、ダーク適用の証拠を残す
        const html = document.documentElement;
        const observer = new MutationObserver((mutations) => {
            const relevant = mutations.some((m) => m.type === 'attributes' && (m.attributeName === 'data-theme' || m.attributeName === 'data-theme-mode'));
            if (!relevant) return;
            send({
                sessionId: 'debug-session',
                runId: 'pre-fix',
                hypothesisId: 'B1',
                location: 'src/components/utils/ThemeDebugProbe.tsx:themeObserver',
                message: 'Theme dataset changed (observer)',
                data: {
                    probeVersion: 'tw-prose-vars-v1',
                    path: pathname,
                    htmlDataset: {
                        theme: html.dataset.theme,
                        themeMode: html.dataset.themeMode,
                    },
                    cssVars: readThemeVars(),
                },
                timestamp: Date.now(),
            });

            // #region agent log
            // テーマ切替"直後"のヘッダー実測（ユーザー見た目とログを突き合わせる）
            // requestAnimationFrame で遅延実行して、CSS再計算を待つ
            send({
                sessionId: 'debug-session',
                runId: 'pre-fix',
                hypothesisId: 'H18',
                location: 'src/components/utils/ThemeDebugProbe.tsx:headerProbeOnThemeChange',
                message: 'Header probe scheduled (theme-change)',
                data: { path: pathname, htmlDataset: { theme: html.dataset.theme, themeMode: html.dataset.themeMode } },
                timestamp: Date.now(),
            });
            requestAnimationFrame(() => {
                try {
                    const headerEl = document.querySelector('header') as HTMLElement | null;
                    send({
                        sessionId: 'debug-session',
                        runId: 'pre-fix',
                        hypothesisId: 'H18',
                        location: 'src/components/utils/ThemeDebugProbe.tsx:headerProbeOnThemeChange',
                        message: 'Header computed styles + css vars (theme-change)',
                        data: {
                            version: 'header-probe-v2',
                            path: pathname,
                            htmlDataset: {
                                theme: html.dataset.theme,
                                themeMode: html.dataset.themeMode,
                            },
                            cssVars: readThemeVars(),
                            header: headerEl
                                ? {
                                    className: headerEl.className ?? null,
                                    bg: getComputedStyle(headerEl).backgroundColor,
                                    color: getComputedStyle(headerEl).color,
                                    borderColor: getComputedStyle(headerEl).borderColor,
                                }
                                : null,
                            headersCount: document.querySelectorAll('header').length,
                            elementAtHeaderCenter: (() => {
                                if (!headerEl) return null;
                                const r = headerEl.getBoundingClientRect();
                                const x = Math.max(0, Math.min(window.innerWidth - 1, Math.floor(r.left + r.width / 2)));
                                const y = Math.max(0, Math.min(window.innerHeight - 1, Math.floor(r.top + Math.min(r.height / 2, 10))));
                                const el = document.elementFromPoint(x, y) as HTMLElement | null;
                                if (!el) return null;
                                const cs = getComputedStyle(el);
                                return {
                                    tag: el.tagName,
                                    className: el.className ?? null,
                                    position: cs.position,
                                    zIndex: cs.zIndex,
                                    bg: cs.backgroundColor,
                                    color: cs.color,
                                };
                            })(),
                        },
                        timestamp: Date.now(),
                    });
                } catch (e) {
                    send({
                        sessionId: 'debug-session',
                        runId: 'pre-fix',
                        hypothesisId: 'H18',
                        location: 'src/components/utils/ThemeDebugProbe.tsx:headerProbeOnThemeChange',
                        message: 'Header probe error (theme-change)',
                        data: { error: String(e), path: pathname },
                        timestamp: Date.now(),
                    });
                }
            });
            // #endregion agent log

            probeArticleStyles(3, 'theme-change');
        });
        observer.observe(html, { attributes: true, attributeFilter: ['data-theme', 'data-theme-mode'] });
        return () => observer.disconnect();
        // #endregion agent log
    }, [pathname]);

    return null;
}


