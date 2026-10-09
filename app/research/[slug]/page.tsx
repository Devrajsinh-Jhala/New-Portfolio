import { Fragment } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Page, Shared } from "@/components/page"
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
    alternates: { canonical: `/research/${work.slug}` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: work.title,
    description: work.summary,
    datePublished: work.published,
    author: work.authors.map((name) => ({
      "@type": "Person",
      name,
    })),
    publisher: {
      "@type": "Organization",
      name: work.publisher,
    },
    isPartOf: work.venue,
    sameAs: `https://doi.org/${work.doi}`,
    url: work.paperUrl,
    keywords: work.keywords.join(", "),
  }

  return (
    <Page>
      <article className="article wide long">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Link className="back" href="/research">
          ← research
        </Link>
        <Shared name={`paper-${work.slug}`}>
          <h1>{work.title}</h1>
        </Shared>
        <p className="lead">{work.authors.join(", ")}</p>
        <p className="mono meta">
          {work.venue} · {work.publicationType} · {work.publisher} ·{" "}
          {work.published}
        </p>
        <div className="links">
          <a className="lk" href={work.paperUrl} target="_blank" rel="noopener">
            read the paper ↗
          </a>
          <a
            className="lk"
            href={`https://doi.org/${work.doi}`}
            target="_blank"
            rel="noopener"
          >
            doi ↗
          </a>
        </div>
        <div className="stats big">
          {work.metrics.map((metric) => (
            <span key={metric.label}>
              {metric.label.toLowerCase()}
              <b>{metric.value}</b>
            </span>
          ))}
        </div>

        <div className="prose">
          <p>{work.summary}</p>
          {work.sections.map((section) => (
            <Fragment key={section.title}>
              <h2 id={sectionId(section.title)}>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets?.length ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ))}
        </div>

        <p className="mono" style={{ marginTop: "2.25rem", lineHeight: 1.8 }}>
          {work.keywords.join(" · ")}
        </p>
      </article>
    </Page>
  )
}
