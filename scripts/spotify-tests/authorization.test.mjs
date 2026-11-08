import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import dotenv from 'dotenv';
import { createSpotifyAuthorization, REDIRECT_URI } from '../authorize-spotify.mjs';

function response() {
  return {
    headers: {}, status: null, body: '',
    setHeader(key, value) { this.headers[key] = value; },
    writeHead(status) { this.status = status; return this; },
    end(body = '') { this.body = body; },
  };
}
function callback(session, params = {}) {
  const state = new URL(session.authorizationUrl).searchParams.get('state');
  return { method: 'GET', url: `/callback?${new URLSearchParams({ state, code: 'one-use-code', ...params })}` };
}
async function envFixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-spotify-test-'));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const envFile = path.join(root, '.env.local');
  const original = '# Existing settings\nDROPBOX_REFRESH_TOKEN=leave-this-alone\nSPOTIFY_CLIENT_ID=test-client\nSPOTIFY_CLIENT_SECRET=test-secret\nSPOTIFY_REFRESH_TOKEN=old-token\n';
  await fs.writeFile(envFile, original);
  return { envFile, original };
}

test('authorization requests only read access, uses loopback, and rejects absent or invalid state', async () => {
  let calls = 0;
  const session = createSpotifyAuthorization({ clientId: 'client', clientSecret: 'secret', request: async () => { calls++; } });
  const authorization = new URL(session.authorizationUrl);
  assert.equal(authorization.searchParams.get('scope'), 'user-top-read');
  assert.equal(authorization.searchParams.get('redirect_uri'), REDIRECT_URI);
  assert.equal(new URL(REDIRECT_URI).hostname, '127.0.0.1');
  assert.ok(!session.authorizationUrl.includes('secret'));
  for (const state of ['', 'wrong-state']) {
    const res = response();
    await session.handleCallback(callback(session, { state }), res);
    assert.equal(res.status, 403);
    assert.equal(res.headers['Cache-Control'], 'no-store');
  }
  assert.equal(calls, 0);
});

test('successful callback saves credentials privately, preserves other settings, and rejects replay', async (t) => {
  const { envFile } = await envFixture(t);
  let completion = 0;
  const calls = [];
  const session = createSpotifyAuthorization({ clientId: 'client', clientSecret: 'secret', envFile, onComplete(error) { assert.equal(error, undefined); completion++; }, request: async (url, options) => {
    calls.push({ url, options });
    return Response.json(url.includes('/api/token') ? { refresh_token: 'new-private-refresh', access_token: 'new-private-access', scope: 'user-top-read' } : { id: 'my-profile' });
  } });
  const res = response();
  await session.handleCallback(callback(session), res);
  assert.equal(res.status, 200);
  assert.equal(completion, 1);
  assert.ok(!res.body.includes('new-private-refresh'));
  assert.ok(!res.body.includes('new-private-access'));
  assert.equal(calls[0].options.body.get('redirect_uri'), REDIRECT_URI);
  assert.equal(calls[0].options.body.get('code'), 'one-use-code');
  const contents = await fs.readFile(envFile, 'utf8');
  const values = dotenv.parse(contents);
  assert.equal(values.SPOTIFY_REFRESH_TOKEN, 'new-private-refresh');
  assert.equal(values.DROPBOX_REFRESH_TOKEN, 'leave-this-alone');
  assert.equal(values.SPOTIFY_CLIENT_SECRET, 'test-secret');
  assert.equal(values.SPOTIFY_PROFILE_URL, 'https://open.spotify.com/user/my-profile');
  assert.equal((contents.match(/SPOTIFY_REFRESH_TOKEN=/g) ?? []).length, 1);
  assert.equal((await fs.stat(envFile)).mode & 0o777, 0o600);
  const replay = response();
  await session.handleCallback(callback(session), replay);
  assert.equal(replay.status, 409);
  assert.equal(calls.length, 2);
});

test('denial, token exchange failures, and missing scopes preserve existing credentials', async (t) => {
  const { envFile, original } = await envFixture(t);
  for (const failure of ['denied', 'token-failed', 'missing-scope']) {
    let completionError;
    let calls = 0;
    const session = createSpotifyAuthorization({ clientId: 'client', clientSecret: 'secret', envFile, onComplete(error) { completionError = error; }, request: async () => {
      calls++;
      return failure === 'token-failed' ? Response.json({ error: 'secret-provider-error' }, { status: 400 }) : Response.json({ refresh_token: 'private-token', scope: 'different-scope' });
    } });
    const res = response();
    await session.handleCallback(callback(session, failure === 'denied' ? { error: 'access_denied', code: '' } : {}), res);
    assert.equal(res.status, failure === 'denied' ? 400 : 500);
    assert.ok(completionError instanceof Error);
    assert.equal(calls, failure === 'denied' ? 0 : 1);
    assert.equal(await fs.readFile(envFile, 'utf8'), original);
    assert.ok(!res.body.includes('private-token'));
    assert.ok(!res.body.includes('secret-provider-error'));
  }
});

test('profile lookup failure still saves the refresh token and keeps an existing profile link', async (t) => {
  const { envFile } = await envFixture(t);
  await fs.appendFile(envFile, 'SPOTIFY_PROFILE_URL=https://open.spotify.com/user/existing\n');
  const session = createSpotifyAuthorization({ clientId: 'client', clientSecret: 'secret', envFile, request: async (url) => url.includes('/api/token') ? Response.json({ refresh_token: 'new-token', access_token: 'access', scope: 'user-top-read' }) : Response.json({}, { status: 403 }) });
  const res = response();
  await session.handleCallback(callback(session), res);
  assert.equal(res.status, 200);
  const values = dotenv.parse(await fs.readFile(envFile, 'utf8'));
  assert.equal(values.SPOTIFY_REFRESH_TOKEN, 'new-token');
  assert.equal(values.SPOTIFY_PROFILE_URL, 'https://open.spotify.com/user/existing');
});
