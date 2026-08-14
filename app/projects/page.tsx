import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Calendar,
  Code2,
  Download,
  FolderKanban,
  Layers3,
  PackageCheck,
  Tag,
} from "lucide-react"

import {
  formatDownloadCount,
  getPackageStats,
  getPackageStatsForProject,
  type PackageStats,
} from "@/lib/package-stats"
import { getProjects, type Project } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected open-source packages and full-stack products by Devrajsinh Jhala across Python, PyTorch, npm, Next.js, TypeScript, and research tooling.",
  alternates: { canonical: "/projects" },
}

function ProjectCard({
  project,
  stats,
  featured = false,
}: {
  project: Project
  stats: PackageStats | null
  featured?: boolean
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full focus-visible:outline-none"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card shadow-sm shadow-foreground/5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-md group-hover:shadow-foreground/10 group-focus-visible:ring-3 group-focus-visible:ring-ring/35">
        {featured ? (
          <div className="h-1 bg-gradient-to-r from-sky-500/80 via-emerald-400/70 to-amber-400/70" />
        ) : null}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/60 px-2 py-1 text-xs font-medium text-muted-foreground">
              <Calendar aria-hidden="true" className="size-3.5" />
              {project.published}
            </span>
            <span className="rounded-md border border-border/70 bg-background/70 px-2 py-1 text-xs font-medium text-muted-foreground">
              {project.category}
            </span>
          </div>

          <h3 className="text-xl font-semibold tracking-normal text-balance text-foreground transition-colors group-hover:text-foreground/80">
            {project.title}
          </h3>

          <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-muted-foreground">
            {project.summary}
          </p>

          {project.installCommand ? (
            <code className="mt-4 block overflow-x-auto rounded-md border border-border/70 bg-muted/55 px-3 py-2 font-mono text-xs whitespace-nowrap text-foreground">
              $ {project.installCommand}
            </code>
          ) : null}

          {stats ? (
            <dl className="mt-5 grid grid-cols-3 gap-2 border-y border-border/70 py-3">
              <div>
                <dt className="text-[0.64rem] font-medium tracking-[0.11em] text-muted-foreground uppercase">
                  Version
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  v{stats.version}
                </dd>
              </div>
              <div>
                <dt className="text-[0.64rem] font-medium tracking-[0.11em] text-muted-foreground uppercase">
                  Downloads
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {formatDownloadCount(stats.downloadsLastMonth)}
                </dd>
              </div>
              <div>
                <dt className="text-[0.64rem] font-medium tracking-[0.11em] text-muted-foreground uppercase">
                  Registry
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {stats.registry}
                </dd>
              </div>
            </dl>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.slice(0, featured ? 3 : 4).map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                <Tag aria-hidden="true" className="size-3" />
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
              View case study
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
            {stats ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Download aria-hidden="true" className="size-3.5" />
                {stats.downloadsLastMonth.toLocaleString()} / 30d
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Layers3 aria-hidden="true" className="size-3.5" />
                {project.features.length} features
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default async function ProjectsPage() {
  const [projects, packageStats] = await Promise.all([
    Promise.resolve(getProjects()),
    getPackageStats(),
  ])
  const featuredProjects = projects.filter((project) => project.packageName)
  const archiveProjects = projects.filter((project) => !project.packageName)

  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="border-b border-border/70 py-10 sm:py-14">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(18rem,0.45fr)] md:items-end">
          <div className="max-w-3xl space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              <FolderKanban aria-hidden="true" className="size-3.5" />
              Projects
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-normal text-balance text-foreground sm:text-5xl">
              Software with evidence behind it
            </h1>
          </div>

          <p className="max-w-sm text-sm leading-7 text-muted-foreground md:justify-self-end">
            Maintained open-source tools and selected product builds, presented
            through their constraints, engineering decisions, and observable
            outcomes.
          </p>
        </div>
      </section>

      <section className="py-8" aria-labelledby="featured-projects-heading">
        <div className="mb-6 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              <PackageCheck aria-hidden="true" className="size-3.5" />
              Published tools
            </p>
            <h2
              id="featured-projects-heading"
              className="mt-2 text-2xl font-semibold tracking-normal text-foreground"
            >
              Featured open-source work
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Registry metrics refresh every 24 hours.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              stats={getPackageStatsForProject(packageStats, project.slug)}
              featured
            />
          ))}
        </div>
      </section>

      <section
        className="border-t border-border/70 py-8"
        aria-labelledby="project-archive-heading"
      >
        <div className="mb-6">
          <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            <Code2 aria-hidden="true" className="size-3.5" />
            Product archive
          </p>
          <h2
            id="project-archive-heading"
            className="mt-2 text-2xl font-semibold tracking-normal text-foreground"
          >
            Selected full-stack builds
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {archiveProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} stats={null} />
          ))}
        </div>
      </section>
    </div>
  )
}
