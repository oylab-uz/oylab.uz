import { describe, expect, it } from "vitest";
import { resolveTranslation } from "./resolve";

const rows = [
  { locale: "en" as const, title: "English" },
  { locale: "ru" as const, title: "Русский" },
];

describe("resolveTranslation", () => {
  it("returns the exact locale without fallback", () => {
    expect(resolveTranslation(rows, "ru", "en")).toEqual({ row: rows[1], fallback: false });
  });
  it("falls back to the primary locale when the requested one is missing", () => {
    expect(resolveTranslation(rows, "uz", "en")).toEqual({ row: rows[0], fallback: true });
  });
  it("returns null when there are no rows", () => {
    expect(resolveTranslation([], "en", "en")).toBeNull();
  });
  it("falls back to any row when even the primary is missing", () => {
    expect(resolveTranslation([rows[1]], "uz", "en")).toEqual({ row: rows[1], fallback: true });
  });
});
