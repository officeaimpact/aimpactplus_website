"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { faq } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

type FAQItem = { question: string; answer: string };

type FAQSectionProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
  /** Кастомный массив вопросов. По умолчанию — общий site-data.faq. */
  items?: ReadonlyArray<FAQItem>;
  /** Заголовок секции. */
  title?: string;
  /** Подзаголовок-описание. */
  description?: string;
  /** Eyebrow (метка над заголовком). */
  eyebrow?: string;
};

const DEFAULT_TITLE = "Короткие ответы на вопросы клиентов";
const DEFAULT_DESCRIPTION =
  "Отвечаем на самые частые вопросы про сроки, бренд, интеграции и старт работы.";

export function FAQSection({
  id,
  merge,
  items = faq,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  eyebrow = "FAQ",
}: FAQSectionProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow={eyebrow}
      title={title}
      description={description}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-4xl gap-4"
      >
        {items.map((item) => (
          <motion.details
            key={item.question}
            variants={fadeInUp}
            className="card group cursor-pointer [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex items-center justify-between gap-4 list-none">
              <h3 className="text-base font-bold text-heading sm:text-lg">
                {item.question}
              </h3>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blue-50 text-primary transition group-open:rotate-45">
                <Plus className="h-4 w-4" />
              </span>
            </summary>
            <p className="mt-4 leading-7 text-body">{item.answer}</p>
          </motion.details>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
