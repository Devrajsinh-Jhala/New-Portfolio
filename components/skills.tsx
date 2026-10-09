"use client"

import { useEffect, useRef } from "react"
import type { IconType } from "react-icons"
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiTypescript,
} from "react-icons/si"

import { pose } from "@/lib/character"
import { scrollProgress, smooth } from "@/lib/scroll"

// Four groups of three. Icons are listed group by group, top to bottom.
const groups = ["languages", "systems", "web", "backend and ml"]

const icons: { name: string; Icon: IconType }[] = [
  { name: "C", Icon: SiC },
  { name: "C++", Icon: SiCplusplus },
  { name: "Python", Icon: SiPython },
  { name: "Linux", Icon: SiLinux },
  { name: "Git", Icon: SiGit },
  { name: "Docker", Icon: SiDocker },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "PyTorch", Icon: SiPytorch },
]

/** Where an icon drifts before it is called into its group. Same on every visit. */
function drift(i: number) {
  const cell = (i * 5) % 12
  let a = Math.sin(i * 12.9898) * 43758.5453
  let b = Math.sin(i * 78.233) * 12543.123

  a -= Math.floor(a)
  b -= Math.floor(b)

  return {
    column: Math.floor(i / 3),
    row: i % 3,
    x: ((cell % 4) + 0.5) / 4 + (a - 0.5) * 0.14,
    y: (Math.floor(cell / 4) + 0.5) / 3 + (b - 0.5) * 0.2,
    phase: a * 6.28,
    speed: 0.35 + b * 0.45,
    depth: 0.5 + a * 0.9,
  }
}

/**
 * Skills. The icons float loose, lean away from the pointer, and line up into
 * their groups as the section is scrolled through.
 */
function Skills() {
  const section = useRef<HTMLElement>(null)
  const field = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionElement = section.current
    const fieldElement = field.current

    if (!sectionElement || !fieldElement) {
      return
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const tiles = Array.from(
      fieldElement.querySelectorAll<HTMLElement>(".ico")
    ).map((element, i) => ({ element, ...drift(i) }))
    const labels = Array.from(
      fieldElement.querySelectorAll<HTMLElement>(".grp")
    )
    let pointerX = 0
    let pointerY = 0
    let frame = 0
    let size = 0
    let done = false

    function draw(time: number) {
      frame = requestAnimationFrame(draw)

      const width = fieldElement!.clientWidth
      const height = fieldElement!.clientHeight
      const progress = scrollProgress(sectionElement!)

      if (!width || !height || progress === null) {
        return
      }

      const t = time / 1000
      const settle = reduce ? 1 : smooth((progress - 0.1) / 0.62)
      const nextSize = Math.max(40, Math.min(84, width / 13, height / 8.5))
      const gap = Math.min(Math.max(170, width * 0.21), width / 4.3)
      const rowGap = Math.min(Math.max(96, height * 0.21), (height - 70) / 3)
      const top = Math.max(64, (height - rowGap * 2) / 2 - 10)
      const sway = nextSize / 44

      if (nextSize !== size) {
        size = nextSize
        fieldElement!.style.setProperty("--ico", `${size.toFixed(1)}px`)
      }

      for (const tile of tiles) {
        const looseX =
          tile.x * width +
          Math.sin(t * tile.speed + tile.phase) * 16 * sway -
          pointerX * 34 * sway * tile.depth
        const looseY =
          tile.y * (height - 50) +
          25 +
          Math.cos(t * tile.speed * 0.8 + tile.phase) * 13 * sway -
          pointerY * 22 * sway * tile.depth
        const groupX = width / 2 + (tile.column - 1.5) * gap
        const groupY = top + tile.row * rowGap
        const x = looseX + (groupX - looseX) * settle
        const y = looseY + (groupY - looseY) * settle
        const turn = (1 - settle) * Math.sin(t * tile.speed + tile.phase) * 9
        const scale = 1 + (1 - settle) * 0.22 * tile.depth

        tile.element.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${turn.toFixed(1)}deg) scale(${scale.toFixed(2)})`
      }

      labels.forEach((label, i) => {
        label.style.left = `${width / 2 + (i - 1.5) * gap}px`
        label.style.top = `${top - size / 2 - 36}px`
      })

      const settled = settle > 0.93

      if (settled !== done) {
        done = settled
        fieldElement!.classList.toggle("done", settled)

        if (settled) {
          pose("think", 1400)
        }
      }
    }

    function onPointerMove(event: PointerEvent) {
      const rect = fieldElement!.getBoundingClientRect()

      pointerX = (event.clientX - rect.left) / rect.width - 0.5
      pointerY = (event.clientY - rect.top) / rect.height - 0.5
    }

    function onPointerLeave() {
      pointerX = 0
      pointerY = 0
    }

    // Only animate while the field is on screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(frame)

        if (entry.isIntersecting) {
          frame = requestAnimationFrame(draw)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(fieldElement)
    fieldElement.addEventListener("pointermove", onPointerMove)
    fieldElement.addEventListener("pointerleave", onPointerLeave)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      fieldElement.removeEventListener("pointermove", onPointerMove)
      fieldElement.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [])

  return (
    <section className="skills" ref={section} aria-label="Skills">
      <div className="pin">
        <div>
          <h2 className="h">Skills</h2>
          <p className="sub">
            Day to day I’m strongest in C and C++, Python, systems debugging,
            backend APIs and ML pipelines.
          </p>
        </div>
        <div className="field" ref={field}>
          {icons.map(({ name, Icon }) => (
            <div key={name} className="ico" title={name}>
              <Icon aria-hidden="true" />
              <span>{name}</span>
            </div>
          ))}
          {groups.map((group) => (
            <span key={group} className="grp">
              {group}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Skills }
