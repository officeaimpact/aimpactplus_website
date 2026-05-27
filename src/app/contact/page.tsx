import { Mail, Phone, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ContactPageClient } from "@/components/ContactPageClient";
import { SegmentVisual } from "@/components/visual/SegmentVisual";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Контакты — обсудить ИИ-проект для туризма",
  description:
    "Оставьте заявку через форму или свяжитесь напрямую: телефон, email, адрес офиса в Москве. Подключаем ИИ в турбизнес безопасно и быстро.",
  path: "/contact",
});

export default function Contact() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Контакты"
        title="Расскажите задачу — мы соберём план ИИ-внедрения"
        description="Короткая форма на одной странице. Заполняется за минуту. Отвечаем в течение рабочего дня. Согласие на обработку персональных данных по 152-ФЗ."
        primaryCta="К форме заявки"
        primaryHref="#lead-form"
        secondaryCta={`Написать ${site.email}`}
        secondaryHref={`mailto:${site.email}`}
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/contact" },
        ]}
        aside={<SegmentVisual segment="contact" />}
      />

      <SectionWrapper
        eyebrow="Прямые каналы"
        title="Свяжитесь удобным способом"
        description="Если уже понимаете, что хотите обсудить — пишите или звоните. А если нужен полный план ИИ-внедрения, заполните форму ниже."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <a
            href={site.phoneHref}
            className="card group flex items-start gap-4 transition hover:-translate-y-1"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-ice text-primary transition group-hover:bg-primary group-hover:text-white">
              <Phone className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Телефон
              </p>
              <p className="mt-1.5 text-lg font-bold text-heading">
                {site.phone}
              </p>
              <p className="mt-2 text-sm text-muted">
                Звонок или мессенджер по этому номеру
              </p>
            </div>
          </a>

          <a
            href={`mailto:${site.email}`}
            className="card group flex items-start gap-4 transition hover:-translate-y-1"
          >
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-ice text-primary transition group-hover:bg-primary group-hover:text-white">
              <Mail className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Email
              </p>
              <p className="mt-1.5 break-all text-lg font-bold text-heading">
                {site.email}
              </p>
              <p className="mt-2 text-sm text-muted">
                Ответим в течение рабочего дня
              </p>
            </div>
          </a>

          <div className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-ice text-primary">
              <MapPin className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Офис
              </p>
              <p className="mt-1.5 text-lg font-bold text-heading">
                Москва
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {site.addressShort}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <section id="lead-form" className="section bg-surface-alt">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Форма заявки
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold text-heading sm:text-4xl">
              Всё в одном экране — заполняется за минуту
            </h2>
            <p className="mt-4 text-lg leading-8 text-body">
              Имя, контакт, цель и направление — этого достаточно, чтобы мы
              связались и предметно обсудили задачу.
            </p>
          </div>
          <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[var(--shadow-card)] sm:p-10">
            <ContactPageClient />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
