'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'

interface Devotional { id: string; title: string; scripture: string; body: string; published_at: string }

export default function DevotionalsPage() {
  const [items, setItems] = useState<Devotional[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Devotional | null>(null)

  useEffect(() => {
    fetch('/api/devotionals').then(r => r.json()).then(data => { setItems(data); setLoading(false) })
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
              Daily<br /><em style={{ color: '#C9A84C' }}>Devotionals.</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(14px,1.4vw,16px)', lineHeight: 1.9, color: 'rgba(250,247,242,0.5)', maxWidth: '480px', margin: 0 }}>
              Scripture-rooted reflections to anchor your day in the presence of God.
            </p>
          </div>
        </section>

        {/* List */}
        <section style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,96px)' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.3)', letterSpacing: '0.2em' }}>LOADING...</div>
          )}

          {!loading && items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', color: 'rgba(250,247,242,0.3)', marginBottom: '12px' }}>No devotionals yet</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.2)' }}>Check back soon.</div>
            </div>
          )}

          {!loading && items.length > 0 && (
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {items.map((d, i) => (
                <div
                  key={d.id}
                  onClick={() => setSelected(d)}
                  style={{ borderTop: i === 0 ? '1px solid rgba(201,168,76,0.12)' : 'none', borderBottom: '1px solid rgba(201,168,76,0.08)', padding: 'clamp(24px,3vw,36px) 0', display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: '24px 32px', alignItems: 'start', cursor: 'pointer', transition: 'background 0.2s', borderRadius: '2px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.02)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  <div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', color: 'rgba(201,168,76,0.5)', marginBottom: '4px' }}>
                      {new Date(d.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.2)' }}>
                      {new Date(d.published_at).getFullYear()}
                    </div>
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(20px,2.5vw,28px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 8px', lineHeight: 1.2 }}>{d.title}</h2>
                    {d.scripture && (
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(201,168,76,0.55)', marginBottom: '10px' }}>{d.scripture}</div>
                    )}
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', lineHeight: 1.75, color: 'rgba(250,247,242,0.4)', margin: 0 }}>
                      {d.body.slice(0, 120)}{d.body.length > 120 ? '...' : ''}
                    </p>
                  </div>
                  <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '18px', color: 'rgba(201,168,76,0.4)', paddingTop: '4px' }}>→</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Modal */}
        {selected && (
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(8,14,8,0.97)', zIndex: 1000, overflowY: 'auto', padding: 'clamp(24px,5vw,64px) clamp(24px,5vw,96px)' }}
            onClick={e => { if (e.target === e.currentTarget) setSelected(null) }}
          >
            <div style={{ maxWidth: '680px', margin: '0 auto' }}>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(250,247,242,0.5)', borderRadius: '3px', padding: '8px 16px', cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', marginBottom: '40px' }}>← Back</button>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '16px' }}>
                {new Date(selected.published_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 20px', lineHeight: 1.1 }}>{selected.title}</h1>
              {selected.scripture && (
                <div style={{ borderLeft: '2px solid #C9A84C', paddingLeft: '20px', marginBottom: '36px' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', color: 'rgba(250,247,242,0.6)', lineHeight: 1.7 }}>{selected.scripture}</div>
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
