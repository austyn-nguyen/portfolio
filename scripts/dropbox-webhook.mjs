import { createHmac, timingSafeEqual } from 'node:crypto';

// Small, testable handler: acknowledge quickly; GitHub does the image processing.
export function webhookHandlers({ env = process.env, fetchImpl = fetch } = {}) {
  return {
    async GET(request) {
      const challenge = new URL(request.url).searchParams.get('challenge');
      if (!challenge || challenge.length > 1024 || !/^[a-zA-Z0-9_-]+$/.test(challenge)) return new Response('Invalid challenge', { status: 400 });
      return new Response(challenge, { headers: { 'Content-Type': 'text/plain', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store' } });
    },
    async POST(request) {
      if (!env.DROPBOX_APP_SECRET || !env.GITHUB_SYNC_TOKEN) return new Response('Sync is not configured', { status: 503 });
      const signature = request.headers.get('x-dropbox-signature') || '';
      if (!/^[a-f0-9]{64}$/i.test(signature)) return new Response('Invalid signature', { status: 403 });
      if (Number(request.headers.get('content-length')) > 65536) return new Response('Payload too large', { status: 413 });
      const body = Buffer.from(await request.arrayBuffer());
      if (body.length > 65536) return new Response('Payload too large', { status: 413 });
      const expected = createHmac('sha256', env.DROPBOX_APP_SECRET).update(body).digest();
      if (!timingSafeEqual(Buffer.from(signature, 'hex'), expected)) return new Response('Invalid signature', { status: 403 });
      let payload;
      try { payload = JSON.parse(body.toString('utf8')); } catch { return new Response('Invalid JSON', { status: 400 }); }
      const accounts = payload?.list_folder?.accounts;
      if (!Array.isArray(accounts) || !accounts.every(account => typeof account === 'string')) return new Response('Invalid notification', { status: 400 });
      if (!accounts.length || (env.DROPBOX_ACCOUNT_ID && !accounts.includes(env.DROPBOX_ACCOUNT_ID))) return new Response(null, { status: 200 });
      const repo = env.GITHUB_SYNC_REPOSITORY || 'austyn-nguyen/portfolio';
      if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) return new Response('Sync is not configured', { status: 503 });
      try {
        const response = await fetchImpl(`https://api.github.com/repos/${repo}/dispatches`, {
          method: 'POST', signal: AbortSignal.timeout(5000),
          headers: { Authorization: `Bearer ${env.GITHUB_SYNC_TOKEN}`, Accept: 'application/vnd.github+json', 'Content-Type': 'application/json', 'X-GitHub-Api-Version': '2022-11-28' },
          body: JSON.stringify({ event_type: 'dropbox-photos-changed' }),
        });
        if (!response.ok) return new Response('Could not queue sync', { status: 503 });
        return new Response(null, { status: 200 });
      } catch { return new Response('Could not queue sync', { status: 503 }); }
    },
  };
}
