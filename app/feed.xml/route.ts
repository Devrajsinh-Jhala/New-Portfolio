import { getPosts, toSummary } from "@/lib/blog"
import { profile } from "@/lib/profile"
import { siteUrl } from "@/lib/site-metadata"

export const dynamic = "force-static"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/** The blog as an RSS feed. */
export function GET() {
  const items = getPosts()
    .map(toSummary)
    .map((post) => {
      const link = post.external ? post.href : `${siteUrl}${post.href}`

      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <category>${escapeXml(post.topic)}</category>`,
        "    </item>",
      ].join("\n")
    })
    .join("\n")
  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(profile.name)}</title>`,
    `    <link>${siteUrl}/blog</link>`,
    `    <description>Posts by ${escapeXml(profile.name)}.</description>`,
    "    <language>en</language>",
    `    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n")

  return new Response(feed, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
