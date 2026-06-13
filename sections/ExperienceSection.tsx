import { Calendar, ChevronDown, MapPin } from "lucide-react"

type Experience = {
  company: string
  role: string
  period: string
  location?: string
  highlights?: string[]
}

const experiences: Experience[] = [
  {
    company: "MediaTek",
    role: "Software Engineer Intern",
    period: "January 2026 - Present",
    location: "Bengaluru, Karnataka, India",
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
      className="mx-auto w-full max-w-5xl py-7"
      aria-labelledby="experience-heading"
    >
      <div className="mb-6">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          Experience
        </p>
        <h2
          id="experience-heading"
          className="text-xl font-semibold tracking-normal text-foreground"
        >
          Work timeline
        </h2>
      </div>

      <ol className="relative border-s border-border/80">
        {experiences.map((experience) => (
          <li
            key={`${experience.company}-${experience.role}`}
            className="ms-6 pb-8 last:pb-0"
          >
            <span
              aria-hidden="true"
              className="absolute -start-[0.4375rem] mt-1.5 size-3.5 rounded-full border-2 border-background bg-foreground shadow-sm shadow-foreground/15"
            />

            <article className="rounded-md border border-border/70 bg-card/75 shadow-sm shadow-foreground/5">
              {experience.highlights?.length ? (
                <details className="group/details">
                  <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-start gap-3 p-4 transition-colors duration-200 hover:bg-muted/45 focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                    <ExperienceHeader experience={experience} />
                    <ChevronDown
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open/details:rotate-180"
                    />
                  </summary>

                  <ul className="space-y-2 px-4 pb-4 text-sm leading-6 text-muted-foreground">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/50"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <div className="p-4">
                  <ExperienceHeader experience={experience} />
                </div>
              )}
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ExperienceHeader({ experience }: { experience: Experience }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-4">
      <div className="min-w-0">
        <h3 className="text-base font-semibold tracking-normal text-foreground">
          {experience.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          {experience.company}
        </p>
      </div>

      <div className="flex shrink-0 flex-col gap-1 text-xs text-muted-foreground sm:items-end">
        <span className="inline-flex items-center gap-1.5">
          <Calendar aria-hidden="true" className="size-3.5" />
          {experience.period}
        </span>
        {experience.location ? (
          <span className="inline-flex items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-3.5" />
            {experience.location}
          </span>
        ) : null}
      </div>
    </div>
  )
}

export default ExperienceSection
