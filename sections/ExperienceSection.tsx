import { Plus } from "lucide-react"

import { Reveal } from "@/components/reveal"

type Experience = {
  company: string
  role: string
  period: string
  location?: string
  highlights?: string[]
  current?: boolean
}

function splitPeriod(period: string) {
  const [start, end] = period.split(" - ")

  return { start, end: end ?? "" }
}

const experiences: Experience[] = [
  {
    company: "MediaTek",
    role: "Senior Software Engineer",
    period: "July 2026 - Present",
    location: "Bengaluru, Karnataka, India · On-site",
    current: true,
    highlights: [
      "Working on platform and systems software using C, C++, UEFI, USB, WDF/DMF, WinDbg, and TraceView.",
    ],
  },
  {
    company: "MediaTek",
    role: "Software Engineer Intern",
    period: "January 2026 - July 2026",
    location: "Bengaluru, Karnataka, India · On-site",
    highlights: [
      "Architected Custom DL Optimizer, a production-grade PyPI package that reduced inference latency by an average of 2.1x across diverse CNN architectures.",
      "Authored high-performance OpenAI Triton kernels with block-level memory management and operator fusion for activation layers.",
      "Measured 2.47x speedup on ResNet-50, 2.24x on VGG-16, and 2.06x on MobileNet-V2 and EfficientNet-B0 using an NVIDIA T4.",
      "Developed and debugged kernel-level modules using WDF/DMF, WinDbg, and TraceView.",
    ],
  },
  {
    company: "Thinkbyte Technologies",
    role: "AI Software Developer",
    period: "April 2024 - July 2024",
    location: "Remote",
    highlights: [
      "Created LangChain-based models for SEO writing, content writing, and related content workflows.",
      "Worked on an SEO lead-generation product using Serper API and ChatGPT API to return structured leads for clients on a pay-per-use basis.",
      "Maintained and optimized the company's website for web performance and SEO score using Google Search Analytics data.",
    ],
  },
  {
    company: "India Meteorological Department",
    role: "Radar Research Intern",
    period: "June 2023 - August 2023",
    location: "Remote",
    highlights: [
      "Contributed to rainfall estimation using a customized dynamic Z-R relationship based on echo top for Bhopal.",
      "Visualized and segregated clouds from radar images, then estimated rainfall with the Marshall-Palmer equation.",
      "Worked on a function to find wind velocity at any given point in radar range.",
    ],
  },
  {
    company: "DevCode",
    role: "Full Stack Developer",
    period: "April 2023 - May 2023",
    location: "Remote",
    highlights: [
      "Integrated REST APIs into the React front end.",
      "Managed application state efficiently while keeping the interface clean and polished.",
    ],
  },
  {
    company: "Hirable",
    role: "Frontend Web Developer",
    period: "June 2022 - August 2022",
    location: "Remote",
    highlights: [
      "Developed 5 landing pages with ReactJS, Tailwind CSS, Redux, and Next.js.",
      "Worked on 2 admin dashboards using ReactJS, Tailwind CSS, and Next.js.",
      "Reduced image rendering time on the landing page from 200ms to 79ms using Next.js image optimizations.",
    ],
  },
]

function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-5xl py-7"
      aria-labelledby="experience-heading"
    >
      <Reveal className="mb-7">
        <p className="eyebrow">Experience</p>
        <h2
          id="experience-heading"
          className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground"
        >
          From landing pages to{" "}
          <span className="font-display text-[1.06em] text-brand">
            platform software
          </span>
        </h2>
      </Reveal>

      <ol className="border-t border-border">
        {experiences.map((experience, index) => {
          const { start, end } = splitPeriod(experience.period)

          return (
            <Reveal
              as="li"
              key={`${experience.company}-${experience.role}`}
              delay={index * 45}
              className="border-b border-border"
            >
              <details className="group/exp">
                <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 rounded-md py-5 focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none sm:grid-cols-[8.5rem_minmax(0,1fr)_auto] sm:gap-x-8 [&::-webkit-details-marker]:hidden">
                  <div
                    aria-hidden="true"
                    className="relative hidden pt-1 sm:block"
                  >
                    <span
                      className={
                        experience.current
                          ? "absolute top-[0.4rem] left-0 size-2 rounded-full bg-brand ring-4 ring-brand/15"
                          : "absolute top-[0.4rem] left-0 size-2 rounded-full bg-muted-foreground/40"
                      }
                    />
                    <span className="block pl-5 font-mono text-xs leading-5 text-muted-foreground tabular-nums">
                      {start}
                      <br />
                      <span
                        className={
                          experience.current
                            ? "text-brand"
                            : "text-muted-foreground/60"
                        }
                      >
                        {end}
                      </span>
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover/exp:text-brand">
                        {experience.role}
                      </h3>
                      {experience.current ? (
                        <span className="inline-flex rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 font-mono text-[0.58rem] tracking-[0.12em] text-brand uppercase">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {experience.company}
                      <span className="text-muted-foreground/60 sm:hidden">
                        {" "}
                        · {experience.period}
                      </span>
                      {experience.location ? (
                        <span className="hidden text-muted-foreground/50 sm:inline">
                          {" "}
                          · {experience.location}
                        </span>
                      ) : null}
                    </p>
                  </div>

                  <Plus
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open/exp:rotate-45"
                  />
                </summary>

                {experience.highlights?.length ? (
                  <ul className="grid gap-2.5 pb-6 text-sm leading-6 text-muted-foreground sm:pl-[10.5rem]">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7rem] h-px w-3 shrink-0 bg-brand/60"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </details>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}

export default ExperienceSection
