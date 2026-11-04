import type { Icon } from "@phosphor-icons/react";
import { Article, Books, Image, SquaresFour } from "@phosphor-icons/react";

export type AdminNavItem = { href: string; label: string; icon: Icon };

/** Paths are the ones the browser sees on the admin host (no `/admin` prefix). */
export const adminNav: AdminNavItem[] = [
  { href: "/", label: "Dashboard", icon: SquaresFour },
  { href: "/journal", label: "Journal", icon: Article },
  { href: "/publications", label: "Publications", icon: Books },
  { href: "/media", label: "Media", icon: Image },
  // Reserved for the next specs:
  // { href: "/roles", label: "Roles", icon: Briefcase },
  // { href: "/applications", label: "Applications", icon: Tray },
  // { href: "/site", label: "Site", icon: Sliders },
];
