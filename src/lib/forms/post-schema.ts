import { z } from "zod";
import { LOCALES } from "@/db/schema";
import type { FieldErrors, PostInput } from "@/lib/content/types";
import { isValidSlug, SLUG_RULE } from "@/lib/slug";

export const SUMMARY_MAX = 300;
export const BODY_MAX = 500_000;

export const translationSchema = z.object({
  title: z.string().trim().max(200, "Title must be 200 characters or fewer"),
  summary: z.string().trim().max(SUMMARY_MAX, `Summary must be ${SUMMARY_MAX} characters or fewer`),
  bodyMd: z.string().max(BODY_MAX, "Body must be 500,000 characters or fewer"),
});

/** `datetime-local` value or empty string, to unix milliseconds or null. */
export const optionalDate = z
  .string()
  .trim()
  .transform((value, ctx) => {
    if (!value) return null;
    const ms = Date.parse(value);
    if (!Number.isFinite(ms)) {
      ctx.addIssue({ code: "custom", message: "Enter a valid date and time" });
      return z.NEVER;
    }
    return ms;
  });

export const localeSchema = z.enum(LOCALES);

export const postFormSchema = z
  .object({
    id: z.string().min(1),
    slug: z.string().trim().refine(isValidSlug, SLUG_RULE),
    primaryLocale: localeSchema,
    coverMediaId: z.string().trim().transform((v) => v || null),
    publishedAt: optionalDate,
    translations: z.partialRecord(localeSchema, translationSchema),
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

export function toFieldErrors(issues: readonly { path: PropertyKey[]; message: string }[]): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path.map(String).join(".") || "form";
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}

export function formToObject(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

/**
 * Flat form fields (`title_en`, `summary_en`, `body_en`, ...) to a PostInput.
 * A secondary locale is included only when any of its fields has content;
 * the primary locale is always included.
 */
export function parsePostForm(
  raw: Record<string, string | undefined>,
): { ok: true; data: PostInput } | { ok: false; fieldErrors: FieldErrors } {
  const primary = raw.primaryLocale;
  const translations: Record<string, { title: string; summary: string; bodyMd: string }> = {};
  for (const locale of LOCALES) {
    const title = raw[`title_${locale}`] ?? "";
    const summary = raw[`summary_${locale}`] ?? "";
    const bodyMd = raw[`body_${locale}`] ?? "";
    if (locale === primary || title.trim() || summary.trim() || bodyMd.trim()) {
      translations[locale] = { title, summary, bodyMd };
    }
  }
  const result = postFormSchema.safeParse({
    id: raw.id ?? "",
    slug: raw.slug ?? "",
    primaryLocale: primary,
    coverMediaId: raw.coverMediaId ?? "",
    publishedAt: raw.publishedAt ?? "",
    translations,
  });
  if (!result.success) return { ok: false, fieldErrors: toFieldErrors(result.error.issues) };
  return { ok: true, data: result.data };
}
