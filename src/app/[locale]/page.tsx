import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { Join } from "@/components/sections/join";
import { Marquee } from "@/components/sections/marquee";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Publications } from "@/components/sections/publications";
import { Research } from "@/components/sections/research";
import { Team } from "@/components/sections/team";
import { getMoonTonight } from "@/lib/moon-tonight";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const moon = await getMoonTonight();

  return (
    <main>
      <Hero moon={moon} />
      <Marquee />
      <Mission />
      <Research />
      <Process />
      <Team />
      <Publications />
      <Join />
    </main>
  );
}
