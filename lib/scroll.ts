function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

function smooth(value: number) {
  const t = clamp(value)

  return t * t * (3 - 2 * t)
}

/**
 * How far a tall section has been scrolled past the top bar, from 0 to 1.
 * Returns null while the section is not laid out (for example, hidden).
 */
function scrollProgress(section: HTMLElement) {
  const rect = section.getBoundingClientRect()
  const bar =
    document.querySelector(".bar")?.getBoundingClientRect().bottom ?? 0
  const total = rect.height - (window.innerHeight - bar)

  if (!rect.height) {
    return null
  }

  return total <= 0 ? 0 : clamp((bar - rect.top) / total)
}

export { clamp, scrollProgress, smooth }
