import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  Code2,
  ExternalLink,
  FolderKanban,
  Layers3,
  Tag,
} from "lucide-react"

import { ProjectMarkdown } from "@/components/project-markdown"
import { Button } from "@/components/ui/button"
import { getProject, getProjectHeadings, getProjects } from "@/lib/projects"

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

  const headings = getProjectHeadings(project.content)

  return (
    <article className="mx-auto w-full max-w-5xl py-5 sm:py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="h-8 px-2 text-sm">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Back to projects
          </Link>
        </Button>
      </div>

      <header className="border-b border-border/70 pb-8 sm:pb-10">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/60 px-2 py-1 text-xs font-medium text-muted-foreground">
            <Calendar aria-hidden="true" className="size-3.5" />
            {project.published}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/70 px-2 py-1 text-xs font-medium text-muted-foreground">
            <FolderKanban aria-hidden="true" className="size-3.5" />
            {project.category}
          </span>
        </div>

        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-balance text-foreground sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {project.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.liveUrl ? (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  View live
                  <ExternalLink aria-hidden="true" data-icon="inline-end" />
                </a>
              </Button>
            ) : null}
            {project.codeUrl ? (
              <Button asChild variant="outline">
                <a href={project.codeUrl} target="_blank" rel="noreferrer">
                  View code
                  <Code2 aria-hidden="true" data-icon="inline-end" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <div className="grid gap-9 py-9 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <div className="min-w-0">
          <ProjectMarkdown markdown={project.content} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <section className="rounded-md border border-border/70 bg-card p-4 shadow-sm shadow-foreground/5">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-normal text-foreground">
              <Layers3 aria-hidden="true" className="size-4" />
              Project snapshot
            </h2>
            <dl className="mt-4 space-y-3">
              <div>
                <dt className="text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  Category
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {project.category}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  Published
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {project.published}
                </dd>
              </div>
              <div>
                <dt className="text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                  Features
                </dt>
                <dd className="mt-1 text-sm font-semibold text-foreground">
                  {project.features.length}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-md border border-border/70 bg-card p-4 shadow-sm shadow-foreground/5">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-normal text-foreground">
              <Tag aria-hidden="true" className="size-4" />
              Tech stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {headings.length ? (
            <section className="rounded-md border border-border/70 bg-card p-4 shadow-sm shadow-foreground/5">
              <h2 className="text-sm font-semibold tracking-normal text-foreground">
                On this page
              </h2>
              <nav aria-label="Project sections" className="mt-3">
                <ol className="space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        className="block text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground"
                        style={{
                          paddingLeft: `${Math.max(heading.level - 2, 0) * 0.75}rem`,
                        }}
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  )
}
