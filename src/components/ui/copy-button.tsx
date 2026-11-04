"use client";

import { Check, Copy } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function CopyButton({
  text,
  label,
  copiedLabel,
  className,
}: {
  text: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
        } catch {
          // Clipboard unavailable (insecure context); nothing to recover.
        }
      }}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line px-4 text-sm text-ink transition-colors hover:bg-surface",
        className,
      )}
    >
      {copied ? <Check size={16} weight="light" aria-hidden /> : <Copy size={16} weight="light" aria-hidden />}
      {copied ? copiedLabel : label}
    </button>
  );
}
