import sharp from "sharp";
import { describe, expect, it, vi } from "vitest";
import { createTestDb } from "@/db/test-db";
import { MAX_IMAGE_EDGE, putMedia, type MediaStore } from "./media";

function fakeBucket() {
  const objects = new Map<string, ArrayBuffer | string>();
  return {
    objects,
    store: {
      put: vi.fn(async (key: string, bytes: ArrayBuffer | string) => {
        objects.set(key, bytes);
      }),
      delete: vi.fn(async () => undefined),
    } as MediaStore,
  };
}

const toArrayBuffer = (b: Buffer) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;

async function image(width: number, height: number, format: "jpeg" | "png") {
  const base = sharp({ create: { width, height, channels: 3, background: { r: 120, g: 120, b: 120 } } });
  return toArrayBuffer(await (format === "jpeg" ? base.jpeg() : base.png()).toBuffer());
}

const input = (bytes: ArrayBuffer, contentType: string) => ({
  bytes,
  contentType,
  alt: "",
  email: "t@oylab.uz",
  publicUrl: "https://media.test",
});

describe("putMedia resizing", () => {
  it("limits the long edge to MAX_IMAGE_EDGE and records the new size", async () => {
    const db = createTestDb();
    const { store, objects } = fakeBucket();
    const row = await putMedia(db, store, input(await image(3000, 2000, "jpeg"), "image/jpeg"));

    expect(MAX_IMAGE_EDGE).toBe(2000);
    expect(row.width).toBe(2000);
    expect(row.height).toBe(1333);
    const stored = objects.get(row.key);
    expect(stored).toBeInstanceOf(ArrayBuffer);
    const meta = await sharp(Buffer.from(stored as ArrayBuffer)).metadata();
    expect([meta.width, meta.height, meta.format]).toEqual([2000, 1333, "jpeg"]);
    expect(row.bytes).toBe((stored as ArrayBuffer).byteLength);
  });

  it("limits a tall image by its height", async () => {
    const db = createTestDb();
    const { store } = fakeBucket();
    const row = await putMedia(db, store, input(await image(1000, 4000, "png"), "image/png"));
    expect([row.width, row.height]).toEqual([500, 2000]);
  });

  it("stores an image within the limit byte for byte", async () => {
    const db = createTestDb();
    const { store, objects } = fakeBucket();
    const bytes = await image(800, 600, "png");
    const row = await putMedia(db, store, input(bytes, "image/png"));
    expect(objects.get(row.key)).toBe(bytes);
    expect([row.width, row.height, row.bytes]).toEqual([800, 600, bytes.byteLength]);
  });
});
