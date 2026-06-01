'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

interface LiveData {
  live: boolean
  videoId: string | null
  title?: string
}

interface ArchiveVideo {
  id: string
  title: string
  date: string
  thumbnail: string
  category: string
}

const GATHERINGS = [
  { name: 'MDWE', full: 'Mid Day Worship Experience', when: 'Every Wednesday · 12:00 PM', color: '#C9A84C' },
  { name: 'TSH', full: 'The Slaughter House', when: 'Last Saturday before final Sunday', color: '#7CA8C9' },
  { name: 'Synantesis', full: 'The Divine Appointment', when: 'Last Sunday of every month', color: '#7CB87C' },
]

export default function LivePage() {
  const [liveData, setLiveData] = useState<LiveData>({ live: false, videoId: null })
  const [archive, setArchive] = useState<ArchiveVideo[]>([])
  const [loadingLive, setLoadingLive] = useState(true)
  const [loadingArchive, setLoadingArchive] = useState(true)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/live')
      .then(r => r.json())
      .then(data => { setLiveData(data); setLoadingLive(false) })
      .catch(() => setLoadingLive(false))

    fetch('/api/youtube-archive')
      .then(r => r.json())
      .then(data => { setArchive(data.videos ?? []); setLoadingArchive(false) })
      .catch(() => setLoadingArchive(false))
  }, [])

  // Poll for live status every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/api/live').then(r => r.json()).then(setLiveData).catch(() => {})
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const displayVideo = activeVideo ?? liveData.videoId

  return (
    <>
      <main style={{ background: '#080E08', minHeight: '100vh', color: '#FAF7F2' }}>

        {/* Hero */}
        <section style={{ paddingTop: 'clamp(100px,12vw,140px)', paddingBottom: 'clamp(40px,5vw,64px)', paddingLeft: 'clamp(24px,5vw,96px)', paddingRight: 'clamp(24px,5vw,96px)', background: 'linear-gradient(to bottom, #0D1B0D, #080E08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            {liveData.live && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '4px', padding: '6px 14px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#DC2626', display: 'inline-block', animation: 'livePulse 1.5s ease-in-out infinite' }} />
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC2626' }}>Live Now</span>
              </span>
            )}
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '28px', height: '1px', background: '#C9A84C', display: 'inline-block' }} />
              The Worship Nation
            </div>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(40px,7vw,80px)', fontWeight: 400, color: '#FAF7F2', margin: '0 0 16px', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            {liveData.live ? <><em style={{ color: '#DC2626' }}>Live</em> Stream</> : 'Watch <em style={{ color: "#C9A84C" }}>Live</em>'}
            {!liveData.live && <><br /><em style={{ color: '#C9A84C' }}>& Archive</em></>}
          </h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(13px,1.3vw,15px)', color: 'rgba(250,247,242,0.45)', margin: 0, maxWidth: '480px' }}>
            {liveData.live ? `Streaming now — ${liveData.title ?? 'Live Worship'}` : 'Watch past gatherings or tune in when we go live. MDWE, TSH, and Synantesis — all here.'}
          </p>
        </section>

        <style>{`
          @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        `}</style>

        {/* Main player */}
        <section style={{ padding: 'clamp(40px,5vw,72px) clamp(24px,5vw,96px)' }}>
          {loadingLive ? (
            <div style={{ textAlign: 'center', padding: '60px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(250,247,242,0.25)' }}>CHECKING STREAM STATUS...</div>
          ) : liveData.live || displayVideo ? (
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '4px', overflow: 'hidden', background: '#000', boxShadow: liveData.live ? '0 0 60px rgba(220,38,38,0.2)' : '0 0 40px rgba(0,0,0,0.5)', border: liveData.live ? '1px solid rgba(220,38,38,0.3)' : '1px solid rgba(201,168,76,0.1)' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${displayVideo}${liveData.live && !activeVideo ? '?autoplay=1&mute=0' : ''}`}
                  title="Solomon Stephen Live"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            </div>
          ) : (
            /* Offline state */
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '4px', padding: 'clamp(40px,6vw,80px)', textAlign: 'center', marginBottom: '48px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#FAF7F2', marginBottom: '12px' }}>Not currently live</div>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '14px', color: 'rgba(250,247,242,0.4)', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 32px' }}>
                  We stream our gatherings live on this page. Check the schedule below and come back when we go live — or browse the full archive.
                </p>
                <a href="https://www.youtube.com/@thesolomonsteph" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', padding: '12px 28px', textDecoration: 'none', display: 'inline-block', transition: 'border-color 0.2s' }}>
                  Subscribe on YouTube →
                </a>
              </div>

              {/* Gathering schedule */}
              <div style={{ marginBottom: '64px' }}>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '24px' }}>Gathering Schedule</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  {GATHERINGS.map(g => (
                    <div key={g.name} style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.08)', borderRadius: '4px', padding: '28px', borderTop: `2px solid ${g.color}` }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: g.color, marginBottom: '8px' }}>{g.name}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 400, color: '#FAF7F2', marginBottom: '8px' }}>{g.full}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '12px', color: 'rgba(250,247,242,0.35)' }}>{g.when}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Archive */}
        <section style={{ padding: '0 clamp(24px,5vw,96px) clamp(64px,8vw,96px)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '32px', borderBottom: '1px solid rgba(201,168,76,0.1)', paddingBottom: '16px' }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(24px,3vw,36px)', fontWeight: 400, color: '#FAF7F2' }}>Past Gatherings</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.25)' }}>{archive.length} streams</div>
            </div>

            {loadingArchive ? (
              <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(250,247,242,0.25)' }}>LOADING ARCHIVE...</div>
            ) : archive.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.25)' }}>No past streams found.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'clamp(16px,2vw,24px)' }}>
                {archive.map(video => (
                  <div key={video.id} onClick={() => { setActiveVideo(video.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    style={{ background: '#0D1B0D', border: '1px solid rgba(201,168,76,0.08)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.3s, transform 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                  >
                    <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
                      <img src={video.thumbnail} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.3s' }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0'}
                      >
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(201,168,76,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0D1B0D"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: '16px 20px' }}>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '6px' }}>{video.category} · {video.date}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.85)', lineHeight: 1.4 }}>{video.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
