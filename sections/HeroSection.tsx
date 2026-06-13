import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, FileText } from "lucide-react"

import { BlurShimmerText } from "@/components/blur-shimmer-text"
import { SocialIcon } from "@/components/social-icon"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/lib/profile"

const heroContent = {
  name: "Devrajsinh Jhala",
  roles: ["Software Engineer", "Badminton Freak", "Inconsistent Gym Goer"],
  description:
    "Full-stack developer building clean, scalable web applications with React, Next.js, TypeScript, and a growing interest in AI-powered systems.",
  actions: {
    primary: {
      label: "View my CV",
      href: "https://drive.google.com/file/d/1hGj4JakFQbfkDI3-C4RMgUvXpbxk-rWN/view?usp=sharing",
    },
    secondary: {
      label: "Read my work",
      href: "https://hashnode.com/@DEVRAJSINH",
    },
  },
  socials: socialLinks,
} as const

function RotatingRoles() {
  return (
    <div
      aria-label={heroContent.roles.join(", ")}
      aria-live="polite"
      className="min-h-8 overflow-hidden text-xl font-semibold tracking-normal text-foreground sm:min-h-9 sm:text-2xl"
    >
      <BlurShimmerText texts={[...heroContent.roles]} interval={2.8} blur={8} />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="mx-auto w-full max-w-5xl py-3 sm:py-4 lg:py-6">
      <div className="flex flex-col items-center justify-start gap-6 lg:flex-row lg:items-center lg:gap-8">
        <div className="relative shrink-0">
          <Image
            src="/images/animePfp.jpeg"
            alt="Anime profile portrait of Devrajsinh Jhala"
            width={254}
            height={352}
            priority
            className="h-[16.5rem] w-[12rem] rounded-lg border border-border/70 object-cover shadow-xl shadow-foreground/10 sm:h-[19.5rem] sm:w-[14.125rem]"
          />
        </div>

        <div className="flex max-w-lg min-w-0 flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <div className="space-y-2.5">
            <h1 className="text-3xl font-semibold tracking-normal text-balance sm:text-4xl lg:text-5xl">
              {heroContent.name}
            </h1>
            <RotatingRoles />
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            {heroContent.description}
          </p>

          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="h-9 px-3 text-sm">
              <Link href={heroContent.actions.primary.href} target="_blank">
                <FileText aria-hidden="true" data-icon="inline-start" />
                {heroContent.actions.primary.label}
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-9 px-3 text-sm">
              <Link href={heroContent.actions.secondary.href} target="_blank">
                {heroContent.actions.secondary.label}
                <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
              </Link>
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
