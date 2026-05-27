import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  faqJsonLd,
  pageMetadata,
  serviceJsonLd,
} from "@/lib/seo";
import { cities, getCity } from "@/lib/cities-data";
import { site } from "@/lib/site-data";

type Params = { slug: string };

export function generateStaticParams() {
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return pageMetadata({
    title: city.title,
    description: city.description,
    path: `/cities/${city.slug}`,
    keywords: city.keywords,
  });
}

export default async function CityDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();

  const intent = encodeURIComponent(`Внедрение ИИ для туризма ${city.nameLocative}`);
  const contactHref = `/contact?intent=${intent}`;
  const cityGoal: Record<string, string> = {
    moscow: "pilot_intent_moscow",
    "saint-petersburg": "pilot_intent_spb",
    sochi: "pilot_intent_sochi",
  };
  const primaryCtaGoal = cityGoal[city.slug];

  return (
    <PageShell>
      <JsonLd
        data={serviceJsonLd({
          name: `Внедрение ИИ в туризм ${city.nameLocative}`,
          description: city.description,
          url: `/cities/${city.slug}`,
          serviceType: `Внедрение ИИ в туризм ${city.nameLocative}`,
          audience: "Туристические компании",
        })}
      />
      <JsonLd data={faqJsonLd([...city.localFaq])} />

      <PageHero
        eyebrow={`Локально · ${city.name}`}
        title={`Внедрение ИИ в туризм ${city.nameLocative}`}
        description={`${city.marketContext} Мы помогаем туркомпаниям ${city.nameGenitive} внедрять ИИ-ассистентов, чат-боты, голосовые сценарии и CRM-интеграции — на готовом продукте «Навылет! AI» или в формате кастомной разработки.`}
        primaryCta="Запросить ИИ-аудит"
        primaryHref={contactHref}
        primaryCtaGoal={primaryCtaGoal}
        secondaryCta="Смотреть «Навылет! AI»"
        secondaryHref="/navilet-ai"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Города", href: "/cities" },
          { name: city.name, href: `/cities/${city.slug}` },
        ]}
      />

      <SectionWrapper
        eyebrow="Кому подходит"
        title={`Какие компании туризма ${city.nameGenitive} мы подключаем`}
        description={`В ${city.name} мы фокусируемся на четырёх сегментах. Каждый получает свою архитектуру ИИ-решения — без шаблонов и «универсального чат-бота».`}
      >
        <div className="grid gap-5 md:grid-cols-2">
          {city.segments.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              className="card group flex items-start gap-4"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition group-hover:scale-105">
                <Sparkles className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg font-bold text-heading">{s.label}</p>
                <p className="mt-2 text-sm leading-6 text-body">{s.note}</p>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Открыть решение
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Услуги"
        title={`Что мы внедряем ${city.nameLocative}`}
        description="Подключаем готовый ИИ-турменеджер «Навылет! AI» за 1–2 недели или собираем кастомное решение под уникальные процессы вашей компании."
        alt
      >
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {[
            "Готовый ИИ-турменеджер «Навылет! AI» на сайт (1–2 недели)",
            "ИИ-ассистенты в WhatsApp, Telegram, ВКонтакте, MAX",
            "Интеграции с Tourvisor, AmoCRM, Bitrix24, UON CRM, RetailCRM",
            "Голосовые ИИ-сценарии для входящих и обзвона (Mango Office, UIS)",
            "Корпоративные ИИ-ассистенты и базы знаний (RAG)",
            "ИИ-аналитика диалогов, конверсий и причин отказов",
            "PMS-интеграции для отелей (TravelLine, Bnovo, Frontdesk24)",
            "152-ФЗ: контур хранения данных согласовывается до старта",
          ].map((item) => (
            <div
              key={item}
              className="card flex items-start gap-3 border-blue-100"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p className="text-sm leading-6 text-body">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/services" className="btn-secondary">
            Полный каталог услуг
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Локация"
        title={`Очно ${city.nameLocative} или удалённо по всей России`}
        description={`Команда ИИМПАКТ ПЛЮС базируется в Москве на Трубниковском, 24. ${
          city.slug === "moscow"
            ? "Очные встречи — у нас в офисе или у вас."
            : `С компаниями ${city.nameGenitive} работаем удалённо: видеовстречи, общий борд задач, при необходимости — командировки команды.`
        } 80% коммуникации в любом проекте — асинхронная, чтобы экономить время.`}
        alt
      >
        <div className="card mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-start">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
            <MapPin className="h-7 w-7" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-base font-bold text-heading">
              Офис ИИМПАКТ ПЛЮС
            </p>
            <p className="mt-2 text-sm leading-6 text-body">
              Москва, Трубниковский переулок, д. 24, стр. 1, помещение 14.
              Метро «Баррикадная» и «Краснопресненская». Рабочие часы: 10:00–19:00
              по будням. Встречи — по предварительной записи.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-muted">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-primary">
                {site.phone}
              </span>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-primary">
                {site.email}
              </span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="FAQ"
        title={`Частые вопросы по работе ${city.nameLocative}`}
        description="Локальная специфика и типовые вопросы, которые задают туркомпании этого региона."
      >
        <div className="mx-auto max-w-3xl space-y-4">
          {city.localFaq.map((f) => (
            <details
              key={f.question}
              className="card group border-blue-100"
            >
              <summary className="cursor-pointer list-none text-base font-bold text-heading">
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-body">{f.answer}</p>
            </details>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title={`Готовы запустить пилот ${city.nameLocative}?`}
        text="Расскажите задачу — соберём прототип ИИ-решения за 2 недели, без риска для текущих продаж."
        cta="Получить ИИ-аудит"
        href={contactHref}
      />
    </PageShell>
  );
}
