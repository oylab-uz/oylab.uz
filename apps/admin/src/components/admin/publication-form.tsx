"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { renderPreviewAction } from "@/app/journal/[id]/actions";
import { publicationFormAction } from "@/app/publications/[id]/actions";
import type { Publication, PublicationTranslation } from "@/db/schema";
import { LOCALES, type Locale } from "@oylab/content/locales";
import type { Author } from "@/lib/content/types";
import { toLocalInput } from "@/lib/forms/dates";
import { initialFormState } from "@/lib/forms/form-state";
import { AuthorsField } from "./authors-field";
import { LocaleTabs } from "./locale-tabs";
import { MarkdownEditor } from "./markdown-editor";
import { SubmitButton } from "./submit-button";
import { Banner, Button, Field, Input, StatusPill, Textarea } from "./ui";

export function PublicationForm({
  publication,
  authors,
  translations,
}: {
  publication: Publication;
  authors: Author[];
  translations: PublicationTranslation[];
}) {
  const [state, formAction] = useActionState(publicationFormAction, initialFormState);
  const locales = [publication.primaryLocale, ...LOCALES.filter((l) => l !== publication.primaryLocale)] as Locale[];
  const [active, setActive] = useState<Locale>(publication.primaryLocale);
  const [enabled, setEnabled] = useState<Record<Locale, boolean>>(() => {
    const present = new Set(translations.map((t) => t.locale));
    return { en: present.has("en"), uz: present.has("uz"), ru: present.has("ru"), [publication.primaryLocale]: true } as Record<Locale, boolean>;
  });
  const [dirtyAt, setDirtyAt] = useState<number | null>(null);
  const dirty = dirtyAt !== null && (state.savedAt === null || dirtyAt > state.savedAt);
  const markDirty = () => setDirtyAt(Date.now());
  const dialog = useRef<HTMLDialogElement>(null);
  const published = publication.status === "published";

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

  return (
    <form action={formAction} onChange={markDirty} className="flex flex-col gap-8">
      <input type="hidden" name="id" value={publication.id} />
      <input type="hidden" name="primaryLocale" value={publication.primaryLocale} />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-medium tracking-tight text-ink-strong">
            {translationFor(publication.primaryLocale)?.title || "Untitled publication"}
          </h1>
          <StatusPill status={publication.status} />
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

      <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)]">
        <aside className="flex flex-col gap-6">
          <Field
            label="Slug"
            htmlFor="slug"
            helper={published ? "Locked after publishing" : "Lowercase letters, numbers and hyphens"}
            error={errorFor("slug")}
          >
            <Input id="slug" name="slug" defaultValue={publication.slug} disabled={published} spellCheck={false} aria-invalid={Boolean(errorFor("slug"))} />
            {published ? <input type="hidden" name="slug" value={publication.slug} /> : null}
          </Field>
          <div className="grid grid-cols-[7rem_1fr] gap-3">
            <Field label="Year" htmlFor="year" error={errorFor("year")}>
              <Input id="year" name="year" type="number" inputMode="numeric" min={1990} max={2100} defaultValue={publication.year} />
            </Field>
            <Field label="Venue" htmlFor="venue" error={errorFor("venue")}>
              <Input id="venue" name="venue" defaultValue={publication.venue} placeholder="NeurIPS 2026, arXiv preprint…" />
            </Field>
          </div>
          <AuthorsField initial={authors} error={errorFor("authors")} onChange={markDirty} />
          <Field label="PDF" htmlFor="pdfUrl" error={errorFor("pdfUrl")}>
            <Input id="pdfUrl" name="pdfUrl" type="url" defaultValue={publication.pdfUrl ?? ""} placeholder="https://" />
          </Field>
          <Field label="arXiv" htmlFor="arxivUrl" error={errorFor("arxivUrl")}>
            <Input id="arxivUrl" name="arxivUrl" type="url" defaultValue={publication.arxivUrl ?? ""} placeholder="https://arxiv.org/abs/…" />
          </Field>
          <Field label="Code" htmlFor="codeUrl" error={errorFor("codeUrl")}>
            <Input id="codeUrl" name="codeUrl" type="url" defaultValue={publication.codeUrl ?? ""} placeholder="https://github.com/…" />
          </Field>
          <Field label="DOI" htmlFor="doi" error={errorFor("doi")} helper="Just the identifier, e.g. 10.1000/xyz123">
            <Input id="doi" name="doi" defaultValue={publication.doi ?? ""} spellCheck={false} />
          </Field>
          <Field label="BibTeX" htmlFor="bibtex" error={errorFor("bibtex")}>
            <Textarea id="bibtex" name="bibtex" defaultValue={publication.bibtex ?? ""} rows={6} spellCheck={false} className="font-mono text-xs" />
          </Field>
          <Field label="Published date" htmlFor="publishedAt" helper="Left empty, publishing sets it to now" error={errorFor("publishedAt")}>
            <Input id="publishedAt" name="publishedAt" type="datetime-local" defaultValue={toLocalInput(publication.publishedAt)} />
          </Field>
        </aside>

        <LocaleTabs
          locales={locales}
          active={active}
          enabled={enabled}
          primary={publication.primaryLocale}
          onSelect={setActive}
          errors={{ en: localeHasError("en"), uz: localeHasError("uz"), ru: localeHasError("ru") }}
        >
          {(locale) => (
            <AbstractPanel
              key={locale}
              locale={locale}
              primary={locale === publication.primaryLocale}
              enabled={enabled[locale]}
              onEnable={(on) => {
                setEnabled((prev) => ({ ...prev, [locale]: on }));
                markDirty();
              }}
              onDirty={markDirty}
              translation={translationFor(locale)}
              errorFor={(field) => errorFor(`translations.${locale}.${field}`)}
            />
          )}
        </LocaleTabs>
      </div>

      <dialog ref={dialog} className="m-auto w-[min(92vw,26rem)] rounded-xl border border-line bg-bg p-6 text-ink backdrop:bg-ink/40">
        <h2 className="text-lg font-medium text-ink-strong">Delete this draft?</h2>
        <p className="mt-2 text-sm text-muted">The publication and its translations are removed. This cannot be undone.</p>
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

