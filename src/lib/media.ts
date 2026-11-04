import { desc, eq } from "drizzle-orm";
import { imageSize } from "image-size";
import type { Db } from "@/db";
import { media, type Media } from "@/db/schema";

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const EXTENSION: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "application/pdf": "pdf",
};
const RASTER = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export const ALLOWED_UPLOAD_TYPES = Object.keys(EXTENSION);

export function validateUpload(file: { type: string; size: number }): { ok: true } | { ok: false; error: string } {
  if (!(file.type in EXTENSION)) {
    return {
      ok: false,
      error: `Unsupported file type ${file.type || "(unknown)"}. Allowed: PNG, JPEG, WebP, GIF, SVG, PDF.`,
    };
  }
  if (file.size > MAX_UPLOAD_BYTES) return { ok: false, error: "Files must be 10 MB or smaller." };
  return { ok: true };
}

/** Object key: year/month/id.ext, grouped so a bucket listing stays browsable. */
export function mediaKey(id: string, contentType: string, now: Date): string {
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  return `${year}/${month}/${id}.${EXTENSION[contentType]}`;
}

export type PutMediaInput = {
  bytes: ArrayBuffer;
  contentType: string;
  alt: string;
  email: string;
  publicUrl: string;
};

export async function putMedia(db: Db, bucket: R2Bucket, input: PutMediaInput): Promise<Media> {
  const valid = validateUpload({ type: input.contentType, size: input.bytes.byteLength });
  if (!valid.ok) throw new Error(valid.error);

  const id = crypto.randomUUID();
  const now = new Date();
  const key = mediaKey(id, input.contentType, now);

  let width: number | null = null;
  let height: number | null = null;
  if (RASTER.has(input.contentType)) {
    try {
      const size = imageSize(new Uint8Array(input.bytes));
      width = size.width ?? null;
      height = size.height ?? null;
    } catch {
      // Not a parsable raster image; dimensions stay unknown.
    }
  }

  await bucket.put(key, input.bytes, {
    httpMetadata: { contentType: input.contentType, cacheControl: "public, max-age=31536000, immutable" },
  });

  const row: Media = {
    id,
    key,
    url: `${input.publicUrl.replace(/\/+$/, "")}/${key}`,
    contentType: input.contentType,
    bytes: input.bytes.byteLength,
    width,
    height,
    alt: input.alt,
    createdAt: now.getTime(),
    uploadedBy: input.email,
  };
  await db.insert(media).values(row);
  return row;
}

export async function deleteMedia(db: Db, bucket: R2Bucket, id: string): Promise<void> {
  const row = await db.select().from(media).where(eq(media.id, id)).get();
  if (!row) return;
  await bucket.delete(row.key);
  await db.delete(media).where(eq(media.id, id));
}

export async function listMedia(db: Db): Promise<Media[]> {
  return db.select().from(media).orderBy(desc(media.createdAt));
}
