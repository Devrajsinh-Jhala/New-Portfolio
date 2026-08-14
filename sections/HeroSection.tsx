import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react"

import { SocialIcon } from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import { profile, socialLinks } from "@/lib/profile"

const heroContent = {
  name: profile.name,
  role: `${profile.role} at ${profile.employer}`,
  focusAreas: ["Systems", "Developer tools", "Applied ML"],
  description:
    "I build dependable platform software, open-source tools used through npm and PyPI, and research-backed machine-learning systems.",
  actions: {
    primary: {
      label: "View projects",
      href: "/projects",
    },
    secondary: {
      label: "View résumé",
      href: profile.resumePath,
    },
  },
  socials: socialLinks,
} as const

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl py-3 sm:py-4 lg:py-6">
      <div className="flex flex-col items-center justify-start gap-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="relative shrink-0">
          <Image
            src="/images/myPhoto.webp"
            alt={`Profile portrait of ${heroContent.name}`}
            width={480}
            height={480}
            preload
            className="size-44 rounded-full border-4 border-background object-cover shadow-2xl ring-1 shadow-foreground/15 ring-border/80 sm:size-52 lg:size-60"
          />
        </div>

        <div className="flex max-w-lg min-w-0 flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-normal text-balance sm:text-4xl lg:text-5xl">
              {heroContent.name}
            </h1>
            <p className="text-xl font-semibold tracking-normal text-foreground sm:text-2xl">
              {heroContent.role}
            </p>
          </div>

          <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
            {heroContent.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
              <MapPin aria-hidden="true" className="size-3.5" />
              {profile.location}
            </span>
            {heroContent.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {area}
              </span>
            ))}
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="h-9 px-3 text-sm">
              <Link href={heroContent.actions.primary.href}>
                {heroContent.actions.primary.label}
                <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-9 px-3 text-sm">
              <Link href={heroContent.actions.secondary.href} target="_blank">
                <FileText aria-hidden="true" data-icon="inline-start" />
                {heroContent.actions.secondary.label}
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-9 px-3 text-sm">
              <a href={`mailto:${profile.email}`}>
                <Mail aria-hidden="true" data-icon="inline-start" />
                Contact me
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {heroContent.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={
                  social.href.startsWith("mailto:") ? undefined : "_blank"
                }
                rel={
                  social.href.startsWith("mailto:") ? undefined : "noreferrer"
                }
                aria-label={social.label}
                title={social.label}
                className="inline-flex size-8 items-center justify-center rounded-md border border-border/70 bg-background/70 text-muted-foreground shadow-sm shadow-foreground/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <SocialIcon kind={social.kind} className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
