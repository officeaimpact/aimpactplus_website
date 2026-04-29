import type { LeadInput } from "./lead-schema";
import { classifyLead } from "./lead-schema";
import { site } from "./site-data";

type RoutingResult = {
  channel: "web3forms" | "telegram" | "crm" | "fallback";
  ok: boolean;
  detail?: string;
};

function summary(input: LeadInput) {
  const lines = [
    `🆕 Заявка с ${site.domainDisplay}`,
    `Цель: ${input.intent}`,
    input.company ? `Компания: ${input.company} (${input.companyType ?? "—"})` : "",
    input.region ? `Регион: ${input.region}` : "",
    input.task ? `Задача: ${input.task}` : "",
    input.scale ? `Масштаб: ${input.scale}` : "",
    input.timeline ? `Срок: ${input.timeline}` : "",
    input.channel ? `Канал: ${input.channel}` : "",
    input.context ? `\nКонтекст:\n${input.context}` : "",
    "",
    `Имя: ${input.name}`,
    input.email ? `Email: ${input.email}` : "",
    input.phone ? `Телефон/мессенджер: ${input.phone}` : "",
    "",
    `Источник: ${input.sourcePath ?? "/"}`,
    input.referrer ? `Реферер: ${input.referrer}` : "",
    [
      input.utm_source && `utm_source=${input.utm_source}`,
      input.utm_medium && `utm_medium=${input.utm_medium}`,
      input.utm_campaign && `utm_campaign=${input.utm_campaign}`,
    ]
      .filter(Boolean)
      .join(" · "),
    `Класс лида: ${classifyLead(input)}`,
  ];
  return lines.filter(Boolean).join("\n");
}

async function sendWeb3Forms(input: LeadInput): Promise<RoutingResult> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { channel: "web3forms", ok: false, detail: "no key" };
  }
  try {
    const text = summary(input);
    const fd = new FormData();
    fd.append("access_key", accessKey);
    fd.append("subject", `Заявка с ${site.domainDisplay}: ${input.intent}`);
    fd.append("from_name", site.brand);
    fd.append("name", input.name);
    if (input.email) fd.append("email", input.email);
    fd.append("message", text);
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
