import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const VISITOR_COUNT_FILE = path.join(
  process.cwd(),
  ".data",
  "visitor-count.json"
)

let countQueue: Promise<unknown> = Promise.resolve()

type VisitorCountPayload = {
  count?: number
}

async function readVisitorCount() {
  try {
    const file = await readFile(VISITOR_COUNT_FILE, "utf8")
    const payload = JSON.parse(file) as VisitorCountPayload
    const count = payload.count ?? 0

    return Number.isFinite(count) && count > 0 ? count : 0
  } catch {
    return 0
  }
}

async function writeVisitorCount(count: number) {
  await mkdir(path.dirname(VISITOR_COUNT_FILE), { recursive: true })
  await writeFile(VISITOR_COUNT_FILE, `${JSON.stringify({ count })}\n`, "utf8")
}

async function incrementVisitorCount() {
  const nextCount = countQueue.then(async () => {
    const currentCount = await readVisitorCount()
    const count = currentCount + 1

    await writeVisitorCount(count)

    return count
  })

  countQueue = nextCount.catch(() => undefined)

  return nextCount
}

export async function POST() {
  const count = await incrementVisitorCount()

  return Response.json({ count })
}
