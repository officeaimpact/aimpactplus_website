import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "./Badge";
import type { Crumb } from "./Breadcrumbs";
import { cn } from "@/lib/cn";

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
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  crumbs?: Crumb[];
  aside?: ReactNode;
}) {
  const hasAside = Boolean(aside);
  return (
    <section className="hero-shell text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        {crumbs && (
          <div
            className={cn("mb-8", !hasAside && "mx-auto max-w-3xl text-center")}
          >
            <CrumbsDark items={crumbs} centered={!hasAside} />
          </div>
        )}
        <div
          className={cn(
            "grid items-center gap-12",
            hasAside && "lg:grid-cols-[1.1fr_0.9fr]",
          )}
        >
          <div
            className={cn(
              !hasAside && "mx-auto flex max-w-3xl flex-col items-center text-center",
            )}
          >
            <Badge variant="dark">{eyebrow}</Badge>
            <h1 className="mt-7 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p
              className={cn(
                "mt-5 text-pretty text-lg leading-8 text-blue-100",
                hasAside ? "max-w-2xl" : "max-w-2xl",
              )}
            >
              {description}
            </p>
            <div
              className={cn(
                "mt-8 flex flex-col gap-3 sm:flex-row",
                !hasAside && "justify-center",
              )}
            >
              <Link href={primaryHref} className="btn-primary">
                {primaryCta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              {secondaryCta && secondaryHref && (
                <Link href={secondaryHref} className="btn-secondary-dark">
                  {secondaryCta}
                </Link>
              )}
            </div>
          </div>
          {aside && <div className="relative">{aside}</div>}
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
