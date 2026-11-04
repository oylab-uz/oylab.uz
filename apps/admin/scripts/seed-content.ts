/**
 * Development seed. Placeholder publications stay drafts so nothing fake is
 * public; the two posts are published so the journal pages have content.
 * Fixed ids keep `pnpm db:seed` idempotent.
 */
export type SeedTranslation = { locale: "en" | "uz" | "ru"; title: string; summary: string; bodyMd: string };
export type SeedPost = {
  id: string;
  slug: string;
  primaryLocale: "en" | "uz" | "ru";
  publishedAt: number;
  translations: SeedTranslation[];
};
export type SeedPublication = {
  id: string;
  slug: string;
  year: number;
  venue: string;
  authors: { name: string; url?: string }[];
  title: string;
  abstractMd: string;
};

export const EMAIL = "seed@oylab.uz";

export const posts: SeedPost[] = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    slug: "why-we-train-small-models-in-tashkent",
    primaryLocale: "en",
    publishedAt: Date.UTC(2026, 9, 20, 9, 0),
    translations: [
      {
        locale: "en",
        title: "Why we train small models in Tashkent",
        summary:
          "Three reasons a frontier lab in Central Asia starts with models that fit on one node, and the numbers behind the choice.",
        bodyMd: `Most of what we learn about training comes from runs we can afford to repeat. A 7B model trained on one eight-GPU node for a week is something a team of four can restart on Monday after a bad Friday. That is the whole argument, but here are the numbers behind it.

## What one node buys you

| Model | Tokens | Node-days | Restarts we could afford |
|---|---|---|---|
| 1.3B | 60B | 2.5 | 12 |
| 7B | 300B | 21 | 3 |
| 30B | 1T | 190 | 0 |

The last column is the one that matters. A run you cannot restart is a run you cannot learn from.[^1]

## The loss we actually watch

We track the standard cross-entropy, but we report it per Uzbek morpheme rather than per token, because tokenizers trained on English text split Uzbek words into fragments that hide real progress:

$$
\\mathcal{L}_{\\text{morph}} = \\frac{1}{M}\\sum_{i=1}^{M} -\\log p_\\theta(m_i \\mid m_{<i})
$$

Here $M$ counts morphemes, not sub-word pieces. The two curves disagree by up to 0.4 nats early in training.

## A small ritual

Every run starts the same way:

\`\`\`python
from oylab.train import Run

run = Run.from_config("configs/oydin-7b.yaml")
run.assert_restartable()   # checkpoints every 20 minutes, verified on load
run.start()
\`\`\`

![The moon over the lab roof, the night the first run finished](https://media.oylab.uz/seed/moon.png)

We will publish the full recipe with the model card.

[^1]: We lost a week in March to a run whose checkpoints were silently corrupt. Hence \`assert_restartable\`.`,
      },
    ],
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    slug: "oy-lab-kuzgi-oqishlar",
    primaryLocale: "uz",
    publishedAt: Date.UTC(2026, 9, 5, 7, 0),
    translations: [
      {
        locale: "uz",
        title: "OY Lab kuzgi oʼqishlar dasturi",
        summary: "Oktabr va noyabr oylarida har chorshanba kuni ochiq maʼruzalar: tilshunoslik, ilmiy hisoblash va tizimlar.",
        bodyMd: `Kuz boshlandi, biz esa oʼqishlarni qayta ochamiz. Har chorshanba soat 18:00 da laboratoriya zalida ochiq maʼruza boʼladi. Kirish bepul, roʼyxatdan oʼtish shart emas.

## Dastur

- **8-oktabr.** Turkiy tillar uchun tokenizatsiya: nima uchun bitta soʼz oʼn boʼlakka boʼlinadi.
- **15-oktabr.** Spektral yechimlar va arzon GPU lar.
- **22-oktabr.** Fargʼona vodiysi uchun sugʼorish prognozi: sunʼiy yoʼldosh maʼlumotlaridan foydalanish.
- **29-oktabr.** Ochiq muhokama: Oʼzbekistonda ilmiy hisoblash infratuzilmasi.

Har bir maʼruza yozib olinadi va keyinroq shu yerda eʼlon qilinadi.`,
      },
      {
        locale: "ru",
        title: "Осенняя программа чтений OY Lab",
        summary: "Открытые лекции по средам в октябре и ноябре: языки, научные вычисления и системы.",
        bodyMd: `Осень началась, и мы снова открываем чтения. Каждую среду в 18:00 в зале лаборатории проходит открытая лекция. Вход свободный, регистрация не нужна.

## Программа

- **8 октября.** Токенизация для тюркских языков: почему одно слово делится на десять кусков.
- **15 октября.** Спектральные решатели на недорогих GPU.
- **22 октября.** Прогноз орошения для Ферганской долины по спутниковым данным.
- **29 октября.** Открытая дискуссия: инфраструктура научных вычислений в Узбекистане.

Каждая лекция записывается и позже публикуется здесь.`,
      },
    ],
  },
];

export const publications: SeedPublication[] = [
  {
    id: "aaaaaaaa-0001-4000-8000-000000000001",
    slug: "oydin-7b-open-language-model-uzbek-karakalpak",
    year: 2025,
    venue: "arXiv preprint",
    authors: [{ name: "Dilnoza Rahimova" }, { name: "Bekzod Yusupov" }, { name: "Sevara Toʼxtayeva" }],
    title: "Oydin: A 7B Open Language Model for Uzbek and Karakalpak",
    abstractMd:
      "We release Oydin, a 7B-parameter open language model trained on 300B tokens with a tokenizer built for Turkic morphology. Placeholder abstract.",
  },
  {
    id: "aaaaaaaa-0002-4000-8000-000000000002",
    slug: "low-resource-tokenization-turkic-morphology",
    year: 2025,
    venue: "Findings of ACL",
    authors: [{ name: "Bekzod Yusupov" }, { name: "Dilnoza Rahimova" }],
    title: "Low-Resource Tokenization for Turkic Morphology",
    abstractMd: "A tokenizer objective that rewards morpheme boundaries. Placeholder abstract.",
  },
  {
    id: "aaaaaaaa-0003-4000-8000-000000000003",
    slug: "mixed-precision-spectral-solvers-commodity-gpus",
    year: 2025,
    venue: "SC Workshops",
    authors: [{ name: "Jasur Mamatqulov" }, { name: "Nilufar Ergasheva" }],
    title: "Mixed-Precision Spectral Solvers on Commodity GPUs",
    abstractMd: "Spectral solvers that keep accuracy at FP16 on consumer cards. Placeholder abstract.",
  },
  {
    id: "aaaaaaaa-0004-4000-8000-000000000004",
    slug: "satellite-guided-irrigation-forecasting-fergana-valley",
    year: 2024,
    venue: "NeurIPS, Climate Change AI Workshop",
    authors: [{ name: "Nilufar Ergasheva" }, { name: "Otabek Saidov" }],
    title: "Satellite-Guided Irrigation Forecasting for the Fergana Valley",
    abstractMd: "Weekly irrigation demand from Sentinel-2 imagery. Placeholder abstract.",
  },
  {
    id: "aaaaaaaa-0005-4000-8000-000000000005",
    slug: "benchmarking-uzbek-speech-recognition-noisy-field",
    year: 2024,
    venue: "Interspeech",
    authors: [{ name: "Sevara Toʼxtayeva" }, { name: "Otabek Saidov" }],
    title: "Benchmarking Uzbek Speech Recognition in Noisy Field Conditions",
    abstractMd: "A field-recorded benchmark for Uzbek ASR. Placeholder abstract.",
  },
];
