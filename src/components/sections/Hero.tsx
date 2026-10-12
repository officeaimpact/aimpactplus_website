import { Fragment } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { naviletDemoUrl } from "@/lib/site-data";

const title =
  "Внедряем искусственный интеллект и разрабатываем IT-решения для туризма";
const titleAccent = "от пилота за 2 недели до собственного продукта";

/** Цифры из доклада на «ОТДЫХ Leisure 2026» (02.09.2026), разрешены к публикации. */
const seasonStats = [
  { value: "30+", label: "компаний и офисов туристической отрасли" },
  { value: "175 000+", label: "сообщений гостей обработано" },
  {
    value: "41,4%",
    // Неразрывные пробелы: «с» и «до» не отрываются от времени.
    label: "обращений — вне рабочего времени, с 19:00 до 9:00",
  },
];

/** Шаг появления слов заголовка, мс. */
const WORD_STEP = 70;

export function Hero() {
  const words = title.split(" ");
  // Блоки под заголовком стартуют после последнего слова.
  const afterTitle = (words.length + 1) * WORD_STEP;

  return (
    <section className="hero-shell text-white">
      {/* Высота — по содержимому. До октября 2026 стояли lg:min-h и
       * lg:max-h-[860px]: после удлинения H1 (12.09) контент перерос 860px,
       * и .hero-shell { overflow: hidden } срезал кнопки на всех экранах
       * ниже ~1000px. Заголовок во всю ширину укладывается в 2 строки,
       * и первый экран целиком помещается в ноутбук 1280×720. */}
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-12 lg:pb-16 lg:pt-12">
        {/*
         * Слова H1 анимируются чистым CSS (.hero-word / .hero-fade в
         * globals.css), а не framer-motion. Причина — SEO: framer рендерил
         * слова H1 отдельными <span> без пробелов и с inline opacity:0 в
         * SSR-HTML, поэтому краулеры без JS (GPTBot, ClaudeBot, PerplexityBot)
         * читали заголовок как одно склеенное слово. Теперь между словами
         * настоящие пробелы, а в HTML нет inline-скрытия текста.
         */}
        <p className="hero-fade inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold tracking-[0.16em] text-blue-100/90 backdrop-blur-md sm:text-[12px]">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-sky" />
            <span className="brand-pulse-dot absolute h-1.5 w-1.5 rounded-full bg-sky" />
          </span>
          ИИ В ТУРИЗМЕ С 2023 ГОДА
        </p>

        <h1
          className="mt-5 max-w-6xl text-balance font-display text-[1.6rem] font-bold leading-[1.12] min-[420px]:text-[1.85rem] sm:text-4xl lg:text-5xl xl:text-[3.4rem]"
          style={{ letterSpacing: "-0.012em" }}
        >
          {words.map((w, i) => (
            <Fragment key={`${w}-${i}`}>
              {i > 0 ? " " : null}
              <span
                className="hero-word"
                style={{ animationDelay: `${i * WORD_STEP}ms` }}
              >
                {w}
              </span>
            </Fragment>
          ))}
          {/* Пробел нужен для textContent: без него краулеры читают
              «…туризмаот пилота…» одним словом. Визуально span — block. */}
          {" "}
          <span
            className="hero-word mt-2 block text-gradient text-[1.25rem] leading-[1.18] min-[420px]:text-[1.45rem] sm:text-[1.8rem] lg:text-[2.2rem] xl:text-[2.5rem]"
            style={{ animationDelay: `${words.length * WORD_STEP}ms` }}
          >
            {titleAccent}
          </span>
        </h1>

        <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:items-start lg:gap-16">
          <div>
            <p
              className="hero-fade max-w-2xl text-pretty text-base leading-7 text-blue-100 sm:text-lg sm:leading-8"
              style={{ animationDelay: `${afterTitle}ms` }}
            >
              {/* nowrap вместо неразрывного дефиса U+2011: обычный дефис
                  нужен поиску и LLM («IT-компания», «ИИ-ассистент»). */}
              ИИМПАКТ ПЛЮС — российская{" "}
              <span className="whitespace-nowrap">IT-компания</span> для
              туризма с 2023 года. Делаем для турагентств, туроператоров,
              отелей и агрегаторов{" "}
              <span className="whitespace-nowrap">ИИ-ассистентов</span>,
              голосовых помощников, интеграции с Tourvisor и CRM и заказные
              системы.
            </p>

            <div
              className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
              style={{ animationDelay: `${afterTitle + 120}ms` }}
            >
              <a
                href={naviletDemoUrl("hero")}
                target="_blank"
                rel="noopener noreferrer"
                data-analytics-goal="navilet_demo_click"
                className="btn-primary w-full justify-center sm:w-auto"
                aria-label="Попробовать демо ИИ-турменеджера «Навылет! AI» (откроется в новой вкладке)"
              >
                Попробовать демо
                <ExternalLink className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="btn-secondary-dark w-full justify-center sm:w-auto"
              >
                Получить ИИ-аудит
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>

            <p
              className="hero-fade mt-3 max-w-xl text-xs leading-5 text-blue-100/90"
              style={{ animationDelay: `${afterTitle + 240}ms` }}
            >
              Демо ИИ-турменеджера «Навылет! AI» — на базе поисковой системы
              Tourvisor. От 990 ₽/мес, первый месяц бесплатно.{" "}
              <Link
                href="/navilet-ai"
                className="font-semibold text-sky underline-offset-2 hover:underline"
              >
                Подробнее о продукте
              </Link>
            </p>

            <p
              className="hero-fade mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-sky"
              style={{ animationDelay: `${afterTitle + 320}ms` }}
            >
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Пилот без риска для текущих продаж · согласие 152-ФЗ
            </p>
          </div>

          <aside
            className="hero-fade relative isolate"
            style={{ animationDelay: `${afterTitle + 180}ms` }}
            aria-label="«Навылет! AI» в сезоне 2026"
          >
            <div
              aria-hidden="true"
              className="brand-blob brand-blob--cyan -right-10 -top-10 -z-10 h-[80%] w-[80%]"
            />
            <div className="rounded-[1.5rem] border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-blue-100/80 sm:text-[12px]">
                «НАВЫЛЕТ! AI» В СЕЗОНЕ 2026
              </p>
              {/* subgrid: колонка цифр общая для всех строк — ширина по
                  самой длинной («175 000+»), подписи выровнены. */}
              <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 divide-y divide-white/10">
                {seasonStats.map((s) => (
                  <div
                    key={s.value}
                    className="col-span-2 grid grid-cols-subgrid items-baseline py-3"
                  >
                    <dt className="text-gradient font-display text-2xl font-bold leading-none xl:text-[1.85rem]">
                      {s.value}
                    </dt>
                    <dd className="text-sm leading-5 text-blue-100">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/expertise#events"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-sky underline-offset-2 hover:underline"
              >
                Из доклада на «ОТДЫХ Leisure 2026»
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
