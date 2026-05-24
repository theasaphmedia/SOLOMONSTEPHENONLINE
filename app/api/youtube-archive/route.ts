import { NextResponse } from 'next/server'

const CHANNEL_ID = 'UCE-vJlarsrIpRFoZcxVMFfA'
const API_KEY = process.env.YOUTUBE_API_KEY
const MAX_RESULTS = 50

function categoriseVideo(title: string): 'MDWE' | 'TSH' | 'Synantesis' | 'Other' {
  const t = title.toLowerCase()
  if (t.includes('mdwe') || t.includes('mid day') || t.includes('midday')) return 'MDWE'
  if (t.includes('slaughter') || t.includes('tsh')) return 'TSH'
  if (t.includes('synantesis') || t.includes('synantisis')) return 'Synantesis'
  return 'Other'
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export interface ArchiveVideo {
  id: string
  title: string
  description: string
  date: string
  thumbnail: string
  category: 'MDWE' | 'TSH' | 'Synantesis' | 'Other'
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  console.log('=== YouTube Archive API called ===')
  console.log('API_KEY present:', !!API_KEY)
  console.log('API_KEY length:', API_KEY?.length)

  if (!API_KEY) {
    console.error('No API key found in environment')
    return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 })
  }

  try {
    const searchUrl = new URL('https://www.googleapis.com/youtube/v3/search')
    searchUrl.searchParams.set('part', 'snippet')
    searchUrl.searchParams.set('channelId', CHANNEL_ID)
    searchUrl.searchParams.set('eventType', 'completed')
    searchUrl.searchParams.set('type', 'video')
    searchUrl.searchParams.set('order', 'date')
    searchUrl.searchParams.set('maxResults', String(MAX_RESULTS))
    searchUrl.searchParams.set('key', API_KEY)

    console.log('Calling YouTube API...')
    const res = await fetch(searchUrl.toString(), { cache: 'no-store' })
    console.log('YouTube response status:', res.status)

    const data = await res.json()

    if (!res.ok) {
      console.error('YouTube API error:', JSON.stringify(data))
      return NextResponse.json({ error: 'Failed to fetch from YouTube', details: data }, { status: 502 })
    }

    console.log('Items returned:', data.items?.length ?? 0)
    const items = data.items ?? []

    const videos: ArchiveVideo[] = items
      .map((item: any) => {
        const title: string = item.snippet?.title ?? 'Untitled'
        return {
          id: item.id?.videoId ?? '',
          title,
          description: item.snippet?.description ?? '',
          date: formatDate(item.snippet?.publishedAt ?? ''),
          thumbnail:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.medium?.url ??
            `https://img.youtube.com/vi/${item.id?.videoId}/hqdefault.jpg`,
          category: categoriseVideo(title),
        }
      })
      .filter((v: ArchiveVideo) => v.id !== '')

    console.log('Videos after filter:', videos.length)
    return NextResponse.json({ videos })
  } catch (err) {
    console.error('YouTube archive fetch error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}