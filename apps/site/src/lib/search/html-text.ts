/** The inside of a tag: quoted attribute values may contain ">", which the serializer does not escape. */
const ATTRS = `(?:"[^"]*"|'[^']*'|[^>"'])*`;

const BLOCK = new RegExp(
  `</?(?:p|div|section|article|header|footer|h[1-6]|ul|ol|li|dl|dt|dd|pre|blockquote|figure|figcaption|table|thead|tbody|tr|td|th|br|hr|img)\\b${ATTRS}>`,
  "gi",
);
const TAG = new RegExp(`<[a-z/!]${ATTRS}>`, "gi");

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, body: string) => {
    if (body[0] !== "#") return NAMED[body.toLowerCase()] ?? entity;
    const code = body[1] === "x" || body[1] === "X" ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10);
    return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : entity;
  });
}

/**
 * Plain text of the HTML the content pipeline renders, for the search index.
 * The input is our own sanitized output, so a tag stripper is enough: blocks
 * become word breaks, inline tags vanish, and the MathML twin that KaTeX emits
 * next to the visible glyphs is dropped so formulas are not indexed twice.
 */
export function htmlToText(html: string): string {
  const text = html
    .replace(/<math\b[\s\S]*?<\/math>/gi, "")
    .replace(/<sup\b[\s\S]*?<\/sup>/gi, "")
    .replace(BLOCK, " ")
    .replace(TAG, "");
  return decodeEntities(text).replace(/\s+/g, " ").trim();
}
