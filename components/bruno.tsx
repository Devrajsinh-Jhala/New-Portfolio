"use client"

import { useEffect, useRef } from "react"

/** Each drawing: [sheet, column, row]. */
type Frame = readonly [sheet: number, column: number, row: number]

// Sheet 0 is the side view, sheet 1 the back, front and diagonal runs,
// sheet 2 the rests and tricks that face the visitor.
const sheetPaths = [
  "/sprites/bruno-side.webp",
  "/sprites/bruno-runs.webp",
  "/sprites/bruno-tricks.webp",
]

const frames = {
  sleep: [0, 0, 0],
  lie: [0, 1, 0],
  sit: [0, 2, 0],
  stand: [0, 0, 1],
  walkA: [0, 1, 1],
  walkB: [0, 2, 1],
  runA: [0, 0, 2],
  runB: [0, 1, 2],
  happy: [0, 2, 2],
  upA: [1, 0, 0],
  upB: [1, 1, 0],
  downA: [1, 2, 0],
  downB: [1, 0, 1],
  upSideA: [1, 1, 1],
  upSideB: [1, 2, 1],
  downSideA: [1, 0, 2],
  downSideB: [1, 1, 2],
  sitFront: [1, 2, 2],
  lieFront: [2, 0, 0],
  sleepFront: [2, 1, 0],
  paw: [2, 2, 0],
  happyFront: [2, 0, 1],
  tilt: [2, 1, 1],
  bark: [2, 2, 1],
  bow: [2, 0, 2],
  beg: [2, 1, 2],
  wag: [2, 2, 2],
} as const satisfies Record<string, Frame>

type FrameName = keyof typeof frames

// Every trick uses a drawing that faces the visitor.
const tricks: { frames: FrameName[]; says: string; hop?: boolean }[] = [
  { frames: ["bark", "happyFront"], says: "woof!", hop: true },
  { frames: ["paw"], says: "shake" },
  { frames: ["lieFront"], says: "down" },
  { frames: ["beg"], says: "beg" },
  { frames: ["bow"], says: "play?" },
  { frames: ["tilt"], says: "hm?" },
  { frames: ["wag", "sitFront"], says: "good boy" },
  { frames: ["downA", "downB"], says: "zoomies!" },
]

/**
 * Cuts the dog out of its sheet: clears the pale backdrop by flooding in from
 * the edges of each cell (so pale pixels inside the dog are kept), trims the
 * fringe left where the dog met the backdrop, and removes stray pieces of the
 * neighbouring drawings.
 */
