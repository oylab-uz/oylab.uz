import { getTranslations } from "next-intl/server";
import { GirihMonth } from "@/components/ornament/girih-month";
import { Seam } from "@/components/ornament/seam";
import { Reveal } from "@/components/ui/reveal";
import { cn, container } from "@/lib/cn";
import { ProcessScroll, type ProcessStep } from "./process-scroll";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as ProcessStep[];

  return (
    <section id="process" className="scroll-mt-16">
      <Seam />
      {/* Its own heading: the lead sits under the title so the month figure can take the right column. */}
      <div className={cn(container, "grid gap-12 pt-24 md:pt-32 lg:grid-cols-12 lg:gap-10")}>
        <Reveal className="lg:col-span-7">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h2 className="mt-4 max-w-[20ch] font-serif text-3xl font-light tracking-tight leading-[1.05] text-ink-strong md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted">{t("lead")}</p>
        </Reveal>
        <Reveal className="lg:col-span-4 lg:col-start-9">
          <GirihMonth className="max-w-[26rem]" />
        </Reveal>
      </div>
      <div className="pt-16 pb-24 md:pb-32">
        <ProcessScroll steps={steps} />
      </div>
    </section>
  );
}
