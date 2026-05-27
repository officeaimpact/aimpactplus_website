import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { Tag } from "@/components/ui/Tag";
import { JsonLd } from "@/components/ui/JsonLd";
import { BrandMonogram } from "@/components/ui/BrandMonogram";
import { SegmentVisual } from "@/components/visual/SegmentVisual";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { cases } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Кейсы внедрения ИИ в туризме — реальные проекты ИИМПАКТ ПЛЮС",
  description:
    "Кейсы ИИМПАКТ ПЛЮС: корпоративный ИИ-ассистент для туроператора речных круизов «ИНФОФЛОТ» (проектирование), ИИ-помощник для федеральной сети «Магазин Горящих Путёвок» с интеграцией Tourvisor и мульти-канальный ИИ-ассистент для отеля Delas. Реальные задачи, решения и интеграции в туристической отрасли.",
  path: "/cases",
});

export default function CasesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd(
          cases.map((c) => ({ name: c.title, url: `/cases/${c.slug}` })),
        )}
      />
      <PageHero
        eyebrow="Кейсы"
        title="Кейсы внедрения ИИ в туризме"
        description="Реальные внедрения и проекты в стадии проектирования: задача клиента, решение и измеримые результаты или дорожная карта. Каждый кейс — отдельная страница."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Кейсы", href: "/cases" },
        ]}
        aside={<SegmentVisual segment="cases" />}
      />

      <SectionWrapper
        eyebrow="Список"
        title="Подобрали по сегментам"
        description="Туроператор речных круизов, сеть турагентств и средство размещения — три формата работы с ИИ: от архитектуры корпоративного ассистента до production-внедрения с метриками."
      >
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="card group flex h-full flex-col"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={c.title}
                    width={c.logoWide ? 200 : 56}
                    height={56}
                    className={
                      c.logoWide
                        ? "h-14 w-auto max-w-[200px] object-contain"
                        : "h-14 w-14 rounded-2xl object-contain"
                    }
                  />
                ) : (
                  <BrandMonogram name={c.title} size="lg" variant="soft" />
                )}
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Tag>{c.segment}</Tag>
                {c.status === "design" && (
                  <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-amber-700">
                    Проектирование
                  </span>
                )}
              </div>
              <h2 className="mt-3 text-2xl font-bold text-heading">
                {c.title}
              </h2>
              <p className="mt-3 leading-7 text-body">{c.summary}</p>
              <ul className="mt-5 grow space-y-2">
                {c.results.slice(0, 3).map((r) => (
                  <li key={r} className="flex gap-2 text-sm leading-6 text-body">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted">
                Интеграции: {c.integrations.join(" · ")}
              </p>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Хотите такой же эффект для своего бизнеса?"
        text="Расскажите задачу — соберём прототип и оценим срок безопасного пилота."
      />
    </PageShell>
  );
}
