"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Headset,
  type LucideIcon,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { solutionCards, type SolutionIcon } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const iconMap: Record<SolutionIcon, LucideIcon> = {
  Brain,
  Bot,
  BarChart3,
  Headset,
};

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function SolutionsMap({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Карта услуг"
      title="От стратегии и аудита до индивидуальных AI-приложений"
      description="Не сводим ИИ к чат-боту. Помогаем туристическим компаниям строить полноценные интеллектуальные продукты — от моделей и интерфейсов до аналитики и омниканальной коммуникации."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {solutionCards.map((card) => {
          const Icon = iconMap[card.icon] ?? Bot;
          return (
            <motion.div
              key={card.title}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Link
                href="/services"
                className="card group relative flex h-full flex-col overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/[0.06] transition-all duration-500 group-hover:scale-[1.6] group-hover:bg-accent/[0.14]" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-sky/[0.05] transition-all duration-700 group-hover:scale-150 group-hover:bg-sky/[0.10]" />

                <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="relative text-lg font-bold text-heading">
                  {card.title}
                </h3>
                <p className="relative mt-3 grow leading-7 text-body">
                  {card.text}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Подробнее об услугах
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="max-w-2xl text-sm leading-6 text-muted">
          Каждая услуга — отдельный модуль с прозрачным составом, сроком и
          бюджетом. Можно начать с одного и расширять по мере результата.
        </p>
        <Link href="/services" className="btn-primary">
          Все услуги ИИМПАКТ ПЛЮС
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
