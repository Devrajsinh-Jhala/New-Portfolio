"use client"

import { useEffect, useState } from "react"

const PAGE_VIEWS_API_BASE = "https://page-views-api.ratneshc.com/api/v1"
const PAGE_VIEWS_SITE_ID =
  process.env.NEXT_PUBLIC_PAGE_VIEWS_SITE_ID || "devraj-jhala-portfolio"
const SITE_WIDE_COUNTER_PATH = "/"

type PageViewsPayload = {
  views?: number
}

function getPageViewsUrl(endpoint: "track" | "views", pathname: string) {
  const params = new URLSearchParams({
    path: pathname,
    site: PAGE_VIEWS_SITE_ID,
  })

  return `${PAGE_VIEWS_API_BASE}/${endpoint}?${params.toString()}`
}

function getOrdinalSuffix(value: number) {
  const lastTwoDigits = value % 100

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th"
  }

  switch (value % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

function formatOrdinal(value: number) {
  return `${value.toLocaleString()}${getOrdinalSuffix(value)}`
}

function formatVisitorCount(views: number) {
  return `You are the ${formatOrdinal(views)} visitor`
}

function PageVisitorCounter() {
  const [counterText, setCounterText] = useState("Counting visitors")

  useEffect(() => {
    let isCancelled = false

    async function loadPageViews() {
      setCounterText("Counting visitors")

      try {
        await fetch(getPageViewsUrl("track", SITE_WIDE_COUNTER_PATH), {
          cache: "no-store",
          keepalive: true,
        }).catch(() => null)

        const response = await fetch(
          getPageViewsUrl("views", SITE_WIDE_COUNTER_PATH),
          {
            cache: "no-store",
          }
        )

        if (!response.ok) {
          throw new Error("Unable to load visitor count")
        }

        const payload = (await response.json()) as PageViewsPayload
        const views = Number(payload.views)

        if (!Number.isInteger(views) || views < 1) {
          throw new Error("Invalid visitor count payload")
        }

        if (!isCancelled) {
          setCounterText(formatVisitorCount(views))
        }
      } catch {
        if (!isCancelled) {
          setCounterText("Visitor count unavailable")
        }
      }
    }

    void loadPageViews()

    return () => {
      isCancelled = true
    }
  }, [])

  return (
    <div
      aria-live="polite"
      className="text-center text-xs text-muted-foreground"
    >
      {counterText}
    </div>
  )
}

export { PageVisitorCounter }
