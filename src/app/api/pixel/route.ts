import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const ua = req.headers.get('user-agent');
    const ref = req.headers.get('referer');

    const payload = {
        sessionId: 'debug-session',
        runId: 'pre-fix',
        hypothesisId: 'H16',
        location: 'src/app/api/pixel/route.ts:GET',
        message: 'pixel hit',
        data: {
            url: url.toString(),
            hasUserAgent: !!ua,
            from: url.searchParams.get('from'),
            rid: url.searchParams.get('rid'),
            uaShort: ua ? ua.slice(0, 80) : null,
            hasReferer: !!ref,
        },
        timestamp: Date.now(),
    };

    // #region agent log
    fetch(new URL('/api/agent-log', url.origin), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-agent-log': '1' },
        body: JSON.stringify(payload),
    }).catch(() => { });
    // #endregion agent log

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect width="1" height="1" fill="transparent"/></svg>`;
    return new NextResponse(svg, {
        headers: {
            'Content-Type': 'image/svg+xml; charset=utf-8',
            'Cache-Control': 'no-store',
        },
    });
}


