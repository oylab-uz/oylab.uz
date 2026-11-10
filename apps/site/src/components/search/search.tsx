"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import {
  Fragment,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { GirihStar } from "@/components/ornament/girih-star";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { pinned, search, type SearchHit } from "@/lib/search/engine";
import { queryTokens } from "@/lib/search/fold";
import { highlight } from "@/lib/search/highlight";
import { loadSearchIndex, useSearchIndex } from "@/lib/search/index-store";

const subscribeNever = () => () => {};

/** "⌘K" on Apple keyboards, "Ctrl K" elsewhere; null until mounted, so the static HTML stays neutral. */
function useShortcutLabel(): string | null {
  return useSyncExternalStore(
    subscribeNever,
    () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘K" : "Ctrl K"),
    () => null,
  );
}

function isEditable(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

/** A keycap. The caller picks the display (`inline-grid`, or a responsive pair) so it can also hide it. */
function Key({ children, className }: { children: ReactNode; className: string }) {
  return (
    <kbd
      className={cn(
        "h-5 min-w-5 place-items-center rounded-[4px] border border-line-strong px-1 font-mono text-[10px] leading-none text-muted",
        className,
      )}
    >
      {children}
    </kbd>
  );
}

/** `text` with the parts the query matched marked, in the spelling the page uses. */
function Marked({ text, tokens }: { text: string; tokens: readonly string[] }) {
  return highlight(text, tokens).map((segment, index) =>
    segment.hit ? (
      <mark key={index} className="rounded-[2px] bg-ink/12 text-ink-strong">
        {segment.text}
      </mark>
    ) : (
      <Fragment key={index}>{segment.text}</Fragment>
    ),
  );
}

/**
 * Site search: the header button and the palette it opens, also on ⌘K, Ctrl K
 * and "/". The index for the current language is a static file fetched on
 * first use; matching runs in the browser (see lib/search). The input is a
 * combobox over a listbox, so arrows move the selection while focus stays put.
 */
export function Search({ onOpen }: { onOpen?: () => void }) {
  const t = useTranslations("search");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const shortcut = useShortcutLabel();
  const index = useSearchIndex(locale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const tokens = useMemo(() => queryTokens(deferredQuery), [deferredQuery]);

  // The page changed under an open palette (browser back or forward): get out of the way.
  const [seenPathname, setSeenPathname] = useState(pathname);
  if (seenPathname !== pathname) {
    setSeenPathname(pathname);
    setOpen(false);
  }

  /**
   * Results in display order, under their headings; `offset` is a section's
   * first position in the whole list. Before anything is typed, the pinned entries.
   */
  const sections = useMemo(() => {
    if (index.status !== "ready") return [];
    if (tokens.length === 0) return [{ key: "jump", label: t("jump"), hits: pinned(index.docs), offset: 0 }];
    const byGroup = new Map<string, SearchHit[]>();
    for (const hit of search(index.docs, deferredQuery)) {
      const hits = byGroup.get(hit.doc.group);
      if (hits) hits.push(hit);
      else byGroup.set(hit.doc.group, [hit]);
    }
    let offset = 0;
    return [...byGroup].map(([group, hits]) => {
      const section = { key: group, label: t(`groups.${group}`), hits, offset };
      offset += hits.length;
      return section;
    });
  }, [index, tokens, deferredQuery, t]);

  const count = sections.reduce((total, section) => total + section.hits.length, 0);
  const current = count === 0 ? -1 : Math.min(active, count - 1);
  const searching = tokens.length > 0;

  const notifyOpen = useEffectEvent(() => onOpen?.());

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      const modifier = event.metaKey || event.ctrlKey;
      // `code` as well as `key`: on a Russian layout the K key types "л".
      if (modifier && !event.altKey && !event.shiftKey && (event.key.toLowerCase() === "k" || event.code === "KeyK")) {
        event.preventDefault();
        setOpen((value) => !value);
      } else if (event.key === "/" && !modifier && !event.altKey && !isEditable(event.target)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // The dialog element is the modal; React state only says whether it should be showing.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      loadSearchIndex(locale);
      notifyOpen();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, locale]);

  useEffect(() => {
    resultsRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [current]);

  const close = () => dialogRef.current?.close();

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (count > 0) setActive((current + (event.key === "ArrowDown" ? 1 : -1) + count) % count);
    } else if (event.key === "Enter") {
      event.preventDefault();
      // Through the link itself, so Enter and a click take the same road.
      resultsRef.current?.querySelector<HTMLAnchorElement>('[aria-selected="true"]')?.click();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        onPointerEnter={() => loadSearchIndex(locale)}
        onFocus={() => loadSearchIndex(locale)}
        aria-haspopup="dialog"
        aria-keyshortcuts="Meta+K Control+K"
        className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-surface active:scale-[0.96] xl:mr-2 xl:flex xl:h-9 xl:w-auto xl:gap-2.5 xl:border xl:border-line xl:pr-2 xl:pl-3 xl:text-muted xl:hover:border-line-strong xl:hover:bg-transparent xl:hover:text-ink"
      >
        <MagnifyingGlass size={18} weight="light" aria-hidden className="xl:size-4" />
        <span className="sr-only">{t("open")}</span>
        <Key className={cn("hidden px-1.5 xl:inline-grid", shortcut ? null : "invisible")}>{shortcut ?? "⌘K"}</Key>
      </button>

      <dialog
        ref={dialogRef}
        className="palette"
        aria-label={t("title")}
        onClose={() => {
          setOpen(false);
          setQuery("");
          setActive(0);
        }}
        onClick={(event) => {
          // Only the backdrop reports the dialog itself as the target.
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="burchak max-sm:h-full max-sm:before:hidden max-sm:after:hidden">
          <div className="flex max-h-[min(72dvh,36rem)] flex-col overflow-hidden rounded-xl border border-line-strong bg-bg shadow-[0_32px_80px_-32px_oklch(0%_0_0/0.5)] max-sm:h-full max-sm:max-h-none max-sm:rounded-none max-sm:border-0">
            <div className="flex shrink-0 items-center gap-3 border-b border-line pr-2 pl-4">
              <MagnifyingGlass size={18} weight="light" aria-hidden className="shrink-0 text-muted" />
              <input
                type="text"
                inputMode="search"
                enterKeyHint="go"
                role="combobox"
                aria-expanded
                aria-controls={listId}
                aria-activedescendant={current >= 0 ? `${listId}-${current}` : undefined}
                aria-autocomplete="list"
                aria-label={t("title")}
                placeholder={t("placeholder")}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKeyDown}
                className="h-14 min-w-0 flex-1 bg-transparent text-base text-ink-strong outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={close}
                className="grid h-11 min-w-11 shrink-0 cursor-pointer place-items-center rounded-full px-2 text-muted transition-colors hover:text-ink"
              >
                <Key className="hidden px-1.5 sm:inline-grid">esc</Key>
                <X size={20} weight="light" aria-hidden className="sm:hidden" />
                <span className="sr-only">{t("close")}</span>
              </button>
            </div>

            <div ref={resultsRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-2">
              <div id={listId} role="listbox" aria-label={t("title")}>
                {sections.map((section) => (
                  <div key={section.key} role="group" aria-labelledby={`${listId}-${section.key}`}>
                    <p id={`${listId}-${section.key}`} className="eyebrow px-3 pt-4 pb-2">
                      {section.label}
                    </p>
                    {section.hits.map((hit, row) => {
                      const at = section.offset + row;
                      const selected = at === current;
                      return (
                        <Link
                          key={hit.doc.id}
                          id={`${listId}-${at}`}
                          href={hit.doc.href}
                          role="option"
                          aria-selected={selected}
                          tabIndex={-1}
                          onClick={close}
                          onPointerMove={() => setActive(at)}
                          className={cn(
                            "grid grid-cols-[0.75rem_1fr_auto] items-center gap-3 rounded-lg px-3 py-2.5 outline-none",
                            selected && "bg-surface",
                          )}
                        >
                          <GirihStar
                            size={12}
                            filled
                            className={cn("text-atlas-sariq transition-opacity duration-150", selected ? "opacity-100" : "opacity-0")}
                          />
                          <span className="min-w-0">
                            <span className="block truncate text-[15px] leading-snug text-ink-strong">
                              <Marked text={hit.doc.title} tokens={tokens} />
                            </span>
                            {hit.excerpt ? (
                              <span className={cn("mt-0.5 text-[13px] leading-snug text-muted", searching ? "line-clamp-2" : "truncate block")}>
                                <Marked text={hit.excerpt} tokens={tokens} />
                              </span>
                            ) : null}
                          </span>
                          {hit.doc.subtitle ? (
                            <span className="eyebrow max-w-[32ch] truncate text-right max-sm:hidden">
                              <Marked text={hit.doc.subtitle} tokens={tokens} />
                            </span>
                          ) : null}
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </div>

              {index.status === "error" ? (
                <div className="flex flex-col items-center gap-4 px-4 py-12 text-center text-sm text-muted">
                  <p>{t("error")}</p>
                  <button
                    type="button"
                    onClick={() => loadSearchIndex(locale)}
                    className="inline-flex h-11 cursor-pointer items-center rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-ink"
                  >
                    {t("retry")}
                  </button>
                </div>
              ) : index.status !== "ready" ? (
                <p className="flex items-center justify-center gap-3 px-4 py-12 text-sm text-muted">
                  <GirihStar size={14} className="text-qalay motion-safe:animate-breathe" />
                  {t("loading")}
                </p>
              ) : searching && count === 0 ? (
                <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
                  <GirihStar size={28} className="text-qalay" />
                  <p className="text-sm text-ink">{t("empty", { query: deferredQuery.trim() })}</p>
                  <p className="text-[13px] text-muted">{t("emptyHint")}</p>
                </div>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-5 border-t border-line px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-muted max-sm:hidden">
              <span className="flex items-center gap-1.5">
                <Key className="inline-grid">↑</Key>
                <Key className="inline-grid">↓</Key>
                {t("hints.navigate")}
              </span>
              <span className="flex items-center gap-1.5">
                <Key className="inline-grid">↵</Key>
                {t("hints.open")}
              </span>
              <span className="flex items-center gap-1.5">
                <Key className="inline-grid px-1.5">esc</Key>
                {t("hints.close")}
              </span>
            </div>

            <p role="status" aria-live="polite" className="sr-only">
              {index.status === "ready" && searching ? t("count", { count }) : ""}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
