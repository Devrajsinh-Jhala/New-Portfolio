import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  FileText,
  FlaskConical,
  Tag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { getResearchWork, getResearchWorks } from "@/lib/research"

type ResearchDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getResearchWorks().map((work) => ({
    slug: work.slug,
  }))
}

export async function generateMetadata({
  params,
}: ResearchDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const work = getResearchWork(slug)

  if (!work) {
    return {
      title: "Research",
    }
  }

  return {
    title: work.title,
    description: work.summary,
  }
}

function sectionId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export default async function ResearchDetailPage({
  params,
}: ResearchDetailPageProps) {
  const { slug } = await params
  const work = getResearchWork(slug)

  if (!work) {
    notFound()
  }

  return (
    <article className="mx-auto w-full max-w-5xl py-5 sm:py-8">
      <div className="mb-8">
        <Button asChild variant="ghost" className="h-8 px-2 text-sm">
          <Link href="/research">
            <ArrowLeft aria-hidden="true" data-icon="inline-start" />
            Back to research
          </Link>
        </Button>
      </div>

      <header className="border-b border-border/70 pb-8 sm:pb-10">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/60 px-2 py-1 text-xs font-medium text-muted-foreground">
            <Calendar aria-hidden="true" className="size-3.5" />
            {work.published}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-background/70 px-2 py-1 text-xs font-medium text-muted-foreground">
            <FlaskConical aria-hidden="true" className="size-3.5" />
            {work.category}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_12rem] lg:items-end">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-semibold tracking-normal text-balance text-foreground sm:text-5xl">
              {work.title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              {work.summary}
            </p>
          </div>

          <Button asChild className="w-fit justify-self-start lg:justify-self-end">
            <a href={work.paperUrl} target="_blank" rel="noreferrer">
              Read paper
              <ExternalLink aria-hidden="true" data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </header>

      <div className="grid gap-9 py-9 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start">
        <div className="min-w-0 space-y-8">
          {work.sections.map((section) => (
            <section
              key={section.title}
              id={sectionId(section.title)}
              className="scroll-mt-24"
              aria-labelledby={`${sectionId(section.title)}-heading`}
            >
              <h2
                id={`${sectionId(section.title)}-heading`}
                className="text-2xl font-semibold tracking-normal text-foreground"
              >
                {section.title}
              </h2>

              {section.paragraphs?.length ? (
                <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : null}

              {section.bullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground sm:text-base">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground/50"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <section className="rounded-md border border-border/70 bg-card p-4 shadow-sm shadow-foreground/5">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-normal text-foreground">
              <FileText aria-hidden="true" className="size-4" />
              Paper snapshot
            </h2>
            <dl className="mt-4 space-y-3">
              {work.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-[0.68rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-foreground">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-md border border-border/70 bg-card p-4 shadow-sm shadow-foreground/5">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-normal text-foreground">
              <Tag aria-hidden="true" className="size-4" />
              Keywords
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {work.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border/70 bg-card p-4 shadow-sm shadow-foreground/5">
            <h2 className="text-sm font-semibold tracking-normal text-foreground">
              On this page
            </h2>
            <nav aria-label="Research sections" className="mt-3">
              <ol className="space-y-2">
                {work.sections.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`#${sectionId(section.title)}`}
                      className="block text-sm leading-5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </section>
        </aside>
      </div>
    </article>
  )
}
