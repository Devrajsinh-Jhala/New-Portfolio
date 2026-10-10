import { VisitorCount } from "@/components/visitor-count"
import { profile, socialLinks } from "@/lib/profile"

function SiteFooter() {
  return (
    <footer className="wrap mono">
      <div className="links">
        <span className="sel">{profile.email}</span>
        {socialLinks
          .filter((link) => link.kind !== "mail")
          .map((link) => (
            <a
              key={link.kind}
              className="lk"
              href={link.href}
              target="_blank"
              rel="noopener"
            >
              {link.label.toLowerCase()}
            </a>
          ))}
        <a className="lk" href="/feed.xml">
          rss
        </a>
      </div>
      <VisitorCount />
    </footer>
  )
}

export { SiteFooter }
