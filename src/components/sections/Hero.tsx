"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { HeroWordmark } from "@/components/visual/HeroWordmark";
import {
  fadeInUp,
  heroWordVariant,
  scaleIn,
  staggerContainer,
} from "@/lib/animations";
import { trustItems } from "@/lib/site-data";

const title = "AI-решения для туристического бизнеса";
const titleAccent = "от ИИМПАКТ ПЛЮС";

export function Hero() {
  const words = title.split(" ");

  return (
    <section className="hero-shell text-white">
      <div className="mx-auto grid min-h-[640px] max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="dark">AI-интегратор для туризма · Москва</Badge>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mt-7 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ letterSpacing: "-0.02em" }}
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
            <br />
            <motion.span
              variants={heroWordVariant}
              className="text-gradient"
            >
              {titleAccent}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-blue-100 sm:text-xl"
          >
            Проектируем и внедряем AI-решения для туристического бизнеса —
            от индивидуальных интеллектуальных систем и аналитики до
            голосовых и текстовых ассистентов.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className="btn-primary">
              Получить аудит AI-возможностей
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/navilet-ai" className="btn-secondary-dark">
              Смотреть Навылет! AI
            </Link>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-sky"
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            Безопасный пилот за 2 недели · обсуждаем результат до старта
          </motion.p>

          <motion.ul
            variants={fadeInUp}
            className="mt-10 grid gap-2.5 text-sm text-blue-100/90 sm:grid-cols-2"
          >
            {trustItems.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </motion.ul>
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
