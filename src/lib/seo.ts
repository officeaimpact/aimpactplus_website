import type { Metadata } from "next";
import { absoluteUrl, site } from "./site-data";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
  /** Дополнительные ключевые слова на конкретный роут. */
  keywords?: string[];
  /** Тип Open Graph — по умолчанию website. Используем article для кейсов. */
  ogType?: "website" | "article";
  /**
   * Прямой URL OG-картинки. По умолчанию используется глобальная
   * `opengraph-image.tsx` (генерируется Next.js автоматически).
   */
  ogImage?: string;
};

// SEO ключи: держим обе формы (ИИ и AI), потому что в рунете ищут оба варианта.
// Видимый body-текст переведён на ИИ — для русскоязычных пользователей и LLM.
const BASE_KEYWORDS: ReadonlyArray<string> = [
  "ИИ в туризме",
  "AI в туризме",
  "искусственный интеллект в туризме",
  "внедрение ИИ в туризм",
  "внедрение AI в туризм",
  "ИИ-ассистент для турагентства",
  "AI-ассистент для турагентства",
  "ИИ-ассистент для туроператора",
  "AI-ассистент для туроператора",
  "ИИ для турбизнеса",
  "ИИ-турменеджер",
  "AI-турменеджер",
  "ИИ-чат-бот для сайта",
  "AI-чат-бот для сайта",
  "автоматизация турагентства",
  "ИИ-аналитика для туризма",
  "AI-аналитика туризм",
  "ИИ для отеля",
  "AI для отеля",
  "ИИ для турагрегатора",
  "AI для турагрегатора",
  "ИИ-интегратор Россия",
  "AI-интегратор Россия",
  "цифровизация туризма",
  "Навылет AI",
  "Навылет",
  "ИИМПАКТ ПЛЮС",
  "AIMPACT",
  "Tourvisor ИИ",
  "Tourvisor AI",
];

/** Дефолтный путь к статичному OG-изображению (1200×630 PNG в /public/og). */
const DEFAULT_OG_IMAGE = "/og/og-default.png";

/**
 * Замечание по IDN-домену (https://ии-туризм.рф):
 *
 * Next.js пропускает значения `alternates.canonical`, `openGraph.url` и
 * `openGraph.images[].url` через `new URL(value, metadataBase)` при рендере.
 * Node URL-конструктор по WHATWG-спеке нормализует IDN-хост в Punycode,
 * поэтому в HTML мы видим `https://xn----ntbbabzzpj.xn--p1ai`. Это не SEO-
 * проблема: Google и Яндекс трактуют обе формы как один и тот же ресурс
 * и декодируют IDN для отображения в выдаче.
 *
 * Где сохраняется кириллица — в местах, которые рендерим сами (без Metadata
 * API): sitemap.xml (loc), robots.txt (Host/Sitemap), llms.txt — для
 * Yandex (предпочитает IDN) и для human-readable шеринга.
 */

