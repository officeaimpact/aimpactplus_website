"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { LeadForm } from "./LeadForm";
import { leadIntents } from "@/lib/site-data";

function resolveIntent(raw: string | null): string | undefined {
  if (!raw) return undefined;
  if ((leadIntents as readonly string[]).includes(raw)) return raw;
  if (raw === "demo") return "Запросить демо Навылет! AI";
  return undefined;
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
