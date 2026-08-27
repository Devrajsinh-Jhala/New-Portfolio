"use client"

import { useEffect, useRef, useState } from "react"
import type { ElementType, ReactNode } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  as?: ElementType
  delay?: number
  className?: string
}

/**
 * Reveals its children with a small rise-and-fade the first time they scroll
 * into view. Falls back to visible immediately when IntersectionObserver is
 * unavailable, and the animation itself is disabled via CSS under
 * prefers-reduced-motion.
 */
function Reveal({ children, as, delay = 0, className }: RevealProps) {
  const Component = as ?? "div"
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current

    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    )

    observer.observe(node)

    // Safety net: if the observer never fires (odd viewport, background tab,
    // print), reveal the content anyway so it can never stay hidden.
    const fallback = window.setTimeout(() => setVisible(true), 1600)

    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return (
    <Component
      ref={ref}
      data-reveal=""
      className={cn(visible && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  )
}

export { Reveal }
