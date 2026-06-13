import { Mail } from "lucide-react"
import { SiGithub, SiX } from "react-icons/si"

import type { SocialKind } from "@/lib/profile"

function SocialIcon({
  className,
  kind,
}: {
  className?: string
  kind: SocialKind
}) {
  if (kind === "mail") {
    return <Mail aria-hidden="true" className={className} />
  }

  if (kind === "github") {
    return <SiGithub aria-hidden="true" className={className} />
  }

  if (kind === "x") {
    return <SiX aria-hidden="true" className={className} />
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v10.75H3V9.75Zm6.35 0h3.83v1.47h.05c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.66 4.8 6.12v5.11h-4v-4.53c0-1.08-.02-2.47-1.51-2.47-1.51 0-1.74 1.18-1.74 2.4v4.6h-4V9.75Z" />
    </svg>
  )
}

export { SocialIcon }
