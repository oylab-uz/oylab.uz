import { describe, expect, it } from "vitest";
import { parsePostForm } from "./post-schema";

const base = {
  id: "p1",
  slug: "hello-world",
  primaryLocale: "en",
  coverMediaId: "",
  publishedAt: "",
  title_en: "Hello",
  summary_en: "Short",
  body_en: "Body",
};

describe("parsePostForm", () => {
  it("parses a valid form into a PostInput", () => {
    const r = parsePostForm({ ...base, publishedAt: "2026-11-04T10:00" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toMatchObject({ id: "p1", slug: "hello-world", primaryLocale: "en", coverMediaId: null });
      expect(r.data.publishedAt).toBe(Date.parse("2026-11-04T10:00"));
      expect(r.data.translations).toEqual({ en: { title: "Hello", summary: "Short", bodyMd: "Body" } });
    }
  });
  it("includes a secondary locale only when it has content", () => {
    const r = parsePostForm({ ...base, title_ru: "", summary_ru: "", body_ru: "" });
    expect(r.ok && Object.keys(r.data.translations)).toEqual(["en"]);
  });
  it("rejects a translation with a body but no title", () => {
    const r = parsePostForm({ ...base, body_ru: "Тело" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors["translations.ru.title"]).toBeTruthy();
  });
  it("rejects a body over 500,000 characters and names the limit", () => {
    const r = parsePostForm({ ...base, body_en: "x".repeat(500_001) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors["translations.en.bodyMd"]).toContain("500,000");
  });
  it("rejects a summary over 300 characters", () => {
    const r = parsePostForm({ ...base, summary_en: "s".repeat(301) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors["translations.en.summary"]).toContain("300");
  });
  it("rejects an invalid slug", () => {
    const r = parsePostForm({ ...base, slug: "Bad Slug" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors.slug).toBeTruthy();
  });
  it("rejects an unparsable date", () => {
    const r = parsePostForm({ ...base, publishedAt: "yesterday" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors.publishedAt).toBeTruthy();
  });
  it("keeps a cover media id when given", () => {
    const r = parsePostForm({ ...base, coverMediaId: "m1" });
    expect(r.ok && r.data.coverMediaId).toBe("m1");
  });
});
