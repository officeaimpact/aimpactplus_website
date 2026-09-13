import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ExternalLink,
  LayoutDashboard,
  MessageSquareText,
  Plug,
  Network,
  BookOpen,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { FAQSection } from "@/components/sections/FAQ";
import { JsonLd } from "@/components/ui/JsonLd";
import DemoWidget from "@/components/DemoWidget";
import { demoScenarios } from "@/lib/scenarios";
import {
  faqJsonLd,
  itemListJsonLd,
  pageMetadata,
  productJsonLd,
} from "@/lib/seo";
import { absoluteUrl, naviletDemoUrl, site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Продукты: «Навылет! AI» и личный кабинет",
  description:
    "Собственные продукты для туризма: ИИ-турменеджер «Навылет! AI» на базе Tourvisor (от 990 ₽/мес, первый месяц бесплатно) и личный кабинет с аналитикой диалогов и настройкой виджета.",
  path: "/products",
  keywords: [
    "продукты для туризма",
    "IT-продукты для турагентств",
    "ИИ-турменеджер",
    "Навылет AI",
    "SaaS для турагентства",
    "ИИ-ассистент для турагентства подписка",
    "личный кабинет турагентства аналитика",
  ],
});

const LK_URL = "https://lk.navilet.ru";

const productsFaq = [
  {
    question: "Чем продукт отличается от заказной разработки?",
    answer:
      "Продукт «Навылет! AI» готов: подключается за пару минут одной строкой кода, стоит от 990 ₽/мес и обновляется для всех клиентов сразу. Заказная разработка нужна, когда у компании свои процессы — агентская сеть, нестандартные интеграции, мобильное приложение. Часто это комбинируется: продукт на сайте плюс разработка под конкретный процесс.",
  },
  {
    question: "Сколько стоит «Навылет! AI»?",
    answer:
      "Версия «Лид» — от 990 ₽/мес (живой диалог, подбор туров и готовая заявка менеджеру), версия «Про» — от 1 990 ₽/мес (консультации без ограничений и возврат клиентов). Подключение бесплатно, первый месяц — тоже. Актуальные тарифы — на navilet.ru/tarify.",
  },
  {
    question: "Что даёт личный кабинет?",
    answer:
      "Все диалоги ассистента, воронку от первого сообщения до заявки, конверсию по источникам, топ-направления, настройку бренда и приветствия, редактор ответов на частые вопросы. Кабинет входит в подписку.",
  },
  {
    question: "Откуда берутся туры и цены?",
    answer:
      "Из поисковой системы Tourvisor через API: ассистент показывает актуальные предложения туроператоров с ценами и наличием на момент запроса, а не устаревший прайс.",
  },
];

