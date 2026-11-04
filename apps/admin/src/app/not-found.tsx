import Link from "next/link";

export default function AdminNotFound() {
  return (
    <>
      <h1 className="text-2xl font-medium tracking-tight text-ink-strong">Not found</h1>
      <p className="mt-2 text-sm text-muted">
        Nothing lives at this address.{" "}
        <Link href="/" className="underline">
          Back to the dashboard
        </Link>
        .
      </p>
    </>
  );
}
