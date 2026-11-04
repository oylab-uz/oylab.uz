import { beforeEach, describe, expect, it } from "vitest";
import { createTestDb } from "@/db/test-db";
import type { Db } from "@/db";
import {
  createDraftPost,
  deletePost,
  getPostAdmin,
  getPublishedPost,
  listPostsAdmin,
  listPublishedPosts,
  publishPost,
  savePost,
  unpublishPost,
} from "./posts";
import type { PostInput } from "./types";

const ctx = { email: "a@oylab.uz", mediaOrigin: "https://media.oylab.uz" };

function input(id: string, slug: string, extra: Partial<PostInput> = {}): PostInput {
  return {
    id,
    slug,
    primaryLocale: "en",
    coverMediaId: null,
    publishedAt: null,
    translations: {
      en: { title: "Hello", summary: "Short", bodyMd: "# Heading\n\nBody **bold**." },
    },
    ...extra,
  };
}

let db: Db;
beforeEach(() => {
  db = createTestDb();
});

describe("posts", () => {
  it("createDraftPost makes a draft with an empty primary translation", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "uz", email: "a@oylab.uz" });
    const found = await getPostAdmin(db, id);
    expect(found?.post.status).toBe("draft");
    expect(found?.post.slug).toBe(`untitled-${id.slice(0, 8)}`);
    expect(found?.translations.map((t) => t.locale)).toEqual(["uz"]);
    expect(found?.translations[0].title).toBe("");
  });

  it("savePost renders bodies and removes translations that are no longer sent", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    const first = await savePost(
      db,
      input(id, "hello", {
        translations: {
          en: { title: "Hello", summary: "S", bodyMd: "Body **bold**." },
          ru: { title: "Привет", summary: "К", bodyMd: "Тело." },
        },
      }),
      ctx,
    );
    expect(first).toEqual({ ok: true });
    let found = await getPostAdmin(db, id);
    expect(found?.translations.map((t) => t.locale).sort()).toEqual(["en", "ru"]);
    expect(found?.translations.find((t) => t.locale === "en")?.bodyHtml).toContain("<strong>bold</strong>");
    expect(found?.translations.find((t) => t.locale === "en")?.readingMinutes).toBe(1);
    expect(found?.post.updatedBy).toBe("a@oylab.uz");

    await savePost(db, input(id, "hello"), ctx);
    found = await getPostAdmin(db, id);
    expect(found?.translations.map((t) => t.locale)).toEqual(["en"]);
  });

  it("savePost rejects a slug used by another post", async () => {
    const a = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    const b = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    expect(await savePost(db, input(a.id, "same"), ctx)).toEqual({ ok: true });
    const result = await savePost(db, input(b.id, "same"), ctx);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.slug).toMatch(/another post/i);
  });

  it("savePost rejects an invalid slug", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    const result = await savePost(db, input(id, "Bad Slug"), ctx);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.slug).toBeTruthy();
  });

  it("savePost rejects a slug change on a published post", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    await savePost(db, input(id, "first"), ctx);
    expect(await publishPost(db, id, ctx.email)).toEqual({ ok: true });
    const result = await savePost(db, input(id, "second"), ctx);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.slug).toMatch(/locked/i);
  });

  it("publishPost requires a primary title and body, then sets publishedAt", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    const empty = await publishPost(db, id, ctx.email);
    expect(empty.ok).toBe(false);
    if (!empty.ok) expect(Object.keys(empty.fieldErrors)).toContain("translations.en.title");

    await savePost(db, input(id, "ready"), ctx);
    expect(await publishPost(db, id, ctx.email)).toEqual({ ok: true });
    const found = await getPostAdmin(db, id);
    expect(found?.post.status).toBe("published");
    expect(found?.post.publishedAt).toBeTypeOf("number");

    expect(await unpublishPost(db, id, ctx.email)).toEqual({ ok: true });
    expect((await getPostAdmin(db, id))?.post.status).toBe("draft");
  });

  it("listPublishedPosts falls back to the primary language and paginates", async () => {
    for (let i = 0; i < 3; i++) {
      const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
      await savePost(db, input(id, `post-${i}`, { publishedAt: 1_000 + i }), ctx);
      await publishPost(db, id, ctx.email);
    }
    const draft = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    await savePost(db, input(draft.id, "draft-post"), ctx);

    const page1 = await listPublishedPosts(db, { locale: "ru", page: 1, perPage: 2 });
    expect(page1.total).toBe(3);
    expect(page1.pages).toBe(2);
    expect(page1.items.map((p) => p.slug)).toEqual(["post-2", "post-1"]);
    expect(page1.items[0]).toMatchObject({ title: "Hello", locale: "en", fallback: true });

    const page2 = await listPublishedPosts(db, { locale: "ru", page: 2, perPage: 2 });
    expect(page2.items.map((p) => p.slug)).toEqual(["post-0"]);
  });

  it("getPublishedPost returns null for drafts and lists available locales", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    await savePost(
      db,
      input(id, "multi", {
        translations: {
          en: { title: "Hello", summary: "S", bodyMd: "Body" },
          uz: { title: "Salom", summary: "Q", bodyMd: "Matn" },
        },
      }),
      ctx,
    );
    expect(await getPublishedPost(db, "multi", "en")).toBeNull();
    await publishPost(db, id, ctx.email);
    const uz = await getPublishedPost(db, "multi", "uz");
    expect(uz).toMatchObject({ title: "Salom", fallback: false, primaryLocale: "en" });
    expect(uz?.availableLocales.sort()).toEqual(["en", "uz"]);
    const ru = await getPublishedPost(db, "multi", "ru");
    expect(ru).toMatchObject({ title: "Hello", locale: "en", fallback: true });
    expect(await getPublishedPost(db, "nope", "en")).toBeNull();
  });

  it("listPostsAdmin reports status, locales and the primary title", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    await savePost(
      db,
      input(id, "admin-row", {
        translations: {
          en: { title: "Hello", summary: "", bodyMd: "" },
          ru: { title: "Привет", summary: "", bodyMd: "" },
        },
      }),
      ctx,
    );
    const rows = await listPostsAdmin(db, {});
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ slug: "admin-row", status: "draft", title: "Hello" });
    expect(rows[0].locales.sort()).toEqual(["en", "ru"]);
    expect(await listPostsAdmin(db, { status: "published" })).toHaveLength(0);
  });

  it("deletePost refuses published posts and deletes drafts", async () => {
    const { id } = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
    await savePost(db, input(id, "to-delete"), ctx);
    await publishPost(db, id, ctx.email);
    const refused = await deletePost(db, id);
    expect(refused.ok).toBe(false);
    await unpublishPost(db, id, ctx.email);
    expect(await deletePost(db, id)).toEqual({ ok: true });
    expect(await getPostAdmin(db, id)).toBeNull();
  });
});
