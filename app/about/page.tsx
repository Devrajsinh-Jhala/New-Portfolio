import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { AnimeBanner } from "@/components/anime-banner"
import { Page, PageHead } from "@/components/page"
import { anime } from "@/lib/anime"
import { getBooks } from "@/lib/books"
import { education } from "@/lib/experience"
import { profile, socialLinks } from "@/lib/profile"

const story = [
  "I’m an SWE II at Cisco in Bengaluru. Before that I was a Senior Engineer at MediaTek, writing systems software in C and C++ across UEFI, USB and the Windows driver stack. My broader engineering background spans full-stack products, APIs, databases, and production interfaces built with TypeScript, React, Next.js, Node.js, and Python.",
  "I came at systems work from the other direction. I spent my first few years building full stack products, went deep into machine learning during my master’s at BITS Pilani, and that mix is the useful part: I tend to own a problem across the boundary instead of handing it off at one.",
  "Outside my core role, I build and maintain open-source developer tools across npm and PyPI. npx-vibe brings evidence-first review to package execution, Custom DL Optimizer qualifies PyTorch inference plans against real workloads, and ResearchPlot turns publication guidance into repeatable, source-backed checks. I approach these as maintained products: with documentation, release workflows, safety boundaries, and explainable decisions.",
  "Research is the third part of my work. I have published applied machine-learning studies across EEG-based ADHD detection, sensor-fusion activity recognition, medical screening, and manufacturing inspection. Across systems, products, and research, the principle is the same: understand the constraints, make tradeoffs visible, and ship work that people can evaluate and trust.",
]

export const metadata: Metadata = {
  title: "About",
  description:
    "A personal overview of Devrajsinh Jhala's software engineering journey, current work, and life beyond code.",
  alternates: { canonical: "/about" },
}

/** "A, B, C, and D" */
function listOf(items: string[]) {
  return items.length > 1
    ? `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`
    : (items[0] ?? "")
}

export default function AboutPage() {
  const bookTitles = getBooks().map((book) => book.title)

  return (
    <Page>
      <PageHead title="About">
        Software engineer in Bengaluru. Systems and backend software by day,
        open-source tools and research around it.
      </PageHead>

      <section className="about-top">
        <div className="story">
          {story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <aside className="me">
          <Image
            className="photo"
            src="/images/myPhoto.webp"
            alt={profile.name}
            width={480}
            height={480}
            sizes="(max-width: 46rem) 7.5rem, 28rem"
            loading="eager"
            fetchPriority="high"
          />
          <ul className="rows">
            <li>
              <span className="mono">now</span>
              <span className="t">
                {profile.role}, {profile.employer}
                <span className="mono m">Bengaluru, Karnataka, India</span>
              </span>
            </li>
            <li>
              <span className="mono">before</span>
              <span className="t">
                Senior Engineer, MediaTek
                <span className="mono m">
                  January to October 2026 · Bengaluru
                </span>
              </span>
            </li>
          </ul>
        </aside>
      </section>

      <section className="sec">
        <div className="duo">
          <div>
            <h2 className="h">Education and awards</h2>
            <ul className="rows">
              {education.map((row) => (
                <li key={row.what}>
                  <span className="mono">{row.when}</span>
                  <span className="t">
                    {row.what}
                    <span className="mono m">{row.where}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="h">Beyond code</h2>
            <ul className="rows">
              <li>
                <span className="mono">writing</span>
                <span className="t">
                  I write when an idea feels useful enough to share, especially
                  around developer tools, best practices, and lessons from
                  building real projects.
                  <span className="mono m">
                    <Link href="/blog">the blog →</Link>
                  </span>
                </span>
              </li>
              <li>
                <span className="mono">reading</span>
                <span className="t">
                  Some books that stay close to my desk: {listOf(bookTitles)}.
                  <span className="mono m">
                    <Link href="/books">the bookshelf →</Link>
                  </span>
                </span>
              </li>
              <li>
                <span className="mono">Bruno</span>
                <span className="t">
                  Bruno was my Doberman. He passed away, so he lives here now:
                  he trots after your pointer on every page, and does a trick if
                  you click him.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec flush">
        <h2 className="h">Anime I go back to</h2>
        <p className="sub">
          Sung Jin-woo from Solo Leveling is my inspiration: he starts as the
          weakest hunter and keeps levelling up, which is where the levels on
          this site come from.
        </p>
        <AnimeBanner anime={anime} titles="chips" />
      </section>

      <section className="sec flush">
        <h2 className="h">Get in touch</h2>
        <ul className="rows cols">
          <li>
            <span className="mono">email</span>
            <span className="t">
              <span className="sel">{profile.email}</span>
            </span>
          </li>
          {socialLinks
            .filter((link) => link.kind !== "mail")
            .map((link) => (
              <li key={link.kind}>
                <span className="mono">{link.label.toLowerCase()}</span>
                <span className="t">
                  <a href={link.href} target="_blank" rel="noopener">
                    {link.href.replace(/\/$/, "").split("/").at(-1)} ↗
                  </a>
                </span>
              </li>
            ))}
        </ul>
      </section>
    </Page>
  )
}
