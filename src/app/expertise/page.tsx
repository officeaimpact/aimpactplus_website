import Image from "next/image";
import { Calendar, MapPin, Award, BadgeCheck, Quote } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { BrandMonogram } from "@/components/ui/BrandMonogram";
import { SegmentVisual } from "@/components/visual/SegmentVisual";
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
        aside={<SegmentVisual segment="expertise" />}
      />

      <SectionWrapper
        eyebrow="Партнёры"
        title="С кем мы работаем и где выступаем"
        description="Сотрудничаем с профессиональными ассоциациями, государственными органами и ведущими университетами."
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <div
              key={p.name}
              className="card flex h-28 items-center justify-center gap-3 p-5"
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={140}
                  height={56}
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <span className="text-center text-sm font-black text-heading">
                  {p.name}
                </span>
              )}
            </div>
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
            <article
              key={e.title}
              className="card flex h-full flex-col overflow-hidden p-0"
            >
              {e.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={e.image}
                    alt={e.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
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
              </div>
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
              <footer className="mt-6 flex items-center gap-4">
                {t.photo ? (
                  <Image
                    src={t.photo}
                    alt={t.name}
                    width={128}
                    height={128}
                    sizes="64px"
                    className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                  />
                ) : (
                  <BrandMonogram
                    name={t.name}
                    size="lg"
                    variant="gradient"
                    className="h-16 w-16 rounded-full text-base"
                  />
                )}
                <div>
                  <p className="font-black text-heading">{t.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{t.role}</p>
                </div>
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
