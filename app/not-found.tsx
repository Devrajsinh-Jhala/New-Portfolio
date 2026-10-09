import type { Metadata } from "next"
import Link from "next/link"

import { Page, PageHead } from "@/components/page"

export const metadata: Metadata = {
  title: "Not found",
}

export default function NotFound() {
  return (
    <Page>
      <PageHead title="404" pose="think">
        This level doesn’t exist. The page may have moved, or the link was
        mistyped.
      </PageHead>
      <section style={{ paddingBottom: "clamp(3rem,8vw,5rem)" }}>
        <Link className="more lk" href="/">
          back to the start →
        </Link>
      </section>
    </Page>
  )
}
