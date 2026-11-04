import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PublicationsIndex } from "@/components/pages/publications-index";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "publications" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: {
      canonical: getPathname({ locale: "en", href: "/publications" }),
      languages: Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href: "/publications" })])),
    },
  };
}

export default function Page() {
  setRequestLocale("en");
  return <PublicationsIndex locale="en" />;
}
