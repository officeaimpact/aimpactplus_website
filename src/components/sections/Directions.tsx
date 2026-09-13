import Link from "next/link";
import { ArrowRight, Bot, Code2, Sparkles, type LucideIcon } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

type SectionAnchorProps = {
  id?: string;
  merge?: "top" | "bottom" | "both";
};

const directions: ReadonlyArray<{
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  text: string;
  bullets: string[];
  price: string;
  href: string;
  cta: string;
}> = [
  {
    icon: Code2,
    eyebrow: "Заказная разработка",
    title: "IT-разработка под процессы туркомпании",
    text: "То, чего нет в коробочных продуктах: B2B-кабинеты для агентской сети, мобильные приложения, интеграции с Tourvisor, Слетать, САМО, U-ON и CRM, боты в Telegram и MAX, дашборды.",
    bullets: ["Прототип за 2–3 недели", "Итерации по две недели с демо", "Сопровождение после запуска"],
    price: "от 50 000 ₽ за интеграцию · от 400 000 ₽ за B2B-кабинет",
    href: "/services#razrabotka",
    cta: "Услуги разработки",
  },
  {
    icon: Sparkles,
    eyebrow: "Внедрение ИИ",
    title: "Искусственный интеллект в продажи и операции",
    text: "ИИ-ассистенты для клиентов и сотрудников, корпоративные базы знаний, ИИ-модули в CRM, голосовые помощники и ИИ-аналитика — с контуром данных по 152-ФЗ.",
    bullets: ["Первая консультация бесплатно", "Пилот без риска для продаж", "Замер эффекта на ваших данных"],
    price: "от 100 000 ₽ за ИИ-модуль · от 250 000 ₽ за корпоративного ассистента",
    href: "/services#ii",
    cta: "Услуги по ИИ",
  },
  {
    icon: Bot,
    eyebrow: "Продукты",
    title: "«Навылет! AI» и личный кабинет",
    text: "Готовый ИИ-турменеджер на базе поисковой системы Tourvisor: подключается одной строкой кода, подбирает туры по живым ценам и передаёт заявку менеджеру. Уже у 10+ компаний.",
    bullets: ["Подключение за пару минут", "Первый месяц бесплатно", "Личный кабинет с аналитикой диалогов"],
    price: "от 990 ₽/мес",
    href: "/products",
    cta: "Продукты компании",
  },
];

/**
 * Три способа работать с компанией. Блок нужен для позиционирования
 * «IT-компания для туризма»: разработка, ИИ и собственные продукты —
 * одинаково видны на первом экране после hero.
 */
export function Directions({ id, merge }: SectionAnchorProps = {}) {
  return (
    <SectionWrapper
      id={id}
      merge={merge}
      eyebrow="Направления"
      title="Три способа работать с нами"
      description="Разрабатываем под ваши процессы, внедряем искусственный интеллект и подключаем собственный продукт. Можно начать с любого направления и комбинировать."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {directions.map((d) => {
          const Icon = d.icon;
          return (
            <article key={d.href} className="card flex h-full flex-col">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[var(--shadow-blue)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {d.eyebrow}
              </p>
              <h3 className="mt-2 text-xl font-bold text-heading">{d.title}</h3>
              <p className="mt-3 grow text-sm leading-7 text-body">{d.text}</p>
              <ul className="mt-4 space-y-1.5 border-t border-blue-100 pt-4 text-sm text-body">
                {d.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-bold text-heading">{d.price}</p>
              <Link href={d.href} className="btn-outline mt-5 justify-center">
                {d.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
