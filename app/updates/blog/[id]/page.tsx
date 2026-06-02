import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface Props { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { id } = await params
    const res = await fetch(`https://solomonstephen.com/api/blog/${id}`, { next: { revalidate: 3600 } })
    if (!res.ok) return { title: 'Blog — Solomon Stephen' }
    const post = await res.json()
    const description = post.excerpt || post.body?.slice(0, 155) || 'A blog post by Solomon Stephen.'
    const image = post.cover_url || `https://solomonstephen.com/api/og?title=${encodeURIComponent(post.title)}&sub=${encodeURIComponent(post.category || 'Solomon Stephen')}&category=${encodeURIComponent(post.category || '')}`
    return {
      title: `${post.title} — Solomon Stephen`,
      description,
      openGraph: {
        title: post.title,
        description,
        url: `https://solomonstephen.com/updates/blog/${id}`,
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
