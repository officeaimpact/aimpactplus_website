import type { ReactNode } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type TocItem = { id: string; label: string };

export function ArticleShell({
  updated,
  readingTime,
  toc,
  children,
  cta,
}: {
  updated: string;
  readingTime: string;
  toc: TocItem[];
  children: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <section className="section">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
        <article className="prose-article max-w-none">
          <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Обновлено: {updated}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {readingTime}
            </span>
          </div>
          {children}
          {cta && (
            <div className="mt-12 rounded-3xl border border-blue-100 bg-blue-50/60 p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Готовы обсудить внедрение?
              </p>
              <h3 className="mt-3 text-2xl font-bold text-heading">
                Соберём пилот AI-решения под вашу компанию
              </h3>
              <p className="mt-3 leading-7 text-body">
                Короткий аудит процессов, прототип сценария, прозрачный план и
                запуск без риска для текущих продаж.
              </p>
              <Link href={cta.href} className="btn-primary mt-5">
                {cta.label}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-2xl border border-blue-100 bg-white p-6 shadow-[var(--shadow-card)]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Содержание
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      "block leading-6 text-body transition hover:text-primary",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
