import type { Metadata } from "next"

import { Page, PageHead } from "@/components/page"
import { PostList } from "@/components/post-list"
import { getPosts, toSummary } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Posts by Devrajsinh Jhala on web development, React and Next.js, algorithms, machine learning and engineering practice.",
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  const posts = getPosts().map(toSummary)
  const years = posts.map((post) => post.date.slice(0, 4)).sort()
  const elsewhere = posts.some((post) => post.original)

  return (
    <Page>
      <PageHead title="Blog" pose="smile">
        {posts.length} posts, written from {years[0]} to {years.at(-1)}.
        {elsewhere
          ? " The older ones first appeared on my Hashnode blog; new ones are written here."
          : ""}
      </PageHead>

      <section style={{ paddingBottom: "clamp(3rem,8vw,5rem)" }}>
        <PostList posts={posts} />
      </section>
    </Page>
  )
}
