import { getTranslations, setRequestLocale } from "next-intl/server";
import { NotFoundView } from "@/components/not-found-view";

export default async function EnglishNotFound() {
  setRequestLocale("en");
  const t = await getTranslations("notFound");
  return <NotFoundView title={t("title")} body={t("body")} back={t("back")} backHref="/" />;
}
