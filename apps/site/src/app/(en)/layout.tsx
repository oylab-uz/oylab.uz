import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteShell } from "@/components/site-shell";
import { siteMetadata } from "@/lib/site-metadata";

/** English root: `/` and everything unprefixed. Uzbek and Russian live under `[locale]`. */
export function generateMetadata(): Promise<Metadata> {
  return siteMetadata("en");
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
  setRequestLocale("en");
  return <SiteShell locale="en">{children}</SiteShell>;
}
