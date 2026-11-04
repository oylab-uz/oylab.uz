import type { Metadata } from "next";
import { fontClassName } from "@/app/fonts";
import { NotFoundView } from "@/components/not-found-view";
import { ThemeInit } from "@/components/theme/theme-init";
import en from "../../messages/en.json";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: en.notFound.title,
  robots: { index: false, follow: false },
};

/**
 * Emitted as out/404.html. Renders its own document because the English root
 * and the uz/ru segment are separate root layouts. English on purpose: the
 * prefixed locales have their own 404 pages (see [locale]/404).
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className={fontClassName}>
      <body className="flex min-h-dvh flex-col">
        <ThemeInit />
        <NotFoundView title={en.notFound.title} body={en.notFound.body} back={en.notFound.back} backHref="/" />
      </body>
    </html>
  );
}
