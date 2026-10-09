"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

import { Shared } from "@/components/page"

type AriseItem = {
  slug: string
  title: string
  blurb: string
  registry: string
  version: string
  /** Downloads over the last 30 days. */
  downloads: number
  downloadsAllTime?: number
  install?: string
  docsUrl?: string
  codeUrl?: string
}

/**
 * The open-source packages. The word lights up, then each package rises out
 * of its shadow while its download count runs up.
 */
function Arise({ items }: { items: AriseItem[] }) {
  const [word, setWord] = useState(false)
  const [risen, setRisen] = useState(0)
  const counts = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const timers: ReturnType<typeof setTimeout>[] = []
    let frame = 0

    function countUp(i: number) {
      const element = counts.current[i]
      const end = items[i].downloads
      const start = performance.now()

      if (!element || reduce) {
        return
      }

      function tick(now: number) {
        const t = Math.min(1, Math.max(0, (now - start) / 1100))

        element!.textContent = Math.round(
          end * (1 - Math.pow(1 - t, 3))
        ).toLocaleString("en")

        if (t < 1) {
          frame = requestAnimationFrame(tick)
        }
      }

      tick(start)
    }

    timers.push(setTimeout(() => setWord(true), reduce ? 0 : 250))
    items.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => {
            setRisen(i + 1)
            countUp(i)
          },
          reduce ? 0 : 600 + i * 260
        )
      )
    })

    return () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(frame)
    }
  }, [items])

  return (
    <>
      <p className={word ? "word go" : "word"} aria-hidden="true">
        arise
      </p>
      <div className="arise" data-armed>
        {items.map((item, i) => (
          <article
            key={item.slug}
            className={i < risen ? "shadow risen" : "shadow"}
          >
            <div className="well">
              <div className="rise">
                <h3>
                  <Shared name={`project-${item.slug}`}>
                    <Link href={`/projects/${item.slug}`}>{item.title}</Link>
                  </Shared>
                </h3>
                <p>{item.blurb}</p>
                <span className="mono">
                  {item.registry} · v{item.version} ·{" "}
                  <b
                    ref={(element) => {
                      counts.current[i] = element
                    }}
                  >
                    {item.downloads.toLocaleString("en")}
                  </b>{" "}
                  downloads in 30 days
                  {item.downloadsAllTime
                    ? ` · ${item.downloadsAllTime.toLocaleString("en")} all time`
                    : ""}
                </span>
                {item.install ? (
                  <code className="cmd">{item.install}</code>
                ) : null}
                <div className="links">
                  <Link className="lk" href={`/projects/${item.slug}`}>
                    the write-up →
                  </Link>
                  {item.docsUrl ? (
                    <a
                      className="lk"
                      href={item.docsUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      documentation ↗
                    </a>
                  ) : null}
                  {item.codeUrl ? (
                    <a
                      className="lk"
                      href={item.codeUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      code ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <noscript>
        <style>{`.arise[data-armed] .shadow .rise{transform:none;opacity:1;filter:none}`}</style>
      </noscript>
    </>
  )
}

export { Arise }
export type { AriseItem }
