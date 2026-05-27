import Link from "next/link";
import { ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { itemListJsonLd, pageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blog-data";

export const metadata = pageMetadata({
  title: "Блог о внедрении ИИ в туризм",
  description:
    "Статьи и разборы про внедрение искусственного интеллекта в туристический бизнес: ИИ-турменеджер, ИИ-ассистенты, аналитика, кейсы и архитектура решений.",
  path: "/blog",
  keywords: [
    "блог ИИ в туризме",
    "блог AI в туризме",
    "искусственный интеллект в туризме",
    "ИИ-турменеджер",
    "AI-турменеджер",
    "ИИ для турагентства",
    "AI для турагентства",
    "статьи о внедрении ИИ в туризме",
  ],
});

export default function BlogIndex() {
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd(
          blogPosts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
        )}
      />
      <PageHero
        eyebrow="Блог"
        title="О внедрении ИИ в туристический бизнес"
        description="Разбираем технологию без хайпа: что такое ИИ-турменеджер, чем он отличается от чат-бота, какие задачи закрывает в турагентствах, отелях и у туроператоров."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Блог", href: "/blog" },
        ]}
      />

      <SectionWrapper
        eyebrow="Статьи"
        title="Что почитать"
        description="Прикладные материалы для собственников и руководителей туристических компаний."
      >
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {blogPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="card group flex h-full flex-col"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                  <Newspaper className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-primary">
                  {p.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-heading">{p.title}</h2>
              <p className="mt-3 grow leading-7 text-body">{p.description}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {p.publishedDisplay}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {p.readingTime}
                </span>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Читать
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Хотите обсудить внедрение?"
        text="Расскажите задачу — соберём прототип ИИ-решения и план пилота."
      />
    </PageShell>
  );
}
