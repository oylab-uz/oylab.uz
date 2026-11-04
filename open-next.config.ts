import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * No incremental cache, queue or tag cache yet: every page renders per
 * request, which is all a landing site with a live moon phase needs. Add the
 * R2 incremental cache, the Durable Object queue and the D1 tag cache when
 * articles need revalidation (https://opennext.js.org/cloudflare/caching).
 */
export default defineCloudflareConfig({});
