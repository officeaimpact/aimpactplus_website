import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Compass,
  Mic2,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  founderPersonJsonLd,
  localBusinessJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "О компании ИИМПАКТ ПЛЮС — ИИ для туризма с 2023 года",
  description:
    "ООО «ИИМПАКТ ПЛЮС» (бренд AIMPACT+) — IT-команда, которая с 2023 года внедряет ИИ-решения в туризм: продукт «Навылет! AI», 10+ компаний подключены к продукту, прошли Fast Track IT в Фонде «Сколково». Основатель — Силагадзе Лукиан Ираклиевич.",
  path: "/about",
});

const milestones = [
  {
    year: "2023",
    title: "Старт направления ИИ в туризме",
    text: "Команда начала разрабатывать первые ИИ-ассистенты и виджеты под задачи турагентств и туроператоров. В декабре 2023 — участие в итоговом заседании Комитета ТПП РФ по предпринимательству в сфере туризма.",
  },
  {
    year: "2024",
    title: "Публичная экспертиза и кейсы",
    text: "Внедрения для клиентов разных сегментов: туроператоры, сети агентств, средства размещения. Выступления на профильных площадках: ТПП РФ, РСТ, Совет по ИИ, региональные форумы.",
  },
  {
    year: "2025",
    title: "Продукт «Навылет! AI» и Сколково",
    text: "Запущен собственный продукт «Навылет! AI» — готовый ИИ-турменеджер для сайтов туристических компаний. Команда успешно прошла Fast Track IT в Фонде «Сколково». Партнёрства с РСТ, ТПП РФ, МГИМО, РЭУ им. Г. В. Плеханова.",
  },
];

const stats = [
  { value: "2023", label: "год запуска направления ИИ в туризме" },
  { value: "10+", label: "компаний подключены к «Навылет! AI»" },
  { value: "Fast Track IT", label: "программа Фонда «Сколково»" },
];

const keyEvents = [
  {
    title: "III Международный конгресс туроператоров",
    place: "Сочи · ноябрь 2025",
    href: "/expertise#congress-sochi-2025",
  },
  {
    title: "Международный конгресс туроператоров",
    place: "Москва · октябрь 2025",
    href: "/expertise#congress-turoperators-2025",
  },
  {
    title: "Совет ТПП РФ по применению ИИ в бизнесе",
    place: "Москва · апрель 2025",
    href: "/expertise#tpp-ai-council-2025",
  },
  {
    title: "Международный конгресс по ИИ в турагентствах",
    place: "Минск · апрель 2025",
    href: "/expertise#minsk-congress-2025",
  },
  {
    title: "Всероссийский форум «Открытый Дагестан»",
    place: "Махачкала · сентябрь 2025",
    href: "/expertise#dagestan-forum-2025",
  },
  {
    title: "Заседание Комитета ТПП РФ по туризму",
    place: "Москва · декабрь 2023",
    href: "/expertise#tpp-meeting-2023",
  },
];

