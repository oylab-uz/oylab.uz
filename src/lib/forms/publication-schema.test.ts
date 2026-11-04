import { describe, expect, it } from "vitest";
import { parsePublicationForm } from "./publication-schema";

const base = {
  id: "pub1",
  slug: "oydin-7b",
  primaryLocale: "en",
  publishedAt: "",
  year: "2025",
  venue: "arXiv preprint",
  authors_json: JSON.stringify([{ name: "Dilnoza Rahimova", url: "https://example.org/d" }, { name: "Bekzod Yusupov", url: "" }]),
  pdfUrl: "https://arxiv.org/pdf/1.pdf",
  arxivUrl: "",
  codeUrl: "",
  doi: "",
  bibtex: "@article{x}",
  title_en: "Oydin",
  abstract_en: "An *open* model.",
};

describe("parsePublicationForm", () => {
  it("parses a valid form into a PublicationInput", () => {
    const r = parsePublicationForm(base);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.data).toMatchObject({ id: "pub1", slug: "oydin-7b", year: 2025, venue: "arXiv preprint", arxivUrl: null, doi: null });
      expect(r.data.authors).toEqual([{ name: "Dilnoza Rahimova", url: "https://example.org/d" }, { name: "Bekzod Yusupov" }]);
      expect(r.data.translations).toEqual({ en: { title: "Oydin", abstractMd: "An *open* model." } });
    }
  });
  it("requires a year between 1990 and 2100", () => {
    expect(parsePublicationForm({ ...base, year: "1980" }).ok).toBe(false);
    expect(parsePublicationForm({ ...base, year: "abc" }).ok).toBe(false);
    const r = parsePublicationForm({ ...base, year: "2101" });
    if (!r.ok) expect(r.fieldErrors.year).toBeTruthy();
  });
  it("requires at least one author with a name", () => {
    const r = parsePublicationForm({ ...base, authors_json: JSON.stringify([{ name: "  " }]) });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors.authors).toBeTruthy();
    expect(parsePublicationForm({ ...base, authors_json: "not json" }).ok).toBe(false);
  });
  it("requires https URLs for links", () => {
    const r = parsePublicationForm({ ...base, pdfUrl: "http://insecure.example/x.pdf" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors.pdfUrl).toContain("https://");
  });
  it("validates the DOI pattern when given", () => {
    expect(parsePublicationForm({ ...base, doi: "10.1000/xyz123" }).ok).toBe(true);
    const r = parsePublicationForm({ ...base, doi: "doi:10.1000/xyz" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors.doi).toBeTruthy();
  });
  it("rejects a translation with an abstract but no title", () => {
    const r = parsePublicationForm({ ...base, abstract_ru: "Аннотация" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.fieldErrors["translations.ru.title"]).toBeTruthy();
  });
});
