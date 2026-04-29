"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Hotel,
  LayoutGrid,
  Map,
  Store,
  type LucideIcon,
} from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { audiencePaths, type AudienceIcon } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const iconMap: Record<AudienceIcon, LucideIcon> = {
  Store,
  BriefcaseBusiness,
  LayoutGrid,
  Hotel,
  Map,
};

export function Audience() {
  return (
    <SectionWrapper
      eyebrow="Для кого"
      title="Главная — это не лендинг, а портал входа"
      description="Каждый сегмент попадает на свою страницу с конкретными сценариями, интеграциями и ожидаемыми результатами — без общего обзора."
      alt
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {audiencePaths.map((item) => {
          const Icon = iconMap[item.icon] ?? Store;
          return (
            <motion.div key={item.href} variants={fadeInUp}>
              <Link
                href={item.href}
                className="card group flex h-full flex-col"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition group-hover:scale-105">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-black text-heading">
                  {item.title}
                </h3>
                <p className="mt-3 grow text-sm leading-6 text-body">
                  {item.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Подробнее
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
