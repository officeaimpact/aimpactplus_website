"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { track } from "@/lib/analytics";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

/**
 * LeadFormModal — рендерится через React Portal в document.body.
 *
 * Почему portal обязателен: модал зовётся из Header, FloatingCTA, DashboardHero,
 * DashboardCTA. У всех этих родителей где-то выше по дереву есть `backdrop-filter`
 * (или `transform`), а это по CSS-spec **создаёт containing block** для всех
 * `position: fixed` потомков. Без portal модал якорится не к viewport, а к
 * родителю с backdrop-blur, получает его размер (например, 80px высоты шапки)
 * и пользователь видит контент страницы сквозь backdrop. С portal'ом мы
 * выпрыгиваем из любых ancestor-стилей и гарантированно покрываем весь экран.
 */
export function LeadFormModal({
  open,
  onClose,
  initialIntent,
}: {
  open: boolean;
  onClose: () => void;
  initialIntent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /*
     * Канонический SSR-safe portal pattern: на сервере document.body не существует,
     * поэтому createPortal нельзя вызвать в render. Дожидаемся mount на клиенте.
     */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    track("lead_modal_open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    lockBodyScroll();
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => ref.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockBodyScroll();
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!mounted) return null;

  const modal = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-deep/70 backdrop-blur-sm"
            onClick={() => {
              track("lead_modal_close", { reason: "backdrop" });
              onClose();
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center px-4 py-4 sm:py-8"
          >
            <div
              ref={ref}
              tabIndex={-1}
              className="relative flex w-full max-w-xl flex-col rounded-[2rem] bg-white shadow-[0_30px_120px_rgba(0,0,0,0.32)] focus:outline-none max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-hidden"
            >
              <button
                type="button"
                onClick={() => {
                  track("lead_modal_close", { reason: "close-button" });
                  onClose();
                }}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-blue-100 bg-white/95 text-muted shadow-sm backdrop-blur transition hover:border-primary hover:text-primary"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  Заявка
                </p>
                <h2 className="mt-2 pr-12 text-2xl font-bold text-heading">
                  Расскажите задачу — соберём план AI-внедрения
                </h2>
                <p className="mt-2 text-sm leading-6 text-body">
                  Заполняется за минуту. Имя, контакт, цель и направление —
                  этого достаточно, чтобы мы связались.
                </p>
                <div className="mt-6">
                  <LeadForm variant="modal" initialIntent={initialIntent} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
