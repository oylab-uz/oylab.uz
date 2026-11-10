/**
 * Text folding for search: what a reader types and what the page says should
 * meet in the middle. Case, punctuation, Latin diacritics and the many
 * apostrophes of Uzbek Latin (oʻ, oʼ, o', o’) all disappear; Russian ё reads
 * as е. Cyrillic letters are otherwise left alone, so й stays й.
 */

const APOSTROPHE = /['`´ʹʻʼ‘’′]/;
const MARK = /\p{M}/u;
const WORD = /[\p{L}\p{N}]/u;
const LATIN = /\p{Script=Latin}/u;

/** One character folded: "" when it vanishes, " " when it separates words. */
function foldChar(char: string): string {
  if (APOSTROPHE.test(char) || MARK.test(char)) return "";
  if (!WORD.test(char)) return " ";
  const lower = char.toLowerCase();
  if (lower === "ё") return "е";
  const [base] = lower.normalize("NFD");
  return LATIN.test(base) ? base : lower;
}

/**
 * Folds `text` and remembers, for every folded character, the index in `text`
 * it came from. Highlighting uses the map to mark the original spelling.
 */
export function foldWithMap(text: string): { folded: string; map: number[] } {
  let folded = "";
  const map: number[] = [];
  let index = 0;
  for (const char of text) {
    const piece = foldChar(char);
    if (piece === " ") {
      if (folded !== "" && !folded.endsWith(" ")) {
        folded += " ";
        map.push(index);
      }
    } else {
      for (const unit of piece) {
        folded += unit;
        map.push(index);
      }
    }
    index += char.length;
  }
  if (folded.endsWith(" ")) {
    folded = folded.slice(0, -1);
    map.pop();
  }
  return { folded, map };
}

export function fold(text: string): string {
  return foldWithMap(text).folded;
}

/** The distinct folded words of a query, in the order typed. */
export function queryTokens(query: string): string[] {
  return [...new Set(fold(query).split(" ").filter(Boolean))];
}
