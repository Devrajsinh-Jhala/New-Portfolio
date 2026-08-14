import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Download,
  Film,
  Mail,
  PackageCheck,
  PenLine,
  ScrollText,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { formatDownloadCount, getPackageStats } from "@/lib/package-stats"
import { profile } from "@/lib/profile"
import { getResearchWorks } from "@/lib/research"

const journey = [
  "Hello! I’m Devrajsinh Jhala, a full-stack developer with a strong interest in building products that are not just functional, but also clean, usable, and thoughtfully engineered. My core work has been around modern web development using technologies like React, Next.js, TypeScript, Tailwind CSS, Node.js, and databases such as PostgreSQL, MySQL, Firebase, and Supabase.",

  "My journey into development started in a very simple way — by building a portfolio website in my second year of undergraduate studies while following YouTube tutorials. At that time, I was mostly copying code and trying to understand how everything worked. But that small project opened a door for me. What began as curiosity slowly turned into a serious interest in frontend engineering, product building, and eventually full-stack development.",

  "Over time, I worked with startups, organizations, and engineering teams where I got to build real-world web applications, improve user interfaces, integrate APIs, work with databases, and understand how software is actually built beyond tutorials. These experiences helped me grow from someone who only cared about “making things work” to someone who now cares about structure, scalability, performance, maintainability, and user experience.",

  "While web development has been my main foundation, I have also explored AI/ML through projects involving human activity recognition, mobile sensor data, explainable machine learning, and multi-agent systems. I’ve worked on ideas where machine learning models are not just trained, but also explained using tools like LIME and SHAP, and integrated into practical applications. This helped me see software from a broader perspective — not just as websites or APIs, but as systems that can reason, predict, explain, and assist.",

  "One thing that defines my journey is that I like learning deeply. Whether it is frontend architecture, backend APIs, low-level design, DSA, machine learning concepts, or system design, I try to understand the “why” behind things. I enjoy breaking complex topics into simpler parts and building a strong foundation instead of just chasing surface-level knowledge.",

  "Beyond coding, I value consistency, responsibility, and continuous growth. I believe good engineering is not only about writing code, but also about thinking clearly, communicating well, taking ownership, and building things that genuinely solve problems. I’m still learning every day, but I’m proud of how far I’ve come from that first copied portfolio project to building full-stack applications, AI-integrated systems, and production-level features.",

  "I also enjoy sharing what I learn whenever I feel something is useful enough for others — whether it is a technical concept, a tool, or a lesson I wish I had known earlier. Writing and explaining help me reflect on my own journey and connect with other developers who are growing through a similar path.",

  "At the core, I see myself as someone who is constantly trying to become better — as an engineer, as a problem solver, and as a person. I’m excited about opportunities where I can build meaningful products, work with strong teams, learn from challenging problems, and contribute to software that creates real value.",
] as const

const beyondCode = [
  {
    title: "Writing",
    description:
      "I write when an idea feels useful enough to share, especially around developer tools, best practices, and lessons from building real projects.",
    icon: PenLine,
  },
  {
    title: "Reading",
    description:
      "Some books that stay close to my desk: Tuesdays with Morrie, Atomic Habits, The Alchemist, Building a Second Brain, and Discipline is Destiny.",
    icon: BookOpen,
  },
  {
    title: "Anime",
    description:
      "Stories like Your Name, Garden of Words, A Silent Voice, Jujutsu Kaisen, and I Want to Eat Your Pancreas are part of how I unwind.",
    icon: Film,
  },
] as const

export const metadata: Metadata = {
  title: "About",
  description:
    "A personal overview of Devrajsinh Jhala's software engineering journey, current work, and life beyond code.",
}

