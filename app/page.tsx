import { Suspense } from "react"

import {
  GithubCommitGraph,
  GithubCommitGraphSkeleton,
} from "@/sections/GithubCommitGraph"
import ExperienceSection from "@/sections/ExperienceSection"
import HeroSection from "@/sections/HeroSection"
import SkillsSection from "@/sections/SkillsSection"

export default function Page() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<GithubCommitGraphSkeleton />}>
        <GithubCommitGraph />
      </Suspense>
      <SkillsSection />
      <ExperienceSection />
    </>
  )
}
