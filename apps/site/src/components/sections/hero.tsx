import { getTranslations } from "next-intl/server";
import { AbrField } from "@/components/ornament/abr-field";
import { HeroMoon } from "@/components/sections/hero-moon";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { PlaceholderTag } from "@/components/ui/placeholder-tag";
import { cn, container } from "@/lib/cn";
import { stats } from "@/lib/content";

export async function Hero() {
  const t = await getTranslations("hero");
  const tStats = await getTranslations("stats");
  const a11y = await getTranslations("a11y");

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

        <HeroMoon field={<AbrField className="absolute inset-0 size-full" />} />
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
