# OY Lab (oylab.uz) — Design Proposal

Status: approved and implemented, 2026-11-03. Decisions taken: Surface (light) default theme, Spectral + Geist + Geist Mono, `uz` at the root, placeholder content. See section 10 for what changed during the build, section 11 for the ornament layer and section 12 for search (both 2026-11-10).

## 1. Brief

OY Lab is a frontier research lab for computing and science in Uzbekistan and positions itself as the leading AI hub in Central Asia. "Oy" means moon in Uzbek. The site is a single landing page that presents the lab's goals, its research process and its team, in Uzbek (Latin), Russian and English.

## 2. Concept: the moon as a system

- **Mark.** The "O" in OY is a moon disc that shows the real lunar phase for today. The phase is computed from the date (synodic month, 29.53 days), so the site is slightly different every night. It is computed in a Server Component with hourly ISR revalidation, so the first paint is already correct and nothing recomputes on the client.
- **Process metaphor.** Research is shown "in phases": New moon = Question, Waxing = Experiment, Full = Publish, Waning = Deploy and reflect. The process section is a sticky-scroll sequence where the moon changes phase as the reader scrolls.
- **Material.** Lunar regolith: an achromatic palette, hairline rules, a faint fixed grain overlay (opacity 0.03, pointer-events none), no cards unless elevation matters.
- **No accent color.** Emphasis comes from inversion (ink on paper flips to paper on ink), weight and spacing. Focus rings use the ink color. The ornament layer (section 11) is the one exception: two dyes, on ornament strokes only.

## 3. Palette (OKLCH, chroma 0)

| Token | Surface (light) | Night (dark) |
|---|---|---|
| `--bg` | oklch(96.5% 0 0) | oklch(13% 0 0) |
| `--surface` | oklch(93% 0 0) | oklch(17% 0 0) |
| `--line` | oklch(86% 0 0) | oklch(26% 0 0) |
| `--muted` | oklch(48% 0 0) | oklch(68% 0 0) |
| `--ink` | oklch(16% 0 0) | oklch(94% 0 0) |

Both themes are built together. The theme toggle is the moon mark itself (light = day-lit disc, dark = night disc). Pure black is never used.

## 4. Typography

All faces must cover Latin, Latin Extended and Cyrillic, because Russian text sits beside Uzbek and English.

- **Display:** Spectral (Cyrillic confirmed on Google Fonts). Cormorant Garamond is the softer alternative if the user prefers it; Instrument Serif and Newsreader are ruled out because they ship no Cyrillic. Headlines use `tracking-tight leading-none`, text-4xl on mobile and text-6xl on desktop, never larger. Hierarchy comes from weight and color, not size.
- **Body and UI:** Geist (Cyrillic confirmed). Body text is 16px minimum, line-height 1.6, max 65ch.
- **Data and labels:** Geist Mono (Cyrillic confirmed). Used for eyebrows, years, coordinates, stats.
- **Loading.** `next/font/google` must list `subsets: ['latin', 'latin-ext', 'cyrillic']` explicitly for every face, or the Cyrillic glyphs are not downloaded.
- **Uzbek apostrophes.** Uzbek Latin uses oʻ and gʻ (U+02BB). Glyph coverage is checked during implementation; if a face lacks it, the fallback stack is pinned so the apostrophe does not jump fonts.

## 5. Languages

- next-intl with locale-prefixed routes: `/uz`, `/ru`, `/en`, plus hreflang and localized metadata.
- Locale switcher in the nav as three short labels (UZ, RU, EN).
- All copy lives in message files. Draft copy is written in all three languages for review.
- Default locale: English at `/` (decided 2026-11-04; see section 9).

## 6. Page structure (single page, anchored sections)

