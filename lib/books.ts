import fs from "node:fs"
import path from "node:path"

import { number, parseFrontmatter, text } from "@/lib/frontmatter"

type Book = {
  slug: string
  title: string
  author: string
  order: number
  /** Spine colours and size on the shelf. */
  cloth: string
  foil: string
  height: number
  width: number
  /** The notes, in markdown. Empty until they are written. */
  content: string
}

type BookSpine = Omit<Book, "content">

const booksDirectory = path.join(process.cwd(), "content", "books")

/**
 * Every book in content/books, in shelf order. To add one, drop a new
 * markdown file there; the shelf makes room for it.
 */
function getBooks(): Book[] {
  if (!fs.existsSync(booksDirectory)) {
    return []
  }

  return fs
    .readdirSync(booksDirectory)
    .filter((fileName) => fileName.endsWith(".md") && !fileName.startsWith("_"))
    .map((fileName) => {
      const source = fs.readFileSync(
        path.join(booksDirectory, fileName),
        "utf8"
      )
      const { data, content } = parseFrontmatter(source)

      return {
        slug: fileName.replace(/\.md$/, ""),
        title: text(data, "title"),
        author: text(data, "author"),
        order: number(data, "order", 999),
        cloth: text(data, "cloth") || "#33312e",
        foil: text(data, "foil") || "#e8dfcc",
        height: number(data, "height", 176),
        width: number(data, "width", 38),
        content,
      }
    })
    .sort((first, second) => first.order - second.order)
}

function getBook(slug: string) {
  return getBooks().find((book) => book.slug === slug) ?? null
}

function toSpine(book: Book): BookSpine {
  return {
    slug: book.slug,
    title: book.title,
    author: book.author,
    order: book.order,
    cloth: book.cloth,
    foil: book.foil,
    height: book.height,
    width: book.width,
  }
}

export { getBook, getBooks, toSpine }
export type { Book, BookSpine }
