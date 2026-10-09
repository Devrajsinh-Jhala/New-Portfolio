"use client"

import * as React from "react"
import { flushSync } from "react-dom"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

import { reveal } from "@/lib/reveal"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

/** Flips between light and dark, opening the new theme from `origin`. */
function useThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()

  return React.useCallback(
    (origin: Element | null) => {
      const next = resolvedTheme === "dark" ? "light" : "dark"

      reveal(origin, () => {
        flushSync(() => setTheme(next))
      })
    },
    [resolvedTheme, setTheme]
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const switchTheme = useThemeSwitch()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      switchTheme(document.querySelector("[data-theme-toggle]"))
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [switchTheme])

  return null
}

export { ThemeProvider, useThemeSwitch }