function AbstractPanel({
  locale,
  primary,
  enabled,
  onEnable,
  onDirty,
  translation,
  errorFor,
}: {
  locale: Locale;
  primary: boolean;
  enabled: boolean;
  onEnable: (on: boolean) => void;
  onDirty: () => void;
  translation: PublicationTranslation | undefined;
  errorFor: (field: string) => string | undefined;
}) {
  const [markdown, setMarkdown] = useState(translation?.abstractMd ?? "");
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
        <Input id={`title_${locale}`} name={`title_${locale}`} defaultValue={translation?.title ?? ""} aria-invalid={Boolean(errorFor("title"))} className="text-base" />
      </Field>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span id={`abstract_${locale}-label`} className="text-sm font-medium text-ink-strong">
            Abstract (Markdown)
          </span>
          <Button variant="ghost" className="min-h-9 px-4 text-xs" onClick={togglePreview} disabled={previewing}>
            {previewing ? "Rendering…" : preview !== null ? "Edit" : "Preview"}
          </Button>
        </div>
        <div hidden={preview !== null}>
          <MarkdownEditor id={`abstract_${locale}`} name={`abstract_${locale}`} defaultValue={markdown} onChange={(v) => { setMarkdown(v); onDirty(); }} minHeight="12rem" />
        </div>
        {preview !== null ? (
          <div className="prose-moon min-h-48 rounded-lg border border-line px-6 py-5" dangerouslySetInnerHTML={{ __html: preview }} />
        ) : null}
        {errorFor("abstractMd") ? (
          <p role="alert" className="text-xs text-ink-strong">
            {errorFor("abstractMd")}
          </p>
        ) : null}
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
