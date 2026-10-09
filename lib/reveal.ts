/**
 * Redraws the page behind a circle that opens from the middle of `origin`.
 * `change` has to update the page before it returns.
 */
function reveal(origin: Element | null, change: () => void) {
  const root = document.documentElement
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (!origin || reduce || typeof document.startViewTransition !== "function") {
    change()
    return
  }

  const rect = origin.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )
  const clear = () => {
    delete root.dataset.vt
  }

  root.dataset.vt = "side"

  const transition = document.startViewTransition(change)

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 750,
          easing: "cubic-bezier(.3,.7,.2,1)",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
    .catch(() => {})
  transition.finished.then(clear, clear)
}

export { reveal }
