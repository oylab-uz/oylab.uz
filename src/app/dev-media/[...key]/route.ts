import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Serves local R2 objects during `next dev`, where media.oylab.uz does not
 * exist. Production answers 404 here; the real files live on the R2 domain.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  if (process.env.NODE_ENV !== "development") return new Response("Not found", { status: 404 });
  const { key } = await params;
  const { env } = await getCloudflareContext({ async: true });
  const object = await env.MEDIA.get(key.join("/"));
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  return new Response(object.body, { headers });
}
