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
