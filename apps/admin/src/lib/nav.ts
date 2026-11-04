import type { Icon } from "@phosphor-icons/react";
import { Article, Books, CloudArrowUp, Image, SquaresFour } from "@phosphor-icons/react";

export type AdminNavItem = { href: string; label: string; icon: Icon };

/** Admin navigation; the admin is its own host, so paths start at the root. */
export const adminNav: AdminNavItem[] = [
  { href: "/", label: "Dashboard", icon: SquaresFour },
  { href: "/journal", label: "Journal", icon: Article },
  { href: "/publications", label: "Publications", icon: Books },
  { href: "/media", label: "Media", icon: Image },
  { href: "/site", label: "Site", icon: CloudArrowUp },
  // Reserved for the next specs:
  // { href: "/roles", label: "Roles", icon: Briefcase },
  // { href: "/applications", label: "Applications", icon: Tray },
];
