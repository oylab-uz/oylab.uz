"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { MoonDisc } from "@/components/moon/moon-disc";
import { cn, container } from "@/lib/cn";

export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={cn(container, "grid min-h-[calc(100dvh-4rem)] items-center gap-12 py-24 lg:grid-cols-12")}>
      <div className="lg:col-span-7">
        <p className="eyebrow">500</p>
        <h1 className="mt-4 max-w-[16ch] font-serif text-4xl font-light tracking-tight leading-[1.02] text-ink-strong md:text-6xl">
          {t("title")}
        </h1>
        <p className="mt-6 max-w-[50ch] text-muted">{t("lead")}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex h-12 cursor-pointer items-center rounded-full bg-ink px-6 text-sm font-medium text-bg transition-colors hover:bg-ink-strong"
        >
          {t("retry")}
        </button>
      </div>
      <div className="flex justify-center lg:col-span-5 lg:justify-end">
        <MoonDisc phase={0.97} size={320} className="w-[min(60vw,320px)]" />
      </div>
    </main>
  );
}
