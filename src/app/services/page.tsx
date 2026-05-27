import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  LayoutPanelLeft,
  Cloud,
  Plug,
  ShieldCheck,
  Database,
  Mic,
  Palette,
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

const pricingFactors: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  text: string;
}> = [
  {
    icon: LayoutPanelLeft,
    title: "Каналы коммуникации",
    text: "Сайт-виджет, мессенджеры (WhatsApp, Telegram, ВКонтакте, MAX), площадки объявлений, голосовая телефония.",
  },
  {
    icon: Database,
    title: "Объём FAQ и сценариев",
    text: "Количество тем, глубина каскадных диалогов, многоязычность, обучение на корпоративной базе знаний.",
  },
  {
    icon: Plug,
    title: "Интеграции",
    text: "Tourvisor, AmoCRM, Bitrix24, RetailCRM, UON, телефония (Mango/UIS), оплата по ссылке, IATA/PMS у отелей.",
  },
  {
    icon: Palette,
    title: "Адаптация под бренд",
    text: "White-label: палитра, логотип, тон голоса, фирменные сценарии. Можно подключиться без брендинга или с полной кастомизацией.",
  },
  {
    icon: Mic,
    title: "Голосовые сценарии",
    text: "Robot-обзвон, IVR, ИИ-оператор для входящих. Тарификация зависит от минут и интеграции с телефонией.",
  },
  {
    icon: ShieldCheck,
    title: "SLA и поддержка",
    text: "Время реакции, доступность 24/7, выделенный аккаунт-менеджер, регулярное обновление сценариев и моделей.",
  },
];

type PricingTier = {
  level: "starter" | "core" | "custom";
  name: string;
  audience: string;
  description: string;
  timeline: string;
  highlights: ReadonlyArray<string>;
  cta: { label: string; intent: string };
};

const pricingTiers: ReadonlyArray<PricingTier> = [
  {
    level: "starter",
    name: "Готовый виджет",
    audience: "Подойдёт для турагентств, мини-отелей и нишевых проектов",
    description:
      "Подключение Навылет! AI на сайт по схеме «одна строка кода». Минимум настройки, базовая FAQ-база, готовые каскадные сценарии под туризм.",
    timeline: "Запуск 1–2 недели",
    highlights: [
      "Веб-виджет, одна точка интеграции",
      "Каскадный подбор и базовая FAQ",
      "Передача заявки в почту или CRM",
      "White-label-минимум: цвет и логотип",
    ],
    cta: {
      label: "Запросить расчёт",
      intent: "Расчёт стоимости: Готовый виджет",
    },
  },
  {
    level: "core",
    name: "Базовая интеграция",
    audience: "Подойдёт для туроператоров и сетей агентств",
    description:
      "ИИ-ассистент в сайте и мессенджерах с прямой передачей лидов в CRM, подключением Tourvisor и обучением на FAQ-базе клиента. Личный кабинет с аналитикой.",
    timeline: "Запуск 3–6 недель",
    highlights: [
      "Сайт + 2–4 мессенджера",
      "Tourvisor, CRM, оплата по ссылке",
      "Каскадные сценарии под бренд",
      "Аналитика диалогов, причин отказов, конверсий",
      "FAQ-редактор для команды клиента",
    ],
    cta: {
      label: "Запросить расчёт",
      intent: "Расчёт стоимости: Базовая интеграция",
    },
  },
  {
    level: "custom",
    name: "Кастомное решение",
    audience: "Для крупных туроператоров, агрегаторов, отельных сетей",
    description:
      "ИИ-продукт под задачи компании: своя модель данных, голосовой канал, нестандартные интеграции (PMS, BI, IATA), отдельные сценарии под сегменты и страны.",
    timeline: "Запуск 6–12 недель",
    highlights: [
      "Голосовые ассистенты и robot-обзвон",
      "Кастомная архитектура и BI-интеграции",
      "Многоязычность и регионы",
      "Дообучение модели на корпоративных данных",
      "SLA, выделенный менеджер, дорожная карта",
    ],
    cta: {
      label: "Обсудить проект",
      intent: "Расчёт стоимости: Кастомное решение",
    },
  },
];

export const metadata = pageMetadata({
  title: "Услуги и стоимость внедрения ИИ в туризм — ИИМПАКТ ПЛЮС",
  description:
    "Услуги ИИМПАКТ ПЛЮС: разработка кастомных ИИ-решений и приложений, интеграции в ПО и CRM, чат-боты, голосовые ИИ-ассистенты, ИИ-аналитика, обучение и консалтинг. От чего зависит стоимость и сроки запуска — в разделе «Стоимость».",
  path: "/services",
  keywords: [
    "услуги ИИ-разработки для туризма",
    "услуги AI разработки",
    "внедрение ИИ в туризм",
    "внедрение AI в туризме",
    "ИИ-аудит",
    "AI-аудит",
    "разработка чат-бота для турагентства",
    "ИИ-аналитика туризм",
    "AI-аналитика туризм",
    "интеграция ИИ в CRM",
    "интеграция AI в CRM",
    "стоимость ИИ-ассистента для туризма",
    "стоимость AI-ассистента для туризма",
    "сроки внедрения ИИ в турбизнес",
  ],
});

