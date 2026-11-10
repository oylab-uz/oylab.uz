"use client";

import { List, X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn, container } from "@/lib/cn";
import { HeaderMark } from "@/components/moon/header-mark";
import { Search } from "@/components/search/search";
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

type NavLink = (typeof links)[number];

function isActive(pathname: string, link: NavLink) {
  return link.route && (pathname === link.href || pathname.startsWith(`${link.href}/`));
}

/**
 * Desktop navigation. One small disc, the same object as the O in the wordmark,
 * sits under the current route and glides to whichever link is hovered or
 * focused, then settles back. Motion's layoutId does the travelling.
 */
function DesktopNav({ pathname, label }: { pathname: string; label: string }) {
  const t = useTranslations("nav");
  const [hovered, setHovered] = useState<NavLink["key"] | null>(null);
  const activeKey = links.find((link) => isActive(pathname, link))?.key ?? null;
  const dotKey = hovered ?? activeKey;

  return (
    <nav
      aria-label={label}
      className="hidden items-center gap-1 lg:flex"
      onMouseLeave={() => setHovered(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovered(null);
      }}
    >
      {links.map((link) => {
        const active = link.key === activeKey;
        return (
          <Link
            key={link.key}
            href={link.href}
            aria-current={active ? "page" : undefined}
            onMouseEnter={() => setHovered(link.key)}
            onFocus={() => setHovered(link.key)}
            className={cn(
              "relative flex h-11 items-center px-3 text-sm transition-colors duration-200",
              active || hovered === link.key ? "text-ink-strong" : "text-muted",
            )}
          >
            {t(link.key)}
            {dotKey === link.key ? (
              <motion.span
                layoutId="nav-moon"
                aria-hidden
                transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.6 }}
                className="absolute bottom-1 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-ink-strong"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const a11y = useTranslations("a11y");
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Airy at the top of the page; settles to the 64px the sticky sections assume once content scrolls under it.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      data-scrolled={scrolled || open ? "" : undefined}
      className="group/header sticky top-0 z-40 border-b border-transparent bg-bg/0 transition-[background-color,border-color,backdrop-filter] duration-300 data-scrolled:border-line data-scrolled:bg-bg/85 data-scrolled:backdrop-blur-md"
    >
      <div
        className={cn(
          container,
          "flex items-center justify-between gap-6 transition-[height] duration-300 ease-out-expo",
          scrolled ? "h-16" : "h-16 md:h-20",
        )}
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-0.5 whitespace-nowrap text-ink-strong"
          onClick={() => setOpen(false)}
        >
          {/* Sized to Spectral's cap height so the disc reads as the O in OY. */}
          <HeaderMark size={15} className="shrink-0 translate-y-px" />
          <span className="font-serif text-[22px] leading-none tracking-tight">Y Lab</span>
          <span className="sr-only">OY Lab</span>
        </Link>

        <DesktopNav pathname={pathname} label={a11y("mainNavigation")} />

        <div className="flex shrink-0 items-center gap-1">
          <Search onOpen={() => setOpen(false)} />
          <LocaleSwitcher label={a11y("language")} className="hidden sm:flex" />
          <ThemeToggle toLight={a11y("toLight")} toDark={a11y("toDark")} />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
          >
            {open ? <X size={20} weight="light" aria-hidden /> : <List size={20} weight="light" aria-hidden />}
            <span className="sr-only">{open ? a11y("closeMenu") : a11y("openMenu")}</span>
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
            className="fixed inset-x-0 top-16 bottom-0 z-30 flex flex-col bg-bg lg:hidden"
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
