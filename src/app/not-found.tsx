import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";

// 404 страница: запрещаем индексацию, чтобы поисковики не подхватывали
// soft-404 как обычный документ и не тратили краулинг-бюджет.
export const metadata: Metadata = {
  title: "404 — страница не найдена | ИИМПАКТ ПЛЮС",
  description:
    "Запрошенная страница не найдена. Вернитесь на главную сайта ИИ-Туризм (ИИМПАКТ ПЛЮС) или посмотрите кейсы и продукт «Навылет! AI».",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

export default function NotFound() {
  return (
    <PageShell>
      <section className="section">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Ошибка 404
          </p>
          <h1 className="mt-5 text-balance text-4xl font-bold text-heading sm:text-5xl">
            Такой страницы пока нет
          </h1>
          <p className="mt-5 text-lg leading-8 text-body">
            Возможно, вы перешли по устаревшей ссылке или допустили опечатку.
            Вернитесь на главную или посмотрите кейсы и продукт.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary">
              На главную <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/cases" className="btn-secondary">
              Смотреть кейсы
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
