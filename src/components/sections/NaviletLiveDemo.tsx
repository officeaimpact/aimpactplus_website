"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Car,
  Flame,
  Globe,
  HelpCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import DemoWidget from "@/components/DemoWidget";
import { demoScenarios, type DemoScenario } from "@/lib/scenarios";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportOnce,
} from "@/lib/animations";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { cn } from "@/lib/cn";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Flame,
  Building2,
  Car,
  HelpCircle,
  Phone,
};

export function NaviletLiveDemo() {
  const [active, setActive] = useState<DemoScenario>(demoScenarios[0]);
  const [replayKey, setReplayKey] = useState(0);

  const handleClick = (scenario: DemoScenario) => {
    if (active.id === scenario.id) {
      setReplayKey((k) => k + 1);
    } else {
      setActive(scenario);
    }
  };

  return (
    <SectionWrapper
      eyebrow="Live demo"
      title="Демонстрация AI-турменеджера"
      description="Выберите сценарий — и посмотрите, как AI обрабатывает реальные запросы клиентов: подбор, горящие, конкретный отель, без перелёта, FAQ и связь с менеджером."
      alt
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-8 lg:grid-cols-[minmax(0,440px)_minmax(0,1fr)] lg:gap-10"
      >
        <motion.div variants={slideInLeft} className="order-2 min-w-0 lg:order-1">
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/10 to-sky/10 blur-2xl" />
            <DemoWidget
              key={`${active.id}-${replayKey}`}
              scenario={active}
              className="relative"
            />
          </div>
          <p className="mx-auto mt-4 max-w-[440px] text-center text-[11px] leading-5 text-muted">
            Подбор и карточки туров — на базе{" "}
            <span className="font-semibold text-heading">
              поисковой системы Tourvisor
            </span>
            . Цены, наличие и фото отелей подтягиваются из её актуальной выдачи.
          </p>
        </motion.div>

        <motion.div variants={slideInRight} className="order-1 min-w-0 lg:order-2">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {demoScenarios.map((s) => {
              const Icon = iconMap[s.icon] ?? Globe;
              const isActive = active.id === s.id;
              return (
                <motion.button
                  key={s.id}
                  variants={fadeInUp}
                  type="button"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(s)}
                  className={cn(
                    "group flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition",
                    isActive
                      ? "border-accent/40 bg-gradient-to-r from-accent/10 to-sky/5 shadow-md"
                      : "border-transparent bg-white shadow-[var(--shadow-soft)] hover:border-accent/20",
                  )}
                >
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-2xl transition",
                      isActive
                        ? "bg-gradient-to-br from-primary to-accent text-white shadow-md"
                        : "bg-blue-ice text-accent group-hover:bg-accent/10",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p
                      className={cn(
                        "text-sm font-bold",
                        isActive ? "text-accent" : "text-heading",
                      )}
                    >
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-muted">
                      {s.subtitle}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 shadow-[var(--shadow-soft)]"
          >
            <p className="text-sm leading-6 text-body">
              <span className="font-bold text-heading">
                Это сокращённая демонстрация.
              </span>{" "}
              В рабочей версии AI-ассистент общается ещё детальнее, подключён
              к реальной базе туроператоров и показывает актуальные цены.
              Виджет встраивается на ваш сайт одной строкой кода.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
