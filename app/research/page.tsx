import type { Metadata } from "next"
import Link from "next/link"

import { Page, PageHead, Shared } from "@/components/page"
import { countWord } from "@/lib/post-format"
import { getResearchWorks, getResearchYear } from "@/lib/research"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research work and publications by Devrajsinh Jhala in machine learning, deep learning, sensor fusion, and software-driven analysis.",
  alternates: { canonical: "/research" },
}

export default function ResearchPage() {
  const works = getResearchWorks()

  return (
    <Page>
      <PageHead title="Research" pose="think">
        {countWord(works.length, true)} published papers in applied machine
        learning. Each opens a page with the method, the results and my part in
        it.
      </PageHead>

      <section style={{ paddingBottom: "clamp(3rem,8vw,5rem)" }}>
        {works.map((work) => (
          <article key={work.slug} className="paper">
            <span className="mono">{getResearchYear(work)}</span>
            <div>
              <h3>
                <Shared name={`paper-${work.slug}`}>
                  <Link className="shared" href={`/research/${work.slug}`}>
                    {work.title}
                  </Link>
                </Shared>
              </h3>
              <p className="mono" style={{ marginTop: ".45rem" }}>
                {work.category} · {work.publicationType} · {work.publisher}
              </p>
              <p>{work.summary}</p>
              <div className="stats">
                {work.metrics.map((metric) => (
                  <span key={metric.label}>
                    {metric.label.toLowerCase()} <b>{metric.value}</b>
                  </span>
                ))}
              </div>
              <div className="links">
                <Link className="lk" href={`/research/${work.slug}`}>
                  notes on this paper →
                </Link>
                <a
                  className="lk"
                  href={work.paperUrl}
                  target="_blank"
                  rel="noopener"
                >
                  read the paper ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </Page>
  )
}
