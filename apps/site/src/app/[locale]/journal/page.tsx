import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { JournalIndex } from "@/components/pages/journal-index";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "journal" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: {
      canonical: getPathname({ locale, href: "/journal" }),
      languages: Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href: "/journal" })])),
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <JournalIndex locale={locale} />;
}
