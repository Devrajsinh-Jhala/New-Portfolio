"use client"

import { useEffect, useRef, useState } from "react"

import { pose } from "@/lib/character"
import type { Track } from "@/lib/lastfm"

/**
 * What I last played, with a button that plays a 30-second clip of it.
 * Stays empty if there is nothing to show.
 */
function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null)
  const [sounding, setSounding] = useState(false)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch("/api/now-playing")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { track: Track | null } | null) => {
        if (!cancelled && data?.track) {
          setTrack(data.track)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
      audio.current?.pause()
    }
  }, [])

  function toggle() {
    if (!track?.previewUrl) {
      return
    }

    // The clip is only fetched once someone asks to hear it.
    if (!audio.current) {
      const player = new Audio(track.previewUrl)

      player.addEventListener("play", () => setSounding(true))
      player.addEventListener("pause", () => setSounding(false))
      player.addEventListener("ended", () => setSounding(false))
      audio.current = player
    }

    if (audio.current.paused) {
      audio.current.play().catch(() => setSounding(false))
      pose("smile", 1600)
    } else {
      audio.current.pause()
    }
  }

  if (!track) {
    return <p className="np" aria-hidden="true" />
  }

  const song = `${track.name}${track.artist ? ` by ${track.artist}` : ""}`
  const link = track.appleUrl || track.url
  const label = (
    <span>
      {track.playing ? "listening to" : "last played"} · <b>{track.name}</b>
      {track.artist ? ` · ${track.artist}` : ""}
    </span>
  )

  return (
    <p className="np">
      {track.previewUrl ? (
        <button
          type="button"
          className="play"
          aria-pressed={sounding}
          aria-label={
            sounding
              ? `Pause the preview of ${song}`
              : `Play a 30-second preview of ${song}`
          }
          title={sounding ? "Pause" : "Play a 30-second preview"}
          onClick={toggle}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {sounding ? (
              <path d="M4.5 3.5h2.5v9H4.5zM9 3.5h2.5v9H9z" />
            ) : (
              <path d="M5.25 3.2v9.6L13 8z" />
            )}
          </svg>
        </button>
      ) : null}
      {track.playing || sounding ? (
        <span className="eq" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      ) : null}
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener"
          title={track.appleUrl ? "Open in Apple Music" : undefined}
        >
          {label}
        </a>
      ) : (
        label
      )}
    </p>
  )
}

export { NowPlaying }
