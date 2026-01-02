import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    // #region agent log
    if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'production') {
        try {
            await fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: 'debug-session',
                    runId: 'pre-fix',
                    hypothesisId: 'PING_UI',
                    location: 'src/app/api/debug-ping/route.ts:GET',
                    message: 'debug ping hit',
                    data: {
                        url: req.url,
                        ua: req.headers.get('user-agent') ? 'present' : 'missing',
                    },
                    timestamp: Date.now(),
                }),
            });
        } catch {
            // ignore
        }
    }
    // #endregion agent log

    return NextResponse.json({
        ok: true,
        now: Date.now(),
    });
}


