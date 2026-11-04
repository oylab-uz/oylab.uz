import type { Locale } from "@oylab/content/locales";

export type Status = "draft" | "published";
export type Author = { name: string; url?: string };
export type FieldErrors = Record<string, string>;
export type SaveResult = { ok: true } | { ok: false; fieldErrors: FieldErrors };
export type SaveContext = { email: string; mediaOrigin: string };

export type PostCard = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: number | null;
  readingMinutes: number;
  /** Locale of the text shown; equals the requested locale unless `fallback`. */
  locale: Locale;
  fallback: boolean;
  coverUrl: string | null;
  coverAlt: string | null;
};

export type PostPage = PostCard & {
  bodyHtml: string;
  primaryLocale: Locale;
  availableLocales: Locale[];
};

export type PostAdminRow = {
  id: string;
  slug: string;
  status: Status;
  primaryLocale: Locale;
  title: string;
  locales: Locale[];
  updatedAt: number;
  updatedBy: string;
};

export type TranslationInput = { title: string; summary: string; bodyMd: string };

export type PostInput = {
  id: string;
  slug: string;
  primaryLocale: Locale;
  coverMediaId: string | null;
  publishedAt: number | null;
  translations: Partial<Record<Locale, TranslationInput>>;
};

export type PublicationCard = {
  id: string;
  slug: string;
  title: string;
  year: number;
  venue: string;
  authors: Author[];
  pdfUrl: string | null;
  arxivUrl: string | null;
  codeUrl: string | null;
  doi: string | null;
  publishedAt: number | null;
  locale: Locale;
  fallback: boolean;
};

export type PublicationPage = PublicationCard & {
  abstractHtml: string;
  bibtex: string | null;
  primaryLocale: Locale;
  availableLocales: Locale[];
};

export type PublicationAdminRow = {
  id: string;
  slug: string;
  status: Status;
  primaryLocale: Locale;
  title: string;
  year: number;
  locales: Locale[];
  updatedAt: number;
  updatedBy: string;
};

export type PublicationTranslationInput = { title: string; abstractMd: string };

export type PublicationInput = {
  id: string;
  slug: string;
  primaryLocale: Locale;
  publishedAt: number | null;
  year: number;
  venue: string;
  authors: Author[];
  pdfUrl: string | null;
  arxivUrl: string | null;
  codeUrl: string | null;
  doi: string | null;
  bibtex: string | null;
  translations: Partial<Record<Locale, PublicationTranslationInput>>;
};
