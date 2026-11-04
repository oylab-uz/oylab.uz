import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/content";

export function pathFor(locale: Locale) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

/** Site-wide metadata for one locale: canonical, hreflang alternates, Open Graph. */
export async function siteMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pathFor(locale),
      languages: {
        en: pathFor("en"),
        uz: pathFor("uz"),
        ru: pathFor("ru"),
        "x-default": pathFor(routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: pathFor(locale),
      siteName: t("siteName"),
      title: t("title"),
      description: t("description"),
    },
  };
}
