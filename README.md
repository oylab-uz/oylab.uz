# oylab.uz

Landing site for OY Lab, a frontier research lab for computing and science in Tashkent. Three languages (Uzbek, Russian, English), one page, achromatic moon-themed design. The full design rationale is in `docs/DESIGN.md`.

## Run

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start
pnpm lint
```

Node 22 or later and pnpm 11 are expected.

## Stack

Next.js 16 (App Router, Turbopack), Tailwind CSS v4, `motion`, `next-intl`, `@phosphor-icons/react`. Light and dark themes are a `dark` class on `<html>` managed by `src/components/theme/` (no theme library). Fonts come from Google Fonts through `next/font`: Spectral for display, Geist for text, Geist Mono for labels. All three are loaded with the Cyrillic subset.

## Where things live

| What | Where |
|---|---|
| Copy in all three languages | `messages/uz.json`, `messages/ru.json`, `messages/en.json` |
| People, papers, stats, links | `src/lib/content.ts` |
| Locales and default locale | `src/i18n/routing.ts` |
| Colour tokens, fonts, keyframes | `src/app/globals.css` |
| Page sections | `src/components/sections/` |
| Moon phase math | `src/lib/moon.ts`, `src/lib/moon-tonight.ts` |

Routes: `/` is always English, `/uz` and `/ru` are prefixed. Browser-language detection is off (`localeDetection` in `src/i18n/routing.ts`); the proxy in `src/proxy.ts` only handles prefixes and the locale cookie.

## Placeholder content

Team members, portraits, publications and the stats row are invented stand-ins. Each is marked `placeholder: true` in `src/lib/content.ts`, and a small "placeholder" tag renders next to them in every environment until the flag is removed. Replace the entries, drop the flag, and move real portraits into `public/` (then remove the `i.pravatar.cc` entry from `next.config.ts`).

## Uzbek apostrophes

Uzbek Latin text uses U+02BC (ʼ) for oʼ and gʼ throughout. Geist does not ship the official U+02BB glyph, and a font fallback on that one character looked worse than the substitution. Keep new Uzbek copy consistent with this.

## Content: journal, publications, admin

Posts and publication records live in Cloudflare D1 and are edited at
`admin.oylab.uz` (Cloudflare Access in front; in development
`http://admin.localhost:3000` with no login). Each item has one primary
language and optional translations; a missing translation falls back to the
primary text with a notice. Bodies are Markdown with math and code, rendered
to HTML when saved (`src/lib/markdown.ts`). Images upload to R2 from the
admin's Media page.

| Where | What |
| --- | --- |
| `src/db/schema.ts`, `drizzle/` | tables and migrations (Drizzle, D1) |
| `src/lib/content/` | typed queries, translation fallback |
| `src/app/admin/` | the admin (second root layout) |
| `src/app/[locale]/journal`, `.../publications` | public pages |
| `src/proxy.ts` | host split, Access token check, locale routing |
| `scripts/seed-content.ts`, `seeds/seed.sql` | development seed |

Local workflow after cloning: `pnpm install`, `pnpm cf-typegen` (generates the
binding types), `pnpm db:migrate:local`, `pnpm db:seed`, `pnpm dev`, `pnpm test`. Restart `pnpm dev` after editing `messages/*.json`.

## Deploy

Cloudflare Workers through OpenNext, one Worker for the whole site. `pnpm run preview` serves the Worker build locally, `pnpm run deploy` publishes it. Setup steps, domain and continuous deploys are in `docs/DEPLOY.md`.