function cutOut(image: HTMLImageElement) {
  const width = image.naturalWidth
  const height = image.naturalHeight
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d", { willReadFrequently: true })

  canvas.width = width
  canvas.height = height

  if (!context) {
    return null
  }

  context.drawImage(image, 0, 0)

  const imageData = context.getImageData(0, 0, width, height)
  const data = imageData.data
  const cellWidth = Math.floor(width / 3)
  const cellHeight = Math.floor(height / 3)
  const isBackdrop = (pixel: number) => {
    const i = pixel * 4

    return (
      data[i + 3] < 16 ||
      (data[i] > 226 && data[i + 1] > 226 && data[i + 2] > 226)
    )
  }

  for (let cellY = 0; cellY < 3; cellY++) {
    for (let cellX = 0; cellX < 3; cellX++) {
      const x0 = cellX * cellWidth
      const y0 = cellY * cellHeight
      const seen = new Uint8Array(cellWidth * cellHeight)
      const stack: number[] = []
      const push = (x: number, y: number) => {
        if (x < 0 || y < 0 || x >= cellWidth || y >= cellHeight) {
          return
        }

        const index = y * cellWidth + x

        if (seen[index]) {
          return
        }

        seen[index] = 1

        if (isBackdrop((y0 + y) * width + x0 + x)) {
          stack.push(index)
        }
      }

      for (let x = 0; x < cellWidth; x++) {
        push(x, 0)
        push(x, cellHeight - 1)
      }

      for (let y = 0; y < cellHeight; y++) {
        push(0, y)
        push(cellWidth - 1, y)
      }

      while (stack.length) {
        const index = stack.pop() as number
        const x = index % cellWidth
        const y = (index - x) / cellWidth

        data[((y0 + y) * width + x0 + x) * 4 + 3] = 0
        push(x + 1, y)
        push(x - 1, y)
        push(x, y + 1)
        push(x, y - 1)
      }
    }
  }

  for (let pass = 0; pass < 2; pass++) {
    const fringe: number[] = []

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const i = (y * width + x) * 4

        if (!data[i + 3] || Math.min(data[i], data[i + 1], data[i + 2]) < 150) {
          continue
        }

        if (
          !data[i - 1] ||
          !data[i + 7] ||
          !data[i - width * 4 + 3] ||
          !data[i + width * 4 + 3]
        ) {
          fringe.push(i)
        }
      }
    }

    for (const i of fringe) {
      data[i + 3] = 0
    }
  }

  // A few drawings reach past their own cell, which leaves a paw or an ear tip
  // in the cell next door. Keep each cell's main shape and anything floating
  // near it (motion lines); drop pieces that hang off the cell's edge, and dust.
  for (let cellY = 0; cellY < 3; cellY++) {
    for (let cellX = 0; cellX < 3; cellX++) {
      const x0 = cellX * cellWidth
      const y0 = cellY * cellHeight
      const alphaAt = (index: number) => {
        const x = index % cellWidth
        const y = (index - x) / cellWidth

        return ((y0 + y) * width + x0 + x) * 4 + 3
      }
      const seen = new Uint8Array(cellWidth * cellHeight)
      const pieces: { pixels: number[]; onEdge: boolean }[] = []

      for (let start = 0; start < seen.length; start++) {
        if (seen[start] || !data[alphaAt(start)]) {
          continue
        }

        const piece = { pixels: [] as number[], onEdge: false }
        const stack = [start]

        seen[start] = 1

        while (stack.length) {
          const index = stack.pop() as number
          const x = index % cellWidth
          const y = (index - x) / cellWidth

          piece.pixels.push(index)

          if (x < 2 || y < 2 || x >= cellWidth - 2 || y >= cellHeight - 2) {
            piece.onEdge = true
          }

          for (const [nx, ny] of [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
          ]) {
            if (nx < 0 || ny < 0 || nx >= cellWidth || ny >= cellHeight) {
              continue
            }

            const next = ny * cellWidth + nx

            if (!seen[next] && data[alphaAt(next)]) {
              seen[next] = 1
              stack.push(next)
            }
          }
        }

        pieces.push(piece)
      }

      const main = pieces.reduce(
        (largest, piece) =>
          piece.pixels.length > largest.pixels.length ? piece : largest,
        pieces[0]
      )

      for (const piece of pieces) {
        if (piece !== main && (piece.onEdge || piece.pixels.length < 12)) {
          for (const index of piece.pixels) {
            data[alphaAt(index)] = 0
          }
        }
      }
    }
  }

  context.putImageData(imageData, 0, 0)

  return { canvas, cellWidth, cellHeight }
}

/**
 * Bruno, my Doberman. He runs after the pointer in eight directions, rests
 * when it rests, and does a trick when clicked.
 */
