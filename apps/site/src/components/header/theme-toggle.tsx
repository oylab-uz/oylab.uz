"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { toggleTheme } from "@/components/theme/theme";

type Props = { toLight: string; toDark: string };

/**
 * Both labels and both icons are in the DOM; CSS picks the visible pair.
 * That keeps server and client markup identical, so no hydration mismatch,
 * and the toggle needs no React state: the `dark` class on `<html>` is the
 * single source of truth, set before paint by `ThemeInit`.
 */
export function ThemeToggle({ toLight, toDark }: Props) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:bg-surface active:scale-[0.96]"
    >
      <Moon size={18} weight="light" aria-hidden className="dark:hidden" />
      <Sun size={18} weight="light" aria-hidden className="hidden dark:block" />
      <span className="sr-only dark:hidden">{toDark}</span>
      <span className="sr-only hidden dark:inline">{toLight}</span>
    </button>
  );
}
