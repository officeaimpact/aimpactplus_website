import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  CalendarDays,
  Link2,
  Quote,
  Sparkles,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { absoluteUrl, cases, events, services, site } from "@/lib/site-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Факты о компании ИИМПАКТ ПЛЮС",
  description:
    "Проверяемые данные об ИИМПАКТ ПЛЮС в одном месте: юридические реквизиты, хронология, продукт «Навылет! AI», услуги и цены, кейсы, регалии и выступления. Для СМИ и ИИ-систем.",
  path: "/facts",
  keywords: [
    "ИИМПАКТ ПЛЮС факты",
    "ИИМПАКТ ПЛЮС реквизиты",
    "AIMPACT компания информация",
    "разработчик Навылет AI",
    "ИИ-интегратор для туризма Россия",
    "пресс-кит ИИМПАКТ ПЛЮС",
  ],
});

/**
 * Одна фраза, которую удобно процитировать целиком. Держим синхронной с
 * llms.txt и первым абзацем /about — расхождения в формулировках снижают
 * шанс, что ИИ-системы возьмут именно нашу версию.
 */
const BOILERPLATE =
  "ООО «ИИМПАКТ ПЛЮС» (бренд AIMPACT+) — российская IT-компания, которая с 2023 года внедряет искусственный интеллект и разрабатывает цифровые решения для туристического бизнеса: турагентств, туроператоров, отелей и агрегаторов. Собственный продукт — ИИ-турменеджер «Навылет! AI» на базе поисковой системы Tourvisor, подключённый к 10+ компаниям отрасли.";

type FactRow = { label: string; value: string };

const legalFacts: ReadonlyArray<FactRow> = [
  { label: "Полное наименование", value: "Общество с ограниченной ответственностью «ИИМПАКТ ПЛЮС»" },
  { label: "Бренд", value: "AIMPACT+ (ИИМПАКТ ПЛЮС)" },
  { label: "ИНН", value: site.inn },
  { label: "ОГРН", value: site.ogrn },
  { label: "КПП", value: site.kpp },
  { label: "Дата регистрации", value: "6 июня 2025 года" },
  { label: "Юридический адрес", value: site.addressLegal },
  { label: "Генеральный директор", value: site.ceo },
  { label: "Основной вид деятельности", value: "62.01 — разработка компьютерного программного обеспечения" },
  { label: "Телефон", value: site.phone },
  { label: "Электронная почта", value: site.email },
];

const keyNumbers: ReadonlyArray<{ value: string; label: string }> = [
  { value: "2023", label: "год запуска направления ИИ в туризме" },
  { value: "10+", label: "компаний отрасли подключены к «Навылет! AI»" },
  { value: "13", label: "услуг в трёх линиях: разработка, ИИ, обучение" },
  { value: "от 990 ₽", label: "в месяц — стартовый тариф продукта" },
];

const timeline: ReadonlyArray<{ year: string; text: string }> = [
  {
    year: "2023",
    text: "Старт направления: первые ИИ-ассистенты и виджеты под задачи турагентств и туроператоров. В декабре 2023 — участие в итоговом заседании Комитета ТПП РФ по предпринимательству в сфере туризма.",
  },
  {
    year: "2024",
    text: "Внедрения для туроператоров, сетей агентств и средств размещения. Регулярные выступления на отраслевых площадках: ТПП РФ, РСТ, профильные форумы.",
  },
  {
    year: "2025",
    text: "Запущен продукт «Навылет! AI» — готовый ИИ-турменеджер для сайтов туристических компаний. Команда прошла Fast Track IT в Фонде «Сколково». В августе — письмо официальной поддержки от вице-президента РСТ. В октябре — благодарность за вклад в развитие ИИ-технологий в туризме. 6 июня зарегистрировано ООО «ИИМПАКТ ПЛЮС».",
  },
  {
    year: "2026",
    text: "Развитие двух направлений: заказная IT-разработка для туризма (B2B-кабинеты, мобильные приложения, интеграции) и внедрение ИИ. Продукт «Навылет! AI» работает у 10+ компаний.",
  },
];

