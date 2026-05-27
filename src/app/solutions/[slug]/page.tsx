import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  SegmentVisual,
  type SegmentKey,
} from "@/components/visual/SegmentVisual";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { solutions } from "@/lib/site-data";

const SEGMENT_KEYS: ReadonlyArray<SegmentKey> = [
  "travel-agencies",
  "tour-operators",
  "aggregators",
  "hotels",
];

function asSegmentKey(slug: string): SegmentKey {
  return (SEGMENT_KEYS as readonly string[]).includes(slug)
    ? (slug as SegmentKey)
    : "tour-operators";
}

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return pageMetadata({ title: "Не найдено", description: "" });
  return pageMetadata({
    title: solution.title,
    description: solution.summary,
    path: `/solutions/${solution.slug}`,
  });
}

export default async function SolutionDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.slug !== slug).slice(0, 3);

  // Навылет! AI — продукт для турагентств и турагрегаторов на базе Tourvisor.
  // Поэтому secondary CTA «Смотреть Навылет! AI» уместен только в этих сегментах.
  const showNaviletCta =
    solution.slug === "travel-agencies" || solution.slug === "aggregators";

  return (
    <PageShell>
      <JsonLd
        data={serviceJsonLd({
          name: solution.title,
          description: solution.summary,
          url: `/solutions/${solution.slug}`,
          serviceType: "Внедрение ИИ в туризм",
        })}
      />
      <PageHero
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.hero}
        primaryCta={solution.cta}
        primaryHref={`/contact?intent=${encodeURIComponent(solution.cta)}`}
        secondaryCta={showNaviletCta ? "Смотреть Навылет! AI" : undefined}
        secondaryHref={showNaviletCta ? "/navilet-ai" : undefined}
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Решения", href: "/solutions" },
          { name: solution.title, href: `/solutions/${solution.slug}` },
        ]}
        aside={<SegmentVisual segment={asSegmentKey(solution.slug)} />}
      />

      <SectionWrapper
        eyebrow="Что болит у сегмента"
        title="Какие проблемы закрывает ИИ"
        description="Точки потерь, которые ежедневно сокращают выручку и нагружают команду. Мы измеряем их на старте и закрываем точечными ИИ-сценариями."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {solution.painPoints.map((p) => (
            <article key={p.title} className="card relative overflow-hidden">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/[0.06]" />
              <p className="relative text-3xl font-bold text-primary">
                {p.stat}
              </p>
              <h3 className="relative mt-3 text-lg font-bold text-heading">
                {p.title}
              </h3>
              <p className="relative mt-3 leading-7 text-body">{p.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Сценарии ИИ"
        title="Как именно ИИ работает в этом бизнесе"
        description="Конкретные диалоги и операции, которые забирает у людей ИИ-ассистент. Каждый сценарий измеряется отдельно и подключается без остановки текущих процессов."
        alt
      >
        <div className="grid gap-5 md:grid-cols-2">
          {solution.scenarios.map((s) => (
            <article key={s.title} className="card flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-heading">{s.title}</h3>
                <p className="mt-2 leading-7 text-body">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Состав решения"
        title="Что входит в проект"
        description="Готовый список функций, которые мы запускаем для сегмента. Можно стартовать с базы и расширять по мере результата."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {solution.features.map((feature) => (
            <div key={feature} className="card flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <p className="font-semibold leading-7 text-heading">{feature}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Эффект внедрения"
        title="Что измеряем после пилота"
        description="Метрики, которые мы фиксируем на старте и сравниваем после запуска ИИ. Реальные диапазоны на основе наших кейсов и отраслевых данных."
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solution.effects.map((e) => (
            <div
              key={e.label}
              className="card relative overflow-hidden text-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-transparent" />
              <p className="relative text-4xl font-bold text-primary">
                {e.metric}
              </p>
              <p className="relative mt-3 text-sm leading-6 text-body">
                {e.label}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Результаты"
        title="Что получает компания"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {solution.outcomes.map((o) => (
            <div key={o} className="card">
              <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
              <p className="text-lg font-bold leading-7 text-heading">{o}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Интеграции"
        title="С какими системами связываем ИИ"
        description="Стандартный стек интеграций для сегмента. Финальный список фиксируем на этапе аудита."
        alt
      >
        <div className="flex flex-wrap justify-center gap-3">
          {solution.integrations.map((i) => (
            <span
              key={i}
              className="rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-heading shadow-[var(--shadow-soft)]"
            >
              {i}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Другие сегменты"
        title="Возможно, вам ближе"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/solutions/${o.slug}`}
              className="card group flex h-full flex-col"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {o.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-bold text-heading">
                {o.title}
              </h3>
              <p className="mt-3 grow text-sm leading-6 text-body">
                {o.summary}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Открыть
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title={solution.cta}
        text="Оставьте заявку — обсудим вашу задачу, покажем демо и предложим безопасный план пилота."
      />
    </PageShell>
  );
}
