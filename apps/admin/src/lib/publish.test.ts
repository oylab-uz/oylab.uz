import { describe, expect, it, vi } from "vitest";
import { createTestDb } from "@/db/test-db";
import { createDraftPost, publishPost, savePost } from "./content/posts";
import { createDraftPublication, publishPublication, savePublication } from "./content/publications";
import type { MediaStore } from "./media";
import { buildSnapshot, listPublishes, publishSite, SNAPSHOT_KEY } from "./publish";

const ctx = { email: "a@oylab.uz", mediaOrigin: "https://media.oylab.uz" };

async function seed() {
  const db = createTestDb();
  const draft = await createDraftPost(db, { primaryLocale: "en", email: ctx.email });
  await savePost(db, { id: draft.id, slug: "draft", primaryLocale: "en", coverMediaId: null, publishedAt: null, translations: { en: { title: "Draft", summary: "", bodyMd: "x" } } }, ctx);
  const live = await createDraftPost(db, { primaryLocale: "uz", email: ctx.email });
  await savePost(db, { id: live.id, slug: "live", primaryLocale: "uz", coverMediaId: null, publishedAt: 1000, translations: { uz: { title: "Salom", summary: "S", bodyMd: "**Matn**" }, ru: { title: "Привет", summary: "", bodyMd: "Текст" }, en: { title: "", summary: "", bodyMd: "" } } }, ctx);
  await publishPost(db, live.id, ctx.email);
  const pub = await createDraftPublication(db, { primaryLocale: "en", email: ctx.email });
  await savePublication(db, { id: pub.id, slug: "paper", primaryLocale: "en", publishedAt: null, year: 2025, venue: "V", authors: [{ name: "A" }], pdfUrl: null, arxivUrl: null, codeUrl: null, doi: null, bibtex: null, translations: { en: { title: "Paper", abstractMd: "*a*" } } }, ctx);
  await publishPublication(db, pub.id, ctx.email);
  return db;
}

describe("buildSnapshot", () => {
  it("exports published items only, with rendered HTML and non-empty translations", async () => {
    const snapshot = await buildSnapshot(await seed());
    expect(snapshot.version).toBe(1);
    expect(snapshot.posts.map((p) => p.slug)).toEqual(["live"]);
    expect(snapshot.posts[0].translations.map((t) => t.locale).sort()).toEqual(["ru", "uz"]);
    expect(snapshot.posts[0].translations.find((t) => t.locale === "uz")?.bodyHtml).toContain("<strong>Matn</strong>");
    expect(snapshot.publications[0]).toMatchObject({ slug: "paper", year: 2025, authors: [{ name: "A" }] });
    expect(snapshot.publications[0].translations[0].abstractHtml).toContain("<em>a</em>");
  });
});

describe("publishSite", () => {
  const store = (): MediaStore & { put: ReturnType<typeof vi.fn> } => ({ put: vi.fn(async () => undefined), delete: vi.fn(async () => undefined) });

  it("uploads the snapshot and reports no hook when none is configured", async () => {
    const db = await seed();
    const s = store();
    const outcome = await publishSite(db, s, "a@oylab.uz", { hookUrl: null });
    expect(outcome.status).toBe("uploaded");
    expect(s.put).toHaveBeenCalledWith(SNAPSHOT_KEY, expect.stringContaining('"version":1'), "application/json", expect.any(String));
    expect((await listPublishes(db))[0]).toMatchObject({ status: "uploaded", posts: 1, publications: 1 });
  });

  it("triggers the deploy hook and records the build id", async () => {
    const db = await seed();
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: true, result: { build_uuid: "b-1" } }), { status: 200 }));
    const outcome = await publishSite(db, store(), "a@oylab.uz", { hookUrl: "https://hook.example/x", fetch: fetchMock as unknown as typeof fetch });
    expect(outcome).toMatchObject({ status: "triggered", buildId: "b-1" });
    expect(fetchMock).toHaveBeenCalledWith("https://hook.example/x", { method: "POST" });
  });

  it("records a failure when the hook rejects, without throwing", async () => {
    const db = await seed();
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ success: false, errors: [{ message: "nope" }] }), { status: 403 }));
    const outcome = await publishSite(db, store(), "a@oylab.uz", { hookUrl: "https://hook.example/x", fetch: fetchMock as unknown as typeof fetch });
    expect(outcome.status).toBe("failed");
    expect(outcome.message).toContain("403");
    expect((await listPublishes(db))[0].status).toBe("failed");
  });

  it("records a failure when the upload throws", async () => {
    const db = await seed();
    const s = store(); s.put.mockRejectedValueOnce(new Error("R2 down"));
    const outcome = await publishSite(db, s, "a@oylab.uz", { hookUrl: null });
    expect(outcome).toMatchObject({ status: "failed", message: "R2 down" });
  });
});
