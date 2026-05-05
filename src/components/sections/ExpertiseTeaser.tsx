"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { events } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function ExpertiseTeaser({ id, merge }: SectionAnchorProps = {}) {
  const featured = events.filter((e) => e.image).slice(0, 4);
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Мероприятия"
      title="Выступления, форумы и публичная экспертиза"
      description="Делимся опытом на площадках ТПП РФ, РСТ, МГИМО и РЭУ. Полный список с подробностями — на странице «Экспертиза»."
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
            key={event.id}
            variants={fadeInUp}
            className="card group flex h-full flex-col overflow-hidden p-0"
          >
            {event.image && (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span
                  className={cn(
                    "absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold backdrop-blur-md",
                    event.upcoming
                      ? "bg-emerald-500/95 text-white"
                      : "bg-white/95 text-heading",
                  )}
                >
                  <CalendarDays className="h-3 w-3" />
                  {event.date}
                </span>
              </div>
            )}
            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <MapPin className="h-3 w-3" />
                {event.place}
              </p>
              <h3 className="mt-3 line-clamp-2 text-lg font-bold text-heading sm:text-xl">
                {event.title}
              </h3>
              <p className="mt-3 line-clamp-3 grow leading-7 text-body">
                {event.description}
              </p>
              <Link
                href={`/expertise#${event.id}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition group-hover:translate-x-0.5"
              >
                Подробнее
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
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
