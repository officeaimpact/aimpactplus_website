import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CtaBand({
  title = "Готовы обсудить AI-решение для вашего туристического бизнеса?",
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
    <section className="px-5 py-20 sm:px-8">
      <div className="hero-shell mx-auto max-w-7xl rounded-[2.4rem] p-8 text-white sm:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge variant="dark">Следующий шаг</Badge>
            <h2 className="mt-5 max-w-3xl text-balance text-3xl font-black tracking-tight sm:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              {text}
            </p>
          </div>
          <Link href={href} className="btn-primary self-start">
            {cta}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
