import type { Snapshot } from "@oylab/content/snapshot";
import { describe, expect, it } from "vitest";
import en from "../../../messages/en.json";
import ru from "../../../messages/ru.json";
import uz from "../../../messages/uz.json";
import { buildSearchIndex } from "./docs";

const snapshot: Snapshot = {
  version: 1,
  generatedAt: 0,
  posts: [
    {
      id: "p1",
      slug: "hello-world",
      primaryLocale: "en",
      publishedAt: Date.UTC(2026, 10, 4),
      cover: null,
      translations: [
        { locale: "en", title: "Hello, world.", summary: "A first note.", bodyHtml: "<p>We opened the <em>lab</em>.</p>", readingMinutes: 1 },
        { locale: "uz", title: "Salom, dunyo.", summary: "Birinchi yozuv.", bodyHtml: "<p>Laboratoriyani ochdik.</p>", readingMinutes: 1 },
      ],
    },
    {
      id: "p0",
      slug: "older",
      primaryLocale: "en",
      publishedAt: Date.UTC(2026, 9, 1),
      cover: null,
      translations: [{ locale: "en", title: "Older note", summary: "", bodyHtml: "<p>Earlier.</p>", readingMinutes: 1 }],
    },
  ],
  publications: [
    {
      id: "b1",
      slug: "tokenizer-economics",
      primaryLocale: "en",
      publishedAt: Date.UTC(2026, 10, 1),
      year: 2026,
      venue: "arXiv",
      authors: [{ name: "A. Researcher" }],
      pdfUrl: null,
      arxivUrl: null,
      codeUrl: null,
      doi: null,
      bibtex: null,
      translations: [{ locale: "en", title: "Tokenizer economics", abstractHtml: "<p>Cost per request.</p>" }],
    },
  ],
};

const empty: Snapshot = { version: 1, generatedAt: 0, posts: [], publications: [] };

describe("buildSearchIndex", () => {
  const index = buildSearchIndex("en", en, snapshot);
  const byId = (id: string) => index.docs.find((d) => d.id === id);

  it("gives every document a unique id, a title and a local href", () => {
    const seen = new Set(index.docs.map((d) => d.id));
    expect(seen.size).toBe(index.docs.length);
    for (const d of index.docs) {
      expect(d.title.trim()).not.toBe("");
      expect(d.href.startsWith("/")).toBe(true);
    }
  });

  it("covers the landing sections and pins the ones the navigation names", () => {
    const pinnedIds = index.docs.filter((d) => d.pinned).map((d) => d.id);
    expect(pinnedIds).toEqual(["home", "mission", "research", "process", "team", "journal", "publications", "contact"]);
    expect(byId("research")?.href).toBe("/#research");
    expect(byId("research:models")?.title).toBe(en.research.areas.models.title);
    expect(byId("process:2")?.subtitle).toContain(en.process.steps[2].phase);
  });

  it("lists people under their own group", () => {
    expect(byId("person:noonosh")).toMatchObject({ group: "people", title: "Noonosh Is", href: "/#team" });
  });

  it("indexes posts newest first with their body as plain text", () => {
    const posts = index.docs.filter((d) => d.id.startsWith("post:")).map((d) => d.id);
    expect(posts).toEqual(["post:hello-world", "post:older"]);
    expect(byId("post:hello-world")).toMatchObject({
      group: "journal",
      title: "Hello, world.",
      text: "A first note. We opened the lab.",
      href: "/journal/hello-world",
    });
  });

  it("indexes publications with authors and abstract", () => {
    expect(byId("publication:tokenizer-economics")).toMatchObject({
      group: "publications",
      subtitle: "arXiv · 2026",
      text: "A. Researcher. Cost per request.",
      href: "/publications/tokenizer-economics",
    });
  });

  it("shows a post in the reader's language, or the primary one when untranslated", () => {
    const uzIndex = buildSearchIndex("uz", uz, snapshot);
    expect(uzIndex.docs.find((d) => d.id === "post:hello-world")?.title).toBe("Salom, dunyo.");
    expect(uzIndex.docs.find((d) => d.id === "post:older")?.title).toBe("Older note");
    const ruIndex = buildSearchIndex("ru", ru, snapshot);
    expect(ruIndex.docs.find((d) => d.id === "post:hello-world")?.title).toBe("Hello, world.");
    expect(ruIndex.docs.find((d) => d.id === "research")?.title).toBe(ru.nav.research);
  });

  it("builds from an empty snapshot", () => {
    const bare = buildSearchIndex("en", en, empty);
    expect(bare.locale).toBe("en");
    expect(bare.docs.some((d) => d.id.startsWith("post:"))).toBe(false);
    expect(bare.docs.find((d) => d.id === "journal")).toBeDefined();
  });
});