export default function ProductsPage() {
  const naviletUrl = absoluteUrl("/navilet-ai");
  return (
    <PageShell>
      <JsonLd
        data={itemListJsonLd([
          { name: site.productName, url: "/navilet-ai" },
          { name: "Личный кабинет и аналитика «Навылет! AI»", url: LK_URL },
        ])}
      />
      <JsonLd
        data={productJsonLd({
          name: site.productName,
          description:
            "Готовый ИИ-турменеджер для сайта и мессенджеров туристической компании: подбор туров на базе поисковой системы Tourvisor, консультации, передача заявки менеджеру. Подключается одной строкой кода.",
          url: "/navilet-ai",
          brand: site.brand,
          offers: {
            lowPrice: "990",
            highPrice: "14990",
            priceCurrency: "RUB",
            url: `${site.naviletWebsite}/tarify`,
            description:
              "Подписка: версия «Лид» от 990 ₽/мес, версия «Про» от 1 990 ₽/мес. Первый месяц бесплатно, подключение 0 ₽.",
          },
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Личный кабинет «Навылет! AI»",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: LK_URL,
          description:
            "Личный кабинет для турагентств и туроператоров: диалоги ИИ-ассистента, воронка и конверсия, топ-направления, настройка виджета и ответов. Входит в подписку «Навылет! AI».",
          isPartOf: { "@type": "Product", name: site.productName, url: naviletUrl },
          author: {
            "@type": "Organization",
            "@id": absoluteUrl("/#organization"),
            name: site.legalName,
          },
        }}
      />
      <JsonLd data={faqJsonLd(productsFaq)} />

      <PageHero
        eyebrow="Продукты"
        title={
          <>
            Продукты ИИМПАКТ ПЛЮС{" "}
            <span className="text-gradient">для туристического бизнеса</span>
          </>
        }
        description="Мы не только разрабатываем на заказ — у нас есть собственный продукт, который уже работает у 10+ компаний отрасли. ИИ-турменеджер «Навылет! AI» на базе поисковой системы Tourvisor и личный кабинет с аналитикой — подключаются за пару минут."
        primaryCta="Попробовать демо"
        primaryHref={naviletDemoUrl("products-hero")}
        primaryCtaGoal="navilet_demo_click"
        secondaryCta="Заказная разработка"
        secondaryHref="/services#razrabotka"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Продукты", href: "/products" },
        ]}
        aside={
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/15 to-sky/15 blur-2xl" />
            <DemoWidget scenario={demoScenarios[0]} className="relative" />
          </div>
        }
      />

      <SectionWrapper
        eyebrow="Линейка"
        title="Два продукта, одна подписка"
        description="Ассистент общается с клиентами на сайте и в мессенджерах, кабинет показывает, что из этого получилось."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card flex h-full flex-col">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Bot className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              ИИ-турменеджер
            </p>
            <h3 className="mt-2 text-2xl font-bold text-heading">«Навылет! AI»</h3>
            <p className="mt-3 leading-7 text-body">
              Ведёт живой диалог с клиентом на сайте и в MAX, подбирает туры
              по живым ценам поисковой системы Tourvisor, показывает карточки
              с фото и перелётами, отвечает на вопросы об отелях и передаёт
              менеджеру готовую заявку с контактом.
            </p>
            <ul className="mt-5 space-y-2 border-t border-blue-100 pt-4">
              {[
                "Подключение одной строкой кода, без программиста",
                "Подбор туров по 20+ параметрам, горящие туры, мультистрановой поиск",
                "White-label: бренд, цвета, тон общения агентства",
                "Заявка в CRM, Telegram и на почту",
                "Версии «Лид» и «Про», серверы в РФ, 152-ФЗ",
              ].map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-6 text-body">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg font-bold text-heading">
              от 990 ₽/мес{" "}
              <span className="text-sm font-normal text-muted">
                · первый месяц бесплатно · подключение 0 ₽
              </span>
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link href="/navilet-ai" className="btn-primary flex-1 justify-center">
                О продукте
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={`${site.naviletWebsite}/tarify`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 justify-center"
              >
                Тарифы на navilet.ru
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="card flex h-full flex-col bg-deep text-white">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
              <LayoutDashboard className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">
              Личный кабинет и аналитика
            </p>
            <h3 className="mt-2 text-2xl font-bold">lk.navilet.ru</h3>
            <p className="mt-3 leading-7 text-blue-100">
              Рабочее место руководителя и менеджера: все диалоги ассистента,
              воронка от первого сообщения до заявки, конверсия по источникам
              и топ-направления. Здесь же настраиваются бренд, приветствие и
              ответы на частые вопросы.
            </p>
            <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
              {[
                "Диалоги с фильтрами и поиском, передача менеджеру",
                "Воронка и конверсия: диалог → подборка → заявка",
                "Топ-направления и динамика за 7, 30 и 90 дней",
                "Редактор ответов и настройка виджета без разработчика",
                "Входит в подписку — отдельно платить не нужно",
              ].map((f) => (
                <li key={f} className="flex gap-2 text-sm leading-6 text-blue-100">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg font-bold">
              В составе подписки «Навылет! AI»
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link href="/navilet-ai#dashboard" className="btn-primary flex-1 justify-center">
                Как выглядит кабинет
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={LK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-dark flex-1 justify-center"
              >
                Войти в кабинет
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Продукт + разработка"
        title="Когда продукта мало — дорабатываем под вас"
        description="«Навылет! AI» закрывает продажи на сайте. Если процессы шире — агентская сеть, внутренние регламенты, свои системы — добавляем заказную разработку на той же команде."
        alt
      >
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Network,
              title: "B2B-кабинет туроператора",
              text: "Витрина и бронирование для агентской сети поверх вашей учётной системы. ИИ-помощник для агентов — на технологии «Навылет! AI».",
              href: "/services/b2b-kabinet-turoperatora",
              price: "от 400 000 ₽",
            },
            {
              icon: Plug,
              title: "Интеграции с Tourvisor, Слетать и CRM",
              text: "Заявки ассистента — в вашу CRM с атрибуцией источника, статусы брони — обратно. Синхронизация без ручного переноса.",
              href: "/services/integraciya-tourvisor-sletat-crm",
              price: "от 50 000 ₽",
            },
            {
              icon: BookOpen,
              title: "Корпоративный ИИ-ассистент",
              text: "Тот же ИИ, но для сотрудников: отвечает по регламентам, тарифам и условиям туроператоров из вашей базы знаний.",
              href: "/services/korporativnyy-ii-assistent",
              price: "от 250 000 ₽",
            },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <Link key={c.href} href={c.href} className="card group flex h-full flex-col">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-heading">{c.title}</h3>
                <p className="mt-3 grow text-sm leading-6 text-body">{c.text}</p>
                <p className="mt-3 text-sm font-bold text-heading">{c.price}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Открыть услугу
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Цифры"
        title="Продукт в работе"
        description="Мы не продаём продукт, которым не пользуются: он в продакшене у турагентств, сети «Магазин Горящих Путёвок» и туроператоров."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: Bot, value: "10+", label: "компаний туристической отрасли подключены" },
            { icon: MessageSquareText, value: "до 80%", label: "типовых обращений закрывает ассистент без менеджера" },
            { icon: BarChart3, value: "24/7", label: "ночные и выходные заявки не теряются" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="card flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-ice text-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-3xl font-bold text-heading">{s.value}</p>
                  <p className="mt-1 text-sm leading-6 text-body">{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted">
          Подробности и метрики — в{" "}
          <Link href="/cases/magazin-goryashchih-putevok" className="font-semibold text-primary underline-offset-2 hover:underline">
            кейсе «Магазин Горящих Путёвок»
          </Link>
          .
        </p>
      </SectionWrapper>

      <FAQSection
        eyebrow="FAQ"
        title="Вопросы о продуктах"
        description="Цены, отличие от заказной разработки, откуда данные."
        items={productsFaq}
      />

      <CtaBand
        title="Попробуйте «Навылет! AI» на реальных турах"
        text="Демо на базе поисковой системы Tourvisor — без регистрации. Понравится — запустите своего ассистента: от 990 ₽/мес, первый месяц бесплатно."
        cta="Попробовать демо"
        href={naviletDemoUrl("products-ctaband")}
        goal="navilet_demo_click"
      />
    </PageShell>
  );
}
