import { and, desc, eq, inArray, ne, notInArray } from "drizzle-orm";
import type { Db } from "@/db";
import {
  publications,
  publicationTranslations,
  type Publication,
  type PublicationTranslation,
} from "@/db/schema";
import { LOCALES, type Locale } from "@oylab/content/locales";
import { renderMarkdown } from "@oylab/content/markdown";
import { isValidSlug, SLUG_RULE } from "@oylab/content/slug";
import { resolveTranslation } from "@oylab/content/snapshot";
import type {
  Author,
  FieldErrors,
  PublicationAdminRow,
  PublicationCard,
  PublicationInput,
  PublicationPage,
  SaveContext,
  SaveResult,
  Status,
} from "./types";

const NOT_FOUND: SaveResult = { ok: false, fieldErrors: { id: "Publication not found" } };

export function parseAuthors(json: string): Author[] {
  try {
    const value: unknown = JSON.parse(json);
    if (!Array.isArray(value)) return [];
    return value
      .filter((a): a is Author => typeof a === "object" && a !== null && typeof (a as Author).name === "string")
      .map((a) => (a.url ? { name: a.name, url: a.url } : { name: a.name }));
  } catch {
    return [];
  }
}

export async function createDraftPublication(
  db: Db,
  { primaryLocale, email }: { primaryLocale: Locale; email: string },
): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const now = Date.now();
  await db.insert(publications).values({
    id,
    slug: `untitled-${id.slice(0, 8)}`,
    primaryLocale,
    status: "draft",
    year: new Date().getFullYear(),
    createdAt: now,
    updatedAt: now,
    updatedBy: email,
  });
  await db.insert(publicationTranslations).values({ publicationId: id, locale: primaryLocale, updatedAt: now });
  return { id };
}

export async function getPublicationAdmin(
  db: Db,
  id: string,
): Promise<{ publication: Publication; translations: PublicationTranslation[] } | null> {
  const publication = await db.select().from(publications).where(eq(publications.id, id)).get();
  if (!publication) return null;
  const translations = await db
    .select()
    .from(publicationTranslations)
    .where(eq(publicationTranslations.publicationId, id));
  return { publication, translations };
}

async function slugError(db: Db, id: string, slug: string, status: Status, currentSlug: string) {
  if (!isValidSlug(slug)) return SLUG_RULE;
  if (status === "published" && slug !== currentSlug) return "Locked after publishing";
  const clash = await db
    .select({ id: publications.id })
    .from(publications)
    .where(and(eq(publications.slug, slug), ne(publications.id, id)))
    .get();
  return clash ? "Another publication uses this slug" : null;
}

export async function savePublication(
  db: Db,
  input: PublicationInput,
  ctx: SaveContext,
): Promise<SaveResult> {
  const existing = await db.select().from(publications).where(eq(publications.id, input.id)).get();
  if (!existing) return NOT_FOUND;

  const fieldErrors: FieldErrors = {};
  const slugProblem = await slugError(db, input.id, input.slug, existing.status, existing.slug);
  if (slugProblem) fieldErrors.slug = slugProblem;
  if (!input.translations[input.primaryLocale]) {
    fieldErrors[`translations.${input.primaryLocale}.title`] = "The primary language needs a translation";
  }
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const now = Date.now();
  const publishedAt = input.publishedAt ?? (existing.status === "published" ? existing.publishedAt : null);
  try {
  await db
    .update(publications)
    .set({
      slug: input.slug,
      primaryLocale: input.primaryLocale,
      publishedAt,
      year: input.year,
      venue: input.venue,
      authorsJson: JSON.stringify(input.authors),
      pdfUrl: input.pdfUrl,
      arxivUrl: input.arxivUrl,
      codeUrl: input.codeUrl,
      doi: input.doi,
      bibtex: input.bibtex,
      updatedAt: now,
      updatedBy: ctx.email,
    })
    .where(eq(publications.id, input.id));
  } catch (error) {
    if (String(error).includes("UNIQUE")) return { ok: false, fieldErrors: { slug: "Another publication uses this slug" } };
    throw error;
  }

  const kept: Locale[] = [];
  for (const locale of LOCALES) {
    const t = input.translations[locale];
    if (!t) continue;
    kept.push(locale);
    const { html } = await renderMarkdown(t.abstractMd, { mediaOrigin: ctx.mediaOrigin });
    const row = { title: t.title, abstractMd: t.abstractMd, abstractHtml: html, updatedAt: now };
    await db
      .insert(publicationTranslations)
      .values({ publicationId: input.id, locale, ...row })
      .onConflictDoUpdate({
        target: [publicationTranslations.publicationId, publicationTranslations.locale],
        set: row,
      });
  }
  await db
    .delete(publicationTranslations)
    .where(
      and(eq(publicationTranslations.publicationId, input.id), notInArray(publicationTranslations.locale, kept)),
    );
  return { ok: true };
}

