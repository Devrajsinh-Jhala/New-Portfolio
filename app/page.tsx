import type { Metadata } from "next"
import { Suspense } from "react"

import {
  GithubCommitGraph,
  GithubCommitGraphSkeleton,
} from "@/sections/GithubCommitGraph"
import ExperienceSection from "@/sections/ExperienceSection"
import HeroSection from "@/sections/HeroSection"
import {
  PackageImpactSection,
  PackageImpactSkeleton,
} from "@/sections/PackageImpactSection"
import SkillsSection from "@/sections/SkillsSection"

export const metadata: Metadata = {
  title: "Senior Software Engineer, Open-Source Builder & Researcher",
  description:
    "Devrajsinh Jhala builds platform software at MediaTek, maintains developer tools across npm and PyPI, and publishes applied machine-learning research.",
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<PackageImpactSkeleton />}>
        <PackageImpactSection />
      </Suspense>
      <Suspense fallback={<GithubCommitGraphSkeleton />}>
        <GithubCommitGraph />
      </Suspense>
      <SkillsSection />
      <ExperienceSection />
    </>
  )
}
