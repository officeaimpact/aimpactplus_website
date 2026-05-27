import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { site } from "@/lib/site-data";

/**
 * Био-блок автора для статей блога и гайдов. Подписан под нужды E-E-A-T:
 * имя, должность, профессиональная принадлежность (член комитета ТПП РФ),
 * ссылка на /about#author-lukian — там Person JSON-LD с детальным описанием.
 * Размещается в конце материала, перед общим CTA.
 */
export function AuthorBio() {
  return (
    <aside
      aria-label="Об авторе"
      className="card mx-auto mt-12 flex max-w-3xl flex-col gap-4 border-blue-100 bg-blue-ice/40"
    >
      <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
        <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Об авторе
      </p>
      <div>
        <p className="text-lg font-bold text-heading">{site.ceo}</p>
        <p className="mt-1 text-sm font-semibold text-primary">
          Генеральный директор и основатель {site.brand}
        </p>
      </div>
      <p className="text-sm leading-7 text-body">
        Эксперт по искусственному интеллекту и цифровым технологиям в туризме,
        член Комитета ТПП РФ по предпринимательству в сфере туризма. Спикер
        ТПП&nbsp;РФ, РСТ, МГИМО, РЭУ им. Г.&nbsp;В.&nbsp;Плеханова. Автор
        кейсов по внедрению ИИ для туроператоров, турагентств и отелей.
      </p>
      <div className="flex flex-wrap gap-4 pt-1">
        <Link
          href="/about#author-lukian"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          Полная биография и публичные выступления
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
