import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import type { Crumb } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { cn } from "@/lib/cn";
import { breadcrumbJsonLd } from "@/lib/seo";

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = "Оставить заявку",
  primaryHref = "/contact",
  secondaryCta,
  secondaryHref,
  crumbs,
  aside,
  primaryCtaGoal,
}: {
  eyebrow?: string;
  title: ReactNode;
  description: ReactNode;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  crumbs?: Crumb[];
  aside?: ReactNode;
  /**
   * Маркетинговая цель Метрики, которую нужно отправить при клике по
   * primaryCta. EventTracker глобально слушает data-analytics-goal на якорях.
   */
  primaryCtaGoal?: string;
}) {
  const hasAside = Boolean(aside);
  // eyebrow намеренно не отображается — оставлен в API для обратной совместимости
  void eyebrow;
  const isExternal = (href?: string) =>
    Boolean(href && /^https?:\/\//i.test(href));
  const primaryExternal = isExternal(primaryHref);
  const secondaryExternal = isExternal(secondaryHref);

  return (
    <section className="hero-shell text-white">
      {crumbs && crumbs.length > 1 && (
        <JsonLd data={breadcrumbJsonLd(crumbs)} />
      )}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-28">
        {crumbs && (
          <div
            className={cn("mb-6 sm:mb-8", !hasAside && "mx-auto max-w-3xl text-center")}
          >
            <CrumbsDark items={crumbs} centered={!hasAside} />
          </div>
        )}
        <div
          className={cn(
            "grid items-center gap-10",
            hasAside && "lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12",
          )}
        >
          <div
            className={cn(
              "min-w-0",
              !hasAside && "mx-auto flex max-w-3xl flex-col items-center text-center",
            )}
          >
            <h1 className="text-balance text-[2rem] font-bold leading-[1.12] sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p
              className={cn(
                "mt-5 text-pretty text-base leading-7 text-blue-100 sm:text-lg sm:leading-8",
                hasAside ? "max-w-2xl" : "max-w-2xl",
              )}
            >
              {description}
            </p>
            <div
              className={cn(
                "mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap",
                !hasAside && "sm:justify-center",
              )}
            >
              {primaryExternal ? (
                <a
                  href={primaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-goal={primaryCtaGoal}
                  className="btn-primary w-full justify-center sm:w-auto"
                >
                  {primaryCta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </a>
              ) : (
                <Link
                  href={primaryHref}
                  data-analytics-goal={primaryCtaGoal}
                  className="btn-primary w-full justify-center sm:w-auto"
                >
                  {primaryCta}
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              )}
              {secondaryCta && secondaryHref && (
                secondaryExternal ? (
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-dark w-full justify-center sm:w-auto"
                  >
                    {secondaryCta}
                  </a>
                ) : (
                  <Link
                    href={secondaryHref}
                    className="btn-secondary-dark w-full justify-center sm:w-auto"
                  >
                    {secondaryCta}
                  </Link>
                )
              )}
            </div>
          </div>
          {aside && <div className="relative min-w-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

function CrumbsDark({
  items,
  centered = false,
}: {
  items: Crumb[];
  centered?: boolean;
}) {
  return (
    <nav aria-label="Хлебные крошки" className="text-xs text-blue-100/80">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1.5",
          centered && "justify-center",
        )}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {last ? (
                <span className="font-semibold text-white" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-white">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
