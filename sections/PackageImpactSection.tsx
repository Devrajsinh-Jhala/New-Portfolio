import Link from "next/link"
import { ArrowUpRight, Download, RefreshCw } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import {
  formatDownloadCount,
  getPackageStats,
  getPackageStatsForProject,
} from "@/lib/package-stats"
import { getProjects } from "@/lib/projects"
import { cn } from "@/lib/utils"

const featuredProjectSlug = "npx-vibe"

async function PackageImpactSection() {
  const [projects, packageStats] = await Promise.all([
    Promise.resolve(getProjects()),
    getPackageStats(),
  ])
  const packageProjects = projects
    .filter((project) => project.packageName && project.packageRegistry)
    .flatMap((project) => {
      const stats = getPackageStatsForProject(packageStats, project.slug)

      return stats ? [{ project, stats }] : []
    })
    .sort((first, second) => {
      if (first.project.slug === featuredProjectSlug) return -1
      if (second.project.slug === featuredProjectSlug) return 1
      return second.stats.downloadsLastMonth - first.stats.downloadsLastMonth
    })

  const totalDownloads = packageStats.reduce(
    (total, item) => total + item.downloadsLastMonth,
    0
  )
  const registryCount = new Set(packageStats.map((item) => item.registry)).size

  return (
    <section
      className="mx-auto w-full max-w-5xl py-10"
      aria-labelledby="package-impact-heading"
    >
      <Reveal className="overflow-hidden rounded-xl border border-border bg-card/60">
        <div className="flex flex-col gap-5 p-5 sm:p-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Open source, shipped</p>
            <h2
              id="package-impact-heading"
              className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-[2rem] sm:leading-tight"
            >
              Developer tools with adoption I can{" "}
              <span className="font-display text-[1.06em] text-brand">
                measure
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Three packages across PyPI and npm — a PyTorch inference plan
              selector, a research-submission preflight, and a pre-execution npm
              security checkpoint. Every download below is pulled live from the
              public registries.
            </p>
          </div>

          <Button asChild variant="outline" className="w-fit shrink-0">
            <Link href="/projects">
              Explore all projects
              <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <dl className="grid border-y border-border sm:grid-cols-3">
          <div className="p-5 sm:p-6">
            <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">
              Downloads · 30 days
            </dt>
            <dd className="stat-figure mt-2 text-4xl text-foreground">
              {formatDownloadCount(totalDownloads)}
            </dd>
          </div>
          <div className="border-t border-border p-5 sm:border-t-0 sm:border-l sm:p-6">
            <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">
              Published packages
            </dt>
            <dd className="stat-figure mt-2 text-4xl text-foreground">
              {packageStats.length}
            </dd>
          </div>
          <div className="border-t border-border p-5 sm:border-t-0 sm:border-l sm:p-6">
            <dt className="font-mono text-[0.66rem] tracking-[0.14em] text-muted-foreground uppercase">
              Ecosystems
            </dt>
            <dd className="stat-figure mt-2 flex items-baseline gap-2 text-4xl text-foreground">
              {registryCount}
              <span className="font-sans text-sm font-medium tracking-normal text-muted-foreground">
                PyPI + npm
              </span>
            </dd>
          </div>
        </dl>

        <div className="grid lg:grid-cols-3">
          {packageProjects.map(({ project, stats }, index) => {
            const isFeatured = project.slug === featuredProjectSlug

            return (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className={cn(
                  "group relative flex min-h-60 flex-col p-5 transition-colors hover:bg-brand/[0.04] focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none sm:p-6",
                  index > 0 && "border-t border-border lg:border-t-0 lg:border-l"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[0.7rem] text-muted-foreground">
                    {stats.registry} · v{stats.version}
                  </span>
                  {isFeatured ? (
                    <span className="font-mono text-[0.62rem] tracking-[0.16em] text-brand uppercase">
                      Featured
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-[-0.01em] text-foreground">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {project.summary}
                </p>

                <div className="mt-5 flex items-end justify-between gap-4 border-t border-border pt-4">
                  <div>
                    <p className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.1em] text-muted-foreground uppercase">
                      <Download aria-hidden="true" className="size-3.5" />
                      30-day installs
                    </p>
                    <p className="stat-figure mt-1.5 text-2xl text-foreground">
                      {stats.downloadsLastMonth.toLocaleString()}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                    View project
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        <p className="flex items-center gap-2 border-t border-border px-5 py-3 text-xs text-muted-foreground sm:px-6">
          <RefreshCw aria-hidden="true" className="size-3.5" />
          Download counts refresh daily from public package data; registry
          downloads are not unique-user counts.
        </p>
      </Reveal>
    </section>
  )
}

function PackageImpactSkeleton() {
  return (
    <section className="mx-auto w-full max-w-5xl py-7" aria-hidden="true">
      <div className="overflow-hidden rounded-lg border border-border/70 bg-card/75 shadow-sm shadow-foreground/5">
        <div className="space-y-3 p-6">
          <div className="h-3 w-36 rounded-sm bg-muted" />
          <div className="h-8 w-2/3 rounded-md bg-muted" />
          <div className="h-4 w-1/2 rounded-sm bg-muted" />
        </div>
        <div className="grid border-y border-border/70 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="space-y-2 p-5 sm:border-l sm:first:border-l-0"
            >
              <div className="h-3 w-28 rounded-sm bg-muted" />
              <div className="h-7 w-16 rounded-md bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { PackageImpactSection, PackageImpactSkeleton }
