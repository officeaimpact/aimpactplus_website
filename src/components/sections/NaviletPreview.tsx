"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { naviletFeatures, site } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import DemoWidget from "@/components/DemoWidget";
import { demoScenarios } from "@/lib/scenarios";

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function NaviletPreview({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Навылет! AI"
      title="Готовый ИИ-турменеджер для сайта туристической компании"
      description="Не абстрактный ИИ, а понятный инструмент продаж: диалог, подбор и карточки туров на базе поисковой системы Tourvisor, FAQ и передача заявки менеджеру. К продукту подключено 10+ компаний отрасли."
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="min-w-0 space-y-4"
        >
          {naviletFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="flex gap-3 rounded-3xl border border-blue-100 bg-white p-5 shadow-[var(--shadow-soft)]"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-heading">{feature.title}</p>
                <p className="mt-1 text-sm leading-6 text-body">
                  {feature.text}
                </p>
              </div>
            </motion.div>
          ))}
          <motion.div
            variants={fadeInUp}
            className="mt-2 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/navilet-ai" className="btn-primary flex-1 justify-center sm:flex-initial">
              Открыть страницу продукта
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <a
              href={site.naviletWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex-1 justify-center sm:flex-initial"
              aria-label={`Перейти на сайт продукта ${site.naviletWebsiteDisplay} (откроется в новой вкладке)`}
            >
              Перейти на {site.naviletWebsiteDisplay}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="mx-auto w-full min-w-0 max-w-[440px]"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/15 to-sky/15 blur-2xl" />
            <DemoWidget scenario={demoScenarios[0]} className="relative" />
          </div>
          <p className="mt-4 text-center text-[11px] leading-5 text-muted">
            Подбор и карточки туров — на базе{" "}
            <span className="font-semibold text-heading">
              поисковой системы Tourvisor
            </span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
