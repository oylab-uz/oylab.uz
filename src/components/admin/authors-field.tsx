"use client";

import { Plus, X } from "@phosphor-icons/react";
import { useState } from "react";
import type { Author } from "@/lib/content/types";
import { Button, Input } from "./ui";

/** Repeatable author rows, serialised to a hidden `authors_json` field. */
export function AuthorsField({ initial, error, onChange }: { initial: Author[]; error?: string; onChange?: () => void }) {
  const [authors, setAuthors] = useState<Author[]>(initial.length ? initial : [{ name: "" }]);
  const update = (next: Author[]) => {
    setAuthors(next);
    onChange?.();
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink-strong">Authors</span>
      <input type="hidden" name="authors_json" value={JSON.stringify(authors)} />
      {authors.map((author, i) => (
        <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
          <Input
            aria-label={`Author ${i + 1} name`}
            name={`author_name_${i}`}
            placeholder="Name"
            value={author.name}
            onChange={(e) => update(authors.map((a, j) => (j === i ? { ...a, name: e.target.value } : a)))}
          />
          <Input
            aria-label={`Author ${i + 1} link`}
            name={`author_url_${i}`}
            placeholder="https://… (optional)"
            value={author.url ?? ""}
            onChange={(e) => update(authors.map((a, j) => (j === i ? { ...a, url: e.target.value } : a)))}
          />
          <Button
            variant="ghost"
            aria-label={`Remove author ${i + 1}`}
            className="size-11 px-0"
            disabled={authors.length === 1}
            onClick={() => update(authors.filter((_, j) => j !== i))}
          >
            <X size={16} weight="light" aria-hidden />
          </Button>
        </div>
      ))}
      <div>
        <Button variant="ghost" className="min-h-9 px-4 text-xs" onClick={() => update([...authors, { name: "" }])}>
          <Plus size={14} weight="light" aria-hidden />
          Add author
        </Button>
      </div>
      {error ? (
        <p role="alert" className="text-xs text-ink-strong">
          {error}
        </p>
      ) : (
        <p className="text-xs text-muted">In citation order. Links are optional.</p>
      )}
    </div>
  );
}
