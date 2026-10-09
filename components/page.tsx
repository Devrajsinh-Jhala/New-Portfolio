import { ViewTransition, type ReactNode } from "react"

import { Character } from "@/components/character"
import type { PoseName } from "@/lib/character"

/** Wraps a whole page, so moving between pages fades one out and the next in. */
function Page({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <div>{children}</div>
    </ViewTransition>
  )
}

/**
 * Marks the same thing on two pages (a title in a list and the heading it
 * opens, a book spine and its cover), so it travels between them.
 */
function Shared({ name, children }: { name: string; children: ReactNode }) {
  return (
    <ViewTransition name={name} share="morph" default="none">
      {children}
    </ViewTransition>
  )
}

type PageHeadProps = {
  title: string
  children: ReactNode
  /** The character's reaction on arriving. Leave out for a page without him. */
  pose?: PoseName
}

function PageHead({ title, children, pose }: PageHeadProps) {
  return (
    <header className="phead">
      <div>
        <h1 className="ptitle">{title}</h1>
        <p className="sub">{children}</p>
      </div>
      {pose ? <Character entrance={pose} /> : null}
    </header>
  )
}

export { Page, PageHead, Shared }
