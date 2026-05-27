"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  getMetrikaId,
  trackGoal,
  trackGoalOnce,
} from "@/lib/analytics";

/**
 * Клиентская часть аналитики:
 * - на каждой SPA-навигации шлём `ym('hit', url)` — иначе Метрика
 *   засчитает только первый просмотр после полной загрузки страницы;
 * - наблюдаем за вертикальным скроллом и при пересечении 75% длины
 *   страницы шлём цель `scroll_75` (один раз на URL).
 */
function AnalyticsClientInner() {
  const id = getMetrikaId();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!id) return;
    if (typeof window === "undefined") return;
    if (typeof window.ym !== "function") return;
    const search = searchParams?.toString();
    const url = `${pathname}${search ? `?${search}` : ""}`;
    try {
      window.ym(Number(id), "hit", url, {
        referer: document.referrer || undefined,
      });
    } catch {
      // Метрика не критична для UX
    }

    // Маркетинговые цели на pageview по сегментам контента.
    // Раз-в-сессию дедуп через trackGoalOnce — иначе при возврате назад
    // одна и та же страница будет считаться повторно.
    if (!pathname) return;
    if (pathname === "/navilet-ai") {
      trackGoalOnce("navilet_open", pathname, { path: pathname });
    } else if (pathname.startsWith("/cases/") && pathname.length > "/cases/".length) {
      const slug = pathname.split("/")[2] ?? "";
      trackGoal("case_open", { slug, path: pathname });
    }
  }, [id, pathname, searchParams]);

  useEffect(() => {
    if (!id) return;
    if (typeof window === "undefined") return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrolled = window.scrollY + window.innerHeight;
        const fullHeight = doc.scrollHeight;
        if (fullHeight <= 0) return;
        const ratio = scrolled / fullHeight;
        if (ratio >= 0.75) {
          trackGoalOnce("scroll_75", window.location.pathname, {
            path: window.location.pathname,
          });
        }
        // blog_read — пользователь дочитал блог/гайд почти до конца.
        // Точнее, чем scroll_75, и применяется только к статьям.
        if (ratio >= 0.9) {
          const path = window.location.pathname;
          if (
            path.startsWith("/blog/") ||
            path.startsWith("/guides/")
          ) {
            const slug = path.split("/")[2] ?? "";
            trackGoalOnce("blog_read", path, { slug, path });
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [id, pathname]);

  return null;
}

/**
 * Wrap в Suspense — useSearchParams() в Next App Router требует Suspense boundary.
 */
export function AnalyticsClient() {
  return (
    <Suspense fallback={null}>
      <AnalyticsClientInner />
    </Suspense>
  );
}
