// Swaps the backdrop of the portrait sprite sheets for the site's lavender.
//
// The original art (art/sprites/) is drawn on a flat navy. This finds that
// navy, replaces it with a soft tint of the theme's hue, and re-blends the few
// pixels along each edge where the navy shows through hair, skin or clothes.
// Everything else stays exactly as drawn. The result goes to public/sprites/.
//
//   node scripts/tint-portrait.mjs          the site's lavender
//   node scripts/tint-portrait.mjs 150      any other hue, in degrees
import path from "node:path"
import sharp from "sharp"

const sheets = ["character-directions.webp", "character-reactions.webp"]

// The backdrop's new colour: a soft, light tint of the theme's hue.
const tint = toRgb(Number(process.argv[2] ?? 258), 0.66, 0.8)

// How far a pixel's colour may be from the navy and still be plain backdrop,
// as a distance in red, green and blue (each 0–255).
const tolerance = 16

// How many pixels in from the backdrop an edge can reach.
const edge = 3

// An edge pixel is re-blended only if it really is a mix of the picture and
// the navy. It is trusted fully when it is this close to that mix, and not at
// all at twice the distance.
const fit = 24

function toRgb(hue, saturation, lightness) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - chroma / 2
  const [r, g, b] =
    hue < 60
      ? [chroma, x, 0]
      : hue < 120
        ? [x, chroma, 0]
        : hue < 180
          ? [0, chroma, x]
          : hue < 240
            ? [0, x, chroma]
            : hue < 300
              ? [x, 0, chroma]
              : [chroma, 0, x]

  return [r, g, b].map((value) => Math.round((value + m) * 255))
}

/** Clamps to 0–1 and eases both ends. */
function ease(t) {
  const clamped = Math.min(1, Math.max(0, t))

  return clamped * clamped * (3 - 2 * clamped)
}

/**
 * Where one cell sits above another, the drawing tool leaves a one-pixel row
 * that blends the two. Each lower cell's first row is redrawn from the row
 * beneath it.
 */
function mendSeams(data, { width, height, channels }) {
  const row = width * channels

  for (const cell of [1, 2]) {
    const y = Math.round((cell * height) / 3)

    data.copyWithin(y * row, (y + 1) * row, (y + 2) * row)
  }
}

/** The sheet's own navy, read from its top-left corner, which is plain backdrop. */
function backdropOf(data, { width, channels }) {
  const seen = [[], [], []]

  for (let y = 8; y < 88; y++) {
    for (let x = 8; x < 88; x++) {
      const i = (y * width + x) * channels

      seen.forEach((values, c) => values.push(data[i + c]))
    }
  }

  return seen.map((values) => values.sort((a, b) => a - b)[values.length >> 1])
}

/** Marks every pixel that is plain backdrop, ignoring stray specks of navy. */
function findBackdrop(data, { width, height, channels }, navy) {
  const size = width * height
  const close = new Uint8Array(size)

  for (let p = 0; p < size; p++) {
    const i = p * channels
    const distance = Math.hypot(
      data[i] - navy[0],
      data[i + 1] - navy[1],
      data[i + 2] - navy[2]
    )

    close[p] = distance <= tolerance ? 1 : 0
  }

  // A pixel counts only if it, or one right beside it, is surrounded by navy.
  // A lone navy-coloured pixel in the hair is not backdrop.
  const at = (x, y) =>
    x < 0 || y < 0 || x >= width || y >= height ? 1 : close[y * width + x]
  const solid = new Uint8Array(size)
  const backdrop = new Uint8Array(size)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      solid[y * width + x] =
        at(x, y) && at(x - 1, y) && at(x + 1, y) && at(x, y - 1) && at(x, y + 1)
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x

      backdrop[p] =
        close[p] &&
        (solid[p] ||
          (x > 0 && solid[p - 1]) ||
          (x < width - 1 && solid[p + 1]) ||
          (y > 0 && solid[p - width]) ||
          (y < height - 1 && solid[p + width]))
          ? 1
          : 0
    }
  }

  return backdrop
}

/**
 * For every pixel, how far the nearest marked pixel is, counting steps up,
 * down, left and right, and which pixel that is.
 */
function nearest(marked, width, height) {
  const size = width * height
  const distance = new Uint16Array(size).fill(65535)
  const source = new Int32Array(size).fill(-1)

  for (let p = 0; p < size; p++) {
    if (marked[p]) {
      distance[p] = 0
      source[p] = p
    }
  }

  function pull(p, from) {
    if (distance[from] + 1 < distance[p]) {
      distance[p] = distance[from] + 1
      source[p] = source[from]
    }
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const p = y * width + x

      if (x > 0) pull(p, p - 1)
      if (y > 0) pull(p, p - width)
    }
  }

  for (let y = height - 1; y >= 0; y--) {
    for (let x = width - 1; x >= 0; x--) {
      const p = y * width + x

      if (x < width - 1) pull(p, p + 1)
      if (y < height - 1) pull(p, p + width)
    }
  }

  return { distance, source }
}

for (const sheet of sheets) {
  const { data, info } = await sharp(path.join("art", "sprites", sheet))
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info

  mendSeams(data, info)

  const navy = backdropOf(data, info)
  const backdrop = findBackdrop(data, info, navy)
  const fromBackdrop = nearest(backdrop, width, height).distance

  // Pixels deeper than an edge are the picture itself, and are never changed.
  // Each edge pixel is re-blended against the nearest of them.
  const picture = nearest(
    fromBackdrop.map((distance) => (distance > edge ? 1 : 0)),
    width,
    height
  ).source

  for (let p = 0; p < width * height; p++) {
    const i = p * channels

    if (backdrop[p]) {
      tint.forEach((value, c) => (data[i + c] = value))
      continue
    }

    if (fromBackdrop[p] > edge || picture[p] < 0) {
      continue
    }

    // An edge pixel is some share of the picture laid over the navy. Work out
    // that share from where its colour sits between the two.
    const from = picture[p] * channels
    let towards = 0
    let span = 0

    for (let c = 0; c < 3; c++) {
      const reach = data[from + c] - navy[c]

      towards += (data[i + c] - navy[c]) * reach
      span += reach * reach
    }

    // A picture colour this close to the navy says nothing about the share.
    if (span < tolerance * tolerance) {
      continue
    }

    const share = Math.min(1, Math.max(0, towards / span))
    let miss = 0

    for (let c = 0; c < 3; c++) {
      const blend = navy[c] + (data[from + c] - navy[c]) * share

      miss += (data[i + c] - blend) ** 2
    }

    // Swap the navy part of the pixel for the tint, and keep the rest.
    const navyPart = (1 - share) * (1 - ease(Math.sqrt(miss) / fit - 1))

    for (let c = 0; c < 3; c++) {
      data[i + c] = Math.min(
        255,
        Math.max(0, Math.round(data[i + c] + (tint[c] - navy[c]) * navyPart))
      )
    }
  }

  await sharp(data, { raw: info })
    .webp({ quality: 88 })
    .toFile(path.join("public", "sprites", sheet))
  console.log("tinted", sheet, `${width}x${height}`)
}
