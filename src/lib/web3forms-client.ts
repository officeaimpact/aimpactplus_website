"use client";

import { site } from "@/lib/site-data";

/**
 * Клиентская отправка заявки в Web3Forms.
 *
 * Free-план Web3Forms принимает запросы только из браузера, поэтому мы
 * отправляем заявку напрямую с клиента. Серверная сторона (`/api/leads`)
 * параллельно делает валидацию, honeypot и rate-limit — без неё клиентский
 * запрос не вызывается.
 *
 * Ключ публичный (NEXT_PUBLIC_*) — это нормально, он работает как
 * идентификатор формы, а не как секрет. Защита от спама делается на стороне
 * web3forms.com (allowed-домены, honeypot, лимиты).
 */
export type Web3FormsPayload = {
  name: string;
  email?: string;
  phone?: string;
  intent: string;
  companyType?: string;
  context?: string;
  sourcePath?: string;
  /** honeypot — пустая строка для людей */
  website?: string;
};

const FALLBACK_REPLY_TO = "lids@aimpact.ru";

function buildMessage(input: Web3FormsPayload) {
  const receivedAt = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "short",
    timeStyle: "short",
  });

  const lines = [
    `🆕 Новая заявка с ${site.domainDisplay}`,
    `Получено: ${receivedAt} (МСК)`,
    "",
    "— Контакт —",
    `Имя: ${input.name}`,
    input.email ? `Email: ${input.email}` : "Email: —",
    input.phone ? `Телефон / мессенджер: ${input.phone}` : "Телефон: —",
    "",
    "— Заявка —",
    `Цель: ${input.intent}`,
    input.companyType ? `Направление: ${input.companyType}` : "",
    input.context ? `\nКонтекст:\n${input.context}` : "",
    "",
    "— Источник —",
    `Страница: ${input.sourcePath ?? "/"}`,
    typeof window !== "undefined" ? `URL: ${window.location.href}` : "",
  ];
  return lines.filter(Boolean).join("\n");
}

function buildSubject(input: Web3FormsPayload) {
  return [`[${site.brand}]`, input.intent, input.companyType, input.name]
    .filter(Boolean)
    .map((s) => String(s).trim())
    .filter(Boolean)
    .join(" · ")
    .slice(0, 160);
}

export async function submitToWeb3Forms(input: Web3FormsPayload): Promise<{
  ok: boolean;
  detail?: string;
}> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return { ok: false, detail: "no key" };

  try {
    const fd = new FormData();
    fd.append("access_key", accessKey);
    fd.append("subject", buildSubject(input));
    fd.append("from_name", `${site.brand} · сайт ${site.domainDisplay}`);
    fd.append("name", input.name);
    fd.append(
      "email",
      input.email && input.email.length > 0 ? input.email : FALLBACK_REPLY_TO,
    );
    if (input.email) fd.append("replyto", input.email);
    if (input.phone) fd.append("phone", input.phone);
    fd.append("intent", input.intent);
    if (input.companyType) fd.append("company_type", input.companyType);
    if (input.context) fd.append("context", input.context);
    if (input.sourcePath) fd.append("source_path", input.sourcePath);
    fd.append("message", buildMessage(input));
    fd.append("botcheck", input.website ?? "");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    if (!res.ok) {
      return { ok: false, detail: `HTTP ${res.status}` };
    }
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };
    return data.success
      ? { ok: true }
      : { ok: false, detail: data.message ?? "unknown" };
  } catch (err) {
    return {
      ok: false,
      detail: err instanceof Error ? err.message : "fetch failed",
    };
  }
}
