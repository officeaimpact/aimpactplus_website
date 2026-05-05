import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { guides } from "@/lib/guides-data";

export const metadata = pageMetadata({
  title: "Гайды по внедрению ИИ в туризме",
  description:
    "Практические гайды по внедрению искусственного интеллекта в туристический бизнес: с чего начать, этапы, сроки, стоимость, выбор между готовым продуктом и кастомной разработкой, риски и FAQ.",
  path: "/guides",
  keywords: [
    "гайды AI в туризме",
    "внедрение ИИ в туризме",
    "как внедрить AI в туризм",
    "AI для турагентства",
    "практика внедрения ИИ",
  ],
});

export default function GuidesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd(
          guides.map((g) => ({ name: g.title, url: `/guides/${g.slug}` })),
        )}
      />
      <PageHero
        eyebrow="Гайды"
        title="Практика внедрения ИИ в туризм"
        description="Длинные структурированные материалы о том, как туристические компании безопасно внедряют ИИ: от аудита и пилота до зрелого продукта."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Гайды", href: "/guides" },
        ]}
      />

      <SectionWrapper
        eyebrow="Каталог"
        title="Что почитать"
        description="Каждый гайд — самостоятельный материал с FAQ, разметкой для поисковых систем и понятным выводом."
      >
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="card group flex h-full flex-col"
            >
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-bold text-heading">{g.title}</h2>
              <p className="mt-3 grow leading-7 text-body">{g.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Обновлено: {g.updated}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {g.readingTime}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Открыть гайд
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Хотите такой же план под свою компанию?"
        text="Соберём пилот AI-решения, обсудим сценарии и план запуска без риска для текущих продаж."
      />
    </PageShell>
  );
}
