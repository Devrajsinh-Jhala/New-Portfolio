"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
] as const

function Navbar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70",
        className
      )}
    >
      <div className="mx-auto grid h-16 w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 sm:gap-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Devrajsinh Jhala, home"
          className="inline-flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight text-foreground focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none"
        >
          <span className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-card shadow-sm shadow-foreground/5">
            DJ
          </span>
          <span className="hidden sm:inline">Devrajsinh Jhala</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex min-w-0 [scrollbar-width:none] items-center justify-center gap-0.5 overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative shrink-0 rounded-md px-2 py-2 text-xs font-medium transition-colors duration-200 focus-visible:ring-3 focus-visible:ring-ring/35 focus-visible:outline-none sm:px-2.5 sm:text-sm",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-[0.56rem] h-0.5 rounded-full bg-foreground"
                  />
                ) : null}
              </Link>
            )
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  )
}

export { Navbar }
