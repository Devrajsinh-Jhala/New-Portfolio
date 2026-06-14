import fs from "node:fs"
import path from "node:path"

type ProjectFrontmatter = {
  title: string
  published: string
  category: string
  summary: string
  liveUrl?: string
  codeUrl?: string
  order: number
  tech: string[]
  features: string[]
}

type Project = ProjectFrontmatter & {
  slug: string
  content: string
}

type ProjectTocItem = {
  id: string
  title: string
  level: number
}

const projectsDirectory = path.join(process.cwd(), "content", "projects")

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function stripQuotes(value: string) {
  return value.replace(/^["']|["']$/g, "")
}

function parseValue(value: string) {
  const cleaned = stripQuotes(value.trim())

  if (/^\d+$/.test(cleaned)) {
    return Number.parseInt(cleaned, 10)
  }

  return cleaned
}

function parseFrontmatter(source: string) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    throw new Error("Project markdown is missing frontmatter")
  }

  const [, frontmatter, content] = match
  const data: Record<string, string | number | string[]> = {}
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
      data[key] = parseValue(rawValue)
      activeArrayKey = null
    }
  }

  return {
    data,
    content: content.trim(),
  }
}

function stringField(
  data: Record<string, string | number | string[]>,
  key: string
) {
  const value = data[key]

  if (typeof value !== "string" || !value) {
    throw new Error(`Project markdown is missing "${key}"`)
  }

  return value
}

function numberField(
  data: Record<string, string | number | string[]>,
  key: string
) {
  const value = data[key]

  if (typeof value !== "number") {
    throw new Error(`Project markdown is missing numeric "${key}"`)
  }

  return value
}

function arrayField(
  data: Record<string, string | number | string[]>,
  key: string
) {
  const value = data[key]

  return Array.isArray(value) ? value : []
}

function optionalStringField(
  data: Record<string, string | number | string[]>,
  key: string
) {
  const value = data[key]

  return typeof value === "string" && value ? value : undefined
}

function getProjectFromDirectory(slug: string): Project {
  const filePath = path.join(projectsDirectory, slug, "index.md")
  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = parseFrontmatter(source)

  return {
    slug,
    title: stringField(data, "title"),
    published: stringField(data, "published"),
    category: stringField(data, "category"),
    summary: stringField(data, "summary"),
    liveUrl: optionalStringField(data, "liveUrl"),
    codeUrl: optionalStringField(data, "codeUrl"),
    order: numberField(data, "order"),
    tech: arrayField(data, "tech"),
    features: arrayField(data, "features"),
    content,
  }
}

function getProjectSlugs() {
  if (!fs.existsSync(projectsDirectory)) {
    return []
  }

  return fs
    .readdirSync(projectsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
}

function getPublishedTime(project: Project) {
  const timestamp = Date.parse(project.published)

  return Number.isNaN(timestamp) ? 0 : timestamp
}

function getProjects() {
  return getProjectSlugs()
    .map((slug) => getProjectFromDirectory(slug))
    .sort((first, second) => {
      const publishedDifference =
        getPublishedTime(second) - getPublishedTime(first)

      return publishedDifference || first.order - second.order
    })
}

function getProject(slug: string) {
  if (!getProjectSlugs().includes(slug)) {
    return null
  }

  return getProjectFromDirectory(slug)
}

function getProjectHeadings(markdown: string): ProjectTocItem[] {
  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const match = line.match(/^(#{2,3})\s+(.+)$/)

      if (!match) {
        return null
      }

      const [, marker, title] = match

      return {
        id: slugify(title),
        title,
        level: marker.length,
      }
    })
    .filter((heading): heading is ProjectTocItem => Boolean(heading))
}

export { getProject, getProjectHeadings, getProjects, slugify }
export type { Project, ProjectTocItem }
