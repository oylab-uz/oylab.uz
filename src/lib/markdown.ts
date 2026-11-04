import type { Element, Parent, Root } from "hast";
import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export type RenderOptions = {
  /** Absolute images must live under this origin, e.g. https://media.oylab.uz */
  mediaOrigin: string;
};

const WORDS_PER_MINUTE = 200;

export function readingMinutes(md: string): number {
  const words = md.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

/**
 * Sanitize runs before KaTeX, as rehype-katex recommends: the math source
 * survives as `code.language-math`, KaTeX then emits its own trusted HTML.
 */
const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    // Replaces the default rule: a second className entry is ignored by the sanitizer.
    code: [["className", /^language-./, "math-inline", "math-display"]],
    section: [...(defaultSchema.attributes?.section ?? []), ["className", "footnotes"], "dataFootnotes"],
    h2: [...(defaultSchema.attributes?.h2 ?? []), ["className", "sr-only"]],
    a: [...(defaultSchema.attributes?.a ?? []), ["className", "data-footnote-backref"], "dataFootnoteBackref", "ariaLabel", "ariaDescribedBy"],
    img: ["src", "alt", "title"],
  },
};

function isElement(node: unknown): node is Element {
  return typeof node === "object" && node !== null && (node as Element).type === "element";
}

/** Drops images outside the media origin and lazy-loads the rest. */
function restrictImages(mediaOrigin: string) {
  const prefix = mediaOrigin.replace(/\/+$/, "") + "/";
  const walk = (parent: Parent) => {
    for (let i = parent.children.length - 1; i >= 0; i--) {
      const child = parent.children[i];
      if (!isElement(child)) continue;
      if (child.tagName === "img") {
        const src = String(child.properties?.src ?? "");
        const absolute = /^[a-z][a-z0-9+.-]*:/i.test(src) || src.startsWith("//");
        if (absolute && !src.startsWith(prefix)) {
          parent.children.splice(i, 1);
          continue;
        }
        child.properties = { ...child.properties, loading: "lazy" };
      }
      walk(child);
    }
  };
  return (tree: Root) => walk(tree);
}

export async function renderMarkdown(
  md: string,
  options: RenderOptions,
): Promise<{ html: string; readingMinutes: number }> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSanitize, schema)
    .use(rehypeKatex, { output: "htmlAndMathml" })
    .use(rehypeSlug)
    .use(restrictImages, options.mediaOrigin)
    .use(rehypeStringify)
    .process(md);
  return { html: String(file), readingMinutes: readingMinutes(md) };
}
