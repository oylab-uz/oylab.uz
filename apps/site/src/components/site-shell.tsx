import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { fontClassName } from "@/app/fonts";
import { SiteHeader } from "@/components/header/site-header";
import { OrnamentDefs } from "@/components/ornament/ornament-defs";
import { Providers } from "@/components/providers";
import { SectionAnchors } from "@/components/section-anchors";
import { SiteFooter } from "@/components/site-footer";
import { ThemeInit } from "@/components/theme/theme-init";
import type { Locale } from "@/i18n/routing";
import "@/app/globals.css";

/** The document shared by the English root layout and the uz/ru layout. */
export async function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  const a11y = await getTranslations("a11y");
  // Build year; the browser replaces it with the visitor's year after mount.
  const buildYear = new Date().getFullYear();

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth" className={fontClassName}>
      <body className="flex min-h-dvh flex-col">
        <ThemeInit />
        <OrnamentDefs />
        <Providers>
          <NextIntlClientProvider>
            <a
              href="#content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
            >
              {a11y("skipToContent")}
            </a>
            <SectionAnchors />
            <SiteHeader />
            <div id="content" className="flex-1">
              {children}
            </div>
            <SiteFooter buildYear={buildYear} />
            <div className="grain" aria-hidden />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
