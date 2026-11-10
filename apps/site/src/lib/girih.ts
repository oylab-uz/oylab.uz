/**
 * Girih geometry for the ornament layer.
 *
 * The tile is the eight-point star of Timurid brick and tile work: two squares
 * on one centre, one turned 45°. Drawn twice, as a filled outline and as the
 * strapwork of the two squares laid over it.
 */

/** Side of the square cell one tile sits in. */
export const GIRIH_CELL = 48;

/** Star radius inside a cell: one unit of air on every side. */
export const GIRIH_RADIUS = 23;

/** Where the squares cross, as a fraction of the radius. */
const NOTCH = Math.sqrt(2 - Math.SQRT2);

const f = (n: number) => Number(n.toFixed(2));

/** The star's outline: sixteen vertices, points and notches in turn. */
export function girihFill(cx: number, cy: number, r: number = GIRIH_RADIUS): string {
  const points = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8;
    const reach = i % 2 === 0 ? r : r * NOTCH;
    return `${f(cx + reach * Math.cos(angle))} ${f(cy + reach * Math.sin(angle))}`;
  });
  return `M ${points.join(" L ")} Z`;
}

/** The strapwork: the turned square, then the upright one. */
export function girihStrap(cx: number, cy: number, r: number = GIRIH_RADIUS): string {
  const s = r / Math.SQRT2;
  const turned = `M ${f(cx + r)} ${f(cy)} L ${f(cx)} ${f(cy + r)} L ${f(cx - r)} ${f(cy)} L ${f(cx)} ${f(cy - r)} Z`;
  const upright = `M ${f(cx + s)} ${f(cy + s)} L ${f(cx - s)} ${f(cy + s)} L ${f(cx - s)} ${f(cy - s)} L ${f(cx + s)} ${f(cy - s)} Z`;
  return `${turned} ${upright}`;
}

/** Centre of tile `index` in a grid `columns` wide, filled row by row. */
export function girihCentre(index: number, columns: number, cell: number = GIRIH_CELL): { x: number; y: number } {
  return {
    x: (index % columns) * cell + cell / 2,
    y: Math.floor(index / columns) * cell + cell / 2,
  };
}