export function pageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
  ogType = "website",
  ogImage,
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const allKeywords = Array.from(new Set([...BASE_KEYWORDS, ...keywords]));
  // Если страница задаёт свой ogImage — используем его, иначе подставляем
  // глобальный статичный fallback. Явный image на каждой странице нужен,
  // чтобы Telegram/WhatsApp/ChatGPT не брали edge-сгенерированный вариант
  // вместо стабильного PNG.
  const imageUrl = absoluteUrl(ogImage ?? DEFAULT_OG_IMAGE);

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
      languages: {
        "ru-RU": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "ru_RU",
      type: ogType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    legalName: site.legalName,
    alternateName: [
      site.name,
      site.brand,
      "AIMPACT",
      "ИИМПАКТ",
      site.productName,
      "Навылет AI",
    ],
    description: site.description,
    url: site.domain,
    // Логотип отдаём как ImageObject с реальными размерами — Google требует
    // именно ImageObject для богатых результатов, а не строковый URL.
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon-512.png"),
      width: 512,
      height: 512,
    },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl("/apple-icon.png"),
      width: 180,
      height: 180,
    },
    email: site.email,
    telephone: site.phone,
    taxID: site.inn,
    foundingDate: "2025-06-06",
    founders: [
      { "@type": "Person", name: "Силагадзе Лукиан Ираклиевич" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Трубниковский переулок, д. 24, стр. 1, помещение 14",
      addressLocality: "Москва",
      postalCode: "121069",
      addressCountry: "RU",
    },
    areaServed: { "@type": "Country", name: "Россия" },
    knowsAbout: [
      "Искусственный интеллект в туризме",
      "Внедрение ИИ в туристический бизнес",
      "ИИ-ассистенты для турагентств и туроператоров",
      "Автоматизация продаж туров",
      "ИИ-чат-боты и голосовые ассистенты",
      "ИИ-аналитика для туризма",
      "Интеграция с Tourvisor",
      "Интеграция с AmoCRM",
      "Интеграция с Bitrix24",
      "Интеграция с UON CRM",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: site.phone,
        contactType: "sales",
        areaServed: "RU",
        availableLanguage: ["ru", "en"],
        email: site.email,
      },
    ],
    sameAs: [site.domain, site.naviletWebsite],
  } as const;
}

export function websiteJsonLd() {
  // SearchAction намеренно НЕ добавляем: реальной поисковой страницы на сайте
  // нет, а Google штрафует «фейковые» SearchAction. Если позже сделаем /search —
  // вернём это поле с настоящим target.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    alternateName: [site.brand, "AIMPACT", "ИИМПАКТ ПЛЮС"],
    url: site.domain,
    description: site.description,
    inLanguage: "ru-RU",
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
  } as const;
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  } as const;
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  audience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? "Внедрение ИИ в туризм",
    url: absoluteUrl(input.url),
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    areaServed: { "@type": "Country", name: "Россия" },
    audience: input.audience
      ? { "@type": "BusinessAudience", audienceType: input.audience }
      : undefined,
    inLanguage: "ru-RU",
  } as const;
}

export function productJsonLd(input: {
  name: string;
  description: string;
  url: string;
  brand: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    brand: { "@type": "Brand", name: input.brand },
    manufacturer: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    category: "ИИ-ассистент для туризма",
    url: absoluteUrl(input.url),
    image: input.image ? absoluteUrl(input.image) : undefined,
  } as const;
}

/**
 * Person JSON-LD для основателя. Используется как `author` в Article-схемах,
 * чтобы Google и Яндекс понимали реального автора-эксперта (E-E-A-T).
 * URL `/about#author-lukian` указывает на якорь страницы /about с био.
 */
export function founderPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": absoluteUrl("/about#author-lukian"),
    name: site.ceo,
    givenName: "Лукиан",
    familyName: "Силагадзе",
    additionalName: "Ираклиевич",
    jobTitle: "Генеральный директор и основатель ИИМПАКТ ПЛЮС",
    description:
      "Эксперт по искусственному интеллекту и цифровым технологиям в туризме, член Комитета ТПП РФ по предпринимательству в сфере туризма. Спикер ТПП РФ, РСТ, МГИМО, РЭУ им. Г. В. Плеханова.",
    knowsAbout: [
      "Искусственный интеллект в туризме",
      "Внедрение ИИ в туристический бизнес",
      "ИИ-ассистенты и чат-боты",
      "Голосовые ИИ-ассистенты",
      "Интеграции с Tourvisor, AmoCRM, Bitrix24",
      "152-ФЗ при работе с персональными данными туристов",
    ],
    worksFor: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    memberOf: {
      "@type": "Organization",
      name: "Торгово-промышленная палата Российской Федерации",
      url: "https://tpprf.ru/",
    },
    url: absoluteUrl("/about#author-lukian"),
    sameAs: [site.domain, site.naviletWebsite],
  } as const;
}

