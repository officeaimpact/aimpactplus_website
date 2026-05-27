import {
  site,
  solutions,
  services,
  cases,
  faq,
} from "@/lib/site-data";
import { blogPosts } from "@/lib/blog-data";
import { guides } from "@/lib/guides-data";
import { cities } from "@/lib/cities-data";

export const dynamic = "force-static";

/**
 * Документ для ИИ-агентов и LLM-краулеров (формат llmstxt.org).
 * Минималистичный и хорошо цитируемый: краткое описание + ссылочные блоки.
 * Для расширенной версии см. /llms-full.txt.
 */
export async function GET() {
  const text = `# ${site.name} — ${site.legalName}

> ${site.description} Внедряем искусственный интеллект в туризм с 2023 года: готовый ИИ-турменеджер «Навылет! AI», ИИ-ассистенты, голосовые помощники, ИИ-аналитика и CRM-интеграции. К продукту «Навылет! AI» подключено 10+ компаний туристической отрасли. Команда прошла Fast Track IT в Фонде «Сколково». Регулярно выступаем на ТПП РФ, РСТ, МГИМО, РЭУ им. Г. В. Плеханова.

## О компании
- [О компании ИИМПАКТ ПЛЮС](${site.domain}/about): юр. лицо ${site.legalName}, ИНН ${site.inn}, ОГРН ${site.ogrn}. Год запуска направления ИИ в туризме — 2023. Основатель и CEO — Силагадзе Лукиан Ираклиевич, эксперт по искусственному интеллекту в туризме при ТПП РФ.
- [Контакты и форма заявки](${site.domain}/contact): email ${site.email}, телефон ${site.phone}, офис в Москве (${site.addressShort}).
- [Экспертиза и публичные выступления](${site.domain}/expertise): доклады на ТПП РФ, РСТ, МГИМО, РЭУ, конгрессах в Москве, Сочи, Минске, Махачкале, Актау.

## Продукт «Навылет! AI»
- [Навылет! AI — готовый ИИ-турменеджер](${site.domain}/navilet-ai): подбор туров на базе поисковой системы Tourvisor, FAQ, карточки отелей, передача заявки в CRM. Подключено 10+ компаний туристической отрасли.
- [Сайт продукта navilet.ru](${site.naviletWebsite}): отдельная маркетинговая площадка, демо-сценарии и личный кабинет клиента.
- Поисковый источник: продукт «Навылет! AI» работает на базе поисковой системы Tourvisor — карточки туров, цены и наличие подтягиваются из её актуальной выдачи.

## Решения по сегментам
${solutions
  .map(
    (s) =>
      `- [${s.title}](${site.domain}/solutions/${s.slug}): ${s.summary}`,
  )
  .join("\n")}

## Услуги
${services
  .map(
    (s) =>
      `- [${s.title}](${site.domain}/services/${s.slug}): ${s.text}`,
  )
  .join("\n")}

## Кейсы
${cases
  .map(
    (c) =>
      `- [${c.title}](${site.domain}/cases/${c.slug}): ${c.summary}`,
  )
  .join("\n")}

## Гайды
${guides
  .map(
    (g) =>
      `- [${g.title}](${site.domain}/guides/${g.slug}): ${g.description}`,
  )
  .join("\n")}

## Блог
${blogPosts
  .map(
    (b) =>
      `- [${b.title}](${site.domain}/blog/${b.slug}): ${b.description}`,
  )
  .join("\n")}

## География (локальные посадочные)
${cities
  .map(
    (c) =>
      `- [${c.title}](${site.domain}/cities/${c.slug}): ${c.description}`,
  )
  .join("\n")}

## FAQ
${faq.map((f) => `- ${f.question}\n  ${f.answer}`).join("\n")}

## Optional
- [Полная версия для LLM (llms-full.txt)](${site.domain}/llms-full.txt): развёрнутая факт-сетка с числами, интеграциями, мероприятиями и сценариями.
- [Sitemap](${site.domain}/sitemap.xml)
- [Политика конфиденциальности](${site.domain}/privacy)
- [Публичная оферта](${site.domain}/offer)
`;

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
