import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { solutions } from "@/lib/site-data";

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

  return (
    <PageShell>
      <JsonLd
        data={serviceJsonLd({
          name: solution.title,
          description: solution.summary,
          url: `/solutions/${solution.slug}`,
          serviceType: "AI integration for tourism",
        })}
      />
      <PageHero
        eyebrow={solution.eyebrow}
        title={solution.title}
        description={solution.hero}
        primaryCta={solution.cta}
        primaryHref={`/contact?intent=${encodeURIComponent(solution.cta)}`}
        secondaryCta="Смотреть Навылет! AI"
        secondaryHref="/navilet-ai"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Решения", href: "/solutions" },
          { name: solution.title, href: `/solutions/${solution.slug}` },
        ]}
      />

      <SectionWrapper
        eyebrow="Что входит"
        title="Состав решения"
        description="Готовый список функций и сценариев, которые мы запускаем для вашего сегмента туристического бизнеса."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {solution.features.map((feature) => (
            <div key={feature} className="card flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
              <p className="leading-7 text-heading font-semibold">{feature}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Результат"
        title="Что получает компания"
        alt
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
              <h3 className="mt-3 text-xl font-black text-heading">
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
