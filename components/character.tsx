"use client"

import { useEffect, useRef } from "react"
import { preload } from "react-dom"

import {
  getCharacterState,
  pose,
  poses,
  subscribe,
  type Cell,
  type PoseName,
} from "@/lib/character"

type CharacterProps = {
  /** The reaction he greets the page with. */
  entrance?: PoseName
  /** How long he holds it, in milliseconds. */
  hold?: number
  label?: string
}

const centre: Cell = [1, 1]
const clickPoses: PoseName[] = ["wave", "laugh", "wow", "thumbs"]

/**
 * The portrait. He looks towards the pointer, follows the scroll, reacts to
 * what the page is doing, and dozes off when nothing moves for a while.
 */
function Character({
  entrance = "wave",
  hold = 1700,
  label = "Devraj’s character",
}: CharacterProps) {
  const button = useRef<HTMLButtonElement>(null)

  preload("/sprites/character-directions.webp", { as: "image" })
  preload("/sprites/character-reactions.webp", { as: "image" })

  useEffect(() => {
    const element = button.current

    if (!element) {
      return
    }

    // Two stacked layers, so one drawing can fade into the next.
    const layers = [
      element.children[0] as HTMLElement,
      element.children[1] as HTMLElement,
    ]
    let shown = 0
    let painted = "1,1"
    let look: Cell = centre
    let idle = false
    let idleTimer: ReturnType<typeof setTimeout> | undefined
    let lookTimer: ReturnType<typeof setTimeout> | undefined
    let lastMove = 0
    let lastY = window.scrollY
    let clicks = 0
    let ticking = false

    function paint([column, row]: Cell) {
      const key = `${column},${row}`

      if (key === painted) {
        return
      }

      const next = layers[1 - shown]

      painted = key
      next.style.backgroundImage = column < 3 ? "var(--dirs)" : "var(--reacts)"
      next.style.backgroundPosition = `${(column % 3) * 50}% ${row * 50}%`
      next.style.opacity = "1"
      layers[shown].style.opacity = "0"
      shown = 1 - shown
    }

    function render() {
      const { reaction, reading } = getCharacterState()

      paint(reaction ?? (reading ? poses.read : idle ? poses.sleep : look))
    }

    function awake() {
      idle = false
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => {
        idle = true
        render()
      }, 15000)
    }

    function onPointerMove(event: PointerEvent) {
      const rect = element!.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(dx, dy)

      lastMove = performance.now()
      awake()
      look =
        distance < rect.width * 0.45
          ? centre
          : [
              dx < -0.38 * distance ? 0 : dx > 0.38 * distance ? 2 : 1,
              dy < -0.38 * distance ? 0 : dy > 0.38 * distance ? 2 : 1,
            ]
      render()
    }

    // With no pointer to follow, he glances the way the page is moving.
    function followScroll() {
      const y = window.scrollY
      const dy = y - lastY

      ticking = false
      lastY = y

      if (Math.abs(dy) < 2 || performance.now() - lastMove < 900) {
        return
      }

      awake()
      look = [1, dy > 0 ? 2 : 0]
      render()
      clearTimeout(lookTimer)
      lookTimer = setTimeout(() => {
        look = centre
        render()
      }, 520)
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(followScroll)
      }
    }

    function onClick() {
      awake()
      pose(clickPoses[clicks++ % clickPoses.length], 1300)
    }

    const unsubscribe = subscribe(render)

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("scroll", onScroll, { passive: true })
    element.addEventListener("click", onClick)
    awake()
    pose(entrance, hold)

    return () => {
      unsubscribe()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("scroll", onScroll)
      element.removeEventListener("click", onClick)
      clearTimeout(idleTimer)
      clearTimeout(lookTimer)
    }
  }, [entrance, hold])

  return (
    <button type="button" className="chara" ref={button} aria-label={label}>
      <i />
      <i />
    </button>
  )
}

export { Character }
