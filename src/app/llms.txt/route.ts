import { site, solutions, services, cases, partners, naviletFeatures } from "@/lib/site-data";

export const dynamic = "force-static";

export async function GET() {
  const text = `# ${site.legalName} (бренд ${site.brand})

${site.description}

## О компании
- Юр. название: ${site.legalName}
- ИНН: ${site.inn}, ОГРН: ${site.ogrn}
- Дата регистрации: ${site.founded}
- Юр. адрес: ${site.address}
- Email: ${site.email}, Телефон: ${site.phone}
- Сайт: ${site.domain} (${site.domainDisplay})

## Что мы делаем
ИИМПАКТ ПЛЮС — IT-компания, которая внедряет AI-решения в туризм.
Мы проектируем и запускаем AI-ассистентов, виджеты, CRM-интеграции, аналитику и голосовые сценарии для турагентств, туроператоров, отелей и туристических дестинаций.

## Сегменты (страницы)
${solutions.map((s) => `- ${s.title} — ${site.domain}/solutions/${s.slug} — ${s.summary}`).join("\n")}

## Услуги
${services.map((s) => `- ${s.title} — ${site.domain}/services — ${s.text}`).join("\n")}

## Продукт «Навылет! AI» (${site.domain}/navilet-ai)
Готовый AI-турменеджер для сайта туристической компании:
${naviletFeatures.map((f) => `- ${f.title}: ${f.text}`).join("\n")}

## Кейсы
${cases.map((c) => `- ${c.title} (${c.segment}) — ${site.domain}/cases/${c.slug} — ${c.summary}`).join("\n")}

## Экспертиза и партнёры
Выступаем на: ${partners.map((p) => p.name).join(", ")}.

## Как связаться
${site.domain}/contact или email ${site.email}.

## Полный sitemap
${site.domain}/sitemap.xml
`;

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
