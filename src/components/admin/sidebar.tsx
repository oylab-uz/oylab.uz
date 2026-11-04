"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoonDisc } from "@/components/moon/moon-disc";
import { adminNav } from "@/app/admin/nav";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string) {
  const path = pathname.replace(/^\/admin(?=\/|$)/, "") || "/";
  return href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`);
}

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  return (
    <aside className="flex shrink-0 flex-col border-b border-line bg-surface/40 lg:min-h-dvh lg:w-60 lg:border-r lg:border-b-0">
      <Link href="/" className="flex h-16 items-center gap-2 px-5 text-ink-strong">
        <MoonDisc phase={0.5} size={14} />
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
      <p className="mt-auto hidden px-5 py-4 font-mono text-[11px] tracking-[0.06em] text-muted lg:block">
        {email}
      </p>
    </aside>
  );
}
