"use client"

import { useEffect, useId, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"

import { Shared } from "@/components/page"
import { setReading } from "@/lib/character"
import type { BookSpine } from "@/lib/books"

/** Books fill a shelf left to right; when the next would not fit, a new shelf starts underneath. */
function fillShelves(books: BookSpine[], width: number) {
  const shelves: BookSpine[][] = [[]]
  let used = 16

  for (const book of books) {
    const need = book.width + 3

    if (used + need > width && shelves[shelves.length - 1].length) {
      shelves.push([])
      used = 16
    }

    shelves[shelves.length - 1].push(book)
    used += need
  }

  return shelves
}

function Bookcase({ books }: { books: BookSpine[] }) {
  const bookcase = useRef<HTMLDivElement>(null)
  const id = useId()
  const [width, setWidth] = useState(0)
  const shelves = width ? fillShelves(books, width) : [books]

  useEffect(() => {
    const element = bookcase.current

    if (!element) {
      return
    }

    const resize = new ResizeObserver(() => {
      if (element.clientWidth) {
        setWidth(element.clientWidth)
      }
    })
    // While a shelf is on screen, the character picks up a book.
    const visible = new IntersectionObserver(
      ([entry]) => setReading(id, entry.isIntersecting),
      { threshold: 0.3 }
    )

    resize.observe(element)
    visible.observe(element)

    return () => {
      resize.disconnect()
      visible.disconnect()
      setReading(id, false)
    }
  }, [id])

  return (
    <div className="bookcase" ref={bookcase} role="group" aria-label="Books">
      {shelves.map((shelf, row) => (
        <div key={row} className="shelf in">
          {shelf.map((book, i) => (
            <Shared key={book.slug} name={`book-${book.slug}`}>
              <Link
                className="spine"
                href={`/books/${book.slug}`}
                aria-label={`${book.title} by ${book.author}. Open my notes.`}
                style={
                  {
                    "--w": `${book.width}px`,
                    "--h": `${book.height}px`,
                    "--cloth": book.cloth,
                    "--foil": book.foil,
                    "--i": i,
                  } as CSSProperties
                }
              >
                <span>{book.title}</span>
              </Link>
            </Shared>
          ))}
        </div>
      ))}
    </div>
  )
}

export { Bookcase }
