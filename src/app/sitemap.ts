import type { MetadataRoute } from "next";
import { site, solutions, cases } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.domain;
  const staticPaths: MetadataRoute.Sitemap = [
    "/",
    "/solutions",
    "/navilet-ai",
    "/cases",
    "/services",
    "/expertise",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/offer",
  ].map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const solutionPaths: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: new URL(`/solutions/${s.slug}`, base).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const casePaths: MetadataRoute.Sitemap = cases.map((c) => ({
    url: new URL(`/cases/${c.slug}`, base).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPaths, ...solutionPaths, ...casePaths];
}

