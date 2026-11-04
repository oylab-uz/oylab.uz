# Review: feat/content-platform (b728772..9745f97)

Worktree: /Users/jr/dev/oylab.uz/.worktrees/content-platform. Read-only review. `pnpm test` 80/80, `pnpm lint` clean, `pnpm exec tsc --noEmit` clean. GitHub Actions run 41821347882 for HEAD is FAILED (see finding 2).

## Findings (most severe first)

### 1. Critical — admin identity is a spoofable request header on paths the proxy never guards
- `src/app/admin/identity.ts:5` trusts `x-admin-email`; `src/proxy.ts:31` sets it only on the admin-host branch; `src/proxy.ts:22` forwards the public-host request untouched (next-intl copies every incoming header into the rewritten request — verified in `node_modules/next-intl/dist/esm/production/middleware/middleware.js`); `src/proxy.ts:55` matcher `/((?!api|_next|_vercel|.*\..*).*)` skips every path containing a dot, so `/admin/...` with a dot never reaches the proxy at all.
- Scenario: `POST https://oylab.uz/admin/journal/x.y` with headers `Next-Action: <id of postFormAction>`, `Origin: https://oylab.uz`, `x-admin-email: anyone@evil.example` and a multipart body. The proxy is skipped (dotted path), the `/admin/journal/[id]` route handles the action (its worker contains the action, so Next's forwarding step is not taken), `getIdentity()` returns the attacker's string, and the post is saved/published/deleted with no Cloudflare Access check. Same for `publicationFormAction`, `uploadMediaAction`, `deleteMediaAction`, `createPostAction`. Action IDs are per-build salted hashes, so the attacker needs one (anyone who has ever loaded the admin, or a leaked bundle), but authentication must not rest on that. Also: `GET https://oylab.uz/admin/journal/x.y` renders the admin shell with the spoofed email (or a 500 from `src/app/admin/layout.tsx:17` throwing in the root layout when the header is absent) instead of the spec's 404.
- Smallest fix: make `getIdentity()` the authority instead of the header: require `isAdminHost(headers().get("host"))`, then in production re-verify `cf-access-jwt-assertion` with `verifyAccessJwt` (JWKS is already memoised) and in development return the dev identity; drop `x-admin-email` entirely or keep it as a cache only. Additionally widen the matcher so `/admin/:path*` always hits the proxy (e.g. `matcher: ["/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"]`) and delete `x-admin-email` from request headers on the public branch too.

### 2. Critical — the branch's own CI is red: `next build` prerenders `/sitemap.xml` and queries D1 at build time
- `src/app/sitemap.ts:19` relies on `await connection()` to stay dynamic; the CI run for 9745f97 (`gh run view 41821347882 --log-failed`) fails in `pnpm build` with `Error occurred prerendering page "/sitemap.xml"` → `D1_ERROR: no such table: posts` from `src/lib/content/posts.ts:184` via `sitemap.ts`. The local `.next` (built 16:32 from the same HEAD) shows the route as dynamic, so the divergence is environmental (fresh checkout, no `.wrangler/state`); I could not run a clean build in a read-only review to pin the mechanism. Either way the symptom is deterministic in a clean environment: the same `next build` runs inside `opennextjs-cloudflare build` on Workers Builds, so production deploys from `main` would fail the same way — or, if the prerender succeeds, ship a sitemap frozen with whatever the build machine's local D1 held.
- Smallest fix: `export const dynamic = "force-dynamic";` in `src/app/sitemap.ts` (the metadata-route wrapper re-exports route config) and, for symmetry, in `src/app/journal/feed.xml/route.ts:14`. Then re-run CI and require green before merge. The ledger marks Task 15 complete on local `pnpm test` only; the CI result was never checked.

### 3. Important — GFM footnotes are rendered with broken anchors
- `src/lib/markdown.ts:75-76`: `remarkRehype` already prefixes footnote ids with `user-content-`, and `rehypeSanitize` (default `clobberPrefix: "user-content-"`) prefixes them again. Verified output: `<a href="#user-content-fn-1" id="user-content-user-content-fnref-1">` and `<li id="user-content-user-content-fn-1">`; the back-reference `#user-content-fnref-1` also dangles. The test at `src/lib/markdown.test.ts:11` only asserts `class="footnotes"`.
- Scenario: a reader clicks footnote 1 in the seed post ("Why we train small models in Tashkent") — nothing happens; the ↩ link is dead too.
- Smallest fix: add `clobberPrefix: ""` to `schema` at `src/lib/markdown.ts:28` (probe verified every `href="#…"`/`aria-describedby` then resolves to an existing id); extend the test to assert hrefs resolve to ids.

### 4. Important — server actions throw storage errors to the client; the editor unmounts and unsaved work is lost
- `src/app/admin/journal/[id]/actions.ts:34`, `src/app/admin/publications/[id]/actions.ts:35`, `src/app/admin/media/actions.ts:41` have no try/catch. Spec §15 requires storage errors as `{ error }` with a Retry banner; actions "never throw to the client".
- Scenarios: (a) two authors save the same new slug within the same second — the check at `src/lib/content/posts.ts:53` passes for both, the second `UPDATE` hits `UNIQUE constraint failed: posts.slug` (no transaction on D1); (b) a cover image is deleted on the Media page between loading the editor and pressing Save — `cover_media_id` FK fails; (c) a body under the 500,000-character limit but heavy with KaTeX renders to `body_html` over D1's 2 MB per-value cap (documented limit "Row, string, or BLOB size: 2 MB"); (d) any transient D1/R2 error. In every case the thrown error reaches `src/app/admin/error.tsx`, which replaces the page, so the author's unsaved title/body are gone.
- Smallest fix: wrap the write path in try/catch returning `failedState({}, "Could not save; try again.")` (and a Retry affordance), and inside `savePost`/`savePublication` catch the slug UNIQUE error and return `fieldErrors.slug`. Consider a lower `BODY_MAX` or a check on rendered size against 2 MB.

### 5. Important — editing the Markdown body never arms the unsaved-changes guard
- `src/components/admin/post-form.tsx:57` marks dirty via the form's `onChange`, which React only fires for native inputs. CodeMirror edits flow through `src/components/admin/markdown-editor.tsx:52` → `onChange={setMarkdown}` (`post-form.tsx:256`, `publication-form.tsx:227`), which only feeds the preview. Spec §12: "Leaving with unsaved changes prompts through beforeunload."
- Scenario: an author writes a 40-minute body without touching any other field, clicks a sidebar link — no prompt, body gone.
- Smallest fix: pass a dirty callback into `TranslationPanel`/`AbstractPanel` and call it from the `MarkdownEditor` `onChange` (or have `MarkdownEditor` dispatch a bubbling `input` event on its mirror textarea).

### 6. Important — `inArray` over every id breaks on D1's 100-bound-parameter limit (landing page included)
- `src/lib/content/posts.ts:176` and `publications.ts:215` bind one parameter per id. Callers that pass unbounded lists: `listPostsAdmin` (admin Journal page and dashboard), `listPublishedPublications` (public `/publications`, and the landing page via `latestPublications` at `publications.ts:239`, which loads every published publication to take 5), and the sitemap (`src/app/sitemap.ts:29`, `perPage: 1000`). D1 documents "Maximum bound parameters per query: 100".
- Scenario: the 101st published publication is published; `/`, `/uz`, `/ru`, `/publications` and `/sitemap.xml` all 500 ("too many SQL variables"); at 101 posts the admin dashboard and Journal list do the same. The Task 13 ruling ("slower sitemap at thousands of posts") understates this: it is a hard failure at 101 rows, not a slowdown.
- Smallest fix: join translations in the main query, or chunk `translationsFor` into groups of ≤90; make `latestPublications` `LIMIT n` in SQL; replace the sitemap's per-item `getPublishedPost` dynamic imports (`sitemap.ts:31,43`) with one translations query.

### 7. Important — slugs are never generated from the title (spec §7), and the placeholder slug gets locked on publish
- `src/lib/slug.ts:15` `slugify` has tests but no caller in `src/`; `src/lib/content/posts.ts:29` assigns `untitled-<8 hex>` and nothing ever replaces it; the editor shows the slug field but does not derive it from the title.
- Scenario: an author fills in the title and body, clicks Publish without noticing the sidebar field; the post is live forever at `/journal/untitled-1111abcd` and the slug is locked ("Locked after publishing").
- Smallest fix: on the client, when the slug still matches `/^untitled-[0-9a-f]{8}$/` (or the user has not edited it), set it to `slugify(primary title)` as the title changes; or do it server-side in `savePost` when the slug is still the placeholder and the post is a draft.

### 8. Minor — development media origin points at the wrong port
- `.dev.vars.example:2` `MEDIA_PUBLIC_URL=http://localhost:3100/dev-media`, while `pnpm dev` and the docs use port 3000. Copying the example makes every dev upload a broken image and the Markdown image filter rejects pasted URLs from the running server. Fix: `http://localhost:3000/dev-media`.

### 9. Minor — RSS feed deviates from the spec and RSS 2.0
- `src/app/journal/feed.xml/route.ts:16` resolves items in `en`, so a post whose primary language is Uzbek with an English translation is listed in English (spec §9: "in their primary language"); line 27 emits `<language>` inside `<item>`, which is not an RSS 2.0 item element (validators flag it). Fix: resolve each item with its own primary locale and drop the per-item `<language>` (or use `dc:language`).

### 10. Minor — published date is rendered in the server's time zone and re-parsed as such
- `src/lib/forms/dates.ts:2` formats with the host's local time (UTC on Workers/SSR) and `src/lib/forms/post-schema.ts:21` `Date.parse`s a zone-less string as server-local. The client component re-renders the same value in the browser's zone → hydration mismatch, and a Tashkent author sees 04:00 for a post the public site shows at 09:00 (Asia/Tashkent). Fix: format and parse in a fixed zone (Asia/Tashkent) on the server, or render the input client-only and submit an ISO string with offset.

### 11. Minor — a published post can lose its date
- `src/lib/content/posts.ts:89` writes `publishedAt` from the form on every save; clearing the field on a published post stores NULL, which drops the date from the page and the feed and sinks the post to the end of lists. Fix: when `existing.status === "published"` and the input is null, keep the existing value.

### 12. Minor — sanitizer leaves `<img>` with no `src`; heading ids skip the clobber prefix
- `src/lib/markdown.ts:59` lazy-loads any image left after sanitize, including ones whose `src` was removed (`data:`, `javascript:`, uppercase schemes) — verified output `<img alt="a" loading="lazy">` → broken-image icon. `rehypeSlug` at line 78 runs after sanitize, so ids like `id="constructor"` are emitted unprefixed. Fix: drop `img` nodes without a `src`; move `rehypeSlug` before `rehypeSanitize` if prefixed heading ids are wanted.

### 13. Minor — "Saved, but not published yet." is reported as a failure
- `src/app/admin/journal/[id]/actions.ts:39` (same in publications) returns `ok:false, savedAt:null` after a successful save, so the banner uses the error tone and the dirty flag stays armed; the next navigation prompts even though nothing is unsaved. Fix: return `ok:true`-style saved state with `fieldErrors` attached, or set `savedAt`.

## Ruling ledger assessment
All rulings are reasonable and most are correct and well-evidenced (seed path outside `migrations_dir`, `code` className rule replacement, `"use server"` export constraint, display-math fencing, Host rewrite in `wrangler dev`). Two deserve correction: Task 13's sitemap ruling (see finding 6: a hard 100-parameter failure, not a slowdown) and Task 15's "complete" without checking the CI run it added (finding 2). The Task 8 "one action with intent" ruling is sound, but its "Saved, but not published" branch produced finding 13.

## Review-focus checks that pass
Duplicate slug on save/publish → `fieldErrors.slug` (non-race path, tested). Deleting cover media → `cover_media_id` NULL via FK `ON DELETE SET NULL`; D1 enforces FKs and the test harness turns `foreign_keys` on. `/journal?page=0|-3|abc|999999` → clamped (tested, `src/lib/page.ts`). Body with empty title → `fieldErrors["translations.ru.title"]` (tested). Body > 500,000 chars → schema error naming the limit before any rendering (tested); `bodySizeLimit` 11 MB admits it. Markdown XSS probes (raw HTML, `javascript:` links, `onerror`, `data:` images, KaTeX `\href`/`\url` with `trust:false`) are neutralised. Dev bypass is compiled out in production (`NODE_ENV`); empty Access vars fail closed (401). OpenNext copies wrangler `vars` into `process.env` (`populateProcessEnv`), so the proxy's `CF_ACCESS_*` reads work. Cross-site CSRF on actions is blocked by Next's Origin/Host check. Landing and public pages are dynamic through `connection()` in the locale layout. Form field names match the zod parsers; the disabled slug input is shadowed by the hidden one.

## Declined to judge
- SVG uploads as stored XSS on media.oylab.uz: spec allows SVG; separate origin; uploaders are Access-gated staff.
- A future `publishedAt` publishes immediately: scheduling is explicitly out of scope.
- Save requires a primary-locale title even for drafts (spec only requires it to publish): defensible UX, no data loss.
- `/journal` runs the count query twice per request: perf nit at this scale.
- Sitemap `lastModified` uses `publishedAt`, not `updatedAt`: spec silent.
- `admin.localhost` accepted by `isAdminHost` in production: unreachable through custom domains, and no JWT → 401.
- Public routes (`/sitemap.xml`, `/journal/feed.xml`, dotted public paths) also served on the admin host: behind Access, harmless.
- Workers Free CPU limits for KaTeX rendering of large bodies: platform sizing already flagged in DEPLOY.md.
- No `global-error.tsx` for root-layout throws: only reachable through the finding-1 path.
- Seed post references a non-existent `media.oylab.uz/seed/moon.png`: dev-only, noted in the ledger.
- `uploadMediaAction` returns a message rather than the URL/Markdown snippet (spec §10): the grid's copy buttons cover the need.
- "Remove translation" has no confirmation: deletion only happens on an explicit Save.
- Media and admin lists are unpaginated: spec silent; the real scale defect is finding 6.
- Extra `author_name_i`/`author_url_i` fields are submitted and ignored: harmless.

## Verdict
Not mergeable as it stands: the branch's own CI run is red (finding 2) and the admin's write path can be driven from the public host with a forged identity header (finding 1). Both have small, local fixes. After fixing 1 and 2 and the Important items 3–7 (all contained: a sanitize option, try/catch in three actions, one dirty callback, chunked/joined translation queries, wiring the existing `slugify`), the branch is mergeable; the data model, Access verification, Markdown sanitisation, fallback/hreflang logic and the public pages are sound and well tested, and the Minor items can follow in a cleanup commit.
