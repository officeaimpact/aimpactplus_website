import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { DemoWidget } from "@/components/DemoWidget";
import { FAQSection } from "@/components/sections/FAQ";
import { pageMetadata } from "@/lib/seo";
import { naviletFeatures, integrations, site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Навылет! AI — AI-турменеджер для сайта",
  description:
    "Готовый AI-турменеджер для сайта: подбор туров, FAQ, карточки отелей и передача заявки менеджеру. White-label, интеграция с Tourvisor, CRM и мессенджерами.",
  path: "/navilet-ai",
});

export default function NaviletAi() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: site.productName,
    description:
      "AI-турменеджер для сайта туристической компании: подбор туров, FAQ, передача клиента менеджеру.",
    brand: { "@type": "Brand", name: site.brand },
    manufacturer: { "@type": "Organization", name: site.legalName },
    category: "AI assistant for tourism",
  };

  return (
    <PageShell>
      <JsonLd data={productJsonLd} />
      <PageHero
        eyebrow="Продукт"
        title={
          <>
            Навылет! AI —{" "}
            <span className="text-gradient">готовый AI-турменеджер</span>
          </>
        }
        description="Не абстрактный AI, а понятный интерфейс продаж: каскадный диалог, подбор туров, карточки с ценами и фото, FAQ и передача заявки менеджеру."
        primaryCta="Запросить демо"
        primaryHref="/contact?intent=demo"
        secondaryCta="Все кейсы"
        secondaryHref="/cases"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Навылет! AI", href: "/navilet-ai" },
        ]}
        aside={
          <div className="rounded-[2rem] bg-deep p-3 shadow-[var(--shadow-blue)]">
            <DemoWidget />
          </div>
        }
      />

      <SectionWrapper
        eyebrow="Возможности"
        title="6 ключевых функций AI-турменеджера"
        description="Готовый продукт, который собирает воронку продаж тура от первого вопроса до передачи заявки в CRM."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {naviletFeatures.map((f) => (
            <article key={f.title} className="card group">
              <CheckCircle2 className="mb-4 h-7 w-7 text-primary" />
              <h3 className="text-lg font-black text-heading">{f.title}</h3>
              <p className="mt-3 leading-7 text-body">{f.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Интеграции"
        title="С чем работает Навылет! AI"
        description="Подключаем продукт к вашей текущей экосистеме без перестройки IT-инфраструктуры."
        alt
      >
        <div className="flex flex-wrap justify-center gap-3">
          {integrations.map((i) => (
            <span
              key={i}
              className="rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-heading shadow-[var(--shadow-soft)]"
            >
              {i}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Как это работает"
        title="От первого вопроса клиента — до заявки в CRM"
      >
        <ol className="grid gap-5 md:grid-cols-4">
          {[
            {
              t: "Клиент пишет",
              d: "Сайт, мессенджер, Avito или соцсеть — AI отвечает мгновенно.",
            },
            {
              t: "AI собирает контекст",
              d: "Даты, бюджет, состав, страна, тип отдыха — без длинных форм.",
            },
            {
              t: "Подбор и FAQ",
              d: "Карточки туров, ответы по визам, документам, питанию.",
            },
            {
              t: "Готовый клиент",
              d: "Передача менеджеру с собранным контекстом и историей диалога.",
            },
          ].map((step, i) => (
            <li key={step.t} className="card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-black text-white shadow-[var(--shadow-blue)]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-black text-heading">{step.t}</h3>
              <p className="mt-2.5 text-sm leading-7 text-body">{step.d}</p>
            </li>
          ))}
        </ol>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="White-label"
        title="Брендирование под туристическую компанию"
        description="Виджет адаптируется под ваш бренд: палитра, логотип, тон голоса, скрипты подбора, форматы карточек и сценарии передачи менеджеру."
        alt
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card">
            <h3 className="text-lg font-black text-heading">
              Что меняется под бренд
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                "Цветовая палитра и типографика",
                "Логотип и название виджета",
                "Тональность голоса AI-ассистента",
                "Сценарии подбора и FAQ",
                "Шаблоны карточек туров",
                "Маршрутизация заявки в CRM",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-6 text-body"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="card flex flex-col justify-between bg-deep text-white">
            <div>
              <h3 className="text-lg font-black">Запустим пилот за 2 недели</h3>
              <p className="mt-3 text-sm leading-7 text-blue-100">
                Базовый сценарий с подбором, FAQ и передачей менеджеру можно
                подготовить и запустить на сайте клиента за 1–2 недели после
                аудита.
              </p>
            </div>
            <Link href="/contact?intent=demo" className="btn-primary mt-6">
              Запросить пилот
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <FAQSection />
      <CtaBand title="Готовы увидеть демо Навылет! AI?" cta="Запросить демо" />
    </PageShell>
  );
}
