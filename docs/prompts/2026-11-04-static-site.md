# Make oylab.uz a static site with an interactive admin

## Goal

Change the architecture of oylab.uz so that every public page is a prebuilt
file served by Cloudflare Workers Static Assets, with no Worker code in the
request path. Static asset requests are free, unlimited and use no CPU, so the
site stays on the Workers Free plan (10 ms CPU per invocation, 100,000 Worker
invocations a day) however much traffic it gets. The only code that runs at
request time is a small admin API that staff use to write journal posts and
job postings. Publishing triggers a rebuild and redeploy of the static site.

This is an architecture change, not a performance tune-up. Today every page
renders per request in a Next.js server running inside the Worker through
OpenNext.

## Where things stand (2026-11-04)

- The landing site (Next.js 16.4.5 App Router, Tailwind v4, `motion`,
  `next-intl` 4, three locales) is committed on `main` and pushed to
  github.com/oylab-uz/oylab.uz. **The repository is public.**
- Deploy wiring exists for OpenNext: `wrangler.jsonc` (Worker `oylab`, custom
  domain `oylab.uz`, `workers_dev` and `preview_urls` off),
  `open-next.config.ts`, the `preview` and `deploy` scripts, and
  `docs/DEPLOY.md`. Nothing has been deployed: the Worker does not exist on the
  account yet.
- DNS migration is in progress and owned by the user. The zone `oylab.uz` is
  on the Cloudflare account "OY Lab" (Free plan), the mail records from the old
  host (Eskiz) are being imported, and the nameserver switch at Eskiz is
  pending. Do not touch DNS. Phase 1 should land before the first deploy, so
  the first thing served on oylab.uz is the static site.
- `docs/superpowers/specs/2026-11-04-content-platform-design.md` and
  `docs/superpowers/plans/2026-11-04-content-platform.md` describe the journal,
  publications and admin. Neither has been started. Both assume per-request D1
  reads, Next.js server actions, and Markdown rendered in the Worker, which this
  change rules out. Revise them; do not execute the plan as written. Keep what
  still holds: the data model, the translation rules (one primary language plus
  optional translations, fallback with a visible notice, canonical URL on the
  primary language), Markdown with GFM and KaTeX, slugs locked after publish,
  media in R2 on `media.oylab.uz`, Cloudflare Access for staff sign-in.
- What renders per request today, and why:
  - `src/lib/moon-tonight.ts` calls `connection()` so the moon phase is
    computed per visit. `src/app/[locale]/layout.tsx` (header disc and footer)
    and `src/app/[locale]/page.tsx` await it. The disc is
    `src/components/moon/moon-disc.tsx`; `site-header.tsx` takes `phase`,
    `site-footer.tsx` takes `moon`.
  - `src/proxy.ts` is the next-intl middleware: English unprefixed at `/`,
    `/uz` and `/ru` prefixed, `/en/*` redirected to the unprefixed path, the
    locale cookie. Browser-language detection is off.
  - `src/app/[locale]/[...rest]/page.tsx` is a catch-all that calls
    `notFound()` to render the localized 404.
- No forms exist today. The Join section uses `mailto:` links.

Read before writing code. This Next.js version differs from training data
(see `AGENTS.md`):

- `node_modules/next/dist/docs/01-app/02-guides/static-exports.md`. Not
  supported under `output: "export"`: proxy (middleware), rewrites, redirects
  and headers in `next.config`, cookies, server actions, route handlers that
  read the request, ISR, the default image loader, and dynamic routes without
  `generateStaticParams` or with `dynamicParams: true`. `next dev` errors on
  these as well.
- The next-intl docs for the installed version on static export and usage
  without middleware.
