'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Post { id: string; title: string; excerpt: string; body: string; cover_url: string; category: string; published_at: string }

const CAT_COLORS: Record<string, string> = {
  article: '#C9A84C', testimony: '#7CB87C', update: '#7CA8C9', teaching: '#C97C7C',
}

function ShareBtn({ label, onClick }: { label: string; onClick: () => void }) {
  const [copied, setCopied] = useState(false)
  return (
    <button onClick={() => { onClick(); if (label === 'Copy Link') { setCopied(true); setTimeout(() => setCopied(false), 2000) } }}
      style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', borderRadius: '3px', padding: '10px 18px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.16)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)' }}
    >
      {label === 'Copy Link' && copied ? 'Copied!' : label}
    </button>
  )
}

export default function BlogPostClient({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = useParams<{ id: string }>()
  const id = resolvedParams.id
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://solomonstephen.com/updates/blog/${id}`

  const share = {
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${post?.title} — Solomon Stephen\n\n${pageUrl}`)}`, '_blank'),
    twitter: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`"${post?.title}" — Solomon Stephen`)}&url=${encodeURIComponent(pageUrl)}`, '_blank'),
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank'),
    copyLink: () => navigator.clipboard.writeText(pageUrl),
  }

  if (loading) return (
    <main style={{ background: '#080E08', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(250,247,242,0.3)' }}>LOADING...</div>
    </main>
  )

  if (notFound || !post) return (
    <main style={{ background: '#080E08', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.3)' }}>Post not found</div>
      <Link href="/updates" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none' }}>← Back to Updates</Link>
    </main>
  )

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>

        {/* Hero bar */}
        <div style={{ background: 'linear-gradient(to bottom, #0D1B0D, #080E08)', paddingTop: 'clamp(100px,12vw,140px)', paddingBottom: 'clamp(40px,5vw,64px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <Link href="/updates" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', textDecoration: 'none', marginBottom: '32px' }}>
            ← Blog
          </Link>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: CAT_COLORS[post.category] || '#C9A84C', marginBottom: '16px' }}>
              {post.category} · {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 20px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {post.title}
            </h1>
            {post.excerpt && (
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,17px)', lineHeight: 1.8, color: 'rgba(250,247,242,0.5)', margin: 0, maxWidth: '600px' }}>
                {post.excerpt}
              </p>
            )}
          </div>
        </div>

        {/* Cover image */}
        {post.cover_url && (
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(32px,4vw,56px) clamp(24px,5vw,96px) 0' }}>
            <div style={{ position: 'relative', height: 'clamp(240px,40vw,480px)', borderRadius: '4px', overflow: 'hidden' }}>
              <Image src={post.cover_url} alt={post.title} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        )}

        {/* Body */}
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 2.1, color: 'rgba(250,247,242,0.78)', whiteSpace: 'pre-wrap' }}>
            {post.body}
          </div>

          {/* Divider */}
          <div style={{ margin: 'clamp(48px,6vw,72px) 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <div style={{ width: '6px', height: '6px', background: '#C9A84C', borderRadius: '50%', opacity: 0.5 }} />
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
          </div>

          {/* Share */}
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', marginBottom: '16px' }}>
              Share this post
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <ShareBtn label="WhatsApp" onClick={share.whatsapp} />
              <ShareBtn label="X / Twitter" onClick={share.twitter} />
              <ShareBtn label="Facebook" onClick={share.facebook} />
              <ShareBtn label="Copy Link" onClick={share.copyLink} />
            </div>
          </div>

          <div style={{ marginTop: 'clamp(48px,6vw,72px)' }}>
            <Link href="/updates" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', textDecoration: 'none' }}>
              ← More Posts
            </Link>
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}
