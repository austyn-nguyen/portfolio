# Dropbox → food diary → Vercel

The code is ready; it does not become live until the workflow is on the GitHub default branch and the account secrets below are configured. No Dropbox credentials are committed to this repository.

```text
Upload to the selected Dropbox folder
    ↓ signed webhook (optional), or scheduled check about every 15 minutes
GitHub Actions → import JPEGs + metadata → validate → commit photo changes
    ↓ only when content changes
Vercel Deploy Hook → rebuild → updated /travel
```

## Connect Dropbox once

1. Use a scoped Dropbox app in the [App Console](https://www.dropbox.com/developers/apps). An existing app must have access to the folder containing the photos. An App Folder app sees paths relative to its own app folder; a Full Dropbox app sees paths relative to your Dropbox root.
2. Enable **files.metadata.read** and **files.content.read**. Add this exact OAuth redirect URI in the app settings: `http://localhost:53682/callback`.
3. Add `DROPBOX_APP_KEY`, `DROPBOX_APP_SECRET`, and `DROPBOX_FOLDER_PATH` to your local, ignored `.env.local`. Keep the existing Mapbox setting. Set the folder to the actual upload folder (for example `/PortfolioMap`); use `/` to explicitly select the app's accessible root. An unset or empty folder setting stops the CLI import. Subfolders are included. Only use a folder whose photos you want on the public website.
4. Run `npm run photos:authorize`, open the printed authorization URL in Brave, and approve the app. The local callback saves the refresh token to `.env.local` without printing credentials. It times out after five minutes.
5. Run `npm run photos:sync`, then `npm run photos:validate`. Review the new photos on `/travel` before the first automated publish.

The importer refreshes short-lived access tokens automatically. `DROPBOX_ACCESS_TOKEN` is supported for a one-off local import, but scheduled runs use the refresh token. See [Dropbox's OAuth guide](https://developers.dropbox.com/oauth-guide).

## Enable scheduled publishing

In this GitHub repository's **Settings → Secrets and variables → Actions**, add:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `DROPBOX_APP_KEY` | Dropbox app key |
| Secret | `DROPBOX_APP_SECRET` | Dropbox app secret |
| Secret | `DROPBOX_REFRESH_TOKEN` | Refresh token from local `.env.local` |
| Variable | `DROPBOX_FOLDER_PATH` | Same folder path used locally |
| Secret | `VERCEL_DEPLOY_HOOK_URL` | Production deploy hook from Vercel |

Create that hook under **Vercel project → Settings → Git → Deploy Hooks**, targeting the production branch. Treat its URL as a password. It deploys bot commits reliably without relying on the bot being a member of your Vercel team. Do not put it in a public browser environment variable.

Commit/push the implementation to the repository's default branch, enable Actions if necessary, then run **Actions → Sync Dropbox photos → Run workflow**. Confirm the new photo commit, successful validation, and completed Vercel deployment. The workflow needs permission to push to the default branch; branch protection must allow the automation or a pull-request publishing process is needed instead.

The schedule is offset to minutes 7, 22, 37, and 52. GitHub can delay scheduled jobs, so this is approximately every 15 minutes, not an exact deadline. A cache marker records each successfully queued photo version. If a hook request fails, the next sync retries it even when the library is unchanged. A missing/evicted cache marker can cause an extra deployment; manual runs always request a deployment. A successful hook request means deployment was queued; verify completion in Vercel. GitHub may disable schedules in inactive public repositories; re-enable the workflow if necessary. [GitHub schedule documentation](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule), [Vercel Deploy Hooks](https://vercel.com/docs/deploy-hooks).

## Optional: start a sync after each upload

The signed webhook endpoint is `/api/dropbox/webhook`. This queues the same GitHub workflow and returns quickly; it does not download photos inside a Vercel request.

1. Create a fine-grained GitHub token restricted to this repository, with **Contents: read and write** (required for the repository dispatch API). Choose an expiry and renew it before it expires. Store it as `GITHUB_SYNC_TOKEN` in Vercel's server environment settings.
2. Also set `DROPBOX_APP_SECRET` in Vercel. Optionally set `DROPBOX_ACCOUNT_ID` to accept only your account's notifications. `GITHUB_SYNC_REPOSITORY` defaults to `austyn-nguyen/portfolio`.
3. Deploy those settings, then register `https://YOUR-PRODUCTION-DOMAIN/api/dropbox/webhook` in the Dropbox app's **Webhooks** settings. The GET handler answers Dropbox's verification challenge; POST notifications must pass HMAC signature verification.
4. Upload a new photo to the configured folder. Check the GitHub workflow and completed Vercel deployment. Keep the schedule as a fallback if a webhook or token fails.

Webhooks indicate account changes; the importer filters the chosen folder. Multiple uploads can be batched into one run. GitHub queue time plus build time still applies. Invalid signatures cannot start a workflow, and dispatch errors return a retryable response. See [Dropbox Webhooks](https://www.dropbox.com/developers/reference/webhooks).

## Import behavior and maintenance

- Supported: JPEG, PNG, HEIC/HEIF, and WebP, subject to Dropbox's ability to generate a thumbnail. Unsupported conversions fail visibly rather than silently disappearing.
- Photos without GPS appear in the diary. Photos with valid GPS also appear on the map; zero-valued coordinates are valid.
- Capture date comes from EXIF, then Dropbox media metadata, then the file's Dropbox modification date. The diary uses UTC consistently to avoid server/browser month differences. Rename timestamps and manual filenames are not displayed as captions.
- Original images up to 50 MB are read for EXIF. Larger originals use available Dropbox metadata. Public JPEG previews are resized by Dropbox, re-encoded, and stripped of embedded EXIF; only catalog coordinates are used for the public map. Originals stay in Dropbox.
- Dropbox IDs prevent same-name collisions. Revisions detect edits; fresh image URLs prevent stale thumbnails. Existing legacy images link only if an unambiguous original name and thumbnail bytes match. A mismatch imports a separate photo rather than discarding it.
- Each run lists the configured folder recursively, including all pages, then downloads only new/changed files (and legacy files being linked once). There is no cached cursor to lose or corrupt.
- Moving or deleting a source photo does **not** remove its published copy. To unpublish a photo, remove its catalog entry and JPEG and remove/move the source outside the synced folder so it is not imported again.
- Missing credentials, corrupt catalogs, API failures, and failed image conversions exit with an error. Valid local imports can be preserved during a partial failure; reruns are idempotent. An unsuccessful GitHub import does not commit or deploy. Check failed Actions runs rather than assuming every upload succeeded.
- Only the photo catalog and travel image directory are committed by the workflow. Concurrent photo jobs are serialized. A conflicting human edit stops publication rather than overwriting it.

Useful commands:

```sh
npm run test:photos      # isolated importer/webhook tests; no real account needed
npm run photos:validate  # check every catalog record and local JPEG
npm run photos:sync      # requires local Dropbox credentials
```
