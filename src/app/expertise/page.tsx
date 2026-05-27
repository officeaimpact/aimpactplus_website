import Image from "next/image";
import { Award, BadgeCheck, Quote } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/ui/PageHero";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { CtaBand } from "@/components/sections/CtaBand";
import { BrandMonogram } from "@/components/ui/BrandMonogram";
import { SegmentVisual } from "@/components/visual/SegmentVisual";
import { ExpertiseEventsGrid } from "@/components/sections/ExpertiseEventsGrid";
import { pageMetadata } from "@/lib/seo";
import { partners, testimonials } from "@/lib/site-data";

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
        description="Мы участвуем в стратегических обсуждениях развития туризма и искусственного интеллекта на федеральных площадках — ТПП РФ, РСТ, МГИМО, РЭУ — делимся практикой и формируем повестку по внедрению ИИ в туризме."
        crumbs={[
          { name: "Главная", href: "/" },
          { name: "Экспертиза", href: "/expertise" },
        ]}
        aside={<SegmentVisual segment="expertise" />}
      />

      <SectionWrapper
        eyebrow="Партнёры"
        title="С кем мы работаем и сотрудничаем"
        description="Сотрудничаем с профессиональными ассоциациями, государственными органами и ведущими университетами туристической отрасли."
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {partners.map((p) => (
            <PartnerLogoTile key={p.name} item={p} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Хроника"
        title="Выступления и мероприятия"
        description="Фокус на туризме, искусственном интеллекте и цифровизации отрасли. Нажмите на карточку — откроется модальное окно с полным описанием и тегами."
        alt
      >
        <ExpertiseEventsGrid />
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Признание"
        title="Награды и благодарности"
        description="Получаем признание от профессионального сообщества за вклад в развитие ИИ-технологий в туризме."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <article className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <Award className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-heading">
                Благодарность за вклад в развитие ИИ-технологий в туризме
              </h3>
              <p className="mt-2 text-sm leading-7 text-body">
                Вручена Лукиану Силагадзе вице-президентом Российского союза
                туриндустрии Юрием Барзыкиным и заместителем председателя
                комитета Госдумы по туризму Натальей Костенко (9 октября 2024).
              </p>
            </div>
          </article>
          <article className="card flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-heading">
                Член Комитета ТПП РФ по предпринимательству в сфере туризма
              </h3>
              <p className="mt-2 text-sm leading-7 text-body">
                Лукиан Силагадзе — действующий член профильного комитета,
                участвующий в формировании отраслевой повестки и в разработке
                рекомендаций по применению ИИ в туристическом бизнесе.
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
        {(() => {
          const grid = testimonials.slice(0, 4);
          const featured = testimonials[4];
          return (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                {grid.map((t) => (
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
                        <p className="font-bold text-heading">{t.name}</p>
                        <p className="mt-0.5 text-sm text-muted">{t.role}</p>
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
              {featured && (
                <div className="mx-auto mt-5 max-w-3xl">
                  <blockquote className="card">
                    <Quote className="mb-3 h-6 w-6 text-primary/40" />
                    <p className="text-lg leading-8 text-heading">
                      «{featured.text}»
                    </p>
                    <footer className="mt-6 flex items-center gap-4">
                      {featured.photo ? (
                        <Image
                          src={featured.photo}
                          alt={featured.name}
                          width={128}
                          height={128}
                          sizes="64px"
                          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-blue-100"
                        />
                      ) : (
                        <BrandMonogram
                          name={featured.name}
                          size="lg"
                          variant="gradient"
                          className="h-16 w-16 rounded-full text-base"
                        />
                      )}
                      <div>
                        <p className="font-bold text-heading">
                          {featured.name}
                        </p>
                        <p className="mt-0.5 text-sm text-muted">
                          {featured.role}
                        </p>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              )}
            </>
          );
        })()}
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

function PartnerLogoTile({
  item,
}: {
  item: { name: string; logo?: string };
}) {
  return (
    <div
      title={item.name}
      className="group relative flex h-32 items-center justify-center overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/[0.05] transition-all duration-500 group-hover:scale-[1.8] group-hover:bg-accent/[0.08]" />
      {item.logo ? (
        <Image
          src={item.logo}
          alt={item.name}
          width={240}
          height={96}
          className="relative h-16 w-auto max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-110 sm:h-20"
        />
      ) : (
        <span className="relative text-center text-base font-bold text-heading">
          {item.name}
        </span>
      )}
    </div>
  );
}
