import { Hero } from "@/components/sections/hero";
import { Join } from "@/components/sections/join";
import { JournalTeaser } from "@/components/sections/journal-teaser";
import { Marquee } from "@/components/sections/marquee";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Publications } from "@/components/sections/publications";
import { Research } from "@/components/sections/research";
import { Team } from "@/components/sections/team";
import type { Locale } from "@/i18n/routing";
import { latestPosts, latestPublications } from "@/lib/snapshot";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <main>
      <Hero />
      <Marquee />
      <Mission />
      <Research />
      <Process />
      <Team />
      <Publications publications={latestPublications(locale, 5)} />
      <JournalTeaser posts={latestPosts(locale, 3)} locale={locale} />
      <Join />
    </main>
  );
}
