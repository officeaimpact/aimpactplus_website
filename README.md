# ИИ-Туризм.рф — сайт ООО «ИИМПАКТ ПЛЮС»

Многостраничный B2B-сайт для туристической вертикали ИИМПАКТ ПЛЮС (бренд `AIMPACT+`).
Раскрывает AI-решения для турагентств, туроператоров, отелей и туристических дестинаций,
а также продукт **Навылет! AI**.

## Стек

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS 4 (`@theme`)
- framer-motion 12
- lucide-react
- zod (валидация форм, Iter 3)
- next/font: Manrope + Inter (cyrillic + latin)

## Запуск

```bash
npm install
npm run dev
```

Дев-сервер: <http://localhost:3000>.

## Скрипты

```bash
npm run dev        # dev (turbopack)
npm run build      # production build
npm run start      # production server
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Структура

```
src/
  app/
    globals.css         # дизайн-токены, утилиты, motion-fallback
    layout.tsx          # корневой layout, шрифты, JsonLd
    page.tsx            # главная
  components/
    Header.tsx          # sticky nav + mobile drawer
    Footer.tsx          # реквизиты + ссылки
    PageShell.tsx       # skip-to-content + Header + main + Footer
    ui/
      Button.tsx
      Badge.tsx
      Card.tsx
      SectionWrapper.tsx
      Tag.tsx
      Logo.tsx
      Breadcrumbs.tsx
      JsonLd.tsx
  lib/
    site-data.ts        # реквизиты, навигация
    seo.ts              # metadata, JSON-LD
    animations.ts       # framer-motion варианты
    cn.ts               # clsx wrapper
public/
  brand/logo.png        # AIMPACT+ logo (PNG)
```

## Итерации (см. план в `~/.cursor/plans/`)

- **Iter 1** — Фундамент (текущая): стек, дизайн-токены, UI, layout, шапка/подвал, лого.
- **Iter 2** — Контент-каркас: полная главная (Hero, ProblemSolution, HowItWorks, ...), `/solutions[/slug]`, `/navilet-ai`, `/cases[/slug]`, `/services`, `/expertise`, `/about`, `/contact`, sitemap/robots/llms.txt.
- **Iter 3** — Лид-система: 4-шаговая форма, Modal, FloatingCTA, `/api/leads` с zod+honeypot+rate-limit, Web3Forms+Telegram+CRM stub, аналитика, cookie-consent.
- **Iter 4** — SEO/a11y/perf: JSON-LD на всех страницах, llms.txt, OG-картинки, Lighthouse 90+/95+/100/95+, axe a11y, mobile QA.
- **Iter 5** — Запуск: финальная редактура юр. страниц, DNS, 301-редиректы, GA4 + Я.Метрика цели, README/LAUNCH_CHECKLIST/.env.example, git tag `v1.0.0`.

## Бренд и реквизиты

- ООО «ИИМПАКТ ПЛЮС», ИНН 9705243471, ОГРН 1257700255196.
- 115054, Москва, 5-й Монетчиковский пер., д. 16, пом. 2П.
- ОКВЭД 62.01 (разработка ПО).
- Зарегистрировано 06.06.2025.

## Дизайн-источник

Дизайн-язык наследуется из `https://github.com/officeaimpact/navilet_website`
(сайт продукта Навылет! AI), чтобы продукт и корпоративный сайт читались как одна семья.

Палитра:
`#0052CC primary` · `#0097F5 accent` · `#00E7FD sky` · бренд-градиент `#00E7FD → #0097F5 → #0062EF`
· deep `#001229` для hero/footer.

## Лид-система (Iter 3)

Каналы маршрутизации настраиваются через env (см. `.env.example`):

- `WEB3FORMS_ACCESS_KEY` — основной email-relay
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` — пуш в чат команды
- `CRM_WEBHOOK_URL` — опциональная интеграция (AmoCRM/Bitrix24)
- `LEADS_FALLBACK_EMAIL=office@aimpact.ru`

Без секретов API работает в preview-режиме (можно тестировать локально без рисков).
