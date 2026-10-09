import type { CSSProperties } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Page, Shared } from "@/components/page"
import { Prose } from "@/components/prose"
import { getBook, getBooks } from "@/lib/books"

type BookPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getBooks().map((book) => ({
    slug: book.slug,
  }))
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { slug } = await params
  const book = getBook(slug)

  if (!book) {
    return {
      title: "Books",
    }
  }

  return {
    title: `${book.title}, by ${book.author}`,
    description: `Notes on ${book.title} by ${book.author}.`,
    alternates: { canonical: `/books/${book.slug}` },
  }
}

export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params
  const book = getBook(slug)

  if (!book) {
    notFound()
  }

  return (
    <Page>
      <article className="article">
        <Link className="back" href="/books">
          ← books
        </Link>
        <div className="bookhead">
          <Shared name={`book-${book.slug}`}>
            <div
              className="cover"
              style={
                { "--cloth": book.cloth, "--foil": book.foil } as CSSProperties
              }
            >
              <b>{book.title}</b>
              <span>{book.author}</span>
            </div>
          </Shared>
          <div>
            <h1>{book.title}</h1>
            <p className="mono meta">by {book.author} · my notes</p>
          </div>
        </div>

        {book.content ? (
          <Prose markdown={book.content} />
        ) : (
          <div className="prose">
            <p className="ph">
              I haven’t written my notes on this one yet. They’ll be here when I
              do.
            </p>
          </div>
        )}
      </article>
    </Page>
  )
}
