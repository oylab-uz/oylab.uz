import { beforeEach, describe, expect, it } from "vitest";
import { createTestDb } from "@/db/test-db";
import type { Db } from "@/db";
import {
  createDraftPublication,
  deletePublication,
  getPublicationAdmin,
  getPublishedPublication,
  listPublicationsAdmin,
  listPublishedPublications,
  publishPublication,
  savePublication,
  unpublishPublication,
} from "./publications";
import type { PublicationInput } from "./types";

const ctx = { email: "a@oylab.uz", mediaOrigin: "https://media.oylab.uz" };

function input(id: string, slug: string, extra: Partial<PublicationInput> = {}): PublicationInput {
  return {
    id,
    slug,
    primaryLocale: "en",
    publishedAt: null,
    year: 2025,
    venue: "arXiv preprint",
    authors: [{ name: "Dilnoza Rahimova", url: "https://example.org/d" }, { name: "Bekzod Yusupov" }],
    pdfUrl: "https://arxiv.org/pdf/1.pdf",
    arxivUrl: null,
    codeUrl: null,
    doi: null,
    bibtex: "@article{x}",
    translations: { en: { title: "Oydin", abstractMd: "An *open* model." } },
    ...extra,
  };
}

let db: Db;
beforeEach(() => {
  db = createTestDb();
});

describe("publications", () => {
  it("createDraftPublication makes a draft for the current year", async () => {
    const { id } = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    const found = await getPublicationAdmin(db, id);
    expect(found?.publication.status).toBe("draft");
    expect(found?.publication.year).toBe(new Date().getFullYear());
    expect(found?.translations.map((t) => t.locale)).toEqual(["en"]);
  });

  it("savePublication stores authors as JSON and renders the abstract", async () => {
    const { id } = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    expect(await savePublication(db, input(id, "oydin"), ctx)).toEqual({ ok: true });
    const found = await getPublicationAdmin(db, id);
    expect(JSON.parse(found!.publication.authorsJson)).toEqual([
      { name: "Dilnoza Rahimova", url: "https://example.org/d" },
      { name: "Bekzod Yusupov" },
    ]);
    expect(found?.translations[0].abstractHtml).toContain("<em>open</em>");
  });

  it("savePublication rejects a slug used by another publication", async () => {
    const a = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    const b = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    await savePublication(db, input(a.id, "same"), ctx);
    const result = await savePublication(db, input(b.id, "same"), ctx);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.fieldErrors.slug).toMatch(/another publication/i);
  });

  it("publishPublication requires a primary title", async () => {
    const { id } = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    const empty = await publishPublication(db, id, ctx.email);
    expect(empty.ok).toBe(false);
    if (!empty.ok) expect(Object.keys(empty.fieldErrors)).toContain("translations.en.title");
    await savePublication(db, input(id, "ready"), ctx);
    expect(await publishPublication(db, id, ctx.email)).toEqual({ ok: true });
    expect(await unpublishPublication(db, id, ctx.email)).toEqual({ ok: true });
  });

  it("listPublishedPublications groups by year, newest first, with fallback", async () => {
    for (const [slug, year] of [["a", 2024], ["b", 2025], ["c", 2025]] as const) {
      const { id } = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
      await savePublication(db, input(id, slug, { year }), ctx);
      await publishPublication(db, id, ctx.email);
    }
    const draft = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    await savePublication(db, input(draft.id, "draft", { year: 2026 }), ctx);

    const groups = await listPublishedPublications(db, "uz");
    expect(groups.map((g) => g.year)).toEqual([2025, 2024]);
    expect(groups[0].items).toHaveLength(2);
    expect(groups[0].items[0]).toMatchObject({ title: "Oydin", locale: "en", fallback: true });
    expect(groups[0].items[0].authors[1]).toEqual({ name: "Bekzod Yusupov" });
  });

  it("getPublishedPublication returns the page with available locales", async () => {
    const { id } = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    await savePublication(
      db,
      input(id, "multi", {
        translations: {
          en: { title: "Oydin", abstractMd: "Abstract" },
          ru: { title: "Ойдин", abstractMd: "Аннотация" },
        },
      }),
      ctx,
    );
    expect(await getPublishedPublication(db, "multi", "en")).toBeNull();
    await publishPublication(db, id, ctx.email);
    const ru = await getPublishedPublication(db, "multi", "ru");
    expect(ru).toMatchObject({ title: "Ойдин", fallback: false, bibtex: "@article{x}" });
    expect(ru?.availableLocales.sort()).toEqual(["en", "ru"]);
    expect(ru?.abstractHtml).toContain("Аннотация");
  });

  it("listPublicationsAdmin and deletePublication behave like posts", async () => {
    const { id } = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
    await savePublication(db, input(id, "row"), ctx);
    const rows = await listPublicationsAdmin(db, {});
    expect(rows[0]).toMatchObject({ slug: "row", status: "draft", title: "Oydin", year: 2025 });
    await publishPublication(db, id, ctx.email);
    expect((await deletePublication(db, id)).ok).toBe(false);
    await unpublishPublication(db, id, ctx.email);
    expect(await deletePublication(db, id)).toEqual({ ok: true });
    expect(await getPublicationAdmin(db, id)).toBeNull();
  });
});
