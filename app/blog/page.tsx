'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Post { id: string; title: string; excerpt: string; body: string; cover_url: string; category: string; published_at: string }

const CAT_COLORS: Record<string, string> = {
  article: '#C9A84C',
  testimony: '#7CB87C',
  update: '#7CA8C9',
  teaching: '#C97C7C',
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Post | null>(null)

  useEffect(() => {
    fetch('/api/blog').then(r => r.json()).then(data => { setPosts(data); setLoading(false) })
  }, [])

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>

        {/* Hero */}
        <section style={{ paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(60px,8vw,100px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', background: 'linear-gradient(to bottom, #0D1B0D, #080E08)' }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '28px', height: '1px', background: '#C9A84C', display: 'inline-block' }} />
              Solomon Stephen
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(52px,9vw,100px)', fontWeight: 400, lineHeight: 0.92, color: '#FAF7F2', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              Blog &amp;<br /><em style={{ color: '#C9A84C' }}>Writings.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.9, color: 'rgba(250,247,242,0.5)', maxWidth: '480px', margin: 0 }}>
              Thoughts, teachings, testimonies and reflections from the journey of faith.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.2em' }}>
              LOADING...
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.3)', marginBottom: '12px' }}>No posts yet</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.2)' }}>Check back soon.</div>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'clamp(20px,3vw,32px)' }}>
              {posts.map(post => (
                <article
                  key={post.id}
                  onClick={() => setSelected(post)}
                  style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                >
                  {post.cover_url && (
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <Image src={post.cover_url} alt={post.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  {!post.cover_url && (
                    <div style={{ height: '120px', background: 'linear-gradient(135deg, #0D2340 0%, #1A3A1A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '48px', color: 'rgba(201,168,76,0.2)' }}>✍</span>
                    </div>
                  )}
                  <div style={{ padding: '20px 24px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CAT_COLORS[post.category] || '#C9A84C' }}>{post.category}</span>
                      <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.3)' }}>{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 12px', lineHeight: 1.2 }}>{post.title}</h2>
                    {post.excerpt && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(250,247,242,0.45)', margin: '0 0 16px' }}>{post.excerpt}</p>}
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>Read →</div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Post modal */}
        {selected && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,14,8,0.95)', zIndex: 1000, overflowY: 'auto', padding: 'clamp(24px,5vw,64px) clamp(24px,5vw,96px)' }}
            onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}
          >
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(250,247,242,0.5)', borderRadius: '3px', padding: '8px 16px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', marginBottom: '32px' }}>← Back</button>
              {selected.cover_url && (
                <div style={{ position: 'relative', height: 'clamp(200px,35vw,400px)', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
                  <Image src={selected.cover_url} alt={selected.title} fill style={{ objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CAT_COLORS[selected.category] || '#C9A84C', marginBottom: '16px' }}>{selected.category} · {new Date(selected.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 32px', lineHeight: 1.1 }}>{selected.title}</h1>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 2, color: 'rgba(250,247,242,0.7)', whiteSpace: 'pre-wrap' }}>{selected.body}</div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  )
}
