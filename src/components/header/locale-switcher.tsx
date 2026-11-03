"use client";

import { useLocale } from "next-intl";
import { Fragment } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { localeLabels, localeNames, routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const current = useLocale();
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className={cn(
        "flex items-center font-mono text-[11px] tracking-[0.18em]",
        className,
      )}
    >
      {routing.locales.map((locale, index) => {
        const active = locale === current;
        return (
          <Fragment key={locale}>
            {index > 0 ? (
              <span aria-hidden className="mx-1 text-line-strong">
                ·
              </span>
            ) : null}
            <Link
              href={pathname}
              locale={locale}
              hrefLang={locale}
              lang={locale}
              aria-current={active ? "true" : undefined}
              title={localeNames[locale]}
              className={cn(
                "grid h-11 min-w-9 cursor-pointer place-items-center rounded-full px-1 transition-colors",
                active ? "text-ink-strong" : "text-muted hover:text-ink",
              )}
            >
              {localeLabels[locale]}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
