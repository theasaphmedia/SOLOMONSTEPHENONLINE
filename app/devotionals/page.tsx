'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface Devotional {
  id: string
  title: string
  scripture: string
  body: string
  published_at: string
}

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/devotionals')
      .then(r => r.json())
      .then(data => { setDevotionals(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>
        <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 'clamp(120px,14vw,180px)', paddingBottom: 'clamp(48px,6vw,72px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', background: 'linear-gradient(135deg, #0D1B0D 0%, #071407 60%, #0A1A0A 100%)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          {/* Grain overlay */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18, pointerEvents: 'none' }} aria-hidden="true">
            <filter id="dev-grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
            <rect width="100%" height="100%" filter="url(#dev-grain)" />
          </svg>
          {/* Radial glow — top right gold */}
          <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: 'clamp(300px,45vw,600px)', height: 'clamp(300px,45vw,600px)', background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* Radial glow — bottom left deep green */}
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 'clamp(200px,35vw,500px)', height: 'clamp(200px,35vw,500px)', background: 'radial-gradient(circle, rgba(13,50,13,0.6) 0%, transparent 70%)', pointerEvents: 'none' }} />
          {/* Ghost cross SVG watermark */}
          <svg viewBox="0 0 200 300" style={{ position: 'absolute', right: '4%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(140px,18vw,260px)', opacity: 0.04, pointerEvents: 'none' }} aria-hidden="true">
            <rect x="85" y="0" width="30" height="300" fill="#C9A84C"/>
            <rect x="0" y="80" width="200" height="30" fill="#C9A84C"/>
          </svg>
          {/* Concentric circle ornament */}
          <svg viewBox="0 0 400 400" style={{ position: 'absolute', right: '-8%', top: '50%', transform: 'translateY(-50%)', width: 'clamp(260px,38vw,520px)', opacity: 0.035, pointerEvents: 'none' }} aria-hidden="true">
            {[180,150,120,90,60,30].map(r => <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#C9A84C" strokeWidth="1"/>)}
          </svg>
          {/* Fine dot grid */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }} aria-hidden="true">
            <defs><pattern id="dev-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#C9A84C"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dev-dots)" />
          </svg>
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '28px', height: '1px', background: '#C9A84C', display: 'inline-block' }} />
              Solomon Stephen
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(52px,9vw,100px)', fontWeight: 400, lineHeight: 0.92, color: '#FAF7F2', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              Devo<br /><em style={{ color: '#C9A84C' }}>tionals.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.9, color: 'rgba(250,247,242,0.5)', maxWidth: '480px', margin: 0 }}>
              Daily scripture reflections and spiritual encouragement for your walk with God.
            </p>
          </div>
        </section>

        <section style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.2em' }}>LOADING...</div>
          )}
          {!loading && devotionals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.25)', marginBottom: '12px' }}>Nothing here yet</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.18)' }}>Devotionals will appear here once published.</div>
            </div>
          )}
          {!loading && devotionals.length > 0 && (
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {devotionals.map((d, i) => (
                <Link key={d.id} href={`/devotionals/${d.id}`} style={{ textDecoration: 'none' }}>
                  <article
                    style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(13,27,13,0.4)', border: '1px solid rgba(201,168,76,0.08)', borderRadius: '3px', padding: 'clamp(20px,2.5vw,28px) clamp(20px,2.5vw,32px)', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s', display: 'grid', gridTemplateColumns: '1fr auto', gap: '16px', alignItems: 'center' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.04)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'transparent' : 'rgba(13,27,13,0.4)' }}
                  >
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '8px' }}>
                        {new Date(d.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 6px', lineHeight: 1.2 }}>{d.title}</h2>
                      {d.scripture && (
                        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '14px', fontStyle: 'italic', color: 'rgba(250,247,242,0.35)', marginTop: '4px' }}>
                          {d.scripture.length > 80 ? d.scripture.slice(0, 80) + '…' : d.scripture}
                        </div>
                      )}
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A84C', whiteSpace: 'nowrap' }}>Read &rarr;</div>
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
