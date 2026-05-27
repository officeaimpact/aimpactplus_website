import Link from "next/link";
import { Calendar, Clock, User2 } from "lucide-react";
import { site } from "@/lib/site-data";

type Props = {
  publishedDisplay: string;
  publishedISO: string;
  readingTime: string;
  /** Если true — показывается «обновлено» вместо «опубликовано» (для гайдов). */
  updatedLabel?: boolean;
};

/**
 * Метаданные статьи под заголовком: автор + дата публикации + время чтения.
 * Видимый аналог `articleJsonLd.author` — критично для E-E-A-T и LLM-цитат.
 */
export function ArticleMeta({
  publishedDisplay,
  publishedISO,
  readingTime,
  updatedLabel = false,
}: Props) {
  return (
    <div className="mx-auto mb-6 flex max-w-3xl flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted">
      <Link
        href="/about#author-lukian"
        className="inline-flex items-center gap-1.5 text-primary hover:underline"
      >
        <User2 className="h-3.5 w-3.5" aria-hidden="true" />
        {site.ceo}
      </Link>
      <time
        dateTime={publishedISO}
        className="inline-flex items-center gap-1.5"
      >
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        {updatedLabel ? "Обновлено:" : "Опубликовано:"} {publishedDisplay}
      </time>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {readingTime}
      </span>
    </div>
  );
}
