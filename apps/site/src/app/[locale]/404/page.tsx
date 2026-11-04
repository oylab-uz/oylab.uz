import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NotFoundView } from "@/components/not-found-view";

type Params = Promise<{ locale: string }>;

/**
 * Emitted as out/<locale>/404.html. Workers Static Assets serves the nearest
 * 404.html up the path (`not_found_handling: "404-page"`), so Uzbek and
 * Russian URLs that do not exist get a 404 in their own language.
 */
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "notFound" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function LocaleNotFoundPage({ params }: { params: Params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("notFound");
  return <NotFoundView title={t("title")} body={t("body")} back={t("back")} backHref={`/${locale}`} />;
}