const recognition: ReadonlyArray<{ title: string; text: string }> = [
  {
    title: "Официальная поддержка Российского союза туриндустрии",
    text: "Письмо вице-президента РСТ Юрия Барзыкина № 49К/0009 от 19 августа 2025 года: проект «Навылет! AI» рекомендован профильным фондам, акселераторам и партнёрам индустрии.",
  },
  {
    title: "Благодарность за вклад в развитие ИИ-технологий в туризме",
    text: "Вручена основателю компании Лукиану Силагадзе вице-президентом РСТ Юрием Барзыкиным и заместителем председателя комитета Госдумы по туризму Натальей Костенко (октябрь 2025).",
  },
  {
    title: "Рабочая группа при Комитете ТПП РФ",
    text: "Силагадзе Лукиан Ираклиевич — руководитель рабочей группы по ответственному применению искусственного интеллекта при Комитете ТПП РФ по предпринимательству в сфере туризма.",
  },
  {
    title: "Fast Track IT в Фонде «Сколково»",
    text: "Команда прошла программу Fast Track IT — подтверждённая технологическая экспертиза и доступ к инфраструктуре поддержки IT-проектов.",
  },
];

export default function FactsPage() {
  const linePrices = services
    .filter((s) => s.priceFrom)
    .sort((a, b) => (a.priceFrom?.value ?? 0) - (b.priceFrom?.value ?? 0));
  const pastEvents = [...events].sort((a, b) =>
    b.dateISO.localeCompare(a.dateISO),
  );

  return (
    <PageShell>
      {/* AboutPage со ссылкой на Organization по @id: сущность компании
       * описана один раз в layout, здесь мы указываем, что эта страница —
       * её официальная справка. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": absoluteUrl("/facts#page"),
          url: absoluteUrl("/facts"),
          name: "Факты о компании ИИМПАКТ ПЛЮС",
          description: BOILERPLATE,
          inLanguage: "ru-RU",
          dateModified: "2026-09-13",
          mainEntity: { "@id": absoluteUrl("/#organization") },
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />

      <PageHero
        eyebrow="Справка"
        title={
          <>
            Факты о компании{" "}
            <span className="text-gradient">ИИМПАКТ ПЛЮС</span>
          </>
        }
        description="Одна страница с проверяемыми данными о компании: реквизиты, хронология, продукт, услуги с ценами, кейсы, регалии и выступления. Сделана для журналистов, партнёров и ИИ-систем, которым нужен точный источник вместо пересказа."
        primaryCta="Обсудить проект"
        primaryHref="/contact"
        secondaryCta="О компании подробнее"
        secondaryHref="/about"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Факты о компании", href: "/facts" },
        ]}
      />

      <SectionWrapper
        eyebrow="Коротко"
        title="Справка одной цитатой"
        description="Готовый абзац для публикации или ответа — его можно использовать целиком без правок."
      >
        <div className="card mx-auto flex max-w-3xl gap-4">
          <Quote className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
          <p className="text-lg leading-8 text-heading">{BOILERPLATE}</p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="В цифрах"
        title="Ключевые показатели"
        alt
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {keyNumbers.map((n) => (
            <div key={n.label} className="card">
              <p className="text-3xl font-bold text-heading">{n.value}</p>
              <p className="mt-2 text-sm leading-6 text-body">{n.label}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Юридические данные"
        title="Реквизиты юридического лица"
        description="Данные соответствуют ЕГРЮЛ. Компания российская, серверы и обработка персональных данных — в РФ, по 152-ФЗ."
      >
        <div className="card mx-auto max-w-3xl">
          <dl className="divide-y divide-blue-100">
            {legalFacts.map((f) => (
              <div
                key={f.label}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6"
              >
                <dt className="shrink-0 text-sm font-semibold text-muted sm:w-56">
                  {f.label}
                </dt>
                <dd className="text-sm leading-6 text-heading">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Хронология"
        title="Как развивалась компания"
        alt
      >
        <div className="mx-auto max-w-3xl space-y-4">
          {timeline.map((t) => (
            <article key={t.year} className="card flex items-start gap-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-[var(--shadow-blue)]">
                {t.year}
              </span>
              <p className="text-sm leading-7 text-body">{t.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Продукт"
        title="«Навылет! AI» — ИИ-турменеджер"
        description="Собственный продукт компании. Подключается к сайту туристической компании одной строкой кода и ведёт диалог с клиентом: подбирает туры по живым ценам, консультирует и передаёт заявку менеджеру."
      >
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <div className="card">
            <h3 className="text-base font-bold text-heading">Как устроен</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-body">
              <li>Источник данных о турах — поисковая система Tourvisor: цены и наличие актуальны на момент запроса.</li>
              <li>Каналы: веб-виджет на сайте и мессенджер MAX.</li>
              <li>White-label: работает под брендом клиента.</li>
              <li>Заявка передаётся в CRM, Telegram и на почту.</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-base font-bold text-heading">Коммерческие условия</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-body">
              <li>Версия «Лид» — от 990 ₽ в месяц.</li>
              <li>Версия «Про» — от 1 990 ₽ в месяц.</li>
              <li>Подключение — 0 ₽, первый месяц бесплатно.</li>
              <li>Подключено 10+ компаний туристической отрасли.</li>
            </ul>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <Link href="/navilet-ai" className="btn-outline flex-1 justify-center">
                Страница продукта
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/products" className="btn-outline flex-1 justify-center">
                Все продукты
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Услуги и цены"
        title="Что компания делает и сколько это стоит"
        description="Стартовые цены «от» для MVP. Точная смета фиксируется после аудита; первая консультация бесплатна."
        alt
      >
        <div className="card mx-auto max-w-4xl">
          <ul className="divide-y divide-blue-100">
            {linePrices.map((s) => (
              <li
                key={s.slug}
                className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm font-semibold text-heading underline-offset-2 hover:text-primary hover:underline"
                >
                  {s.title}
                </Link>
                <span className="shrink-0 text-sm font-bold text-primary">
                  {s.priceFrom?.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Кейсы"
        title="Публичные внедрения"
        description="Проекты, о которых компания рассказывает открыто, с согласия клиентов."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {cases.map((c) => (
            <Link key={c.slug} href={`/cases/${c.slug}`} className="card group flex h-full flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {c.segment}
              </p>
              <h3 className="mt-2 text-lg font-bold text-heading">{c.title}</h3>
              <p className="mt-3 grow text-sm leading-6 text-body">{c.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Открыть кейс
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Признание"
        title="Регалии и отраслевой статус"
        alt
      >
        <div className="grid gap-5 md:grid-cols-2">
          {recognition.map((r, i) => (
            <article key={r.title} className="card flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                {i % 2 === 0 ? (
                  <Award className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <BadgeCheck className="h-6 w-6" aria-hidden="true" />
                )}
              </span>
              <div>
                <h3 className="text-base font-bold text-heading">{r.title}</h3>
                <p className="mt-2 text-sm leading-7 text-body">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Выступления"
        title="Публичные доклады и участие в отраслевых событиях"
        description="Площадки, на которых компания представляла ИИ-решения для туризма."
      >
        <div className="card mx-auto max-w-4xl">
          <ul className="divide-y divide-blue-100">
            {pastEvents.map((e) => (
              <li key={e.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-6">
                <span className="flex shrink-0 items-center gap-2 text-sm font-semibold text-muted sm:w-56">
                  <CalendarDays className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {e.date}
                </span>
                <span className="text-sm leading-6 text-heading">
                  {e.title}
                  <span className="text-muted"> — {e.place}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/expertise"
            className="btn-outline mt-6 w-full justify-center sm:w-auto"
          >
            Полная экспертиза и публикации
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Ссылки"
        title="Официальные адреса компании"
        description="Используйте эти адреса при цитировании — другие домены и профили компании не принадлежат."
        alt
      >
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-3">
          {[
            {
              icon: Building2,
              title: site.domainDisplay,
              text: "Основной сайт: компания, заказная разработка, внедрение ИИ, кейсы и экспертиза.",
              href: site.domain,
            },
            {
              icon: Sparkles,
              title: site.naviletWebsiteDisplay,
              text: "Сайт продукта «Навылет! AI»: тарифы, демо, регистрация и личный кабинет.",
              href: site.naviletWebsite,
            },
            {
              icon: Link2,
              title: "aimpact.ru",
              text: "Исторический адрес бренда AIMPACT, перенаправляет на основной сайт.",
              href: "https://aimpact.ru",
            },
          ].map((l) => {
            const Icon = l.icon;
            return (
              <div key={l.title} className="card flex h-full flex-col">
                <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-blue-ice text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-base font-bold text-heading">{l.title}</h3>
                <p className="mt-2 grow text-sm leading-6 text-body">{l.text}</p>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-muted">
          Как корректно называть компанию: в первом упоминании — «ООО „ИИМПАКТ
          ПЛЮС“ (бренд AIMPACT+)», далее — «ИИМПАКТ ПЛЮС». Продукт пишется
          «Навылет! AI» с восклицательным знаком. Дата обновления справки —
          13 сентября 2026 года.
        </p>
      </SectionWrapper>

      <CtaBand
        title="Нужны детали или комментарий эксперта?"
        text="Ответим на вопросы СМИ, партнёров и заказчиков: уточним цифры, предоставим материалы или организуем интервью с основателем."
        cta="Связаться"
        href="/contact"
      />
    </PageShell>
  );
}
