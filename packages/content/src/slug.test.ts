import { describe, expect, it } from "vitest";
import { isValidSlug, slugify } from "./slug";

describe("slugify", () => {
  it("lowercases, strips punctuation, joins with hyphens", () => {
    expect(slugify("Hello, World! 2026")).toBe("hello-world-2026");
  });
  it("transliterates Cyrillic", () => {
    expect(slugify("Нейронные сети в Ташкенте")).toBe("neyronnye-seti-v-tashkente");
  });
  it("drops the Uzbek apostrophe", () => {
    expect(slugify("Oʼzbek tili gʼoyalari")).toBe("ozbek-tili-goyalari");
  });
  it("strips diacritics", () => {
    expect(slugify("Café résumé")).toBe("cafe-resume");
  });
  it("trims to 80 chars on a boundary without a trailing hyphen", () => {
    const s = slugify("word ".repeat(40));
    expect(s.length).toBeLessThanOrEqual(80);
    expect(s.endsWith("-")).toBe(false);
    expect(s.startsWith("word-word")).toBe(true);
  });
  it("returns empty string for no usable characters", () => {
    expect(slugify("!!!")).toBe("");
  });
});

describe("isValidSlug", () => {
  it("accepts lowercase words joined by single hyphens", () => {
    expect(isValidSlug("a-b")).toBe(true);
    expect(isValidSlug("post-2026")).toBe(true);
  });
  it("rejects leading hyphens, double hyphens, uppercase and overlength", () => {
    expect(isValidSlug("-a")).toBe(false);
    expect(isValidSlug("a--b")).toBe(false);
    expect(isValidSlug("A")).toBe(false);
    expect(isValidSlug("")).toBe(false);
    expect(isValidSlug("a".repeat(81))).toBe(false);
  });
});
