import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn, container } from "@/lib/cn";
import { ProcessScroll, type ProcessStep } from "./process-scroll";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as ProcessStep[];

  return (
    <section id="process" className="scroll-mt-16 border-t border-line">
      <div className={cn(container, "pt-24 md:pt-32")}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} />
      </div>
      <div className="pt-16 pb-24 md:pb-32">
        <ProcessScroll steps={steps} />
      </div>
    </section>
  );
}
