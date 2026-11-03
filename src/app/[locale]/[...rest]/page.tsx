import { notFound } from "next/navigation";

/** Anything under a valid locale that is not a known route renders the localized 404. */
export default function CatchAllPage() {
  notFound();
}
