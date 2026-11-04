/**
 * Tiny marker rendered next to invented content, in every environment,
 * so nobody mistakes placeholder numbers or people for real ones.
 * It disappears on its own once an entry's `placeholder` flag is dropped.
 */
export function PlaceholderTag({ label }: { label: string }) {
  return (
    <span
      title={label}
      className="ml-2 inline-block rounded-sm border border-dashed border-line-strong px-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted align-middle"
    >
      placeholder
    </span>
  );
}
