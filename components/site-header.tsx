"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/theme-toggle"
import { profile } from "@/lib/profile"

const pages = [
  { label: "about", href: "/about" },
  { label: "projects", href: "/projects" },
  { label: "research", href: "/research" },
  { label: "blog", href: "/blog" },
  { label: "books", href: "/books" },
]

function SiteHeader() {
  const pathname = usePathname()
  const bar = useRef<HTMLElement>(null)

  // The pinned stages sit right under the bar, so they need its real height.
  useEffect(() => {
    const element = bar.current

    if (!element) {
      return
    }

    const measure = () => {
      document.documentElement.style.setProperty(
        "--bar",
        `${element.offsetHeight}px`
      )
    }
    const observer = new ResizeObserver(measure)

    measure()
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <header className="bar" ref={bar}>
      <Link className="home" href="/">
        {profile.shortName}
      </Link>
      <nav className="nav" aria-label="Pages">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            aria-current={
              pathname === page.href || pathname.startsWith(`${page.href}/`)
                ? "page"
                : undefined
            }
          >
            {page.label}
          </Link>
        ))}
        <span className="gap" />
        <a href={profile.resumePath} target="_blank" rel="noopener">
          résumé ↗
        </a>
      </nav>
      <ThemeToggle />
    </header>
  )
}

export { SiteHeader }
