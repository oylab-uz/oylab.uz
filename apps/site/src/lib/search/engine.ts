import type { SearchDoc } from "./docs";
import { fold, queryTokens } from "./fold";
import { excerpt } from "./highlight";

/** A document with its fields folded once, padded with spaces so " word" finds a word start. */
export type PreparedDoc = {
  doc: SearchDoc;
  title: string;
  subtitle: string;
  text: string;
  titleWords: string[];
  order: number;
};

export type SearchHit = { doc: SearchDoc; score: number; excerpt: string };

const pad = (text: string) => ` ${fold(text)} `;

export function prepare(docs: readonly SearchDoc[]): PreparedDoc[] {
  return docs.map((doc, order) => {
    const title = pad(doc.title);
    return {
      doc,
      title,
      subtitle: pad(doc.subtitle),
      text: pad(doc.text),
      titleWords: title.split(" ").filter(Boolean),
      order,
    };
  });
}

/** Whole word, word prefix, or anywhere inside: the three strengths of a match in one field. */
function fieldScore(field: string, token: string, whole: number, prefix: number, inside: number): number {
  if (field.includes(` ${token} `)) return whole;
  if (field.includes(` ${token}`)) return prefix;
  return field.includes(token) ? inside : 0;
}

/** True when `a` and `b` differ by at most one insertion, deletion, substitution or swap. */
function withinOneEdit(a: string, b: string): boolean {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i++;
  if (i === a.length && i === b.length) return true;
  return (
    a.slice(i + 1) === b.slice(i + 1) ||
    a.slice(i) === b.slice(i + 1) ||
    a.slice(i + 1) === b.slice(i) ||
    (a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2))
  );
}

/**
 * One typo is forgiven in a title word, for tokens of six letters or more:
 * shorter than that a near miss is usually another word ("reset" is one
 * letter from the start of "research").
 */
function nearTitleWord(words: readonly string[], token: string): boolean {
  if (token.length < 6) return false;
  return words.some(
    (word) =>
      word[0] === token[0] &&
      [token.length - 1, token.length, token.length + 1].some(
        (length) => length <= word.length && withinOneEdit(token, word.slice(0, length)),
      ),
  );
}

function tokenScore(prepared: PreparedDoc, token: string): number {
  const exact = Math.max(
    fieldScore(prepared.title, token, 120, 90, 60),
    fieldScore(prepared.subtitle, token, 45, 40, 25),
    fieldScore(prepared.text, token, 22, 20, 10),
  );
  if (exact > 0) return exact;
  // Below any exact word match, so a guess never outranks what was actually typed.
  return nearTitleWord(prepared.titleWords, token) ? 15 : 0;
}

/**
 * Documents matching every word of the query, best first. Titles outrank
 * subtitles, subtitles outrank body text; ties keep the index order.
 */
export function search(prepared: readonly PreparedDoc[], query: string, limit = 20): SearchHit[] {
  const tokens = queryTokens(query);
  if (tokens.length === 0) return [];
  const phrase = ` ${fold(query)}`;

  const scored: Array<{ prepared: PreparedDoc; score: number }> = [];
  for (const candidate of prepared) {
    let score = 0;
    for (const token of tokens) {
      const points = tokenScore(candidate, token);
      if (points === 0) {
        score = 0;
        break;
      }
      score += points;
    }
    if (score === 0) continue;
    if (candidate.title.startsWith(phrase)) score += 40;
    if (candidate.doc.pinned) score += 5;
    scored.push({ prepared: candidate, score });
  }

  scored.sort((a, b) => b.score - a.score || a.prepared.order - b.prepared.order);
  return scored.slice(0, limit).map(({ prepared: hit, score }) => ({
    doc: hit.doc,
    score,
    excerpt: excerpt(hit.doc.text, tokens),
  }));
}

/** What the palette offers before anything is typed. */
export function pinned(prepared: readonly PreparedDoc[]): SearchHit[] {
  return prepared
    .filter((candidate) => candidate.doc.pinned)
    .map((candidate) => ({ doc: candidate.doc, score: 0, excerpt: excerpt(candidate.doc.text, []) }));
}
