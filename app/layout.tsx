import type { Metadata, Viewport } from "next"
import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Schibsted_Grotesk,
} from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { Bruno } from "@/components/bruno"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { profile, socialLinks } from "@/lib/profile"
import { siteDescription, siteTitleName, siteUrl } from "@/lib/site-metadata"

const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
})

const fontBody = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
})

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteTitleName} — ${profile.title}`,
    template: `%s — ${siteTitleName}`,
  },
  description: siteDescription,
  keywords: [
    "Devrajsinh Jhala",
    "Devraj Jhala",
    "Software Engineer",
    "Cisco",
    "Open Source Developer",
    "Systems Software",
    "PyTorch",
    "Machine Learning Research",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.title}`,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: siteDescription,
    creator: `@${profile.xUsername}`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3f9" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0a12" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}/images/myPhoto.webp`,
    jobTitle: profile.title,
    worksFor: {
      "@type": "Organization",
      name: profile.employer,
    },
    homeLocation: {
      "@type": "Place",
      name: profile.location,
    },
    sameAs: socialLinks
      .filter((link) => !link.href.startsWith("mailto:"))
      .map((link) => link.href),
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <SiteHeader />
          <main className="wrap">{children}</main>
          <SiteFooter />
          <Bruno />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
