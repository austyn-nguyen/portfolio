import http from 'node:http';
import { randomBytes } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import dotenv from 'dotenv';
import { ROOT } from './sync-dropbox.mjs';

dotenv.config({ path: path.join(ROOT, '.env.local'), quiet: true });
const { DROPBOX_APP_KEY: key, DROPBOX_APP_SECRET: secret } = process.env;
if (!key || !secret) {
  console.error('Add DROPBOX_APP_KEY and DROPBOX_APP_SECRET to .env.local first. See docs/dropbox-photos.md.');
  process.exitCode = 1;
} else {
  const redirect = 'http://localhost:53682/callback';
  const state = randomBytes(24).toString('hex');
  const authorization = new URL('https://www.dropbox.com/oauth2/authorize');
  authorization.search = new URLSearchParams({ client_id: key, response_type: 'code', token_access_type: 'offline', redirect_uri: redirect, state, scope: 'files.metadata.read files.content.read' });
  const server = http.createServer(async (request, response) => {
    const url = new URL(request.url, redirect);
    if (url.pathname !== '/callback') { response.writeHead(404).end(); return; }
    if (url.searchParams.get('state') !== state) { response.writeHead(403).end('Invalid authorization state.'); return; }
    try {
      const code = url.searchParams.get('code');
      if (!code) throw new Error('Authorization declined');
      const result = await fetch('https://api.dropboxapi.com/oauth2/token', {
        method: 'POST', body: new URLSearchParams({ code, grant_type: 'authorization_code', redirect_uri: redirect, client_id: key, client_secret: secret }),
        signal: AbortSignal.timeout(15000),
      });
      if (!result.ok) throw new Error('Token exchange failed');
      const token = (await result.json()).refresh_token;
      if (typeof token !== 'string' || !token || /[\r\n]/.test(token)) throw new Error('No refresh token returned');
      const file = path.join(ROOT, '.env.local');
      const contents = (await fs.readFile(file, 'utf8')).replace(/^DROPBOX_REFRESH_TOKEN=.*\r?\n?/gm, '').trimEnd();
      await fs.writeFile(file, `${contents}\nDROPBOX_REFRESH_TOKEN=${token}\n`, { mode: 0o600 });
      await fs.chmod(file, 0o600);
      response.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' }).end('Dropbox connected. You can close this tab.');
      console.log('Refresh token saved to .env.local. No credentials were printed.');
    } catch { response.writeHead(500).end('Authorization failed. Return to the terminal and try again.'); console.error('Dropbox authorization failed. Check the app settings and try again.'); process.exitCode = 1; }
    finally { server.close(); clearTimeout(timeout); }
  });
  const timeout = setTimeout(() => { console.error('Authorization timed out. Run photos:authorize again.'); server.close(); process.exitCode = 1; }, 5 * 60 * 1000);
  server.on('error', () => { clearTimeout(timeout); console.error('Cannot open the local callback server on port 53682.'); process.exitCode = 1; });
  server.listen(53682, 'localhost', () => console.log(`Open this URL in Brave and authorize your Dropbox app:\n${authorization}`));
}
