import { getPathname } from "@/i18n/navigation";
import { site } from "@/lib/content";
import { getSnapshot } from "@/lib/snapshot";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 of the last 50 posts, each in its primary language. */
export function GET() {
  const posts = [...getSnapshot().posts].sort((a, b) => b.publishedAt - a.publishedAt).slice(0, 50);
  const feedUrl = `${site.url}/journal/feed.xml`;
  const items = posts
    .map((post) => {
      const primary = post.translations.find((t) => t.locale === post.primaryLocale) ?? post.translations[0];
      if (!primary) return "";
      const url = `${site.url}${getPathname({ locale: primary.locale, href: `/journal/${post.slug}` })}`;
      return `    <item>
      <title>${escape(primary.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escape(primary.summary)}</description>
    </item>`;
    })
    .filter(Boolean)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>OY Lab journal</title>
    <link>${site.url}/journal</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>Notes from the lab.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
