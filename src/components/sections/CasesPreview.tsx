"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cases } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Tag } from "@/components/ui/Tag";

export function CasesPreview() {
  return (
    <SectionWrapper
      eyebrow="Кейсы"
      title="Доказательства из туристического рынка"
      description="Реальные внедрения у туроператоров, агентств и средств размещения. Каждый кейс — отдельная страница с задачей, решением и результатами."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {cases.map((c) => (
          <motion.div key={c.slug} variants={fadeInUp}>
            <Link
              href={`/cases/${c.slug}`}
              className="card group flex h-full flex-col"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <Tag>{c.segment}</Tag>
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
              <h3 className="text-xl font-black text-heading">{c.title}</h3>
              <p className="mt-3 grow text-sm leading-6 text-body">
                {c.summary}
              </p>
              <ul className="mt-5 space-y-2">
                {c.results.slice(0, 2).map((r) => (
                  <li
                    key={r}
                    className="flex gap-2 text-sm leading-6 text-body"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {r}
                  </li>
                ))}
              </ul>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-12 text-center">
        <Link href="/cases" className="btn-secondary">
          Все кейсы
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
