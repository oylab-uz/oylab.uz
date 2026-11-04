import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { AwsClient } from "aws4fetch";
import { env } from "./env";
import type { MediaStore } from "./media";

/** R2 through its S3-compatible endpoint; small signed fetches, no SDK. */
export function r2Store(config: NonNullable<ReturnType<typeof env.r2>>): MediaStore {
  const client = new AwsClient({ accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, service: "s3", region: "auto" });
  const url = (key: string) => `https://${config.accountId}.r2.cloudflarestorage.com/${config.bucket}/${key}`;
  return {
    async put(key, bytes, contentType, cacheControl) {
      const res = await client.fetch(url(key), { method: "PUT", body: bytes, headers: { "content-type": contentType, "cache-control": cacheControl } });
      if (!res.ok) throw new Error(`R2 put ${key}: ${res.status} ${await res.text()}`);
    },
    async delete(key) {
      const res = await client.fetch(url(key), { method: "DELETE" });
      if (!res.ok && res.status !== 404) throw new Error(`R2 delete ${key}: ${res.status}`);
    },
  };
}

/** Development fallback: files under ./data/uploads, served by the /uploads route. */
export function localStore(root = path.join(process.cwd(), "data", "uploads")): MediaStore {
  return {
    async put(key, bytes) {
      const file = path.join(root, key);
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, typeof bytes === "string" ? bytes : Buffer.from(bytes));
    },
    async delete(key) {
      rmSync(path.join(root, key), { force: true });
    },
  };
}

export function getMediaStore(): MediaStore {
  const r2 = env.r2();
  return r2 ? r2Store(r2) : localStore();
}
