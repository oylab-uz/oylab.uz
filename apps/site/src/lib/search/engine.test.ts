import { describe, expect, it } from "vitest";
import type { SearchDoc } from "./docs";
import { pinned, prepare, search } from "./engine";

const doc = (id: string, title: string, text = "", extra: Partial<SearchDoc> = {}): SearchDoc => ({
  id,
  group: "sections",
  title,
  subtitle: "",
  text,
  href: `/#${id}`,
  ...extra,
});

const docs = prepare([
  doc("research", "Research", "Four questions we keep returning to.", { pinned: true }),
  doc("models", "Open models for Turkic languages", "Pretraining, tokenization and evaluation for Uzbek.", {
    subtitle: "Research",
  }),
  doc("systems", "Efficient systems", "Training and serving on the hardware we actually have: quantization."),
  doc("post", "Hello, world. Hello, Tashkent.", "We opened the lab in Tashkent. Mashinaviy oʼrganish boshlandi.", {
    group: "journal",
  }),
  doc("ru", "Исследования", "Вперёд, к открытым моделям."),
]);

const ids = (query: string) => search(docs, query).map((hit) => hit.doc.id);

describe("search", () => {
  it("returns nothing for an empty query", () => {
    expect(search(docs, "   ")).toEqual([]);
  });

  it("ranks a title match above a subtitle match above a body match", () => {
    expect(ids("research")).toEqual(["research", "models"]);
    expect(ids("tashkent")).toEqual(["post"]);
  });

  it("ranks a word start above a match inside a word", () => {
    expect(ids("training")).toEqual(["systems", "models"]);
  });

  it("matches word prefixes", () => {
    expect(ids("quant")).toEqual(["systems"]);
    expect(ids("tokeniz")).toEqual(["models"]);
  });

  it("needs every word of the query", () => {
    expect(ids("open models")).toEqual(["models"]);
    expect(ids("models quantization")).toEqual([]);
  });

  it("puts a whole-word title hit before a prefix hit", () => {
    const set = prepare([doc("a", "Opening remarks"), doc("b", "Open models")]);
    expect(search(set, "open").map((hit) => hit.doc.id)).toEqual(["b", "a"]);
  });

  it("finds Uzbek words however the apostrophe is typed", () => {
    expect(ids("o'rganish")).toEqual(["post"]);
    expect(ids("organish")).toEqual(["post"]);
  });

  it("finds Russian words across ё and е", () => {
    expect(ids("вперед")).toEqual(["ru"]);
    expect(ids("исслед")).toEqual(["ru"]);
  });

  it("forgives one typo in a title word", () => {
    expect(ids("reserch")).toEqual(["research"]);
    expect(ids("eficient")).toEqual(["systems"]);
  });

  it("does not forgive typos in short words", () => {
    expect(ids("opem")).toEqual([]);
  });

  it("does not take a short word that starts like a title for a typo", () => {
    expect(ids("reset")).toEqual([]);
  });

  it("ranks what was typed above a guessed title", () => {
    const set = prepare([doc("guess", "Tokenizer economics"), doc("exact", "A note", "We count tokens.")]);
    expect(search(set, "tokens").map((hit) => hit.doc.id)).toEqual(["exact", "guess"]);
  });

  it("returns an excerpt around the first body match", () => {
    const [hit] = search(docs, "quantization");
    expect(hit.excerpt).toContain("quantization");
  });

  it("uses the start of the body as the excerpt when only the title matched", () => {
    const [hit] = search(docs, "efficient");
    expect(hit.excerpt.startsWith("Training and serving")).toBe(true);
  });

  it("honours the limit", () => {
    const many = prepare(Array.from({ length: 30 }, (_, i) => doc(`d${i}`, `Moon note ${i}`)));
    expect(search(many, "moon", 12)).toHaveLength(12);
  });
});

describe("pinned", () => {
  it("lists the documents offered before anything is typed", () => {
    expect(pinned(docs).map((hit) => hit.doc.id)).toEqual(["research"]);
  });
});
