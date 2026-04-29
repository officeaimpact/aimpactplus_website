"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { events } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function ExpertiseTeaser() {
  const featured = events.slice(0, 4);
  return (
    <SectionWrapper
      eyebrow="Мероприятия"
      title="Выступления, форумы и публичная экспертиза"
      description="Делимся опытом на площадках ТПП РФ, РСТ, МГИМО и РЭУ. Полный список — на странице «Экспертиза»."
      alt
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2"
      >
        {featured.map((event) => (
          <motion.article
            key={event.title}
            variants={fadeInUp}
            className="card flex h-full flex-col"
          >
            <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {event.place}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-black text-heading sm:text-xl">
              {event.title}
            </h3>
            <p className="mt-3 grow leading-7 text-body">{event.text}</p>
          </motion.article>
        ))}
      </motion.div>
      <div className="mt-12 text-center">
        <Link href="/expertise" className="btn-secondary">
          Все мероприятия и экспертиза
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
