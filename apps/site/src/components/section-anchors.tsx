"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** The element a same-page link points at, if the link is one and the element exists. */
function sectionFor(link: HTMLAnchorElement): HTMLElement | null {
  const url = new URL(link.href, location.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return null;
  return document.getElementById(decodeURIComponent(url.hash.slice(1)));
}

/**
 * Scrolls to a section, then once more when the scroll ends: leaving the top
 * of the page shrinks the sticky header, which moves everything below it
 * after the target was measured.
 */
function goTo(section: HTMLElement) {
  section.scrollIntoView();
  window.addEventListener("scrollend", () => section.scrollIntoView(), { once: true });
}

/** Scrolls to the section the address names, if any, then takes the name out of the address. */
function settle() {
  if (location.hash.length < 2) return;
  const section = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (!section) return;
  goTo(section);
  history.replaceState(history.state, "", location.pathname + location.search);
}

/**
 * Keeps section names out of the address bar. A link to a section of the page
 * being read scrolls there and leaves the URL alone; arriving from another
 * page with a hash scrolls as usual, then the hash is dropped. The links stay
 * ordinary `/#section` anchors, so they still work before this loads.
 */
export function SectionAnchors() {
  const pathname = usePathname();

  // On load and after every route change: the router has put the hash in the address by now.
  useEffect(settle, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a") : null;
      if (!link || link.target === "_blank") return;
      const section = sectionFor(link);
      if (!section) return;
      // Preventing the default here also stops the router's own navigation.
      event.preventDefault();
      // A frame later: the click may also be closing a menu or the search palette.
      requestAnimationFrame(() => goTo(section));
    };

    // Capture phase, so this runs before the link's own handlers.
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", settle);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", settle);
    };
  }, []);

  return null;
}
