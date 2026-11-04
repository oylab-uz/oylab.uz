import { moonPath } from "@/lib/moon";

type MoonDiscProps = {
  /** 0 new, 0.5 full. Null draws the neutral (full) disc in the same box. */
  phase: number | null;
  size?: number;
  className?: string;
  /** When given, the SVG is exposed to assistive tech with this label. */
  title?: string;
};

export const MOON_RADIUS = 100;
export const MOON_VIEWBOX = "-104 -104 208 208";

/**
 * A moon disc with the correct terminator for a given phase.
 * Pure markup, so it renders on the server and inside client components alike.
 */
export function MoonDisc({ phase, size = 320, className, title }: MoonDiscProps) {
  return (
    <svg
      viewBox={MOON_VIEWBOX}
      width={size}
      height={size}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <circle r={MOON_RADIUS} fill="var(--color-moon-shadow)" />
      <path d={moonPath(phase ?? 0.5, MOON_RADIUS)} fill="var(--color-moon)" />
      <circle
        r={MOON_RADIUS}
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="0.75"
      />
    </svg>
  );
}
