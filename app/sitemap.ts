import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kunalkumar.design";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/about", "/playground", "/contact", "/estimate"];
  const projectSlugs = [
    "culture-after-dark",
    "matter-in-motion",
    "modular-futures",
    "ribbon-resonance",
    "form-void-studies",
    "maker-workbench",
  ];

  return [
    ...routes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
