"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { track } from "@/lib/analytics";

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

  useEffect(() => {
    if (!open) return;
    track("lead_modal_open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => ref.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open, onClose]);

  return (
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
            className="absolute inset-0 grid place-items-center px-4 py-8"
          >
            <div
              ref={ref}
              tabIndex={-1}
              className="relative w-full max-w-xl rounded-[2rem] bg-white p-6 shadow-[0_30px_120px_rgba(0,0,0,0.32)] focus:outline-none sm:p-8"
            >
              <button
                type="button"
                onClick={() => {
                  track("lead_modal_close", { reason: "close-button" });
                  onClose();
                }}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-blue-100 text-muted transition hover:border-primary hover:text-primary"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Заявка
              </p>
              <h2 className="mt-2 text-2xl font-black text-heading">
                Расскажите задачу — соберём план AI-внедрения
              </h2>
              <p className="mt-2 text-sm leading-6 text-body">
                4 коротких шага. Можно отвечать тезисно — детали обсудим в
                диалоге.
              </p>
              <div className="mt-6">
                <LeadForm variant="modal" initialIntent={initialIntent} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
