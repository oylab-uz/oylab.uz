import { and, count, desc, eq, inArray, ne, notInArray } from "drizzle-orm";
import type { Db } from "@/db";
import { media, posts, postTranslations, type Post, type PostTranslation } from "@/db/schema";
import { routing, type Locale } from "@/i18n/routing";
import { renderMarkdown } from "@/lib/markdown";
import { isValidSlug } from "@/lib/slug";
import { resolveTranslation } from "./resolve";
import type {
  FieldErrors,
  PostAdminRow,
  PostCard,
  PostInput,
  PostPage,
  SaveContext,
  SaveResult,
  Status,
} from "./types";

export const SLUG_RULE = "Use lowercase letters, numbers and single hyphens, up to 80 characters";
const NOT_FOUND: SaveResult = { ok: false, fieldErrors: { id: "Post not found" } };

export async function createDraftPost(
  db: Db,
  { primaryLocale, email }: { primaryLocale: Locale; email: string },
): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const now = Date.now();
  await db.insert(posts).values({
    id,
    slug: `untitled-${id.slice(0, 8)}`,
    primaryLocale,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    updatedBy: email,
  });
  await db.insert(postTranslations).values({ postId: id, locale: primaryLocale, updatedAt: now });
  return { id };
}

export async function getPostAdmin(
  db: Db,
  id: string,
): Promise<{ post: Post; translations: PostTranslation[] } | null> {
  const post = await db.select().from(posts).where(eq(posts.id, id)).get();
  if (!post) return null;
  const translations = await db
    .select()
    .from(postTranslations)
    .where(eq(postTranslations.postId, id));
  return { post, translations };
}

async function slugError(
  db: Db,
  id: string,
  slug: string,
  status: Status,
  currentSlug: string,
): Promise<string | null> {
  if (!isValidSlug(slug)) return SLUG_RULE;
  if (status === "published" && slug !== currentSlug) return "Locked after publishing";
  const clash = await db
    .select({ id: posts.id })
    .from(posts)
    .where(and(eq(posts.slug, slug), ne(posts.id, id)))
    .get();
  return clash ? "Another post uses this slug" : null;
}

export async function savePost(db: Db, input: PostInput, ctx: SaveContext): Promise<SaveResult> {
  const existing = await db.select().from(posts).where(eq(posts.id, input.id)).get();
  if (!existing) return NOT_FOUND;

  const fieldErrors: FieldErrors = {};
  const slugProblem = await slugError(db, input.id, input.slug, existing.status, existing.slug);
  if (slugProblem) fieldErrors.slug = slugProblem;
  if (!input.translations[input.primaryLocale]) {
    fieldErrors[`translations.${input.primaryLocale}.title`] = "The primary language needs a translation";
  }
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const now = Date.now();
  await db
    .update(posts)
    .set({
      slug: input.slug,
      primaryLocale: input.primaryLocale,
      coverMediaId: input.coverMediaId,
      publishedAt: input.publishedAt,
      updatedAt: now,
      updatedBy: ctx.email,
    })
    .where(eq(posts.id, input.id));

  const kept: Locale[] = [];
  for (const locale of routing.locales) {
    const t = input.translations[locale];
    if (!t) continue;
    kept.push(locale);
    const { html, readingMinutes } = await renderMarkdown(t.bodyMd, { mediaOrigin: ctx.mediaOrigin });
    const row = { title: t.title, summary: t.summary, bodyMd: t.bodyMd, bodyHtml: html, readingMinutes, updatedAt: now };
    await db
      .insert(postTranslations)
      .values({ postId: input.id, locale, ...row })
      .onConflictDoUpdate({ target: [postTranslations.postId, postTranslations.locale], set: row });
  }
  await db
    .delete(postTranslations)
    .where(and(eq(postTranslations.postId, input.id), notInArray(postTranslations.locale, kept)));
  return { ok: true };
}

export async function publishPost(db: Db, id: string, email: string): Promise<SaveResult> {
  const found = await getPostAdmin(db, id);
  if (!found) return NOT_FOUND;
  const { post, translations } = found;
  const primary = translations.find((t) => t.locale === post.primaryLocale);
  const fieldErrors: FieldErrors = {};
  const slugProblem = await slugError(db, id, post.slug, "draft", post.slug);
  if (slugProblem) fieldErrors.slug = slugProblem;
  if (!primary?.title.trim()) fieldErrors[`translations.${post.primaryLocale}.title`] = "A title is required to publish";
  if (!primary?.bodyMd.trim()) fieldErrors[`translations.${post.primaryLocale}.bodyMd`] = "A body is required to publish";
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors };

  const now = Date.now();
  await db
    .update(posts)
    .set({ status: "published", publishedAt: post.publishedAt ?? now, updatedAt: now, updatedBy: email })
    .where(eq(posts.id, id));
  return { ok: true };
}

