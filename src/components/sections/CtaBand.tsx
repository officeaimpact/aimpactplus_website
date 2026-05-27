import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CtaBand({
  title = "Готовы обсудить ИИ-решение для вашего туристического бизнеса?",
  text = "Покажем демо, оценим сценарии автоматизации и предложим безопасный план пилота. Без обязательств.",
  cta = "Оставить заявку",
  href = "/contact",
}: {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="px-4 py-14 sm:px-5 sm:py-20 lg:px-8">
      <div className="hero-shell mx-auto max-w-7xl rounded-[1.75rem] p-6 text-white sm:rounded-[2.4rem] sm:p-10 lg:p-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div>
            <Badge variant="dark">Следующий шаг</Badge>
            <h2 className="mt-5 max-w-3xl text-balance text-2xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg sm:leading-8">
              {text}
            </p>
          </div>
          <Link
            href={href}
            className="btn-primary w-full justify-center self-start sm:w-auto"
          >
            {cta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