- The Cloudflare Workers Static Assets docs: `_headers`, `_redirects`,
  `html_handling`, `not_found_handling`, `run_worker_first`. The wrangler
  4.157 schema (`node_modules/wrangler/config-schema.json`) confirms that
  `run_worker_first` takes `true` or an array of route patterns (negative
  patterns allowed), `not_found_handling` is `single-page-application`,
  `404-page` or `none`, and `html_handling` is `auto-trailing-slash`,
  `force-trailing-slash`, `drop-trailing-slash` or `none`.

## Decisions already made (do not reopen)

1. Stay on Next.js. The public site is built with `output: "export"`. No
   framework switch.
2. URLs stay as they are: `/` is English, `/uz` and `/ru` are prefixed, `/en`
   and `/en/*` redirect with 301 to the unprefixed path. hreflang alternates
   and the sitemap stay as today.
3. The moon phase moves to the browser. It is computed from the visitor's
   clock after mount. The build-time HTML shows a neutral state with identical
   dimensions, so nothing shifts and there is no hydration mismatch. The same
   applies to anything else that depends on the date, such as the footer year.
4. Markdown renders at build time for public pages, and in the browser for the
   admin preview, through one shared module, so the preview equals the output.
   It never renders in the Worker.
5. One Worker named `oylab`, one deploy. The public files are its static
   assets. Worker code runs only for the paths listed in `run_worker_first`.
6. The Worker API stays I/O-bound to fit 10 ms of CPU: Access JWT
   verification, D1 and R2 calls, triggering a build. No Markdown, KaTeX,
   image processing or other heavy parsing inside it.

## Decisions to confirm with the user

Recommend one option for each, explain the trade-off in a sentence or two, and
wait for the answers.

1. **Publish latency.** The approved spec promised a post live within a
   second. Static means publish = rebuild + deploy, about 1 to 3 minutes.
   Recommend accepting it, with the admin showing build status (queued,
   building, live, failed).
2. **Content store.** Recommend D1 as the source of truth: drafts stay private
   (the repository is public) and the spec's data model carries over. A build
   step snapshots published content from D1 to JSON before `next build`.
   Alternative: Markdown files in the repository, committed by the admin
   through the GitHub API, which gives version history for free but makes
   drafts public or needs a second store. Name where the build-time Cloudflare
   credential lives in each case.
3. **Admin location.** Recommend `oylab.uz/admin` (client-rendered admin pages
   in the same static export) plus `oylab.uz/api/admin/*` (Worker), both
   covered by one Cloudflare Access application with path rules. With assets
   served first, an `admin.oylab.uz` host on the same Worker would receive the
   public `index.html`. A separate host needs either `run_worker_first: true`,
   which turns every page view into a Worker invocation and defeats the goal,
   or a second Worker. `admin.oylab.uz` can redirect to `/admin` with a
   Redirect Rule.
4. **Job applications.** A static page cannot accept uploads. Options: a
   `mailto:` link or an external form (fully static), or one public endpoint
   `/api/apply` that stores CVs in a private R2 bucket and rows in D1, with
   rate limiting and Turnstile, readable only in the admin. Ask which.
5. **Rebuild trigger.** Check the current Cloudflare docs for what exists: a
   Workers Builds API or deploy hook, or a GitHub Actions workflow
   (`workflow_dispatch` or `repository_dispatch`) that builds and runs
   `wrangler deploy`. GitHub Actions minutes are free for public repositories.
   Recommend the simplest reliable option, with one pipeline for both code
   pushes and content publishes.
6. **Content types in scope.** Journal posts and job postings for certain.
   Confirm whether publications, which are in the current spec, stay in.

## Phases

Each phase ends with its pass criteria met, a commit, and a short report.

### Phase 1: static landing, deployable

Ships on its own, before any content-platform work.

- Set `output: "export"`. Remove `src/proxy.ts`, the `[...rest]` catch-all and
  the `connection()` call. Use `generateStaticParams` and `setRequestLocale` in
  every layout and page.
