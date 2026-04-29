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

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    ym?: (id: number | string, action: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

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
    const ymId = process.env.NEXT_PUBLIC_YM_ID;
    if (ymId && typeof window.ym === "function") {
      window.ym(Number(ymId), "reachGoal", event, safe);
    }
  } catch {
    // analytics errors must never break UX
  }
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
