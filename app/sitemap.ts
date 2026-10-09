import type { MetadataRoute } from "next"

import { getPosts } from "@/lib/blog"
import { getBooks } from "@/lib/books"
import { getProjects } from "@/lib/projects"
import { getResearchWorks } from "@/lib/research"
import { siteUrl } from "@/lib/site-metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const coreRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/projects`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/research`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/books`, changeFrequency: "monthly", priority: 0.6 },
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
  // Only posts and notes whose text lives on this site.
  const postRoutes: MetadataRoute.Sitemap = getPosts()
    .filter((post) => post.content)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly",
      priority: 0.6,
    }))
  const bookRoutes: MetadataRoute.Sitemap = getBooks()
    .filter((book) => book.content)
    .map((book) => ({
      url: `${siteUrl}/books/${book.slug}`,
      changeFrequency: "yearly",
      priority: 0.5,
    }))

  return [
    ...coreRoutes,
    ...projectRoutes,
    ...researchRoutes,
    ...postRoutes,
    ...bookRoutes,
  ]
}
