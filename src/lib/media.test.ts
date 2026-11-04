import { describe, expect, it, vi } from "vitest";
import type { Db } from "@/db";
import * as schema from "@/db/schema";
import { createTestDb } from "@/db/test-db";
import { deleteMedia, listMedia, mediaKey, putMedia, validateUpload } from "./media";

const PNG_1x1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64",
);
const bytes = () => PNG_1x1.buffer.slice(PNG_1x1.byteOffset, PNG_1x1.byteOffset + PNG_1x1.byteLength);

function fakeBucket() {
  return { put: vi.fn(async () => null), delete: vi.fn(async () => undefined) };
}
const asBucket = (b: ReturnType<typeof fakeBucket>) => b as unknown as R2Bucket;

describe("validateUpload", () => {
  it("accepts a PNG at exactly 10 MB", () => {
    expect(validateUpload({ type: "image/png", size: 10 * 1024 * 1024 })).toEqual({ ok: true });
  });
  it("rejects a file over 10 MB and names the limit", () => {
    const r = validateUpload({ type: "image/png", size: 10 * 1024 * 1024 + 1 });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toContain("10 MB");
  });
  it("rejects types outside the allow list", () => {
    expect(validateUpload({ type: "text/html", size: 10 }).ok).toBe(false);
    expect(validateUpload({ type: "", size: 10 }).ok).toBe(false);
  });
});

describe("mediaKey", () => {
  it("is year/month/id.ext", () => {
    expect(mediaKey("abc", "image/jpeg", new Date(Date.UTC(2026, 10, 4)))).toBe("2026/11/abc.jpg");
    expect(mediaKey("abc", "application/pdf", new Date(Date.UTC(2026, 0, 1)))).toBe("2026/01/abc.pdf");
  });
});

describe("putMedia", () => {
  it("stores the object with immutable caching, reads dimensions and records the row", async () => {
    const db: Db = createTestDb();
    const bucket = fakeBucket();
    const row = await putMedia(db, asBucket(bucket), {
      bytes: bytes(),
      contentType: "image/png",
      alt: "dot",
      email: "a@oylab.uz",
      publicUrl: "https://media.oylab.uz/",
    });
    expect(row).toMatchObject({ width: 1, height: 1, bytes: PNG_1x1.byteLength, alt: "dot", contentType: "image/png" });
    expect(row.url).toMatch(/^https:\/\/media\.oylab\.uz\/\d{4}\/\d{2}\/[0-9a-f-]{36}\.png$/);
    expect(bucket.put).toHaveBeenCalledWith(
      row.key,
      expect.anything(),
      { httpMetadata: { contentType: "image/png", cacheControl: "public, max-age=31536000, immutable" } },
    );
    expect(await listMedia(db)).toHaveLength(1);
  });

  it("leaves dimensions null for PDFs", async () => {
    const db: Db = createTestDb();
    const row = await putMedia(db, asBucket(fakeBucket()), {
      bytes: new TextEncoder().encode("%PDF-1.4").buffer,
      contentType: "application/pdf",
      alt: "",
      email: "a@oylab.uz",
      publicUrl: "https://media.oylab.uz",
    });
    expect(row.width).toBeNull();
    expect(row.height).toBeNull();
  });
});

describe("deleteMedia", () => {
  it("deleting media clears cover references and removes the object", async () => {
    const db: Db = createTestDb();
    const bucket = fakeBucket();
    const row = await putMedia(db, asBucket(bucket), {
      bytes: bytes(),
      contentType: "image/png",
      alt: "",
      email: "a@oylab.uz",
      publicUrl: "https://media.oylab.uz",
    });
    const now = Date.now();
    await db.insert(schema.posts).values({
      id: "p1",
      slug: "p1",
      primaryLocale: "en",
      status: "draft",
      coverMediaId: row.id,
      createdAt: now,
      updatedAt: now,
      updatedBy: "a@oylab.uz",
    });
    await deleteMedia(db, asBucket(bucket), row.id);
    expect(bucket.delete).toHaveBeenCalledWith(row.key);
    const [post] = await db.select().from(schema.posts);
    expect(post.coverMediaId).toBeNull();
    expect(await listMedia(db)).toHaveLength(0);
  });
});
