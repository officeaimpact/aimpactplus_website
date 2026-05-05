"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LeadForm } from "./LeadForm";
import { leadIntents } from "@/lib/site-data";

function resolveIntent(raw: string | null): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  // Алиасы для коротких ссылок:
  if (trimmed === "demo") return "Запросить демо Навылет! AI";
  if (trimmed === "navilet-partner") return "Партнёрство по Навылет! AI";
  // Если входит в стандартный список — оставляем как есть.
  if ((leadIntents as readonly string[]).includes(trimmed)) return trimmed;
  // Иначе — это произвольный intent (например, "Заявка на услугу: AI-аналитика").
  // Ограничим длину, чтобы не было XSS/перегруза формы.
  return trimmed.slice(0, 160);
}

function ContactFormInner() {
  const params = useSearchParams();
  const intent = resolveIntent(params.get("intent"));
  return <LeadForm variant="page" initialIntent={intent} />;
}

export function ContactPageClient() {
  return (
    <Suspense fallback={null}>
      <ContactFormInner />
    </Suspense>
  );
}
