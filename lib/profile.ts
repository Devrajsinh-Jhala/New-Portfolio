const profile = {
  name: "Devrajsinh Jhala",
  shortName: "Devraj Jhala",
  /** How the role is shown on the site. */
  role: "SWE II",
  /** The job title, spelled out for search engines. */
  title: "Software Engineer",
  employer: "Cisco",
  location: "Bengaluru, India",
  email: "jhaladevrajsinh11@gmail.com",
  website: "https://www.devraj.pro",
  resumePath: "/resume.pdf",
  githubUsername: "Devrajsinh-Jhala",
  xUsername: "JHALA_D_S",
  linkedinPath: "devrajsinh-jhala",
} as const

const socialLinks = [
  {
    label: "Mail",
    href: `mailto:${profile.email}`,
    kind: "mail",
  },
  {
    label: "GitHub",
    href: `https://github.com/${profile.githubUsername}`,
    kind: "github",
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/in/${profile.linkedinPath}/`,
    kind: "linkedin",
  },
  {
    label: "X",
    href: `https://x.com/${profile.xUsername}`,
    kind: "x",
  },
] as const

type SocialLink = (typeof socialLinks)[number]
type SocialKind = SocialLink["kind"]

export { profile, socialLinks }
export type { SocialKind, SocialLink }
