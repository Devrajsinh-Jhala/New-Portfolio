import type { IconType } from "react-icons"
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiGithubactions,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiTypescript,
} from "react-icons/si"

type Skill = {
  name: string
  icon: IconType
  color: string
}

type SkillGroup = {
  title: string
  description: string
  skills: Skill[]
}

const skillGroups: SkillGroup[] = [
  {
    title: "Systems",
    description: "Platform and performance-oriented engineering.",
    skills: [
      { name: "C", icon: SiC, color: "#a8b9cc" },
      { name: "C++", icon: SiCplusplus, color: "#00599c" },
      { name: "Python", icon: SiPython, color: "#3776ab" },
    ],
  },
  {
    title: "Product engineering",
    description: "Typed, accessible interfaces and full-stack products.",
    skills: [
      { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
      { name: "React", icon: SiReact, color: "#61dafb" },
      { name: "Next.js", icon: SiNextdotjs, color: "var(--foreground)" },
    ],
  },
  {
    title: "Backend & data",
    description: "APIs, services, and reliable persistence layers.",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
      { name: "MySQL", icon: SiMysql, color: "#4479a1" },
    ],
  },
  {
    title: "ML & delivery",
    description: "Research tooling, reproducible models, and automation.",
    skills: [
      { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
      { name: "Docker", icon: SiDocker, color: "#2496ed" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
    ],
  },
]

function SkillsSection() {
  return (
    <section
      className="mx-auto w-full max-w-5xl py-8"
      aria-labelledby="skills-heading"
    >
      <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.45fr)] md:items-end">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Core toolkit
          </p>
          <h2
            id="skills-heading"
            className="mt-2 text-2xl font-semibold tracking-normal text-foreground"
          >
            Technologies I use in production
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground md:justify-self-end">
          A focused stack shaped by systems work, product delivery, open-source
          maintenance, and applied machine-learning research.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <article
            key={group.title}
            className="rounded-lg border border-border/70 bg-card/75 p-4 shadow-sm shadow-foreground/5"
          >
            <h3 className="text-sm font-semibold text-foreground">
              {group.title}
            </h3>
            <p className="mt-1 min-h-10 text-xs leading-5 text-muted-foreground">
              {group.description}
            </p>
            <ul className="mt-4 space-y-2">
              {group.skills.map((skill) => {
                const Icon = skill.icon

                return (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2.5 rounded-md bg-muted/55 px-3 py-2 text-sm font-medium text-foreground"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4 shrink-0"
                      style={{ color: skill.color }}
                    />
                    {skill.name}
                  </li>
                )
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
