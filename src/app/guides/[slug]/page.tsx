import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleShell } from "@/components/guides/ArticleShell";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import {
  KakVnedritIiVTurizme,
  kakVnedritIiVTurizmeFaq,
  kakVnedritIiVTurizmeToc,
} from "@/components/guides/KakVnedritIiVTurizme";
import {
  SkolkoStoitVnedrenieIi,
  skolkoStoitVnedrenieIiFaq,
  skolkoStoitVnedrenieIiToc,
} from "@/components/guides/SkolkoStoitVnedrenieIi";
import {
  KakVybratPodryadchika,
  kakVybratPodryadchikaFaq,
  kakVybratPodryadchikaToc,
} from "@/components/guides/KakVybratPodryadchika";
import {
  articleJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { guides, getGuide } from "@/lib/guides-data";

type Params = { slug: string };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: guide.keywords,
    ogType: "article",
  });
}

const HOWTO_STEPS = [
  {
    name: "ИИ-аудит (1–2 недели)",
    text: "Анализ воронки заявок, каналов коммуникации, CRM и базы типовых вопросов. На выходе — карта точек потерь и приоритеты автоматизации.",
  },
  {
    name: "Прототип и сценарии (1–2 недели)",
    text: "Рабочий прототип ИИ-ассистента, диалоговые сценарии и FAQ-база. Проверяем гипотезы на реальных кейсах ещё до интеграции.",
  },
  {
    name: "Безопасная интеграция (2–4 недели)",
    text: "Подключение виджета, API, CRM, мессенджеров, уведомлений и аналитики. Идёт параллельно с действующими системами, без риска для текущих продаж.",
  },
  {
    name: "Пилот и масштабирование (3–6 недель)",
    text: "Ограниченный пилот, измерение метрик, обучение команды и докручивание сценариев. После выхода на целевые показатели — масштабирование на все каналы.",
  },
];

export default async function GuideDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const isFlagship = slug === "kak-vnedrit-ii-v-turizme";
  const isCost = slug === "skolko-stoit-vnedrenie-ii-v-turizme";
  const isVendor = slug === "kak-vybrat-podryadchika-po-ii-v-turizme";

  return (
    <PageShell>
      <JsonLd
        data={articleJsonLd({
          title: guide.title,
          description: guide.description,
          url: `/guides/${guide.slug}`,
          dateModifiedISO: guide.updatedISO,
          articleSection: "Гайды",
          authorIsFounder: true,
          keywords: guide.keywords,
        })}
      />
      {isFlagship && (
        <>
          <JsonLd
            data={howToJsonLd({
              name: "Как внедрить ИИ в туризме",
              description:
                "Пошаговый алгоритм внедрения искусственного интеллекта в туристическую компанию: аудит, прототип, интеграция и пилот.",
              totalTime: "P10W",
              steps: HOWTO_STEPS,
            })}
          />
          <JsonLd data={faqJsonLd(kakVnedritIiVTurizmeFaq)} />
        </>
      )}

      {isCost && (
        <JsonLd data={faqJsonLd([...skolkoStoitVnedrenieIiFaq])} />
      )}

      {isVendor && (
        <JsonLd data={faqJsonLd([...kakVybratPodryadchikaFaq])} />
      )}

      <PageHero
        eyebrow="Гайд"
        title={guide.title}
        description={guide.description}
        primaryCta="Получить ИИ-аудит"
        primaryHref="/contact?intent=Получить%20аудит%20ИИ-возможностей"
        secondaryCta="Смотреть Навылет! AI"
        secondaryHref="/navilet-ai"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Гайды", href: "/guides" },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />

      <ArticleMeta
        publishedDisplay={guide.updated}
        publishedISO={guide.updatedISO}
        readingTime={guide.readingTime}
        updatedLabel
      />

      {isFlagship && (
        <ArticleShell
          updated={guide.updated}
          readingTime={guide.readingTime}
          toc={[...kakVnedritIiVTurizmeToc]}
          cta={{
            href: "/contact?intent=Получить%20аудит%20ИИ-возможностей",
            label: "Получить ИИ-аудит",
          }}
        >
          <KakVnedritIiVTurizme />
        </ArticleShell>
      )}

      {isCost && (
        <ArticleShell
          updated={guide.updated}
          readingTime={guide.readingTime}
          toc={[...skolkoStoitVnedrenieIiToc]}
          cta={{
            href: "/contact?intent=Смета%20на%20внедрение%20ИИ",
            label: "Запросить смету",
          }}
        >
          <SkolkoStoitVnedrenieIi />
        </ArticleShell>
      )}

      {isVendor && (
        <ArticleShell
          updated={guide.updated}
          readingTime={guide.readingTime}
          toc={[...kakVybratPodryadchikaToc]}
          cta={{
            href: "/contact?intent=ИИ-аудит%20и%20выбор%20подрядчика",
            label: "Проверить нас на чек-листе",
          }}
        >
          <KakVybratPodryadchika />
        </ArticleShell>
      )}

      <AuthorBio />

      <CtaBand
        title="Готовы запустить пилот ИИ в своей компании?"
        text="Опишите задачу — соберём прототип ИИ-решения и план безопасного пилота."
      />
    </PageShell>
  );
}
