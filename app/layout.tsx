import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"
import { profile, socialLinks } from "@/lib/profile"
import { siteTitleName, siteUrl } from "@/lib/site-metadata"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteTitleName} — Senior Software Engineer`,
    template: `%s — ${siteTitleName}`,
  },
  description:
    "Portfolio of Devrajsinh Jhala, a software engineer and open-source developer building full-stack products, machine-learning tools, and research software.",
  keywords: [
    "Devrajsinh Jhala",
    "Senior Software Engineer",
    "MediaTek",
    "Open Source Developer",
    "Systems Engineering",
    "PyTorch",
    "Next.js",
    "Machine Learning Research",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: profile.name,
    title: `${profile.name} — ${profile.role}`,
    description:
      "Systems engineer, open-source developer, and published applied-ML researcher building dependable software.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description:
      "Systems engineer, open-source developer, and published applied-ML researcher building dependable software.",
    images: ["/og.png"],
    creator: `@${profile.xUsername}`,
  },
  robots: {
    index: true,
    follow: true,
  },
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
    jobTitle: profile.role,
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
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider>
          <div className="flex min-h-svh flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-4 pb-10 sm:px-6 sm:pt-5 lg:px-8 lg:pt-6">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
