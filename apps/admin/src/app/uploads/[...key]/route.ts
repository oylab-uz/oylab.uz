import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { env } from "@/lib/env";

const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", gif: "image/gif", svg: "image/svg+xml", pdf: "application/pdf", json: "application/json" };

/** Serves the local media folder in development. Production files live on media.oylab.uz. */
export async function GET(_request: Request, { params }: { params: Promise<{ key: string[] }> }) {
  if (!env.isDevelopment()) return new Response("Not found", { status: 404 });
  const root = path.join(process.cwd(), "data", "uploads");
  const file = path.join(root, ...(await params).key);
  if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) return new Response("Not found", { status: 404 });
  const ext = path.extname(file).slice(1);
  return new Response(Readable.toWeb(createReadStream(file)) as ReadableStream, {
    headers: { "content-type": TYPES[ext] ?? "application/octet-stream", "cache-control": "no-store" },
  });
}
