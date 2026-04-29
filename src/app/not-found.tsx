import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="section">
        <div className="mx-auto max-w-2xl px-5 text-center sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Ошибка 404
          </p>
          <h1 className="mt-5 text-balance text-4xl font-black tracking-tight text-heading sm:text-5xl">
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
