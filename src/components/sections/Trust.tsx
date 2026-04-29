"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { partners, testimonials } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Quote } from "lucide-react";

export function Trust() {
  return (
    <SectionWrapper
      eyebrow="Экспертиза"
      title="О нас говорят профессионалы туристической отрасли"
      description="Мы выступаем на площадках ТПП РФ, РСТ, МГИМО и РЭУ им. Г. В. Плеханова. Цитаты — из публичных выступлений и отзывов клиентов."
      alt
    >
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {partners.map((p) => (
          <span
            key={p}
            className="rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-heading shadow-[var(--shadow-soft)]"
          >
            {p}
          </span>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2"
      >
        {testimonials.slice(0, 4).map((t) => (
          <motion.blockquote
            key={t.name}
            variants={fadeInUp}
            className="card relative"
          >
            <Quote className="mb-3 h-6 w-6 text-primary/40" aria-hidden="true" />
            <p className="text-lg leading-8 text-heading">«{t.text}»</p>
            <footer className="mt-6">
              <p className="font-black text-heading">{t.name}</p>
              <p className="mt-1 text-sm text-muted">{t.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
