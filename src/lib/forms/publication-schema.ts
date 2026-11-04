import { z } from "zod";
import { LOCALES } from "@/db/schema";
import type { Author, FieldErrors, PublicationInput } from "@/lib/content/types";
import { isValidSlug, SLUG_RULE } from "@/lib/slug";
import { localeSchema, optionalDate, toFieldErrors } from "./post-schema";

export const ABSTRACT_MAX = 20_000;

const optionalHttpsUrl = z
  .string()
  .trim()
  .transform((v) => v || null)
  .refine((v) => v === null || /^https:\/\/\S+$/.test(v), "Links must start with https://");

const optionalDoi = z
  .string()
  .trim()
  .transform((v) => v || null)
  .refine((v) => v === null || /^10\.\S+$/.test(v), "A DOI looks like 10.1000/xyz123");

const authorSchema = z.object({
  name: z.string().trim().min(1, "Every author needs a name"),
  url: optionalHttpsUrl.optional(),
});

export const publicationTranslationSchema = z.object({
  title: z.string().trim().max(300, "Title must be 300 characters or fewer"),
  abstractMd: z.string().max(ABSTRACT_MAX, "Abstract must be 20,000 characters or fewer"),
});

export const publicationFormSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().trim().refine(isValidSlug, SLUG_RULE),
    primaryLocale: localeSchema,
    publishedAt: optionalDate,
    year: z.coerce.number().int("Year must be a whole number").min(1990, "Year must be 1990 or later").max(2100, "Year must be 2100 or earlier"),
    venue: z.string().trim().max(200),
    authors: z.array(authorSchema).min(1, "Add at least one author"),
    pdfUrl: optionalHttpsUrl,
    arxivUrl: optionalHttpsUrl,
    codeUrl: optionalHttpsUrl,
    doi: optionalDoi,
    bibtex: z.string().trim().max(20_000).transform((v) => v || null),
    translations: z.partialRecord(localeSchema, publicationTranslationSchema),
  })
  .superRefine((data, ctx) => {
    for (const locale of LOCALES) {
      const t = data.translations[locale];
      if (t && !t.title) {
        ctx.addIssue({ code: "custom", path: ["translations", locale, "title"], message: "Title is required" });
      }
    }
    if (!data.translations[data.primaryLocale]) {
      ctx.addIssue({
        code: "custom",
        path: ["translations", data.primaryLocale, "title"],
        message: "The primary language needs a title",
      });
    }
  });

function parseAuthorsJson(json: string | undefined): { ok: true; authors: unknown } | { ok: false } {
  try {
    const value: unknown = JSON.parse(json ?? "[]");
    return Array.isArray(value) ? { ok: true, authors: value } : { ok: false };
  } catch {
    return { ok: false };
  }
}

export function parsePublicationForm(
  raw: Record<string, string | undefined>,
): { ok: true; data: PublicationInput } | { ok: false; fieldErrors: FieldErrors } {
  const primary = raw.primaryLocale;
  const translations: Record<string, { title: string; abstractMd: string }> = {};
  for (const locale of LOCALES) {
    const title = raw[`title_${locale}`] ?? "";
    const abstractMd = raw[`abstract_${locale}`] ?? "";
    if (locale === primary || title.trim() || abstractMd.trim()) translations[locale] = { title, abstractMd };
  }
  const authors = parseAuthorsJson(raw.authors_json);
  if (!authors.ok) return { ok: false, fieldErrors: { authors: "Authors must be a list of names" } };

  const result = publicationFormSchema.safeParse({
    id: raw.id ?? "",
    slug: raw.slug ?? "",
    primaryLocale: primary,
    publishedAt: raw.publishedAt ?? "",
    year: raw.year ?? "",
    venue: raw.venue ?? "",
    authors: authors.authors,
    pdfUrl: raw.pdfUrl ?? "",
    arxivUrl: raw.arxivUrl ?? "",
    codeUrl: raw.codeUrl ?? "",
    doi: raw.doi ?? "",
    bibtex: raw.bibtex ?? "",
    translations,
  });
  if (!result.success) {
    const fieldErrors = toFieldErrors(result.error.issues);
    // Author issues carry an index in their path; the form shows one message for the field.
    for (const key of Object.keys(fieldErrors)) {
      if (key.startsWith("authors.")) {
        fieldErrors.authors ??= fieldErrors[key];
        delete fieldErrors[key];
      }
    }
    return { ok: false, fieldErrors };
  }
  const data: PublicationInput = {
    ...result.data,
    authors: result.data.authors.map((a): Author => (a.url ? { name: a.name, url: a.url } : { name: a.name })),
  };
  return { ok: true, data };
}
