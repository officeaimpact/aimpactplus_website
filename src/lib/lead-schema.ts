import { z } from "zod";

const trimmed = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Максимум ${max} символов`);

export const leadSchema = z.object({
  name: trimmed(120).min(2, "Укажите имя"),
  email: trimmed(160).email("Проверьте email").or(z.literal("")).optional(),
  phone: trimmed(40).optional(),
  intent: trimmed(120).min(2, "Выберите цель обращения"),
  company: trimmed(160).optional(),
  companyType: trimmed(80).optional(),
  region: trimmed(120).optional(),
  context: trimmed(2000).optional(),
  task: trimmed(120).optional(),
  scale: trimmed(160).optional(),
  timeline: trimmed(120).optional(),
  channel: trimmed(120).optional(),
  consent: z.literal(true, {
    message: "Нужно согласие на обработку данных",
  }),
  // metadata + anti-spam
  website: trimmed(200).optional(), // honeypot
  sourcePath: trimmed(400).optional(),
  referrer: trimmed(400).optional(),
  utm_source: trimmed(120).optional(),
  utm_medium: trimmed(120).optional(),
  utm_campaign: trimmed(120).optional(),
  utm_term: trimmed(120).optional(),
  utm_content: trimmed(120).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const leadStepSchemas = [
  leadSchema.pick({ name: true, email: true, phone: true, intent: true }),
  leadSchema.pick({ company: true, companyType: true, region: true, context: true }),
  leadSchema.pick({ task: true, scale: true, timeline: true, channel: true }),
  leadSchema.pick({ consent: true }),
] as const;

export function classifyLead(input: LeadInput): "hot" | "warm" | "cold" {
  const timeline = (input.timeline ?? "").toLowerCase();
  if (timeline.includes("быстр")) return "hot";
  if (timeline.includes("месяц") || timeline.includes("квартал"))
    return "warm";
  return "cold";
}
