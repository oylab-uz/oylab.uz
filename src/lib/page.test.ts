import { describe, expect, it } from "vitest";
import { parsePage } from "./page";

describe("parsePage", () => {
  it("defaults to 1", () => {
    expect(parsePage(undefined, 5)).toBe(1);
    expect(parsePage("", 5)).toBe(1);
  });
  it("clamps zero, negatives and garbage to 1", () => {
    expect(parsePage("0", 5)).toBe(1);
    expect(parsePage("-3", 5)).toBe(1);
    expect(parsePage("abc", 5)).toBe(1);
    expect(parsePage("1.7", 5)).toBe(1);
  });
  it("clamps to the last page", () => {
    expect(parsePage("3", 2)).toBe(2);
    expect(parsePage("999999", 7)).toBe(7);
  });
  it("keeps a valid page", () => {
    expect(parsePage("2", 5)).toBe(2);
  });
  it("takes the first element of a repeated param", () => {
    expect(parsePage(["3", "9"], 5)).toBe(3);
  });
  it("never returns below 1 even when pages is 0", () => {
    expect(parsePage("4", 0)).toBe(1);
  });
});
