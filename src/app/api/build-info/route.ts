import { NextResponse } from 'next/server';

const BUILD_MARKER = 'hardcoded-probe-v4';
const UI_MARKER = 'h17-rid-v1';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const ua = req.headers.get('user-agent');

    // #region agent log
    if (typeof window !== 'undefined' || process.env.NODE_ENV !== 'production') {
        const payload = {
            sessionId: 'debug-session',
            runId: 'pre-fix',
            hypothesisId: 'H13',
            location: 'src/app/api/build-info/route.ts:GET',
            message: 'build-info hit',
            data: {
                buildMarker: BUILD_MARKER,
                uiMarker: UI_MARKER,
                url: url.toString(),
                hasUserAgent: !!ua,
            },
            timestamp: Date.now(),
        };

        // 直 ingest（動けばベスト）
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).catch(() => { });

        // 同一オリジン経由（debug.log へ確実に残す）
        fetch(new URL('/api/agent-log', url.origin), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-agent-log': '1' },
            body: JSON.stringify(payload),
        }).catch(() => { });
    }
    // #endregion agent log

    return NextResponse.json({ buildMarker: BUILD_MARKER, uiMarker: UI_MARKER, timestamp: Date.now() });
}


