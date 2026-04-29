"use client";

import { motion } from "framer-motion";
import {
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

export function SolutionsMap() {
  return (
    <SectionWrapper
      eyebrow="Карта решений"
      title="От проектирования индивидуальных AI-систем до интеллектуальных решений под бизнес"
      description="Мы не сводим AI к чат-боту. Помогаем компаниям туризма строить полноценные интеллектуальные продукты — от моделей и интерфейсов до аналитики и омниканальной коммуникации."
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
            <motion.article
              key={card.title}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="card group"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <Icon
                  className="h-6 w-6 transition group-hover:scale-110"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-black text-heading">{card.title}</h3>
              <p className="mt-3 leading-7 text-body">{card.text}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
