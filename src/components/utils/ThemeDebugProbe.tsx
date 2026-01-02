"use client";

import { useEffect } from 'react';

export function ThemeDebugProbe() {
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
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H1', location: 'src/components/utils/ThemeDebugProbe.tsx:useEffect', message: 'Theme probe on mount', data: { hasThemeScript: !!scriptEl, themeScriptTag: scriptEl?.tagName ?? null, htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode }, storedRaw: mode, bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H1', location: 'src/components/utils/ThemeDebugProbe.tsx:useEffect', message: 'Theme probe on mount (fallback)', data: { hasThemeScript: !!scriptEl, themeScriptTag: scriptEl?.tagName ?? null, htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode }, storedRaw: mode, bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color }, timestamp: Date.now() }) }).catch(() => { }));
        // #endregion agent log

        // ブラウザ側で /favicon.ico が本当に 500 を返しているかを確定する（サーバーログと突き合わせる）
        // #region agent log
        fetch('/favicon.ico', { cache: 'no-store' })
            .then((res) => {
                fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H8', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon', message: 'favicon fetch result', data: { status: res.status, ok: res.ok, contentType: res.headers.get('content-type'), url: res.url, iconLinks: Array.from(document.querySelectorAll('link[rel~=\"icon\"]')).map((el) => ({ rel: el.getAttribute('rel'), href: (el as HTMLLinkElement).href, type: el.getAttribute('type') })) }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H8', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon', message: 'favicon fetch result (fallback)', data: { status: res.status, ok: res.ok, contentType: res.headers.get('content-type'), url: res.url }, timestamp: Date.now() }) }).catch(() => { }));
            })
            .catch((e) => {
                fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H8', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon', message: 'favicon fetch error', data: { error: String(e) }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H8', location: 'src/components/utils/ThemeDebugProbe.tsx:favicon', message: 'favicon fetch error (fallback)', data: { error: String(e) }, timestamp: Date.now() }) }).catch(() => { }));
            });
        // #endregion agent log
    }, []);

    return null;
}


