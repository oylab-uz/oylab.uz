"use client";

import { useTranslations } from "next-intl";
import { MoonDisc } from "@/components/moon/moon-disc";
import { useMoonTonight } from "@/lib/use-moon";

/** The hero disc and caption, computed from the visitor's clock after mount. */
export function HeroMoon() {
  const moon = useMoonTonight();
  const t = useTranslations("hero");
  const tMoon = useTranslations("moon.phases");
  const a11y = useTranslations("a11y");
  const phaseLabel = moon ? tMoon(moon.name) : null;

  return (
    <div className="flex flex-col items-center gap-6 lg:col-span-5 lg:items-end">
      <div className="w-[min(72vw,440px)] motion-safe:animate-float">
        <MoonDisc
          phase={moon?.phase ?? null}
          size={440}
          className="h-auto w-full"
          title={moon && phaseLabel ? a11y("moonAlt", { phase: phaseLabel, percent: moon.percent }) : undefined}
        />
      </div>
      <p className="eyebrow tabular min-h-[1.25em]">
        {moon && phaseLabel ? `${t("tonight")} · ${phaseLabel} · ${moon.percent}%` : t("tonight")}
      </p>
    </div>
  );
}
