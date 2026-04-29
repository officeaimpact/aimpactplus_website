import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Контакты — обсудить AI-проект для туризма",
  description:
    "Оставьте заявку или свяжитесь напрямую: телефон, email, адрес офиса в Москве. Подключаем AI в турбизнес безопасно и быстро.",
  path: "/contact",
});

export default function Contact() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Контакты"
        title="Расскажите задачу — мы соберём план AI-внедрения"
        description="Многоступенчатая форма заявки запускается в Iter 3. Сейчас доступны прямые контакты: телефон, email и физический адрес офиса в Москве."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Контакты", href: "/contact" },
        ]}
      />

      <SectionWrapper
        eyebrow="Прямые каналы"
        title="Свяжитесь удобным способом"
        description="Если уже понимаете, что хотите обсудить — пишите или звоните напрямую. Мы отвечаем в рабочее время и быстро возвращаемся, если оставите заявку."
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
              <p className="mt-1.5 text-lg font-black text-heading">
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
              <p className="mt-1.5 break-all text-lg font-black text-heading">
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
              <p className="mt-1.5 text-lg font-black text-heading">
                Москва, Замоскворечье
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {site.addressShort}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[2fr_1fr]">
          <div className="card flex items-start gap-4 bg-deep text-white">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 text-sky">
              <MessageSquare className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-black">
                Многоступенчатая форма заявки — в Iter 3
              </h2>
              <p className="mt-3 leading-7 text-blue-100">
                В следующей итерации будет 4-шаговая форма с сегментацией
                (контакты → компания → задача → подтверждение), маршрутизацией
                в Web3Forms / Telegram / CRM, согласием на обработку данных по
                152-ФЗ и UTM-трекингом источников. Архитектура подробно описана
                в плане.
              </p>
            </div>
          </div>
          <div className="card">
            <h3 className="text-lg font-black text-heading">Реквизиты</h3>
            <p className="mt-3 text-sm leading-7 text-body">
              {site.legalName}
              <br />
              ИНН {site.inn} · ОГРН {site.ogrn}
            </p>
          </div>
        </div>
      </SectionWrapper>
    </PageShell>
  );
}
