# Content platform: journal, publications, admin

Date: 2026-11-04. Status: draft for review. Sub-project 2 of 4 for oylab.uz.

## 1. Outcome

OY Lab staff publish journal posts and publication records from an admin at
`admin.oylab.uz`. Every post and publication is a page on `oylab.uz` in up to
three languages. Everything runs on the one Cloudflare Worker that already
serves the landing site. Success looks like: a researcher signs in with their
email, writes a post in Markdown with a formula and an image, publishes it, and
the page is live at `oylab.uz/journal/<slug>` within a second, with the Uzbek
and Russian URLs falling back to the original until a translation exists.

## 2. Scope

In:

- Journal posts and publication records, stored in D1, edited in the admin.
- Public pages: `/journal`, `/journal/[slug]`, `/publications`,
  `/publications/[slug]`, in all three locales, plus an RSS feed and sitemap
  entries. The landing page reads its publications list from the database.
- Admin shell on `admin.oylab.uz`: sign-in through Cloudflare Access, list,
  create, edit, publish, unpublish, media upload.
- The foundation the next two specs build on: schema conventions, migrations,
  R2, the admin layout, auth, the host split in `proxy.ts`.

Out (own specs later): HR roles and applications; editing landing-page
content (hero, stats, team, mission); comments, search, tags, scheduling,
version history, draft share links.

## 3. Decisions already taken with the user

- One article = one primary language plus optional translations. A missing
  translation falls back to the primary language with a visible notice.
- Bodies are Markdown (option A): split editor with preview, image upload,
  math and code blocks. Not a block editor, not MDX.
- One Worker, two hostnames. Admin on `admin.oylab.uz` behind Cloudflare
  Access. Stack stays Next.js on OpenNext (sub-project 1, shipped).
- English is the default locale at `/`; `/uz` and `/ru` are prefixed.

## 4. Architecture

```
browser ──► Cloudflare edge ──► Worker "oylab" (Next.js via OpenNext)
                 │                   ├── proxy.ts: host split + Access JWT + next-intl
   Access gate ──┤ admin.oylab.uz    ├── /[locale]/...   public site (D1 reads)
                 │ oylab.uz          ├── /admin/...      admin (server actions)
                 │ media.oylab.uz ──► R2 bucket "oylab-media" (public, CDN cached)
                 │
                 └── D1 "oylab" (SQLite), Drizzle ORM, migrations in /drizzle
```

Bindings added to `wrangler.jsonc`: `DB` (D1 `oylab`), `MEDIA` (R2
`oylab-media`), vars `CF_ACCESS_TEAM_DOMAIN`, `CF_ACCESS_AUD`,
`MEDIA_PUBLIC_URL`. `placement: { mode: "smart" }` so the Worker runs near D1,
which lives in one region. Second route entry:
`{ "pattern": "admin.oylab.uz", "custom_domain": true }`.

Units and their one job:

| Unit | Does | Depends on |
|---|---|---|
| `src/proxy.ts` | host split, admin auth, locale routing | `src/lib/access.ts`, next-intl |
| `src/lib/access.ts` | verifies the Access JWT, returns the email | `jose` |
| `src/db/schema.ts`, `src/db/index.ts` | Drizzle schema and a `db()` accessor over the D1 binding | `@opennextjs/cloudflare` `getCloudflareContext` |
| `src/lib/content/posts.ts`, `publications.ts` | typed queries: list, bySlug, resolve translation | `src/db` |
| `src/lib/markdown.ts` | Markdown to sanitized HTML, reading time | unified stack, KaTeX |
| `src/lib/media.ts` | R2 put, key naming, dimensions, media rows | `MEDIA` binding, `image-size` |
| `src/app/[locale]/journal/*`, `publications/*` | public pages | content queries |
| `src/app/admin/*` | admin pages and server actions | all of the above |

## 5. Hosts and routing (`src/proxy.ts`)

Order of checks, before next-intl runs:

