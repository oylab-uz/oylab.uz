import { getTranslations } from "next-intl/server";
import { MoonDisc } from "@/components/moon/moon-disc";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { cn, container } from "@/lib/cn";
import { stats } from "@/lib/content";
import type { MoonTonight } from "@/lib/moon-tonight";

export async function Hero({ moon }: { moon: MoonTonight }) {
  const t = await getTranslations("hero");
  const tStats = await getTranslations("stats");
  const tMoon = await getTranslations("moon.phases");
  const a11y = await getTranslations("a11y");
  const phaseLabel = tMoon(moon.name);

  return (
    <section className="relative">
      <div
        className={cn(
          container,
          "grid min-h-[calc(100dvh-4rem)] grid-cols-1 items-center gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-0",
        )}
      >
        {/* CSS-only stagger: the hero must be readable before any JavaScript arrives. */}
        <div className="flex flex-col gap-8 lg:col-span-7">
          <p className="eyebrow motion-safe:animate-rise" style={{ animationDelay: "0ms" }}>
            {t("eyebrow")}
          </p>
          <h1
            className="max-w-[16ch] font-serif text-4xl font-light tracking-tight leading-[1.02] text-ink-strong motion-safe:animate-rise md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            {t("title")}
          </h1>
          <p
            className="max-w-[58ch] text-base leading-relaxed text-muted motion-safe:animate-rise md:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {t("lead")}
          </p>
          <div className="flex flex-wrap gap-3 motion-safe:animate-rise" style={{ animationDelay: "240ms" }}>
            <MagneticButton href="#publications">{t("primary")}</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              {t("secondary")}
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 lg:col-span-5 lg:items-end">
          <div className="w-[min(72vw,440px)] motion-safe:animate-float">
            <MoonDisc
              phase={moon.phase}
              size={440}
              className="h-auto w-full"
              title={a11y("moonAlt", { phase: phaseLabel, percent: moon.percent })}
            />
          </div>
          <p className="eyebrow tabular">
            {t("tonight")} · {phaseLabel} · {moon.percent}%
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <dl
          className={cn(
            container,
            "grid grid-cols-2 divide-x divide-line sm:grid-cols-4 [&>div]:py-6 [&>div:not(:first-child)]:pl-6",
          )}
        >
          <div>
            <dt className="eyebrow">
              {tStats("founded")}
              {stats.placeholder ? <PlaceholderTag label={a11y("placeholder")} /> : null}
            </dt>
            <dd className="mt-2 font-serif text-3xl tabular text-ink-strong">{stats.founded}</dd>
          </div>
          <div>
            <dt className="eyebrow">{tStats("researchers")}</dt>
            <dd className="mt-2 font-serif text-3xl tabular text-ink-strong">{stats.researchers}</dd>
          </div>
          <div>
            <dt className="eyebrow">{tStats("papers")}</dt>
            <dd className="mt-2 font-serif text-3xl tabular text-ink-strong">{stats.papers}</dd>
          </div>
          <div>
            <dt className="eyebrow">{tStats("releases")}</dt>
            <dd className="mt-2 font-serif text-3xl tabular text-ink-strong">{stats.releases}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
