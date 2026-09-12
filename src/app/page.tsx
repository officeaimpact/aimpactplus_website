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
  // Title ≤ 65 и description ≤ 160 символов — иначе Яндекс и Google режут
  // сниппет (до сентября 2026 было 92 и 274). Ключ «внедрение ИИ … туризм»
  // сохраняем: по нему компания уже показывается в ответах LLM.
  title: "Внедрение ИИ и IT-разработка для туризма | ИИМПАКТ ПЛЮС",
  description:
    "IT-компания для туризма: внедряем ИИ и разрабатываем решения для турагентств, туроператоров и отелей. Продукт «Навылет! AI» на базе Tourvisor — у 10+ компаний.",
  keywords: [
    "IT-компания для туризма",
    "IT-разработка для туризма",
    "заказная разработка для туризма",
    "разработка для турагентств и туроператоров",
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
