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
  placeholder: true,
  founded: "2024",
  researchers: "14",
  papers: "9",
  releases: "6",
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

export type TeamMemberId =
  | "rahimova"
  | "toshmatov"
  | "yusupova"
  | "karimov"
  | "saidova"
  | "abdullayev";

export const team: ReadonlyArray<{
  id: TeamMemberId;
  name: string;
  photo: string;
  placeholder: boolean;
}> = [
  {
    id: "rahimova",
    name: "Dilnoza Rahimova",
    photo: "https://i.pravatar.cc/800?img=47",
    placeholder: true,
  },
  {
    id: "toshmatov",
    name: "Jasur Toshmatov",
    photo: "https://i.pravatar.cc/800?img=12",
    placeholder: true,
  },
  {
    id: "yusupova",
    name: "Madina Yusupova",
    photo: "https://i.pravatar.cc/800?img=32",
    placeholder: true,
  },
  {
    id: "karimov",
    name: "Bekzod Karimov",
    photo: "https://i.pravatar.cc/800?img=60",
    placeholder: true,
  },
  {
    id: "saidova",
    name: "Nilufar Saidova",
    photo: "https://i.pravatar.cc/800?img=26",
    placeholder: true,
  },
  {
    id: "abdullayev",
    name: "Sardor Abdullayev",
    photo: "https://i.pravatar.cc/800?img=68",
    placeholder: true,
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
