import { webhookHandlers } from "@/scripts/dropbox-webhook.mjs";

export const runtime = "nodejs";
export const maxDuration = 10;
export const { GET, POST } = webhookHandlers();
