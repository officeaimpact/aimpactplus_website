import { PageShell } from "@/components/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
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
  title: "AI-решения для туристического бизнеса от ИИМПАКТ ПЛЮС",
  description:
    "Многостраничный B2B-портал AI-решений для туризма: Навылет! AI, кейсы, CRM-интеграции, AI-ассистенты, аналитика и заявки.",
});

export default function Home() {
  return (
    <PageShell>
      <JsonLd data={faqJsonLd([...faq])} />
      <Hero />
      <Metrics />
      <Audience />
      <ProblemSolution />
      <SolutionsMap />
      <NaviletPreview />
      <HowItWorks />
      <CasesPreview />
      <Trust />
      <ExpertiseTeaser />
      <FAQSection />
      <CtaBand />
    </PageShell>
  );
}
