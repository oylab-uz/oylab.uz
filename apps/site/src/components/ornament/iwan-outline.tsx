/**
 * The outline of the iwan arch, drawn just inside the `.iwan` clip path so the
 * two coincide on any box. Stretches with its box; the stroke stays a hairline.
 */
export function IwanOutline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 96" preserveAspectRatio="none" className={className} aria-hidden focusable="false">
      <path
        d="M 0.5 96 L 0.5 40.32 A 66.24 88.32 0 0 1 36 2.4 A 66.24 88.32 0 0 1 71.5 40.32 L 71.5 96"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
