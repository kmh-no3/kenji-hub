import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    // middleware 内部の自己送信（/api/agent-log への fetch）が再帰しないようにする
    if (req.headers.get('x-agent-log') === '1') {
        return NextResponse.next();
    }

    const shouldLog =
        path === '/projects' ||
        path === '/projects/' ||
        path === '/blog' ||
        path === '/blog/' ||
        path === '/api/build-info' ||
        path === '/api/build-info/' ||
        path === '/api/pixel' ||
        path === '/api/pixel/' ||
        path === '/favicon.ico' ||
        // /api/agent-log 自体はログ送信先なので、ここでは対象にするが、実送信は除外する
        path.startsWith('/api/agent-log') ||
        // ブラウザがJS/CSSを取得できているかを切り分ける（ハッシュ付きパスもあるので広めに拾う）
        path.startsWith('/_next/static/chunks/') ||
        path.startsWith('/_next/static/css/') ||
        path.startsWith('/_next/static/media/favicon.ico') ||
        path.startsWith('/_next/static/chunks/main-app') ||
        path.startsWith('/_next/static/chunks/app/layout') ||
        path.startsWith('/_next/static/chunks/app/projects/page') ||
        path.startsWith('/_next/static/chunks/app/blog/page') ||
        path.startsWith('/_next/static/chunks/app/blog/[id]/page');

    if (shouldLog && !path.startsWith('/api/agent-log')) {
        // #region agent log
        // Edge middleware から 127.0.0.1 への直叩きは環境差が出るため、同一オリジンの API 経由で ingest に転送する
        try {
            await fetch(new URL('/api/agent-log', req.nextUrl.origin), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-agent-log': '1' },
                body: JSON.stringify({
                    sessionId: 'debug-session',
                    runId: 'pre-fix',
                    hypothesisId:
                        path === '/favicon.ico'
                            ? 'H8'
                            : path.startsWith('/_next/static/chunks/')
                                ? 'H15'
                                : path.startsWith('/_next/static/css/')
                                    ? 'H15'
                                    : path === '/api/pixel' || path === '/api/pixel/'
                                        ? 'H16'
                                        : 'H5',
                    location: 'middleware.ts:middleware',
                    message: 'Request observed',
                    data: {
                        path,
                        method: req.method,
                        hasUserAgent: !!req.headers.get('user-agent'),
                        hasReferer: !!req.headers.get('referer'),
                    },
                    timestamp: Date.now(),
                }),
            });
        } catch {
            // 失敗してもアプリの動作は止めない
        }
        // #endregion agent log
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/image).*)'],
};


