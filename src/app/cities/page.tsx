import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { cities } from "@/lib/cities-data";

export const metadata = pageMetadata({
  title: "Внедрение ИИ в туризм по городам России",
  description:
    "Локальные посадочные ИИМПАКТ ПЛЮС: внедрение ИИ-ассистентов и интеграций для туркомпаний Москвы, Санкт-Петербурга и Сочи. Очные встречи в Москве, удалённая работа по всей России.",
  path: "/cities",
  keywords: [
    "ИИ для туризма по городам",
    "внедрение ИИ туризм Россия",
    "AI разработка туризм по городам",
    "интегратор ИИ туризм Россия",
  ],
});

export default function CitiesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd(
          cities.map((c) => ({
            name: c.title,
            url: `/cities/${c.slug}`,
          })),
        )}
      />
      <PageHero
        eyebrow="География"
        title="Внедрение ИИ в туризм по городам России"
        description="Работаем со всей Россией удалённо, очные встречи проводим в Москве. Ниже — посадочные под ключевые регионы с локальной спецификой и FAQ."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Города", href: "/cities" },
        ]}
      />

      <SectionWrapper
        eyebrow="Города"
        title="Где мы работаем"
        description="Локальные посадочные — это не отдельные офисы, а отраслевая фокусировка под местный рынок туризма и его специфику."
      >
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {cities.map((c) => (
            <Link
              key={c.slug}
              href={`/cities/${c.slug}`}
              className="card group flex h-full flex-col"
            >
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-bold text-heading">{c.name}</h2>
              <p className="mt-3 grow text-sm leading-6 text-body">
                {c.marketContext}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Открыть страницу города
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Не нашли свой город?"
        text="Работаем удалённо по всей России и СНГ. Опишите задачу — соберём план пилота под ваш регион."
      />
    </PageShell>
  );
}
