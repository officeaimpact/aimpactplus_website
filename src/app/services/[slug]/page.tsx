import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Users,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  LayoutPanelLeft,
  Cloud,
  type LucideIcon,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { services, type ServiceIcon } from "@/lib/site-data";

const iconMap: Record<ServiceIcon, LucideIcon> = {
  Sparkles,
  Workflow,
  Headset,
  ChartLine,
  GraduationCap,
  Compass,
  LayoutPanelLeft,
  Cloud,
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service)
    return pageMetadata({
      title: "Услуга не найдена",
      description: "Запрашиваемая услуга не найдена.",
    });
  return pageMetadata({
    title: `Услуга: ${service.title}`,
    description: service.text,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Sparkles;
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);
  const intent = `Заявка на услугу: ${service.title}`;
  const contactHref = `/contact?intent=${encodeURIComponent(intent)}`;

  return (
    <PageShell>
      <JsonLd
        data={serviceJsonLd({
          name: service.title,
          description: service.text,
          url: `/services/${service.slug}`,
          serviceType: "Внедрение ИИ в туризм",
          audience: "Tourism business",
        })}
      />
      <PageHero
        eyebrow="Услуга"
        title={service.title}
        description={service.text}
        primaryCta="Оставить заявку на услугу"
        primaryHref={contactHref}
        secondaryCta="Все услуги"
        secondaryHref="/services"
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Услуги", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
        aside={
          <div className="card flex h-full flex-col gap-5 bg-white/[0.06] text-white">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-blue)]">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100/80">
              Что получите
            </p>
            <ul className="space-y-2.5">
              {service.outcomes.map((o) => (
                <li
                  key={o}
                  className="flex gap-2 text-sm leading-6 text-blue-100"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
                  {o}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-blue-100">
              <Clock className="h-4 w-4 shrink-0 text-sky" />
              <span>{service.timeline}</span>
            </div>
          </div>
        }
      />

      <SectionWrapper
        eyebrow="Кому подходит"
        title="Для каких компаний эта услуга"
        description="Чёткое позиционирование: с кем мы обычно реализуем эту услугу и какой контекст у заказчика."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {service.forWhom.map((w) => (
            <article key={w} className="card flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <Users className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="font-semibold leading-7 text-heading">{w}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Состав работ"
        title="Что входит в услугу"
        description="Прозрачный список этапов и артефактов. Можно стартовать с базы и расширять по мере результата."
        alt
      >
        <ol className="grid gap-5 md:grid-cols-2">
          {service.deliverables.map((d, i) => (
            <li key={d} className="card flex items-start gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-blue-ice font-bold text-primary">
                {i + 1}
              </span>
              <p className="font-semibold leading-7 text-heading">{d}</p>
            </li>
          ))}
        </ol>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Сроки"
        title="Когда увидите результат"
        description="Предсказуемые сроки запуска. Финальные оценки фиксируются после короткого аудита."
      >
        <div className="card mx-auto flex max-w-3xl items-start gap-5">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
            <Clock className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="text-lg leading-8 text-heading">{service.timeline}</p>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Старт"
        title="Заявка именно на эту услугу"
        description="Когда вы пишете отсюда, в форме заявки уже подставляется конкретная услуга. Так нам сразу понятно, что вы хотите, и мы готовим предметное предложение."
        alt
      >
        <div className="card mx-auto flex max-w-3xl flex-col gap-5 text-center sm:flex-row sm:items-center sm:text-left">
          <span className="mx-auto grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] sm:mx-0">
            <Sparkles className="h-7 w-7" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-lg font-bold text-heading">
              {`Заявка на услугу: ${service.title}`}
            </p>
            <p className="mt-2 text-sm leading-6 text-body">
              Заполняется за минуту. Имя, контакт, направление бизнеса —
              остальное обсудим в диалоге. Отвечаем в течение рабочего дня.
            </p>
          </div>
          <Link href={contactHref} className="btn-primary self-stretch sm:self-auto">
            Оставить заявку
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Другие услуги"
        title="Возможно, вам ближе"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => {
            const OIcon = iconMap[o.icon] ?? Sparkles;
            return (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="card group flex h-full flex-col"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)] transition group-hover:scale-105">
                  <OIcon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold text-heading">{o.title}</h3>
                <p className="mt-3 grow text-sm leading-6 text-body">
                  {o.text}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Открыть услугу
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </SectionWrapper>

      <CtaBand
        title={`Запустим «${service.title}»`}
        text="Расскажите задачу — оценим объём, сроки и стоимость. Безопасный пилот без риска для текущих процессов."
        cta="Оставить заявку"
        href={contactHref}
      />
    </PageShell>
  );
}
