import {
  Sparkles,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  Eye,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { services, type ServiceIcon } from "@/lib/site-data";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  Sparkles,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  Eye,
  Cloud,
};

export const metadata = pageMetadata({
  title: "Услуги — внедрение AI в туризме",
  description:
    "Услуги ИИМПАКТ ПЛЮС: разработка кастомных AI-решений, интеграция в CRM, чат-боты, голосовые ассистенты, AI-аналитика, обучение и консалтинг.",
  path: "/services",
});

export default function ServicesIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Услуги"
        title="8 направлений работы с AI для туризма"
        description="От стратегии и аудита до разработки кастомных решений, интеграций и обучения команды. Подходим как к продуктовым, так и к точечным задачам."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Услуги", href: "/services" },
        ]}
      />

      <SectionWrapper
        eyebrow="Каталог"
        title="Что мы делаем"
        description="Каждая услуга — это поддающийся измерению результат. Вы платите за прозрачно описанный объём работ."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Sparkles;
            return (
              <article key={s.slug} className="card flex h-full flex-col">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-ice text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-heading">{s.title}</h3>
                <p className="mt-3 grow leading-7 text-body">{s.text}</p>
                <ul className="mt-5 space-y-2 border-t border-blue-100 pt-4">
                  {s.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex gap-2 text-sm leading-6 text-body"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {o}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Не уверены, какая услуга вам нужна?"
        text="Начнём с короткого аудита AI-возможностей. Покажем, что даст быстрый эффект, и где ROI самый высокий."
        cta="Запросить аудит"
      />
    </PageShell>
  );
}
