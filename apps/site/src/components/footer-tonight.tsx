"use client";

import { useTranslations } from "next-intl";
import { useMoonTonight, useYear } from "@/lib/use-moon";

/** Footer lines that depend on the visitor's date: tonight's moon and the copyright year. */
export function FooterTonight({ buildYear }: { buildYear: number }) {
  const moon = useMoonTonight();
  const year = useYear(buildYear);
  const t = useTranslations("footer");
  const tMoon = useTranslations("moon.phases");
  return (
    <>
      <p className="eyebrow tabular min-h-[1.25em]">
        {moon ? t("tonight", { phase: tMoon(moon.name), percent: moon.percent }) : " "}
      </p>
      <p className="font-mono text-[11px] tracking-[0.08em] text-muted">{t("rights", { year })}</p>
    </>
  );
}
