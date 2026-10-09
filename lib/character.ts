type PoseName =
  | "smile"
  | "wow"
  | "laugh"
  | "thumbs"
  | "think"
  | "read"
  | "sleep"
  | "wave"

/** A drawing on the sprite sheets: columns 0–2 are the directions sheet, 3–5 the reactions sheet. */
type Cell = readonly [column: number, row: number]

const poses: Record<PoseName, Cell> = {
  smile: [3, 0],
  wow: [5, 0],
  laugh: [3, 1],
  thumbs: [4, 1],
  think: [5, 1],
  read: [3, 2],
  sleep: [4, 2],
  wave: [5, 2],
}

const listeners = new Set<() => void>()
const readers = new Set<string>()
let reaction: Cell | null = null
let reactionTimer: ReturnType<typeof setTimeout> | undefined

function emit() {
  listeners.forEach((listener) => listener())
}

/** Makes the character hold a reaction for a moment, from anywhere on the page. */
function pose(name: PoseName, ms = 1100) {
  reaction = poses[name]
  emit()
  clearTimeout(reactionTimer)
  reactionTimer = setTimeout(() => {
    reaction = null
    emit()
  }, ms)
}

/** A bookcase calls this while it is on screen, so the character picks up a book. */
function setReading(id: string, reading: boolean) {
  const had = readers.has(id)

  if (reading === had) {
    return
  }

  if (reading) {
    readers.add(id)
  } else {
    readers.delete(id)
  }

  emit()
}

function getCharacterState() {
  return { reaction, reading: readers.size > 0 }
}

function subscribe(listener: () => void) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export { getCharacterState, pose, poses, setReading, subscribe }
export type { Cell, PoseName }
