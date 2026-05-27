"use client";

import { useEffect } from "react";
import { trackGoal } from "@/lib/analytics";

/**
 * Глобальный авто-трекер кликов по ключевым элементам.
 * Слушаем clicks на всём документе через делегирование, чтобы не цеплять
 * каждый компонент отдельно.
 *
 * Сейчас покрываем:
 * - phone_click — клик по любым tel: ссылкам
 * - email_click — клик по mailto: ссылкам
 * - demo_click — клик по ссылкам на /navilet-ai (CTA «Смотреть демо», «Открыть Навылет», и т.п.)
 *
 * Если на элементе есть атрибут `data-analytics-skip`, событие не отправляется.
 */
export function EventTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const onClick = (ev: MouseEvent) => {
      const target = ev.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      if (anchor.dataset.analyticsSkip === "true") return;
      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        trackGoal("phone_click", { value: href.replace("tel:", "") });
        return;
      }
      if (href.startsWith("mailto:")) {
        trackGoal("email_click", { value: href.replace("mailto:", "") });
        return;
      }
      // Демо «Навылет! AI» — любая внутренняя ссылка на /navilet-ai.
      // Главная цель — поймать клики из CTA «Смотреть Навылет», «Открыть демо», и т.п.
      if (
        href === "/navilet-ai" ||
        href.startsWith("/navilet-ai?") ||
        href.startsWith("/navilet-ai#")
      ) {
        trackGoal("demo_click", { source: window.location.pathname });
        return;
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
