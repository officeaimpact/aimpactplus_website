/**
 * Тонкая обёртка над Яндекс.Метрикой (и GTM/GA, если они подключены).
 * Используется по всему сайту как единая точка отправки событий.
 *
 * - `track(event, params)` — событие любого типа (legacy: используется
 *   в LeadForm/LeadFormModal для подробных шагов формы). Отправляется
 *   в dataLayer, gtag и ym.reachGoal одновременно — куда подключено,
 *   туда и долетит.
 * - `trackGoal(goal, params)` — типизированный helper для конкретных
 *   маркетинговых целей сайта (form_open, scroll_75, phone_click, ...).
 *
 * Безопасно на SSR (на сервере молча no-op) и без счётчиков.
 */

/** Legacy события из формы заявки. Сохранены для обратной совместимости. */
type EventName =
  | "lead_form_view"
  | "lead_form_start"
  | "lead_step_1"
  | "lead_step_2"
  | "lead_step_3"
  | "lead_step_4"
  | "lead_submit_success"
  | "lead_submit_error"
  | "lead_modal_open"
  | "lead_modal_close"
  | "lead_cta_click";

type Params = Record<string, string | number | boolean | undefined>;

/** Маркетинговые цели сайта (отправляются как ym.reachGoal). */
export type AnalyticsGoal =
  | "form_open"
  | "form_submit"
  | "phone_click"
  | "email_click"
  | "demo_click"
  | "scroll_75"
  | "navilet_open"
  | "case_open"
  | "blog_read"
  | "pilot_intent_moscow"
  | "pilot_intent_spb"
  | "pilot_intent_sochi";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (id: number | string, action: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    /** Антидубль для trackGoalOnce. */
    __aimpactSentGoals?: Set<string>;
  }
}

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export function getMetrikaId(): string | undefined {
  return YM_ID && YM_ID.length > 0 ? YM_ID : undefined;
}

/**
 * Legacy: отправляет произвольное событие в dataLayer + gtag + ym.reachGoal.
 * Используется в формах и legacy CTA.
 */
export function track(event: EventName, params: Params = {}) {
  if (typeof window === "undefined") return;
  const safe = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  );
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event, ...safe });
    if (typeof window.gtag === "function") {
      window.gtag("event", event, safe);
    }
    const ymId = getMetrikaId();
    if (ymId && typeof window.ym === "function") {
      window.ym(Number(ymId), "reachGoal", event, safe);
    }
  } catch {
    // analytics errors must never break UX
  }
}

/** Безопасный вызов маркетинговой цели. Можно дёргать прямо из onClick. */
export function trackGoal(
  goal: AnalyticsGoal,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const id = getMetrikaId();
  if (!id) return;
  if (typeof window.ym !== "function") return;
  try {
    window.ym(Number(id), "reachGoal", goal, params);
    // Параллельно в dataLayer — на случай, если позже подключим GTM/GA.
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: goal, ...(params ?? {}) });
  } catch {
    // глушим — Метрика не критична
  }
}

/**
 * Отправляет цель один раз за сессию (например, scroll_75 на странице).
 * Дедуп — по строке `goal:key`, где key обычно URL или slug.
 */
export function trackGoalOnce(
  goal: AnalyticsGoal,
  key: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  const dedup = `${goal}:${key}`;
  if (!window.__aimpactSentGoals) window.__aimpactSentGoals = new Set();
  if (window.__aimpactSentGoals.has(dedup)) return;
  window.__aimpactSentGoals.add(dedup);
  trackGoal(goal, params);
}

export function getTrackingMeta() {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const utm = (key: string) => url.searchParams.get(key) ?? undefined;
  return {
    sourcePath: url.pathname + url.search,
    referrer: document.referrer || undefined,
    utm_source: utm("utm_source"),
    utm_medium: utm("utm_medium"),
    utm_campaign: utm("utm_campaign"),
    utm_term: utm("utm_term"),
    utm_content: utm("utm_content"),
  };
}
