import fs from "node:fs"
import path from "node:path"

import { number, parseFrontmatter, text } from "@/lib/frontmatter"
import { countWords } from "@/lib/markdown"
import type { PostSummary } from "@/lib/post-format"

type Post = {
  slug: string
  title: string
  /** ISO date, e.g. 2024-03-20. */
  date: string
  topic: string
  minutes: number
  /** A line that sits under the title. */
  summary?: string
  /** Where the post first appeared, if not here. */
  original?: string
  content: string
}

const blogDirectory = path.join(process.cwd(), "content", "blog")

function readPost(fileName: string): Post {
  const source = fs.readFileSync(path.join(blogDirectory, fileName), "utf8")
  const { data, content } = parseFrontmatter(source)

  return {
    slug: fileName.replace(/\.md$/, ""),
    title: text(data, "title"),
    date: text(data, "date"),
    topic: text(data, "topic") || "notes",
    minutes: content
      ? Math.max(1, Math.round(countWords(content) / 220))
      : number(data, "minutes", 1),
    summary: text(data, "summary") || undefined,
    original: text(data, "original") || undefined,
    content,
  }
}

/**
 * Every post in content/blog, newest first. To publish one, add a markdown
 * file there; a file whose name starts with "_" is treated as a draft.
 */
function getPosts() {
  if (!fs.existsSync(blogDirectory)) {
    return []
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map(readPost)
    .sort((first, second) => second.date.localeCompare(first.date))
}

function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug) ?? null
}

function toSummary(post: Post): PostSummary {
  const external = !post.content && Boolean(post.original)

  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    topic: post.topic,
    minutes: post.minutes,
    original: post.original,
    href: external ? (post.original as string) : `/blog/${post.slug}`,
    external,
  }
}

export { getPost, getPosts, toSummary }
export type { Post }
