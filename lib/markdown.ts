import { Marked } from "marked"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

/**
 * Renders trusted, author-written markdown to HTML. A document that uses a
 * top-level "#" gets every heading pushed down a level, so the page title
 * stays the only h1.
 */
function renderMarkdown(markdown: string) {
  const marked = new Marked({ gfm: true })
  const tokens = marked.lexer(markdown)
  const shift = tokens.some(
    (token) => token.type === "heading" && token.depth === 1
  )
    ? 1
    : 0

  marked.use({
    renderer: {
      heading({ tokens: inline, depth, text }) {
        const level = Math.min(depth + shift, 6)

        return `<h${level} id="${slugify(text)}">${this.parser.parseInline(inline)}</h${level}>\n`
      },
      link({ href, title, tokens: inline }) {
        const external = /^https?:\/\//.test(href)
          ? ' target="_blank" rel="noreferrer"'
          : ""
        const titleAttribute = title ? ` title="${escapeHtml(title)}"` : ""

        return `<a href="${escapeHtml(href)}"${titleAttribute}${external}>${this.parser.parseInline(inline)}</a>`
      },
      image({ href, text }) {
        return `<img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" loading="lazy" decoding="async" />`
      },
      code({ text }) {
        return `<pre><code>${escapeHtml(text)}</code></pre>\n`
      },
    },
  })

  return marked.parser(tokens)
}

function countWords(markdown: string) {
  return markdown.split(/\s+/).filter(Boolean).length
}

export { countWords, renderMarkdown }
