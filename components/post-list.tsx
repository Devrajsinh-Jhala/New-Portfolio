"use client"

import { useState } from "react"
import Link from "next/link"

import { Shared } from "@/components/page"
import { formatDate, type PostSummary } from "@/lib/post-format"

/** A post's title, linking to its page here, or out to where it was first published. */
function PostLink({ post }: { post: PostSummary }) {
  if (post.external) {
    return (
      <a href={post.href} target="_blank" rel="noopener">
        {post.title} ↗
      </a>
    )
  }

  return (
    <Shared name={`post-${post.slug}`}>
      <Link className="shared" href={post.href}>
        {post.title}
      </Link>
    </Shared>
  )
}

/** Every post, grouped by year, with a filter by topic. */
function PostList({ posts }: { posts: PostSummary[] }) {
  const [topic, setTopic] = useState<string | null>(null)
  const topics = [...new Set(posts.map((post) => post.topic))]
  const shown = topic ? posts.filter((post) => post.topic === topic) : posts
  const years = [...new Set(shown.map((post) => post.date.slice(0, 4)))]

  return (
    <>
      <div className="chips" role="group" aria-label="Filter by topic">
        <button
          type="button"
          aria-pressed={topic === null}
          onClick={() => setTopic(null)}
        >
          everything {posts.length}
        </button>
        {topics.map((name) => (
          <button
            key={name}
            type="button"
            aria-pressed={topic === name}
            onClick={() => setTopic(name)}
          >
            {name} {posts.filter((post) => post.topic === name).length}
          </button>
        ))}
      </div>
      {years.map((year) => (
        <section key={year}>
          <h2 className="yh">{year}</h2>
          <ul className="rows">
            {shown
              .filter((post) => post.date.startsWith(year))
              .map((post) => (
                <li key={post.slug}>
                  <span className="mono">{formatDate(post.date, "day")}</span>
                  <span className="t">
                    <PostLink post={post} />
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  )
}

export { PostLink, PostList }
