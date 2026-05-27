"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { painPoints } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function ProblemSolution({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Где ИИ даёт деньги"
      title="6 точек, где туристическая компания теряет выручку без ИИ"
      description="Это не «модный ИИ», а конкретные узкие места, через которые уходит маржа: ночные обращения, типовые вопросы, медленный подбор и слепая аналитика. Каждая из них закрывается ИИ-решением за 2–8 недель."
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
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {p.stat}
            </p>
            <h3 className="mt-3 text-xl font-bold text-heading">{p.title}</h3>
            <p className="mt-3 leading-7 text-body">{p.text}</p>
          </motion.article>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
