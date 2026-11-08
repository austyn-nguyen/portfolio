# Spotify listening lately

The music page shows up to eight of the owner's top tracks from approximately the past four weeks. Tracks stay on the page, with album covers, a selectable Spotify embed, and links to the songs and your profile. Visitors do not authorize or sign into the portfolio. Spotify controls playback in its player; previews and full playback depend on the visitor's Spotify session, browser, and content availability.

## Connect your account

1. Sign in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app for your portfolio. Choose **Web API**. Spotify currently requires the app owner to have **Premium** for development mode.
2. Register this exact redirect URI in the app settings:

   ```text
   http://127.0.0.1:53683/callback
   ```

   Spotify permits HTTP for explicit loopback IP addresses; `localhost` is not accepted. This callback runs only on your computer during authorization, so no production callback is needed.

3. Add the app's Client ID and Client Secret to the existing `.env.local` file. Preserve its other values:

   ```dotenv
   SPOTIFY_CLIENT_ID=your-client-id
   SPOTIFY_CLIENT_SECRET=your-client-secret
   ```

4. Run:

   ```sh
   npm run spotify:authorize
   ```

5. Open the URL printed in the terminal, sign into **your own Spotify account**, and approve the read-only `user-top-read` permission. This makes your top tracks public on your portfolio. No library changes or playback control permissions are requested.
6. The local callback saves `SPOTIFY_REFRESH_TOKEN` and, when available, `SPOTIFY_PROFILE_URL` to `.env.local`, preserving other settings. Tokens are never printed or returned to the browser. If the profile lookup is unavailable, add your public profile URL manually:

   ```dotenv
   SPOTIFY_PROFILE_URL=https://open.spotify.com/user/your-user-id
   ```

7. Restart `npm run dev` and open `/music#listening`.

## Connect the Vercel deployment

In the portfolio's Vercel project settings, add these environment variables for the desired deployment environments, then redeploy:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`
- `SPOTIFY_PROFILE_URL` (optional profile link)

Copy values from `.env.local` directly into Vercel; do not commit them or paste them into chat. Use the same Spotify app for authorization and production. All variables are server-only; none should have a `NEXT_PUBLIC_` prefix. The existing GitHub photo sync does not need Spotify secrets.

## Updates and failure states

- `/api/spotify/top-tracks` refreshes the owner's Spotify access token on the server, reads `GET /v1/me/top/tracks?time_range=short_term&limit=8`, and returns only public track fields and the profile link.
- Next.js caches successful listening data for one hour across visitors. It refreshes on the next request after expiry, so this does not require a scheduled job. The browser and CDN briefly cache the public response. Next.js can continue serving the last successful result if background revalidation fails.
- Without credentials, the section shows a friendly placeholder. An account with no top tracks gets an empty state. Failed first-time requests show a retry button; raw Spotify errors and credentials are never sent to visitors.
- If the connection is revoked or the refresh token becomes invalid, run `npm run spotify:authorize` again, update the refresh token in Vercel, and redeploy. A `403` can mean the account lacks permission, Premium, or the app's allowlist entry. Ensure the account authorized is allowed in the Spotify app. A `429` means Spotify's request quota has been reached; the cache reduces repeated requests.
- Selecting a track loads its official Spotify player without autoplay. On phones, pointer selection scrolls to the player; reduced-motion preferences are respected.

## Verification and attribution

```sh
npm run test:spotify
npm run build
```

Tests mock Spotify rather than using a real account. They check credential isolation, token exchange, scope and state validation, track normalization, and upstream failures. A live connection still needs the owner's authorization.

The black and white Spotify logos in `public/images/music/` are unmodified assets from [Spotify's official logo package](https://developer.spotify.com/images/guidelines/design/2024-spotify-full-logo.zip), displayed according to the [design guidelines](https://developer.spotify.com/documentation/design). Album artwork is displayed uncropped and unmodified.

References: [Top items](https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks), [authorization code flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow), [refreshing tokens](https://developer.spotify.com/documentation/web-api/tutorials/refreshing-tokens), [redirect URIs](https://developer.spotify.com/documentation/web-api/concepts/redirect_uri), [development mode](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).
