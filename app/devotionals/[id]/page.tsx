import { Metadata } from 'next'
import DevotionalClient from '@/app/updates/devotionals/[id]/page'

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const { sql } = await import('@/lib/db')
    const rows = await sql`SELECT * FROM ss_devotionals WHERE id = ${id} AND published = true LIMIT 1`
    if (!rows.length) return { title: 'Devotionals — Solomon Stephen' }
    const d = rows[0]
    const description = d.scripture || d.body?.slice(0, 155) || 'A devotional by Solomon Stephen.'
    const image = `https://solomonstephen.com/api/og?title=${encodeURIComponent(d.title)}&sub=${encodeURIComponent('Devotional · Solomon Stephen')}`
    return {
      title: `${d.title} — Solomon Stephen`,
      description,
      openGraph: {
        title: d.title,
        description,
        url: `https://solomonstephen.com/devotionals/${id}`,
        siteName: 'Solomon Stephen',
        images: [{ url: image, width: 1200, height: 630, alt: d.title }],
        type: 'article',
        publishedTime: d.published_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: d.title,
        description,
        images: [image],
      },
    }
  } catch {
    return { title: 'Devotionals — Solomon Stephen' }
  }
}

export default function DevotionalPage() {
  return <DevotionalClient />
}
