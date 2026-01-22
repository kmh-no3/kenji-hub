import Script from 'next/script';

/**
 * テーマの初期適用（FOUC低減）
 * - localStorage のユーザー設定（light/dark/system）を読み取り
 * - system の場合は prefers-color-scheme から有効テーマを算出
 * - <html data-theme="light|dark"> を同期的にセット
 */
export function ThemeScript() {
    const code = `
  (function () {
    try {
      var KEY = 'kenji-hub-theme';
      var raw = localStorage.getItem(KEY);
      var mode = 'system';
      if (raw) {
        try { mode = JSON.parse(raw); } catch (e) { mode = raw; }
      }
      if (mode !== 'light' && mode !== 'dark' && mode !== 'system') mode = 'system';
      var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      var effective = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
      document.documentElement.dataset.theme = effective;
      document.documentElement.dataset.themeMode = mode;
    } catch (e) {
      // テーマ初期化エラーは無視
    }
  })();
  `;

    return <Script id="theme-script" strategy="beforeInteractive">{code}</Script>;
}


