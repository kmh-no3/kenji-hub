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
        return normalizeThemeMode(JSON.parse(raw));
    } catch {
        return normalizeThemeMode(raw);
    }
}

export function setStoredThemeMode(mode: ThemeMode) {
    if (typeof window === 'undefined') return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mode));
    } catch (e) {
        // localStorage エラーは無視
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
}


