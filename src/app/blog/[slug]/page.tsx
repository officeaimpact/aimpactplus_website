import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleShell } from "@/components/guides/ArticleShell";
import { AuthorBio } from "@/components/blog/AuthorBio";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import {
  ChtoTakoeAiTurmenedzher,
  chtoTakoeAiTurmenedzherToc,
} from "@/components/blog/ChtoTakoeAiTurmenedzher";
import {
  IiAssistentVsChatBot,
  iiAssistentVsChatBotFaq,
  iiAssistentVsChatBotToc,
} from "@/components/blog/IiAssistentVsChatBot";
import { articleJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { blogPosts, getBlogPost } from "@/lib/blog-data";

type Params = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
    ogType: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const isStarter = slug === "chto-takoe-ai-turmenedzher";
  const isVsChatBot = slug === "ii-assistent-vs-chat-bot";

  return (
    <PageShell>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          url: `/blog/${post.slug}`,
          dateModifiedISO: post.publishedISO,
          datePublishedISO: post.publishedISO,
          articleSection: post.category,
          authorIsFounder: true,
          keywords: post.keywords,
        })}
      />
      {isVsChatBot && (
        <JsonLd data={faqJsonLd([...iiAssistentVsChatBotFaq])} />
      )}

      <PageHero
        eyebrow="Блог"
        title={post.title}
        description={post.description}
        primaryCta="Получить ИИ-аудит"
        primaryHref="/contact?intent=Получить%20аудит%20ИИ-возможностей"
        secondaryCta="Смотреть Навылет! AI"
        secondaryHref="/navilet-ai"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Блог", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <ArticleMeta
        publishedDisplay={post.publishedDisplay}
        publishedISO={post.publishedISO}
        readingTime={post.readingTime}
      />

      {isStarter && (
        <ArticleShell
          updated={post.publishedDisplay}
          readingTime={post.readingTime}
          toc={[...chtoTakoeAiTurmenedzherToc]}
          cta={{
            href: "/contact?intent=Запросить%20демо%20Навылет%21%20AI",
            label: "Запросить демо Навылет! AI",
          }}
        >
          <ChtoTakoeAiTurmenedzher />
        </ArticleShell>
      )}

      {isVsChatBot && (
        <ArticleShell
          updated={post.publishedDisplay}
          readingTime={post.readingTime}
          toc={[...iiAssistentVsChatBotToc]}
          cta={{
            href: "/contact?intent=Получить%20ИИ-аудит",
            label: "Получить ИИ-аудит",
          }}
        >
          <IiAssistentVsChatBot />
        </ArticleShell>
      )}

      <AuthorBio />

      <CtaBand
        title="Хотите увидеть ИИ-турменеджер «вживую»?"
        text="За 10 минут покажем демо, обсудим сценарии под ваш бренд и оценим срок пилота."
        cta="Запросить демо"
      />
    </PageShell>
  );
}
