"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { faq } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function FAQSection({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="FAQ"
      title="Короткие ответы на вопросы клиентов"
      description="Отвечаем на самые частые вопросы про сроки, бренд, интеграции и старт работы."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-4xl gap-4"
      >
        {faq.map((item) => (
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
