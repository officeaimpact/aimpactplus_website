import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Handshake,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import DemoWidget from "@/components/DemoWidget";
import { NaviletLiveDemo } from "@/components/sections/NaviletLiveDemo";
import { NaviletDashboardSection } from "@/components/sections/NaviletDashboardSection";
import { FAQSection } from "@/components/sections/FAQ";
import {
  faqJsonLd,
  pageMetadata,
  productJsonLd,
} from "@/lib/seo";
import {
  faq,
  integrations,
  naviletFeatures,
  naviletPartnerBenefits,
  naviletPartnerProfiles,
  site,
} from "@/lib/site-data";
import { demoScenarios } from "@/lib/scenarios";

export const metadata = pageMetadata({
  title: "Навылет! AI — AI-турменеджер для сайта",
  description:
    "Готовый AI-турменеджер «Навылет! AI» для сайта туристической компании: подбор туров на базе поисковой системы Tourvisor, FAQ, карточки отелей и передача заявки менеджеру. White-label, интеграция с AmoCRM, Bitrix24, UON CRM. Подключено 15+ компаний туриндустрии.",
  path: "/navilet-ai",
  keywords: [
    "Навылет AI",
    "Navilet AI",
    "AI-турменеджер",
    "AI-ассистент для турагентства",
    "AI-чат-бот для сайта турагентства",
    "виджет AI на сайт турагентства",
    "white-label AI ассистент",
    "AI бот туры Tourvisor",
    "Навылет ИИ",
    "AI ассистент Tourvisor",
  ],
});

const partnerIntent = "Партнёрство по Навылет! AI";
const partnerHref = `/contact?intent=${encodeURIComponent(partnerIntent)}#lead-form`;

export default function NaviletAi() {
  return (
    <PageShell>
      <JsonLd
        data={productJsonLd({
          name: site.productName,
          description:
            "Готовый AI-турменеджер для сайта туристической компании: каскадный диалог, подбор туров на базе поисковой системы Tourvisor, FAQ и передача заявки менеджеру. White-label, интеграция с популярными CRM. Подключено 15+ компаний туриндустрии.",
          url: "/navilet-ai",
          brand: site.brand,
        })}
      />
      <JsonLd data={faqJsonLd([...faq])} />
      <PageHero
        eyebrow="Продукт"
        title={
          <>
            Навылет! AI —{" "}
            <span className="text-gradient">готовый AI-турменеджер</span>
          </>
        }
        description="Не абстрактный AI, а понятный инструмент продаж: каскадный диалог, подбор туров на базе поисковой системы Tourvisor, карточки с ценами и фото, FAQ и передача заявки менеджеру. Подключено 15+ компаний туристической отрасли — от туроператоров до сетей агентств и средств размещения."
        primaryCta="Запросить демо"
        primaryHref="/contact?intent=demo"
        secondaryCta="Перейти на navilet.ru"
        secondaryHref={site.naviletWebsite}
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Навылет! AI", href: "/navilet-ai" },
        ]}
        aside={
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/15 to-sky/15 blur-2xl" />
            <DemoWidget scenario={demoScenarios[0]} className="relative" />
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
              <h3 className="text-lg font-bold text-heading">{f.title}</h3>
              <p className="mt-3 leading-7 text-body">{f.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 text-center">
          <p className="max-w-2xl text-sm leading-6 text-muted">
            Хотите увидеть продукт «вживую» и попробовать сценарии?
            Откройте отдельный продуктовый сайт.
          </p>
          <a
            href={site.naviletWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Открыть {site.naviletWebsiteDisplay}
            <ExternalLink className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </SectionWrapper>

      <NaviletLiveDemo />

      <NaviletDashboardSection />

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
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Клиент пишет",
              d: "Сайт, мессенджер, голосовой канал или соцсеть — AI отвечает мгновенно.",
            },
            {
              t: "AI собирает контекст",
              d: "Даты, бюджет, состав, страна, тип отдыха — без длинных форм.",
            },
            {
              t: "Подбор и FAQ",
              d: "Карточки туров из поисковой системы Tourvisor, ответы по визам, документам, питанию.",
            },
            {
              t: "Готовый клиент",
              d: "Передача менеджеру с собранным контекстом и историей диалога.",
            },
          ].map((step, i) => (
            <li key={step.t} className="card">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-bold text-white shadow-[var(--shadow-blue)]">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-bold text-heading">{step.t}</h3>
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
            <h3 className="text-lg font-bold text-heading">
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
              <h3 className="text-lg font-bold">Запустим пилот за 2 недели</h3>
              <p className="mt-3 text-sm leading-7 text-blue-100">
                Базовый сценарий с подбором, FAQ и передачей менеджеру можно
                подготовить и запустить на сайте клиента за 1–2 недели после
                аудита.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href="/contact?intent=demo" className="btn-primary flex-1 justify-center">
                Запросить пилот
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={site.naviletWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-dark flex-1 justify-center"
              >
                {site.naviletWebsiteDisplay}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* === ПАРТНЁРСТВО === */}
      <SectionWrapper
        eyebrow="Партнёрская программа"
        title="Стать партнёром Навылет! AI"
        description="Подключайте «Навылет! AI» в свою экосистему: туроператоры, турагрегаторы, сети турагентств и технологические партнёры. Гибкие коммерческие модели и готовая инфраструктура продукта."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {naviletPartnerProfiles.map((p) => (
            <article key={p.title} className="card flex h-full flex-col">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <Handshake className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-heading">{p.title}</h3>
              <p className="mt-3 grow text-sm leading-6 text-body">{p.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="card">
            <h3 className="text-lg font-bold text-heading">
              Что получают партнёры
            </h3>
            <ul className="mt-5 space-y-3">
              {naviletPartnerBenefits.map((b) => (
                <li
                  key={b}
                  className="flex gap-2 text-sm leading-6 text-body"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <PartnerLeadCard partnerHref={partnerHref} />
        </div>
      </SectionWrapper>

      <FAQSection />
      <CtaBand
        title="Готовы увидеть демо Навылет! AI?"
        cta="Запросить демо"
      />
    </PageShell>
  );
}

function PartnerLeadCard({ partnerHref }: { partnerHref: string }) {
  return (
    <article
      id="navilet-partners"
      className="card flex flex-col justify-between bg-deep text-white"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
          Заявка на партнёрство
        </p>
        <h3 className="mt-3 text-2xl font-bold leading-[1.15]">
          Подключим «Навылет! AI» под ваш бренд
        </h3>
        <p className="mt-3 text-sm leading-7 text-blue-100">
          Это короткая форма для туроператоров, турагрегаторов, сетей
          турагентств и технологических партнёров. Расскажите о бизнесе — мы
          выйдем на связь и предметно обсудим условия партнёрства, интеграции
          и совместный go-to-market.
        </p>
        <ul className="mt-5 space-y-2 text-sm leading-6 text-blue-100">
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
            Заполняется за минуту — имя, контакт, цель и направление
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
            Согласие по 152-ФЗ, данные не передаём третьим лицам
          </li>
          <li className="flex gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
            Отвечаем в течение рабочего дня
          </li>
        </ul>
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Link href={partnerHref} className="btn-primary flex-1 justify-center">
          Стать партнёром
          <ArrowRight className="h-5 w-5" />
        </Link>
        <a
          href="https://navilet.ru"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary-dark flex-1 justify-center"
        >
          Перейти на navilet.ru
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
