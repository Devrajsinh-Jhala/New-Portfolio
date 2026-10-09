import type { Metadata } from "next"
import Link from "next/link"

import { Arise, type AriseItem } from "@/components/arise"
import { Page, PageHead, Shared } from "@/components/page"
import { getPackageStats, getPackageStatsForProject } from "@/lib/package-stats"
import { getProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source packages on npm and PyPI, and the full-stack apps Devrajsinh Jhala learned on, each with its own write-up.",
  alternates: { canonical: "/projects" },
}

export default async function ProjectsPage() {
  const projects = getProjects()
  const packageStats = await getPackageStats()
  const packages: AriseItem[] = projects
    .flatMap((project) => {
      const stats = getPackageStatsForProject(packageStats, project.slug)

      return stats
        ? [
            {
              slug: project.slug,
              title: project.title,
              blurb: project.blurb ?? project.summary,
              registry: stats.registry,
              version: stats.version,
              downloads: stats.downloadsLastMonth,
              downloadsAllTime: stats.downloadsAllTime,
              install: project.installCommand,
              docsUrl: project.liveUrl,
              codeUrl: project.codeUrl,
            },
          ]
        : []
    })
    .sort((first, second) => second.downloads - first.downloads)
  const builds = projects.filter((project) => !project.packageName)

  return (
    <Page>
      <PageHead title="Projects" pose="thumbs">
        Most of what I know came from building things and putting them out.
      </PageHead>

      <section>
        <Arise items={packages} />
        <p className="mono" style={{ marginTop: "1.5rem" }}>
          Counts are read from npm and PyPI once a day. They count downloads,
          not people.
        </p>
      </section>

      <section className="sec">
        <h2 className="h">Earlier builds</h2>
        <p className="sub">
          The full-stack apps I learned on. Each one opens its own write-up.
        </p>
        <ul className="rows">
          {builds.map((project) => (
            <li key={project.slug}>
              <span className="mono">
                {project.published.match(/\d{4}/)?.[0]}
              </span>
              <span className="t">
                <Shared name={`project-${project.slug}`}>
                  <Link className="shared" href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </Shared>
                <span className="mono m">{project.summary}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
