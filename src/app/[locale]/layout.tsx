import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { routing } from "@/i18n/routing";
import { siteMetadata } from "@/lib/site-metadata";

type Params = Promise<{ locale: string }>;

/** Only the prefixed locales; English is the root route group. */
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.filter((locale) => locale !== routing.defaultLocale).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || locale === routing.defaultLocale) return {};
  return siteMetadata(locale);
}

export default async function LocaleLayout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || locale === routing.defaultLocale) notFound();
  setRequestLocale(locale);
  return <SiteShell locale={locale}>{children}</SiteShell>;
}
