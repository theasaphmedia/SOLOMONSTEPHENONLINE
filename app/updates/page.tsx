'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

type Tab = 'blog' | 'devotionals'

interface Post { id: string; title: string; excerpt: string; body: string; cover_url: string; category: string; published_at: string }
interface Devotional { id: string; title: string; scripture: string; body: string; published_at: string }

const CAT_COLORS: Record<string, string> = {
  article: '#C9A84C', testimony: '#7CB87C', update: '#7CA8C9', teaching: '#C97C7C',
}

function ShareButton({ title, excerpt }: { title: string; excerpt: string }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : 'https://solomonstephen.com/updates'
  const text = `"${title}" — Solomon Stephen`

  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title, text: excerpt || text, url }); return } catch {}
    }
    setOpen(o => !o)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => { setCopied(false); setOpen(false) }, 2000)
  }

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={nativeShare} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', borderRadius: '3px', padding: '8px 18px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'background 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
        Share
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '44px', right: 0, background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px', padding: '8px', zIndex: 10, minWidth: '160px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button onClick={copyLink} style={{ background: 'none', border: 'none', color: copied ? '#7CB87C' : 'rgba(250,247,242,0.7)', cursor: 'pointer', padding: '10px 14px', textAlign: 'left', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', borderRadius: '3px', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
            {copied ? '✓ Copied!' : '🔗 Copy link'}
          </button>
          <a href={tweetUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{ color: 'rgba(250,247,242,0.7)', textDecoration: 'none', padding: '10px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', borderRadius: '3px', transition: 'background 0.2s', display: 'block' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
            𝕏 Share on X
          </a>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} style={{ color: 'rgba(250,247,242,0.7)', textDecoration: 'none', padding: '10px 14px', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', borderRadius: '3px', transition: 'background 0.2s', display: 'block' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
            WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}

export default function UpdatesPage() {
  const [tab, setTab] = useState<Tab>('blog')
  const [posts, setPosts] = useState<Post[]>([])
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Post | Devotional | null>(null)

  useEffect(() => {
    setLoading(true)
    const urls: Record<Tab, string> = { blog: '/api/blog', devotionals: '/api/devotionals' }
    fetch(urls[tab]).then(r => r.json()).then(data => {
      if (tab === 'blog') setPosts(Array.isArray(data) ? data : [])
      else if (tab === 'devotionals') setDevotionals(Array.isArray(data) ? data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [tab])

  const empty = (label: string) => (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.25)', marginBottom: '12px' }}>Nothing here yet</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.18)' }}>{label} will appear here once published.</div>
    </div>
  )

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>

        {/* Hero */}
        <section style={{ paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,72px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', background: 'linear-gradient(to bottom, #0D1B0D, #080E08)' }}>
          <div style={{ maxWidth: '800px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '28px', height: '1px', background: '#C9A84C', display: 'inline-block' }} />
              Solomon Stephen
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(52px,9vw,100px)', fontWeight: 400, lineHeight: 0.92, color: '#FAF7F2', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              Blog &amp;<br /><em style={{ color: '#C9A84C' }}>Updates.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.9, color: 'rgba(250,247,242,0.5)', maxWidth: '480px', margin: 0 }}>
              Articles, devotionals, testimonies and announcements from the ministry.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid rgba(201,168,76,0.1)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', display: 'flex', gap: '4px' }}>
          {(['blog', 'devotionals'] as Tab[]).map(t => (
            <button key={t} onClick={() => { setTab(t); setSelected(null) }} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '14px 24px',
              fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: tab === t ? '#C9A84C' : 'rgba(250,247,242,0.35)',
              borderBottom: tab === t ? '2px solid #C9A84C' : '2px solid transparent',
              marginBottom: '-1px', transition: 'all 0.2s',
            }}>
              {t === 'blog' ? 'Blog' : 'Devotionals'}
            </button>
          ))}
        </div>

        {/* Content */}
        <section style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.2em' }}>LOADING...</div>
          )}

          {/* ── BLOG ── */}
          {!loading && tab === 'blog' && (
            posts.length === 0 ? empty('Blog posts') : (
              <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'clamp(20px,3vw,32px)' }}>
                {posts.map(post => (
                  <Link key={post.id} href={`/updates/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                  <article
                    style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
                  >
                    {post.cover_url
                      ? <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}><Image src={post.cover_url} alt={post.title} fill style={{ objectFit: 'cover' }} /></div>
                      : <div style={{ height: '100px', background: 'linear-gradient(135deg,#0D2340,#1A3A1A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', color: 'rgba(201,168,76,0.2)' }}>✍</span></div>
                    }
                    <div style={{ padding: '20px 24px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CAT_COLORS[post.category] || '#C9A84C' }}>{post.category}</span>
                        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.3)' }}>{new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 10px', lineHeight: 1.2 }}>{post.title}</h2>
                      {post.excerpt && <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(250,247,242,0.4)', margin: '0 0 14px' }}>{post.excerpt}</p>}
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C' }}>Read →</div>
                    </div>
                  </article>
                  </Link>
                ))}
              </div>
            )
          )}

          {/* ── DEVOTIONALS ── */}
          {!loading && tab === 'devotionals' && (
            devotionals.length === 0 ? empty('Devotionals') : (
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {devotionals.map((d, i) => (
                  <Link key={d.id} href={`/updates/devotionals/${d.id}`}
                    style={{ display: 'grid', gridTemplateColumns: '80px 1fr 24px', gap: '24px 28px', alignItems: 'start', textDecoration: 'none', borderTop: i === 0 ? '1px solid rgba(201,168,76,0.12)' : 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', padding: 'clamp(24px,3vw,36px) 8px', cursor: 'pointer', borderRadius: '2px', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.02)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(201,168,76,0.5)', marginBottom: '4px' }}>{new Date(d.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.2)' }}>{new Date(d.published_at).getFullYear()}</div>
                    </div>
                    <div>
                      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 8px', lineHeight: 1.2 }}>{d.title}</h2>
                      {d.scripture && <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(201,168,76,0.55)', marginBottom: '8px' }}>{d.scripture}</div>}
                      <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(250,247,242,0.4)', margin: 0 }}>{d.body.slice(0, 120)}{d.body.length > 120 ? '...' : ''}</p>
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '18px', color: 'rgba(201,168,76,0.4)', paddingTop: '4px' }}>→</div>
                  </Link>
                ))}
              </div>
            )
          )}

          {/* ── ANNOUNCEMENTS ── */}

        </section>

        {/* Blog/Devotional modal */}
        {selected && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(8,14,8,0.97)', zIndex: 1000, overflowY: 'auto', padding: 'clamp(24px,5vw,64px) clamp(24px,5vw,96px)' }}
            onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '12px' }}>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(250,247,242,0.5)', borderRadius: '3px', padding: '8px 16px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '12px' }}>← Back</button>
                <ShareButton title={selected.title} excerpt={'excerpt' in selected ? (selected as Post).excerpt : ('scripture' in selected ? (selected as Devotional).scripture : '')} />
              </div>

              {'cover_url' in selected && selected.cover_url && (
                <div style={{ position: 'relative', height: 'clamp(200px,35vw,400px)', borderRadius: '4px', overflow: 'hidden', marginBottom: '32px' }}>
                  <Image src={selected.cover_url} alt={selected.title} fill style={{ objectFit: 'cover' }} />
                </div>
              )}

              {'category' in selected && (
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: CAT_COLORS[(selected as Post).category] || '#C9A84C', marginBottom: '14px' }}>
                  {(selected as Post).category} · {new Date((selected as Post).published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}

              {'scripture' in selected && (
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '14px' }}>
                  {new Date((selected as Devotional).published_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              )}

              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 28px', lineHeight: 1.1 }}>{selected.title}</h1>

              {'scripture' in selected && (selected as Devotional).scripture && (
                <div style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '20px', marginBottom: '32px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', color: 'rgba(250,247,242,0.6)', lineHeight: 1.7 }}>{(selected as Devotional).scripture}</div>
                </div>
              )}

              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 2.1, color: 'rgba(250,247,242,0.75)', whiteSpace: 'pre-wrap' }}>{selected.body}</div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </>
  )
}
