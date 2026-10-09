import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Page, Shared } from "@/components/page"
import { Prose } from "@/components/prose"
import { getPackageStats, getPackageStatsForProject } from "@/lib/package-stats"
import { profile } from "@/lib/profile"
import { getProject, getProjects } from "@/lib/projects"
import { siteUrl } from "@/lib/site-metadata"

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: "Projects",
    }
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
  }
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const packageStats = project.packageName
    ? getPackageStatsForProject(await getPackageStats(), project.slug)
    : null
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: project.title,
    description: project.summary,
    datePublished: project.published,
    codeRepository: project.codeUrl,
    url: project.liveUrl,
    programmingLanguage: project.tech,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
  }

  return (
    <Page>
      <article className="article wide">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Link className="back" href="/projects">
          ← projects
        </Link>
        <Shared name={`project-${project.slug}`}>
          <h1>{project.title}</h1>
        </Shared>
        <p className="lead">{project.summary}</p>
        <p className="mono meta">
          {project.category} · {project.published}
          {packageStats
            ? ` · v${packageStats.version} · ${packageStats.downloadsLastMonth.toLocaleString("en")} downloads in 30 days`
            : ""}
        </p>
        <div className="links">
          {project.liveUrl ? (
            <a
              className="lk"
              href={project.liveUrl}
              target="_blank"
              rel="noopener"
            >
              {packageStats ? "documentation" : "live site"} ↗
            </a>
          ) : null}
          {packageStats ? (
            <a
              className="lk"
              href={packageStats.registryUrl}
              target="_blank"
              rel="noopener"
            >
              {packageStats.registry} ↗
            </a>
          ) : null}
          {project.codeUrl ? (
            <a
              className="lk"
              href={project.codeUrl}
              target="_blank"
              rel="noopener"
            >
              code ↗
            </a>
          ) : null}
        </div>
        {project.installCommand ? (
          <code className="cmd">{project.installCommand}</code>
        ) : null}

        <Prose markdown={project.content} />

        <div className="facts">
          {project.features.length ? (
            <div>
              <h2>Features</h2>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {project.tech.length ? (
            <div>
              <h2>Built with</h2>
              <p className="mono">{project.tech.join(" · ")}</p>
            </div>
          ) : null}
        </div>
      </article>
    </Page>
  )
}
