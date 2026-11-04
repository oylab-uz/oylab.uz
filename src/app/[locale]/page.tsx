import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Join } from "@/components/sections/join";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { Marquee } from "@/components/sections/marquee";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Publications } from "@/components/sections/publications";
import { Research } from "@/components/sections/research";
import { Team } from "@/components/sections/team";
import { getDb } from "@/db";
import { routing } from "@/i18n/routing";
import { latestPosts } from "@/lib/content/posts";
import { latestPublications } from "@/lib/content/publications";
import { getMoonTonight } from "@/lib/moon-tonight";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const moon = await getMoonTonight();
  const db = await getDb();
  const [publications, posts] = await Promise.all([latestPublications(db, locale, 5), latestPosts(db, locale, 3)]);

  return (
    <main>
      <Hero moon={moon} />
      <Marquee />
      <Mission />
      <Research />
      <Process />
      <Team />
      <Publications publications={publications} />
      <JournalTeaser posts={posts} locale={locale} />
      <Join />
    </main>
  );
}
