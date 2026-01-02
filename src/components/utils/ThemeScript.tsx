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

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1',location:'ThemeScript.tsx:INLINE',message:'ThemeScript applied initial theme',data:{raw:raw,mode:mode,effective:effective,prefersDark:!!prefersDark},timestamp:Date.now()})}).catch(function(){return fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H1',location:'ThemeScript.tsx:INLINE',message:'ThemeScript applied initial theme (fallback)',data:{raw:raw,mode:mode,effective:effective,prefersDark:!!prefersDark},timestamp:Date.now()})}).catch(function(){});});
      // #endregion agent log
    } catch (e) {
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2',location:'ThemeScript.tsx:INLINE',message:'ThemeScript error',data:{error:String(e)},timestamp:Date.now()})}).catch(function(){return fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'pre-fix',hypothesisId:'H2',location:'ThemeScript.tsx:INLINE',message:'ThemeScript error (fallback)',data:{error:String(e)},timestamp:Date.now()})}).catch(function(){});});
      // #endregion agent log
    }
  })();
  `;

    return <Script id="theme-script" strategy="beforeInteractive">{code}</Script>;
}


