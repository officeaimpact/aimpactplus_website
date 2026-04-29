"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { heroMetrics } from "@/lib/site-data";

export function Metrics() {
  return (
    <section className="border-y border-blue-100 bg-surface-alt">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-7xl gap-6 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4"
      >
        {heroMetrics.map((m) => (
          <motion.div
            key={m.label}
            variants={fadeInUp}
            className="flex items-baseline gap-3 sm:flex-col sm:items-start sm:gap-1"
          >
            <span className="text-4xl font-black tracking-tight text-gradient sm:text-5xl">
              {m.value}
            </span>
            <span className="text-sm font-semibold text-body sm:text-base">
              {m.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
