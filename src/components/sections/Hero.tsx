"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { HeroWordmark } from "@/components/visual/HeroWordmark";
import { scaleIn } from "@/lib/animations";
import { naviletDemoUrl } from "@/lib/site-data";

const title =
  "Внедряем искусственный интеллект и разрабатываем IT-решения для туризма";
const titleAccent = "от пилота за 2 недели до собственного продукта";

/** Шаг появления слов заголовка, мс. */
const WORD_STEP = 70;

export function Hero() {
  const words = title.split(" ");
  // Блоки под заголовком стартуют после последнего слова.
  const afterTitle = (words.length + 1) * WORD_STEP;

  return (
    <section className="hero-shell text-white">
      {/* py-* и lg:min-h подобраны так, чтобы на MacBook 13–14" (≈720–820px
       * viewport-height) контент Hero находился по вертикали примерно в центре
       * видимой области, а не «уходил» вниз. lg:min-h-[calc(100svh-88px)] —
       * hero занимает ровно высоту экрана за вычетом хедера, контент
       * центрируется по вертикали. На очень больших экранах ограничиваем max. */}
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20 lg:min-h-[calc(100svh-88px)] lg:max-h-[860px]">
        {/*
         * Левая колонка анимируется чистым CSS (.hero-word / .hero-fade в
         * globals.css), а не framer-motion. Причина — SEO: framer рендерил
         * слова H1 отдельными <span> без пробелов и с inline opacity:0 в
         * SSR-HTML, поэтому краулеры без JS (GPTBot, ClaudeBot, PerplexityBot)
         * читали заголовок как одно склеенное слово. Теперь между словами
         * настоящие пробелы, а в HTML нет inline-скрытия текста.
         */}
        <div>
          <h1
            className="text-balance font-display text-[1.6rem] font-bold leading-[1.12] min-[420px]:text-[1.85rem] sm:text-4xl lg:text-5xl xl:text-[3.4rem]"
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

          <p
            className="hero-fade mt-6 max-w-2xl text-pretty text-base leading-7 text-blue-100 sm:text-xl sm:leading-8"
            style={{ animationDelay: `${afterTitle}ms` }}
          >
            ИИМПАКТ ПЛЮС — российская IT-компания для туризма с 2023 года.
            Внедряем искусственный интеллект и разрабатываем цифровые
            решения под задачи турагентств, туроператоров, отелей
            и агрегаторов — от ИИ-ассистентов и голосовых помощников
            до интеграций с Tourvisor и CRM. Собственный продукт
            «Навылет! AI» — на базе поисковой системы Tourvisor — уже
            работает у 10+ компаний отрасли.
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

        <motion.div
          initial="hidden"
          animate="visible"
          variants={scaleIn}
          className="relative flex items-center justify-center"
        >
          <HeroWordmark />
        </motion.div>
      </div>
    </section>
  );
}
