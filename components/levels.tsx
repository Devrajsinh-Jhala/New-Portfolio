"use client"

import { useEffect, useRef, useState } from "react"

import { pose } from "@/lib/character"
import type { Level } from "@/lib/experience"
import { clamp, scrollProgress } from "@/lib/scroll"

/**
 * Experience as levels. The stage stays pinned while the page scrolls behind
 * it; every stretch of scroll fills one segment of the bar and opens the next
 * level.
 */
function Levels({ levels }: { levels: Level[] }) {
  const section = useRef<HTMLElement>(null)
  const fills = useRef<(HTMLElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const [levelUp, setLevelUp] = useState(false)
  const count = levels.length

  useEffect(() => {
    let ticking = false
    let current = 0
    let levelUpTimer: ReturnType<typeof setTimeout> | undefined

    function update() {
      ticking = false

      const progress = section.current ? scrollProgress(section.current) : null

      if (progress === null) {
        return
      }

      fills.current.forEach((fill, i) => {
        if (fill) {
          fill.style.transform = `scaleX(${clamp(progress * count - i).toFixed(3)})`
        }
      })

      const next = Math.min(count - 1, Math.floor(progress * count))

      if (next === current) {
        return
      }

      const rising = next > current

      current = next
      setIndex(next)

      if (rising) {
        setLevelUp(true)
        pose("thumbs", 1200)
        clearTimeout(levelUpTimer)
        levelUpTimer = setTimeout(() => setLevelUp(false), 1100)
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      clearTimeout(levelUpTimer)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [count])

  return (
    <section
      className="levels"
      ref={section}
      aria-label="Experience, level by level"
      style={{ height: `${count * 90}vh` }}
    >
      <div className="pin">
        <div
          className="xp"
          style={{ gridTemplateColumns: `repeat(${count},minmax(0,1fr))` }}
          aria-hidden="true"
        >
          {levels.map((level, i) => (
            <div key={level.tag} className={i <= index ? "seg on" : "seg"}>
              <b>
                <i
                  ref={(element) => {
                    fills.current[i] = element
                  }}
                />
              </b>
              <span>{level.tag}</span>
            </div>
          ))}
        </div>
        <div className="lv">
          <div className="numbox" aria-hidden="true">
            <span className={levelUp ? "lvup show" : "lvup"}>level up</span>
            <p className="mono">level</p>
            <div className="num">
              <span key={index} className="in">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
          {/* Every level shares one grid cell, so the tallest sets the height. */}
          <div className="lvstack">
            {levels.map((level, i) => (
              <div
                key={level.tag}
                className={i === index ? "lvbody on" : "lvbody"}
              >
                <p className="yr">{level.period}</p>
                <h3>{level.role}</h3>
                <p className="co">
                  {level.company} <span>· {level.place}</span>
                </p>
                <ul className="pts">
                  {level.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                  {level.extraPoints?.map((point) => (
                    <li key={point} className="x">
                      {point}
                    </li>
                  ))}
                </ul>
                {level.unlocked.length ? (
                  <p className="gain">
                    <span className="mono">unlocked</span>
                    {level.unlocked.map((skill) => (
                      <b key={skill}>+ {skill}</b>
                    ))}
                  </p>
                ) : null}
                <p className="quest">
                  <span className="mono">side quest</span>
                  {level.sideQuest}
                </p>
              </div>
            ))}
          </div>
        </div>
        <p className="mono hint" aria-hidden="true">
          Keep scrolling to level up.
        </p>
      </div>
    </section>
  )
}

export { Levels }
