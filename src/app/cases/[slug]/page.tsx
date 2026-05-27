import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { Tag } from "@/components/ui/Tag";
import { BrandMonogram } from "@/components/ui/BrandMonogram";
import {
  SegmentVisual,
  type SegmentKey,
} from "@/components/visual/SegmentVisual";
import { caseStudyJsonLd, pageMetadata } from "@/lib/seo";
import { cases } from "@/lib/site-data";

const SEGMENT_BY_LABEL: Record<string, SegmentKey> = {
  Туроператор: "tour-operators",
  "Сеть турагентств": "travel-agencies",
  "Средство размещения": "hotels",
  Турагрегатор: "aggregators",
};

function caseSegmentKey(segment: string): SegmentKey {
  return SEGMENT_BY_LABEL[segment] ?? "cases";
}

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c)
    return pageMetadata({ title: "Кейс не найден", description: "" });
  return pageMetadata({
    title: `Кейс: ${c.title}`,
    description: c.summary,
    path: `/cases/${c.slug}`,
    ogType: "article",
    keywords: [
      `${c.client} ИИ`,
      `${c.client} AI`,
      `${c.segment} ИИ`,
      `${c.segment} AI`,
      `кейс ИИ ${c.segment}`,
      `кейс AI ${c.segment}`,
      `внедрение ИИ ${c.segment}`,
      `внедрение AI ${c.segment}`,
    ],
  });
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  if (!c) notFound();

  const others = cases.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <PageShell>
      <JsonLd
        data={caseStudyJsonLd({
          title: c.title,
          summary: c.summary,
          url: `/cases/${c.slug}`,
          client: c.client,
          segment: c.segment,
          image: c.logo,
          datePublishedISO: c.datePublishedISO,
          dateModifiedISO: c.dateModifiedISO,
        })}
      />
      <PageHero
        eyebrow={c.segment}
        title={c.title}
        description={c.summary}
        primaryCta="Хочу похожий результат"
        primaryHref={`/contact?intent=${encodeURIComponent("Похожий кейс: " + c.title)}`}
        secondaryCta="Все кейсы"
        secondaryHref="/cases"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Кейсы", href: "/cases" },
          { name: c.title, href: `/cases/${c.slug}` },
        ]}
        aside={<SegmentVisual segment={caseSegmentKey(c.segment)} />}
      />

      {c.metrics && c.metrics.length > 0 && (
        <SectionWrapper merge="bottom">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Эффект по проекту
              </p>
              <p className="text-xs italic text-muted">
                Метрики — оценка по проекту. Точные значения зависят от
                сезонности, трафика и базовой автоматизации до пилота.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {c.metrics.map((m) => (
                <div
                  key={m.label}
                  className="card flex flex-col gap-2 border-blue-100"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
                    {m.label}
                  </p>
                  <p className="text-3xl font-bold text-gradient sm:text-4xl">
                    {m.value}
                  </p>
                  {m.note && (
                    <p className="text-xs leading-5 text-body">{m.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SectionWrapper>
      )}

      <SectionWrapper merge={c.metrics && c.metrics.length > 0 ? "top" : undefined}>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="prose-card">
            <h2>Клиент</h2>
            <p>{c.client}</p>

            {c.description && (
              <>
                <h2>Подробнее о компании</h2>
                <p>{c.description}</p>
              </>
            )}

            <h2>Задача</h2>
            <p>{c.challenge}</p>

            <h2>Решение</h2>
            <p>{c.solution}</p>

            <h2>Результаты</h2>
            <ul className="mt-3 list-disc pl-5">
              {c.results.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>

            <h2>Интеграции</h2>
            <ul className="mt-3 list-disc pl-5">
              {c.integrations.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>

            {c.quote && (
              <>
                <h2>Цитата</h2>
                <blockquote className="not-prose mt-3 rounded-2xl border border-blue-100 bg-surface-alt p-5 text-heading">
                  <Quote className="mb-3 h-6 w-6 text-primary/40" />
                  <p className="text-lg leading-7">«{c.quote.text}»</p>
                  <footer className="mt-3 text-sm font-bold text-muted">
                    {c.quote.author}
                  </footer>
                </blockquote>
              </>
            )}
          </div>

          <aside className="space-y-5">
            <div className="card flex items-center gap-4">
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={`Логотип ${c.title}`}
                  width={c.logoWide ? 220 : 64}
                  height={64}
                  className={
                    c.logoWide
                      ? "h-16 w-auto max-w-[220px] object-contain"
                      : "h-16 w-16 rounded-2xl object-contain"
                  }
                />
              ) : (
                <BrandMonogram name={c.title} size="lg" variant="soft" />
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Сегмент
                </p>
                <p className="mt-1 text-lg font-bold text-heading">
                  {c.segment}
                </p>
                {c.status === "design" && (
                  <p className="mt-2 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-700">
                    Проектирование
                  </p>
                )}
              </div>
            </div>
            {c.status === "design" && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 text-sm leading-6 text-amber-900">
                <p className="font-bold">Статус проекта: проектирование</p>
                <p className="mt-1 text-amber-800">
                  Этот кейс описывает архитектуру ИИ-решения, дорожную карту и
                  техническое задание. Production-метрики появятся после
                  запуска пилотного контура.
                </p>
              </div>
            )}
            <div className="card">
              <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                Что получили
              </h3>
              <ul className="mt-3 space-y-2">
                {c.results.map((r) => (
                  <li
                    key={r}
                    className="flex gap-2 text-sm leading-6 text-body"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </SectionWrapper>

      <SectionWrapper eyebrow="Другие кейсы" title="Похожие истории" alt>
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/cases/${o.slug}`}
              className="card group flex h-full flex-col"
            >
              <div className="mb-3 flex items-center justify-between">
                <Tag>{o.segment}</Tag>
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
              <h3 className="text-xl font-bold text-heading">{o.title}</h3>
              <p className="mt-3 grow text-sm leading-6 text-body">
                {o.summary}
              </p>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand title="Хотите похожий результат?" />
    </PageShell>
  );
}