1. Host is `admin.oylab.uz` (or `admin.localhost:*` in development):
   verify the Access JWT (section 6). On failure respond `401` with a plain
   text body, never a redirect, so a misconfigured Access cannot loop.
   On success rewrite `/<path>` to `/admin/<path>`, set the request header
   `x-admin-email` from the token after deleting any incoming header of that
   name, and skip locale handling entirely. The admin is English only.
2. Any other host: if the path starts with `/admin`, respond `404`. Otherwise
   hand off to the next-intl middleware as today.

`src/app/admin/layout.tsx` is a second root layout (`<html lang="en">`), a
sibling of `src/app/[locale]/layout.tsx`. The static `admin` segment wins over
the dynamic `[locale]` segment, so `/admin/...` never reaches the locale tree.

Local check: `curl -H "Host: admin.oylab.uz" localhost:8787/` in the workerd
preview returns 401 without a token; `http://admin.localhost:3000/` in
`next dev` opens the admin with the development identity.

## 6. Authentication

Cloudflare Access (Zero Trust, free for up to 50 users) is the gate at the
edge for `admin.oylab.uz`. Login method: one-time PIN by email to start (no
IdP setup), Google Workspace can be added later without code changes. Policy:
allow a list of lab emails.

Defense in depth: the Worker verifies the `Cf-Access-Jwt-Assertion` header on
every admin request with `jose`: `createRemoteJWKSet` on
`https://<CF_ACCESS_TEAM_DOMAIN>/cdn-cgi/access/certs`, `jwtVerify` with
`issuer: https://<team domain>` and `audience: CF_ACCESS_AUD`. The JWKS is
cached in module scope. The verified `email` claim is the identity recorded in
`updated_by` columns. Development bypass: only when `NODE_ENV` is
`development`, the identity is `ADMIN_DEV_EMAIL` (default `dev@oylab.uz`).
There are no app-level users, roles or sessions in this spec; everyone Access
lets in can do everything.

## 7. Data model (D1, Drizzle)

IDs are `crypto.randomUUID()`. Timestamps are integer unix milliseconds.
Locales are the strings `en`, `uz`, `ru`.

`posts`

| column | type | notes |
|---|---|---|
| id | text pk | |
| slug | text unique | lowercase ASCII and hyphens, immutable once published |
| primary_locale | text | |
| status | text | `draft` or `published` |
| published_at | integer null | set on first publish, editable |
| cover_media_id | text null | → media.id |
| created_at, updated_at | integer | |
| updated_by | text | email |

`post_translations` (pk `post_id, locale`)

| column | type | notes |
|---|---|---|
| post_id | text | → posts.id, cascade delete |
| locale | text | |
| title | text | |
| summary | text | plain text, max 300 chars, used in lists and meta description |
| body_md | text | source of truth |
| body_html | text | rendered at save time by `src/lib/markdown.ts` |
| reading_minutes | integer | words / 200, rounded up |
| updated_at | integer | |

`publications`

| column | type | notes |
|---|---|---|
| id, slug, primary_locale, status, published_at, created_at, updated_at, updated_by | | as in posts |
| year | integer | |
| venue | text | free text, e.g. "NeurIPS 2026" or "arXiv preprint" |
| authors_json | text | JSON array of `{ name, url? }`, order preserved |
| pdf_url, arxiv_url, code_url, doi | text null | |
| bibtex | text null | shown with a copy button |

`publication_translations` (pk `publication_id, locale`): `title`,
`abstract_md`, `abstract_html`, `updated_at`.

`media`

| column | type | notes |
|---|---|---|
| id | text pk | |
| key | text unique | R2 object key `YYYY/MM/<id>.<ext>` |
| url | text | `MEDIA_PUBLIC_URL` + key |
| content_type | text | image/png, image/jpeg, image/webp, image/gif, image/svg+xml, application/pdf |
| bytes | integer | |
| width, height | integer null | images only, read with `image-size` |
| alt | text | |
| created_at | integer | |
| uploaded_by | text | email |

Indexes: `posts (status, published_at desc)`,
`publications (status, year desc, published_at desc)`.

Slugs are generated from the primary title: NFKD, strip combining marks, map
Cyrillic to Latin with a fixed table, drop the Uzbek apostrophe (U+02BC), keep
`[a-z0-9]`, join with hyphens, trim to 80 chars. Editable while draft;
uniqueness is checked on save. Locked after publish so links never break.

