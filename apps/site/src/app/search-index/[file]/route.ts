import { isLocale, LOCALES, type Locale } from "@oylab/content/locales";
import { buildSearchIndex, type Messages } from "@/lib/search/docs";
import { getSnapshot } from "@/lib/snapshot";
import en from "../../../../messages/en.json";
import ru from "../../../../messages/ru.json";
import uz from "../../../../messages/uz.json";

// Route handlers must declare themselves static under output: "export".
export const dynamic = "force-static";
export const dynamicParams = false;

const messages: Record<Locale, Messages> = { en, uz, ru };

/** One file per language: out/search-index/en.json, uz.json, ru.json. */
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ file: `${locale}.json` }));
}

/** The search palette downloads its language's index the first time it opens. */
export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const locale = (await params).file.replace(/\.json$/, "");
  if (!isLocale(locale)) return new Response("Not found", { status: 404 });
  return Response.json(buildSearchIndex(locale, messages[locale], getSnapshot()));
}
