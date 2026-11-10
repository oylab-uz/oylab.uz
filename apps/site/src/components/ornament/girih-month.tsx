"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { GIRIH_CELL, girihCentre, girihFill, girihStrap } from "@/lib/girih";
import { LUNAR_NIGHTS, lunarNight } from "@/lib/moon";
import { useMoonTonight } from "@/lib/use-moon";

const COLUMNS = 6;
const ROWS = LUNAR_NIGHTS / COLUMNS;

const tiles = Array.from({ length: LUNAR_NIGHTS }, (_, index) => {
  const { x, y } = girihCentre(index, COLUMNS);
  return { fill: girihFill(x, y), strap: girihStrap(x, y) };
});

/**
 * The lunar month as a girih panel: thirty tiles, one per night, filled up to
 * tonight. Oy is both moon and month in Uzbek. Like every moon on the site it
 * is computed from the visitor's clock after mount; the static HTML carries
 * the empty lattice in the same box, so nothing shifts.
 */
export function GirihMonth({ className }: { className?: string }) {
  const moon = useMoonTonight();
  const t = useTranslations("girih");
  const tMoon = useTranslations("moon.phases");
  const night = moon ? lunarNight(moon.phase) : null;
  const phase = moon ? tMoon(moon.name) : null;

  return (
    <figure className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${COLUMNS * GIRIH_CELL} ${ROWS * GIRIH_CELL}`}
        className="h-auto w-full"
        role="img"
        aria-label={night && phase ? t("label", { night, phase }) : t("labelStatic")}
      >
        {tiles.map((tile, index) => {
          const state = night === null || index + 1 > night ? "ahead" : index + 1 === night ? "tonight" : "passed";
          return (
            // The fill arrives tile by tile, so tonight's lands last.
            <g key={index} className="girih-tile" data-state={state} style={{ "--i": index } as CSSProperties}>
              <path className="girih-fill" d={tile.fill} />
              <path className="girih-strap" d={tile.strap} />
            </g>
          );
        })}
      </svg>
      <p className="mt-4 flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.08em] text-muted">
        <span className="whitespace-nowrap">{t("axis")} →</span>
        <span className="whitespace-nowrap">{t("legend")}</span>
      </p>
      <figcaption className="mt-2 min-h-[1.5em] text-sm text-muted">
        {night && phase ? t("caption", { night, phase }) : " "}
      </figcaption>
    </figure>
  );
}
