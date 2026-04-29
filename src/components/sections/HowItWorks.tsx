"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { implementationSteps } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function HowItWorks() {
  return (
    <SectionWrapper
      eyebrow="Процесс"
      title="Безопасное внедрение без остановки текущего сайта"
      description="Чёткие шаги от аудита до пилота. Старая воронка работает, новая запускается параллельно и подключается, когда показывает результат."
      alt
    >
      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {implementationSteps.map((step, index) => (
          <motion.li
            key={step.title}
            variants={fadeInUp}
            className="card relative"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-lg font-black text-white shadow-[var(--shadow-blue)]">
              {index + 1}
            </span>
            <h3 className="mt-5 text-xl font-black text-heading">
              {step.title}
            </h3>
            <p className="mt-3 leading-7 text-body">{step.text}</p>
          </motion.li>
        ))}
      </motion.ol>
    </SectionWrapper>
  );
}
