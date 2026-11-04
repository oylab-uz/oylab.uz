import { Geist, Geist_Mono } from "next/font/google";

export const geist = Geist({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-geist", display: "swap" });
export const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-geist-mono", display: "swap" });
export const fontClassName = `${geist.variable} ${geistMono.variable}`;
