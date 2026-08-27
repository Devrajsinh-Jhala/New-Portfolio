import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"

import { SocialIcon } from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import { profile, socialLinks } from "@/lib/profile"

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 rounded-xl border border-border bg-card/60 p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6">
        <div>
          <p className="eyebrow">Start a conversation</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-2xl">
            Have a platform, tooling, or research problem{" "}
            <span className="font-display text-[1.06em] text-brand">
              worth solving?
            </span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            I’m open to conversations about systems and platform engineering,
            developer tooling, and applied ML.
          </p>
        </div>
        <Button asChild className="w-fit">
          <a href={`mailto:${profile.email}?subject=Let%27s%20work%20together`}>
            <Mail aria-hidden="true" data-icon="inline-start" />
            Discuss a project
          </a>
        </Button>
      </section>

      <div className="mt-8 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
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
              className="inline-flex size-8 items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-brand focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
            >
              <SocialIcon kind={social.kind} className="size-4" />
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          &copy; {year} {profile.name} · {profile.location}
        </p>
        <Link
          href="/projects"
          className="u-link inline-flex w-fit items-center gap-1 font-medium text-foreground"
        >
          Explore selected work
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </footer>
  )
}

export { SiteFooter }
