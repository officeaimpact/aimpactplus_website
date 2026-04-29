"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { LeadFormModal } from "./LeadFormModal";
import { track } from "@/lib/analytics";

export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {show && !open && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28 }}
            className="fixed bottom-4 left-1/2 z-40 w-[min(560px,calc(100vw-1.5rem))] -translate-x-1/2"
          >
            <div className="flex items-center justify-between gap-3 rounded-full border border-white/10 bg-deep/95 px-4 py-2.5 text-white shadow-[0_24px_60px_rgba(0,82,204,0.32)] backdrop-blur-md sm:px-5 sm:py-3">
              <span className="flex items-center gap-2 text-xs font-bold sm:text-sm">
                <Sparkles className="h-4 w-4 text-sky" />
                Готовы обсудить AI-проект?
              </span>
              <button
                type="button"
                onClick={() => {
                  track("lead_cta_click", { source: "floating" });
                  setOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-blue-50 sm:text-sm"
              >
                Заявка
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <LeadFormModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
