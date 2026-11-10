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
/**
 * Flips the theme and remembers the choice. Colour transitions are suppressed
 * for one frame so the whole page flips at once.
 */
export function toggleTheme() {
  const freeze = document.createElement("style");
  freeze.textContent = "*,*::before,*::after{transition:none!important}";
  document.head.appendChild(freeze);

  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, dark ? "dark" : "light");
  } catch {
    // Storage can be unavailable (private mode, blocked). The toggle still works for this page.
  }

  // Force a style flush before removing the freeze.
  window.getComputedStyle(document.documentElement).getPropertyValue("color-scheme");
  requestAnimationFrame(() => freeze.remove());
}

export function applyStoredTheme() {
  document.documentElement.classList.toggle("dark", readStoredTheme() === "dark");
}
