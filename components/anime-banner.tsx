"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"

import type { Anime } from "@/lib/anime"

type AnimeBannerProps = {
  anime: Anime[]
  /** "reel": big titles that slide as the page scrolls. "chips": a compact row of titles. */
  titles: "reel" | "chips"
}

/** A banner that shows the artwork of whichever title is pointed at. */
function AnimeBanner({ anime, titles }: AnimeBannerProps) {
  const [active, setActive] = useState(0)
  const reel = useRef<HTMLDivElement>(null)
  const current = anime[active]

  // The reel: alternate lines slide in opposite directions with the scroll.
  useEffect(() => {
    const element = reel.current

    if (
      !element ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }

    const lines = Array.from(element.querySelectorAll<HTMLElement>("p"))
    let ticking = false

    function update() {
      ticking = false

      lines.forEach((line, i) => {
        const rect = line.getBoundingClientRect()

        if (!rect.height || rect.bottom < 0 || rect.top > window.innerHeight) {
          return
        }

        const offset =
          (rect.top + rect.height / 2 - window.innerHeight / 2) /
          window.innerHeight

        line.style.transform = `translateX(${(offset * (i % 2 ? -1 : 1) * 110).toFixed(1)}px)`
      })
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
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <>
      <div
        className="abanner"
        aria-hidden="true"
        style={{ "--c": current.color } as CSSProperties}
      >
        {anime.map((item, i) => (
          <Image
            key={item.title}
            className={i === active ? "on" : undefined}
            src={item.banner}
            alt=""
            fill
            sizes="(max-width: 72rem) 100vw, 68rem"
          />
        ))}
        <div className="cap">
          <b>{current.title}</b>
          <span>{current.by}</span>
        </div>
      </div>

      {titles === "reel" ? (
        <div className="reel" ref={reel}>
          {anime.map((item, i) => (
            <p
              key={item.title}
              className={i === active ? "on" : undefined}
              tabIndex={0}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {item.title}
              <small>{item.by}</small>
            </p>
          ))}
        </div>
      ) : (
        <div className="chips atitles" role="group" aria-label="Anime">
          {anime.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-pressed={i === active}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

export { AnimeBanner }
