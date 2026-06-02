'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Post {
  id: string
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
  const share = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    const url = `${window.location.origin}/blog/${post.id}`
    if (navigator.share) { navigator.share({ title: post.title, text: post.excerpt || '', url }) }
    else { navigator.clipboard.writeText(url) }
  }
  return (
    <button onClick={share} style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', color: '#C9A84C', borderRadius: '3px', padding: '6px 12px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '6px' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.18)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)' }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
      Share
    </button>
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
        <section style={{ paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,72px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', background: 'linear-gradient(to bottom, #0D1B0D, #080E08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ maxWidth: '800px' }}>
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
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.2em' }}>LOADING...</div>
          )}
          {!loading && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.25)', marginBottom: '12px' }}>Nothing here yet</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.18)' }}>Blog posts will appear here once published.</div>
            </div>
          )}
          {!loading && posts.length > 0 && (
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'clamp(20px,3vw,32px)' }}>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
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
