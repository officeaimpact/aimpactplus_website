import { Building2, Users, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { site, team } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "О компании ИИМПАКТ ПЛЮС",
  description:
    "ООО «ИИМПАКТ ПЛЮС» (бренд AIMPACT+) — IT-компания, которая внедряет AI в туризм. Реквизиты, основатели, миссия и юридическая информация.",
  path: "/about",
});

export default function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="О компании"
        title={`${site.legalName} — IT-команда AI-интеграций`}
        description="Мы проектируем и внедряем AI-решения в туристической отрасли: ассистентов, виджеты, CRM-интеграции, аналитику и голосовые сценарии. Работаем с туроператорами, агентствами, отелями и регионами."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "О компании", href: "/about" },
        ]}
      />

      <SectionWrapper
        eyebrow="Миссия"
        title="Делаем AI понятным и применимым в туризме"
        description="AI должен снимать рутину и помогать менеджерам, а не заменять их. Мы строим решения, которые приносят измеримый бизнес-эффект и не требуют перестройки IT-инфраструктуры компании."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-ice text-primary">
              <Compass className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-lg font-black text-heading">
              Отраслевая экспертиза
            </h3>
            <p className="mt-3 leading-7 text-body">
              Специализируемся на туризме и понимаем процессы туроператоров,
              агентств и средств размещения изнутри.
            </p>
          </article>
          <article className="card">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-ice text-primary">
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
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-ice text-primary">
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

      <SectionWrapper eyebrow="Команда" title="Кто стоит за проектом" alt>
        <div className="grid gap-5 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="card flex h-full flex-col">
              <h3 className="text-lg font-black text-heading">{member.name}</h3>
              <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-primary">
                {member.role}
              </p>
              <p className="mt-4 grow leading-7 text-body">{member.bio}</p>
              {member.achievements.length > 0 && (
                <ul className="mt-5 space-y-2 border-t border-blue-100 pt-4">
                  {member.achievements.map((a) => (
                    <li
                      key={a}
                      className="flex gap-2 text-sm leading-6 text-body"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {a}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Юридическая информация"
        title="Реквизиты и регистрация"
        description="Работаем как российское юридическое лицо в соответствии с законодательством РФ."
      >
        <div className="prose-card">
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            <Detail label="Полное наименование" value={site.legalName} />
            <Detail label="Бренд" value={site.brand} />
            <Detail label="ИНН" value={site.inn} />
            <Detail label="ОГРН" value={site.ogrn} />
            <Detail label="КПП" value={site.kpp} />
            <Detail label="Дата регистрации" value={site.founded} />
            <Detail label="Генеральный директор" value={site.ceo} />
            <Detail label="ОКВЭД" value="62.01 Разработка ПО" />
            <Detail label="Юридический адрес" value={site.address} />
            <Detail label="Email" value={site.email} />
            <Detail label="Телефон" value={site.phone} />
            <Detail label="Сайт" value={site.domainDisplay} />
          </div>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-surface-alt p-4 text-sm leading-7 text-body">
            <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            Учредители: Силагадзе Лукиан Ираклиевич (67%), Погосов Филипп
            Сергеевич (33%). Уставный капитал — 10 000 рублей.
          </div>
        </div>
      </SectionWrapper>

      <CtaBand
        title="Готовы обсудить сотрудничество?"
        text="Опишите задачу — соберём прототип AI-решения и предложим план пилота для вашего бизнеса."
      />
    </PageShell>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
        {label}
      </p>
      <p className="mt-1 text-base text-heading">{value}</p>
    </div>
  );
}
