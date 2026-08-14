import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import { SocialIcon } from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import { profile, socialLinks } from "@/lib/profile"

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 rounded-lg border border-border/70 bg-card/75 p-5 shadow-sm shadow-foreground/5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
            Start a conversation
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-normal text-balance text-foreground sm:text-2xl">
            Have a product, platform, or research problem worth solving?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            I’m open to conversations about software engineering, developer
            tooling, applied ML, and focused technical collaborations.
          </p>
        </div>
        <Button asChild className="w-fit">
          <a href={`mailto:${profile.email}?subject=Let%27s%20work%20together`}>
            <Mail aria-hidden="true" data-icon="inline-start" />
            Discuss a project
          </a>
        </Button>
      </section>

      <div className="mt-8 flex flex-col gap-5 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{profile.name}</p>
          <p className="text-xs text-muted-foreground">
            {profile.role} at {profile.employer} · {profile.location}
          </p>
        </div>

        <nav aria-label="Social links" className="flex flex-wrap gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={social.href.startsWith("mailto:") ? undefined : "noreferrer"}
              aria-label={social.label}
              title={social.label}
              className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <SocialIcon kind={social.kind} className="size-4" />
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {profile.name}
        </p>
        <Link
          href="/projects"
          className="inline-flex w-fit items-center gap-1 font-medium text-foreground hover:underline"
        >
          Explore selected work
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </footer>
  )
}

export { SiteFooter }
