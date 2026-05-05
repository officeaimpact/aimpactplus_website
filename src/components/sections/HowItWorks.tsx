"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardCheck,
  MessagesSquare,
  PlugZap,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import {
  implementationSteps,
  type ImplementationStep,
} from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const iconMap: Record<ImplementationStep["icon"], LucideIcon> = {
  ClipboardCheck,
  MessagesSquare,
  PlugZap,
  Rocket,
};

function TimelineStep({
  step,
  title,
  text,
  icon,
  index,
  total,
}: ImplementationStep & { index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = iconMap[icon];
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connecting line with arrow (desktop only) */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%+28px)] top-7 hidden h-0.5 w-[calc(100%-56px)] lg:block"
        >
          <div className="absolute left-0 top-0 -z-10 h-full w-full bg-blue-100/80" />
          <motion.div
            className="relative h-full bg-gradient-to-r from-primary via-accent to-sky"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          >
            <svg
              className="absolute -right-2 top-1/2 -translate-y-1/2 text-sky"
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1L8 6L1 11"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Step number circle */}
      <motion.div
        className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 font-bold"
        animate={
          isInView
            ? {
                borderColor: "#0097F5",
                backgroundColor: "#0097F5",
                color: "#ffffff",
                boxShadow: "0 14px 28px -10px rgba(0, 151, 245, 0.55)",
              }
            : {
                borderColor: "#CCF2FF",
                backgroundColor: "#E8F9FF",
                color: "#0097F5",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
              }
        }
        transition={{ duration: 0.5, delay: index * 0.15 }}
      >
        <span className="text-lg">{step}</span>
      </motion.div>

      {/* Icon tile */}
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-blue-ice">
        <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
      </div>

      <h3 className="mb-2 text-lg font-bold text-heading">{title}</h3>
      <p className="max-w-[280px] text-sm leading-6 text-body">{text}</p>
    </motion.div>
  );
}

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function HowItWorks({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Как мы работаем"
      title="От аудита до запуска ИИ в продакшн — за 4 чётких шага"
      description="Внедряем ИИ предсказуемо: сначала измеряем точки потерь, затем собираем рабочий прототип, безопасно интегрируем в существующие системы и масштабируем по результатам пилота."
      alt
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
      >
        {implementationSteps.map((s, i) => (
          <TimelineStep
            key={s.step}
            {...s}
            index={i}
            total={implementationSteps.length}
          />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
