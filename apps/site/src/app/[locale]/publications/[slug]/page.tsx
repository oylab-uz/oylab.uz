import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { publicationMetadata, PublicationView } from "@/components/pages/publication-view";
import { routing } from "@/i18n/routing";
import { publicationSlugs, staticSlugs } from "@/lib/snapshot";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const locales = routing.locales.filter((l) => l !== routing.defaultLocale);
  return locales.flatMap((locale) => staticSlugs(publicationSlugs()).map(({ slug }) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return publicationMetadata(slug, locale);
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <PublicationView slug={slug} locale={locale} />;
}
