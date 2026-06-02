'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  cover_url: string
  category: string
  published_at: string
}

const CAT_COLORS: Record<string, string> = {
  article: '#C9A84C', testimony: '#7CB87C', update: '#7CA8C9', teaching: '#C97C7C',
}

function ShareButton({ post }: { post: Post }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const toggle = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o) }
  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug || post.id}` : `https://solomonstephen.com/blog/${post.slug || post.id}`
  const text = `"${post.title}" - Solomon Stephen`
  const copyLink = (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => { setCopied(false); setOpen(false) }, 2000) }
  const waUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`
  const twUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const btnStyle = { background: 'none', border: 'none', color: 'rgba(250,247,242,0.7)', cursor: 'pointer', padding: '9px 14px', textAlign: 'left' as const, fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.1em', borderRadius: '3px', transition: 'background 0.15s', display: 'block', width: '100%', whiteSpace: 'nowrap' as const }
  return (
    <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
      <button onClick={toggle} style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', borderRadius: '3px', padding: '6px 12px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.18)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Share
      </button>
      {open && (
        <div style={{ position: 'absolute', bottom: '36px', right: 0, background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px', padding: '6px', zIndex: 20, minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '2px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={e => { e.stopPropagation(); setOpen(false) }} style={{ ...btnStyle, textDecoration: 'none' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.07)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}>WhatsApp</a>
          <a href={twUrl} target="_blank" rel="noopener noreferrer" onClick={e => { e.stopPropagation(); setOpen(false) }} style={{ ...btnStyle, textDecoration: 'none' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.07)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}>X / Twitter</a>
          <a href={fbUrl} target="_blank" rel="noopener noreferrer" onClick={e => { e.stopPropagation(); setOpen(false) }} style={{ ...btnStyle, textDecoration: 'none' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.07)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}>Facebook</a>
          <div style={{ height: '1px', background: 'rgba(201,168,76,0.1)', margin: '2px 0' }} />
          <button onClick={copyLink} style={{ ...btnStyle, color: copied ? '#7CB87C' : 'rgba(250,247,242,0.7)' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.07)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none' }}>{copied ? 'Copied!' : 'Copy Link'}</button>
        </div>
      )}
    </div>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>

        <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,72px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', background: 'linear-gradient(135deg, #0D1B0D 0%, #071407 60%, #0A1A0A 100%)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, pointerEvents: 'none' }} aria-hidden="true">
            <filter id="blog-grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#blog-grain)" />
          </svg>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 'clamp(300px,45vw,600px)', height: 'clamp(300px,45vw,600px)', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 'clamp(200px,35vw,500px)', height: 'clamp(200px,35vw,500px)', background: 'radial-gradient(circle, rgba(13,50,13,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: '-2%', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(180px,28vw,380px)', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.06)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: '-0.04em' }} aria-hidden="true">Blog</div>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true">
            <defs><pattern id="blog-grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M 48 0 L 0 0 0 48" fill="none" stroke="#C9A84C" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '28px', height: '1px', background: '#C9A84C', display: 'inline-block' }} />
              Solomon Stephen
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(52px,9vw,100px)', fontWeight: 400, lineHeight: 0.92, color: '#FAF7F2', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              The<br /><em style={{ color: '#C9A84C' }}>Blog.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.9, color: 'rgba(250,247,242,0.5)', maxWidth: '480px', margin: 0 }}>
              Articles, testimonies, teachings and reflections from Solomon Stephen.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          {loading && <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.2em' }}>LOADING...</div>}
          {!loading && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.25)', marginBottom: '12px' }}>Nothing here yet</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.18)' }}>Blog posts will appear here once published.</div>
            </div>
          )}
          {!loading && posts.length > 0 && (
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'clamp(20px,3vw,32px)' }}>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug || post.id}`} style={{ textDecoration: 'none' }}>
                  <article
                    style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                  >
                    {post.cover_url
                      ? <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}><Image src={post.cover_url} alt={post.title} fill style={{ objectFit: 'cover' }} /></div>
                      : <div style={{ height: '100px', background: 'linear-gradient(135deg,#0D2340,#1A3A1A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', color: 'rgba(201,168,76,0.2)' }}>&#9998;</span></div>
                    }
                    <div style={{ padding: '20px 24px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CAT_COLORS[post.category] || '#C9A84C' }}>{post.category}</span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.3)' }}>{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 10px', lineHeight: 1.2 }}>{post.title}</h2>
                      {post.excerpt && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(250,247,242,0.4)', margin: '0 0 14px' }}>{post.excerpt}</p>}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>Read &rarr;</div>
                        <ShareButton post={post} />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </section>
        <Footer />
      </main>
    </>
  )
}
