// Development seed: `pnpm --filter admin seed`. Idempotent through fixed slugs.
import { eq } from "drizzle-orm";
import { getDb } from "../src/db";
import { posts as postsTable, publications as publicationsTable } from "../src/db/schema";
import { createDraftPost, publishPost, savePost } from "../src/lib/content/posts";
import { createDraftPublication, savePublication } from "../src/lib/content/publications";
import { EMAIL, posts, publications } from "./seed-content";

const ctx = { email: EMAIL, mediaOrigin: process.env.MEDIA_PUBLIC_URL ?? "http://localhost:3300/uploads" };

async function main() {
  const db = getDb();
  for (const post of posts) {
    const exists = await db.select({ id: postsTable.id }).from(postsTable).where(eq(postsTable.slug, post.slug)).get();
    if (exists) continue;
    const { id } = await createDraftPost(db, { primaryLocale: post.primaryLocale, email: EMAIL });
    const translations = Object.fromEntries(post.translations.map((t) => [t.locale, { title: t.title, summary: t.summary, bodyMd: t.bodyMd }]));
    const saved = await savePost(db, { id, slug: post.slug, primaryLocale: post.primaryLocale, coverMediaId: null, publishedAt: post.publishedAt, translations }, ctx);
    if (!saved.ok) throw new Error(`seed post ${post.slug}: ${JSON.stringify(saved.fieldErrors)}`);
    await publishPost(db, id, EMAIL);
  }
  for (const pub of publications) {
    const exists = await db.select({ id: publicationsTable.id }).from(publicationsTable).where(eq(publicationsTable.slug, pub.slug)).get();
    if (exists) continue;
    const { id } = await createDraftPublication(db, { primaryLocale: "en", email: EMAIL });
    const saved = await savePublication(db, { id, slug: pub.slug, primaryLocale: "en", publishedAt: null, year: pub.year, venue: pub.venue, authors: pub.authors, pdfUrl: null, arxivUrl: null, codeUrl: null, doi: null, bibtex: null, translations: { en: { title: pub.title, abstractMd: pub.abstractMd } } }, ctx);
    if (!saved.ok) throw new Error(`seed publication ${pub.slug}: ${JSON.stringify(saved.fieldErrors)}`);
  }
  console.log(`seeded ${posts.length} posts (published) and ${publications.length} publications (drafts)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
