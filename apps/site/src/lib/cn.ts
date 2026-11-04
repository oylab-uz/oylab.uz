export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** Page gutter and max width shared by every section. */
export const container = "mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10";
