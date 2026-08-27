import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText, Mail, MapPin } from "lucide-react"

import { Reveal } from "@/components/reveal"
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
    <section className="mx-auto w-full max-w-5xl py-6 sm:py-8 lg:py-10">
      <div className="flex flex-col items-center justify-start gap-8 lg:flex-row lg:items-center lg:gap-12">
        <Reveal className="relative shrink-0">
          <div
            aria-hidden="true"
            className="absolute -inset-3 -z-10 rounded-full bg-brand/10 blur-2xl"
          />
          <Image
            src="/images/myPhoto.webp"
            alt={`Profile portrait of ${heroContent.name}`}
            width={480}
            height={480}
            preload
            className="size-44 rounded-full border border-border object-cover shadow-xl shadow-foreground/10 ring-1 ring-foreground/5 sm:size-52 lg:size-60"
          />
        </Reveal>

        <div className="flex max-w-lg min-w-0 flex-col items-center gap-5 text-center lg:items-start lg:text-left">
          <Reveal className="space-y-2" delay={60}>
            <p className="font-mono text-xs tracking-[0.14em] text-brand uppercase">
              {profile.role} · {profile.employer}
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {heroContent.name}
            </h1>
          </Reveal>

          <Reveal
            as="p"
            delay={120}
            className="max-w-lg text-[0.95rem] leading-7 text-muted-foreground sm:text-base"
          >
            I build dependable platform software, open-source tools used through
            npm and PyPI, and{" "}
            <span className="font-display text-[1.08em] text-foreground">
              research-backed
            </span>{" "}
            machine-learning systems.
          </Reveal>

          <Reveal
            className="flex flex-wrap justify-center gap-2 lg:justify-start"
            delay={180}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <MapPin aria-hidden="true" className="size-3.5 text-brand" />
              {profile.location}
            </span>
            {heroContent.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
              >
                {area}
              </span>
            ))}
          </Reveal>

          <Reveal
            className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row"
            delay={240}
          >
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
          </Reveal>

          <Reveal className="flex items-center gap-2" delay={300}>
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
                className="inline-flex size-8 items-center justify-center rounded-md border border-border bg-background/70 text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none"
              >
                <SocialIcon kind={social.kind} className="size-4" />
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
