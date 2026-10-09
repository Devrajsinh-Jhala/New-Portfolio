"use client"

import { useState, type ReactNode } from "react"
import { flushSync } from "react-dom"

import { Character } from "@/components/character"
import { NowPlaying } from "@/components/now-playing"
import { pose } from "@/lib/character"
import { profile } from "@/lib/profile"
import { reveal } from "@/lib/reveal"

type Side = "pro" | "personal"

const sides: { id: Side; label: string; line: string; own: string }[] = [
  {
    id: "pro",
    label: "professional",
    line: "SWE II at Cisco. Systems and backend software in C, C++ and Python.",
    own: "I started out building apps: landing pages and dashboards first, then full-stack products of my own. That pulled me into machine learning research and a master’s at BITS Pilani, and from there into MediaTek, where I went from intern to Senior Engineer writing systems software. Cisco is where I am now.",
  },
  {
    id: "personal",
    label: "personal",
    line: "Off the clock: books, anime, and writing things down.",
    own: "This side is the rest of me: what I’m reading, what I’ve written, and the anime I keep going back to.",
  },
]

// Kept for the visit, so coming back to the home page lands on the same side.
let remembered: Side = "pro"

type HomeSidesProps = {
  pro: ReactNode
  personal: ReactNode
}

/** The hero, and the switch between the two sides of the home page. */
function HomeSides({ pro, personal }: HomeSidesProps) {
  const [side, setSide] = useState<Side>(() => remembered)
  const current = sides.find((item) => item.id === side) ?? sides[0]

  function choose(next: Side, button: HTMLButtonElement) {
    if (next === side) {
      return
    }

    reveal(button, () => {
      flushSync(() => {
        remembered = next
        setSide(next)
      })
    })
    pose("wow", 900)
  }

  return (
    <>
      <section className="hero">
        <div className="text">
          <div className="name">
            <p className="kick">Hey, I’m</p>
            <h1>{profile.shortName}</h1>
          </div>
          <div className="rest">
            <p className="line">{current.line}</p>
            <p className="own">{current.own}</p>
            <div className="pick">
              <div className="sides" role="group" aria-label="Which side of me">
                {sides.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={item.id === side}
                    onClick={(event) => choose(item.id, event.currentTarget)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <span className="mono">
                Two sides of the same person. Flip it.
              </span>
            </div>
          </div>
        </div>
        <div className="side">
          <Character
            entrance="wave"
            hold={1200}
            label="Devraj as a character. He looks towards your pointer. Click to say hi."
          />
          <NowPlaying />
        </div>
      </section>

      <div hidden={side !== "pro"}>{pro}</div>
      <div hidden={side !== "personal"}>{personal}</div>
    </>
  )
}

export { HomeSides }
