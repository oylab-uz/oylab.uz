import type { Locale } from "@oylab/content/locales";
import {
  resolveTranslation,
  type Snapshot,
  type SnapshotAuthor,
  type SnapshotPost,
  type SnapshotPublication,
} from "@oylab/content/snapshot";
import snapshotJson from "../../content/snapshot.json";

/** Written by scripts/fetch-snapshot.mjs before every build and dev start. */
const snapshot = snapshotJson as Snapshot;

export function getSnapshot(): Snapshot {
  return snapshot;
}

export type PostCard = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: number;
  readingMinutes: number;
  /** Locale of the text shown; differs from the requested one when `fallback`. */
  locale: Locale;
  fallback: boolean;
  cover: SnapshotPost["cover"];
};

export type PostPage = PostCard & { bodyHtml: string; primaryLocale: Locale; availableLocales: Locale[] };

export type PublicationCard = {
  id: string;
  slug: string;
  title: string;
  year: number;
  venue: string;
  authors: SnapshotAuthor[];
  pdfUrl: string | null;
  arxivUrl: string | null;
  codeUrl: string | null;
  doi: string | null;
  publishedAt: number;
  locale: Locale;
  fallback: boolean;
};

export type PublicationPage = PublicationCard & {
  abstractHtml: string;
  bibtex: string | null;
  primaryLocale: Locale;
  availableLocales: Locale[];
};

function postCard(post: SnapshotPost, locale: Locale): PostCard | null {
  const resolved = resolveTranslation(post.translations, locale, post.primaryLocale);
  if (!resolved) return null;
  const { row, fallback } = resolved;
  return {
    id: post.id,
    slug: post.slug,
    title: row.title,
    summary: row.summary,
    publishedAt: post.publishedAt,
    readingMinutes: row.readingMinutes,
    locale: row.locale,
    fallback,
    cover: post.cover,
  };
}

function publicationCard(publication: SnapshotPublication, locale: Locale): PublicationCard | null {
  const resolved = resolveTranslation(publication.translations, locale, publication.primaryLocale);
  if (!resolved) return null;
  const { row, fallback } = resolved;
  return {
    id: publication.id,
    slug: publication.slug,
    title: row.title,
    year: publication.year,
    venue: publication.venue,
    authors: publication.authors,
    pdfUrl: publication.pdfUrl,
    arxivUrl: publication.arxivUrl,
    codeUrl: publication.codeUrl,
    doi: publication.doi,
    publishedAt: publication.publishedAt,
    locale: row.locale,
    fallback,
  };
}

const byDate = <T extends { publishedAt: number }>(a: T, b: T) => b.publishedAt - a.publishedAt;

export function listPosts(locale: Locale): PostCard[] {
  return [...snapshot.posts]
    .sort(byDate)
    .map((p) => postCard(p, locale))
    .filter((c): c is PostCard => c !== null);
}

export function latestPosts(locale: Locale, limit: number): PostCard[] {
  return listPosts(locale).slice(0, limit);
}

/**
 * A static export refuses a dynamic route with no params. With no content yet,
 * one placeholder slug is generated; its page renders the 404 view.
 */
export const PLACEHOLDER_SLUG = "_";

export function staticSlugs(slugs: string[]): { slug: string }[] {
  return (slugs.length ? slugs : [PLACEHOLDER_SLUG]).map((slug) => ({ slug }));
}

export function postSlugs(): string[] {
  return snapshot.posts.map((p) => p.slug);
}

export function getPost(slug: string, locale: Locale): PostPage | null {
  const post = snapshot.posts.find((p) => p.slug === slug);
  if (!post) return null;
  const card = postCard(post, locale);
  if (!card) return null;
  const shown = post.translations.find((t) => t.locale === card.locale);
  return {
    ...card,
    bodyHtml: shown?.bodyHtml ?? "",
    primaryLocale: post.primaryLocale,
    availableLocales: post.translations.map((t) => t.locale),
  };
}

export function publicationGroups(locale: Locale): { year: number; items: PublicationCard[] }[] {
  const cards = [...snapshot.publications]
    .sort((a, b) => b.year - a.year || byDate(a, b))
    .map((p) => publicationCard(p, locale))
    .filter((c): c is PublicationCard => c !== null);
  const groups: { year: number; items: PublicationCard[] }[] = [];
  for (const card of cards) {
    const group = groups.find((g) => g.year === card.year);
    if (group) group.items.push(card);
    else groups.push({ year: card.year, items: [card] });
  }
  return groups;
}

export function latestPublications(locale: Locale, limit: number): PublicationCard[] {
  return publicationGroups(locale).flatMap((g) => g.items).slice(0, limit);
}

export function publicationSlugs(): string[] {
  return snapshot.publications.map((p) => p.slug);
}

export function getPublication(slug: string, locale: Locale): PublicationPage | null {
  const publication = snapshot.publications.find((p) => p.slug === slug);
  if (!publication) return null;
  const card = publicationCard(publication, locale);
  if (!card) return null;
  const shown = publication.translations.find((t) => t.locale === card.locale);
  return {
    ...card,
    abstractHtml: shown?.abstractHtml ?? "",
    bibtex: publication.bibtex,
    primaryLocale: publication.primaryLocale,
    availableLocales: publication.translations.map((t) => t.locale),
  };
}
