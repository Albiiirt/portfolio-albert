import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://albertcanadas.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `${SITE_URL}/proyectos/${p.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/proyectos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/cv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...projectUrls,
  ];
}
