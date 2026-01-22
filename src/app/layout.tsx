import type { Metadata } from 'next';
import './globals.css';
import { GitHubPagesRouter, ThemeDebugProbe } from '@/components/utils';
import { siteConfig } from '@/config/site';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: next/script の beforeInteractive は、環境によっては実行が遅延/失敗した際に
  // 初期テーマ適用（FOUC低減）が効かないことがあるため、ここでは生のインラインscriptで適用する。
  const inlineThemeInit = `
  (function(){
    try{
      var KEY='kenji-hub-theme';
      var raw=null;
      try{ raw=localStorage.getItem(KEY); }catch(e){ raw='localStorage_error'; }
      var mode='system';
      if(raw && raw!=='localStorage_error'){
        try{ mode=JSON.parse(raw); }catch(e){ mode=raw; }
      }
      if(mode!=='light' && mode!=='dark' && mode!=='system') mode='system';
      var prefersDark=!!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var effective=(mode==='system') ? (prefersDark?'dark':'light') : mode;
      document.documentElement.dataset.theme=effective;
      document.documentElement.dataset.themeMode=mode;
    }catch(e){
      // テーマ初期化エラーは無視（デフォルトテーマが適用される）
    }
  })();
  `;

  return (
    <html lang="ja">
      <head>
        <script dangerouslySetInnerHTML={{ __html: inlineThemeInit }} />
      </head>
      <body className="antialiased">
        <GitHubPagesRouter />
        <ThemeDebugProbe />
        <Header />
        {children}
      </body>
    </html>
  );
} 