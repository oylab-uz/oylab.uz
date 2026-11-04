/** Page number from a query param: 1 by default, clamped to [1, pages]. */
export function parsePage(raw: string | string[] | undefined, pages: number): number {
  const value = Array.isArray(raw) ? raw[0] : raw;
  const n = value && /^\d+$/.test(value) ? Number(value) : 1;
  return Math.min(Math.max(1, n), Math.max(1, pages));
}
