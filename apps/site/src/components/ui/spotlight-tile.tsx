"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A tile whose hover wash follows the cursor.
 * Writes CSS variables straight onto the element; no React state involved.
 */
export function SpotlightTile({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn("group relative overflow-hidden bg-bg", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in oklch, var(--ink) 6%, transparent), transparent 65%)",
        }}
      />
      <div className="relative flex h-full flex-col">{children}</div>
    </div>
  );
}
