'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Devotional {
  id: string
  title: string
  scripture: string
  body: string
  published_at: string
}

function ShareButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  const [copied, setCopied] = useState(false)
  const handleClick = () => {
    onClick()
    if (label === 'Copy Link') {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  return (
    <button onClick={handleClick} style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
      color: '#C9A84C', borderRadius: '3px', padding: '10px 18px', cursor: 'pointer',
      fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em',
      textTransform: 'uppercase', transition: 'background 0.2s, border-color 0.2s',
      whiteSpace: 'nowrap',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.16)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.2)' }}
    >
      {icon}
      {label === 'Copy Link' && copied ? 'Copied!' : label}
    </button>
  )
}

export default function DevotionalPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [devotional, setDevotional] = useState<Devotional | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch(`/api/devotionals/${id}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(data => { setDevotional(data); setLoading(false) })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  const pageUrl = typeof window !== 'undefined' ? window.location.href : `https://solomonstephen.com/updates/devotionals/${id}`

  const share = {
    whatsapp: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${devotional?.title} — A devotional by Solomon Stephen\n\n${pageUrl}`)}`, '_blank'),
    twitter: () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(`"${devotional?.title}" — A devotional by Solomon Stephen`)}&url=${encodeURIComponent(pageUrl)}`, '_blank'),
    facebook: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank'),
    instagram: () => { navigator.clipboard.writeText(pageUrl); alert('Link copied! Paste it in your Instagram story or bio.') },
    copyLink: () => navigator.clipboard.writeText(pageUrl),
  }

  if (loading) return (
    <main style={{ background: '#080E08', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(250,247,242,0.3)' }}>LOADING...</div>
    </main>
  )

  if (notFound || !devotional) return (
    <main style={{ background: '#080E08', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.3)' }}>Devotional not found</div>
      <Link href="/updates" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none' }}>← Back to Updates</Link>
    </main>
  )

  const dateStr = new Date(devotional.published_at).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>

        {/* Hero bar */}
        <div style={{ background: 'linear-gradient(to bottom, #0D1B0D, #080E08)', paddingTop: 'clamp(100px,12vw,140px)', paddingBottom: 'clamp(40px,5vw,64px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <Link href="/devotionals" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)', textDecoration: 'none', marginBottom: '32px' }}>
            ← Devotionals
          </Link>

          <div style={{ maxWidth: '720px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '16px' }}>
              {dateStr}
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(36px,6vw,64px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 24px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
              {devotional.title}
            </h1>

            {devotional.scripture && (
              <div style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '20px', marginBottom: '32px' }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', color: 'rgba(250,247,242,0.6)', lineHeight: 1.7 }}>
                  {devotional.scripture}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(15px,1.5vw,17px)', lineHeight: 2, color: 'rgba(250,247,242,0.78)', whiteSpace: 'pre-wrap' }}>
            {devotional.body}
          </div>

          {/* Divider */}
          <div style={{ margin: 'clamp(48px,6vw,72px) 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
            <div style={{ width: '6px', height: '6px', background: '#C9A84C', borderRadius: '50%', opacity: 0.5 }} />
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }} />
          </div>

          {/* Share section */}
          <div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', marginBottom: '16px' }}>
              Share this devotional
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <ShareButton
                label="WhatsApp"
                onClick={share.whatsapp}
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                }
              />
              <ShareButton
                label="X / Twitter"
                onClick={share.twitter}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                }
              />
              <ShareButton
                label="Facebook"
                onClick={share.facebook}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }
              />
              <ShareButton
                label="Instagram"
                onClick={share.instagram}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                }
              />
              <ShareButton
                label="Copy Link"
                onClick={share.copyLink}
                icon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                  </svg>
                }
              />
            </div>
          </div>

          {/* Back link */}
          <div style={{ marginTop: 'clamp(48px,6vw,72px)' }}>
            <Link href="/devotionals" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.35)', textDecoration: 'none' }}>
              ← More Devotionals
            </Link>
          </div>
        </article>

        <Footer />
      </main>
    </>
  )
}
