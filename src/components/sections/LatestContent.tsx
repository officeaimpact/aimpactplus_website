import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Newspaper } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { blogPosts } from "@/lib/blog-data";
import { guides } from "@/lib/guides-data";

/**
 * Блок «Свежие материалы» на главной: 2 последних блог-поста + 1 гайд.
 * Даёт каждой новой статье ссылку с главной (важный индекс-путь для Google и
 * Яндекс) и улучшает поведенческие метрики — больше переходов внутрь сайта.
 */
export function LatestContent() {
  const latestPost = blogPosts[0];
  const secondPost = blogPosts[1];
  const latestGuide = guides[0];

  if (!latestPost) return null;

  return (
    <SectionWrapper
      eyebrow="Материалы"
      title="Свежее в блоге и гайдах"
      description="Объясняем, как внедрять ИИ в туризм без хайпа. Каждая статья — самостоятельный материал с FAQ и разбором практики."
      alt
    >
      <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
        {[latestPost, secondPost].filter(Boolean).map((p) => (
          <Link
            key={p!.slug}
            href={`/blog/${p!.slug}`}
            className="card group flex h-full flex-col"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <Newspaper className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                {p!.category}
              </span>
            </div>
            <h3 className="text-lg font-bold leading-snug text-heading">
              {p!.title}
            </h3>
            <p className="mt-2 grow text-sm leading-6 text-body">
              {p!.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {p!.publishedDisplay}
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Читать
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
        {latestGuide && (
          <Link
            href={`/guides/${latestGuide.slug}`}
            className="card group flex h-full flex-col border-primary/30 bg-blue-ice/40"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                Гайд
              </span>
            </div>
            <h3 className="text-lg font-bold leading-snug text-heading">
              {latestGuide.title}
            </h3>
            <p className="mt-2 grow text-sm leading-6 text-body">
              {latestGuide.description}
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              Обновлено: {latestGuide.updated}
            </div>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Открыть гайд
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/blog" className="btn-secondary">
          Все статьи блога
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link href="/guides" className="btn-outline">
          Все гайды
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