export default function About() {
  return (
    <PageShell>
      <JsonLd data={localBusinessJsonLd()} />
      <JsonLd data={founderPersonJsonLd()} />
      <PageHero
        eyebrow="О компании"
        title={`${site.legalName} — IT-команда внедрения ИИ в туризм с 2023 года`}
        description="Проектируем и внедряем решения на базе искусственного интеллекта для туристического бизнеса с 2023 года. Запустили собственный продукт «Навылет! AI», к которому подключены 10+ компаний отрасли, прошли Fast Track IT в Фонде «Сколково» и регулярно выступаем на ключевых отраслевых площадках России. Основатель и CEO — Силагадзе Лукиан Ираклиевич, эксперт по ИИ в туризме при ТПП РФ."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "О компании", href: "/about" },
        ]}
      />

      <SectionWrapper
        eyebrow="В цифрах"
        title="Почему нам доверяют"
        description="Сухие цифры о нашей экспертизе и публичной репутации в туристической отрасли."
      >
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="card relative overflow-hidden text-center"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent" />
              <p className="relative text-4xl font-bold text-primary">
                {s.value}
              </p>
              <p className="relative mt-3 text-sm leading-6 text-body">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Хроника"
        title="Как мы росли"
        description="Три ключевых этапа становления ИИМПАКТ ПЛЮС как профильного ИИ-интегратора для туризма."
        alt
      >
        <div className="grid gap-5 md:grid-cols-3">
          {milestones.map((m) => (
            <article key={m.year} className="card relative overflow-hidden">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/[0.08]" />
              <p className="relative text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {m.year}
              </p>
              <h3 className="relative mt-3 text-lg font-bold text-heading">
                {m.title}
              </h3>
              <p className="relative mt-3 leading-7 text-body">{m.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Что делает ИИМПАКТ ПЛЮС"
        title="Кратко о компании"
        description="Мы фокусируемся исключительно на туризме и говорим с заказчиком на одном языке: понимаем процессы туроператоров, агентств, агрегаторов и средств размещения изнутри."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Compass className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-heading">
              Отраслевая фокусировка
            </h3>
            <p className="mt-3 leading-7 text-body">
              С 2023 года занимаемся только искусственным интеллектом в
              туризме. Понимаем сценарии продаж, специфику Tourvisor,
              особенности B2B и B2C-каналов и реальные проблемы менеджеров.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Sparkles className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-heading">
              Свой продукт «Навылет! AI»
            </h3>
            <p className="mt-3 leading-7 text-body">
              Готовый ИИ-турменеджер для сайта: каскадный диалог, подбор туров
              на базе поисковой системы Tourvisor, FAQ и передача заявки
              менеджеру. Подключается за 1 день. К продукту подключены
              10+ компаний отрасли.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-heading">
              Безопасное внедрение
            </h3>
            <p className="mt-3 leading-7 text-body">
              Текущий сайт и каналы продаж работают, ИИ запускается рядом и
              подключается, когда показывает результат. Согласия по 152-ФЗ,
              хранение данных по согласованной схеме.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Rocket className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-heading">
              Прошли Fast Track IT в Сколково
            </h3>
            <p className="mt-3 leading-7 text-body">
              Команда прошла программу Fast Track IT в Фонде «Сколково» —
              подтверждённая технологическая экспертиза и доступ к
              инфраструктуре поддержки IT-проектов.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Users className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-heading">
              Делимся знаниями
            </h3>
            <p className="mt-3 leading-7 text-body">
              Регулярно выступаем на ТПП РФ, РСТ, МГИМО, РЭУ им. Г. В.
              Плеханова, отраслевых конгрессах в Москве, Сочи, Минске,
              Махачкале. Формируем повестку по внедрению ИИ в туризме.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Building2 className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-heading">
              Юридическая прозрачность
            </h3>
            <p className="mt-3 leading-7 text-body">
              ООО «ИИМПАКТ ПЛЮС», ИНН {site.inn}, ОГРН {site.ogrn}. Договор,
              акты, закрывающие документы, согласие на обработку данных
              по 152-ФЗ.
            </p>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Публичные выступления"
        title="Где звучит наша экспертиза"
        description="Ключевые отраслевые площадки, на которых мы представили ИИ-решения для туризма за последние два года."
        alt
      >
        <div className="grid gap-4 md:grid-cols-2">
          {keyEvents.map((e) => (
            <Link
              key={e.title}
              href={e.href}
              className="card group flex items-start gap-4"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue-ice text-primary transition group-hover:bg-primary group-hover:text-white">
                <Mic2 className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-bold text-heading">{e.title}</p>
                <p className="mt-1 text-sm text-muted">{e.place}</p>
              </div>
              <ArrowRight className="mt-3 h-5 w-5 shrink-0 text-primary transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/expertise" className="btn-secondary">
            Полный список выступлений и наград
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper
        id="author-lukian"
        eyebrow="Основатель"
        title="Силагадзе Лукиан Ираклиевич — эксперт по ИИ в туризме"
        description="Генеральный директор и основатель ИИМПАКТ ПЛЮС. Эксперт по искусственному интеллекту и цифровым технологиям в туризме, член Комитета ТПП РФ по предпринимательству в сфере туризма."
        alt
      >
        <article className="card mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-start">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-primary to-accent text-3xl font-bold text-white shadow-[var(--shadow-blue)]">
            СЛ
          </span>
          <div className="flex-1">
            <p className="text-2xl font-bold text-heading">
              {site.ceo}
            </p>
            <p className="mt-1 text-sm font-semibold text-primary">
              Генеральный директор и основатель {site.brand}
            </p>
            <div className="mt-5 space-y-4 leading-7 text-body">
              <p>
                С 2023 года руководит проектами по внедрению искусственного
                интеллекта в туристический бизнес: ИИ-турменеджер «Навылет!
                AI», ИИ-ассистенты для туроператоров и отелей, голосовые
                сценарии, ИИ-аналитика, CRM-интеграции. К продукту «Навылет!
                AI» подключены 10+ компаний туристической отрасли.
              </p>
              <p>
                Член Комитета ТПП РФ по предпринимательству в сфере туризма.
                Регулярно выступает на профильных площадках: Совет ТПП РФ по
                применению ИИ в бизнесе, Российский союз туриндустрии (РСТ),
                МГИМО, РЭУ им. Г.&nbsp;В.&nbsp;Плеханова, международные
                конгрессы туроператоров в Москве, Сочи, Минске.
              </p>
              <p>
                В октябре 2024 года получил почётную благодарность от
                вице-президента РСТ Юрия Барзыкина и заместителя председателя
                комитета Госдумы по туризму Натальи Костенко за «Вклад в
                развитие ИИ-технологий в туризме».
              </p>
            </div>
            <ul className="mt-6 grid gap-2 text-sm leading-6 text-body sm:grid-cols-2">
              <li className="flex gap-2">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Эксперт по ИИ в туризме при Комитете ТПП РФ
              </li>
              <li className="flex gap-2">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Спикер ТПП РФ, РСТ, МГИМО, РЭУ им. Г. В. Плеханова
              </li>
              <li className="flex gap-2">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Доклады в Москве, Сочи, Минске, Актау, Махачкале
              </li>
              <li className="flex gap-2">
                <BadgeCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                Команда прошла Fast Track IT в Фонде «Сколково»
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/expertise" className="btn-secondary">
                Все выступления и публикации
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-primary">
                Связаться напрямую
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </article>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Признание"
        title="Награды и членство в комитетах"
        description="Профессиональное сообщество отмечает наш вклад в развитие ИИ-технологий в туризме."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Award className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-heading">
                Благодарность за вклад в развитие ИИ-технологий в туризме
              </h3>
              <p className="mt-2 text-sm leading-7 text-body">
                Вручена основателю ИИМПАКТ ПЛЮС Лукиану Силагадзе
                вице-президентом Российского союза туриндустрии Юрием
                Барзыкиным и заместителем председателя комитета Госдумы по
                туризму Натальей Костенко (9 октября 2024).
              </p>
            </div>
          </article>
          <article className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-heading">
                Члены Комитета ТПП РФ по предпринимательству в сфере туризма
              </h3>
              <p className="mt-2 text-sm leading-7 text-body">
                Представители команды — действующие члены профильного комитета,
                участвующие в формировании отраслевой повестки и регулярных
                заседаниях по цифровизации туризма.
              </p>
            </div>
          </article>
        </div>
        <div className="mt-5 card flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <Image
            src="/partners/skolkovo.png"
            alt="Участник Фонда «Сколково»"
            width={220}
            height={65}
            className="h-14 w-auto shrink-0"
          />
          <div>
            <h3 className="text-lg font-bold text-heading">
              Участник Фонда «Сколково»
            </h3>
            <p className="mt-2 text-sm leading-7 text-body">
              Команда прошла программу Fast Track IT в Фонде «Сколково» и
              развивает продукт «Навылет! AI» как участник ИТ-кластера — это
              подтверждает технологическую зрелость и потенциал наших ИИ-решений
              для туризма.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <CtaBand
        title="Готовы обсудить сотрудничество?"
        text="Опишите задачу — соберём прототип ИИ-решения и предложим план пилота для вашего бизнеса."
      />
    </PageShell>
  );
}
