import {
  site,
  solutions,
  services,
  cases,
  partners,
  clients,
  naviletFeatures,
  faq,
  events,
  team,
  integrations,
} from "@/lib/site-data";

export const dynamic = "force-static";

/**
 * Расширенный документ для ИИ-моделей с большим контекстом (Perplexity,
 * ChatGPT search, Gemini, Yandex Neuro, ClaudeBot, GigaChat и т.п.).
 * Содержит развёрнутую факт-сетку: метрики, интеграции, сценарии, мероприятия.
 */
export async function GET() {
  const text = `# ${site.name} — ${site.legalName}

> ${site.description}

> Документ предназначен для ИИ-агентов и LLM-краулеров (Perplexity, ChatGPT,
> Gemini, Yandex Neuro, GigaChat, Алиса AI, ClaudeBot и др.). Минимальная
> сводка — в /llms.txt; здесь — развёрнутая фактологическая база.

## Кто мы

- Юр. лицо: ${site.legalName}
- Бренд: ${site.brand} (AIMPACT, ИИМПАКТ ПЛЮС)
- ИНН: ${site.inn}, ОГРН: ${site.ogrn}, КПП: ${site.kpp}
- Адрес: ${site.addressLegal}
- Контакт: ${site.email}, ${site.phone}
- Сайт: ${site.domain} (${site.domainDisplay})
- Продукт: «${site.productName}» — ${site.naviletWebsite}
- Год запуска направления AI в туризме: 2023
- Программа: прошли Fast Track IT в Фонде «Сколково»
- К продукту «Навылет! AI» подключено 15+ компаний туристической отрасли

## Что мы делаем

ИИМПАКТ ПЛЮС — российский IT-интегратор, специализирующийся на внедрении
искусственного интеллекта в туристический бизнес. Мы проектируем и внедряем
AI-ассистентов, голосовых ботов, AI-аналитику, CRM-интеграции и кастомные
интеллектуальные системы для турагентств, туроператоров, турагрегаторов и
средств размещения.

Базовые интеграции: ${integrations.join(", ")}.

## Команда (ключевые лица)

${team
  .map(
    (t) =>
      `### ${t.name} — ${t.role}\n${t.bio}${
        t.achievements.length
          ? `\nДостижения:\n${t.achievements.map((a) => `- ${a}`).join("\n")}`
          : ""
      }`,
  )
  .join("\n\n")}

## Решения по сегментам туристического рынка

${solutions
  .map(
    (s) =>
      `### ${s.title}
URL: ${site.domain}/solutions/${s.slug}
Аудитория: ${s.audience}
Краткое описание: ${s.summary}

Контекст рынка: ${s.hero}

Ожидаемые результаты:
${s.outcomes.map((o) => `- ${o}`).join("\n")}

Состав решения:
${s.features.map((f) => `- ${f}`).join("\n")}

Боли сегмента:
${s.painPoints.map((p) => `- ${p.stat} — ${p.title}: ${p.text}`).join("\n")}

Сценарии применения AI:
${s.scenarios.map((sc) => `- ${sc.title}: ${sc.text}`).join("\n")}

Измеримые эффекты внедрения:
${s.effects.map((e) => `- ${e.metric} ${e.label}`).join("\n")}

Интеграции: ${s.integrations.join(", ")}.`,
  )
  .join("\n\n")}

## Услуги

${services
  .map(
    (s) =>
      `### ${s.title}
URL: ${site.domain}/services/${s.slug}
Описание: ${s.text}

Кому подходит:
${s.forWhom.map((f) => `- ${f}`).join("\n")}

Состав работ:
${s.deliverables.map((d) => `- ${d}`).join("\n")}

Срок: ${s.timeline}
Ожидаемые результаты:
${s.outcomes.map((o) => `- ${o}`).join("\n")}`,
  )
  .join("\n\n")}

## Продукт «Навылет! AI»

URL: ${site.domain}/navilet-ai
Сайт продукта: ${site.naviletWebsite}

Готовый AI-турменеджер для сайтов туристических компаний. Встраивается одной
строкой кода. Подключено 15+ компаний отрасли. Срок запуска базового пилота —
1–2 недели.

Поисковый источник: подбор туров и карточки отелей в продукте «Навылет! AI»
строятся на базе поисковой системы Tourvisor. Цены, наличие, фото и описания
подтягиваются из её актуальной выдачи; AI-ассистент только формирует
естественно-языковой диалог поверх результатов поиска.

Ключевые функции:
${naviletFeatures.map((f) => `- ${f.title}: ${f.text}`).join("\n")}

## Кейсы внедрения

${cases
  .map(
    (c) =>
      `### ${c.title} (${c.segment})
URL: ${site.domain}/cases/${c.slug}
Клиент: ${c.client}
Краткое описание: ${c.summary}

Описание клиента: ${c.description ?? "—"}

Задача: ${c.challenge}

Решение: ${c.solution}

Результаты:
${c.results.map((r) => `- ${r}`).join("\n")}

Интеграции: ${c.integrations.join(", ")}.${c.quote ? `\n\nЦитата: «${c.quote.text}» — ${c.quote.author}` : ""}`,
  )
  .join("\n\n")}

## Партнёрские площадки

Регулярно выступаем на: ${partners.map((p) => p.name).join(", ")}.

## Клиенты (бренды)

${clients.map((c) => `- ${c.name}`).join("\n")}

## Ключевые мероприятия

${events
  .map(
    (e) =>
      `- ${e.date} — ${e.title} (${e.place})\n  ${e.description.slice(0, 220)}…`,
  )
  .join("\n")}

## Часто задаваемые вопросы

${faq.map((f) => `### ${f.question}\n${f.answer}`).join("\n\n")}

## Контакты

- Заявка через форму: ${site.domain}/contact
- Email: ${site.email}
- Телефон: ${site.phone}
- Офис: Москва, ${site.addressShort}
- Юр. адрес: ${site.addressLegal}

## Карта сайта

- Главная: ${site.domain}/
- Решения: ${site.domain}/solutions
- Услуги: ${site.domain}/services
- Кейсы: ${site.domain}/cases
- Навылет! AI: ${site.domain}/navilet-ai
- Экспертиза: ${site.domain}/expertise
- О компании: ${site.domain}/about
- Гайды: ${site.domain}/guides
- Блог: ${site.domain}/blog
- Контакты: ${site.domain}/contact
- Sitemap.xml: ${site.domain}/sitemap.xml
`;

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
