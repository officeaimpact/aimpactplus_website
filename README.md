# ИИ-Туризм.рф — корпоративный сайт ООО «ИИМПАКТ ПЛЮС»

Многостраничный B2B-сайт туристической вертикали ИИМПАКТ ПЛЮС (бренд `AIMPACT+`).
Раскрывает AI-решения для турагентств, туроператоров, отелей и туристических
дестинаций, а также продукт **Навылет! AI**.

## Стек

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4 (`@theme`)
- framer-motion 12
- lucide-react
- zod (валидация форм)
- next/font: Manrope + Inter (cyrillic + latin)

## Запуск

```bash
npm install
cp .env.example .env  # заполните секреты при необходимости
npm run dev
```

Дев-сервер на <http://localhost:3000>. При запуске без секретов
(`WEB3FORMS_ACCESS_KEY`, `TELEGRAM_BOT_TOKEN`, `CRM_WEBHOOK_URL`) форма работает
в **preview-режиме**: запросы валидируются, лиды логируются в консоль сервера,
e-mail / Telegram / CRM не вызываются. Это безопасно для локальной разработки.

## Скрипты

```bash
npm run dev        # dev-сервер (Turbopack)
npm run build      # production build
npm run start      # production server
npm run lint       # ESLint flat config
npm run typecheck  # tsc --noEmit
```

## Структура

```
src/
  app/
    globals.css                # дизайн-токены, утилиты, motion-fallback
    layout.tsx                 # корневой layout, шрифты, JsonLd, Analytics
    page.tsx                   # главная (Hero, Audience, Solutions, Trust, ...)
    solutions/                 # /solutions + /solutions/[slug]
    cases/                     # /cases + /cases/[slug]
    services/                  # /services с anchor-ссылками
    navilet-ai/                # продуктовая страница
    expertise/                 # выступления, награды, отзывы
    about/                     # миссия, команда, реквизиты
    contact/                   # форма + прямые каналы
    privacy/, terms/, offer/   # юр. страницы (черновики)
    api/leads/route.ts         # POST: zod, honeypot, rate-limit, маршрутизация
    sitemap.ts                 # sitemap.xml
    robots.ts                  # robots.txt
    llms.txt/route.ts          # описание для AI-поисковиков
    opengraph-image.tsx        # 1200×630 OG-картинка
    icon.tsx, apple-icon.tsx   # favicon набор
    manifest.ts                # PWA-манифест
    not-found.tsx              # 404
  components/
    Header.tsx                 # sticky nav + mobile drawer + кнопка Демо (modal)
    Footer.tsx                 # реквизиты + ссылки
    PageShell.tsx              # skip-link + Header + main + Footer + FloatingCTA + Cookie
    DemoWidget.tsx             # переключаемые сценарии Навылет! AI
    LeadForm.tsx               # 4-шаговая форма с прогресс-баром
    LeadFormModal.tsx          # модалка с focus-trap и ESC-close
    FloatingCTA.tsx            # sticky-кнопка снизу при scroll > 480px
    CookieConsent.tsx          # 152-ФЗ-баннер (принять / только необходимые)
    Analytics.tsx              # GA4 + Я.Метрика (env-driven)
    sections/                  # Hero, Metrics, Audience, ProblemSolution,
                               # SolutionsMap, HowItWorks, NaviletPreview,
                               # CasesPreview, Trust, ExpertiseTeaser, FAQ, CtaBand
    ui/                        # Button, Badge, Card, Tag, SectionWrapper,
                               # PageHero, Logo, Breadcrumbs, JsonLd
  lib/
    site-data.ts               # единый источник контента
    seo.ts                     # metadata + JSON-LD генераторы
    animations.ts              # framer-motion варианты
    cn.ts                      # clsx wrapper
    lead-schema.ts             # zod-схема + классификация лида
    lead-routing.ts            # Web3Forms + Telegram + CRM (Promise.allSettled)
    rate-limit.ts              # in-memory bucket по IP (10 req/min)
    analytics.ts               # track() + getTrackingMeta()
public/
  brand/logo.png               # AIMPACT+ logo (PNG)
```

## Информационная архитектура

- `/` — портал входа: hero с word-reveal, demo-widget, аудитории, решения,
  Навылет! AI, кейсы, доверие, экспертиза, FAQ, CTA.
