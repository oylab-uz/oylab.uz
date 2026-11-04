import { connection } from "next/server";
import { getDb } from "@/db";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/content";
import { listPublishedPosts } from "@/lib/content/posts";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 of the last 50 posts in their primary language. */
export async function GET() {
  // Rendered per request: the content lives in D1, which does not exist at build time.
  await connection();
  const db = await getDb();
  const { items } = await listPublishedPosts(db, { locale: routing.defaultLocale, page: 1, perPage: 50 });
  const feedUrl = `${site.url}/journal/feed.xml`;
  const entries = items
    .map((post) => {
      const url = `${site.url}${getPathname({ locale: post.locale, href: `/journal/${post.slug}` })}`;
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}
      <description>${escape(post.summary)}</description>
      <language>${post.locale}</language>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OY Lab journal</title>
    <link>${site.url}/journal</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Notes from the lab.</description>
    <language>${routing.defaultLocale}</language>
${entries}
  </channel>
</rss>
`;
  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=600" },
  });
}
