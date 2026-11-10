"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/i18n/routing";
import type { SearchIndex } from "./docs";
import { prepare, type PreparedDoc } from "./engine";

export type IndexState = { status: "idle" | "loading" | "error" } | { status: "ready"; docs: PreparedDoc[] };

const IDLE: IndexState = { status: "idle" };
const LOADING: IndexState = { status: "loading" };
const FAILED: IndexState = { status: "error" };

/** One index per language, kept for the life of the page. */
const states = new Map<Locale, IndexState>();
const listeners = new Set<() => void>();

function publish(locale: Locale, state: IndexState) {
  states.set(locale, state);
  for (const listener of listeners) listener();
}

/**
 * Starts downloading a language's index unless that is under way or done.
 * Cheap to call on every hover of the search button; a failed load retries.
 */
export function loadSearchIndex(locale: Locale): void {
  const status = states.get(locale)?.status;
  if (status === "loading" || status === "ready") return;
  publish(locale, LOADING);
  fetch(`/search-index/${locale}.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      return response.json() as Promise<SearchIndex>;
    })
    .then((index) => publish(locale, { status: "ready", docs: prepare(index.docs) }))
    .catch(() => publish(locale, FAILED));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSearchIndex(locale: Locale): IndexState {
  return useSyncExternalStore(
    subscribe,
    () => states.get(locale) ?? IDLE,
    () => IDLE,
  );
}