- `/solutions` + 4 detail (`travel-agencies`, `tour-operators`, `hotels`, `destinations`).
- `/navilet-ai` — продукт: hero+demo, features, интеграции, how-it-works,
  white-label, FAQ.
- `/cases` + 4 case-studies.
- `/services` — 8 услуг (custom-ai, crm-integration, bots-voice, analytics,
  training, consulting, computer-vision, cloud-ai) с anchor-ссылками и Service JSON-LD.
- `/expertise` — 12+ публичных выступлений, награды, цитаты.
- `/about` — миссия, команда, юридические реквизиты.
- `/contact` — прямые каналы + многошаговая LeadForm.
- `/privacy`, `/terms`, `/offer` — юридические страницы.
- `/api/leads` — POST-handler с zod, honeypot и rate-limit.

## Бренд и реквизиты

- ООО «ИИМПАКТ ПЛЮС», ИНН 9705243471, ОГРН 1257700255196.
- Адрес: 115054, Москва, 5-й Монетчиковский пер., д. 16, пом. 2П.
- ОКВЭД 62.01 (разработка ПО).
- Учредители: Силагадзе Лукиан Ираклиевич (67%), Погосов Филипп Сергеевич (33%).
- Зарегистрировано 06.06.2025.

## Дизайн-источник

Дизайн-язык наследуется из <https://github.com/officeaimpact/navilet_website>
(сайт продукта Навылет! AI). Цели — продукт и корпоративный сайт читаются
как одна семья.

Палитра: `#0052CC` primary · `#0097F5` accent · `#00E7FD` sky · бренд-градиент
`#00E7FD → #0097F5 → #0062EF` · deep `#001229` для hero/footer.

Типографика: Manrope (display 700–900) + Inter (body 400–700), cyrillic + latin.

## Лид-система

См. `LAUNCH_CHECKLIST.md` для запуска. Каналы маршрутизации настраиваются через
`.env` (см. `.env.example`):

- `WEB3FORMS_ACCESS_KEY` — основной email-relay
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — мгновенный пуш
- `CRM_WEBHOOK_URL` — опциональный webhook (AmoCRM / Bitrix24 / любой POST endpoint)
- `LEADS_FALLBACK_EMAIL=office@aimpact.ru`

Защита: zod-валидация, honeypot-поле `website`, rate-limit 10 req/мин на IP,
UTM/sourcePath/referrer метаданные, согласие 152-ФЗ, server-side логирование.

## Аналитика

- `NEXT_PUBLIC_GA_ID` — GA4 ID (формат `G-XXXXXXXXXX`).
- `NEXT_PUBLIC_YM_ID` — Yandex.Metrika ID.

Если переменных нет, скрипты не подключаются. События отправляются через
`window.dataLayer` (GA4) и `ym(id, "reachGoal", event, params)` (Я.Метрика).

## SEO

- `sitemap.xml`, `robots.txt`, `llms.txt` генерируются автоматически.
- JSON-LD: Organization, WebSite, Service, Product, BreadcrumbList, FAQPage,
  ItemList, Article (CaseStudy).
- Динамический `/opengraph-image` 1200×630 через next/og.
- Цели: Lighthouse Performance 90+, A11y 95+, SEO 100, BP 95+.

## Деплой и cut-over

- Хостинг: рекомендуется Vercel (Next.js 16 native) или Yandex Cloud / Selectel
  (для российского контура и хранения данных в РФ).
- 301-редиректы со старых WP-URL включены в `next.config.ts` (см. `redirects()`).
- См. `LAUNCH_CHECKLIST.md` для пошаговой выкатки.

## Итерации (история)

- **iter-1** — Фундамент: стек, дизайн-токены, UI, layout, шапка/подвал, лого.
- **iter-2** — Контент-каркас: 24+ страниц, sitemap, robots, llms.txt.
- **iter-3** — Лид-система: LeadForm, modal, /api/leads, аналитика, cookies.
- **iter-4** — SEO + a11y: JSON-LD, OG-картинки, favicon, manifest.
- **iter-5 / v1.0.0** — Запуск: redirects, security headers, LAUNCH_CHECKLIST.

Лицензия: проприетарная, ИИМПАКТ ПЛЮС.
