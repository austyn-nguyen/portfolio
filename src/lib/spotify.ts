import type { ListeningData, ListeningTrack } from "../types/spotify";

export interface SpotifyCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  profileUrl?: string;
}

export class SpotifyApiError extends Error {
  readonly status: number;

  constructor(status: number) {
    super(`Spotify request failed (${status})`);
    this.status = status;
  }
}

export function spotifyProfileUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.origin !== "https://open.spotify.com" || !/^\/user\/[^/]+\/?$/.test(url.pathname)) return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}

function artworkUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.origin === "https://i.scdn.co" ? url.href : null;
  } catch {
    return null;
  }
}

function normalizeTrack(value: unknown): ListeningTrack | null {
  if (!value || typeof value !== "object") return null;
  const track = value as Record<string, unknown>;
  if (typeof track.id !== "string" || !/^[a-zA-Z0-9]{22}$/.test(track.id) || typeof track.name !== "string" || !track.name || track.is_local) return null;
  const artists = Array.isArray(track.artists) ? track.artists.flatMap((artist) => (
    artist && typeof artist.name === "string" ? [artist.name] : []
  )) : [];
  if (!artists.length) return null;
  const album = track.album && typeof track.album === "object" ? track.album as Record<string, unknown> : {};
  const images = Array.isArray(album.images) ? album.images : [];
  return {
    id: track.id,
    name: track.name,
    artists: artists.join(", "),
    album: typeof album.name === "string" ? album.name : "",
    artwork: images.map((image) => artworkUrl(image?.url)).find(Boolean) ?? null,
    url: `https://open.spotify.com/track/${track.id}`,
    explicit: track.explicit === true,
  };
}

// Called only on the server. Return public display fields, never Spotify tokens.
export async function fetchSpotifyListening(
  credentials: SpotifyCredentials,
  request: typeof fetch = fetch,
): Promise<ListeningData> {
  const tokenResponse = await request("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${credentials.clientId}:${credentials.clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: credentials.refreshToken }),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!tokenResponse.ok) throw new SpotifyApiError(tokenResponse.status);
  const token = await tokenResponse.json();
  if (typeof token.access_token !== "string" || !token.access_token) throw new SpotifyApiError(502);

  const tracksResponse = await request("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=8", {
    headers: { Authorization: `Bearer ${token.access_token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });
  if (!tracksResponse.ok) throw new SpotifyApiError(tracksResponse.status);
  const result = await tracksResponse.json();
  if (!Array.isArray(result.items)) throw new SpotifyApiError(502);
  const tracks: ListeningTrack[] = [];
  for (const item of result.items) {
    const track = normalizeTrack(item);
    if (track && !tracks.some((existing) => existing.id === track.id)) tracks.push(track);
    if (tracks.length === 8) break;
  }
  return {
    status: tracks.length ? "ready" : "empty",
    tracks,
    profileUrl: spotifyProfileUrl(credentials.profileUrl),
    updatedAt: new Date().toISOString(),
  };
}
