import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Page, Shared } from "@/components/page"
import { Prose } from "@/components/prose"
import { getPost, getPosts } from "@/lib/blog"
import { formatDate } from "@/lib/post-format"
import { profile } from "@/lib/profile"
import { siteUrl } from "@/lib/site-metadata"

type PostPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    return {
      title: "Blog",
    }
  }

  return {
    title: post.title,
    description:
      post.summary ??
      `${post.title}. A post by ${profile.name} on ${post.topic}.`,
    // Until a post's text lives here, the original stays the page of record.
    alternates: {
      canonical: post.content ? `/blog/${post.slug}` : post.original,
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  // Some summaries are just the post's opening words; those would only repeat it.
  const opening = post.content.replace(/\s+/g, " ").slice(0, 400)
  const lead =
    post.summary && !opening.includes(post.summary.slice(0, 50))
      ? post.summary
      : null
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
  }

  return (
    <Page>
      <article className={post.title.length > 48 ? "article long" : "article"}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Link className="back" href="/blog">
          ← blog
        </Link>
        <Shared name={`post-${post.slug}`}>
          <h1>{post.title}</h1>
        </Shared>
        {lead ? <p className="lead">{lead}</p> : null}
        <p className="mono meta">
          {formatDate(post.date)} · {post.minutes} min read · {post.topic}
        </p>

        {post.content ? (
          <>
            <Prose markdown={post.content} />
            {post.original ? (
              <p className="mono" style={{ marginTop: "2.25rem" }}>
                First published on{" "}
                <a
                  className="lk"
                  href={post.original}
                  target="_blank"
                  rel="noopener"
                >
                  Hashnode ↗
                </a>
              </p>
            ) : null}
          </>
        ) : (
          <div className="prose">
            <p>
              I haven’t moved this post over to this site yet.
              {post.original
                ? " It is still up where I first published it."
                : ""}
            </p>
            {post.original ? (
              <p>
                <a href={post.original} target="_blank" rel="noopener">
                  Read it on Hashnode ↗
                </a>
              </p>
            ) : null}
          </div>
        )}
      </article>
    </Page>
  )
}
