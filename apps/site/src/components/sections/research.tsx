import { getTranslations } from "next-intl/server";
import { Seam } from "@/components/ornament/seam";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightTile } from "@/components/ui/spotlight-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn, container } from "@/lib/cn";
import { researchAreas } from "@/lib/content";
import { ResearchVisual } from "./research-visuals";

export async function Research() {
  const t = await getTranslations("research");

  return (
    <section id="research" className="scroll-mt-16">
      <Seam />
      <div className={cn(container, "py-24 md:py-32")}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />

        <RevealGroup
          className="burchak mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3"
          stagger={0.08}
          amount={0.1}
        >
          {researchAreas.map((area) => (
            <RevealItem key={area.id} className={cn("flex", area.span)}>
              <SpotlightTile className="min-h-[380px] w-full p-6 md:p-10">
                <div className="flex items-start justify-between">
                  <span className="eyebrow tabular">{area.index}</span>
                </div>
                <div className="my-8 h-[150px] flex-none">
                  <ResearchVisual id={area.id} />
                </div>
                <div className="mt-auto">
                  <h3 className="font-serif text-2xl tracking-tight text-ink-strong md:text-3xl">
                    {t(`areas.${area.id}.title`)}
                  </h3>
                  <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-muted md:text-base">
                    {t(`areas.${area.id}.body`)}
                  </p>
                </div>
              </SpotlightTile>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
