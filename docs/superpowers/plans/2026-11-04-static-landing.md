# Static Landing (Phase 1) Implementation Plan

**Goal:** Serve every public page of oylab.uz as a prebuilt file from Cloudflare Workers Static Assets, with no Worker code in the request path, so the site stays on the Workers Free plan at any traffic.

**Architecture:** Next.js 16 with `output: "export"`. English lives in a route group at the root (`app/(en)`), Uzbek and Russian under `app/[locale]` with `generateStaticParams` and `dynamicParams = false`; both root layouts render one shared shell. No middleware: `/en` and `/en/*` redirect with 301 through `public/_redirects`. The moon phase and the footer year are computed in the browser after mount from a neutral build-time render. An assets-only Worker (`wrangler.jsonc` without `main`) serves `out/`.

**Spec:** the brief of 2026-11-04 ("Make oylab.uz a static site with an interactive admin"), decisions 1 to 6 confirmed by the user: publish latency 1 to 3 minutes with build status in the admin; D1 as content source with a build-time snapshot; admin at `/admin` plus `/api/admin/*` on the same Worker; job applications through `/api/apply` (Phase 3); rebuilds through Workers Builds Deploy Hooks; publications stay in scope. The OpenNext content platform on `feat/content-platform` is not merged; it is ported in Phase 2.

## Global constraints

- `next` 16.4.5 pinned; `wrangler` 4.157.0; `compatibility_date` on or before 2026-11-03.
- No deploy, no DNS changes. Verification is local (`next build`, `wrangler dev`, headless Chrome) plus `wrangler deploy --dry-run`.
- URLs unchanged: `/` English, `/uz`, `/ru`; `/en*` 301; hreflang and sitemap as today.
- Uzbek copy keeps U+02BC.

## Tasks

1. **Export configuration and route structure.** `output: "export"`, `trailingSlash: false`. Remove `src/proxy.ts`, `src/app/[locale]/[...rest]`, `src/lib/moon-tonight.ts`, `@opennextjs/cloudflare`, `open-next.config.ts`. Create `src/components/site-shell.tsx` (html, body, fonts, theme bootstrap, providers, header, footer, grain) and `src/lib/site-metadata.ts` (the `generateMetadata` body for a locale). `app/(en)/layout.tsx`, `app/(en)/page.tsx`, `app/(en)/not-found.tsx`; `app/[locale]/layout.tsx` (uz, ru), `app/[locale]/page.tsx`, `app/[locale]/404/page.tsx`; `src/components/not-found-view.tsx` shared. Pass: `next build` route table all static; `out/index.html` English, `out/uz/index.html`, `out/ru/index.html`, `out/404.html`, `out/uz/404.html`, `out/ru/404.html`, `out/sitemap.xml`, `out/robots.txt` present and correct.
2. **Moon and year in the browser.** `src/lib/use-moon.ts` (`useSyncExternalStore`, server snapshot null, client snapshot cached per hour) and `src/lib/use-year.ts`. `MoonDisc` accepts `phase: number | null` and draws the neutral disc for null with the same box. `HeroMoon`, `HeaderMark`, `FooterTonight`, `FooterYear` client components replace the server-rendered values. Pass: headless Chrome shows tonight's phase and percent after mount, no hydration warning, no layout shift.
3. **Static assets configuration.** `public/_redirects` (`/en / 301`, `/en/* /:splat 301`), `public/_headers` (immutable `/_next/static/*`, HTML `Cache-Control: public, max-age=60, must-revalidate`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security`), `wrangler.jsonc` assets-only with `directory: "out"`, `html_handling: "auto-trailing-slash"`, `not_found_handling: "404-page"`, route and `workers_dev`/`preview_urls` unchanged; scripts `build`, `preview` (`wrangler dev`), `deploy` (`wrangler deploy`), `cf-typegen` kept. Pass: `wrangler dev` returns 200 for `/`, `/uz`, `/ru`; 301 for `/en` and `/en/x` to the unprefixed path; 404 in the right language for `/nope`, `/uz/nope`, `/ru/nope`; immutable header on `/_next/static/*`; `wrangler deploy --dry-run` succeeds.
4. **Headless pass and docs.** Locale switcher, theme toggle persistence across reload, client navigation between locales and anchors, zero console errors; `docs/DEPLOY.md` rewritten for static assets (build, preview, deploy, Workers Builds settings, no OpenNext section), `README.md` updated; memory updated. Commit, merge to `main`, push.
