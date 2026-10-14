import Script from "next/script";

/** Ключ согласия на cookies — тот же, что пишет CookieConsent. */
export const COOKIE_CONSENT_KEY = "aimpact-tourism-cookie-consent";
/** Событие, которое CookieConsent шлёт при выборе в баннере. */
export const COOKIE_CONSENT_EVENT = "aimpact:cookie-consent";

/**
 * Счётчики стартуют только у живого посетителя и только с согласия.
 *
 * Аудит логов 14.10.2026: ~46 ботов в день из IPv6-прокси и VPS исполняли JS,
 * открывали главную и уходили за 0 секунд. Метрика с afterInteractive
 * считала их визитами (прямые заходы, отказ 100%) и портила поведенческие.
 * Теперь загрузка ждёт первого действия человека (скролл, касание, клик,
 * клавиша, движение мыши) или 8 секунд на видимой вкладке. Выбор «Только
 * необходимые» в баннере cookies отключает аналитику полностью.
 */
const gateScript = (loaders: string, ymId?: string, gaId?: string) => `
(function () {
  var KEY = ${JSON.stringify(COOKIE_CONSENT_KEY)};
  var EVT = ${JSON.stringify(COOKIE_CONSENT_EVENT)};
  function declined() {
    try { return localStorage.getItem(KEY) === "declined"; } catch (e) { return false; }
  }
  var started = false;
  var events = ["scroll", "pointerdown", "touchstart", "keydown", "mousemove", "wheel"];
  var timer = null;
  function stop() {
    events.forEach(function (e) { window.removeEventListener(e, start, { passive: true }); });
    document.removeEventListener("visibilitychange", arm);
    if (timer) clearTimeout(timer);
  }
  function start(ev) {
    // Нажатие в баннере cookies — это ответ на вопрос о согласии, а не повод
    // включать аналитику: решает само событие выбора (ниже).
    var t = ev && ev.target;
    if (t && t.closest && t.closest("[data-cookie-consent]")) return;
    if (started || declined()) return;
    started = true;
    stop();
    ${loaders}
  }
  function arm() {
    if (timer) { clearTimeout(timer); timer = null; }
    if (document.visibilityState === "visible") timer = setTimeout(start, 8000);
  }
  if (declined()) return;
  events.forEach(function (e) { window.addEventListener(e, start, { passive: true }); });
  document.addEventListener("visibilitychange", arm);
  arm();
  window.addEventListener(EVT, function (ev) {
    if (ev.detail === "declined") {
      started = true;
      stop();
      // Счётчик мог стартовать от движения мыши к баннеру — штатно глушим отправку.
      ${ymId ? `window["disableYaCounter${ymId}"] = true;` : ""}
      ${gaId ? `window["ga-disable-${gaId}"] = true;` : ""}
    } else start();
  });
})();
`;

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  if (!gaId && !ymId) return null;

  const ga = gaId
    ? `
    (function () {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=${gaId}";
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", "${gaId}", { anonymize_ip: true });
    })();`
    : "";

  // Метрика грузится только как tag.js?id=<ID> — без ?id= счётчик молчит.
  const ym = ymId
    ? `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${ymId}", "ym");
    ym(${ymId}, "init", {
      ssr: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      defer: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href
    });
    // defer: true — просмотры шлёт AnalyticsClient на навигациях; первый
    // просмотр отправляем здесь: к моменту запуска счётчика он уже прошёл.
    ym(${ymId}, "hit", location.pathname + location.search, { referer: document.referrer || undefined });`
    : "";

  return (
    <Script
      id="analytics-gate"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: gateScript(ga + ym, ymId, gaId) }}
    />
  );
}
