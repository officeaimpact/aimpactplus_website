import Image from "next/image";
import { Compass, ShieldCheck, Users } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "О компании ИИМПАКТ ПЛЮС",
  description:
    "ООО «ИИМПАКТ ПЛЮС» (бренд AIMPACT+) — IT-компания, которая внедряет AI в туризм.",
  path: "/about",
});

export default function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="О компании"
        title={`${site.legalName} — IT-команда AI-интеграций для туризма`}
        description="Проектируем и внедряем AI-решения для туристического бизнеса: индивидуальные интеллектуальные системы, аналитику, голосовые и текстовые ассистенты. Работаем с туроператорами, агентствами, агрегаторами, отелями и регионами."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "О компании", href: "/about" },
        ]}
        aside={
          <div className="relative isolate flex aspect-square w-full max-w-[460px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 backdrop-blur-md sm:p-14">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-90 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(0,231,253,0.32), transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,151,245,0.32), transparent 60%)",
              }}
            />
            <Image
              src="/brand/logo.png"
              alt={site.legalName}
              width={319}
              height={72}
              priority
              className="h-auto w-full max-w-[260px] brightness-0 invert"
            />
          </div>
        }
      />

      <SectionWrapper
        eyebrow="Кратко о компании"
        title="Что делает ИИМПАКТ ПЛЮС"
        description="Мы — IT-компания, которая разрабатывает и внедряет AI-решения для туризма: от стратегии и аудита до индивидуальных AI-приложений, голосовых ассистентов, аналитики и интеграций. Полное описание компании предоставит заказчик до запуска и заменит этот текст."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Compass className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-black text-heading">
              Отраслевая экспертиза
            </h3>
            <p className="mt-3 leading-7 text-body">
              Специализируемся на туризме и понимаем процессы туроператоров,
              агентств, агрегаторов и средств размещения изнутри.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-black text-heading">
              Безопасное внедрение
            </h3>
            <p className="mt-3 leading-7 text-body">
              Текущий сайт и каналы продаж работают, AI запускается рядом и
              подключается, когда показывает результат.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Users className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-black text-heading">
              Делимся знаниями
            </h3>
            <p className="mt-3 leading-7 text-body">
              Выступаем на ТПП РФ, РСТ, МГИМО, РЭУ. Помогаем формировать
              отраслевую повестку по AI в туризме.
            </p>
          </article>
        </div>
      </SectionWrapper>

      <CtaBand
        title="Готовы обсудить сотрудничество?"
        text="Опишите задачу — соберём прототип AI-решения и предложим план пилота для вашего бизнеса."
      />
    </PageShell>
  );
}
