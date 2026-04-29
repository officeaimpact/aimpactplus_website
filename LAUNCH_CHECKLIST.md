# Launch Checklist — `ии-туризм.рф` (ИИМПАКТ ПЛЮС)

Документ описывает шаги перевода нового сайта в продакшн без простоя.
Проходим step-by-step сверху вниз. Каждый блок отмечает ответственный
и подтверждает дату.

---

## 1. Контент и копирайт

- [ ] Метрики кейсов и точные цифры подтверждены клиентами или заменены
      нейтральными формулировками.
- [ ] Цитаты с именами/должностями отраслевых экспертов согласованы
      с источниками (РСТ, ТУРПОМОЩЬ, МГИМО, РЭУ, туроператоры).
- [ ] Описание команды / основателей одобрено.
- [ ] Реквизиты ООО «ИИМПАКТ ПЛЮС» соответствуют выписке из ЕГРЮЛ.

## 2. Юридические страницы

- [ ] `/privacy` отредактирована юристом, метка `[draft]` снята.
- [ ] `/terms` отредактирована юристом, метка `[draft]` снята.
- [ ] `/offer` отредактирована юристом, метка `[draft]` снята.
- [ ] Чекбокс согласия 152-ФЗ ссылается на актуальную редакцию.
- [ ] Cookie consent banner (`CookieConsent`) включает отказ.

## 3. Лид-канал

- [ ] Заполнены секреты в продакшн `.env`:
  - `WEB3FORMS_ACCESS_KEY`
  - `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
  - (опционально) `CRM_WEBHOOK_URL`
  - `LEADS_FALLBACK_EMAIL`
- [ ] Тест отправки заявки: получено письмо + Telegram + (опционально) CRM.
- [ ] Тест honeypot: запрос с заполненным `website` возвращает 400 `spam`.
- [ ] Тест rate-limit: 10 запросов / минуту с одного IP начинают возвращать 429.
- [ ] Thank-you-экран отображается, ссылка на email присутствует.

## 4. Аналитика

- [ ] `NEXT_PUBLIC_GA_ID` настроен (GA4 ID `G-…`).
- [ ] `NEXT_PUBLIC_YM_ID` настроен (Я.Метрика ID).
- [ ] Я.Метрика и GA4 видят события:
      `lead_form_view`, `lead_form_start`, `lead_step_1`…`lead_step_4`,
      `lead_submit_success`, `lead_submit_error`, `lead_modal_open`,
      `lead_modal_close`, `lead_cta_click`.
- [ ] В GA4 созданы цели на `lead_submit_success` и `lead_step_4`.
- [ ] В Я.Метрике созданы цели на те же события через `reachGoal`.

## 5. SEO

- [ ] `sitemap.xml` доступен и содержит все 24+ URL.
- [ ] `robots.txt` доступен, указывает корректный sitemap.
- [ ] `llms.txt` отдаёт описание продукта и услуг.
- [ ] Sitemap отправлен в Я.Вебмастер и Google Search Console.
- [ ] `Organization`, `WebSite`, `Service`, `Product`, `BreadcrumbList`,
      `FAQPage`, `ItemList`, `Article` JSON-LD проходят валидацию
      [schema.org validator](https://validator.schema.org/).
- [ ] Open Graph картинка `/opengraph-image` рендерится, размер 1200×630.

## 6. Доступность и качество

- [ ] Lighthouse: Performance ≥ 90, A11y ≥ 95, SEO 100, BP ≥ 95
      на главной, `/navilet-ai`, `/cases`, `/contact`.
- [ ] Axe a11y: 0 critical и 0 serious нарушений.
- [ ] Tabbing проходит логично от skip-link до футера.
- [ ] Mobile QA на 360px / 414px (Safari iOS, Chrome Android).
- [ ] `prefers-reduced-motion` подтверждён вручную.

## 7. DNS и cut-over

- [ ] Снапшот текущего WP-сайта.
- [ ] DNS A / AAAA / CNAME готовы для нового хостинга
      (Vercel / Yandex Cloud / VPS).
- [ ] TLS / HTTPS сертификат установлен.
- [ ] 301-редиректы в `next.config.ts` покрывают значимые WP-URL
      (`/index.php`, `/glavnaya`, `/uslugi`, `/keysy`, `/o-kompanii`,
      `/kontakty`, `/navilet`).
- [ ] Тест 301-кодов через `curl -I`.
- [ ] Cut-over проводится в окно низкого трафика.

## 8. Запуск

- [ ] Тег `v1.0.0` создан, релиз-нота заполнена.
- [ ] Команда уведомлена в Telegram-канале о смене сайта.
- [ ] Я.Вебмастер показывает индексацию новых URL.
- [ ] Через 7 дней — повторный аудит ошибок 404 в Я.Вебмастере и Search Console.

## 9. Бэкап и безопасность

- [ ] Бэкап старой WP-базы.
- [ ] Бэкап `.env` в защищённом хранилище (1Password / Bitwarden).
- [ ] Логи API `/api/leads` собираются (минимум 30 дней).
