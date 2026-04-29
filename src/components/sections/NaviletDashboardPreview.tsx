"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bot,
  CheckCircle2,
  LayoutDashboard,
  MessageSquare,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

type TabId = "overview" | "analytics" | "conversations" | "widget";

const tabs: { id: TabId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "analytics", label: "Аналитика", icon: BarChart3 },
  { id: "conversations", label: "Диалоги", icon: MessageSquare },
  { id: "widget", label: "Виджет", icon: Settings2 },
];

export function NaviletDashboardPreview() {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <SectionWrapper
      eyebrow="Личный кабинет"
      title="Контроль AI-ассистента и заявок в едином дашборде"
      description="Видите, что отвечает AI, какие заявки приходят, какая воронка по каналам и какие сценарии стоит дорабатывать. Без чтения кода и обращений в поддержку."
    >
      <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-blue-100 bg-surface-alt px-5 py-3 sm:px-7">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
              <Bot className="h-4 w-4" />
            </span>
            <span className="text-sm font-black text-heading">
              Навылет! AI · Кабинет клиента
            </span>
          </div>
          <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 sm:inline-flex">
            <span className="mr-1.5 h-1.5 w-1.5 self-center rounded-full bg-emerald-500" />
            Online
          </span>
        </div>

        <div
          role="tablist"
          aria-label="Разделы личного кабинета"
          className="flex flex-wrap gap-1 border-b border-blue-100 bg-white px-2 py-2 sm:px-4"
        >
          {tabs.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => setActive(t.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-bold transition",
                  isActive
                    ? "bg-blue-ice text-primary"
                    : "text-body hover:bg-blue-50 hover:text-primary",
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="bg-surface-alt p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {active === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 lg:grid-cols-3"
              >
                <KpiCard
                  icon={<MessageSquare className="h-5 w-5 text-primary" />}
                  label="Диалоги за неделю"
                  value="1 248"
                  trend={{ direction: "up", value: "+18%" }}
                />
                <KpiCard
                  icon={<Sparkles className="h-5 w-5 text-primary" />}
                  label="Подобрано туров"
                  value="312"
                  trend={{ direction: "up", value: "+24%" }}
                />
                <KpiCard
                  icon={<Users className="h-5 w-5 text-primary" />}
                  label="Передано менеджерам"
                  value="74"
                  trend={{ direction: "up", value: "+9%" }}
                />
                <div className="card lg:col-span-3">
                  <h4 className="text-sm font-black uppercase tracking-[0.16em] text-primary">
                    Источник обращений
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {[
                      { label: "Сайт / Web-виджет", value: 58 },
                      { label: "Telegram", value: 22 },
                      { label: "WhatsApp", value: 12 },
                      { label: "VK / MAX", value: 8 },
                    ].map((row) => (
                      <li key={row.label} className="text-sm">
                        <div className="flex items-center justify-between font-semibold text-heading">
                          <span>{row.label}</span>
                          <span>{row.value}%</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-blue-50">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                            style={{ width: `${row.value}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {active === "analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 lg:grid-cols-3"
              >
                <KpiCard
                  icon={<BarChart3 className="h-5 w-5 text-primary" />}
                  label="Конверсия в заявку"
                  value="14.6%"
                  trend={{ direction: "up", value: "+3.2 п.п." }}
                />
                <KpiCard
                  icon={<MessageSquare className="h-5 w-5 text-primary" />}
                  label="Среднее время ответа"
                  value="1.4 c"
                  trend={{ direction: "down", value: "−40%" }}
                />
                <KpiCard
                  icon={<Sparkles className="h-5 w-5 text-primary" />}
                  label="CSAT диалогов"
                  value="4.7 / 5"
                  trend={{ direction: "up", value: "+0.4" }}
                />
                <div className="card lg:col-span-3">
                  <h4 className="text-sm font-black uppercase tracking-[0.16em] text-primary">
                    Топ-направления подбора
                  </h4>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                      { c: "Турция", v: "32%" },
                      { c: "ОАЭ", v: "21%" },
                      { c: "Египет", v: "18%" },
                      { c: "Россия", v: "16%" },
                    ].map((row) => (
                      <div
                        key={row.c}
                        className="rounded-2xl border border-blue-100 bg-surface-alt p-4"
                      >
                        <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">
                          {row.c}
                        </p>
                        <p className="mt-2 text-2xl font-black text-heading">
                          {row.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {active === "conversations" && (
              <motion.div
                key="conversations"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {[
                  {
                    name: "Анна П.",
                    last: "Хочу в Турцию на море",
                    state: "AI ведёт диалог",
                    status: "active",
                  },
                  {
                    name: "Игорь К.",
                    last: "Подобрано 3 тура · ждёт оператора",
                    state: "Передан менеджеру",
                    status: "handoff",
                  },
                  {
                    name: "Семья Ивановых",
                    last: "FAQ по визам и питанию",
                    state: "FAQ обработан",
                    status: "done",
                  },
                  {
                    name: "ООО «Турклуб»",
                    last: "Запрос B2B по горящим",
                    state: "AI запросил детали",
                    status: "active",
                  },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between rounded-2xl border border-blue-100 bg-white p-4 shadow-[var(--shadow-soft)]"
                  >
                    <div>
                      <p className="text-sm font-black text-heading">
                        {row.name}
                      </p>
                      <p className="mt-0.5 text-sm text-body">{row.last}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-bold",
                        row.status === "active" &&
                          "bg-blue-ice text-primary",
                        row.status === "handoff" &&
                          "bg-amber-50 text-amber-700",
                        row.status === "done" &&
                          "bg-emerald-50 text-emerald-700",
                      )}
                    >
                      {row.state}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {active === "widget" && (
              <motion.div
                key="widget"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid gap-4 lg:grid-cols-2"
              >
                <div className="card">
                  <h4 className="text-sm font-black uppercase tracking-[0.16em] text-primary">
                    Бренд виджета
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {[
                      "Палитра, типографика и логотип",
                      "Тон голоса и приветствие AI",
                      "Шаблоны карточек туров",
                      "Сценарии передачи менеджеру",
                    ].map((line) => (
                      <li
                        key={line}
                        className="flex gap-2 text-sm leading-6 text-body"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card flex flex-col gap-3 bg-deep text-white">
                  <h4 className="text-sm font-black uppercase tracking-[0.16em] text-sky">
                    Установка на сайт
                  </h4>
                  <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-[11px] leading-5 text-blue-100">
                    {`<script
  src="https://navilet.ai/widget.js"
  data-tenant="your-agency"
  defer
></script>`}
                  </pre>
                  <p className="text-xs leading-5 text-blue-100/85">
                    Одной строкой кода. Виджет конфигурируется из этого
                    кабинета без изменений на сайте.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}

function KpiCard({
  icon,
  label,
  value,
  trend,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: { direction: "up" | "down"; value: string };
}) {
  const Icon = trend.direction === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-ice">
          {icon}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-0.5 rounded-full px-2.5 py-1 text-xs font-bold",
            trend.direction === "up"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-blue-50 text-primary",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {trend.value}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
          {label}
        </p>
        <p className="mt-1.5 text-2xl font-black text-heading">{value}</p>
      </div>
    </div>
  );
}
