export const site = {
  name: "ИИ-Туризм",
  legalName: "ООО «ИИМПАКТ ПЛЮС»",
  brand: "AIMPACT+",
  productName: "Навылет! AI",
  domain: "https://xn----ntbbabzzpj.xn--p1ai",
  domainDisplay: "ии-туризм.рф",
  email: "office@aimpact.ru",
  phone: "+7 (963) 799-79-77",
  phoneHref: "tel:+79637997977",
  inn: "9705243471",
  ogrn: "1257700255196",
  kpp: "770501001",
  address:
    "115054, г. Москва, вн.тер.г. муниципальный округ Замоскворечье, 5-й Монетчиковский пер., д. 16, помещ. 2П",
  addressShort: "Москва, 5-й Монетчиковский пер., 16",
  founded: "06.06.2025",
  ceo: "Силагадзе Лукиан Ираклиевич",
  tagline: "AI-решения для туристического бизнеса",
  description:
    "ИИМПАКТ ПЛЮС — IT-компания, которая проектирует и внедряет AI-ассистентов, виджеты, CRM-интеграции, аналитику и голосовые сценарии для туризма, гостеприимства и туристических дестинаций.",
} as const;

export const navigation = [
  { label: "Решения", href: "/solutions" },
  { label: "Навылет! AI", href: "/navilet-ai" },
  { label: "Кейсы", href: "/cases" },
  { label: "Услуги", href: "/services" },
  { label: "Экспертиза", href: "/expertise" },
  { label: "О компании", href: "/about" },
] as const;

export const footerLinks = {
  product: [
    { label: "Решения", href: "/solutions" },
    { label: "Навылет! AI", href: "/navilet-ai" },
    { label: "Кейсы", href: "/cases" },
    { label: "Услуги", href: "/services" },
  ],
  company: [
    { label: "О компании", href: "/about" },
    { label: "Экспертиза", href: "/expertise" },
    { label: "Контакты", href: "/contact" },
  ],
  legal: [
    { label: "Политика конфиденциальности", href: "/privacy" },
    { label: "Условия использования", href: "/terms" },
    { label: "Публичная оферта", href: "/offer" },
  ],
} as const;
