import { Geist, Geist_Mono, Spectral } from "next/font/google";

export const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const spectral = Spectral({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

export const fontClassName = `${geist.variable} ${geistMono.variable} ${spectral.variable}`;
