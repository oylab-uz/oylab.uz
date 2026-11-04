import { getTranslations } from "next-intl/server";
import { CopyButton } from "@/components/ui/copy-button";

export async function BibtexBlock({ bibtex }: { bibtex: string }) {
  const t = await getTranslations("publications");
  return (
    <section aria-labelledby="bibtex-heading" className="mt-12">
      <div className="flex items-center justify-between gap-4">
        <h2 id="bibtex-heading" className="eyebrow">
          {t("bibtex")}
        </h2>
        <CopyButton text={bibtex} label={t("copy")} copiedLabel={t("copied")} className="min-h-9 px-4 text-xs" />
      </div>
      <pre className="mt-3 overflow-x-auto rounded-xl border border-line bg-surface px-5 py-4 font-mono text-[13px] leading-relaxed text-ink">
        <code>{bibtex}</code>
      </pre>
    </section>
  );
}
