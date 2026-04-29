import {
  Sparkles,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  LayoutPanelLeft,
  Cloud,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { SegmentVisual } from "@/components/visual/SegmentVisual";
import { itemListJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { services, type ServiceIcon } from "@/lib/site-data";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  Sparkles,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  LayoutPanelLeft,
  Cloud,
};

export const metadata = pageMetadata({
  title: "Услуги — внедрение AI в туризме",
  description:
    "Услуги ИИМПАКТ ПЛЮС: разработка кастомных AI-решений и приложений, интеграции в ПО и CRM, чат-боты, голосовые ассистенты, AI-аналитика, обучение и консалтинг.",
  path: "/services",
});

export default function ServicesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd(
          services.map((s) => ({
            name: s.title,
            url: `/services#${s.slug}`,
          })),
        )}
      />
      {services.map((s) => (
        <JsonLd
          key={s.slug}
          data={serviceJsonLd({
            name: s.title,
            description: s.text,
            url: `/services#${s.slug}`,
          })}
        />
      ))}
      <PageHero
        eyebrow="Услуги"
        title="Направления работы с AI для туризма"
        description="От стратегии и аудита до разработки индивидуальных AI-приложений, интеграций, голосовых ассистентов и обучения команды. Работаем как с точечными задачами, так и с продуктовыми внедрениями."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Услуги", href: "/services" },
        ]}
        aside={<SegmentVisual segment="contact" />}
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
              <article
                key={s.slug}
                id={s.slug}
                className="card flex h-full flex-col scroll-mt-28"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black text-heading">{s.title}</h3>
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
