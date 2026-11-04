import { THEME_STORAGE_KEY } from "./theme";

/**
 * Applies the stored theme before first paint.
 *
 * The script is emitted as raw HTML inside a wrapper element rather than as a
 * React `<script>` element. React never executes scripts it creates on the
 * client and warns about them in development; the `[locale]` layout remounts
 * on every locale switch, so a React-rendered script would be recreated and
 * trigger that warning on each switch. Parser-inserted HTML runs exactly once
 * per document load, which is all a theme bootstrap needs. `Providers` keeps
 * the class in sync across remounts.
 */
const bootstrap = `(function(){try{if(localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)})==="dark")document.documentElement.classList.add("dark")}catch(e){}})()`;

export function ThemeInit() {
  return (
    <div
      hidden
      dangerouslySetInnerHTML={{ __html: `<script>${bootstrap}</script>` }}
    />
  );
}
