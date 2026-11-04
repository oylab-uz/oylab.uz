import { sql } from "drizzle-orm";
import { describe, expect, it } from "vitest";
import * as schema from "./schema";
import { createTestDb } from "./test-db";

const now = 1_762_300_000_000;

describe("schema", () => {
  it("creates all five tables", () => {
    const db = createTestDb();
    const rows = db.all<{ name: string }>(
      sql`select name from sqlite_master where type = 'table' order by name`,
    );
    const names = rows.map((r) => r.name);
    expect(names).toEqual(
      expect.arrayContaining([
        "media",
        "post_translations",
        "posts",
        "publication_translations",
        "publications",
      ]),
    );
  });

  it("deleting a post deletes its translations", async () => {
    const db = createTestDb();
    await db.insert(schema.posts).values({
      id: "p1",
      slug: "p1",
      primaryLocale: "en",
      status: "draft",
      createdAt: now,
      updatedAt: now,
      updatedBy: "a@oylab.uz",
    });
    await db.insert(schema.postTranslations).values([
      { postId: "p1", locale: "en", title: "A", summary: "", bodyMd: "", bodyHtml: "", readingMinutes: 1, updatedAt: now },
      { postId: "p1", locale: "ru", title: "Б", summary: "", bodyMd: "", bodyHtml: "", readingMinutes: 1, updatedAt: now },
    ]);
    await db.delete(schema.posts);
    expect(await db.select().from(schema.postTranslations)).toHaveLength(0);
  });

  it("deleting media sets cover_media_id to null", async () => {
    const db = createTestDb();
    await db.insert(schema.media).values({
      id: "m1",
      key: "2026/11/m1.png",
      url: "https://media.oylab.uz/2026/11/m1.png",
      contentType: "image/png",
      bytes: 10,
      alt: "",
      createdAt: now,
      uploadedBy: "a@oylab.uz",
    });
    await db.insert(schema.posts).values({
      id: "p1",
      slug: "p1",
      primaryLocale: "en",
      status: "draft",
      coverMediaId: "m1",
      createdAt: now,
      updatedAt: now,
      updatedBy: "a@oylab.uz",
    });
    await db.delete(schema.media);
    const [post] = await db.select().from(schema.posts);
    expect(post.coverMediaId).toBeNull();
  });
});
