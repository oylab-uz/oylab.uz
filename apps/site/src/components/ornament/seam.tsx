import { cn, container } from "@/lib/cn";
import { GirihStar } from "./girih-star";

/** Two repeats of the band symbol from OrnamentDefs, one above the seam and one below. */
function AbrBand({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 192" width="24" height="192" className={className} focusable="false">
      <use href="#abr-band" width="24" height="96" />
      <use href="#abr-band" width="24" height="96" y="96" />
    </svg>
  );
}

/**
 * The rule between major sections of the landing page: a row of nailheads
 * with a girih star as its boss, and an abr band crossing it in each gutter
 * on wide screens. Decorative.
 */
export function Seam({ className }: { className?: string }) {
  return (
    <div className={cn("seam", className)} aria-hidden>
      <AbrBand className="seam-band seam-band-start" />
      <AbrBand className="seam-band seam-band-end" />
      <div className={cn(container, "grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3")}>
        <div className="seam-nails" />
        <GirihStar size={20} className="text-qalay" />
        <div className="seam-nails" />
      </div>
    </div>
  );
}