export default async function AboutPage() {
  const packageStats = await getPackageStats()
  const totalDownloads = packageStats.reduce(
    (total, item) => total + item.downloadsLastMonth,
    0
  )
  const researchCount = getResearchWorks().length
  const profileSignals = [
    {
      eyebrow: "Current role",
      label: "Senior Software Engineer",
      value: "MediaTek · Bengaluru, India",
      proof: "Promoted from Software Engineer Intern in July 2026.",
      href: "/#experience",
      linkLabel: "View experience",
      icon: BriefcaseBusiness,
    },
    {
      eyebrow: "Open source",
      label: `${packageStats.length} published packages`,
      value: `${formatDownloadCount(totalDownloads)} downloads · last 30 days`,
      proof: "Maintaining developer tools across the PyPI and npm ecosystems.",
      href: "/projects",
      linkLabel: "View packages",
      icon: PackageCheck,
    },
    {
      eyebrow: "Published research",
      label: `${researchCount} publications`,
      value: "Applied machine learning and deep learning",
      proof:
        "Research spanning EEG, sensor fusion, medical screening, and manufacturing.",
      href: "/research",
      linkLabel: "View research",
      icon: ScrollText,
    },
  ] as const

  return (
    <div className="mx-auto w-full max-w-5xl">
      <section className="relative overflow-hidden py-6 sm:py-10 lg:py-12">
        <div className="absolute inset-x-0 top-16 -z-10 h-44 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_68%)] blur-2xl dark:bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.12),transparent_68%)]" />

        <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 text-center lg:flex-row lg:justify-center lg:gap-10 lg:text-left">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/35 via-emerald-400/20 to-amber-300/30 blur-xl" />
            <Image
              src="/images/myPhoto.png"
              alt={`Profile portrait of ${profile.name}`}
              width={240}
              height={240}
              priority
              className="relative size-44 rounded-full border-4 border-background object-cover shadow-2xl ring-1 shadow-foreground/15 ring-border/80 sm:size-52 lg:size-60"
            />
          </div>

          <div className="about-text-reveal flex max-w-xl min-w-0 flex-col items-center lg:items-start">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-normal text-balance text-foreground sm:text-4xl lg:text-[2.5rem]">
                {profile.name}
              </h1>
            </div>

            <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base sm:leading-7">
              Senior Software Engineer at MediaTek building dependable systems,
              open-source developer tools, and applied machine-learning
              research.
            </p>

            <div className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row lg:justify-start">
              <Button asChild className="h-9 px-3 text-sm">
                <Link href="/projects">
                  View projects
                  <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-9 px-3 text-sm">
                <Link
                  href="https://drive.google.com/file/d/1hGj4JakFQbfkDI3-C4RMgUvXpbxk-rWN/view?usp=sharing"
                  target="_blank"
                >
                  <Download aria-hidden="true" data-icon="inline-start" />
                  Download CV
                </Link>
              </Button>
              <Button asChild variant="ghost" className="h-9 px-3 text-sm">
                <a href={`mailto:${profile.email}`}>
                  <Mail aria-hidden="true" data-icon="inline-start" />
                  Contact
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8" aria-labelledby="profile-signals-heading">
        <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.45fr)] md:items-end">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Professional snapshot
            </p>
            <h2
              id="profile-signals-heading"
              className="mt-2 text-2xl font-semibold tracking-normal text-balance text-foreground sm:text-3xl"
            >
              Engineering that ships beyond a demo.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:justify-self-end">
            Production experience, installable developer tools, and published
            research—three ways I turn technical depth into practical work.
          </p>
        </div>

        <dl className="grid gap-4 md:grid-cols-3">
          {profileSignals.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="group flex min-h-64 flex-col rounded-lg border border-border/70 bg-card/75 p-5 shadow-sm shadow-foreground/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md hover:shadow-foreground/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-md border border-border/70 bg-background/70 text-foreground shadow-sm shadow-foreground/5">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="text-[0.68rem] font-semibold tracking-[0.13em] text-muted-foreground uppercase">
                    {item.eyebrow}
                  </span>
                </div>

                <dt className="mt-5 text-xl font-semibold tracking-normal text-balance text-foreground">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-6 font-medium text-foreground/80">
                  {item.value}
                </dd>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {item.proof}
                </p>

                <Link
                  href={item.href}
                  className="mt-5 inline-flex w-fit items-center gap-1.5 border-b border-transparent text-sm font-medium text-foreground transition-colors hover:border-foreground/50 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
                >
                  {item.linkLabel}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            )
          })}
        </dl>
      </section>

      <section
        className="grid gap-7 py-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12"
        aria-labelledby="story-heading"
      >
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            My story
          </p>
          <h2
            id="story-heading"
            className="mt-2 text-2xl font-semibold tracking-normal text-foreground sm:text-3xl lg:sticky lg:top-24"
          >
            From first portfolio to full-stack products.
          </h2>
        </div>

        <div className="space-y-6 border-l border-border/70 pl-5 text-sm leading-7 text-muted-foreground sm:pl-7 sm:text-base sm:leading-8">
          {journey.map((paragraph) => (
            <p key={paragraph} className="text-justify hyphens-auto">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="py-8" aria-labelledby="beyond-code-heading">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Beyond code
            </p>
            <h2
              id="beyond-code-heading"
              className="text-2xl font-semibold tracking-normal text-foreground"
            >
              Things that keep me curious
            </h2>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {beyondCode.map((item) => {
            const Icon = item.icon

            return (
              <article
                key={item.title}
                className="rounded-md border border-border/70 bg-card/70 p-5 shadow-sm shadow-foreground/5"
              >
                <div className="mb-4 inline-flex size-9 items-center justify-center rounded-md bg-muted text-foreground">
                  <Icon aria-hidden="true" className="size-4" />
                </div>
                <h3 className="text-base font-semibold tracking-normal text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
