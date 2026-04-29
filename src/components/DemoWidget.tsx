"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, ArrowRight } from "lucide-react";
import { demoScenarios, type DemoMessage } from "@/lib/site-data";
import { cn } from "@/lib/cn";

export function DemoWidget({ className }: { className?: string }) {
  const [scenarioId, setScenarioId] = useState(demoScenarios[0].id);
  return (
    <div className={cn("dashboard-card text-white", className)}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-bold text-blue-100">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/10">
            <Bot className="h-4 w-4 text-sky" />
          </span>
          Навылет! AI · live demo
        </span>
        <span className="rounded-full bg-sky/15 px-3 py-1 text-xs font-bold text-sky">
          ассистент
        </span>
      </div>

      <div
        role="tablist"
        aria-label="Сценарии демо"
        className="mb-4 flex gap-2 overflow-x-auto scrollbar-hide"
      >
        {demoScenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={s.id === scenarioId}
            onClick={() => setScenarioId(s.id)}
            className={cn(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-bold transition",
              s.id === scenarioId
                ? "border-sky/50 bg-sky/15 text-sky"
                : "border-white/10 bg-white/5 text-blue-100 hover:bg-white/10",
            )}
          >
            {s.title}
          </button>
        ))}
      </div>

      <ScenarioPlayback key={scenarioId} scenarioId={scenarioId} />

      <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-blue-100">
        <span>Готовый клиент уходит менеджеру с контекстом</span>
        <ArrowRight className="h-4 w-4 text-sky" aria-hidden="true" />
      </div>
    </div>
  );
}

function ScenarioPlayback({ scenarioId }: { scenarioId: string }) {
  const scenario =
    demoScenarios.find((s) => s.id === scenarioId) ?? demoScenarios[0];
  const total = scenario.messages.length;
  const [revealed, setRevealed] = useState(1);

  useEffect(() => {
    if (revealed >= total) return;
    const timer = setTimeout(() => setRevealed((v) => v + 1), 700);
    return () => clearTimeout(timer);
  }, [revealed, total]);

  return (
    <div className="space-y-2.5" aria-live="polite">
      <AnimatePresence initial={false}>
        {scenario.messages.slice(0, revealed).map((msg, i) => (
          <DemoBubble key={`${scenario.id}-${i}`} message={msg} />
        ))}
      </AnimatePresence>
      {revealed < total && (
        <div className="flex items-center gap-2 px-2 text-xs text-blue-100/70">
          <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-sky" />
          AI печатает…
        </div>
      )}
    </div>
  );
}

function DemoBubble({ message }: { message: DemoMessage }) {
  const [role, text] = message;
  const isAi = role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "flex items-end gap-2",
        isAi ? "justify-start" : "justify-end",
      )}
    >
      {isAi && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sky/15 text-sky">
          <Bot className="h-3.5 w-3.5" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-6",
          isAi
            ? "rounded-bl-md bg-white/10 text-white"
            : "rounded-br-md bg-gradient-to-br from-sky/30 to-accent/30 text-white",
        )}
      >
        {text}
      </div>
      {!isAi && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/15 text-white">
          <User className="h-3.5 w-3.5" />
        </span>
      )}
    </motion.div>
  );
}
