"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  Compass,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { cn } from "@/lib/cn";

export type SegmentKey =
  | "travel-agencies"
  | "tour-operators"
  | "aggregators"
  | "hotels"
  | "destinations"
  | "cases"
  | "expertise"
  | "contact"
  | "about";

const KIND_BY_SEGMENT: Record<SegmentKey, VisualKind> = {
  "travel-agencies": "funnel",
  "tour-operators": "catalog",
  aggregators: "grid",
  hotels: "rooms",
  destinations: "map",
  cases: "results",
  expertise: "badges",
  contact: "channels",
  about: "compass",
};

type VisualKind =
  | "funnel"
  | "catalog"
  | "grid"
  | "rooms"
  | "map"
  | "results"
  | "badges"
  | "channels"
  | "compass";

export function SegmentVisual({
  segment,
  className,
}: {
  segment: SegmentKey;
  className?: string;
}) {
  const kind = KIND_BY_SEGMENT[segment] ?? "funnel";
  return (
    <div
      className={cn(
        "relative isolate aspect-square w-full max-w-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md sm:p-8",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(0,231,253,0.28), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,151,245,0.28), transparent 60%)",
        }}
      />
      {kind === "funnel" && <FunnelVisual />}
      {kind === "catalog" && <CatalogVisual />}
      {kind === "grid" && <AggregatorGridVisual />}
      {kind === "rooms" && <RoomsVisual />}
      {kind === "map" && <MapVisual />}
      {kind === "results" && <ResultsVisual />}
      {kind === "badges" && <BadgesVisual />}
      {kind === "channels" && <ChannelsVisual />}
      {kind === "compass" && <CompassVisual />}
    </div>
  );
}

const baseTransition: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

