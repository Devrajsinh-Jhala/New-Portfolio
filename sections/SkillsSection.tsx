import type { IconType } from "react-icons"

import { Reveal } from "@/components/reveal"
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
      <Reveal className="mb-7 grid gap-3 md:grid-cols-[minmax(0,0.7fr)_minmax(18rem,0.45fr)] md:items-end">
        <div>
          <p className="eyebrow">Core toolkit</p>
          <h2
            id="skills-heading"
            className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground"
          >
            What I reach for in{" "}
            <span className="font-display text-[1.06em] text-brand">
              production
            </span>
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground md:justify-self-end">
          A deliberately narrow stack: low-level systems in C and C++, typed
          product work in the React ecosystem, and PyTorch for research tooling.
        </p>
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, index) => (
          <Reveal
            as="article"
            key={group.title}
            delay={index * 70}
            className="rounded-xl border border-border bg-card/60 p-4 transition-colors hover:border-brand/30"
          >
            <h3 className="font-mono text-xs tracking-[0.08em] text-foreground uppercase">
              {group.title}
            </h3>
            <p className="mt-2 min-h-10 text-xs leading-5 text-muted-foreground">
              {group.description}
            </p>
            <ul className="mt-4 space-y-1.5">
              {group.skills.map((skill) => {
                const Icon = skill.icon

                return (
                  <li
                    key={skill.name}
                    className="flex items-center gap-2.5 rounded-md bg-muted/50 px-3 py-2 text-sm font-medium text-foreground"
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
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