export default function ServicesIndex() {
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd(
          services.map((s) => ({
            name: s.title,
            url: `/services/${s.slug}`,
          })),
        )}
      />
      {services.map((s) => (
        <JsonLd
          key={s.slug}
          data={serviceJsonLd({
            name: s.title,
            description: s.text,
            url: `/services/${s.slug}`,
            audience: "Tourism business",
          })}
        />
      ))}
      <PageHero
        eyebrow="Услуги"
        title="Направления работы с ИИ для туризма"
        description="От стратегии и аудита до разработки индивидуальных ИИ-приложений, интеграций, голосовых ассистентов и обучения команды. К каждой услуге можно оставить отдельную заявку — и мы сразу поймём, что именно вам нужно."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Услуги", href: "/services" },
        ]}
        aside={<SegmentVisual segment="contact" />}
      />

      <SectionWrapper
        eyebrow="Каталог"
        title="Что мы делаем"
        description="Каждая услуга — это поддающийся измерению результат с прозрачным составом работ и сроком запуска. Откройте интересующую услугу или сразу оставьте заявку."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Sparkles;
            const intent = `Заявка на услугу: ${s.title}`;
            const contactHref = `/contact?intent=${encodeURIComponent(intent)}`;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="card group relative flex h-full flex-col overflow-hidden scroll-mt-28"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/[0.06] transition-all duration-500 group-hover:scale-[1.6] group-hover:bg-accent/[0.12]" />
                <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition group-hover:scale-105 group-hover:-rotate-3">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="relative text-lg font-bold text-heading">
                  {s.title}
                </h3>
                <p className="relative mt-3 grow leading-7 text-body">
                  {s.text}
                </p>
                <ul className="relative mt-5 space-y-2 border-t border-blue-100 pt-4">
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
                <p className="relative mt-4 flex items-center gap-1.5 text-xs text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {s.timeline}
                </p>
                <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
                  <Link
                    href={`/services/${s.slug}`}
                    className="btn-outline flex-1 justify-center"
                  >
                    Подробнее
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={contactHref}
                    className="btn-primary flex-1 justify-center"
                  >
                    Заявка
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="pricing"
        eyebrow="Стоимость"
        title="От чего зависит стоимость и сроки"
        description="Точную смету собираем после короткой встречи: от каналов, объёма FAQ и интеграций цена и сроки могут различаться в разы. Ниже — факторы, которые мы обсуждаем на старте, и три типовых уровня запуска."
        alt
        merge="bottom"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pricingFactors.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="card flex h-full flex-col gap-3 border-blue-100"
              >
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-50 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-heading">{title}</h3>
                <p className="text-sm leading-6 text-body">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Три уровня запуска"
        description="Цены не публикуем — они зависят от перечисленных выше факторов. Ниже типовой состав, ориентир по срокам и кому уровень подходит."
        alt
        merge="top"
      >
        <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier) => {
            const isFeatured = tier.level === "core";
            const intent = encodeURIComponent(tier.cta.intent);
            const href = `/contact?intent=${intent}`;
            return (
              <article
                key={tier.level}
                className={`card relative flex h-full flex-col ${
                  isFeatured
                    ? "border-primary/40 bg-white shadow-[var(--shadow-blue)]"
                    : "border-blue-100"
                }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-[var(--shadow-blue)]">
                    Часто выбирают
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  {tier.audience}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-heading">
                  {tier.name}
                </h3>
                <p className="mt-3 grow leading-7 text-body">
                  {tier.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-muted">
                  <Clock className="h-3.5 w-3.5" />
                  {tier.timeline}
                </p>
                <ul className="mt-4 space-y-2 border-t border-blue-100 pt-4">
                  {tier.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex gap-2 text-sm leading-6 text-body"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <Link
                  href={href}
                  className={`mt-6 ${
                    isFeatured ? "btn-primary" : "btn-outline"
                  } justify-center`}
                >
                  {tier.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs italic text-muted">
          Сроки — оценка по типовому проекту. Точные значения зависят от
          подключаемых интеграций, объёма FAQ-базы и доступности данных у
          клиента. Рублёвую смету фиксируем после короткой встречи и аудита.
        </p>
      </SectionWrapper>

      <CtaBand
        title="Не уверены, какая услуга вам нужна?"
        text="Начнём с короткого ИИ-аудита. Покажем, что даст быстрый эффект, и где ROI самый высокий."
        cta="Запросить аудит"
      />
    </PageShell>
  );
}
