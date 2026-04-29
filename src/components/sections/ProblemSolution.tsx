"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { painPoints } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ProblemSolution() {
  return (
    <SectionWrapper
      eyebrow="Проблема рынка"
      title="Туризм 2026: где AI даёт реальный эффект"
      description="Сегодня бизнесу нужны не отдельные виджеты, а инфраструктура: связанные данные, прогнозы, сегментация и омниканальная коммуникация. AI-решения от ИИМПАКТ ПЛЮС закрывают эти узкие места."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {painPoints.map((p) => (
          <motion.article key={p.title} variants={fadeInUp} className="card">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-primary">
              {p.stat}
            </p>
            <h3 className="mt-3 text-xl font-black text-heading">{p.title}</h3>
            <p className="mt-3 leading-7 text-body">{p.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
