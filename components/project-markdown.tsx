import { slugify } from "@/lib/projects"

type MarkdownBlock =
  | {
      type: "heading"
      level: 2 | 3
      text: string
    }
  | {
      type: "paragraph"
      text: string
    }
  | {
      type: "list"
      items: string[]
    }

function parseMarkdown(markdown: string) {
  const blocks: MarkdownBlock[] = []
  const lines = markdown.split(/\r?\n/)
  let paragraph: string[] = []
  let list: string[] = []

  function flushParagraph() {
    if (paragraph.length) {
      blocks.push({
        type: "paragraph",
        text: paragraph.join(" "),
      })
      paragraph = []
    }
  }

  function flushList() {
    if (list.length) {
      blocks.push({
        type: "list",
        items: list,
      })
      list = []
    }
  }

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      flushList()
      continue
    }

    const heading = trimmed.match(/^(#{2,3})\s+(.+)$/)

    if (heading) {
      flushParagraph()
      flushList()
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3,
        text: heading[2],
      })
      continue
    }

    const listItem = trimmed.match(/^-\s+(.+)$/)

    if (listItem) {
      flushParagraph()
      list.push(listItem[1])
      continue
    }

    flushList()
    paragraph.push(trimmed)
  }

  flushParagraph()
  flushList()

  return blocks
}

function ProjectMarkdown({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown)

  return (
    <div className="space-y-7">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const id = slugify(block.text)
          const Heading = block.level === 2 ? "h2" : "h3"

          return (
            <Heading
              key={`${block.text}-${index}`}
              id={id}
              className={
                block.level === 2
                  ? "scroll-mt-24 text-2xl font-semibold tracking-normal text-foreground"
                  : "scroll-mt-24 text-lg font-semibold tracking-normal text-foreground"
              }
            >
              {block.text}
            </Heading>
          )
        }

        if (block.type === "list") {
          return (
            <ul
              key={`list-${index}`}
              className="space-y-2 text-sm leading-7 text-muted-foreground sm:text-base"
            >
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-3 size-1.5 shrink-0 rounded-full bg-foreground/50"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p
            key={`${block.text}-${index}`}
            className="text-sm leading-7 text-pretty text-muted-foreground sm:text-base sm:leading-8"
          >
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export { ProjectMarkdown }
