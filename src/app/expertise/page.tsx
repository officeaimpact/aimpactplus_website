import { Calendar, MapPin, Award, BadgeCheck, Quote } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { events, partners, testimonials } from "@/lib/site-data";

export const metadata = pageMetadata({
  title: "Экспертиза, выступления и публичная репутация",
  description:
    "Экспертиза ИИМПАКТ ПЛЮС: выступления на ТПП РФ, РСТ, МГИМО, РЭУ, Интурмаркет, Минск, Каир. Цитаты отраслевых лидеров и публичные кейсы.",
  path: "/expertise",
});

export default function Expertise() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Экспертиза"
        title="Публичная экспертиза в туристической отрасли"
        description="Мы участвуем в стратегических обсуждениях развития туризма и AI на федеральных площадках, делимся практикой и формируем повестку."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Экспертиза", href: "/expertise" },
        ]}
      />

      <SectionWrapper
        eyebrow="Партнёрские площадки"
        title="Где мы выступаем"
        description="ТПП РФ, РСТ, МГИМО, РЭУ им. Г. В. Плеханова, Ассоциация «ТУРПОМОЩЬ», Интурмаркет, Международный конгресс СНГ и зарубежные туристические форумы."
      >
        <div className="flex flex-wrap justify-center gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="rounded-full border border-blue-100 bg-white px-5 py-3 text-sm font-bold text-heading shadow-[var(--shadow-soft)]"
            >
              {p}
            </span>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Хроника"
        title="Выступления и мероприятия"
        description="Фокус на туризме, AI и цифровизации отрасли. Полный список мероприятий с момента старта проекта."
        alt
      >
        <div className="grid gap-5 md:grid-cols-2">
          {events.map((e) => (
            <article key={e.title} className="card flex h-full flex-col">
              <div className="flex flex-wrap gap-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {e.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {e.place}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-black text-heading sm:text-xl">
                {e.title}
              </h3>
              <p className="mt-3 grow leading-7 text-body">{e.text}</p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Признание"
        title="Награды и благодарности"
        description="Получаем признание от профессионального сообщества за вклад в развитие AI-технологий в туризме."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Award className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-black text-heading">
                Благодарность за вклад в развитие AI-технологий в туризме
              </h3>
              <p className="mt-2 text-sm leading-7 text-body">
                Вручена Лукиану Силагадзе и Евгению Ребеке вице-президентом
                Российского союза туриндустрии Юрием Барзыкиным и заместителем
                председателя комитета Госдумы по туризму Натальей Костенко
                (9 октября 2024).
              </p>
            </div>
          </article>
          <article className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-black text-heading">
                Член Комитета ТПП РФ по предпринимательству в сфере туризма
              </h3>
              <p className="mt-2 text-sm leading-7 text-body">
                Лукиан Силагадзе и Евгений Ребека — действующие члены
                профильного комитета, участвующие в формировании отраслевой
                повестки.
              </p>
            </div>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Цитаты"
        title="О нас говорят отраслевые эксперты"
        alt
      >
        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="card">
              <Quote className="mb-3 h-6 w-6 text-primary/40" />
              <p className="text-lg leading-8 text-heading">«{t.text}»</p>
              <footer className="mt-6">
                <p className="font-black text-heading">{t.name}</p>
                <p className="mt-1 text-sm text-muted">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </SectionWrapper>

      <CtaBand
        title="Хотите пригласить эксперта?"
        text="Можем выступить на отраслевом мероприятии, форуме, обучении или внутреннем стратегическом совещании компании."
        cta="Пригласить эксперта"
        href="/contact?intent=speaker"
      />
    </PageShell>
  );
}
