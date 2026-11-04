import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JournalIndex } from "@/components/pages/journal-index";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: "en", namespace: "journal" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: {
      canonical: getPathname({ locale: "en", href: "/journal" }),
      languages: Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href: "/journal" })])),
    },
  };
}

export default function Page() {
  setRequestLocale("en");
  return <JournalIndex locale="en" />;
}
