import { describe, expect, it } from "vitest";
import { fold, foldWithMap, queryTokens } from "./fold";

describe("fold", () => {
  it("lowercases and turns punctuation into single spaces", () => {
    expect(fold("  Hello, world. Hello — Tashkent!  ")).toBe("hello world hello tashkent");
  });

  it("drops every apostrophe Uzbek Latin is typed with", () => {
    for (const spelling of ["Oʼzbek", "Oʻzbek", "O'zbek", "O’zbek", "O‘zbek", "O`zbek", "Ozbek"]) {
      expect(fold(spelling)).toBe("ozbek");
    }
    expect(fold("mashinaviy oʼrganish")).toBe("mashinaviy organish");
  });

  it("strips Latin diacritics", () => {
    expect(fold("Café Zürich naïve")).toBe("cafe zurich naive");
  });

  it("folds ё to е but leaves й and the Uzbek Cyrillic letters alone", () => {
    expect(fold("Ёлка вперёд")).toBe("елка вперед");
    expect(fold("Мой Ўзбекистон қишлоғи")).toBe("мой ўзбекистон қишлоғи");
  });

  it("does not let invisible characters split a word", () => {
    expect(fold("to\u00ADken\u200Bizer")).toBe("tokenizer");
  });

  it("composes a decomposed query", () => {
    expect(fold("мои\u0306")).toBe("мой");
  });

  it("keeps the map in step past letters outside the BMP", () => {
    const text = "𝐀 moon";
    const { folded, map } = foldWithMap(text);
    expect(map).toHaveLength(folded.length);
    expect(text.slice(map[folded.indexOf("moon")])).toBe("moon");
  });

  it("keeps digits", () => {
    expect(fold("GPT-4 in 2026")).toBe("gpt 4 in 2026");
  });

  it("maps every folded character back to where it came from", () => {
    const text = "Oʼzbek tili!";
    const { folded, map } = foldWithMap(text);
    expect(folded).toBe("ozbek tili");
    expect(map).toHaveLength(folded.length);
    expect(text[map[0]]).toBe("O");
    expect(text[map[1]]).toBe("z");
    expect(text[map[5]]).toBe(" ");
    expect(text[map[6]]).toBe("t");
  });
});

describe("queryTokens", () => {
  it("splits, folds and removes duplicates", () => {
    expect(queryTokens("  Open  open MODELS, oʼzbek ")).toEqual(["open", "models", "ozbek"]);
  });

  it("is empty for a query with no letters", () => {
    expect(queryTokens(" ?! ")).toEqual([]);
  });
});
