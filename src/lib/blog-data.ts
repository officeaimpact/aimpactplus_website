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
    slug: "chto-takoe-ai-turmenedzher",
    title:
      "Что такое AI-турменеджер и зачем он турагентству в 2026 году",
    description:
      "Объясняем простым языком, что такое AI-турменеджер, чем он отличается от обычного чат-бота, какие задачи закрывает в турагентстве и как с ним уживаются менеджеры. Без хайпа и пустых обещаний.",
    category: "AI в турагентствах",
    publishedISO: "2026-05-04",
    publishedDisplay: "4 мая 2026",
    readingTime: "8 мин",
    keywords: [
      "AI-турменеджер",
      "ИИ-турменеджер",
      "AI для турагентства",
      "AI-ассистент турагентства",
      "что такое AI-турменеджер",
      "AI на сайт турагентства",
      "Навылет AI",
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
