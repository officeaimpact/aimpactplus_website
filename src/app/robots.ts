import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/lib/site-data";

// Явно разрешаем индексировать сайт всем основным поисковым роботам
// (Google, Bing, Yandex, Mail.ru, DuckDuckGo) и LLM-краулерам
// (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot,
// Google-Extended, Applebot-Extended, YandexAdditional). API закрываем.
export default function robots(): MetadataRoute.Robots {
  const llmAndSearchBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "YandexBot",
    "YandexAdditional",
    "Bingbot",
    "DuckDuckBot",
    "Mail.RU_Bot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: llmAndSearchBots,
        allow: ["/", "/llms.txt", "/llms-full.txt"],
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.domain,
  };
}
