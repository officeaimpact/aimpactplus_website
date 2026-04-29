import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { Tag } from "@/components/ui/Tag";
import { pageMetadata } from "@/lib/seo";
import { cases } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Кейсы AI-внедрений в туризме",
  description:
    "Кейсы ИИМПАКТ ПЛЮС: туроператор «КарелияГид», «Сеть Магазинов Горящих Путёвок», хостел Delas и продукт Навылет! AI.",
  path: "/cases",
});

export default function CasesIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Кейсы"
        title="Реальные внедрения AI в туризме"
        description="Компактные истории: задача клиента, решение и измеримые результаты. Каждый кейс — отдельная страница."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Кейсы", href: "/cases" },
        ]}
      />

      <SectionWrapper
        eyebrow="Список"
        title="Подобрали по сегментам"
        description="Туроператор, сеть турагентств, средство размещения и продуктовое внедрение Навылет! AI."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {cases.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="card group flex h-full flex-col"
            >
              <div className="mb-4 flex items-center justify-between gap-4">
                <Tag>{c.segment}</Tag>
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
              <h2 className="text-2xl font-black text-heading">{c.title}</h2>
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
