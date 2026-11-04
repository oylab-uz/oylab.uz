import type { MetadataRoute } from "next";
import { getDb } from "@/db";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/content";
import { listPublishedPosts } from "@/lib/content/posts";
import { listPublishedPublications } from "@/lib/content/publications";

const absolute = (locale: Locale, href: string) => `${site.url}${getPathname({ locale, href })}`;

function entries(href: string, locales: readonly Locale[], extra: Partial<MetadataRoute.Sitemap[number]> = {}) {
  const languages = Object.fromEntries(locales.map((l) => [l, absolute(l, href)]));
  return locales.map((locale) => ({ url: absolute(locale, href), alternates: { languages }, ...extra }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb();
  const all = routing.locales;
  const out: MetadataRoute.Sitemap = [
    ...entries("/", all, { changeFrequency: "monthly", priority: 1 }),
    ...entries("/journal", all, { changeFrequency: "weekly", priority: 0.8 }),
    ...entries("/publications", all, { changeFrequency: "monthly", priority: 0.8 }),
  ];

  // Lists return one card per item regardless of locale; availability comes from the page lookups.
  const { items: posts } = await listPublishedPosts(db, { locale: routing.defaultLocale, page: 1, perPage: 1000 });
  for (const post of posts) {
    const page = await import("@/lib/content/posts").then((m) => m.getPublishedPost(db, post.slug, routing.defaultLocale));
    if (!page) continue;
    out.push(
      ...entries(`/journal/${post.slug}`, page.availableLocales, {
        lastModified: post.publishedAt ? new Date(post.publishedAt) : undefined,
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    );
  }
  const groups = await listPublishedPublications(db, routing.defaultLocale);
  for (const publication of groups.flatMap((g) => g.items)) {
    const page = await import("@/lib/content/publications").then((m) =>
      m.getPublishedPublication(db, publication.slug, routing.defaultLocale),
    );
    if (!page) continue;
    out.push(...entries(`/publications/${publication.slug}`, page.availableLocales, { changeFrequency: "yearly", priority: 0.6 }));
  }
  return out;
}