- Serve English at `/` without middleware, without breaking client-side
  navigation. Next writes RSC payload files next to each HTML file, and the
  client router fetches them on navigation. Moving or copying HTML after the
  build without its payload breaks navigation silently. Approaches to
  evaluate: a route group for English at the root plus `[locale]` limited to
  `uz` and `ru` with `dynamicParams = false` (two root layouts sharing page
  components), or a `_redirects` rewrite if Workers Static Assets supports
  rewrites with status 200. Pick one and explain why.
- Localized 404: `out/404.html` (English), `out/uz/404.html` and
  `out/ru/404.html`, with `not_found_handling: "404-page"`, which serves the
  nearest `404.html` up the path.
- `public/_redirects` for `/en` and `/en/*`. `public/_headers` keeps the
  immutable rule for `/_next/static/*` and adds HTML caching (short max-age
  with revalidation), plus any security headers you consider standard; list
  them in the report.
- `wrangler.jsonc`: an assets-only Worker (no `main`), `assets.directory`
  pointing at the export directory, `html_handling`, `not_found_handling`, the
  custom domain route unchanged, `workers_dev` and `preview_urls` still off.
  Remove `@opennextjs/cloudflare` and `open-next.config.ts`. Scripts: `build`,
  `preview` (`wrangler dev` serving the export), `deploy`. Keep `cf-typegen`
  for Phase 2 bindings.
- Pass criteria:
  - The `next build` route table shows every route as static. No dynamic
    routes, no server functions.
  - `out/index.html` has `lang="en"` and English copy. `out/uz/index.html`,
    `out/ru/index.html`, the three 404 files, `sitemap.xml` and `robots.txt`
    exist and are correct.
  - Local `wrangler dev`: `/`, `/uz`, `/ru` return 200. `/en` and `/en/x`
    return 301 to the unprefixed path. `/nope`, `/uz/nope` and `/ru/nope`
    return 404 in the right language. `/_next/static/*` carries the immutable
    cache header.
  - Headless browser: the locale switcher, the theme toggle (and that it
    persists), client-side navigation between locales and section anchors, the
    moon disc showing tonight's phase, zero console errors or hydration
    warnings, no layout shift on load.
  - `pnpm exec wrangler deploy --dry-run` succeeds.
  - After the real deploy, which happens only when the user says the zone is
    Active and approves: Worker metrics show no invocations for page views.
- Update `docs/DEPLOY.md` (build and deploy commands, CI settings, drop the
  OpenNext middleware warning section) and `README.md`.

### Phase 2: content platform on the static model

Revise the spec and plan first, get approval, then build: D1 schema and
migrations; admin pages, client-rendered, where editor routes take `?id=`
because a static export cannot prerender unknown ids; the admin API in the
Worker (`run_worker_first` for `/api/*`, Access JWT verified on every call,
`zod` validation); media upload to R2; the build-time snapshot from D1; journal
list and detail pages in all three locales with the fallback notice; RSS and
sitemap entries; publish triggering a rebuild, with its status in the admin.
Document the local development setup: `next dev` for pages and `wrangler dev`
for the API. Rewrites are not allowed under export, so explain how the admin
reaches the API locally.

### Phase 3: job postings (and applications, if chosen)

Same pattern: roles and their translations in D1, static `/careers` and
`/careers/[slug]` pages, admin create, edit, publish and unpublish. If
applications are in scope, add the single `/api/apply` endpoint as decided.

## Process

- The user's standing instruction for this project: "Ask me before doing the
  implementation." Start with a short proposal: your understanding, the
  decisions to confirm with a recommendation for each, and the Phase 1
  approach. Then wait for approval.
- Follow the Superpowers flow: brainstorming to settle the open decisions,
  revise the spec and plan in `docs/superpowers/`, then execute phase by phase
  and verify before claiming anything is done.
- Pin exact dependency versions. Keep `compatibility_date` no later than the
  workerd build bundled with the pinned wrangler.
- Do not deploy without the user's go-ahead. Do not modify DNS.
- After each phase, update the docs and the project memory (the deploy model
  changes from OpenNext to static assets).
