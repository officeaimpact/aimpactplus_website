"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "aimpact-tourism-cookie-consent";

export function CookieConsent() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored) return;
    const t = setTimeout(() => setShown(true), 600);
    return () => clearTimeout(t);
  }, []);

  const accept = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore storage errors
    }
    setShown(false);
  };

  return (
    <AnimatePresence>
      {shown && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-x-3 bottom-3 z-[60] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-sm"
          role="dialog"
          aria-label="Cookie-согласие"
        >
          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-[var(--shadow-card-hover)]">
            <p className="text-sm font-bold text-heading">
              Сайт использует cookies
            </p>
            <p className="mt-2 text-xs leading-5 text-body">
              Мы применяем cookies для аналитики и работы интерфейса в
              соответствии с{" "}
              <Link href="/privacy" className="font-bold text-primary">
                политикой конфиденциальности
              </Link>
              . Это можно отклонить — без потери ключевой функциональности.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => accept("accepted")}
                className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-hover"
              >
                Принять
              </button>
              <button
                type="button"
                onClick={() => accept("declined")}
                className="rounded-full border border-blue-100 px-4 py-2 text-xs font-bold text-body transition hover:border-primary hover:text-primary"
              >
                Только необходимые
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
