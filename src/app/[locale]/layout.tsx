import type { Metadata } from "next";
import { Geist, Geist_Mono, Spectral } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/header/site-header";
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/lib/content";
import { getMoonTonight } from "@/lib/moon-tonight";
import "@/app/globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist-mono",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function pathFor(locale: Locale) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: pathFor(locale),
      languages: {
        uz: pathFor("uz"),
        ru: pathFor("ru"),
        en: pathFor("en"),
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Params;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const a11y = await getTranslations("a11y");
  const moon = await getMoonTonight();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${spectral.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <Providers>
          <NextIntlClientProvider>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
            >
              {a11y("skipToContent")}
            </a>
            <SiteHeader phase={moon.phase} />
            <div id="content" className="flex-1">
              {children}
            </div>
            <SiteFooter moon={moon} />
            <div className="grain" aria-hidden />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
