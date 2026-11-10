import { describe, expect, it } from "vitest";
import { excerpt, highlight } from "./highlight";

const marked = (text: string, tokens: string[]) =>
  highlight(text, tokens)
    .map((segment) => (segment.hit ? `[${segment.text}]` : segment.text))
    .join("");

describe("highlight", () => {
  it("marks a word prefix and keeps the original spelling", () => {
    expect(marked("Open models for Turkic languages", ["mod"])).toBe("Open [mod]els for Turkic languages");
  });

  it("marks every token", () => {
    expect(marked("Open models, open data", ["open", "data"])).toBe("[Open] models, [open] [data]");
  });

  it("marks across an Uzbek apostrophe the query did not type", () => {
    expect(marked("Mashinaviy oʼrganish", ["organ"])).toBe("Mashinaviy [oʼrgan]ish");
  });

  it("marks ё for a query typed with е", () => {
    expect(marked("Вперёд, к моделям", ["вперед"])).toBe("[Вперёд], к моделям");
  });

  it("falls back to a match inside a word when no word starts with the token", () => {
    expect(marked("Tokenization", ["ization"])).toBe("Token[ization]");
  });

  it("returns the text whole when nothing matches", () => {
    expect(highlight("Research", ["zzz"])).toEqual([{ text: "Research", hit: false }]);
    expect(highlight("Research", [])).toEqual([{ text: "Research", hit: false }]);
  });

  it("merges overlapping matches", () => {
    expect(marked("Research", ["res", "resea"])).toBe("[Resea]rch");
  });
});

describe("excerpt", () => {
  const body =
    "We opened the lab in Tashkent last spring. The first year went into data: collecting, cleaning and " +
    "aligning Uzbek text in two scripts. Only then did we train anything. Quantization came later, when " +
    "the models had to run on the hardware people here actually have.";

  it("cuts a window around the first match and marks the cut ends", () => {
    const text = excerpt(body, ["quantization"], 60);
    expect(text).toContain("Quantization");
    expect(text.startsWith("…")).toBe(true);
    expect(text.length).toBeLessThan(body.length);
  });

  it("does not cut words in half", () => {
    const text = excerpt(body, ["scripts"], 40);
    for (const word of text.replace(/…/g, "").trim().split(/\s+/)) expect(body).toContain(word);
  });

  it("starts at the beginning when the match is near it or missing", () => {
    expect(excerpt(body, ["opened"], 60).startsWith("We opened")).toBe(true);
    expect(excerpt(body, ["zzz"], 60).startsWith("We opened")).toBe(true);
  });

  it("returns short text untouched", () => {
    expect(excerpt("Short body.", ["body"], 60)).toBe("Short body.");
  });
});