## 8. Markdown rendering (`src/lib/markdown.ts`)

One pipeline, used by the save action and by the admin preview action, so
preview equals output:

`remark-parse` → `remark-gfm` (tables, footnotes, task lists) → `remark-math`
→ `remark-rehype` → `rehype-katex` → `rehype-slug` → `rehype-sanitize` →
`rehype-stringify`.

Sanitize schema: GitHub default plus `className` on `code`, `pre`, `span`,
`div` for KaTeX and `language-*`; `img` allowed with `src`, `alt`, `title`,
`loading`, and only `src` values under `MEDIA_PUBLIC_URL` or a relative path;
`math` and `semantics` elements for KaTeX MathML; no raw HTML, no `script`,
no `style`. Rendered `img` elements get `loading="lazy"`.

Code blocks are not syntax highlighted in this version: `<pre><code
class="language-x">` styled in Geist Mono on the surface colour. Highlighting
is a later addition once the bundle budget (section 13) is measured with the
rest of this spec in place. Reading time is computed from the Markdown word
count. KaTeX CSS and fonts are self-hosted through the `katex` package import
in the article and publication pages.

## 9. Translations and URLs

- A post has exactly one row per locale that has content; the primary locale
  row always exists.
- `/{locale}/journal/{slug}` resolves to the translation for that locale, or
  the primary translation with `fallback: true`. The page then shows a one-line
  notice above the body: "This post is in English. Oʼzbekcha and Русский are
  not available yet." in the visitor's locale, with links to the locales that
  do exist.
- `generateMetadata` lists in `alternates.languages` only the locales with a
  real translation, plus `x-default` pointing at the primary locale's path.
  The canonical of a fallback page is the primary locale's URL, so search
  engines do not index duplicate bodies.
- Lists (`/journal`, `/publications`, landing teasers) show each item's
  title and summary in the visitor's locale when present, otherwise primary,
  with a small locale tag (EN/UZ/RU) on fallback items.
- The RSS feed at `/journal/feed.xml` (unprefixed) lists published posts in
  their primary language.
- `sitemap.ts` adds every published post and publication for every locale that
  has a translation, with `alternates.languages` matching the page metadata.

## 10. Media

- Public R2 bucket `oylab-media`, served on `media.oylab.uz` as an R2 custom
  domain (Cloudflare caches it, no Worker CPU). `MEDIA_PUBLIC_URL` is
  `https://media.oylab.uz`.
- Upload: admin form posts the file to a server action (`serverActions.
  bodySizeLimit: "10mb"`). The action validates the content type and size,
  reads image dimensions with `image-size`, writes the object with
  `MEDIA.put(key, stream, { httpMetadata: { contentType, cacheControl:
  "public, max-age=31536000, immutable" } })`, inserts the media row and
  returns the URL and a ready-to-paste `![alt](url)`.
- Images on public pages go through Cloudflare Image Transformations:
  `next.config.ts` switches from `images.unoptimized` to a custom loader
  (`src/lib/image-loader.ts`) that returns
  `/cdn-cgi/image/width=<w>,quality=<q>,format=auto/<src>` in production and
  `src` unchanged in development. The zone needs "Transformations" enabled
  (free tier: 5,000 unique transformations a month). The placeholder team
  portraits from pravatar keep `unoptimized` per image until the
  site-customization spec moves them to R2.
- Markdown images are plain `<img loading="lazy">` with the stored URL; no
  width and height in this version.

## 11. Public pages

All under `src/app/[locale]/`, server components, data read per request:

- `journal/page.tsx`: published posts, newest first, 12 per page, `?page=n`.
  Each item: title, summary, date, reading time, locale tag on fallback.
- `journal/[slug]/page.tsx`: cover image, title, meta line (date · reading
  time · language), fallback notice when applicable, body (`body_html` inside
  a `.prose-moon` typography class defined in `globals.css`: Spectral
  headings, Geist text at 68ch, moon palette, KaTeX and code styles), links to
  the other locales that exist. Unknown slug or unpublished post: `notFound()`.
