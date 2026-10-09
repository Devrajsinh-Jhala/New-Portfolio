type FrontmatterData = Record<string, string | number | string[]>

function stripQuotes(value: string) {
  const doubleQuoted = value.match(/^"([\s\S]*)"$/)

  if (doubleQuoted) {
    return doubleQuoted[1].replace(/\\(["\\])/g, "$1")
  }

  return value.replace(/^'|'$/g, "")
}

/** Reads the `---` block at the top of a markdown file: `key: value` lines and `- item` lists. */
function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    throw new Error("Markdown file is missing frontmatter")
  }

  const [, frontmatter, content] = match
  const data: FrontmatterData = {}
  let activeArrayKey: string | null = null

  for (const line of frontmatter.split(/\r?\n/)) {
    if (!line.trim()) {
      continue
    }

    const arrayItem = line.match(/^\s+-\s+(.*)$/)

    if (arrayItem && activeArrayKey) {
      const currentValue = data[activeArrayKey]

      if (Array.isArray(currentValue)) {
        currentValue.push(stripQuotes(arrayItem[1].trim()))
      }

      continue
    }

    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)

    if (!field) {
      continue
    }

    const [, key, rawValue] = field

    if (!rawValue.trim()) {
      data[key] = []
      activeArrayKey = key
    } else {
      const cleaned = stripQuotes(rawValue.trim())

      data[key] = /^\d+$/.test(cleaned) ? Number.parseInt(cleaned, 10) : cleaned
      activeArrayKey = null
    }
  }

  return { data, content: content.trim() }
}

function text(data: FrontmatterData, key: string) {
  const value = data[key]

  return typeof value === "string" ? value : ""
}

function number(data: FrontmatterData, key: string, fallback: number) {
  const value = data[key]

  return typeof value === "number" ? value : fallback
}

export { number, parseFrontmatter, text }
export type { FrontmatterData }
