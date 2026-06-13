"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const PAGE_VIEWS_API_BASE = "https://page-views-api.ratneshc.com/api/v1"
const PAGE_VIEWS_SITE_ID =
  process.env.NEXT_PUBLIC_PAGE_VIEWS_SITE_ID || "devraj-jhala-portfolio"

type PageViewsPayload = {
  views?: number
}

function normalizePath(pathname: string) {
  const path = pathname.trim() || "/"

  if (path === "/") {
    return path
  }

  return path.replace(/\/+$/, "")
}

function getPageViewsUrl(endpoint: "track" | "views", pathname: string) {
  const params = new URLSearchParams({
    path: pathname,
    site: PAGE_VIEWS_SITE_ID,
  })

  return `${PAGE_VIEWS_API_BASE}/${endpoint}?${params.toString()}`
}

function formatPageViews(views: number) {
  const label = views === 1 ? "view" : "views"

  return `${views.toLocaleString()} ${label} on this page`
}

function PageVisitorCounter() {
  const pathname = usePathname()
  const [counterText, setCounterText] = useState("Loading page views")

  useEffect(() => {
    let isCancelled = false
    const trackedPath = normalizePath(pathname)

    async function loadPageViews() {
      setCounterText("Loading page views")

      try {
        await fetch(getPageViewsUrl("track", trackedPath), {
          cache: "no-store",
          keepalive: true,
        }).catch(() => null)

        const response = await fetch(getPageViewsUrl("views", trackedPath), {
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Unable to load page views")
        }

        const payload = (await response.json()) as PageViewsPayload
        const views = Number(payload.views)

        if (!Number.isFinite(views) || views < 0) {
          throw new Error("Invalid page views payload")
        }

        if (!isCancelled) {
          setCounterText(formatPageViews(views))
        }
      } catch {
        if (!isCancelled) {
          setCounterText("Page views unavailable")
        }
      }
    }

    void loadPageViews()

    return () => {
      isCancelled = true
    }
  }, [pathname])

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
