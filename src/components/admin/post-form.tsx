"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { postFormAction, renderPreviewAction } from "@/app/admin/journal/[id]/actions";
import { initialFormState } from "@/lib/forms/form-state";
import type { Post, PostTranslation } from "@/db/schema";
import { routing, type Locale } from "@/i18n/routing";
import { toLocalInput } from "@/lib/forms/dates";
import { SUMMARY_MAX } from "@/lib/forms/post-schema";
import { LocaleTabs } from "./locale-tabs";
import { MarkdownEditor } from "./markdown-editor";
import { SubmitButton } from "./submit-button";
import { Banner, Button, Field, Input, Select, StatusPill, Textarea } from "./ui";

type MediaOption = { id: string; url: string; alt: string };

export function PostForm({
  post,
  translations,
  media,
}: {
  post: Post;
  translations: PostTranslation[];
  media: MediaOption[];
}) {
  const [state, formAction] = useActionState(postFormAction, initialFormState);
  const locales = [post.primaryLocale, ...routing.locales.filter((l) => l !== post.primaryLocale)] as Locale[];
  const [active, setActive] = useState<Locale>(post.primaryLocale);
  const [enabled, setEnabled] = useState<Record<Locale, boolean>>(() => {
    const present = new Set(translations.map((t) => t.locale));
    return { en: present.has("en"), uz: present.has("uz"), ru: present.has("ru"), [post.primaryLocale]: true } as Record<Locale, boolean>;
  });
  // Dirty when edited after the last successful action; no effect needed.
  const [dirtyAt, setDirtyAt] = useState<number | null>(null);
  const dirty = dirtyAt !== null && (state.savedAt === null || dirtyAt > state.savedAt);
  const setDirty = (on: boolean) => setDirtyAt(on ? Date.now() : null);
  const [cover, setCover] = useState(post.coverMediaId ?? "");
  const dialog = useRef<HTMLDialogElement>(null);
  const published = post.status === "published";

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const errorFor = (key: string) => state.fieldErrors[key];
  const localeHasError = (locale: Locale) =>
    Object.keys(state.fieldErrors).some((k) => k.startsWith(`translations.${locale}.`));
  const translationFor = (locale: Locale) => translations.find((t) => t.locale === locale);
  const coverPreview = media.find((m) => m.id === cover);

  return (
    <form action={formAction} onChange={() => setDirty(true)} className="flex flex-col gap-8">
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="primaryLocale" value={post.primaryLocale} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-medium tracking-tight text-ink-strong">
            {translationFor(post.primaryLocale)?.title || "Untitled post"}
          </h1>
          <StatusPill status={post.status} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!published ? (
            <Button variant="danger" onClick={() => dialog.current?.showModal()}>
              Delete
            </Button>
          ) : null}
          <SubmitButton name="intent" value="save" variant="ghost" pendingLabel="Saving…">
            Save
          </SubmitButton>
          {published ? (
            <SubmitButton name="intent" value="unpublish" pendingLabel="Working…">
              Unpublish
            </SubmitButton>
          ) : (
            <SubmitButton name="intent" value="publish" pendingLabel="Publishing…">
              Publish
            </SubmitButton>
          )}
        </div>
      </div>

      {state.message ? <Banner tone={state.ok ? "success" : "error"}>{state.message}</Banner> : null}

      <div className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="flex flex-col gap-6">
          <Field
            label="Slug"
            htmlFor="slug"
            helper={published ? "Locked after publishing" : "Lowercase letters, numbers and hyphens"}
            error={errorFor("slug")}
          >
            <Input
              id="slug"
              name="slug"
              defaultValue={post.slug}
              disabled={published}
              aria-describedby={errorFor("slug") ? "slug-error" : "slug-helper"}
              aria-invalid={Boolean(errorFor("slug"))}
              spellCheck={false}
            />
            {published ? <input type="hidden" name="slug" value={post.slug} /> : null}
          </Field>

          <Field label="Primary language" htmlFor="primary-display" helper="Set when the post was created">
            <Input id="primary-display" value={post.primaryLocale.toUpperCase()} disabled readOnly />
          </Field>

          <Field label="Cover image" htmlFor="coverMediaId" error={errorFor("coverMediaId")}>
            <Select id="coverMediaId" name="coverMediaId" value={cover} onChange={(e) => setCover(e.target.value)}>
              <option value="">None</option>
              {media.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.alt || m.url.split("/").pop()}
                </option>
              ))}
            </Select>
            {coverPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverPreview.url} alt={coverPreview.alt} className="mt-2 aspect-[3/2] w-full rounded-lg border border-line object-cover" />
            ) : null}
          </Field>

          <Field label="Published date" htmlFor="publishedAt" helper="Left empty, publishing sets it to now" error={errorFor("publishedAt")}>
            <Input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={toLocalInput(post.publishedAt)} />
          </Field>
        </aside>

        <LocaleTabs
          locales={locales}
          active={active}
          enabled={enabled}
          primary={post.primaryLocale}
          onSelect={setActive}
          errors={{ en: localeHasError("en"), uz: localeHasError("uz"), ru: localeHasError("ru") }}
        >
          {(locale) => (
            <TranslationPanel
              key={locale}
              locale={locale}
              primary={locale === post.primaryLocale}
              enabled={enabled[locale]}
              onEnable={(on) => {
                setEnabled((prev) => ({ ...prev, [locale]: on }));
                setDirty(true);
              }}
              translation={translationFor(locale)}
              errorFor={(field) => errorFor(`translations.${locale}.${field}`)}
            />
          )}
        </LocaleTabs>
      </div>

      <dialog ref={dialog} className="m-auto w-[min(92vw,26rem)] rounded-xl border border-line bg-bg p-6 text-ink backdrop:bg-ink/40">
        <h2 className="text-lg font-medium text-ink-strong">Delete this draft?</h2>
        <p className="mt-2 text-sm text-muted">The post and its translations are removed. This cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => dialog.current?.close()}>
            Cancel
          </Button>
          <SubmitButton name="intent" value="delete" variant="danger" pendingLabel="Deleting…">
            Delete
          </SubmitButton>
        </div>
      </dialog>
    </form>
  );
}

