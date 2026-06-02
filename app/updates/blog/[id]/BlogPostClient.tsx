'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Post { id: string; title: string; excerpt: string; body: string; cover_url: string; category: string; published_at: string }
interface Comment { id: string; name: string; body: string; created_at: string }

const CAT_COLORS: Record<string, string> = {
  article: '#C9A84C', testimony: '#7CB87C', update: '#7CA8C9', teaching: '#C97C7C',
}

function getFingerprint(): string {
  if (typeof window === 'undefined') return ''
  let fp = localStorage.getItem('ss_fp')
  if (!fp) { fp = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('ss_fp', fp) }
  return fp
}

export default function BlogPostClient({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = useParams<{ id: string }>()
  const id = resolvedParams.id
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Likes
  const [likeCount, setLikeCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [liking, setLiking] = useState(false)

  // Comments
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const commentRef = useRef<HTMLDivElement>(null)

  // Share
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  useEffect(() => {
    if (!id) return
    // Load likes
    fetch(`/api/blog/${id}/likes`).then(r => r.json()).then(d => setLikeCount(d.count || 0)).catch(() => {})
    // Check if this browser liked
    const fp = getFingerprint()
    if (fp) {
      fetch(`/api/blog/${id}/likes/check?fp=${fp}`).then(r => r.json()).then(d => setLiked(d.liked || false)).catch(() => {})
    }
    // Load comments
    fetch(`/api/blog/${id}/comments`).then(r => r.json()).then(d => setComments(Array.isArray(d) ? d : [])).catch(() => {})
  }, [id])

  const handleLike = async () => {
    if (liking) return
    setLiking(true)
    const fp = getFingerprint()
    const res = await fetch(`/api/blog/${id}/likes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ fingerprint: fp }) })
    if (res.ok) {
      const d = await res.json()
      setLikeCount(d.count)
      setLiked(d.liked)
    }
    setLiking(false)
  }

  const handleComment = async () => {
    if (!name.trim() || !body.trim() || submitting) return
    setSubmitting(true)
    const res = await fetch(`/api/blog/${id}/comments`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name.trim(), body: body.trim() }) })
    if (res.ok) {
      const comment = await res.json()
      setComments(prev => [...prev, comment])
      setName(''); setBody(''); setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    }
    setSubmitting(false)
  }

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://solomonstephen.com/updates/blog/${id}`

  const share = {
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${post?.title} — Solomon Stephen\n\n${pageUrl}`)}`, '_blank'),
    twitter: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`"${post?.title}" — Solomon Stephen`)}&url=${encodeURIComponent(pageUrl)}`, '_blank'),
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank'),
    copy: () => { navigator.clipboard.writeText(pageUrl); setCopied(true); setTimeout(() => setCopied(false), 2000) },
  }

  const S = {
    input: { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '3px', padding: '12px 16px', color: '#FAF7F2', fontFamily: "'DM Sans',sans-serif", fontSize: '14px', outline: 'none', boxSizing: 'border-box' as const },
    btn: { background: '#C9A84C', color: '#080E08', border: 'none', borderRadius: '3px', padding: '12px 28px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' as const, cursor: 'pointer' },
    shareBtn: (active?: boolean): React.CSSProperties => ({ display: 'flex', alignItems: 'center', gap: '8px', background: active ? 'rgba(201,168,76,0.18)' : 'rgba(201,168,76,0.08)', border: `1px solid ${active ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.2)'}`, color: '#C9A84C', borderRadius: '3px', padding: '10px 18px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', transition: 'all 0.2s', whiteSpace: 'nowrap' }),
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

        {/* Cover */}
        {post.cover_url && (
          <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(32px,4vw,56px) clamp(24px,5vw,96px) 0' }}>
            <div style={{ position: 'relative', height: 'clamp(240px,40vw,480px)', borderRadius: '4px', overflow: 'hidden' }}>
              <Image src={post.cover_url} alt={post.title} fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        )}

        {/* Body */}
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          {post.body?.includes('<') ? (
            <>
              <style>{`
                .post-body h2{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,2.5vw,30px);font-weight:400;color:#FAF7F2;margin:1.6em 0 0.5em;line-height:1.2;}
                .post-body h3{font-family:'Cormorant Garamond',serif;font-size:clamp(18px,2vw,24px);font-weight:400;color:#FAF7F2;margin:1.4em 0 0.4em;}
                .post-body p{margin:0 0 1.1em;}
                .post-body strong{font-weight:700;color:#FAF7F2;}
                .post-body em{font-style:italic;}
                .post-body u{text-decoration:underline;}
                .post-body blockquote{border-left:3px solid #C9A84C;padding:4px 0 4px 20px;margin:1.4em 0;color:rgba(250,247,242,0.6);font-style:italic;font-family:'Cormorant Garamond',serif;font-size:1.1em;}
                .post-body ul{padding-left:1.6em;margin:0.6em 0 1em;list-style:disc;}
                .post-body ol{padding-left:1.6em;margin:0.6em 0 1em;list-style:decimal;}
                .post-body li{margin:6px 0;}
                .post-body a{color:#C9A84C;text-decoration:underline;}
                .post-body font[size="4"]{font-size:1.2em;}
                .post-body font[size="2"]{font-size:0.88em;}
              `}</style>
              <div className="post-body" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 2.1, color: 'rgba(250,247,242,0.78)' }} dangerouslySetInnerHTML={{ __html: post.body }} />
            </>
          ) : (
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 2.1, color: 'rgba(250,247,242,0.78)', whiteSpace: 'pre-wrap' }}>
              {post.body}
            </div>
          )}

          {/* Divider */}
          <div style={{ margin: 'clamp(48px,6vw,72px) 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <div style={{ width: '6px', height: '6px', background: '#C9A84C', borderRadius: '50%', opacity: 0.5 }} />
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
          </div>

          {/* Like + Share row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>

            {/* Like button */}
            <button onClick={handleLike} disabled={liking} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: liked ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.03)', border: `1px solid ${liked ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '40px', padding: '12px 24px', cursor: 'pointer', transition: 'all 0.25s', color: liked ? '#C9A84C' : 'rgba(250,247,242,0.5)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? '#C9A84C' : 'none'} stroke={liked ? '#C9A84C' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.25s', transform: liking ? 'scale(1.3)' : 'scale(1)' }}>
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 500 }}>
                {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
              </span>
            </button>

            {/* Share buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button onClick={share.whatsapp} style={S.shareBtn()}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </button>
              <button onClick={share.twitter} style={S.shareBtn()}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                X
              </button>
              <button onClick={share.facebook} style={S.shareBtn()}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button onClick={share.copy} style={S.shareBtn(copied)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Comments section */}
          <div ref={commentRef}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', marginBottom: '24px' }}>
              {comments.length} Comment{comments.length !== 1 ? 's' : ''}
            </div>

            {/* Existing comments */}
            {comments.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                {comments.map(c => (
                  <div key={c.id} style={{ borderTop: '1px solid rgba(201,168,76,0.08)', padding: '20px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', fontWeight: 600, color: '#C9A84C' }}>{c.name}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.25)' }}>
                        {new Date(c.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', lineHeight: 1.8, color: 'rgba(250,247,242,0.65)', margin: 0, whiteSpace: 'pre-wrap' }}>{c.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }} />
              </div>
            )}

            {/* Comment form */}
            <div style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px', padding: 'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2vw,26px)', fontWeight: 400, color: '#FAF7F2', marginBottom: '24px' }}>
                Leave a comment
              </div>
              {submitted ? (
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: '#7CB87C', padding: '16px 0' }}>
                  Comment posted. Thank you.
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '14px' }}>
                    <label style={{ display: 'block', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '8px' }}>Your Name</label>
                    <input style={S.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. David Adeyemi" maxLength={60} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '8px' }}>Message</label>
                    <textarea style={{ ...S.input, minHeight: '120px', resize: 'vertical' }} value={body} onChange={e => setBody(e.target.value)} placeholder="Share your thoughts..." maxLength={800}></textarea>
                  </div>
                  <button style={{ ...S.btn, opacity: submitting ? 0.6 : 1 }} onClick={handleComment} disabled={submitting}>
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </>
              )}
            </div>
          </div>

          <div style={{ marginTop: 'clamp(48px,6vw,72px)' }}>
            <Link href="/blog" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', textDecoration: 'none' }}>
              ← More Posts
            </Link>
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}
