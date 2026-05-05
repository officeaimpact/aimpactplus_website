import type { MetadataRoute } from "next";
import { absoluteUrl, solutions, cases, services } from "@/lib/site-data";
import { guides } from "@/lib/guides-data";
import { blogPosts } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths: MetadataRoute.Sitemap = [
    "/",
    "/solutions",
    "/navilet-ai",
    "/cases",
    "/services",
    "/expertise",
    "/guides",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/offer",
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const solutionPaths: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: absoluteUrl(`/solutions/${s.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const casePaths: MetadataRoute.Sitemap = cases.map((c) => ({
    url: absoluteUrl(`/cases/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePaths: MetadataRoute.Sitemap = services.map((s) => ({
    url: absoluteUrl(`/services/${s.slug}`),
    lastModified: now,
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

  return [
    ...staticPaths,
    ...solutionPaths,
    ...casePaths,
    ...servicePaths,
    ...guidePaths,
    ...blogPaths,
  ];
}
