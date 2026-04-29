"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from "@/lib/animations";
import { naviletFeatures } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import DemoWidget from "@/components/DemoWidget";
import { demoScenarios } from "@/lib/scenarios";

export function NaviletPreview() {
  return (
    <SectionWrapper
      eyebrow="Навылет! AI"
      title="Готовый AI-турменеджер для сайта туристической компании"
      description="Не абстрактный AI, а понятный интерфейс продаж: диалог, подбор, карточки туров, FAQ и передача заявки менеджеру."
    >
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="space-y-4"
        >
          {naviletFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="flex gap-3 rounded-3xl border border-blue-100 bg-white p-5 shadow-[var(--shadow-soft)]"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-bold text-heading">{feature.title}</p>
                <p className="mt-1 text-sm leading-6 text-body">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
          <motion.div variants={fadeInUp}>
            <Link href="/navilet-ai" className="btn-primary mt-2">
              Открыть страницу продукта
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative rounded-[2rem] bg-deep p-3 shadow-[var(--shadow-blue)]"
        >
          <DemoWidget scenario={demoScenarios[0]} />
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
