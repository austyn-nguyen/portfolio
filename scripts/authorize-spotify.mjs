import http from 'node:http';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import dotenv from 'dotenv';

export const REDIRECT_URI = 'http://127.0.0.1:53683/callback';
const ROOT = fileURLToPath(new URL('../', import.meta.url));

// A local-only callback, never exposed as a login or token endpoint on the website.
export function createSpotifyAuthorization({ clientId, clientSecret, envFile, request = fetch, onComplete = () => {} }) {
  const state = randomBytes(32).toString('hex');
  const authorization = new URL('https://accounts.spotify.com/authorize');
  authorization.search = new URLSearchParams({
    client_id: clientId, response_type: 'code', redirect_uri: REDIRECT_URI,
    scope: 'user-top-read', state, show_dialog: 'true',
  });
  let exchanging = false;
  let completed = false;

  async function handleCallback(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Referrer-Policy', 'no-referrer');
    const url = new URL(req.url, REDIRECT_URI);
    if (url.pathname !== '/callback') { res.writeHead(404).end('Not found.'); return; }
    if (req.method !== 'GET') { res.writeHead(405, { Allow: 'GET' }).end('Method not allowed.'); return; }
    const receivedState = Buffer.from(url.searchParams.get('state') ?? '');
    const expectedState = Buffer.from(state);
    if (receivedState.length !== expectedState.length || !timingSafeEqual(receivedState, expectedState)) {
      res.writeHead(403).end('Invalid authorization state. Use the URL from the terminal.'); return;
    }
    if (exchanging || completed) { res.writeHead(409).end('This authorization callback has already been used.'); return; }
    if (url.searchParams.has('error') || !url.searchParams.get('code')) {
      res.writeHead(400).end('Spotify authorization was not completed. Run npm run spotify:authorize to try again.');
      completed = true; onComplete(new Error('Authorization declined.')); return;
    }
    exchanging = true;
    try {
      const result = await request('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ grant_type: 'authorization_code', code: url.searchParams.get('code'), redirect_uri: REDIRECT_URI }),
        signal: AbortSignal.timeout(15000),
      });
      if (!result.ok) throw new Error('Token exchange failed.');
      const tokens = await result.json();
      if (typeof tokens.refresh_token !== 'string' || !tokens.refresh_token || /[\r\n]/.test(tokens.refresh_token)) throw new Error('No valid refresh token returned.');
      if (!tokens.scope?.split(' ').includes('user-top-read')) throw new Error('Missing listening permission.');
      const updates = { SPOTIFY_REFRESH_TOKEN: tokens.refresh_token };

      // Basic profile data needs no extra permission; failure doesn't block connection.
      if (typeof tokens.access_token === 'string' && tokens.access_token) {
        try {
          const profileResponse = await request('https://api.spotify.com/v1/me', {
            headers: { Authorization: `Bearer ${tokens.access_token}` }, signal: AbortSignal.timeout(10000),
          });
          if (profileResponse.ok) {
            const profile = await profileResponse.json();
            if (typeof profile.id === 'string' && profile.id) updates.SPOTIFY_PROFILE_URL = `https://open.spotify.com/user/${encodeURIComponent(profile.id)}`;
          }
        } catch { /* The owner can add SPOTIFY_PROFILE_URL manually. */ }
      }
      let contents;
      try { contents = await fs.readFile(envFile, 'utf8'); }
      catch (error) { if (error.code !== 'ENOENT') throw error; contents = ''; }
      for (const [key, value] of Object.entries(updates)) {
        contents = contents.replace(new RegExp(`^(?:export\\s+)?${key}\\s*=.*(?:\\r?\\n|$)`, 'gm'), '').trimEnd();
        contents += `\n${key}=${JSON.stringify(value)}\n`;
      }
      await fs.writeFile(envFile, contents, { mode: 0o600 });
      await fs.chmod(envFile, 0o600);
      res.writeHead(200).end('Spotify connected. Your listening section is ready. You can close this tab.');
      completed = true;
      onComplete();
    } catch {
      res.writeHead(500).end('Spotify authorization failed. Check the app settings and run npm run spotify:authorize again.');
      completed = true;
      onComplete(new Error('Spotify authorization failed. Check the app settings and try again.'));
    } finally { exchanging = false; }
  }
  return { authorizationUrl: authorization.href, handleCallback };
}

function main() {
  const envFile = path.join(ROOT, '.env.local');
  dotenv.config({ path: envFile, quiet: true });
  const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env;
  if (!clientId || !clientSecret) {
    console.error('Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local first. See docs/spotify-listening.md.');
    process.exitCode = 1;
    return;
  }
  let timeout;
  const session = createSpotifyAuthorization({ clientId, clientSecret, envFile, onComplete: (error) => {
    clearTimeout(timeout);
    server.close();
    if (error) { console.error(error.message); process.exitCode = 1; }
    else console.log('Spotify connected. Refresh token saved to .env.local; no credentials were printed. Restart the dev server. Add the Spotify variables to Vercel and redeploy to connect the live site.');
  } });
  const server = http.createServer(session.handleCallback);
  timeout = setTimeout(() => {
    console.error('Authorization timed out. Run npm run spotify:authorize again.');
    server.close(); process.exitCode = 1;
  }, 5 * 60 * 1000);
  server.on('error', () => {
    clearTimeout(timeout);
    console.error('Cannot open the local Spotify callback server on 127.0.0.1:53683.'); process.exitCode = 1;
  });
  server.listen(53683, '127.0.0.1', () => console.log(`Open this URL in your browser and authorize your own Spotify account:\n${session.authorizationUrl}`));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
