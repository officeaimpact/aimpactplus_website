import type { MetadataRoute } from "next";
import { absoluteUrl, solutions, cases, services } from "@/lib/site-data";
import { guides } from "@/lib/guides-data";
import { blogPosts } from "@/lib/blog-data";
import { cities } from "@/lib/cities-data";

/**
 * Стабильные lastModified-даты — единственная дата обновления контентного
 * блока. Меняем вручную, когда правим контент (так Google и Яндекс не будут
 * получать «обновлено сейчас» при каждом билде, что ухудшает trust).
 */
const STATIC_PAGES_UPDATED = new Date("2026-05-27");
const SOLUTIONS_UPDATED = new Date("2026-05-27");
const SERVICES_UPDATED = new Date("2026-05-27");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: MetadataRoute.Sitemap = [
    "/",
    "/solutions",
    "/navilet-ai",
    "/cases",
    "/services",
    "/expertise",
    "/guides",
    "/blog",
    "/cities",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/offer",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: STATIC_PAGES_UPDATED,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const solutionPaths: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: absoluteUrl(`/solutions/${s.slug}`),
    lastModified: SOLUTIONS_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const casePaths: MetadataRoute.Sitemap = cases.map((c) => ({
    url: absoluteUrl(`/cases/${c.slug}`),
    lastModified: c.dateModifiedISO ? new Date(c.dateModifiedISO) : STATIC_PAGES_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePaths: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: SERVICES_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const guidePaths: MetadataRoute.Sitemap = guides.map((g) => ({
    url: absoluteUrl(`/guides/${g.slug}`),
    lastModified: new Date(g.updatedISO),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogPaths: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.publishedISO),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const cityPaths: MetadataRoute.Sitemap = cities.map((c) => ({
    url: absoluteUrl(`/cities/${c.slug}`),
    lastModified: STATIC_PAGES_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPaths,
    ...solutionPaths,
    ...casePaths,
    ...servicePaths,
    ...guidePaths,
    ...blogPaths,
    ...cityPaths,
  ];
}
