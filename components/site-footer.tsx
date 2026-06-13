import { PageVisitorCounter } from "@/components/page-visitor-counter"
import { SocialIcon } from "@/components/social-icon"
import { profile, socialLinks } from "@/lib/profile"

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mx-auto w-full max-w-5xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">{profile.name}</p>
          <p className="text-xs text-muted-foreground">
            Building useful software, one clean interface at a time.
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

      <div className="mt-5 grid gap-2 text-xs text-muted-foreground sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <p className="text-center sm:text-left">
          &copy; {year} {profile.name}
        </p>
        <PageVisitorCounter />
        <span aria-hidden="true" />
      </div>
    </footer>
  )
}

export { SiteFooter }
