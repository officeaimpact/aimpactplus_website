"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Plug,
  ChartNoAxesCombined,
  MessagesSquare,
  Brain,
  Headset,
  type LucideIcon,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { solutionCards, type SolutionIcon } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const iconMap: Record<SolutionIcon, LucideIcon> = {
  Bot,
  Plug,
  ChartNoAxesCombined,
  MessagesSquare,
  Brain,
  Headset,
};

export function SolutionsMap() {
  return (
    <SectionWrapper
      eyebrow="Карта решений"
      title="От ассистента на сайте — до интеграций с CRM, голосом и аналитикой"
      description="ИИ-Туризм объединяет AI-решения вокруг реальных процессов туристического бизнеса: заявки, подбор, бронирование, FAQ, отчётность и сопровождение."
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
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-ice text-accent transition group-hover:bg-accent/15">
                <Icon className="h-6 w-6 transition group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-black text-heading">{card.title}</h3>
              <p className="mt-3 leading-7 text-body">{card.text}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
