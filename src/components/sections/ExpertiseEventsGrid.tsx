"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { events, type EventItem } from "@/lib/site-data";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { EventModal } from "@/components/ui/EventModal";
import { cn } from "@/lib/cn";

const sortedEvents = [...events].sort((a, b) => {
  if (a.upcoming === b.upcoming) {
    return a.dateISO < b.dateISO ? 1 : -1;
  }
  return a.upcoming ? -1 : 1;
});

export function ExpertiseEventsGrid() {
  const [active, setActive] = useState<EventItem | null>(null);

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {sortedEvents.map((event) => (
          <motion.button
            key={event.id}
            type="button"
            variants={fadeInUp}
            onClick={() => setActive(event)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-blue-100 bg-white text-left shadow-[var(--shadow-soft)] transition hover:border-accent/30 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={`${event.title} — открыть подробности`}
          >
            {event.image ? (
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
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
                {event.upcoming && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    Скоро
                  </span>
                )}
              </div>
            ) : (
              <div className="relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-sky/15">
                <Sparkles className="h-12 w-12 text-accent/25" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-heading backdrop-blur-md">
                  <CalendarDays className="h-3 w-3" />
                  {event.date}
                </span>
              </div>
            )}

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-primary">
                <MapPin className="h-3 w-3 shrink-0" />
                {event.place}
              </p>
              <h3 className="mt-3 line-clamp-2 text-[15px] font-bold leading-snug text-heading sm:text-base">
                {event.title}
              </h3>
              <p className="mt-3 line-clamp-3 grow text-sm leading-6 text-body">
                {event.description}
              </p>
              {event.tags && event.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {event.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-ice px-2 py-0.5 text-[10px] font-bold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                Подробнее
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      <EventModal event={active} onClose={() => setActive(null)} />
    </>
  );
}