function Bruno() {
  const dog = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const bubble = useRef<HTMLSpanElement>(null)
  const hit = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dogElement = dog.current
    const canvasElement = canvas.current
    const bubbleElement = bubble.current
    const hitElement = hit.current
    const context = canvasElement?.getContext("2d")

    if (
      !dogElement ||
      !canvasElement ||
      !bubbleElement ||
      !hitElement ||
      !context
    ) {
      return
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
    const sheets: (ReturnType<typeof cutOut> | undefined)[] = []
    let cancelled = false
    let pointerX = -1
    let pointerY = -1
    let x = 8
    let y = 0
    let frame: FrameName = "sleepFront"
    let direction = 1
    let rest = 99
    let wake = 0
    let step = 0
    let gesture: FrameName[] | null = null
    let gestureStep = 0
    let gestureTimer: ReturnType<typeof setTimeout> | undefined
    let trickCount = 0
    let drawn: FrameName | null = null
    // He is drawn smaller on phones, so read his size rather than assume it.
    let box = dogElement.offsetWidth

    function draw(name: FrameName, force = false) {
      const [sheetIndex, column, row] = frames[name]
      const sheet = sheets[sheetIndex]

      if (!sheet || (!force && drawn === name)) {
        return
      }

      drawn = name
      context!.clearRect(0, 0, canvasElement!.width, canvasElement!.height)
      context!.drawImage(
        sheet.canvas,
        column * sheet.cellWidth,
        row * sheet.cellHeight,
        sheet.cellWidth,
        sheet.cellHeight,
        0,
        0,
        canvasElement!.width,
        canvasElement!.height
      )
    }

    function place() {
      dogElement!.style.transform = `translate(${x.toFixed(0)}px,${y.toFixed(0)}px)`
      canvasElement!.style.transform = `scaleX(${direction})`
    }

    // His spot: asleep in a bottom corner. On touch screens, where he cannot
    // follow anything, that is the right-hand one, clear of the text.
    function goHome() {
      box = dogElement!.offsetWidth
      x = finePointer ? 8 : window.innerWidth - box - 8
      y = window.innerHeight - box - 4
      direction = 1
      frame = "sleepFront"
      rest = 99
      draw("sleepFront")
      place()
    }

    function tick() {
      if (gesture) {
        draw(gesture[(gestureStep++ >> 1) % gesture.length])
        place()
        return
      }

      if (reduce || !finePointer || pointerX < 0) {
        if (frame !== "sleepFront" || !y) {
          goHome()
        }

        return
      }

      const over =
        pointerX > x - 6 &&
        pointerX < x + box + 6 &&
        pointerY > y - 6 &&
        pointerY < y + box + 6
      const targetX = Math.max(
        2,
        Math.min(window.innerWidth - box - 2, pointerX + 14)
      )
      const targetY = Math.max(
        2,
        Math.min(window.innerHeight - box - 2, pointerY + 10)
      )
      const dx = targetX - x
      const dy = targetY - y
      const distance = Math.hypot(dx, dy)

      if (over || distance < 40) {
        rest++
        wake = 0
        // Facing the visitor throughout: happy when the pointer is on him, a
        // head tilt and a wag while he waits, then down and asleep.
        frame =
          over && rest < 85
            ? "happyFront"
            : rest < 45
              ? rest > 17 && rest < 24
                ? "tilt"
                : rest > 31 && rest < 38
                  ? "wag"
                  : "sitFront"
              : rest < 85
                ? "lieFront"
                : "sleepFront"
      } else if (frame === "sleepFront" && wake < 5) {
        wake++

        if (wake === 5) {
          frame = "lieFront"
        }
      } else {
        rest = 0
        step++

        const fast = distance > 170
        const stride = Math.min(fast ? 15 : 7, distance)
        const angle = Math.atan2(dy, dx) * 57.3
        const spread = Math.abs(angle)
        const phase = (fast ? step : step >> 1) & 1
        let set: [FrameName, FrameName]

        x += (dx / distance) * stride
        y += (dy / distance) * stride

        if (spread < 22.5 || spread > 157.5) {
          set = fast ? ["runA", "runB"] : ["walkA", "walkB"]
        } else if (spread > 67.5 && spread < 112.5) {
          set = angle < 0 ? ["upA", "upB"] : ["downA", "downB"]
        } else {
          set = angle < 0 ? ["upSideA", "upSideB"] : ["downSideA", "downSideB"]
        }

        if (spread < 67.5) {
          direction = 1
        } else if (spread > 112.5) {
          direction = -1
        }

        frame = set[phase]
      }

      x = Math.max(2, Math.min(window.innerWidth - box - 2, x))
      // Room above him for the speech bubble.
      y = Math.max(28, Math.min(window.innerHeight - box - 2, y))
      draw(frame)
      place()
    }

    function trick(event: MouseEvent) {
      const next = tricks[trickCount++ % tricks.length]

      event.stopPropagation()
      gesture = next.frames
      gestureStep = 0
      rest = 6
      draw(gesture[0])
      bubbleElement!.textContent = next.says
      bubbleElement!.classList.add("on")
      dogElement!.classList.remove("hop")

      if (next.hop) {
        void dogElement!.offsetWidth
        dogElement!.classList.add("hop")
      }

      clearTimeout(gestureTimer)
      gestureTimer = setTimeout(() => {
        gesture = null
        bubbleElement!.classList.remove("on")
        dogElement!.classList.remove("hop")
      }, 1500)
    }

    function onPointerMove(event: PointerEvent) {
      pointerX = event.clientX
      pointerY = event.clientY
    }

    function onResize() {
      box = dogElement!.offsetWidth

      if (frame === "sleepFront") {
        goHome()
      }
    }

    sheetPaths.forEach((path, index) => {
      const image = new Image()

      image.onload = () => {
        if (cancelled) {
          return
        }

        sheets[index] = cutOut(image)
        draw(frame, true)
      }
      image.src = path
    })

    goHome()

    const interval = window.setInterval(tick, 110)

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("resize", onResize)
    hitElement.addEventListener("click", trick)

    return () => {
      cancelled = true
      window.clearInterval(interval)
      clearTimeout(gestureTimer)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", onResize)
      hitElement.removeEventListener("click", trick)
    }
  }, [])

  return (
    <div
      id="bruno"
      ref={dog}
      style={{ transform: "translate(8px, calc(100vh - 88px))" }}
    >
      <span className="woof" ref={bubble} aria-hidden="true" />
      <span className="hopper">
        <canvas ref={canvas} width={168} height={168} aria-hidden="true" />
      </span>
      <button
        type="button"
        id="brunoHit"
        ref={hit}
        aria-label="Bruno the Doberman. Click to say hello."
      />
    </div>
  )
}

export { Bruno }
