import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { postMetadata, PostView } from "@/components/pages/post-view";
import { postSlugs, staticSlugs } from "@/lib/snapshot";

export const dynamicParams = false;

export function generateStaticParams() {
  return staticSlugs(postSlugs());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return postMetadata((await params).slug, "en");
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  setRequestLocale("en");
  return <PostView slug={(await params).slug} locale="en" />;
}
