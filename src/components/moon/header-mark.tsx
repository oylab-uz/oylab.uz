"use client";

import { MoonDisc } from "@/components/moon/moon-disc";
import { useMoonTonight } from "@/lib/use-moon";

/** The small disc that stands in for the O of OY. */
export function HeaderMark({ size, className }: { size: number; className?: string }) {
  const moon = useMoonTonight();
  return <MoonDisc phase={moon?.phase ?? null} size={size} className={className} />;
}
