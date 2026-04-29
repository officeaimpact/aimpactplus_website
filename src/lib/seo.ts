import type { Metadata } from "next";
import { site } from "./site-data";

type SeoInput = {
  title: string;
  description: string;
  path?: string;
};

export function pageMetadata({ title, description, path = "/" }: SeoInput): Metadata {
  const url = new URL(path, site.domain).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.legalName,
    alternateName: [site.name, site.brand, "AIMPACT", site.productName],
    url: site.domain,
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
      streetAddress: "5-й Монетчиковский переулок, д. 16, помещение 2П",
      addressLocality: "Москва",
      postalCode: "115054",
      addressCountry: "RU",
    },
    sameAs: [site.domain],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.domain,
    description: site.description,
    inLanguage: "ru-RU",
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
      item: new URL(item.href, site.domain).toString(),
    })),
  } as const;
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.serviceType ?? "AI integration",
    url: new URL(input.url, site.domain).toString(),
    provider: {
      "@type": "Organization",
      name: site.legalName,
      url: site.domain,
    },
    areaServed: { "@type": "Country", name: "Россия" },
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
      url: new URL(item.url, site.domain).toString(),
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
