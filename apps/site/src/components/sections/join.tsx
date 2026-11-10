import { GithubLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react/ssr";
import { getTranslations } from "next-intl/server";
import { Seam } from "@/components/ornament/seam";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn, container } from "@/lib/cn";
import { site } from "@/lib/content";

const socials = [
  { href: site.social.github, label: "GitHub", Icon: GithubLogo },
  { href: site.social.x, label: "X", Icon: XLogo },
  { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
];

export async function Join() {
  const t = await getTranslations("join");
  const roles = t.raw("roles") as string[];

  return (
    <section id="contact" className="scroll-mt-16">
      <Seam />
      <div className={cn(container, "grid gap-16 py-24 md:py-32 lg:grid-cols-12 lg:gap-10")}>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 className="mt-4 font-serif text-3xl font-light tracking-tight leading-[1.05] text-ink-strong md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-muted md:text-lg">
              {t("lead")}
            </p>
          </Reveal>

          <RevealGroup className="mt-12">
            <p className="eyebrow">{t("openRoles")}</p>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {roles.map((role, index) => (
                <RevealItem key={role}>
                  <li className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-4">
                    <span className="eyebrow tabular">0{index + 1}</span>
                    <span className="text-base text-ink">{role}</span>
                  </li>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>

        <Reveal className="flex flex-col justify-between gap-12 lg:col-span-5 lg:col-start-8">
          <div>
            <p className="eyebrow">{t("contactTitle")}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-4 block break-all font-serif text-2xl tracking-tight text-ink-strong underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:decoration-ink md:text-4xl"
            >
              {site.email}
            </a>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <dt className="eyebrow">{t("addressLabel")}</dt>
                <dd className="mt-2 text-sm text-ink">{t("address")}</dd>
              </div>
              <div>
                <dt className="eyebrow">{t("coordinates")}</dt>
                <dd className="mt-2 font-mono text-sm tabular text-ink">{site.coordinatesLabel}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <MagneticButton href={`mailto:${site.email}`}>{t("write")}</MagneticButton>
            <ul className="flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
                  >
                    <Icon size={18} weight="light" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
