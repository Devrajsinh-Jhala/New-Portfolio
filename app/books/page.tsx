import type { Metadata } from "next"
import Link from "next/link"

import { Bookcase } from "@/components/bookcase"
import { Page, PageHead } from "@/components/page"
import { getBooks, toSpine } from "@/lib/books"

export const metadata: Metadata = {
  title: "Books",
  description:
    "The books that stay close to Devrajsinh Jhala's desk, each with a page of his own notes.",
  alternates: { canonical: "/books" },
}

export default function BooksPage() {
  const books = getBooks()

  return (
    <Page>
      <PageHead title="Books" pose="read">
        The ones that stay close to my desk. Pick a spine up and it opens the
        page I wrote about it.
      </PageHead>

      <section style={{ paddingBottom: "clamp(3rem,8vw,5rem)" }}>
        <Bookcase books={books.map(toSpine)} />
        <ul className="rows">
          {books.map((book) => (
            <li key={book.slug}>
              <span className="mono">{book.content ? "notes" : "soon"}</span>
              <span className="t">
                <Link href={`/books/${book.slug}`}>{book.title}</Link>
                <span className="mono m">{book.author}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  )
}
