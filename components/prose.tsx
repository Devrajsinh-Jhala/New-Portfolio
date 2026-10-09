import { renderMarkdown } from "@/lib/markdown"

/** Long-form text written in markdown: posts, book notes, project write-ups. */
function Prose({ markdown }: { markdown: string }) {
  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: renderMarkdown(markdown) }}
    />
  )
}

export { Prose }
