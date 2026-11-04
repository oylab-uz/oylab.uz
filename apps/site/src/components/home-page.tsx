import { Hero } from "@/components/sections/hero";
import { Join } from "@/components/sections/join";
import { Marquee } from "@/components/sections/marquee";
import { Mission } from "@/components/sections/mission";
import { Process } from "@/components/sections/process";
import { Publications } from "@/components/sections/publications";
import { Research } from "@/components/sections/research";
import { Team } from "@/components/sections/team";

export function HomePage() {
  return (
    <main>
      <Hero />
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
