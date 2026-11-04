// Downloads the published-content snapshot the admin wrote to R2, before `next build`.
// Any failure writes an empty snapshot and exits 0: the landing page must build
// before the admin exists. SNAPSHOT_URL may be an https:// or a file:// URL.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const url = process.env.SNAPSHOT_URL ?? "https://media.oylab.uz/snapshot/content.json";
const target = new URL("../content/snapshot.json", import.meta.url);
const empty = { version: 1, generatedAt: 0, posts: [], publications: [] };

async function load() {
  if (url.startsWith("file:")) return JSON.parse(readFileSync(fileURLToPath(url), "utf8"));
  // A unique query string sidesteps any edge cache between the builder and the bucket,
  // so a rebuild requested right after a publish never sees the previous snapshot.
  const fresh = `${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`;
  const res = await fetch(fresh, { signal: AbortSignal.timeout(15000), cache: "no-store" });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

mkdirSync(new URL("../content/", import.meta.url), { recursive: true });
try {
  const snapshot = await load();
  if (snapshot?.version !== 1 || !Array.isArray(snapshot.posts)) throw new Error("unexpected snapshot shape");
  writeFileSync(target, JSON.stringify(snapshot));
  console.log(`snapshot: ${snapshot.posts.length} posts, ${snapshot.publications.length} publications from ${url}`);
} catch (error) {
  writeFileSync(target, JSON.stringify(empty));
  console.warn(`snapshot: using empty content (${error instanceof Error ? error.message : error}) from ${url}`);
}
