import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchSpotifyListening, spotifyProfileUrl, SpotifyApiError } from '../../src/lib/spotify.ts';

const credentials = { clientId: 'test-client', clientSecret: 'test-secret', refreshToken: 'test-refresh', profileUrl: 'https://open.spotify.com/user/test-owner?si=tracking' };
const track = (id = '1234567890123456789012', overrides = {}) => ({
  id, name: 'A song', artists: [{ name: 'First artist' }, { name: 'Second artist' }],
  album: { name: 'An album', images: [{ url: 'https://i.scdn.co/image/test-cover' }] },
  explicit: true, ...overrides,
});

test('refreshes credentials on the server and returns only short-term public listening data', async () => {
  const calls = [];
  const request = async (url, options) => {
    calls.push({ url, options });
    return Response.json(calls.length === 1 ? { access_token: 'private-access-token', refresh_token: 'private-rotated-token' } : { items: [track()] });
  };
  const data = await fetchSpotifyListening(credentials, request);
  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, 'https://accounts.spotify.com/api/token');
  assert.equal(calls[0].options.body.get('grant_type'), 'refresh_token');
  assert.equal(calls[0].options.body.get('refresh_token'), credentials.refreshToken);
  assert.equal(calls[0].options.headers.Authorization, `Basic ${Buffer.from('test-client:test-secret').toString('base64')}`);
  assert.equal(calls[0].options.cache, 'no-store');
  assert.equal(calls[1].options.headers.Authorization, 'Bearer private-access-token');
  const query = new URL(calls[1].url).searchParams;
  assert.equal(query.get('time_range'), 'short_term');
  assert.equal(query.get('limit'), '8');
  assert.equal(data.status, 'ready');
  assert.equal(data.profileUrl, 'https://open.spotify.com/user/test-owner');
  assert.deepEqual(data.tracks[0], {
    id: '1234567890123456789012', name: 'A song', artists: 'First artist, Second artist', album: 'An album',
    artwork: 'https://i.scdn.co/image/test-cover', url: 'https://open.spotify.com/track/1234567890123456789012', explicit: true,
  });
  for (const secret of ['test-secret', 'test-refresh', 'private-access-token', 'private-rotated-token']) assert.ok(!JSON.stringify(data).includes(secret));
});

test('handles missing artwork, local tracks, invalid entries, duplicate tracks, and empty history', async () => {
  const items = [null, {}, track('bad-id'), track('1234567890123456789012', { is_local: true }), track('1234567890123456789012', { artists: [] }),
    track('abcdefghijklmnopqrstuv', { album: null }), track('abcdefghijklmnopqrstuv'),
    track('ABCDEFGHIJKLMNOPQRSTUV', { album: { images: [{ url: 'https://untrusted.example/image' }, null] } }),
  ];
  const request = async (url) => Response.json(url.includes('/api/token') ? { access_token: 'access' } : { items });
  const data = await fetchSpotifyListening(credentials, request);
  assert.equal(data.tracks.length, 2);
  assert.equal(data.tracks[0].artwork, null);
  assert.equal(data.tracks[1].artwork, null);
  const empty = await fetchSpotifyListening(credentials, async (url) => Response.json(url.includes('/api/token') ? { access_token: 'access' } : { items: [] }));
  assert.equal(empty.status, 'empty');
  assert.deepEqual(empty.tracks, []);
});

test('token rejection stops requests and upstream failures never expose error bodies', async () => {
  let calls = 0;
  await assert.rejects(fetchSpotifyListening(credentials, async () => {
    calls++;
    return Response.json({ error: 'secret-provider-details' }, { status: 401 });
  }), (error) => error instanceof SpotifyApiError && error.status === 401 && !error.message.includes('secret-provider-details'));
  assert.equal(calls, 1);
  for (const status of [403, 429, 500]) {
    await assert.rejects(fetchSpotifyListening(credentials, async (url) => url.includes('/api/token') ? Response.json({ access_token: 'access' }) : Response.json({ error: 'provider-details' }, { status })), (error) => error.status === status && !error.message.includes('provider-details'));
  }
});

test('invalid Spotify responses are rejected rather than mistaken for an empty rotation', async () => {
  await assert.rejects(fetchSpotifyListening(credentials, async () => Response.json({})), (error) => error.status === 502);
  await assert.rejects(fetchSpotifyListening(credentials, async (url) => Response.json(url.includes('/api/token') ? { access_token: 'access' } : { error: 'not-tracks' })), (error) => error.status === 502);
  await assert.rejects(fetchSpotifyListening(credentials, async () => { throw new Error('Network offline'); }), /Network offline/);
});

test('profile links allow only Spotify user profiles and strip tracking parameters', () => {
  assert.equal(spotifyProfileUrl('https://open.spotify.com/user/owner?si=tracking#x'), 'https://open.spotify.com/user/owner');
  for (const value of [undefined, '', 'not a URL', 'javascript:alert(1)', 'http://open.spotify.com/user/owner', 'https://other.example/user/owner', 'https://open.spotify.com/track/song']) assert.equal(spotifyProfileUrl(value), null);
});
