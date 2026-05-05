import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Audience } from "@/components/sections/Audience";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { SolutionsMap } from "@/components/sections/SolutionsMap";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { NaviletPreview } from "@/components/sections/NaviletPreview";
import { CasesPreview } from "@/components/sections/CasesPreview";
import { Trust } from "@/components/sections/Trust";
import { ExpertiseTeaser } from "@/components/sections/ExpertiseTeaser";
import { FAQSection } from "@/components/sections/FAQ";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { faq } from "@/lib/site-data";

export const metadata = pageMetadata({
  title:
    "Внедрение ИИ в туризм — AI-ассистенты для турагентств, отелей и туроператоров | ИИМПАКТ ПЛЮС",
  description:
    "Внедряем ИИ в туризм с 2023 года. Готовый AI-турменеджер «Навылет! AI» на базе поисковой системы Tourvisor, AI-аналитика, голосовые ассистенты и CRM-интеграции. 15+ компаний отрасли. Пилот за 2 недели, договор и согласие 152-ФЗ.",
  keywords: [
    "внедрить ИИ в туризме",
    "внедрение ИИ в туризме",
    "внедрение AI в туризм",
    "ИИ для турагентства",
    "AI для туристического бизнеса",
    "AI-турменеджер",
    "AI-ассистент для турагентства",
    "AI-интегратор туризм",
  ],
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd([...faq])} />
      <Hero />
      <Audience id="audience" />
      {/* Пара: «Что мы решаем» — проблема и сразу карта решений на ней */}
      <ProblemSolution id="solutions" merge="bottom" />
      <SolutionsMap merge="top" />
      <NaviletPreview id="product" />
      <HowItWorks id="how-it-works" />
      <CasesPreview id="cases" />
      {/* Пара: «Доверие» — экспертиза в аудитории и отзывы профессионалов */}
      <ExpertiseTeaser id="trust" merge="bottom" />
      <Trust merge="top" />
      <FAQSection id="faq" />
      <CtaBand />
    </PageShell>
  );
}
