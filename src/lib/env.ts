import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Bindings and vars from wrangler.jsonc (miniflare in `next dev`). */
export async function getEnv(): Promise<CloudflareEnv> {
  return (await getCloudflareContext({ async: true })).env;
}
