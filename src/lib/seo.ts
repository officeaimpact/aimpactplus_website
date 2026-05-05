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

const BASE_KEYWORDS: ReadonlyArray<string> = [
  "AI в туризме",
  "ИИ в туризме",
  "AI-ассистент для турагентства",
  "AI-ассистент для туроператора",
  "ИИ для турбизнеса",
  "Навылет AI",
  "ИИМПАКТ ПЛЮС",
  "AIMPACT",
  "AI-турменеджер",
  "AI-чат-бот для сайта",
  "автоматизация турагентства",
  "AI-аналитика туризм",
  "AI для отеля",
  "AI для турагрегатора",
  "AI-интегратор Россия",
  "AI-внедрение туризм",
  "цифровизация туризма",
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
    logo: absoluteUrl("/icon"),
    image: absoluteUrl("/apple-icon"),
    email: site.email,
    telephone: site.phone,
    taxID: site.inn,
    foundingDate: "2025-06-06",
    founders: [
      { "@type": "Person", name: "Силагадзе Лукиан Ираклиевич" },
      { "@type": "Person", name: "Погосов Филипп Сергеевич" },
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
      "Искусственный интеллект",
      "AI-ассистенты",
      "Автоматизация туризма",
      "Чат-боты для турагентств",
      "Голосовые ассистенты",
      "AI-аналитика",
      "Tourvisor",
      "AmoCRM",
      "Bitrix24",
      "Внедрение AI в туризм",
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
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.domain}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
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
    serviceType: input.serviceType ?? "AI integration for tourism",
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
    category: "AI assistant for tourism",
    url: absoluteUrl(input.url),
    image: input.image ? absoluteUrl(input.image) : undefined,
  } as const;
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  url: string;
  datePublishedISO?: string;
  dateModifiedISO: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.url),
    inLanguage: "ru-RU",
    datePublished: input.datePublishedISO ?? input.dateModifiedISO,
    dateModified: input.dateModifiedISO,
    image: input.image ? absoluteUrl(input.image) : undefined,
    isPartOf: { "@type": "WebSite", url: site.domain },
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
        url: absoluteUrl("/icon"),
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.summary,
    url: absoluteUrl(input.url),
    inLanguage: "ru-RU",
    about: input.client,
    articleSection: input.segment,
    isPartOf: {
      "@type": "WebSite",
      url: site.domain,
    },
    author: {
      "@type": "Organization",
      name: site.legalName,
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
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
  date: string;
  location: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    location: { "@type": "Place", name: input.location },
    organizer: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    description_note: input.date,
  } as const;
}
