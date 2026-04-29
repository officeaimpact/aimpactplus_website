"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { partners, testimonials } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BrandMonogram } from "@/components/ui/BrandMonogram";

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
            key={p.name}
            className="rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-heading shadow-[var(--shadow-soft)]"
          >
            {p.name}
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
            <footer className="mt-6 flex items-center gap-4">
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={128}
                  height={128}
                  sizes="64px"
                  className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                />
              ) : (
                <BrandMonogram
                  name={t.name}
                  size="lg"
                  variant="gradient"
                  className="h-16 w-16 rounded-full text-base"
                />
              )}
              <div>
                <p className="font-black text-heading">{t.name}</p>
                <p className="mt-0.5 text-sm text-muted">{t.role}</p>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