1. **Nav.** Sticky, hairline bottom border, backdrop blur. Moon mark and "OY Lab" on the left. Research, Process, Team, Contact. Locale switch and theme toggle on the right.
2. **Hero.** Asymmetric 7/5 split on desktop, single column on mobile, `min-h-[100dvh]`. Left: mono eyebrow ("Frontier research lab, Tashkent"), two-line serif headline, one paragraph, two actions ("Read the research" inverted and magnetic, "Join the lab" ghost). Right: the live moon, a large SVG disc with a real terminator line that drifts slowly. Below: a hairline row of mono stats (founded, researchers, papers, open releases).
3. **Marquee.** One slow infinite band of research terms mixing the three scripts. Pauses on hover, static under reduced motion.
4. **Mission.** Grid `2fr 1fr`. Left: a single large statement. Right: four numbered goals separated by hairlines, no cards.
5. **Research areas.** Asymmetric bento: row one `2fr 1fr`, row two `1fr 2fr`. Each tile has a hairline border, a monochrome spotlight border on hover, and one small perpetual micro-animation (tokens typing, a loss curve drawing itself, graph nodes drifting). Titles sit below the tiles.
6. **Process, "Research in phases".** Sticky left column with the moon; right column with four steps. Scroll position drives the phase through `useScroll` and `useTransform`. No scroll listeners.
7. **Team.** Offset grid of grayscale portraits with a faint silver duotone. Hover lifts the portrait and reveals role and focus. Collapses to one column on mobile.
8. **Publications.** Rows: year in mono, title in serif, venue, arrow. Five latest, each linking out.
9. **Partners.** Grayscale logo row, only if there are partners to show.
10. **Join and contact.** Split layout. Left: open roles. Right: email, address, coordinates in mono, social links. Email link only for now, no backend.
11. **Footer.** Tagline in all three languages, locale links, and tonight's moon phase in words.

## 7. Motion (intensity 6 of 10)

- Spring physics everywhere (stiffness 100, damping 20), no linear easing.
- Staggered reveals at 40ms per item.
- Magnetic primary button using motion values, never React state.
- Perpetual: moon terminator drift, marquee, bento micro-animations. Each lives in its own memoized client component.
- Tactile: `scale-[0.98]` on active.
- `prefers-reduced-motion` disables perpetual motion and parallax.
- Only `transform` and `opacity` are animated.

## 8. Stack

- Next.js 16 (App Router, TypeScript, Turbopack), Tailwind CSS v4, bun.
- `motion` (the current Framer Motion package, imported from `motion/react`).
- `next-intl` for routing and messages.
- `@phosphor-icons/react`, one weight across the site.
- Surface and Night themes via a `dark` class on `<html>`: a parser-inserted bootstrap script applies the stored choice before paint, a layout effect re-applies it when the locale layout remounts, and the toggle flips the class and `localStorage` (`src/components/theme/`). No theme library.
- `next/font/google` for Geist, Geist Mono and the serif.
- No database yet. Deploy target: Cloudflare Workers Static Assets, every page a prebuilt file from `next build` with `output: "export"` (decided 2026-11-04 after a per-request OpenNext build; see `docs/DEPLOY.md`).

Note: `create-next-app` refuses a directory that contains `.serena/`, so scaffolding happens in a temporary folder and is moved in.

## 9. Open decisions

1. Default theme: Surface (light) recommended, or Night (dark), or follow system.
2. Display face: serif plus Geist (recommended) or all-sans Geist.
3. Default locale: `uz` was approved first; changed to `en` on 2026-11-04.
4. Content: build with placeholders now and swap in real team, areas and publications later, or wait for real content first. Placeholders are realistic in shape but clearly marked (a `PLACEHOLDER` flag in the message files and a visible note in dev), never invented claims about the real lab. This matters most for the stats row and the publications list.

## 10. Build notes (what differs from the proposal)

