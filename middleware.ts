import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const shouldLog =
        path === '/projects' ||
        path === '/projects/' ||
        path === '/blog' ||
        path === '/blog/' ||
        path === '/favicon.ico' ||
        path.startsWith('/api/agent-log') ||
        path.startsWith('/_next/static/media/favicon.ico') ||
        path.startsWith('/_next/static/chunks/main-app') ||
        path.startsWith('/_next/static/chunks/app/layout') ||
        path.startsWith('/_next/static/chunks/app/projects/page') ||
        path.startsWith('/_next/static/chunks/app/blog/page') ||
        path.startsWith('/_next/static/chunks/app/blog/[id]/page');

    if (shouldLog) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: 'debug-session',
                runId: 'pre-fix',
                hypothesisId: path === '/favicon.ico' ? 'H8' : 'H5',
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
        }).catch(() => { });
        // #endregion agent log
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/image).*)'],
};


