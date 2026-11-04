import type { MetadataRoute } from "next";

// Metadata routes must declare themselves static under output: "export".
export const dynamic = "force-static";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      locale === routing.defaultLocale ? `${site.url}/` : `${site.url}/${locale}`,
    ]),
  );

  return Object.values(languages).map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
