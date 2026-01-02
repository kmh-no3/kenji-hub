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
  // そのリクエスト/HTMLレンダリング固有のID（JSなしビーコンとJSありログを突き合わせる）
  const rid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  // NOTE: next/script の beforeInteractive は、環境によっては実行が遅延/失敗した際に
  // 初期テーマ適用（FOUC低減）が効かないことがあるため、ここでは生のインラインscriptで適用する。
  const inlineThemeInit = `
  (function(){
    var RUN='inline-'+Date.now();
    try{
      // #region agent log
      // まず「この script が実行された」証拠を必ず残す（React/hydration に依存しない）
      var ridEl=document.querySelector('meta[name="x-debug-rid"]');
      var RID=ridEl ? (ridEl.getAttribute('content')||null) : null;
      var ENDPOINT='http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d';
      // JSが本当に動いたかを、sendBeacon/fetchに依存せず画像リクエストで証拠化する
      try{
        var img=new Image();
        img.src='/api/pixel?from=inline-js&rid='+encodeURIComponent(RID||'null')+'&t='+Date.now();
      }catch(e0){}
      var bootPayload={sessionId:'debug-session',runId:RUN,hypothesisId:'INLINE_BOOT',location:'src/app/layout.tsx:INLINE_BOOT',message:'inline boot',data:{rid:RID,href:location.href,readyState:document.readyState,hasSendBeacon:!!navigator.sendBeacon,hasFetch:!!window.fetch},timestamp:Date.now()};
      try{
        if(navigator.sendBeacon){
          try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(bootPayload)); }catch(e){}
          navigator.sendBeacon('/api/agent-log', JSON.stringify(bootPayload));
        }else{
          fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(bootPayload)}).catch(function(){});
        }
      }catch(e){}
      // 例外/Promise拒否で hydration 停止していないかを捕捉
      window.addEventListener('error', function(ev){
        try{
          var p={sessionId:'debug-session',runId:RUN,hypothesisId:'INLINE_ERR',location:'src/app/layout.tsx:INLINE_ERR',message:'window error',data:{rid:RID,msg:String(ev.message||''),file:String(ev.filename||''),line:ev.lineno||null,col:ev.colno||null},timestamp:Date.now()};
          if(navigator.sendBeacon){ try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(p)); }catch(e){} }
          fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}).catch(function(){});
        }catch(e2){}
      });
      window.addEventListener('unhandledrejection', function(ev){
        try{
          var p={sessionId:'debug-session',runId:RUN,hypothesisId:'INLINE_REJ',location:'src/app/layout.tsx:INLINE_REJ',message:'unhandledrejection',data:{rid:RID,reason:String(ev.reason||'')},timestamp:Date.now()};
          if(navigator.sendBeacon){ try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(p)); }catch(e){} }
          fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}).catch(function(){});
        }catch(e3){}
      });
      document.addEventListener('DOMContentLoaded', function(){
        try{
          var p={sessionId:'debug-session',runId:RUN,hypothesisId:'INLINE_DOM',location:'src/app/layout.tsx:INLINE_DOM',message:'DOMContentLoaded',data:{rid:RID,href:location.href},timestamp:Date.now()};
          if(navigator.sendBeacon){ try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(p)); }catch(e){} }
          fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}).catch(function(){});
        }catch(e4){}
      }, { once:true });
      window.addEventListener('load', function(){
        try{
          var p={sessionId:'debug-session',runId:RUN,hypothesisId:'INLINE_LOAD',location:'src/app/layout.tsx:INLINE_LOAD',message:'window load',data:{rid:RID,href:location.href},timestamp:Date.now()};
          if(navigator.sendBeacon){ try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(p)); }catch(e){} }
          fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)}).catch(function(){});
        }catch(e5){}
      }, { once:true });
      // #endregion agent log

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
      var payload={sessionId:'debug-session',runId:RUN,hypothesisId:'H1',location:'src/app/layout.tsx:INLINE',message:'inline theme init',data:{rid:RID,raw:raw,mode:mode,effective:effective,prefersDark:prefersDark},timestamp:Date.now()};
      try{
        if(navigator.sendBeacon){
          try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(payload)); }catch(e){}
          navigator.sendBeacon('/api/agent-log', JSON.stringify(payload));
        }else{
          fetch('/api/agent-log',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).catch(function(){});
        }
      }catch(e){}
    }catch(e){
      try{
        var payload2={sessionId:'debug-session',runId:RUN,hypothesisId:'H2',location:'src/app/layout.tsx:INLINE',message:'inline theme init error',data:{rid:RID,error:String(e)},timestamp:Date.now()};
        if(navigator.sendBeacon){
          try{ navigator.sendBeacon(ENDPOINT, JSON.stringify(payload2)); }catch(e0){}
          navigator.sendBeacon('/api/agent-log', JSON.stringify(payload2));
        }
      }catch(e2){}
    }
  })();
  `;

  return (
    <html lang="ja">
      <head>
        <meta name="x-debug-rid" content={rid} />
        <script dangerouslySetInnerHTML={{ __html: inlineThemeInit }} />
      </head>
      <body className="antialiased">
        {/* JS無しでもブラウザ到達を証拠化するビーコン（非表示） */}
        <img
          src={`/api/pixel?from=layout&rid=${rid}`}
          alt=""
          width={1}
          height={1}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
          aria-hidden="true"
        />
        <GitHubPagesRouter />
        <ThemeDebugProbe />
        <Header />
        {children}
      </body>
    </html>
  );
} 