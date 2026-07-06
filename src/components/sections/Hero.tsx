"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import { HeroWordmark } from "@/components/visual/HeroWordmark";
import {
  fadeInUp,
  heroWordVariant,
  scaleIn,
  staggerContainer,
} from "@/lib/animations";
import { naviletDemoUrl } from "@/lib/site-data";

const title = "Внедряем искусственный интеллект в туризм";
const titleAccent = "от пилота за 2 недели до собственного ИИ-продукта";

export function Hero() {
  const words = title.split(" ");

  return (
    <section className="hero-shell text-white">
      {/* py-* и lg:min-h подобраны так, чтобы на MacBook 13–14" (≈720–820px
       * viewport-height) контент Hero находился по вертикали примерно в центре
       * видимой области, а не «уходил» вниз. lg:min-h-[calc(100svh-88px)] —
       * hero занимает ровно высоту экрана за вычетом хедера, контент
       * центрируется по вертикали. На очень больших экранах ограничиваем max. */}
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20 lg:min-h-[calc(100svh-88px)] lg:max-h-[860px]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-balance font-display text-[1.75rem] font-bold leading-[1.12] min-[420px]:text-[2rem] sm:text-5xl lg:text-6xl xl:text-[3.75rem]"
            style={{ letterSpacing: "-0.012em" }}
          >
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={heroWordVariant}
                className="mr-[0.28em] inline-block"
                style={{ perspective: 600 }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={heroWordVariant}
              className="mt-2 block text-gradient text-[1.4rem] leading-[1.18] min-[420px]:text-[1.6rem] sm:text-[2.1rem] lg:text-[2.6rem] xl:text-[2.9rem]"
            >
              {titleAccent}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-pretty text-base leading-7 text-blue-100 sm:text-xl sm:leading-8"
          >
            ИИМПАКТ ПЛЮС — российский ИИ-интегратор для туризма с 2023 года.
            Запускаем ИИ-ассистентов, голосовых помощников и ИИ-аналитику
            для турагентств, туроператоров, отелей и агрегаторов.
            Готовый продукт «Навылет! AI» — на базе поисковой системы
            Tourvisor — уже работает у 10+ компаний отрасли.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
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
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-3 max-w-xl text-xs leading-5 text-blue-100/90"
          >
            Демо ИИ-турменеджера «Навылет! AI» — на базе поисковой системы
            Tourvisor. 7 дней бесплатно, без карты.{" "}
            <Link
              href="/navilet-ai"
              className="font-semibold text-sky underline-offset-2 hover:underline"
            >
              Подробнее о продукте
            </Link>
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-sky"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Пилот без риска для текущих продаж · согласие 152-ФЗ
          </motion.p>
        </motion.div>

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
