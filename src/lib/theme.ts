export type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'kenji-hub-theme';

export function normalizeThemeMode(value: unknown): ThemeMode {
    return value === 'light' || value === 'dark' || value === 'system' ? value : 'system';
}

export function getStoredThemeMode(): ThemeMode {
    if (typeof window === 'undefined') return 'system';
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return 'system';
    try {
        const parsed = normalizeThemeMode(JSON.parse(raw));
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:getStoredThemeMode', message: 'getStoredThemeMode parsed', data: { raw, parsed }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:getStoredThemeMode', message: 'getStoredThemeMode parsed (fallback)', data: { raw, parsed }, timestamp: Date.now() }) }).catch(() => { }));
        // #endregion agent log
        return parsed;
    } catch {
        const normalized = normalizeThemeMode(raw);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:getStoredThemeMode', message: 'getStoredThemeMode fallback normalize', data: { raw, normalized }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:getStoredThemeMode', message: 'getStoredThemeMode fallback normalize (fallback)', data: { raw, normalized }, timestamp: Date.now() }) }).catch(() => { }));
        // #endregion agent log
        return normalized;
    }
}

export function setStoredThemeMode(mode: ThemeMode) {
    if (typeof window === 'undefined') return;
    try {
        const value = JSON.stringify(mode);
        window.localStorage.setItem(STORAGE_KEY, value);
        const readback = window.localStorage.getItem(STORAGE_KEY);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:setStoredThemeMode', message: 'setStoredThemeMode wrote', data: { mode, value, readback }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:setStoredThemeMode', message: 'setStoredThemeMode wrote (fallback)', data: { mode, value, readback }, timestamp: Date.now() }) }).catch(() => { }));
        // #endregion agent log
    } catch (e) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:setStoredThemeMode', message: 'setStoredThemeMode error', data: { mode, error: String(e) }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H6', location: 'src/lib/theme.ts:setStoredThemeMode', message: 'setStoredThemeMode error (fallback)', data: { mode, error: String(e) }, timestamp: Date.now() }) }).catch(() => { }));
        // #endregion agent log
    }
}

export function getSystemTheme(): Exclude<ThemeMode, 'system'> {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light';
}

export function getEffectiveTheme(mode: ThemeMode): Exclude<ThemeMode, 'system'> {
    return mode === 'system' ? getSystemTheme() : mode;
}

export function applyThemeMode(mode: ThemeMode) {
    if (typeof document === 'undefined') return;
    const effective = getEffectiveTheme(mode);
    document.documentElement.dataset.theme = effective;
    document.documentElement.dataset.themeMode = mode;

    // #region agent log
    fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H3', location: 'src/lib/theme.ts:applyThemeMode', message: 'applyThemeMode set dataset', data: { mode: mode, effective: effective, htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode }, bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color }, timestamp: Date.now() }) }).catch(() => fetch('/api/agent-log', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: 'debug-session', runId: 'pre-fix', hypothesisId: 'H3', location: 'src/lib/theme.ts:applyThemeMode', message: 'applyThemeMode set dataset (fallback)', data: { mode: mode, effective: effective, htmlDataset: { theme: document.documentElement.dataset.theme, themeMode: document.documentElement.dataset.themeMode }, bodyBg: getComputedStyle(document.body).backgroundColor, bodyColor: getComputedStyle(document.body).color }, timestamp: Date.now() }) }).catch(() => { }));
    // #endregion agent log
}