- `publications/page.tsx`: published publications grouped by year, newest
  first; each row: title, authors, venue, links.
- `publications/[slug]/page.tsx`: title, authors, venue and year, abstract,
  links row (PDF, arXiv, Code, DOI), BibTeX block with a copy button (client
  component), other locales.
- Landing page: the publications section lists the five latest published
  publications from D1 instead of `content.ts`; a "From the journal" row with
  the three latest posts follows it in the same section style. The
  `publications` placeholder array leaves `content.ts`; the seed puts the same
  five entries in D1 flagged as drafts so nothing fake is public.
- Header: Research, Process, Team and Contact become `/#research` style links
  through the next-intl `Link` so they work from any page; Journal and
  Publications become real routes. Active route is underlined.
- `journal/feed.xml/route.ts`: RSS 2.0, last 50 posts.

## 12. Admin (`src/app/admin/`)

English only, Geist and Geist Mono only (no serif in the dashboard), moon
palette, same spacing tokens. Server components and server actions, client
components only for the editor, the media uploader and the copy button.

Pages:

- `/`: counts (published, drafts), last five edited items, links.
- `/journal`: table with status filter, columns title (primary), status,
  locales present, updated, updated by. `/journal/new` creates a draft and
  redirects to `/journal/[id]`.
- `/journal/[id]`: left column metadata (slug, status, primary locale, cover
  image picker, published date); right column one tab per locale, primary
  first, other tabs show "Add translation" until started. Each tab: title,
  summary (counter to 300), Markdown editor (CodeMirror 6 with
  `@codemirror/lang-markdown`, moon theme) and a Preview toggle that calls the
  `renderPreview` server action and shows the same HTML the public page will
  use. Toolbar: Save, Publish or Unpublish, Delete (confirm dialog, drafts
  only; published items must be unpublished first). Leaving with unsaved
  changes prompts through `beforeunload`.
- `/publications`, `/publications/new`, `/publications/[id]`: same shape;
  metadata adds year, venue, authors (repeatable rows), links, BibTeX; per
  locale: title and abstract.
- `/media`: upload form (file, alt), grid of uploads with copy-URL and
  copy-Markdown buttons. Deleting a media row deletes the R2 object; the UI
  warns that pages referencing it will show a broken image.

Server actions live next to the pages in `actions.ts` files, validate input
with `zod`, and return `{ ok: true, data } | { ok: false, error, fieldErrors? }`.
Every write sets `updated_by` from `x-admin-email`. Publishing requires a
non-empty title and body in the primary locale and a unique slug.

Reserved for the next specs, so the shell does not change later: nav slots
Roles, Applications, Site; the `(admin)` layout exposes a `nav` array in one
file.

## 13. Performance and bundle budget

Reads are per request; a journal page is two D1 queries (post plus
translations) and a list page one. Smart placement keeps the Worker near D1.
No ISR yet: the upgrade path, when traffic or latency asks for it, is the
OpenNext R2 incremental cache plus Durable Object queue plus D1 tag cache,
with `revalidateTag` from the publish action. That is a separate spec.

The Worker was 1.4 MiB gzip after sub-project 1 against the 3 MiB gzip
free-plan limit (10 MiB on Workers Paid). This spec adds `drizzle-orm`,
`jose`, `zod`, the unified pipeline and `katex` on the server, roughly 0.4 to
0.6 MiB gzip by package sizes. `pnpm exec wrangler deploy --dry-run` is run
after installing dependencies and again before the final commit; if the
total passes 2.5 MiB gzip, the plan switches the account to Workers Paid
($5/month) before adding anything else.

## 14. Local development and migrations

- `initOpenNextCloudflareForDev()` in `next.config.ts` gives `next dev` the
  D1 and R2 bindings through miniflare, persisted under `.wrangler/state`.
- `drizzle.config.ts` (dialect sqlite, schema `src/db/schema.ts`, out
  `drizzle/`). Scripts: `db:generate` (drizzle-kit), `db:migrate:local` and
  `db:migrate:remote` (`wrangler d1 migrations apply oylab --local|--remote`,
  with `migrations_dir: "drizzle"` on the binding), `db:seed` (`wrangler d1
  execute oylab --local --file drizzle/seed.sql`).
