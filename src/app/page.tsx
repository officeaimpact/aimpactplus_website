import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { SolutionsMap } from "@/components/sections/SolutionsMap";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NaviletPreview } from "@/components/sections/NaviletPreview";
import { CasesPreview } from "@/components/sections/CasesPreview";
import { LatestContent } from "@/components/sections/LatestContent";
import { Trust } from "@/components/sections/Trust";
import { ExpertiseTeaser } from "@/components/sections/ExpertiseTeaser";
import { FAQSection } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { faq } from "@/lib/site-data";

export const metadata = pageMetadata({
  title:
    "Внедрение ИИ в туризм — ИИ-ассистенты для турагентств, отелей и туроператоров | ИИМПАКТ ПЛЮС",
  description:
    "Внедряем искусственный интеллект в туризм с 2023 года. Готовый ИИ-турменеджер «Навылет! AI» на базе поисковой системы Tourvisor, ИИ-аналитика, голосовые ассистенты и CRM-интеграции. К продукту подключено 10+ компаний отрасли. Пилот за 2 недели, договор и согласие по 152-ФЗ.",
  keywords: [
    "искусственный интеллект в туризме",
    "внедрить ИИ в туризме",
    "внедрение ИИ в туризме",
    "внедрение AI в туризм",
    "ИИ для турагентства",
    "ИИ для туристического бизнеса",
    "AI для туристического бизнеса",
    "ИИ-турменеджер",
    "AI-турменеджер",
    "ИИ-ассистент для турагентства",
    "AI-ассистент для турагентства",
    "ИИ-интегратор туризм",
    "AI-интегратор туризм",
  ],
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd([...faq])} />
      <Hero />
      <Audience id="audience" />
      <NaviletPreview id="product" />
      {/* Пара: «Что мы решаем» — проблема и сразу карта решений на ней */}
      <ProblemSolution id="solutions" merge="bottom" />
      <SolutionsMap merge="top" />
      <HowItWorks id="how-it-works" />
      <CasesPreview id="cases" />
      {/* Пара: «Доверие» — экспертиза в аудитории и отзывы профессионалов */}
      <ExpertiseTeaser id="trust" merge="bottom" />
      <Trust merge="top" />
      <LatestContent />
      <FAQSection id="faq" />
      <CtaBand />
    </PageShell>
  );
}
