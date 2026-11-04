"use client";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <h1 className="text-2xl font-medium tracking-tight text-ink-strong">Something broke</h1>
      <p className="mt-2 max-w-[60ch] text-sm text-muted">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm text-bg"
      >
        Try again
      </button>
    </>
  );
}
