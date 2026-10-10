"use client"

import { useEffect, useState } from "react"

// The counter the old site used, so the count carries on from where it was.
const API = "https://page-views-api.ratneshc.com/api/v1"
const SITE = "devraj-jhala-portfolio"

/** One count for the whole site, kept under the home page's path. */
function countUrl(endpoint: "track" | "views") {
  const query = new URLSearchParams({ path: "/", site: SITE })

  return `${API}/${endpoint}?${query}`
}

/** 1 becomes "1st", 22 "22nd", 1013 "1,013th". */
function ordinal(value: number) {
  const lastTwo = value % 100
  const suffix =
    lastTwo >= 11 && lastTwo <= 13
      ? "th"
      : (["th", "st", "nd", "rd"][value % 10] ?? "th")

  return `${value.toLocaleString("en")}${suffix}`
}

/**
 * Which visitor this is, counted across the whole site.
 * Stays empty if the count cannot be fetched.
 */
function VisitorCount() {
  const [views, setViews] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      // A dev server only reads the count, so working on the site adds nothing.
      if (process.env.NODE_ENV === "production") {
        await fetch(countUrl("track"), {
          cache: "no-store",
          keepalive: true,
        }).catch(() => null)
      }

      const response = await fetch(countUrl("views"), { cache: "no-store" })
      const data: { views?: number } | null = response.ok
        ? await response.json()
        : null
      const total = Number(data?.views)

      if (!cancelled && Number.isInteger(total) && total > 0) {
        setViews(total)
      }
    }

    load().catch(() => {})

    return () => {
      cancelled = true
    }
  }, [])

  if (views === null) {
    return <p className="visits" aria-hidden="true" />
  }

  return (
    <p className="visits">
      You are the <b>{ordinal(views)}</b> visitor.
    </p>
  )
}

export { VisitorCount }
