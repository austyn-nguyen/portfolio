import { unstable_cache } from "next/cache";
import { createHash } from "node:crypto";
import { fetchSpotifyListening, spotifyProfileUrl, SpotifyApiError } from "@/src/lib/spotify";
import { spotifyProfileUrl as defaultProfileUrl } from "@/src/data/music-listening";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Cache the public result, rather than a token, across visitors and server instances.
function getListening() {
  const credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID!,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN!,
    profileUrl: spotifyProfileUrl(process.env.SPOTIFY_PROFILE_URL) ?? defaultProfileUrl,
  };
  // Reconnecting an account must not reuse another connection's cached tracks.
  const connection = createHash("sha256").update(`${credentials.clientId}:${credentials.refreshToken}:${credentials.profileUrl ?? ""}`).digest("hex");
  return unstable_cache(() => fetchSpotifyListening(credentials), ["spotify-listening-v1", connection], { revalidate: 3600 })();
}

export async function GET() {
  const profileUrl = spotifyProfileUrl(process.env.SPOTIFY_PROFILE_URL) ?? defaultProfileUrl;
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET || !process.env.SPOTIFY_REFRESH_TOKEN) {
    return Response.json({ status: "pending", tracks: [], profileUrl }, {
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    return Response.json(await getListening(), {
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=3600" },
    });
  } catch (error) {
    console.warn("Spotify listening data unavailable.", error instanceof SpotifyApiError ? `HTTP ${error.status}` : "Connection or response error.");
    return Response.json({ status: "unavailable", tracks: [], profileUrl }, {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }
}
