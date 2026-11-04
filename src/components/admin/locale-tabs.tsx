"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const NAMES: Record<Locale, string> = { en: "English", uz: "Oʼzbekcha", ru: "Русский" };

export function LocaleTabs({
  locales,
  active,
  enabled,
  primary,
  onSelect,
  errors,
  children,
}: {
  locales: readonly Locale[];
  active: Locale;
  enabled: Record<Locale, boolean>;
  primary: Locale;
  onSelect: (locale: Locale) => void;
  errors: Partial<Record<Locale, boolean>>;
  children: (locale: Locale) => ReactNode;
}) {
  return (
    <div>
      <div role="tablist" aria-label="Languages" className="flex gap-1 border-b border-line">
        {locales.map((locale) => {
          const selected = locale === active;
          return (
            <button
              key={locale}
              type="button"
              role="tab"
              id={`tab-${locale}`}
              aria-selected={selected}
              aria-controls={`panel-${locale}`}
              onClick={() => onSelect(locale)}
              className={cn(
                "-mb-px inline-flex min-h-11 cursor-pointer items-center gap-2 border-b-2 px-4 text-sm",
                selected ? "border-ink text-ink-strong" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {NAMES[locale]}
              {locale === primary ? <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">primary</span> : null}
              {!enabled[locale] ? <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">empty</span> : null}
              {errors[locale] ? <span className="size-1.5 rounded-full bg-ink" aria-label="Has errors" /> : null}
            </button>
          );
        })}
      </div>
      {locales.map((locale) => (
        <div
          key={locale}
          role="tabpanel"
          id={`panel-${locale}`}
          aria-labelledby={`tab-${locale}`}
          hidden={locale !== active}
          className="pt-6"
        >
          {children(locale)}
        </div>
      ))}
    </div>
  );
}
