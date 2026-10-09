"use client"

import { useRef, useState } from "react"

import { profile } from "@/lib/profile"

/**
 * A note to me. There is no server behind it: "Send" hands the text to the
 * visitor's own mail app, already addressed.
 */
function NoteBox() {
  const [note, setNote] = useState("")
  const [copied, setCopied] = useState(false)
  const address = useRef<HTMLSpanElement>(null)
  const empty = !note.trim()
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    "A note from devraj.pro"
  )}&body=${encodeURIComponent(note)}`

  function selectAddress() {
    const selection = window.getSelection()
    const range = document.createRange()

    if (!selection || !address.current) {
      return
    }

    range.selectNodeContents(address.current)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  function copyAddress() {
    const done = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }

    try {
      navigator.clipboard.writeText(profile.email).then(done, selectAddress)
    } catch {
      selectAddress()
    }
  }

  return (
    <div className="notebox">
      <label className="mono" htmlFor="note">
        Your note
      </label>
      <textarea
        id="note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="What are you reading right now?"
      />
      <div className="rowx">
        <a
          className="btn"
          href={empty ? undefined : mailto}
          aria-disabled={empty}
          role={empty ? "link" : undefined}
        >
          Send note
        </a>
        <button type="button" className="btn quiet" onClick={copyAddress}>
          {copied ? "Copied" : "Copy email"}
        </button>
        <span className="sel" ref={address}>
          {profile.email}
        </span>
      </div>
    </div>
  )
}

export { NoteBox }
