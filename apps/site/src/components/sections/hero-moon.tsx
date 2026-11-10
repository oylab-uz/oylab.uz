"use client";

import { useTranslations } from "next-intl";
import { MoonDisc } from "@/components/moon/moon-disc";
import { IwanOutline } from "@/components/ornament/iwan-outline";
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
      {/* The moon seen through an iwan: a niche in the arch's shape, the disc floating inside it. */}
      <div className="relative aspect-[3/4] w-[min(72vw,440px,calc((100dvh-13rem)*0.75))]">
        {/* The arch fades out toward the ground, so the niche has no hard bottom edge. */}
        <div aria-hidden className="absolute inset-0 [mask-image:linear-gradient(#000_52%,transparent_94%)]">
          <div className="iwan absolute inset-0 bg-surface" />
          <IwanOutline className="absolute inset-0 size-full text-qalay" />
        </div>
        <div className="absolute inset-x-[14%] top-[21%] motion-safe:animate-float">
          <MoonDisc
            phase={moon?.phase ?? null}
            size={440}
            className="h-auto w-full"
            title={moon && phaseLabel ? a11y("moonAlt", { phase: phaseLabel, percent: moon.percent }) : undefined}
          />
        </div>
      </div>
      <p className="eyebrow tabular min-h-[1.25em]">
        {moon && phaseLabel ? `${t("tonight")} · ${phaseLabel} · ${moon.percent}%` : t("tonight")}
      </p>
    </div>
  );
}
