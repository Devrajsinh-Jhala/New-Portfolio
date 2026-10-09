// Small text helpers. Kept apart from lib/blog.ts, which reads files and so
// cannot run in the browser.

type PostSummary = {
  slug: string
  title: string
  /** ISO date, e.g. 2024-03-20. */
  date: string
  topic: string
  minutes: number
  /** Where the post first appeared, if not here. */
  original?: string
  /** Posts whose text has not been brought over yet link out to the original. */
  href: string
  external: boolean
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

function formatDate(date: string, style: "day" | "month" | "full" = "full") {
  const [year, month, day] = date.split("-")
  const name = months[Number(month) - 1] ?? ""

  if (style === "day") {
    return `${Number(day)} ${name}`
  }

  return style === "month"
    ? `${name} ${year}`
    : `${Number(day)} ${name} ${year}`
}

const words = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
]

/** Small counts read better as words: 4 becomes "four". */
function countWord(count: number, capital = false) {
  const word = words[count] ?? String(count)

  return capital ? word[0].toUpperCase() + word.slice(1) : word
}

export { countWord, formatDate }
export type { PostSummary }
