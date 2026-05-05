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
  title: "Кейсы AI-внедрений в туризме",
  description:
    "Кейсы ИИМПАКТ ПЛЮС: «Сеть Магазинов Горящих Путёвок», мини-гостиница Delas и собственный продукт «Навылет! AI» (на базе поисковой системы Tourvisor) с подключением 15+ компаний отрасли.",
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
        title="Реальные внедрения AI в туризме"
        description="Компактные истории: задача клиента, решение и измеримые результаты. Каждый кейс — отдельная страница."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Кейсы", href: "/cases" },
        ]}
        aside={<SegmentVisual segment="cases" />}
      />

      <SectionWrapper
        eyebrow="Список"
        title="Подобрали по сегментам"
        description="Туроператор, сеть турагентств, средство размещения и продуктовое внедрение Навылет! AI."
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
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-2xl object-contain"
                  />
                ) : (
                  <BrandMonogram name={c.title} size="lg" variant="soft" />
                )}
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
              <Tag className="self-start">{c.segment}</Tag>
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
