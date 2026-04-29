import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { site } from "@/lib/site-data";

export default function Home() {
  return (
    <PageShell>
      <section className="hero-shell text-white">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
          <div>
            <Badge variant="dark">Iter 1 · Фундамент</Badge>
            <h1 className="mt-7 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              ИИ-Туризм.рф —{" "}
              <span className="text-gradient">{site.brand}</span> для
              туристического бизнеса
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-blue-100 sm:text-xl">
              {site.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary">
                Получить аудит AI-возможностей
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="/navilet-ai" className="btn-secondary-dark">
                Смотреть Навылет! AI
              </Link>
            </div>
            <ul className="mt-10 grid gap-2.5 text-sm text-blue-100/90 sm:grid-cols-2">
              {[
                "AI-интегратор для туризма",
                "Кейсы с туроператорами и отелями",
                "Эксперты ТПП РФ, РСТ, МГИМО, РЭУ",
                "Юр. лицо: " + site.legalName,
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-sky"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="dashboard-card">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-bold text-blue-100">
                  AI Impact Map
                </span>
                <span className="rounded-full bg-sky/15 px-3 py-1 text-xs font-bold text-sky">
                  live
                </span>
              </div>
              <div className="space-y-4">
                {[
                  "Заявка с сайта или мессенджера",
                  "AI-квалификация и подбор",
                  "CRM и менеджер по продажам",
                  "Продажа / сервис / повтор",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-sm font-black text-primary">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper
        eyebrow="Что внутри"
        title="Дизайн-система готова. Контент-каркас — в Iter 2"
        description="Это первая итерация: установлен стек, дизайн-токены, UI-примитивы, шапка и подвал. Дальше идут полные секции, страницы кейсов, продукта и заявочная воронка."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Дизайн-токены",
              text:
                "Цвета, типографика (Manrope + Inter), тени, радиусы, motion-fallback для prefers-reduced-motion.",
            },
            {
              title: "UI-библиотека",
              text:
                "Button, Badge, Card, SectionWrapper, Tag, Logo, Breadcrumbs, JsonLd. Всё в @/components/ui.",
            },
            {
              title: "Шапка и подвал",
              text:
                "Sticky-навигация с blur, мобильный drawer, реквизиты ИИМПАКТ ПЛЮС, skip-to-content для a11y.",
            },
            {
              title: "SEO-фундамент",
              text:
                "metadata, Organization + WebSite JSON-LD, canonical, OpenGraph, robots, viewport theme-color.",
            },
            {
              title: "Стек 2026",
              text:
                "Next.js 16, React 19, Tailwind 4, framer-motion 12, lucide-react, zod. App Router, server components.",
            },
            {
              title: "Готово к Iter 2",
              text:
                "Полный сайт-каркас: Hero с word-reveal, DemoWidget, /solutions, /navilet-ai, /cases, /services, /expertise, /about, /contact.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <Sparkles className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-lg font-black text-heading">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-7 text-body">{item.text}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </PageShell>
  );
}
