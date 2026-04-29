"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export function HeroWordmark({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate mx-auto aspect-square w-full max-w-[460px]",
        className,
      )}
    >
      {/* Layer 1 — два анимированных blob'а */}
      <motion.div
        className="absolute -left-12 -top-10 h-[60%] w-[60%] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,231,253,0.55), transparent 65%)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 24, -12, 0],
                y: [0, -16, 18, 0],
                scale: [1, 1.08, 0.95, 1],
              }
        }
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: reduced ? 0 : Infinity,
        }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 h-[65%] w-[65%] rounded-full opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,151,245,0.55), transparent 65%)",
        }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, -20, 14, 0],
                y: [0, 14, -16, 0],
                scale: [1, 1.05, 0.92, 1],
              }
        }
        transition={{
          duration: 24,
          ease: "easeInOut",
          repeat: reduced ? 0 : Infinity,
          delay: 0.6,
        }}
      />

      {/* Layer 2 — медленно вращающийся conic-glow ring */}
      <motion.div
        className="absolute inset-[8%] rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(0,231,253,0) 0%, rgba(0,231,253,0.45) 18%, rgba(0,151,245,0.6) 38%, rgba(0,82,204,0.5) 60%, rgba(0,231,253,0.3) 82%, rgba(0,231,253,0) 100%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, transparent 38%, black 41%, black 64%, transparent 67%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, transparent 38%, black 41%, black 64%, transparent 67%)",
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{
          duration: 48,
          ease: "linear",
          repeat: reduced ? 0 : Infinity,
        }}
      />

      {/* Layer 3 — лёгкий tech-noise overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layer 4 — wordmark по центру */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <span
          className="font-black leading-none tracking-[-0.04em]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(72px, 14vw, 140px)",
            backgroundImage:
              "linear-gradient(135deg, #00E7FD 0%, #0097F5 45%, #0062EF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 18px 48px rgba(0, 151, 245, 0.45))",
          }}
        >
          AIMPACT
          <span
            style={{
              display: "inline-block",
              marginLeft: "0.04em",
              transform: "translateY(-0.06em)",
            }}
          >
            +
          </span>
        </span>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.32em] text-blue-100/85 backdrop-blur-md sm:text-[11px]">
          AI for tourism · since 2025
        </span>
      </motion.div>
    </div>
  );
}