- `drizzle/seed.sql` holds the five placeholder publications as drafts and two
  sample journal posts (one English with math and an image, one Uzbek), so the
  pages have content in development and screenshots.
- `.dev.vars` (gitignored) carries `ADMIN_DEV_EMAIL`; Access vars are not
  needed locally.

## 15. Error handling

- Access JWT missing or invalid: `401` text response from the proxy.
- D1 or R2 failure in a public page: Next `error.tsx` in the locale layout
  shows a short page in the moon style; the error is logged with
  `console.error`, which Workers observability keeps.
- Server actions never throw to the client: validation errors come back as
  `fieldErrors` and render under the field; storage errors come back as
  `error` and render in a banner with a Retry button.
- Unknown slug, unpublished item on the public site, unknown id in the admin:
  `notFound()`.
- Upload rejected (type, size): inline message naming the limit.

## 16. Testing

- Vitest (Node environment) unit tests: `markdown.ts` (GFM table, footnote,
  inline and block math render; `<script>` and `onerror` are stripped; image
  outside the media host is dropped), slug generation (Cyrillic, Uzbek
  apostrophe, length), translation resolver (exact, fallback, flags),
  `access.ts` with a key pair generated in the test and a stubbed JWKS fetch
  (valid, wrong audience, expired).
- Integration against `pnpm run preview` (workerd): curl with Host headers for
  the admin 401 and the public 404 on `/admin`; `/journal`, a post page in all
  three locales including a fallback notice, `/publications`, the feed, the
  sitemap.
- Browser flow with the existing headless Chrome driver on `admin.localhost`:
  create a post, upload an image, preview, publish, open the public page.
- GitHub Actions `ci.yml`: lint, unit tests, `next build` on pull requests and
  pushes to `main`. Deploys stay on Cloudflare Workers Builds.

## 17. Deployment changes and account steps

Repo: `wrangler.jsonc` gains the `DB` and `MEDIA` bindings, the vars, smart
placement and the admin route; `docs/DEPLOY.md` gains a "Content platform"
section with the steps below.

Account owner, in order:

1. `pnpm wrangler d1 create oylab`, paste the returned `database_id` into
   `wrangler.jsonc`, run `pnpm db:migrate:remote`.
2. `pnpm wrangler r2 bucket create oylab-media`; in the dashboard, R2 →
   `oylab-media` → Settings → Custom Domains → add `media.oylab.uz`.
3. Zero Trust → Access → Applications → add a self-hosted application
   "OY Lab Admin" for `admin.oylab.uz`, login method one-time PIN, policy
   Allow with the lab emails. Copy the team domain and the application
   audience tag into `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` in
   `wrangler.jsonc`.
4. Images → Transformations → enable for `oylab.uz`.
5. `pnpm run deploy` (or push to `main` once Workers Builds is connected).

## 18. Alternatives considered

- Hosted CMS (Sanity, Payload Cloud, Contentful): a second vendor and bill,
  an off-brand editor, and the primary-plus-fallback translation rule would be
  reimplemented on top of it. Rejected.
- Content in the repository (MDX files, publish by commit): no admin for
  non-developers and nothing for HR submissions later. Rejected.
- Second Worker for the admin: two deploys, two config files, duplicated UI
  kit, no benefit over a host split in one Worker. Rejected; the user asked
  for one Worker.
- ISR with cache bindings from day one: more moving parts than the traffic
  justifies. Deferred, with the path named in section 13.
- Block editor or MDX: rejected by the user; Markdown chosen.

## 19. What the next specs plug into

- HR: tables `roles`, `role_translations`, `applications`; a private R2
  bucket `oylab-private` (binding `PRIVATE`) for CVs, served only through an
  admin route; email notification through a provider chosen in that spec;
  admin nav slots Roles and Applications; public `/careers` pages.
- Site customization: `site_settings` (key, locale, value) and `team_members`
  tables; team photos through `media`; the landing page reads settings with
  `content.ts` values as defaults; admin nav slot Site.
