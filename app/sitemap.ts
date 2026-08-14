import type { MetadataRoute } from "next"

import { getProjects } from "@/lib/projects"
import { getResearchWorks } from "@/lib/research"
import { siteUrl } from "@/lib/site-metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/research`, changeFrequency: "monthly", priority: 0.9 },
  ]
  const projectRoutes: MetadataRoute.Sitemap = getProjects().map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.published),
    changeFrequency: "monthly",
    priority: project.packageName ? 0.8 : 0.6,
  }))
  const researchRoutes: MetadataRoute.Sitemap = getResearchWorks().map(
    (work) => ({
      url: `${siteUrl}/research/${work.slug}`,
      lastModified: new Date(work.published),
      changeFrequency: "yearly",
      priority: 0.7,
    })
  )

  return [...coreRoutes, ...projectRoutes, ...researchRoutes]
}
