import type { IconType } from "react-icons"
import {
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRedux,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si"

type Skill = {
  name: string
  icon: IconType
  color: string
}

const skills: Skill[] = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "var(--foreground)",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#38bdf8",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178c6",
  },
  {
    name: "React",
    icon: SiReact,
    color: "#61dafb",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "#f7df1e",
  },
  {
    name: "Python",
    icon: SiPython,
    color: "#3776ab",
  },
  {
    name: "Java",
    icon: SiOpenjdk,
    color: "#f89820",
  },
  {
    name: "C",
    icon: SiC,
    color: "#a8b9cc",
  },
  {
    name: "C++",
    icon: SiCplusplus,
    color: "#00599c",
  },
  {
    name: "HTML5",
    icon: SiHtml5,
    color: "#e34f26",
  },
  {
    name: "CSS",
    icon: SiCss,
    color: "#663399",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#5fa04e",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "var(--foreground)",
  },
  {
    name: "Redux",
    icon: SiRedux,
    color: "#764abc",
  },
  {
    name: "shadcn/ui",
    icon: SiShadcnui,
    color: "var(--foreground)",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#4169e1",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    color: "#4479a1",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#47a248",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    color: "var(--foreground)",
  },
  {
    name: "Supabase",
    icon: SiSupabase,
    color: "#3ecf8e",
  },
  {
    name: "Firebase",
    icon: SiFirebase,
    color: "#ffca28",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ed",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#f05032",
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "var(--foreground)",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "var(--foreground)",
  },
]

function SkillsSection() {
  return (
    <section
      className="mx-auto w-full max-w-5xl py-7"
      aria-labelledby="skills-heading"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Skills
          </p>
          <h2
            id="skills-heading"
            className="text-xl font-semibold tracking-normal text-foreground"
          >
            Technologies I work with
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => {
          const Icon = skill.icon

          return (
            <span
              key={skill.name}
              tabIndex={0}
              aria-label={skill.name}
              title={skill.name}
              className="group relative flex size-9 items-center justify-center transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <Icon
                aria-hidden="true"
                className="size-7 transition-transform duration-200 group-hover:scale-110 group-focus-visible:scale-110"
                style={{ color: skill.color }}
              />
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 rounded-md bg-popover px-2 py-1 text-xs font-medium whitespace-nowrap text-popover-foreground opacity-0 shadow-sm shadow-foreground/10 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                {skill.name}
              </span>
            </span>
          )
        })}
      </div>
    </section>
  )
}

export default SkillsSection
