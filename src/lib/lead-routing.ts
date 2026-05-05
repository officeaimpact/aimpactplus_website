import type { LeadInput } from "./lead-schema";
import { classifyLead } from "./lead-schema";
import { site } from "./site-data";

type RoutingResult = {
  channel: "web3forms" | "telegram" | "crm" | "fallback";
  ok: boolean;
  detail?: string;
};

const FALLBACK_EMAIL =
  process.env.LEADS_FALLBACK_EMAIL?.trim() || "lids@aimpact.ru";

/** Человеко-читабельная сводка заявки — попадает в тело письма / Telegram. */
function summary(input: LeadInput) {
  const leadClass = classifyLead(input);
  const receivedAt = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "short",
    timeStyle: "short",
  });

  const utm = [
    input.utm_source && `source=${input.utm_source}`,
    input.utm_medium && `medium=${input.utm_medium}`,
    input.utm_campaign && `campaign=${input.utm_campaign}`,
    input.utm_term && `term=${input.utm_term}`,
    input.utm_content && `content=${input.utm_content}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const lines = [
    `🆕 Новая заявка с ${site.domainDisplay}`,
    `Получено: ${receivedAt} (МСК)`,
    `Класс лида: ${leadClass.toUpperCase()}`,
    "",
    "— Контакт —",
    `Имя: ${input.name}`,
    input.email ? `Email: ${input.email}` : "Email: —",
    input.phone ? `Телефон / мессенджер: ${input.phone}` : "Телефон: —",
    "",
    "— Заявка —",
    `Цель: ${input.intent}`,
    input.companyType ? `Тип компании: ${input.companyType}` : "",
    input.company ? `Компания: ${input.company}` : "",
    input.region ? `Регион: ${input.region}` : "",
    input.task ? `Задача: ${input.task}` : "",
    input.scale ? `Масштаб: ${input.scale}` : "",
    input.timeline ? `Срок: ${input.timeline}` : "",
    input.channel ? `Предпочтительный канал: ${input.channel}` : "",
    input.context ? `\nКонтекст:\n${input.context}` : "",
    "",
    "— Источник —",
    `Страница: ${input.sourcePath ?? "/"}`,
    input.referrer ? `Реферер: ${input.referrer}` : "",
    utm ? `UTM: ${utm}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

/** Краткая тема письма — чтобы быстро ориентироваться в инбоксе. */
function subjectFor(input: LeadInput) {
  const parts = [
    `[${site.brand}]`,
    input.intent,
    input.companyType,
    input.name,
  ]
    .filter(Boolean)
    .map((s) => String(s).trim())
    .filter((s) => s.length > 0);
  return parts.join(" · ").slice(0, 160);
}

async function sendWeb3Forms(input: LeadInput): Promise<RoutingResult> {
  // На Free-плане Web3Forms принимает запросы только из браузера; основная
  // отправка идёт с клиента (см. src/lib/web3forms-client.ts).
  // Серверный канал включается только для Pro-плана через WEB3FORMS_ACCESS_KEY.
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { channel: "web3forms", ok: false, detail: "client-side" };
  }
  try {
    const text = summary(input);
    const fd = new FormData();
    fd.append("access_key", accessKey);
    fd.append("subject", subjectFor(input));
    fd.append("from_name", `${site.brand} · сайт ${site.domainDisplay}`);
    fd.append("name", input.name);
    // Web3Forms ставит Reply-To = email из этого поля.
    // Если клиент не оставил email — указываем fallback, иначе письмо может
    // отлететь по политике провайдера получателя.
    fd.append("email", input.email && input.email.length > 0 ? input.email : FALLBACK_EMAIL);
    if (input.email) fd.append("replyto", input.email);
    if (input.phone) fd.append("phone", input.phone);
    fd.append("intent", input.intent);
    if (input.companyType) fd.append("company_type", input.companyType);
    if (input.company) fd.append("company", input.company);
    if (input.context) fd.append("context", input.context);
    if (input.sourcePath) fd.append("source_path", input.sourcePath);
    fd.append("lead_class", classifyLead(input));
    fd.append("message", text);
    // Web3Forms honeypot
    fd.append("botcheck", input.website ?? "");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    return {
      channel: "web3forms",
      ok: res.ok,
      detail: res.ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      channel: "web3forms",
      ok: false,
      detail: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

async function sendTelegram(input: LeadInput): Promise<RoutingResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    return { channel: "telegram", ok: false, detail: "no creds" };
  }
  try {
    const text = summary(input);
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return {
      channel: "telegram",
      ok: res.ok,
      detail: res.ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      channel: "telegram",
      ok: false,
      detail: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

async function sendCrmWebhook(input: LeadInput): Promise<RoutingResult> {
  const url = process.env.CRM_WEBHOOK_URL;
  if (!url) {
    return { channel: "crm", ok: false, detail: "no url" };
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        leadClass: classifyLead(input),
        receivedAt: new Date().toISOString(),
      }),
    });
    return {
      channel: "crm",
      ok: res.ok,
      detail: res.ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      channel: "crm",
      ok: false,
      detail: err instanceof Error ? err.message : "fetch failed",
    };
  }
}

export async function routeLead(input: LeadInput) {
  const tasks = await Promise.allSettled([
    sendWeb3Forms(input),
    sendTelegram(input),
    sendCrmWebhook(input),
  ]);

  const results: RoutingResult[] = tasks.map((t) =>
    t.status === "fulfilled"
      ? t.value
      : {
          channel: "fallback",
          ok: false,
          detail: t.reason instanceof Error ? t.reason.message : "rejected",
        },
  );

  const anyOk = results.some((r) => r.ok);

  // Always log to server console as a fallback (preview mode without secrets)
  if (!anyOk) {
    console.info("[lead] preview-mode submission:", summary(input));
  }

  return {
    ok: true,
    delivered: anyOk,
    results,
    leadClass: classifyLead(input),
  };
}
