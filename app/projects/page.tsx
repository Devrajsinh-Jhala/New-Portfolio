import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  Calendar,
  Code2,
  FolderKanban,
  Layers3,
  Tag,
} from "lucide-react"

import { getProjects } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected full-stack and frontend projects by Devrajsinh Jhala, built with React, Next.js, TypeScript, Sanity, Prisma, Stripe, and related tools.",
}

export default function ProjectsPage() {
  const projects = getProjects()

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
              Selected product work
            </h1>
          </div>

          <p className="max-w-sm text-sm leading-7 text-muted-foreground md:justify-self-end">
            A collection of full-stack applications, frontend builds, CMS-backed
            products, and experimental ideas shaped into usable interfaces.
          </p>
        </div>
      </section>

      <section className="py-7 sm:py-8" aria-labelledby="projects-heading">
        <div className="mb-6 flex flex-col gap-2">
          <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            <Code2 aria-hidden="true" className="size-3.5" />
            Portfolio
          </p>
          <h2
            id="projects-heading"
            className="text-xl font-semibold tracking-normal text-foreground"
          >
            Project archive
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block h-full focus-visible:outline-none"
            >
              <article className="flex h-full flex-col rounded-md border border-border/70 bg-card shadow-sm shadow-foreground/5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-md group-hover:shadow-foreground/10 group-focus-visible:ring-3 group-focus-visible:ring-ring/35">
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

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
                    {project.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((item) => (
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
                      View project
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Layers3 aria-hidden="true" className="size-3.5" />
                      {project.features.length} features
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
