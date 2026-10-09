import "server-only"

type Song = {
  /** Apple's 30-second preview clip. */
  previewUrl: string
  /** The song's page on Apple Music. */
  appleUrl: string
}

type SearchResponse = {
  results?: Array<{
    trackName?: string
    artistName?: string
    previewUrl?: string
    trackViewUrl?: string
  }>
}

// The storefront to search. Mine is India; catalogues differ by country.
const storefront = "in"

/** Lower case, without brackets, punctuation or "feat." credits, so titles can be compared. */
function simplify(value: string) {
  return value
    .toLowerCase()
    .replace(/\(.*?\)|\[.*?\]/g, " ")
    .replace(/\b(feat|ft)\.?\s.*$/, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
}

/**
 * Looks a song up in Apple's public catalogue search, which needs no account
 * or key. Returns nothing unless the title and artist both match, so the play
 * button never plays the wrong song.
 */
async function findSong(name: string, artist: string): Promise<Song | null> {
  const query = new URLSearchParams({
    term: `${name} ${artist}`,
    entity: "song",
    limit: "5",
    country: storefront,
  })

  try {
    const response = await fetch(`https://itunes.apple.com/search?${query}`, {
      next: { revalidate: 86_400 },
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as SearchResponse
    const wantedName = simplify(name)
    const wantedArtist = simplify(artist)
    const match = data.results?.find((result) => {
      const foundArtist = simplify(result.artistName ?? "")

      return (
        result.previewUrl &&
        result.trackViewUrl &&
        simplify(result.trackName ?? "") === wantedName &&
        foundArtist &&
        (foundArtist.includes(wantedArtist) ||
          wantedArtist.includes(foundArtist))
      )
    })

    if (!match?.previewUrl || !match.trackViewUrl) {
      return null
    }

    return { previewUrl: match.previewUrl, appleUrl: match.trackViewUrl }
  } catch {
    return null
  }
}

export { findSong }
export type { Song }
