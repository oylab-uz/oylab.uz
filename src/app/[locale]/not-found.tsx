import { getLocale, getTranslations } from "next-intl/server";
import { NotFoundView } from "@/components/not-found-view";

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  return <NotFoundView title={t("title")} body={t("body")} back={t("back")} backHref={`/${locale}`} />;
}
