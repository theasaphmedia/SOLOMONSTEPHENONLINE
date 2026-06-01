import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UCE-vJlarsrIpRFoZcxVMFfA'
const API_KEY = process.env.YOUTUBE_API_KEY

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  if (!API_KEY) {
    return NextResponse.json({ live: false, videoId: null })
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/search')
    url.searchParams.set('part', 'snippet')
    url.searchParams.set('channelId', CHANNEL_ID)
    url.searchParams.set('eventType', 'live')
    url.searchParams.set('type', 'video')
    url.searchParams.set('maxResults', '1')
    url.searchParams.set('key', API_KEY)

    const res = await fetch(url.toString(), { cache: 'no-store' })
    const data = await res.json()

    if (!res.ok || !data.items?.length) {
      return NextResponse.json({ live: false, videoId: null })
    }

    const item = data.items[0]
    return NextResponse.json({
      live: true,
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails?.high?.url ?? null,
    })
  } catch {
    return NextResponse.json({ live: false, videoId: null })
  }
}