function FunnelVisual() {
  const reduced = useReducedMotion();
  const stages = [
    { Icon: MessageSquare, label: "Вопрос клиента" },
    { Icon: Bot, label: "AI-квалификация" },
    { Icon: Sparkles, label: "Подбор и ответ" },
    { Icon: Users, label: "Передача менеджеру" },
  ];
  return (
    <div className="relative flex h-full flex-col justify-between gap-3">
      {stages.map((s, i) => (
        <motion.div
          key={s.label}
          initial={reduced ? { opacity: 1 } : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...baseTransition, delay: i * 0.08 }}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-white"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <s.Icon className="h-5 w-5 text-white" />
          </span>
          <span className="text-sm font-bold">{s.label}</span>
          {i < stages.length - 1 && (
            <ArrowRight className="ml-auto h-4 w-4 text-sky" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function CatalogVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="grid h-full grid-cols-3 gap-2.5">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...baseTransition, delay: i * 0.04 }}
          className={cn(
            "relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-2.5",
            i === 4 &&
              "bg-gradient-to-br from-primary/40 via-accent/30 to-sky/40 border-sky/40",
          )}
        >
          <div className="h-3 w-12 rounded bg-white/30" />
          <div className="mt-2 h-1.5 w-full rounded bg-white/15" />
          <div className="mt-1.5 h-1.5 w-3/4 rounded bg-white/15" />
          {i === 4 && (
            <Sparkles className="absolute right-2 top-2 h-4 w-4 text-sky" />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function AggregatorGridVisual() {
  const reduced = useReducedMotion();
  const items = [
    { title: "Travelata", price: "55 000 ₽" },
    { title: "Onlinetours", price: "62 400 ₽" },
    { title: "Sletat.ru", price: "48 900 ₽" },
    { title: "Level.Travel", price: "59 700 ₽" },
    { title: "Tourvisor", price: "53 200 ₽" },
    { title: "AI выбор", price: "лучший" },
  ];
  return (
    <div className="grid h-full grid-cols-2 gap-2.5">
      {items.map((it, i) => {
        const highlight = it.title === "AI выбор";
        return (
          <motion.div
            key={it.title}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...baseTransition, delay: i * 0.05 }}
            className={cn(
              "rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-white",
              highlight &&
                "bg-gradient-to-br from-primary/40 via-accent/30 to-sky/40 border-sky/50",
            )}
          >
            <div className="flex items-center gap-2">
              {highlight ? (
                <Sparkles className="h-4 w-4 text-sky" />
              ) : (
                <LayoutGrid className="h-4 w-4 text-blue-100/80" />
              )}
              <span className="text-xs font-bold">{it.title}</span>
            </div>
            <p className="mt-2 text-base font-black">{it.price}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function RoomsVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-white">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black">Хостел Delas</p>
            <p className="text-xs text-blue-100/70">Москва · 4 номера</p>
          </div>
        </div>
        <span className="rounded-full border border-sky/40 bg-sky/15 px-2.5 py-1 text-[10px] font-bold text-sky">
          AI online
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {["Стандарт", "Студия", "Семейный", "Twin"].map((room, i) => (
          <motion.div
            key={room}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...baseTransition, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-white"
          >
            <p className="text-xs font-bold">{room}</p>
            <div className="mt-2 h-1 w-full rounded bg-white/15" />
            <p className="mt-2 text-[11px] text-blue-100/70">FAQ · 12 ответов</p>
          </motion.div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-white">
        <p className="flex items-center gap-2 text-xs">
          <MessageSquare className="h-4 w-4 text-sky" />
          AI отвечает гостям 24/7 — даже когда администратор офлайн
        </p>
      </div>
    </div>
  );
}

function MapVisual() {
  const reduced = useReducedMotion();
  const points = [
    { x: 22, y: 28, label: "Сочи" },
    { x: 60, y: 18, label: "Алтай" },
    { x: 78, y: 60, label: "Карелия" },
    { x: 38, y: 70, label: "Дагестан" },
  ];
  return (
    <div className="relative h-full">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-50"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {points.map((p, i) => {
          const next = points[(i + 1) % points.length];
          return (
            <line
              key={`l-${i}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="rgba(0, 231, 253, 0.6)"
              strokeWidth="0.5"
              strokeDasharray="2 2"
            />
          );
        })}
      </svg>
      {points.map((p, i) => (
        <motion.div
          key={p.label}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...baseTransition, delay: i * 0.08 }}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-blue)]">
            <MapPin className="h-4 w-4 text-white" />
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-md">
            {p.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ResultsVisual() {
  const reduced = useReducedMotion();
  const items = [
    { v: "−40%", l: "нагрузка на менеджеров" },
    { v: "×3", l: "скорость ответа клиенту" },
    { v: "+18%", l: "конверсия в заявку" },
    { v: "24/7", l: "обработка обращений" },
  ];
  return (
    <div className="grid h-full grid-cols-2 gap-3">
      {items.map((it, i) => (
        <motion.div
          key={it.v}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...baseTransition, delay: i * 0.06 }}
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-4 text-white"
        >
          <Star className="h-4 w-4 text-sky" />
          <p className="mt-2 text-3xl font-black tracking-tight text-white">
            {it.v}
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-100/85">{it.l}</p>
        </motion.div>
      ))}
    </div>
  );
}

function BadgesVisual() {
  const reduced = useReducedMotion();
  const badges = [
    "ТПП РФ",
    "РСТ",
    "МГИМО",
    "РЭУ",
    "Минск 2025",
    "Сочи 2025",
    "Конгресс СНГ",
    "Анекс",
  ];
  return (
    <div className="flex h-full flex-wrap content-center items-center justify-center gap-2.5 p-2">
      {badges.map((b, i) => (
        <motion.span
          key={b}
          initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...baseTransition, delay: i * 0.04 }}
          className="rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur-md"
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
}

function ChannelsVisual() {
  const reduced = useReducedMotion();
  const channels = [
    { Icon: Phone, label: "Телефон" },
    { Icon: MessageSquare, label: "Чат" },
    { Icon: Bot, label: "AI" },
    { Icon: Store, label: "Офис" },
  ];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-bold text-white">
        Один контекст → любой канал
      </span>
      <div className="grid grid-cols-2 gap-3">
        {channels.map((c, i) => (
          <motion.div
            key={c.label}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...baseTransition, delay: i * 0.06 }}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-white"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent">
              <c.Icon className="h-4 w-4 text-white" />
            </span>
            <span className="text-sm font-bold">{c.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CompassVisual() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <motion.div
        animate={reduced ? { rotate: 0 } : { rotate: 360 }}
        transition={{
          duration: 24,
          ease: "linear",
          repeat: reduced ? 0 : Infinity,
        }}
        className="grid h-32 w-32 place-items-center rounded-full border border-sky/40 bg-gradient-to-br from-primary/30 to-accent/30"
      >
        <Compass className="h-14 w-14 text-sky" />
      </motion.div>
      <p className="max-w-[16rem] text-center text-sm font-semibold text-blue-100">
        AI-интегратор для туризма с фокусом на безопасное внедрение
      </p>
    </div>
  );
}
