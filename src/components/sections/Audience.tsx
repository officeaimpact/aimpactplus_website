"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Hotel,
  LayoutGrid,
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
};

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function Audience({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Для кого"
      title="Решения под ваш сегмент туристического бизнеса"
      description="Турагентство, туроператор, агрегатор или средство размещения — у каждого направления свой набор сценариев, интеграций и измеримых эффектов от внедрения ИИ."
      alt
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {audiencePaths.map((item) => {
          const Icon = iconMap[item.icon] ?? Store;
          return (
            <motion.div key={item.href} variants={fadeInUp}>
              <Link
                href={item.href}
                className="card group relative flex h-full flex-col overflow-hidden"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/[0.06] transition-all duration-500 group-hover:scale-[1.6] group-hover:bg-accent/[0.12]" />
                <div className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition group-hover:scale-105 group-hover:rotate-3">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="relative text-lg font-bold text-heading">
                  {item.title}
                </h3>
                <p className="relative mt-3 grow text-sm leading-6 text-body">
                  {item.description}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Открыть направление
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
