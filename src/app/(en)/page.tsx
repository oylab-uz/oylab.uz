import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home-page";

export default function EnglishHome() {
  setRequestLocale("en");
  return <HomePage />;
}
