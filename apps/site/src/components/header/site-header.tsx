"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn, container } from "@/lib/cn";
import { HeaderMark } from "@/components/moon/header-mark";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

/** Hash links point at landing sections and work from any page; the rest are routes. */
const links = [
  { href: "/#research", key: "research", route: false },
  { href: "/#process", key: "process", route: false },
  { href: "/#team", key: "team", route: false },
  { href: "/journal", key: "journal", route: true },
  { href: "/publications", key: "publications", route: true },
  { href: "/#contact", key: "contact", route: false },
] as const;

function isActive(pathname: string, link: (typeof links)[number]) {
  return link.route && (pathname === link.href || pathname.startsWith(`${link.href}/`));
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const a11y = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className={cn(container, "flex h-16 items-center justify-between gap-6")}>
        <Link
          href="/"
          className="flex items-center gap-0.5 text-ink-strong"
          onClick={() => setOpen(false)}
        >
          {/* Sized to Spectral's cap height so the disc reads as the O in OY. */}
          <HeaderMark size={15} className="shrink-0 translate-y-px" />
          <span className="font-serif text-[22px] leading-none tracking-tight">
            Y Lab
          </span>
          <span className="sr-only">OY Lab</span>
        </Link>

        <nav
          aria-label={a11y("mainNavigation")}
          className="hidden items-center gap-7 md:flex"
        >
          {links.map((link) => {
            const active = isActive(pathname, link);
            return (
              <Link
                key={link.key}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm transition-colors hover:text-ink",
                  active ? "text-ink underline decoration-line-strong underline-offset-8" : "text-muted",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <LocaleSwitcher label={a11y("language")} className="hidden sm:flex" />
          <ThemeToggle toLight={a11y("toLight")} toDark={a11y("toDark")} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-surface md:hidden"
          >
            {open ? (
              <X size={20} weight="light" aria-hidden />
            ) : (
              <List size={20} weight="light" aria-hidden />
            )}
            <span className="sr-only">
              {open ? a11y("closeMenu") : a11y("openMenu")}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            className="fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col bg-bg md:hidden"
          >
            <motion.nav
              aria-label={a11y("mainNavigation")}
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              className={cn(container, "flex flex-1 flex-col justify-center gap-2")}
            >
              {links.map((link) => (
                <motion.div
                  key={link.key}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { type: "spring", stiffness: 120, damping: 18 },
                    },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(pathname, link) ? "page" : undefined}
                    className="block border-b border-line py-5 font-serif text-3xl tracking-tight text-ink-strong"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <div className={cn(container, "flex items-center justify-between py-6")}>
              <LocaleSwitcher label={a11y("language")} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
