// Keep the credential-bearing deploy URL out of command lines and logs.
const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
if (!hook) {
  console.error('Missing VERCEL_DEPLOY_HOOK_URL. Configure the GitHub Actions secret, then run this workflow manually to deploy.');
  process.exitCode = 1;
} else {
  try {
    const url = new URL(hook);
    if (url.protocol !== 'https:' || url.hostname !== 'api.vercel.com' || !url.pathname.startsWith('/v1/integrations/deploy/')) throw new Error('Invalid deploy hook');
    const response = await fetch(url, { method: 'POST', signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error('Deploy hook rejected');
    console.log('Vercel deployment requested. Check the Vercel deployment status.');
  } catch { console.error('Could not request the Vercel deployment. Check the deploy-hook secret and rerun the workflow manually.'); process.exitCode = 1; }
}
