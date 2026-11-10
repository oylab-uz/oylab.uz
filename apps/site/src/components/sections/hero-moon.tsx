"use client";

import { useTranslations } from "next-intl";
import { MoonDisc } from "@/components/moon/moon-disc";
import { IwanOutline } from "@/components/ornament/iwan-outline";
import type { ReactNode } from "react";
import { useMoonTonight } from "@/lib/use-moon";

/**
 * The hero disc and caption, computed from the visitor's clock after mount.
 * `field` is the cloth behind the iwan, rendered on the server and passed in.
 */
export function HeroMoon({ field }: { field: ReactNode }) {
  const moon = useMoonTonight();
  const t = useTranslations("hero");
  const tMoon = useTranslations("moon.phases");
  const a11y = useTranslations("a11y");
  const phaseLabel = moon ? tMoon(moon.name) : null;

  return (
    <div className="flex flex-col items-center gap-6 lg:col-span-5 lg:items-end">
      {/* The moon seen through an iwan: an arch cut out of a width of abr cloth, the disc floating inside it. */}
      <div className="relative grid h-[min(64dvh,560px)] min-h-[340px] w-full place-items-center max-lg:-mx-4 max-lg:w-[calc(100%+2rem)] sm:max-lg:-mx-6 sm:max-lg:w-[calc(100%+3rem)]">
        {field}
        <div className="iwan-glow relative aspect-[3/4] h-[74%]">
          <div aria-hidden className="iwan absolute inset-0 bg-bg" />
          <IwanOutline className="absolute inset-0 size-full text-qalay" />
          <div className="absolute inset-x-[14%] top-[21%] motion-safe:animate-float">
            <MoonDisc
              phase={moon?.phase ?? null}
              size={440}
              className="h-auto w-full"
              title={moon && phaseLabel ? a11y("moonAlt", { phase: phaseLabel, percent: moon.percent }) : undefined}
            />
          </div>
        </div>
      </div>
      <p className="eyebrow tabular min-h-[1.25em]">
        {moon && phaseLabel ? `${t("tonight")} · ${phaseLabel} · ${moon.percent}%` : t("tonight")}
      </p>
    </div>
  );
}