export async function publishPublication(db: Db, id: string, email: string): Promise<SaveResult> {
  const found = await getPublicationAdmin(db, id);
  if (!found) return NOT_FOUND;
  const { publication, translations } = found;
  const primary = translations.find((t) => t.locale === publication.primaryLocale);
  const fieldErrors: FieldErrors = {};
  const slugProblem = await slugError(db, id, publication.slug, "draft", publication.slug);
  if (slugProblem) fieldErrors.slug = slugProblem;
  if (!primary?.title.trim()) {
    fieldErrors[`translations.${publication.primaryLocale}.title`] = "A title is required to publish";
  }
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const now = Date.now();
  await db
    .update(publications)
    .set({ status: "published", publishedAt: publication.publishedAt ?? now, updatedAt: now, updatedBy: email })
    .where(eq(publications.id, id));
  return { ok: true };
}

export async function unpublishPublication(db: Db, id: string, email: string): Promise<SaveResult> {
  const existing = await db.select({ id: publications.id }).from(publications).where(eq(publications.id, id)).get();
  if (!existing) return NOT_FOUND;
  await db
    .update(publications)
    .set({ status: "draft", updatedAt: Date.now(), updatedBy: email })
    .where(eq(publications.id, id));
  return { ok: true };
}

export async function deletePublication(db: Db, id: string): Promise<SaveResult> {
  const existing = await db
    .select({ status: publications.status })
    .from(publications)
    .where(eq(publications.id, id))
    .get();
  if (!existing) return NOT_FOUND;
  if (existing.status === "published") return { ok: false, fieldErrors: { status: "Unpublish first" } };
  await db.delete(publications).where(eq(publications.id, id));
  return { ok: true };
}

function toCard(
  publication: Publication,
  translations: PublicationTranslation[],
  locale: Locale,
): PublicationCard | null {
  const resolved = resolveTranslation(translations, locale, publication.primaryLocale);
  if (!resolved) return null;
  const { row, fallback } = resolved;
  return {
    id: publication.id,
    slug: publication.slug,
    title: row.title,
    year: publication.year,
    venue: publication.venue,
    authors: parseAuthors(publication.authorsJson),
    pdfUrl: publication.pdfUrl,
    arxivUrl: publication.arxivUrl,
    codeUrl: publication.codeUrl,
    doi: publication.doi,
    publishedAt: publication.publishedAt,
    locale: row.locale,
    fallback,
  };
}

async function translationsFor(db: Db, ids: string[]): Promise<PublicationTranslation[]> {
  if (ids.length === 0) return [];
  return db
    .select()
    .from(publicationTranslations)
    .where(inArray(publicationTranslations.publicationId, ids));
}

export async function listPublishedPublications(
  db: Db,
  locale: Locale,
): Promise<{ year: number; items: PublicationCard[] }[]> {
  const rows = await db
    .select()
    .from(publications)
    .where(eq(publications.status, "published"))
    .orderBy(desc(publications.year), desc(publications.publishedAt), desc(publications.createdAt));
  const translations = await translationsFor(db, rows.map((r) => r.id));
  const groups: { year: number; items: PublicationCard[] }[] = [];
  for (const publication of rows) {
    const card = toCard(publication, translations.filter((t) => t.publicationId === publication.id), locale);
    if (!card) continue;
    const group = groups.find((g) => g.year === card.year);
    if (group) group.items.push(card);
    else groups.push({ year: card.year, items: [card] });
  }
  return groups;
}


export async function getPublishedPublication(
  db: Db,
  slug: string,
  locale: Locale,
): Promise<PublicationPage | null> {
  const publication = await db
    .select()
    .from(publications)
    .where(and(eq(publications.slug, slug), eq(publications.status, "published")))
    .get();
  if (!publication) return null;
  const translations = await translationsFor(db, [publication.id]);
  const card = toCard(publication, translations, locale);
  if (!card) return null;
  const shown = translations.find((t) => t.locale === card.locale);
  return {
    ...card,
    abstractHtml: shown?.abstractHtml ?? "",
    bibtex: publication.bibtex,
    primaryLocale: publication.primaryLocale,
    availableLocales: translations.map((t) => t.locale),
  };
}

export async function listPublicationsAdmin(
  db: Db,
  { status }: { status?: Status },
): Promise<PublicationAdminRow[]> {
  const rows = await db
    .select()
    .from(publications)
    .where(status ? eq(publications.status, status) : undefined)
    .orderBy(desc(publications.updatedAt));
  const translations = await translationsFor(db, rows.map((r) => r.id));
  return rows.map((publication) => {
    const mine = translations.filter((t) => t.publicationId === publication.id);
    return {
      id: publication.id,
      slug: publication.slug,
      status: publication.status,
      primaryLocale: publication.primaryLocale,
      title: mine.find((t) => t.locale === publication.primaryLocale)?.title ?? "",
      year: publication.year,
      locales: mine.map((t) => t.locale),
      updatedAt: publication.updatedAt,
      updatedBy: publication.updatedBy,
    };
  });
}
