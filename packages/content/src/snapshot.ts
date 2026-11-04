import type { Locale } from "./locales";

/**
 * The contract between the admin and the static site. The admin writes it to
 * R2 at `snapshot/content.json` on every publish; the site build downloads it
 * before `next build`. Published content only, HTML already rendered.
 */
export type SnapshotTranslation = {
  locale: Locale;
  title: string;
  summary: string;
  bodyHtml: string;
  readingMinutes: number;
};

export type SnapshotPost = {
  id: string;
  slug: string;
  primaryLocale: Locale;
  /** Unix milliseconds. */
  publishedAt: number;
  cover: { url: string; alt: string; width: number | null; height: number | null } | null;
  translations: SnapshotTranslation[];
};

export type SnapshotAuthor = { name: string; url?: string };

export type SnapshotPublicationTranslation = { locale: Locale; title: string; abstractHtml: string };

export type SnapshotPublication = {
  id: string;
  slug: string;
  primaryLocale: Locale;
  publishedAt: number;
  year: number;
  venue: string;
  authors: SnapshotAuthor[];
  pdfUrl: string | null;
  arxivUrl: string | null;
  codeUrl: string | null;
  doi: string | null;
  bibtex: string | null;
  translations: SnapshotPublicationTranslation[];
};

export type Snapshot = {
  version: 1;
  /** Unix milliseconds. */
  generatedAt: number;
  posts: SnapshotPost[];
  publications: SnapshotPublication[];
};

export const EMPTY_SNAPSHOT: Snapshot = { version: 1, generatedAt: 0, posts: [], publications: [] };

/** The translation to show: the requested locale, else the primary, else whatever exists. */
export function resolveTranslation<T extends { locale: Locale }>(
  rows: readonly T[],
  locale: Locale,
  primaryLocale: Locale,
): { row: T; fallback: boolean } | null {
  const exact = rows.find((r) => r.locale === locale);
  if (exact) return { row: exact, fallback: false };
  const primary = rows.find((r) => r.locale === primaryLocale) ?? rows[0];
  return primary ? { row: primary, fallback: true } : null;
}
