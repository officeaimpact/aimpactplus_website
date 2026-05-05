"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Sparkles, X } from "lucide-react";
import type { EventItem } from "@/lib/site-data";

export function EventModal({
  event,
  onClose,
}: {
  event: EventItem | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => ref.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [event, onClose]);

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-deep/65 backdrop-blur-sm" />

          <motion.div
            ref={ref}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-[1.75rem] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.32)] focus:outline-none"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-deep/45 text-white backdrop-blur-md transition hover:bg-deep/70"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="max-h-[90vh] overflow-y-auto overscroll-contain">
              {event.image ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 640px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold backdrop-blur-md ${
                        event.upcoming
                          ? "bg-emerald-500/90 text-white"
                          : "bg-white/90 text-heading"
                      }`}
                    >
                      <CalendarDays className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-heading backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.place}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-sky/15">
                  <Sparkles className="h-16 w-16 text-accent/25" />
                  <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-heading backdrop-blur-md">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-heading backdrop-blur-md">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.place}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {event.upcoming && (
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Предстоящее событие
                  </div>
                )}

                <h2
                  id="event-modal-title"
                  className="text-balance text-xl font-bold leading-snug text-heading sm:text-2xl"
                >
                  {event.title}
                </h2>

                <p className="mt-4 text-pretty text-[15px] leading-[1.75] text-body">
                  {event.description}
                </p>

                {event.tags && event.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-blue-ice px-3 py-1 text-xs font-bold text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
