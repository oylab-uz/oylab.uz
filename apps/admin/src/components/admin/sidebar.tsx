"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOut } from "@phosphor-icons/react";
import { MoonDisc } from "@/components/moon/moon-disc";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { adminNav } from "@/lib/nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ email, canSignOut }: { email: string; canSignOut: boolean }) {
  const pathname = usePathname();
  return (
    <aside className="flex shrink-0 flex-col border-b border-line bg-surface/40 lg:min-h-dvh lg:w-60 lg:border-r lg:border-b-0">
      <Link href="/" className="flex h-16 items-center gap-2 px-5 text-ink-strong">
        <MoonDisc phase={0.22} size={14} />
        <span className="text-sm font-medium tracking-tight">OY Lab admin</span>
      </Link>
      <nav aria-label="Admin" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:px-3">
        {adminNav.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-2.5 rounded-full px-3.5 text-sm transition-colors",
                active ? "bg-ink text-bg" : "text-muted hover:bg-surface hover:text-ink",
              )}
            >
              <Icon size={18} weight="light" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto hidden flex-col gap-1 border-t border-line px-3 py-3 lg:flex">
        {canSignOut ? (
          // Cloudflare Access handles this path on the admin host: it clears the session cookie
          // and shows the login page. A plain anchor, so it is a full navigation.
          <a
            href="/cdn-cgi/access/logout"
            className="flex min-h-11 items-center gap-2.5 rounded-full px-3.5 text-sm text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <SignOut size={18} weight="light" aria-hidden />
            Sign out
          </a>
        ) : null}
        <div className="flex min-w-0 items-center justify-between gap-2 pl-3.5">
          <p className="min-w-0 truncate font-mono text-[11px] tracking-[0.06em] text-muted" title={email}>
            {email}
          </p>
          <ThemeToggle toLight="Switch to the light theme" toDark="Switch to the night theme" />
        </div>
      </div>
    </aside>
  );
}
