"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HeroWordmark } from "@/components/visual/HeroWordmark";
import {
  fadeInUp,
  heroWordVariant,
  scaleIn,
  staggerContainer,
} from "@/lib/animations";

const title = "Внедряем искусственный интеллект в туризм";
const titleAccent = "от пилота за 2 недели до собственного ИИ-продукта";

export function Hero() {
  const words = title.split(" ");

  return (
    <section className="hero-shell text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-24 lg:min-h-[640px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-28">
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
            <Link
              href="/contact"
              className="btn-primary w-full justify-center sm:w-auto"
            >
              Получить ИИ-аудит
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/navilet-ai"
              className="btn-secondary-dark w-full justify-center sm:w-auto"
            >
              Смотреть Навылет! AI
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-sky"
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
