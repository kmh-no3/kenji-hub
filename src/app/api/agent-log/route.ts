import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const text = await req.text();
        let body: any = null;
        try {
            body = JSON.parse(text);
        } catch {
            body = { raw: text };
        }

        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: 'debug-session',
                runId: 'pre-fix',
                hypothesisId: 'LOG',
                location: 'src/app/api/agent-log/route.ts:POST',
                message: 'agent-log route received',
                data: {
                    hasRunId: typeof body?.runId === 'string',
                    runId: body?.runId ?? null,
                    hypothesisId: body?.hypothesisId ?? null,
                    location: body?.location ?? null,
                    contentType: req.headers.get('content-type'),
                },
                timestamp: Date.now(),
            }),
        }).catch(() => { });
        // #endregion agent log

        // サーバー側から ingest に転送（同一オリジン経由のフォールバック用）
        await fetch('http://127.0.0.1:7243/ingest/764ba7da-3ef9-4f32-8544-b52f5084563d', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch {
        // 失敗してもアプリの動作は止めない
    }
    return new NextResponse(null, { status: 204 });
}


