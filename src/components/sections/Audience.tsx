"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Hotel,
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
  Hotel,
  Map,
  Stethoscope: Map,
  Plane: Map,
};

export function Audience() {
  return (
    <SectionWrapper
      eyebrow="Для кого"
      title="Главная — это не лендинг, а портал входа"
      description="Каждый сегмент быстро попадает на свою страницу, где видит конкретные сценарии, интеграции и ожидаемые результаты — а не общий обзор."
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
                className="card group flex h-full flex-col"
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-blue-ice text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-heading">
                  {item.title}
                </h3>
                <p className="mt-3 grow leading-7 text-body">
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
