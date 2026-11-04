# Deploying oylab.uz to Cloudflare Workers Static Assets

The public site is a static export (`next build` with `output: "export"`)
served by one assets-only Worker named `oylab`. No Worker code runs for page
views: static asset requests are free and unlimited, so the site stays on the
Workers Free plan at any traffic. Worker code arrives in Phase 2 for the admin
API only (`/api/*` through `run_worker_first`).

## Layout of the export

- `/` is English (`src/app/(en)`), `/uz` and `/ru` are prefixed
  (`src/app/[locale]` with `generateStaticParams` limited to those two).
  Both layouts render `src/components/site-shell.tsx`.
- `public/_redirects` sends `/en` and `/en/*` to the unprefixed path with 301.
- `out/404.html` (English, from `src/app/global-not-found.tsx`),
  `out/uz/404.html` and `out/ru/404.html` (from `src/app/[locale]/404`) are
  served by `not_found_handling: "404-page"`, which picks the nearest
  `404.html` up the path.
- `public/_headers`: immutable caching for `/_next/static/*`, a 60 second
  revalidating cache for everything else, and the baseline security headers
  (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`,
  `Permissions-Policy`, `Strict-Transport-Security`). No CSP yet: the theme
  bootstrap is an inline script.
- The moon phase and the footer year are computed in the browser after mount
  (`src/lib/use-moon.ts`); the build renders a neutral disc of the same size.
- Switching language is a full page load (the two locales are separate root
  layouts); navigation inside a language is client-side.

## Commands

```
pnpm build      # next build -> out/
pnpm preview    # build, then wrangler dev serving out/ on http://localhost:8787
pnpm deploy     # build, then wrangler deploy
```

`pnpm exec wrangler deploy --dry-run` checks the configuration without
uploading.

## One-time setup (account owner)

1. Add `oylab.uz` as a zone in the Cloudflare account and switch the
   nameservers at the registrar to the two that Cloudflare shows. Custom
   domains for Workers require the zone to be Active on the same account.
   Import the mail records first so email keeps working.
2. Log in once on the machine that deploys: `pnpm wrangler login`.
3. `pnpm deploy`. Wrangler creates the Worker, uploads `out/`, and creates the
   DNS record and certificate for `oylab.uz` from the `routes` entry. Check
   `https://oylab.uz`, `/uz`, `/ru`, `/en` (301) and `/nope` (404).
4. `www.oylab.uz`: add a proxied `AAAA` record `www` pointing to `100::`, then
   Rules, Redirect Rules, template "Redirect from WWW to root", 301.
5. Continuous deploys: Workers & Pages, `oylab`, Settings, Builds, connect the
   GitHub repository `oylab-uz/oylab.uz`. Build command `pnpm build`, deploy
   command `pnpm exec wrangler deploy`, production branch `main`. Every push
   to `main` then deploys.

The `workers.dev` hostname and preview URLs stay off: the site is only
reachable on its own hostname. For a one-off test before the zone is active,
set `"workers_dev": true` and remove `routes` temporarily, then put both back.

After the first deploy, Worker metrics should show no invocations for page
views; only assets requests.

## Images

`images.unoptimized` is on: a static export has no image optimizer, and the
team portraits are placeholders. Real photos will go through Cloudflare Image
Transformations with a custom loader (planned with the content platform).

## Continuous integration

`.github/workflows/ci.yml` (added with the content platform) runs lint and
`next build` on pull requests and pushes.

## Versions

Pinned in `package.json`: `next` 16.4.5, `wrangler` 4.157.0 (ships workerd
1.20261103.1, so `compatibility_date` must not be later than 2026-11-03).
