import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { solutions } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Решения — AI для туризма",
  description:
    "Каталог AI-решений ИИМПАКТ ПЛЮС для турагентств, туроператоров, отелей и регионов: ассистенты, виджеты, CRM-интеграции, аналитика и голос.",
  path: "/solutions",
});

export default function SolutionsIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Решения"
        title="AI-решения под сегмент туристического рынка"
        description="Выберите отрасль — и увидите конкретные сценарии, интеграции, ожидаемые результаты и пример сценария AI-ассистента для своей задачи."
        secondaryCta="Смотреть продукт"
        secondaryHref="/navilet-ai"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Решения", href: "/solutions" },
        ]}
      />

      <SectionWrapper
        eyebrow="Каталог"
        title="4 направления AI-внедрений"
        description="Каждое направление — отдельная страница с описанием задачи, состава решения и сценария старта."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {solutions.map((solution) => (
            <Link
              key={solution.slug}
              href={`/solutions/${solution.slug}`}
              className="card group flex h-full flex-col"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {solution.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-black text-heading">
                {solution.title}
              </h2>
              <p className="mt-3 leading-7 text-body">{solution.summary}</p>
              <ul className="mt-5 grow space-y-2">
                {solution.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-2 text-sm leading-6 text-body"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {outcome}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                {solution.cta}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Не нашли свой сегмент?"
        text="Расскажите задачу — мы соберём прототип AI-решения под ваш бизнес и оценим план пилота."
        cta="Обсудить задачу"
      />
    </PageShell>
  );
}
