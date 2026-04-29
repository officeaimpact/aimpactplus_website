"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { painPoints } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ProblemSolution() {
  return (
    <SectionWrapper
      eyebrow="Проблема рынка"
      title="Туризм теряет заявки там, где нужна скорость"
      description="Клиенты решают за минуты, конкуренты отвечают первыми, а команда тратит часы на повторяющиеся вопросы. AI снимает рутину — менеджеры занимаются сложными продажами."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-3"
      >
        {painPoints.map((p) => (
          <motion.article key={p.title} variants={fadeInUp} className="card">
            <p className="text-4xl font-black tracking-tight text-gradient sm:text-5xl">
              {p.stat}
            </p>
            <h3 className="mt-4 text-xl font-black text-heading">{p.title}</h3>
            <p className="mt-3 leading-7 text-body">{p.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
