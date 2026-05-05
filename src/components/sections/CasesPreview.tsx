"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cases } from "@/lib/site-data";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Tag } from "@/components/ui/Tag";
import { BrandMonogram } from "@/components/ui/BrandMonogram";

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

export function CasesPreview({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Кейсы"
      title="Доказательства из туристического рынка"
      description="Реальные внедрения у туроператоров, агентств и средств размещения. Каждый кейс — отдельная страница с задачей, решением и результатами."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {cases.map((c) => (
          <motion.div key={c.slug} variants={fadeInUp}>
            <Link
              href={`/cases/${c.slug}`}
              className="card group flex h-full flex-col"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                {c.logo ? (
                  <Image
                    src={c.logo}
                    alt={c.title}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-2xl object-contain"
                  />
                ) : (
                  <BrandMonogram name={c.title} size="md" variant="soft" />
                )}
                <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
              </div>
              <Tag className="self-start">{c.segment}</Tag>
              <h3 className="mt-3 text-lg font-bold text-heading">
                {c.title}
              </h3>
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
