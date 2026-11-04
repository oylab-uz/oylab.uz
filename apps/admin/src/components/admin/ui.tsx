import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

const control =
  "min-h-11 w-full rounded-lg border border-line bg-bg px-3.5 text-sm text-ink placeholder:text-muted/70 focus:border-line-strong focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export function Field({
  label,
  htmlFor,
  helper,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  helper?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-strong">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-xs text-ink-strong">
          {error}
        </p>
      ) : helper ? (
        <p id={`${htmlFor}-helper`} className="text-xs text-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(control, className)} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(control, "min-h-24 py-2.5 leading-relaxed", className)} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select {...props} className={cn(control, "appearance-none pr-9", className)}>
      {children}
    </select>
  );
}

export type ButtonVariant = "primary" | "ghost" | "danger";

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-[background-color,transform] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
    variant === "primary" && "bg-ink text-bg hover:bg-ink-strong",
    variant === "ghost" && "border border-line text-ink hover:bg-surface",
    variant === "danger" && "border border-line text-ink hover:bg-surface hover:text-ink-strong",
    className,
  );
}

export function Button({ variant = "primary", className, ...props }: ComponentProps<"button"> & { variant?: ButtonVariant }) {
  return <button type="button" {...props} className={buttonClass(variant, className)} />;
}

export function Banner({ tone, children }: { tone: "error" | "success"; children: ReactNode }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "min-w-0 rounded-lg border px-4 py-3 text-sm [overflow-wrap:anywhere]",
        tone === "error" ? "border-line-strong bg-surface text-ink-strong" : "border-line bg-surface text-ink",
      )}
    >
      {children}
    </div>
  );
}

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-line", className)}>
      <table className="w-full border-collapse text-sm [&_td]:border-t [&_td]:border-line [&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-medium [&_th]:uppercase [&_th]:tracking-[0.12em] [&_th]:text-muted">
        {children}
      </table>
    </div>
  );
}

export function StatusPill({ status, label }: { status: "draft" | "published"; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.1em]",
        status === "published" ? "border-ink bg-ink text-bg" : "border-line text-muted",
      )}
    >
      {label ?? status}
    </span>
  );
}

export function PageHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
      <h1 className="text-2xl font-medium tracking-tight text-ink-strong">{title}</h1>
      {action}
    </div>
  );
}
