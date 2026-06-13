"use client"

import { useEffect, useRef } from "react"

const SESSION_VISITOR_NUMBER_KEY = "devrajsinh-site-visitor-number"

function formatOrdinal(value: number) {
  const remainder = value % 100
  const formattedValue = value.toLocaleString()

  if (remainder >= 11 && remainder <= 13) {
    return `${formattedValue}th`
  }

  switch (value % 10) {
    case 1:
      return `${formattedValue}st`
    case 2:
      return `${formattedValue}nd`
    case 3:
      return `${formattedValue}rd`
    default:
      return `${formattedValue}th`
  }
}

function setCounterText(element: HTMLDivElement | null, count: number) {
  if (!element) {
    return
  }

  element.textContent = `You are the ${formatOrdinal(count)} visitor`
}

function PageVisitorCounter() {
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadVisitorCount() {
      try {
        const storedVisitorNumber = Number.parseInt(
          window.sessionStorage.getItem(SESSION_VISITOR_NUMBER_KEY) ?? "",
          10
        )

        if (Number.isFinite(storedVisitorNumber) && storedVisitorNumber > 0) {
          setCounterText(countRef.current, storedVisitorNumber)
          return
        }

        const response = await fetch("/api/visits", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Unable to load visitor count")
        }

        const payload = (await response.json()) as { count?: number }
        const count = payload.count ?? 1

        window.sessionStorage.setItem(SESSION_VISITOR_NUMBER_KEY, String(count))
        setCounterText(countRef.current, count)
      } catch {
        if (countRef.current) {
          countRef.current.textContent = "Visitor count unavailable"
        }
      }
    }

    void loadVisitorCount()
  }, [])

  return (
    <div
      ref={countRef}
      aria-live="polite"
      className="text-center text-xs text-muted-foreground"
    >
      You are the -- visitor
    </div>
  )
}

export { PageVisitorCounter }
