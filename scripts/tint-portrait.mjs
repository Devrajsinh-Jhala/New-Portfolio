// Recolours the portrait sprite sheets to match the site's theme.
//
// The original art (art/sprites/) has a navy backdrop and blue rim light. This
// turns only those blues towards the theme's hue and leaves skin, hair and
// clothing as drawn, then writes the result to public/sprites/.
//
//   node scripts/tint-portrait.mjs          the site's violet
//   node scripts/tint-portrait.mjs 150      any other hue, in degrees
import path from "node:path"
import sharp from "sharp"

const sheets = ["character-directions.webp", "character-reactions.webp"]
const backdropHue = Number(process.argv[2] ?? 258)

// Where the art's blues go: the navy backdrop (about 213°) lands on the theme
// hue and the brighter rim light a little past it. Hues outside 170°–300° are
// untouched, and the map never folds back on itself, so there are no seams.
const stops = [
  [170, 170],
  [213, backdropHue],
  [250, backdropHue + 27],
  [300, Math.max(300, backdropHue + 42)],
]

function shiftHue(hue) {
  for (let i = 1; i < stops.length; i++) {
    const [from, to] = [stops[i - 1], stops[i]]

    if (hue >= from[0] && hue <= to[0]) {
      const t = (hue - from[0]) / (to[0] - from[0])

      return (from[1] + (to[1] - from[1]) * t) % 360
    }
  }

  return hue
}

function toHsl(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const lightness = (max + min) / 2
  const spread = max - min

  if (!spread) {
    return [0, 0, lightness]
  }

  const saturation = spread / (1 - Math.abs(2 * lightness - 1))
  let hue

  if (max === r) {
    hue = ((g - b) / spread) % 6
  } else if (max === g) {
    hue = (b - r) / spread + 2
  } else {
    hue = (r - g) / spread + 4
  }

  return [(hue * 60 + 360) % 360, saturation, lightness]
}

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

  return [r + m, g + m, b + m]
}

for (const sheet of sheets) {
  const { data, info } = await sharp(path.join("art", "sprites", sheet))
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += info.channels) {
    const [hue, saturation, lightness] = toHsl(
      data[i] / 255,
      data[i + 1] / 255,
      data[i + 2] / 255
    )
    const shifted = shiftHue(hue)

    if (shifted !== hue) {
      const [r, g, b] = toRgb(shifted, saturation, lightness)

      data[i] = Math.round(r * 255)
      data[i + 1] = Math.round(g * 255)
      data[i + 2] = Math.round(b * 255)
    }
  }

  await sharp(data, { raw: info })
    .webp({ quality: 88 })
    .toFile(path.join("public", "sprites", sheet))
  console.log("tinted", sheet, `${info.width}x${info.height}`)
}