export async function unpublishPost(db: Db, id: string, email: string): Promise<SaveResult> {
  const existing = await db.select({ id: posts.id }).from(posts).where(eq(posts.id, id)).get();
  if (!existing) return NOT_FOUND;
  await db
    .update(posts)
    .set({ status: "draft", updatedAt: Date.now(), updatedBy: email })
    .where(eq(posts.id, id));
  return { ok: true };
}

export async function deletePost(db: Db, id: string): Promise<SaveResult> {
  const existing = await db.select({ status: posts.status }).from(posts).where(eq(posts.id, id)).get();
  if (!existing) return NOT_FOUND;
  if (existing.status === "published") return { ok: false, fieldErrors: { status: "Unpublish first" } };
  await db.delete(posts).where(eq(posts.id, id));
  return { ok: true };
}

function toCard(
  post: Post,
  translations: PostTranslation[],
  locale: Locale,
  cover: { url: string | null; alt: string | null },
): PostCard | null {
  const resolved = resolveTranslation(translations, locale, post.primaryLocale);
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
    coverUrl: cover.url,
    coverAlt: cover.alt,
  };
}

async function translationsFor(db: Db, ids: string[]): Promise<PostTranslation[]> {
  if (ids.length === 0) return [];
  return db.select().from(postTranslations).where(inArray(postTranslations.postId, ids));
}

export async function listPublishedPosts(
  db: Db,
  { locale, page, perPage }: { locale: Locale; page: number; perPage: number },
): Promise<{ items: PostCard[]; total: number; pages: number }> {
  const published = eq(posts.status, "published");
  const [{ total }] = await db.select({ total: count() }).from(posts).where(published);
  const pages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), pages);
  const rows = await db
    .select({ post: posts, coverUrl: media.url, coverAlt: media.alt })
    .from(posts)
    .leftJoin(media, eq(posts.coverMediaId, media.id))
    .where(published)
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
    .limit(perPage)
    .offset((safePage - 1) * perPage);
  const translations = await translationsFor(db, rows.map((r) => r.post.id));
  const items = rows
    .map((r) =>
      toCard(r.post, translations.filter((t) => t.postId === r.post.id), locale, {
        url: r.coverUrl,
        alt: r.coverAlt,
      }),
    )
    .filter((card): card is PostCard => card !== null);
  return { items, total, pages };
}

export async function latestPosts(db: Db, locale: Locale, limit: number): Promise<PostCard[]> {
  return (await listPublishedPosts(db, { locale, page: 1, perPage: limit })).items;
}

export async function getPublishedPost(db: Db, slug: string, locale: Locale): Promise<PostPage | null> {
  const row = await db
    .select({ post: posts, coverUrl: media.url, coverAlt: media.alt })
    .from(posts)
    .leftJoin(media, eq(posts.coverMediaId, media.id))
    .where(and(eq(posts.slug, slug), eq(posts.status, "published")))
    .get();
  if (!row) return null;
  const translations = await translationsFor(db, [row.post.id]);
  const card = toCard(row.post, translations, locale, { url: row.coverUrl, alt: row.coverAlt });
  if (!card) return null;
  const shown = translations.find((t) => t.locale === card.locale);
  return {
    ...card,
    bodyHtml: shown?.bodyHtml ?? "",
    primaryLocale: row.post.primaryLocale,
    availableLocales: translations.map((t) => t.locale),
  };
}

export async function listPostsAdmin(db: Db, { status }: { status?: Status }): Promise<PostAdminRow[]> {
  const rows = await db
    .select()
    .from(posts)
    .where(status ? eq(posts.status, status) : undefined)
    .orderBy(desc(posts.updatedAt));
  const translations = await translationsFor(db, rows.map((r) => r.id));
  return rows.map((post) => {
    const mine = translations.filter((t) => t.postId === post.id);
    return {
      id: post.id,
      slug: post.slug,
      status: post.status,
      primaryLocale: post.primaryLocale,
      title: mine.find((t) => t.locale === post.primaryLocale)?.title ?? "",
      locales: mine.map((t) => t.locale),
      updatedAt: post.updatedAt,
      updatedBy: post.updatedBy,
    };
  });
}
