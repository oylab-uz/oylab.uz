const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t",
  у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch", ъ: "", ы: "y",
  ь: "", э: "e", ю: "yu", я: "ya",
  // Uzbek Cyrillic
  ў: "o", қ: "q", ғ: "g", ҳ: "h",
};

const MAX = 80;

/** URL slug from a title in Latin, Cyrillic or Uzbek Latin with apostrophes. */
export function slugify(input: string): string {
  let s = input.toLowerCase();
  // Uzbek oʼ / gʼ and plain apostrophes carry no letter of their own.
  s = s.replace(/[ʻʼ']/g, "");
  // Map Cyrillic before NFKD: й and ё decompose into base letters plus marks.
  s = s.replace(/[Ѐ-ӿ]/g, (ch) => CYRILLIC[ch] ?? "");
  s = s.normalize("NFKD").replace(/\p{M}/gu, "");
  s = s.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (s.length > MAX) {
    s = s.slice(0, MAX);
    const cut = s.lastIndexOf("-");
    s = (cut > 0 ? s.slice(0, cut) : s).replace(/-+$/g, "");
  }
  return s;
}

export function isValidSlug(s: string): boolean {
  return s.length >= 1 && s.length <= MAX && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
}
