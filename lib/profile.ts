const profile = {
  name: "Devrajsinh Jhala",
  email: "jhaladevrajsinh11@gmail.com",
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
    label: "X",
    href: `https://x.com/${profile.xUsername}`,
    kind: "x",
  },
  {
    label: "LinkedIn",
    href: `https://www.linkedin.com/in/${profile.linkedinPath}/`,
    kind: "linkedin",
  },
] as const

type SocialLink = (typeof socialLinks)[number]
type SocialKind = SocialLink["kind"]

export { profile, socialLinks }
export type { SocialKind, SocialLink }
