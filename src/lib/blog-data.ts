export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** Тёг секции / категория. */
  category: string;
  /** Дата публикации (или последнего обновления). */
  publishedISO: string;
  publishedDisplay: string;
  /** Время чтения, человеко-читаемое. */
  readingTime: string;
  /** SEO-keywords для метаданных страницы. */
  keywords: string[];
};

export const blogPosts: ReadonlyArray<BlogPost> = [
  {
    slug: "ii-assistent-vs-chat-bot",
    title:
      "ИИ-ассистент vs чат-бот: в чём разница и когда выбирать что",
    description:
      "Разница между сценарным чат-ботом и ИИ-ассистентом на LLM: 8 параметров сравнения, табличка, кейсы из туризма, стоимость и сроки. Когда хватит обычного бота, а когда нужен ИИ.",
    category: "ИИ-ассистенты",
    publishedISO: "2026-05-27",
    publishedDisplay: "27 мая 2026",
    readingTime: "9 мин",
    keywords: [
      "ИИ-ассистент vs чат-бот",
      "AI-ассистент vs чат-бот",
      "разница чат-бот и ИИ",
      "разница нейросеть и чат-бот",
      "что выбрать чат-бот или ИИ",
      "ИИ-ассистент или чат-бот",
      "AI ассистент на сайт",
      "ChatGPT для бизнеса разница",
      "LLM для турагентства",
    ],
  },
  {
    slug: "chto-takoe-ai-turmenedzher",
    title:
      "Что такое ИИ-турменеджер и зачем он турагентству в 2026 году",
    description:
      "Объясняем простым языком, что такое ИИ-турменеджер (его также называют AI-турменеджер), чем он отличается от обычного чат-бота, какие задачи закрывает в турагентстве и как с ним уживаются менеджеры. Без хайпа и пустых обещаний.",
    category: "ИИ в турагентствах",
    publishedISO: "2026-05-04",
    publishedDisplay: "4 мая 2026",
    readingTime: "8 мин",
    keywords: [
      "ИИ-турменеджер",
      "AI-турменеджер",
      "ИИ для турагентства",
      "AI для турагентства",
      "ИИ-ассистент турагентства",
      "AI-ассистент турагентства",
      "что такое ИИ-турменеджер",
      "что такое AI-турменеджер",
      "ИИ на сайт турагентства",
      "Навылет AI",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
