import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/content";
import { getSnapshot } from "@/lib/snapshot";

// Metadata routes must declare themselves static under output: "export".
export const dynamic = "force-static";

const absolute = (locale: Locale, href: string) => `${site.url}${getPathname({ locale, href })}`;

function entries(href: string, locales: readonly Locale[], extra: Partial<MetadataRoute.Sitemap[number]> = {}) {
  const languages = Object.fromEntries(locales.map((l) => [l, absolute(l, href)]));
  return locales.map((locale) => ({ url: absolute(locale, href), alternates: { languages }, ...extra }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const all = routing.locales;
  const { posts, publications } = getSnapshot();
  return [
    ...entries("/", all, { changeFrequency: "monthly", priority: 1 }),
    ...entries("/journal", all, { changeFrequency: "weekly", priority: 0.8 }),
    ...entries("/publications", all, { changeFrequency: "monthly", priority: 0.8 }),
    ...posts.flatMap((post) =>
      entries(`/journal/${post.slug}`, post.translations.map((t) => t.locale), {
        lastModified: new Date(post.publishedAt),
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    ),
    ...publications.flatMap((publication) =>
      entries(`/publications/${publication.slug}`, publication.translations.map((t) => t.locale), {
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    ),
  ];
}
