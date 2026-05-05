export type Guide = {
  slug: string;
  title: string;
  description: string;
  /** Дата публикации (или последнего обновления). */
  updated: string;
  /** ISO-дата для машиночитаемых форматов. */
  updatedISO: string;
  /** Время чтения, человеко-читаемое. */
  readingTime: string;
  /** SEO-keywords. */
  keywords: string[];
};

export const guides: ReadonlyArray<Guide> = [
  {
    slug: "kak-vnedrit-ii-v-turizme",
    title:
      "Как внедрить ИИ в туризме: с чего начать, этапы, сроки и стоимость",
    description:
      "Пошаговый гайд по внедрению искусственного интеллекта в туристическую компанию: турагентство, туроператор, отель или агрегатор. Этапы аудита и пилота, сроки запуска, типовые риски, выбор между готовым продуктом и кастомной разработкой, FAQ.",
    updated: "Май 2026",
    updatedISO: "2026-05-04",
    readingTime: "12 мин",
    keywords: [
      "внедрить ИИ в туризме",
      "внедрение ИИ в туризме",
      "внедрение AI в туризм",
      "ИИ для турагентства",
      "AI в туризме с чего начать",
      "AI-ассистент для туристической компании",
      "AI-аудит",
      "стоимость внедрения ИИ в туризме",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
