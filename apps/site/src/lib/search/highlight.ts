import { foldWithMap } from "./fold";

export type Segment = { text: string; hit: boolean };

/** Positions in `folded` where `token` occurs: at word starts if any, else anywhere. */
function occurrences(folded: string, token: string): number[] {
  const starts: number[] = [];
  const inside: number[] = [];
  if (token === "") return starts;
  for (let at = folded.indexOf(token); at !== -1; at = folded.indexOf(token, at + 1)) {
    (at === 0 || folded[at - 1] === " " ? starts : inside).push(at);
  }
  return starts.length ? starts : inside;
}

/** Index in `folded` of the earliest match of any token, word starts first; -1 when none. */
function firstMatch(folded: string, tokens: readonly string[]): number {
  let best = -1;
  for (const token of tokens) {
    const [at] = occurrences(folded, token);
    if (at !== undefined && (best === -1 || at < best)) best = at;
  }
  return best;
}

/**
 * Splits `text` into runs and marks the ones a query token matches. Matching
 * happens on the folded text; the runs carry the original spelling, so a query
 * typed as "organish" marks "oʼrganish" whole.
 */
export function highlight(text: string, tokens: readonly string[]): Segment[] {
  if (tokens.length === 0 || text === "") return [{ text, hit: false }];
  const { folded, map } = foldWithMap(text);

  const ranges: Array<[number, number]> = [];
  for (const token of tokens) {
    for (const at of occurrences(folded, token)) {
      const last = at + token.length - 1;
      // Up to the next folded character, so a trailing apostrophe stays with its letter;
      // at the end of the text, just past the last matched character.
      const end = last + 1 < map.length ? map[last + 1] : map[last] + String.fromCodePoint(text.codePointAt(map[last])!).length;
      ranges.push([map[at], end]);
    }
  }
  if (ranges.length === 0) return [{ text, hit: false }];

  ranges.sort((a, b) => a[0] - b[0]);
  const segments: Segment[] = [];
  let cursor = 0;
  for (const [start, end] of ranges) {
    if (end <= cursor) continue;
    const from = Math.max(start, cursor);
    if (from > cursor) segments.push({ text: text.slice(cursor, from), hit: false });
    const previous = segments[segments.length - 1];
    if (previous?.hit && from === cursor) previous.text += text.slice(from, end);
    else segments.push({ text: text.slice(from, end), hit: true });
    cursor = end;
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), hit: false });
  return segments;
}

/**
 * A window of `text` around the first match, cut at word boundaries, with an
 * ellipsis on each cut end. Starts at the beginning when nothing matches.
 */
export function excerpt(text: string, tokens: readonly string[], radius = 80): string {
  const length = radius * 2;
  if (text.length <= length) return text;

  const { folded, map } = foldWithMap(text);
  const at = firstMatch(folded, tokens);
  const centre = at === -1 ? 0 : map[at];

  let start = Math.max(0, centre - Math.floor(radius / 2));
  if (start > 0) {
    const space = text.indexOf(" ", start);
    start = space !== -1 && space < centre ? space + 1 : centre;
  }
  let end = Math.min(text.length, start + length);
  if (end < text.length) {
    const space = text.lastIndexOf(" ", end);
    if (space > start) end = space;
  }
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}
