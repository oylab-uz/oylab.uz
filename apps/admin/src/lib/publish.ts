import { desc, eq } from "drizzle-orm";
import type { Snapshot, SnapshotPost, SnapshotPublication } from "@oylab/content/snapshot";
import type { Db } from "@/db";
import { media, posts, postTranslations, publications, publicationTranslations, sitePublishes } from "@/db/schema";
import { parseAuthors } from "./content/publications";
import { env } from "./env";
import type { MediaStore } from "./media";

export const SNAPSHOT_KEY = "snapshot/content.json";

/** Everything the public site needs, published items only, HTML already rendered. */
export async function buildSnapshot(db: Db): Promise<Snapshot> {
  const postRows = await db
    .select({ post: posts, coverUrl: media.url, coverAlt: media.alt, coverWidth: media.width, coverHeight: media.height })
    .from(posts)
    .leftJoin(media, eq(posts.coverMediaId, media.id))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt));
  const translations = await db.select().from(postTranslations);
  const snapshotPosts: SnapshotPost[] = postRows.map(({ post, coverUrl, coverAlt, coverWidth, coverHeight }) => ({
    id: post.id,
    slug: post.slug,
    primaryLocale: post.primaryLocale,
    publishedAt: post.publishedAt ?? post.updatedAt,
    cover: coverUrl ? { url: coverUrl, alt: coverAlt ?? "", width: coverWidth ?? null, height: coverHeight ?? null } : null,
    translations: translations
      .filter((t) => t.postId === post.id && t.title.trim())
      .map((t) => ({ locale: t.locale, title: t.title, summary: t.summary, bodyHtml: t.bodyHtml, readingMinutes: t.readingMinutes })),
  }));

  const publicationRows = await db
    .select()
    .from(publications)
    .where(eq(publications.status, "published"))
    .orderBy(desc(publications.year), desc(publications.publishedAt));
  const abstracts = await db.select().from(publicationTranslations);
  const snapshotPublications: SnapshotPublication[] = publicationRows.map((p) => ({
    id: p.id,
    slug: p.slug,
    primaryLocale: p.primaryLocale,
    publishedAt: p.publishedAt ?? p.updatedAt,
    year: p.year,
    venue: p.venue,
    authors: parseAuthors(p.authorsJson),
    pdfUrl: p.pdfUrl,
    arxivUrl: p.arxivUrl,
    codeUrl: p.codeUrl,
    doi: p.doi,
    bibtex: p.bibtex,
    translations: abstracts
      .filter((t) => t.publicationId === p.id && t.title.trim())
      .map((t) => ({ locale: t.locale, title: t.title, abstractHtml: t.abstractHtml })),
  }));

  return { version: 1, generatedAt: Date.now(), posts: snapshotPosts, publications: snapshotPublications };
}

export type PublishOutcome = {
  status: "uploaded" | "triggered" | "failed";
  buildId: string | null;
  message: string;
  posts: number;
  publications: number;
};

/**
 * Publish the site: write the snapshot where the site build reads it, then
 * ask Workers Builds to rebuild. Without a hook URL the snapshot is still
 * uploaded and the next push to main picks it up.
 */
export async function publishSite(
  db: Db,
  store: MediaStore,
  email: string,
  deps: { fetch?: typeof fetch; hookUrl?: string | null } = {},
): Promise<PublishOutcome> {
  const snapshot = await buildSnapshot(db);
  const counts = { posts: snapshot.posts.length, publications: snapshot.publications.length };
  let outcome: PublishOutcome;
  try {
    await store.put(SNAPSHOT_KEY, JSON.stringify(snapshot), "application/json", "public, max-age=60, must-revalidate");
    const hookUrl = deps.hookUrl === undefined ? env.deployHookUrl() : deps.hookUrl;
    if (!hookUrl) {
      outcome = { status: "uploaded", buildId: null, message: "Snapshot uploaded. No deploy hook configured; the site rebuilds on the next push to main.", ...counts };
    } else {
      const res = await (deps.fetch ?? fetch)(hookUrl, { method: "POST" });
      const body = (await res.json().catch(() => ({}))) as { success?: boolean; result?: { build_uuid?: string; already_exists?: boolean }; errors?: { message?: string }[] };
      if (!res.ok || body.success === false) {
        outcome = { status: "failed", buildId: null, message: `Deploy hook answered ${res.status}: ${body.errors?.[0]?.message ?? "unknown error"}`, ...counts };
      } else {
        outcome = {
          status: "triggered",
          buildId: body.result?.build_uuid ?? null,
          message: body.result?.already_exists ? "A build was already queued; it will include this snapshot." : "Rebuild requested. The site updates in one to three minutes.",
          ...counts,
        };
      }
    }
  } catch (error) {
    outcome = { status: "failed", buildId: null, message: error instanceof Error ? error.message : String(error), ...counts };
  }
  await db.insert(sitePublishes).values({
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    createdBy: email,
    posts: counts.posts,
    publications: counts.publications,
    status: outcome.status,
    buildId: outcome.buildId,
    message: outcome.message,
  });
  return outcome;
}

export async function listPublishes(db: Db, limit = 10) {
  return db.select().from(sitePublishes).orderBy(desc(sitePublishes.createdAt)).limit(limit);
}
