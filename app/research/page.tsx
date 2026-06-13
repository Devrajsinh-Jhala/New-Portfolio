import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowUpRight,
  BarChart3,
  Calendar,
  FileText,
  FlaskConical,
  Tag,
} from "lucide-react"

import { getResearchWorks } from "@/lib/research"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research work and publications by Devrajsinh Jhala in machine learning, deep learning, sensor fusion, and software-driven analysis.",
}

export default function ResearchPage() {
  const works = getResearchWorks()

  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="border-b border-border/70 py-10 sm:py-14">
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.8fr)_minmax(18rem,0.45fr)] md:items-end">
          <div className="max-w-3xl space-y-5">
            <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              <FlaskConical aria-hidden="true" className="size-3.5" />
              Research
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-normal text-balance text-foreground sm:text-5xl">
              Research & publications
            </h1>
          </div>

          <p className="max-w-sm text-sm leading-7 text-muted-foreground md:justify-self-end">
            Exploring applied machine learning, intelligent systems, sensor
            data, and software-led research workflows.
          </p>
        </div>
      </section>

      <section className="py-7 sm:py-8" aria-labelledby="research-list-heading">
        <div className="mb-6 flex flex-col gap-2">
          <p className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            <FileText aria-hidden="true" className="size-3.5" />
            Publications
          </p>
          <h2
            id="research-list-heading"
            className="text-xl font-semibold tracking-normal text-foreground"
          >
            Selected work
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {works.map((work) => (
            <Link
              key={work.slug}
              href={`/research/${work.slug}`}
              className="group block h-full focus-visible:outline-none"
            >
              <article className="flex h-full flex-col rounded-md border border-border/70 bg-card p-5 shadow-sm shadow-foreground/5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-foreground/20 group-hover:shadow-md group-hover:shadow-foreground/10 group-focus-visible:ring-3 group-focus-visible:ring-ring/35 sm:p-6">
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-muted/60 px-2 py-1 text-xs font-medium text-muted-foreground">
                    <Calendar aria-hidden="true" className="size-3.5" />
                    {work.published}
                  </span>
                  <span className="rounded-md border border-border/70 bg-background/70 px-2 py-1 text-xs font-medium text-muted-foreground">
                    {work.category}
                  </span>
                </div>

                <h3 className="text-xl font-semibold tracking-normal text-balance text-foreground transition-colors group-hover:text-foreground/80">
                  {work.title}
                </h3>

                <p className="mt-3 line-clamp-4 flex-1 text-sm leading-6 text-muted-foreground">
                  {work.summary}
                </p>

                <dl className="mt-5 grid gap-2 border-t border-border/70 pt-4 sm:grid-cols-3">
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

                <div className="mt-5 flex flex-wrap gap-2">
                  {work.keywords.slice(0, 4).map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      <Tag aria-hidden="true" className="size-3" />
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                    View research
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <BarChart3 aria-hidden="true" className="size-3.5" />
                    {work.metrics[0]?.value}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