/**
 * Краткая ссылка-на-Person — для использования внутри других JSON-LD
 * (Article.author, Article.creator). Использует @id, чтобы Google связал
 * Person с его полным описанием на /about.
 */
export const founderAuthorRef = {
  "@type": "Person",
  "@id": absoluteUrl("/about#author-lukian"),
  name: site.ceo,
  url: absoluteUrl("/about#author-lukian"),
} as const;

/**
 * LocalBusiness JSON-LD — для страницы /about. Это сильный сигнал для
 * Яндекс.Карт и локального поиска: офис в Москве, конкретный адрес и
 * телефон. Точные координаты офиса можно уточнить позднее.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/about#local-business"),
    name: site.brand,
    legalName: site.legalName,
    description: site.description,
    url: site.domain,
    image: absoluteUrl("/og/og-default.png"),
    logo: absoluteUrl("/icon-512.png"),
    email: site.email,
    telephone: site.phone,
    taxID: site.inn,
    priceRange: "₽₽",
    areaServed: { "@type": "Country", name: "Россия" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Трубниковский переулок, д. 24, стр. 1, помещение 14",
      addressLocality: "Москва",
      postalCode: "121069",
      addressCountry: "RU",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "10:00",
        closes: "19:00",
      },
    ],
  } as const;
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublishedISO?: string;
  dateModifiedISO: string;
  image?: string;
  /** Раздел/категория статьи — для articleSection (важно для LLM-классификации). */
  articleSection?: string;
  /** Если true — author = основатель Лукиан (Person). Иначе автор — Organization. */
  authorIsFounder?: boolean;
  /** Ключевые слова (через запятую) — для Article.keywords. */
  keywords?: string[];
}) {
  const author = input.authorIsFounder
    ? founderAuthorRef
    : {
        "@type": "Organization" as const,
        name: site.legalName,
        url: site.domain,
      };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    mainEntityOfPage: absoluteUrl(input.url),
    inLanguage: "ru-RU",
    datePublished: input.datePublishedISO ?? input.dateModifiedISO,
    dateModified: input.dateModifiedISO,
    image: input.image ? absoluteUrl(input.image) : undefined,
    articleSection: input.articleSection,
    keywords: input.keywords?.join(", "),
    isPartOf: { "@type": "WebSite", url: site.domain },
    author,
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon-512.png"),
        width: 512,
        height: 512,
      },
    },
  } as const;
}

export function howToJsonLd(input: {
  name: string;
  description: string;
  totalTime?: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    inLanguage: "ru-RU",
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    step: input.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } as const;
}

export function caseStudyJsonLd(input: {
  title: string;
  summary: string;
  url: string;
  client: string;
  segment: string;
  /** ISO-дата публикации кейса (если не задана — используется dateModified). */
  datePublishedISO?: string;
  /** ISO-дата последней редакции кейса. */
  dateModifiedISO?: string;
  /** URL картинки/логотипа кейса (для богатых результатов). */
  image?: string;
}) {
  const dateModified = input.dateModifiedISO ?? "2025-10-01";
  const datePublished = input.datePublishedISO ?? dateModified;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.summary,
    url: absoluteUrl(input.url),
    inLanguage: "ru-RU",
    about: input.client,
    articleSection: input.segment,
    datePublished,
    dateModified,
    image: input.image ? absoluteUrl(input.image) : undefined,
    isPartOf: {
      "@type": "WebSite",
      url: site.domain,
    },
    author: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon-512.png"),
        width: 512,
        height: 512,
      },
    },
  } as const;
}

export function itemListJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  } as const;
}

export function eventJsonLd(input: {
  name: string;
  /** ISO-дата начала события (например, "2025-09-25"). */
  startDate: string;
  /** ISO-дата окончания. Если событие однодневное — можно не задавать. */
  endDate?: string;
  location: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: input.startDate,
    ...(input.endDate ? { endDate: input.endDate } : {}),
    location: { "@type": "Place", name: input.location },
    organizer: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
  } as const;
}
