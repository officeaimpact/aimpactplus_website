"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  Bot,
  Brain,
  Database,
  Globe2,
  Headset,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";

type Orbit = {
  size: number;
  duration: number;
  reverse?: boolean;
  nodes: { Icon: LucideIcon; angle: number; label?: string }[];
};

const orbits: Orbit[] = [
  {
    size: 220,
    duration: 22,
    nodes: [
      { Icon: MessagesSquare, angle: 0, label: "Чат" },
      { Icon: Headset, angle: 120, label: "Голос" },
      { Icon: Workflow, angle: 240, label: "Поток" },
    ],
  },
  {
    size: 340,
    duration: 38,
    reverse: true,
    nodes: [
      { Icon: Database, angle: 30 },
      { Icon: BarChart3, angle: 110, label: "BI" },
      { Icon: Brain, angle: 200, label: "LLM" },
      { Icon: Globe2, angle: 290 },
    ],
  },
  {
    size: 470,
    duration: 56,
    nodes: [
      { Icon: ShieldCheck, angle: 60 },
      { Icon: Sparkles, angle: 220 },
    ],
  },
];

const ringColors = [
  "rgba(0, 231, 253, 0.45)",
  "rgba(0, 151, 245, 0.32)",
  "rgba(0, 82, 204, 0.22)",
];

export function OrbitCore({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const maxSize = orbits[orbits.length - 1].size;

  return (
    <div
      className={cn(
        "relative isolate aspect-square w-full",
        "max-w-[420px] sm:max-w-[460px] mx-auto",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 rounded-full opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,231,253,0.35), rgba(0,151,245,0.18) 38%, transparent 65%)",
        }}
      />

      {orbits.map((orbit, index) => {
        const radius = orbit.size / 2;
        return (
          <motion.div
            key={`ring-${index}`}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: `${(orbit.size / maxSize) * 100}%`,
              height: `${(orbit.size / maxSize) * 100}%`,
              marginLeft: `-${(orbit.size / maxSize) * 50}%`,
              marginTop: `-${(orbit.size / maxSize) * 50}%`,
              borderColor: ringColors[index] ?? ringColors[0],
              borderStyle: "dashed",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 + index * 0.08 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{ transformOrigin: "50% 50%" }}
              animate={
                reducedMotion
                  ? { rotate: 0 }
                  : { rotate: orbit.reverse ? -360 : 360 }
              }
              transition={{
                duration: orbit.duration,
                ease: "linear",
                repeat: reducedMotion ? 0 : Infinity,
              }}
            >
              {orbit.nodes.map((node, nodeIndex) => {
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <motion.div
                    key={`node-${index}-${nodeIndex}`}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                    }}
                    animate={
                      reducedMotion
                        ? { rotate: 0 }
                        : { rotate: orbit.reverse ? 360 : -360 }
                    }
                    transition={{
                      duration: orbit.duration,
                      ease: "linear",
                      repeat: reducedMotion ? 0 : Infinity,
                    }}
                  >
                    <div className="relative flex flex-col items-center gap-1">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/[0.08] text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
                        <node.Icon className="h-5 w-5 text-sky" />
                      </span>
                      {node.label && (
                        <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100/90 backdrop-blur-md">
                          {node.label}
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-full opacity-80 blur-2xl"
            style={{
              background:
                "conic-gradient(from 0deg, #00e7fd, #0097f5, #0062ef, #00e7fd)",
            }}
          />
          <motion.div
            animate={reducedMotion ? { rotate: 0 } : { rotate: 360 }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: reducedMotion ? 0 : Infinity,
            }}
            className="relative h-28 w-28 rounded-full p-[2px]"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(0,231,253,0.9), rgba(0,151,245,0.5), rgba(0,82,204,0.95), rgba(0,231,253,0.9))",
            }}
          >
            <div
              className="grid h-full w-full place-items-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, #1146ff 0%, #001a44 60%, #00091f 100%)",
              }}
            >
              <Bot className="h-10 w-10 text-sky" aria-hidden="true" />
            </div>
          </motion.div>
          <span className="mt-4 block text-center text-[11px] font-bold uppercase tracking-[0.24em] text-sky">
            AI Core
          </span>
        </div>
      </motion.div>
    </div>
  );
}
