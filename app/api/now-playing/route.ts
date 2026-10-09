import { getLastPlayed } from "@/lib/lastfm"

// Last.fm is asked at most once every 30 seconds, however many people visit.
export const revalidate = 30

export async function GET() {
  return Response.json({ track: await getLastPlayed() })
}
