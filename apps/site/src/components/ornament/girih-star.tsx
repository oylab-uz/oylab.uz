import { GIRIH_CELL, girihFill, girihStrap } from "@/lib/girih";

const centre = GIRIH_CELL / 2;
const FILL = girihFill(centre, centre);
const STRAP = girihStrap(centre, centre);

/** One girih tile as a small mark. Takes its colour from the text colour. Decorative. */
export function GirihStar({ size = 12, filled = false, className }: { size?: number; filled?: boolean; className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${GIRIH_CELL} ${GIRIH_CELL}`}
      width={size}
      height={size}
      className={className}
      aria-hidden
      focusable="false"
    >
      {filled ? (
        <path d={FILL} fill="currentColor" />
      ) : (
        <path d={STRAP} fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      )}
    </svg>
  );
}
