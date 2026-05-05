import {
  site,
  solutions,
  services,
  cases,
  faq,
} from "@/lib/site-data";

export const dynamic = "force-static";

/**
 * Документ для ИИ-агентов и LLM-краулеров (формат llmstxt.org).
 * Минималистичный и хорошо цитируемый: краткое описание + ссылочные блоки.
 * Для расширенной версии см. /llms-full.txt.
 */
export async function GET() {
  const text = `# ${site.name} — ${site.legalName}

> ${site.description} Внедряем ИИ в туризм с 2023 года: готовый AI-турменеджер «Навылет! AI», AI-ассистенты, голосовые помощники, AI-аналитика и CRM-интеграции. К продукту «Навылет! AI» подключено 15+ компаний туристической отрасли. Команда прошла Fast Track IT в Фонде «Сколково». Регулярно выступаем на ТПП РФ, РСТ, МГИМО, РЭУ им. Г. В. Плеханова.

## О компании
- [О компании ИИМПАКТ ПЛЮС](${site.domain}/about): юр. лицо ${site.legalName}, ИНН ${site.inn}, ОГРН ${site.ogrn}. Год запуска направления AI в туризме — 2023.
- [Контакты и форма заявки](${site.domain}/contact): email ${site.email}, телефон ${site.phone}, офис в Москве (${site.addressShort}).
- [Экспертиза и публичные выступления](${site.domain}/expertise): доклады на ТПП РФ, РСТ, МГИМО, РЭУ, конгрессах в Москве, Сочи, Минске, Махачкале, Актау.

## Продукт «Навылет! AI»
- [Навылет! AI — готовый AI-турменеджер](${site.domain}/navilet-ai): подбор туров на базе поисковой системы Tourvisor, FAQ, карточки отелей, передача заявки в CRM. Подключено 15+ компаний.
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
- [Как внедрить ИИ в туризме: с чего начать, этапы, сроки и стоимость](${site.domain}/guides/kak-vnedrit-ii-v-turizme): пошаговый гайд по внедрению искусственного интеллекта в туристическую компанию.

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
