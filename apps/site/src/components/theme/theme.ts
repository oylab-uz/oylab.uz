/** Only "dark" is stored explicitly; the light theme is the default. */
export const THEME_STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

export function readStoredTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

/**
 * Re-applies the stored theme to `<html>`. React owns the `class` attribute of
 * `<html>` and resets it whenever the `[locale]` layout remounts (every locale
 * switch), which drops the `dark` class the bootstrap script added. Call this
 * from a layout effect so the class is back before the next paint.
 */
export function applyStoredTheme() {
  document.documentElement.classList.toggle("dark", readStoredTheme() === "dark");
}
