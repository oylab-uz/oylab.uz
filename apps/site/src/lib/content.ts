/**
 * Structured content that is not prose: people, papers, numbers, links.
 * Translatable strings live in /messages; this file holds the shape.
 *
 * Everything marked `placeholder: true` is realistic in form but invented.
 * Replace with real data before launch and drop the flag.
 */

export const PLACEHOLDER_CONTENT = true;

export const site = {
  name: "OY Lab",
  domain: "oylab.uz",
  url: "https://oylab.uz",
  email: "hello@oylab.uz",
  /** Tashkent city centre. */
  coordinates: { lat: 41.3111, lng: 69.2797 },
  coordinatesLabel: "41.3111° N, 69.2797° E",
  social: {
    github: "https://github.com/oylab",
    x: "https://x.com/oylab_uz",
    linkedin: "https://www.linkedin.com/company/oylab",
  },
} as const;

export const stats = {
  founded: "2021",
  researchers: "4",
  papers: "3",
  releases: "2",
} as const;

export type ResearchAreaId = "models" | "science" | "systems" | "applied";

export const researchAreas: ReadonlyArray<{
  id: ResearchAreaId;
  index: string;
  /** Grid placement classes on md and up. */
  span: string;
}> = [
  { id: "models", index: "01", span: "md:col-span-2" },
  { id: "science", index: "02", span: "md:col-span-1" },
  { id: "systems", index: "03", span: "md:col-span-1" },
  { id: "applied", index: "04", span: "md:col-span-2" },
];

export type TeamMemberId = "noonosh";

export const team: ReadonlyArray<{
  id: TeamMemberId;
  name: string;
  photo: string;
  placeholder: boolean;
}> = [
  {
    id: "noonosh",
    name: "Noonosh Is",
    photo: "https://media.oylab.uz/2026/11/5647d292-ef60-4566-b515-efa61d6b4c01.jpg",
    placeholder: false,
  },
];

/** Paper titles stay in English across locales, as they would on arXiv. */

/**
 * Marquee terms are deliberately trilingual on every locale:
 * the band is a statement about the lab's languages, not navigation.
 */
export const marqueeTerms: ReadonlyArray<string> = [
  "Machine learning",
  "Mashinaviy oʼrganish",
  "Машинное обучение",
  "Open models",
  "Ochiq modellar",
  "Открытые модели",
  "Scientific computing",
  "Ilmiy hisoblash",
  "Научные вычисления",
  "Turkic languages",
  "Turkiy tillar",
  "Тюркские языки",
  "Efficient compute",
  "Samarali hisoblash",
  "Эффективные вычисления",
];
