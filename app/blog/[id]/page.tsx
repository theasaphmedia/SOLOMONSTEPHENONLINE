import { Metadata } from 'next'
import BlogPostClient from '@/app/updates/blog/[id]/BlogPostClient'

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const { sql } = await import('@/lib/db')
    const rows = await sql`SELECT * FROM ss_blog WHERE id = ${id} AND published = true LIMIT 1`
    if (!rows.length) return { title: 'Blog — Solomon Stephen' }
    const post = rows[0]
    const description = post.excerpt || post.body?.slice(0, 155) || 'A blog post by Solomon Stephen.'
    const image = post.cover_url || `https://solomonstephen.com/api/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.category || 'Solomon Stephen')}&category=${encodeURIComponent(post.category || '')}`
    return {
      title: `${post.title} — Solomon Stephen`,
      description,
      openGraph: {
        title: post.title,
        description,
        url: `https://solomonstephen.com/blog/${id}`,
        siteName: 'Solomon Stephen',
        images: [{ url: image, width: 1200, height: 630, alt: post.title }],
        type: 'article',
        publishedTime: post.published_at,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description,
        images: [image],
      },
    }
  } catch {
    return { title: 'Blog — Solomon Stephen' }
  }
}

export default function BlogPostPage({ params }: Props) {
  return <BlogPostClient params={params} />
}