function TranslationPanel({
  locale,
  primary,
  enabled,
  onEnable,
  translation,
  errorFor,
}: {
  locale: Locale;
  primary: boolean;
  enabled: boolean;
  onEnable: (on: boolean) => void;
  translation: PostTranslation | undefined;
  errorFor: (field: string) => string | undefined;
}) {
  const [summary, setSummary] = useState(translation?.summary ?? "");
  const [markdown, setMarkdown] = useState(translation?.bodyMd ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState(false);

  if (!enabled) {
    return (
      <div className="rounded-lg border border-dashed border-line px-4 py-10 text-center">
        <p className="text-sm text-muted">No translation yet. Readers of this language see the primary text.</p>
        <Button variant="ghost" className="mt-4" onClick={() => onEnable(true)}>
          Add translation
        </Button>
      </div>
    );
  }

  async function togglePreview() {
    if (preview !== null) {
      setPreview(null);
      return;
    }
    setPreviewing(true);
    try {
      setPreview(await renderPreviewAction(markdown));
    } finally {
      setPreviewing(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Field label="Title" htmlFor={`title_${locale}`} error={errorFor("title")}>
        <Input
          id={`title_${locale}`}
          name={`title_${locale}`}
          defaultValue={translation?.title ?? ""}
          aria-invalid={Boolean(errorFor("title"))}
          className="text-base"
        />
      </Field>
      <Field
        label="Summary"
        htmlFor={`summary_${locale}`}
        helper={`${summary.length} / ${SUMMARY_MAX}. Shown in lists and search results.`}
        error={errorFor("summary")}
      >
        <Textarea
          id={`summary_${locale}`}
          name={`summary_${locale}`}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          maxLength={SUMMARY_MAX + 50}
          rows={3}
        />
      </Field>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span id={`body_${locale}-label`} className="text-sm font-medium text-ink-strong">
            Body (Markdown)
          </span>
          <Button variant="ghost" className="min-h-9 px-4 text-xs" onClick={togglePreview} disabled={previewing}>
            {previewing ? "Rendering…" : preview !== null ? "Edit" : "Preview"}
          </Button>
        </div>
        <div hidden={preview !== null}>
          <MarkdownEditor id={`body_${locale}`} name={`body_${locale}`} defaultValue={markdown} onChange={setMarkdown} />
        </div>
        {preview !== null ? (
          <div className="prose-moon min-h-96 rounded-lg border border-line px-6 py-5" dangerouslySetInnerHTML={{ __html: preview }} />
        ) : null}
        {errorFor("bodyMd") ? (
          <p role="alert" className="text-xs text-ink-strong">
            {errorFor("bodyMd")}
          </p>
        ) : (
          <p className="text-xs text-muted">GitHub-flavoured Markdown, $inline$ and $$display$$ math, fenced code. Images: paste a URL from Media.</p>
        )}
      </div>
      {!primary ? (
        <div>
          <Button variant="ghost" className="min-h-9 px-4 text-xs" onClick={() => onEnable(false)}>
            Remove translation
          </Button>
        </div>
      ) : null}
    </div>
  );
}
