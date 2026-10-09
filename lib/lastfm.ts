import "server-only"

import { findSong } from "@/lib/apple-music"

type Track = {
  name: string
  artist: string
  url: string
  /** True while the track is still playing. */
  playing: boolean
  /** A 30-second clip of the song, when Apple Music has it. */
  previewUrl?: string
  /** The song on Apple Music. */
  appleUrl?: string
}

type RecentTracksResponse = {
  recenttracks?: {
    track?: Array<{
      name?: string
      url?: string
      artist?: { "#text"?: string }
      "@attr"?: { nowplaying?: string }
    }>
  }
}

/**
 * The track I last played, read from Last.fm (my music app scrobbles to it).
 * Needs LASTFM_USERNAME and LASTFM_API_KEY in the environment; without them,
 * or if Last.fm is unreachable, there is simply nothing to show.
 */
async function getLastPlayed(): Promise<Track | null> {
  const username = process.env.LASTFM_USERNAME
  const apiKey = process.env.LASTFM_API_KEY

  if (!username || !apiKey) {
    return null
  }

  const query = new URLSearchParams({
    method: "user.getrecenttracks",
    user: username,
    api_key: apiKey,
    format: "json",
    limit: "1",
  })

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${query}`,
      { next: { revalidate: 30 } }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as RecentTracksResponse
    const track = data.recenttracks?.track?.[0]

    if (!track?.name) {
      return null
    }

    const artist = track.artist?.["#text"] ?? ""
    const song = await findSong(track.name, artist)

    return {
      name: track.name,
      artist,
      url: track.url ?? "",
      playing: track["@attr"]?.nowplaying === "true",
      previewUrl: song?.previewUrl,
      appleUrl: song?.appleUrl,
    }
  } catch {
    return null
  }
}

export { getLastPlayed }
export type { Track }