- **Uzbek apostrophe.** Geist and Geist Mono do not carry U+02BB (ʻ). All Uzbek copy uses U+02BC (ʼ), which all three faces ship, so no glyph falls back to a system font. Spectral has both.
- **Live moon in the browser.** Tonight's phase comes from `useMoonTonight()` in `src/lib/use-moon.ts`, computed from the visitor's clock after mount. The static HTML carries a neutral full disc of the same size, so nothing shifts and there is no hydration mismatch. Header mark, hero and footer read from it; the footer year works the same way.
- **Locale detection is off.** `/` always serves English, whatever the browser language (changed from Uzbek on 2026-11-04 at the user's request). Visitors switch with the EN · UZ · RU control and the choice is kept in a cookie. Set `localeDetection: true` in `src/i18n/routing.ts` to redirect first visits by `Accept-Language` instead.
- **Process section on phones.** Instead of the desktop sticky column, phones get a slim sticky bar under the header with a 64px moon and the current phase label, so the moon still turns while the four steps scroll past.
- **Placeholder portraits** come from `i.pravatar.cc` (grayscale applied in CSS) rather than random landscape photos. Swap for real portraits in `public/` and remove the remote pattern in `next.config.ts`. The small "placeholder" tag renders in production too, on purpose, until an entry's `placeholder` flag is removed.
- **Hero reveal is CSS only.** The hero text animates with a keyframe stagger instead of Motion, so it is readable before JavaScript loads. Sections below the fold still use the Motion reveal.
- **Headline sizes** stay at `text-4xl md:text-6xl` as the design-taste rules require; Russian headlines wrap to five or six lines on narrow phones, which is accepted.
- **No contact form yet.** Contact is a mail link. A form (for example through Resend) is a later addition.

## 11. Ornament layer (2026-11-10)

Uzbek ornament, taken from the design canvas "OY Lab — oylab.uz": its ornament vocabulary only, not its palette or its type. One rule governs the layer: structure, not wallpaper. An ornament marks a boundary, a frame or a figure. It never sits behind running copy, and it is `aria-hidden` unless it carries data.

| Ornament | What it is | Where it is used |
|---|---|---|
| Girih | The eight-point star of Timurid tile work: two squares on one centre, one turned 45°. Geometry in `src/lib/girih.ts`. | The lunar-month figure in Process (`GirihMonth`), the boss at the centre of every seam and the marker of the selected search result (`GirihStar`). |
| Seam | A row of nailheads, as on the edge of a sandiq chest. | Between the landing sections from Research down, in place of the hairline (`Seam`). |
| Abr | An ikat band: warp threads with two tied motifs, ragged at the ends because the thread is dyed before it is woven. | As a whole width of cloth behind the hero iwan (`AbrField`), and as a band crossing each seam in both gutters on screens 1024 px and wider (one `<symbol>` in `OrnamentDefs`, reused by every seam). |
| Burchak | The corner fittings of a chest, on two opposite corners of a frame. | The research grid and the search palette (`.burchak`). |
| Iwan | The pointed arch of a portal, as a clip path in bounding-box units so it fits any box. | Team portraits, and the arch cut out of the hero cloth, in which the live moon floats; by night it glows faintly (`.iwan`, `IwanOutline`, `.iwan-glow`). |

- **The lunar-month figure.** Thirty tiles, one per night of the lunar month. Filled tiles are nights passed; the gold tile is tonight. Oy is both moon and month in Uzbek. It is computed from the visitor's clock like every other moon on the site, so the static HTML carries the empty lattice and nothing on it is invented.
- **Colour.** Three tokens in `globals.css`. `--qalay` (tin) is a grey for nails, corners and strapwork. The dyes are atlas colours: `--atlas-qirmiz` (red) leads by day and `--atlas-kok` (blue) by night, through `--abr-lead`; `--atlas-sariq` (gold) is the second dye in both. The dyes colour ornament strokes only: the abr motifs, tonight's tile, the selected search result, a frame's corners on hover. Text, controls and focus rings stay achromatic.
- **Motion.** Tiles fill one after another on mount, 32 ms apart, so tonight's lands last. Opacity and transform only; reduced motion shows the final state at once.
- **Phones.** The abr bands are hidden below 1024 px, where there is no gutter for them. Everything else scales.

## 12. Search (2026-11-10)

- **Opening it.** ⌘K, Ctrl K or `/` from any page, or the button in the header (a pill with the shortcut from 1280 px, an icon below that). The shortcut is matched by key position as well as by letter, so it works on a Russian layout.
- **What it searches.** Everything a visitor can read in the current language: the landing page section by section (goals, research areas, process steps, open roles), people, journal posts in full and publications with authors and abstract. Before anything is typed it offers the eight places the navigation names.
- **How it matches.** Every word of the query must be found. A title outranks a subtitle, which outranks body text; a whole word outranks a word start, which outranks a match inside a word. One typo is forgiven in a title word of five letters or more. Case, punctuation, Latin diacritics and Uzbek apostrophes are ignored (oʻ, oʼ, o' and o all match), and ё matches е. Matches are marked in the page's own spelling.
- **The palette.** A native modal `<dialog>`, full screen on phones. The input is a combobox over a listbox: arrows move the selection while focus stays in the input, Enter follows the selected link, Escape closes. Results are grouped (On this site, Journal, Publications, People) and a status line announces the count.
- **Where the index comes from.** See `ARCHITECTURE.md`: a static file per language, built with the site.
