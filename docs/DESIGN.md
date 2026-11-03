# OY Lab (oylab.uz) — Design Proposal

Status: approved and implemented, 2026-11-03. Decisions taken: Surface (light) default theme, Spectral + Geist + Geist Mono, `uz` at the root, placeholder content. See section 10 for what changed during the build.

## 1. Brief

OY Lab is a frontier research lab for computing and science in Uzbekistan and positions itself as the leading AI hub in Central Asia. "Oy" means moon in Uzbek. The site is a single landing page that presents the lab's goals, its research process and its team, in Uzbek (Latin), Russian and English.

## 2. Concept: the moon as a system

- **Mark.** The "O" in OY is a moon disc that shows the real lunar phase for today. The phase is computed from the date (synodic month, 29.53 days), so the site is slightly different every night. It is computed in a Server Component with hourly ISR revalidation, so the first paint is already correct and nothing recomputes on the client.
- **Process metaphor.** Research is shown "in phases": New moon = Question, Waxing = Experiment, Full = Publish, Waning = Deploy and reflect. The process section is a sticky-scroll sequence where the moon changes phase as the reader scrolls.
- **Material.** Lunar regolith: an achromatic palette, hairline rules, a faint fixed grain overlay (opacity 0.03, pointer-events none), no cards unless elevation matters.
- **No accent color.** Emphasis comes from inversion (ink on paper flips to paper on ink), weight and spacing. Focus rings use the ink color.

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
- Default locale is an open decision (see section 9).

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

- Next.js 16 (App Router, TypeScript, Turbopack), Tailwind CSS v4, pnpm.
- `motion` (the current Framer Motion package, imported from `motion/react`).
- `next-intl` for routing and messages.
- `@phosphor-icons/react`, one weight across the site.
- `next-themes` for the Surface and Night themes.
- `next/font/google` for Geist, Geist Mono and the serif.
- Static site, no database. Deploy target: Vercel, after the build is approved.

Note: `create-next-app` refuses a directory that contains `.serena/`, so scaffolding happens in a temporary folder and is moved in.

## 9. Open decisions

1. Default theme: Surface (light) recommended, or Night (dark), or follow system.
2. Display face: serif plus Geist (recommended) or all-sans Geist.
3. Default locale: `uz` recommended, or `en`, or `ru`.
4. Content: build with placeholders now and swap in real team, areas and publications later, or wait for real content first. Placeholders are realistic in shape but clearly marked (a `PLACEHOLDER` flag in the message files and a visible note in dev), never invented claims about the real lab. This matters most for the stats row and the publications list.

## 10. Build notes (what differs from the proposal)

- **Uzbek apostrophe.** Geist and Geist Mono do not carry U+02BB (ʻ). All Uzbek copy uses U+02BC (ʼ), which all three faces ship, so no glyph falls back to a system font. Spectral has both.
- **Live moon under Cache Components.** Next.js 16 refuses `new Date()` during prerender, so tonight's phase comes from a `"use cache"` function with `cacheLife("hours")` in `src/lib/moon-tonight.ts`. Header mark, hero, process section and footer all read from it.
- **Locale detection is off.** `/` always serves Uzbek, whatever the browser language, because that is what "root serves uz" was taken to mean. Visitors switch with the UZ · RU · EN control and the choice is kept in a cookie. Set `localeDetection: true` in `src/i18n/routing.ts` to redirect first visits by `Accept-Language` instead.
- **Process section on phones.** Instead of the desktop sticky column, phones get a slim sticky bar under the header with a 64px moon and the current phase label, so the moon still turns while the four steps scroll past.
- **Placeholder portraits** come from `i.pravatar.cc` (grayscale applied in CSS) rather than random landscape photos. Swap for real portraits in `public/` and remove the remote pattern in `next.config.ts`. The small "placeholder" tag renders in production too, on purpose, until an entry's `placeholder` flag is removed.
- **Hero reveal is CSS only.** The hero text animates with a keyframe stagger instead of Motion, so it is readable before JavaScript loads. Sections below the fold still use the Motion reveal.
- **Headline sizes** stay at `text-4xl md:text-6xl` as the design-taste rules require; Russian headlines wrap to five or six lines on narrow phones, which is accepted.
- **No contact form yet.** Contact is a mail link. A form (for example through Resend) is a later addition.
