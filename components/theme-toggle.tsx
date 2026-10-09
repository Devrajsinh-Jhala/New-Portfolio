"use client"

import { useThemeSwitch } from "@/components/theme-provider"

function ThemeToggle() {
  const switchTheme = useThemeSwitch()

  return (
    <button
      type="button"
      className="tbtn"
      data-theme-toggle
      aria-label="Switch between light and dark"
      title="Light or dark (press D)"
      onClick={(event) => switchTheme(event.currentTarget)}
    >
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <circle
          cx="8"
          cy="8"
          r="6.25"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5Z" fill="currentColor" />
      </svg>
    </button>
  )
}

export { ThemeToggle }
