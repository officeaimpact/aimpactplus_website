import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site-data";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Analytics } from "@/components/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.domainDisplay} — ИИ-решения для туристического бизнеса | ${site.brand}`,
    template: `%s | ${site.domainDisplay}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }, { name: site.ceo }],
  creator: site.legalName,
  publisher: site.legalName,
  keywords: [
    // Ключи дублируются в формах ИИ и AI: люди ищут оба варианта в Рунете.
    "ИИ в туризме",
    "AI в туризме",
    "искусственный интеллект в туризме",
    "внедрение ИИ в туризм",
    "внедрение AI в туризм",
    "ИИ для туризма",
    "AI для туризма",
    "ИИ-ассистент для турагентства",
    "AI-ассистент для турагентства",
    "ИИ-турменеджер",
    "AI-турменеджер",
    "ИИ-чат-бот для сайта",
    "AI-чат-бот для сайта",
    "Навылет AI",
    "Навылет ИИ",
    "Navilet AI",
    "автоматизация турагентства",
    "ИИ для туроператоров",
    "AI для туроператоров",
    "ИИ для отеля",
    "AI для отеля",
    "ИИ для турагрегатора",
    "AI для турагрегатора",
    "ИИ для турбизнеса",
    "ИИ-аналитика туризм",
    "AI-аналитика туризм",
    "ИИ-интегратор Россия",
    "AI-интегратор Россия",
    "цифровизация туризма",
    "Tourvisor ИИ",
    "Tourvisor AI",
    "AmoCRM ИИ",
    "AmoCRM AI",
    "Bitrix24 ИИ",
    "Bitrix24 AI",
    "ИИМПАКТ ПЛЮС",
    "AIMPACT",
    "AIMPACT+",
    "ИИМПАКТ",
  ],
  category: "Information Technology",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    title: `${site.domainDisplay} — ИИ-решения для туристического бизнеса`,
    description: site.description,
    url: site.domain,
    siteName: site.name,
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/og/og-default.png",
        width: 1200,
        height: 630,
        alt: `${site.brand} — ИИ-решения для туристического бизнеса`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.domainDisplay} — ИИ-решения для туристического бизнеса`,
    description: site.description,
    images: ["/og/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#001229" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
