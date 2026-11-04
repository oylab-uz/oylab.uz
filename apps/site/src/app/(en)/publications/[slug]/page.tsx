import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { publicationMetadata, PublicationView } from "@/components/pages/publication-view";
import { publicationSlugs, staticSlugs } from "@/lib/snapshot";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticSlugs(publicationSlugs());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return publicationMetadata((await params).slug, "en");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  setRequestLocale("en");
  return <PublicationView slug={(await params).slug} locale="en" />;
}
