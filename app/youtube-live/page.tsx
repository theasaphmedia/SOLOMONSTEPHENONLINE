'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '@/components/usePageReveal'

interface ArchiveVideo {
  id: string
  title: string
  description: string
  date: string
  thumbnail: string
  category: 'MDWE' | 'TSH' | 'Synantesis' | 'Other'
}

interface MonthGroup {
  label: string
  videos: ArchiveVideo[]
}

const TABS = [
  { key: 'MDWE',       label: 'MDWE',                  full: 'Mid Day Worship Experience' },
  { key: 'Synantesis', label: 'Synantesis',             full: 'Synantesis'                },
  { key: 'TSH',        label: 'The Slaughter House',    full: 'The Slaughter House'       },
  { key: 'Other',      label: 'Worship Experiences',    full: 'Worship Experiences'       },
]

const MONTHS_PER_PAGE = 3

function groupByMonth(videos: ArchiveVideo[]): MonthGroup[] {
  const map: Record<string, ArchiveVideo[]> = {}
  videos.forEach((v) => {
    // date is like "29 Apr 2026" — extract "Apr 2026"
    const parts = v.date.split(' ')
    const label = parts.length >= 3 ? `${parts[1]} ${parts[2]}` : v.date
    if (!map[label]) map[label] = []
    map[label].push(v)
  })
  // Return most recent first
  return Object.entries(map)
    .map(([label, videos]) => ({ label, videos }))
    .sort((a, b) => {
      const da = new Date(a.label)
      const db = new Date(b.label)
      return db.getTime() - da.getTime()
    })
}

// ── Horizontal swipeable row ────────────────────────────────────────────────
function VideoRow({ videos, activeVideoId, setActiveVideoId }: {
  videos: ArchiveVideo[]
  activeVideoId: string | null
  setActiveVideoId: (id: string | null) => void
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const isDragging = useRef(false)

  return (
    <div
      ref={rowRef}
      style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
        paddingBottom: '8px',
        cursor: 'grab',
        WebkitOverflowScrolling: 'touch',
      }}
      onPointerDown={(e) => {
        isDragging.current = true
        startX.current = e.clientX
        scrollLeft.current = rowRef.current?.scrollLeft ?? 0
        ;(e.currentTarget as HTMLElement).style.cursor = 'grabbing'
      }}
      onPointerMove={(e) => {
        if (!isDragging.current || !rowRef.current) return
        const dx = e.clientX - startX.current
        rowRef.current.scrollLeft = scrollLeft.current - dx
      }}
      onPointerUp={(e) => { isDragging.current = false; (e.currentTarget as HTMLElement).style.cursor = 'grab' }}
      onPointerLeave={(e) => { isDragging.current = false; (e.currentTarget as HTMLElement).style.cursor = 'grab' }}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          activeVideoId={activeVideoId}
          setActiveVideoId={setActiveVideoId}
        />
      ))}
    </div>
  )
}

// ── Video Card ───────────────────────────────────────────────────────────────
function VideoCard({ video, activeVideoId, setActiveVideoId }: {
  video: ArchiveVideo
  activeVideoId: string | null
  setActiveVideoId: (id: string | null) => void
}) {
  const isActive = activeVideoId === video.id

  return (
    <div
      style={{
        scrollSnapAlign: 'start',
        flexShrink: 0,
        width: 'clamp(260px, 32vw, 360px)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(201,168,76,0.12)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'border-color 0.3s, transform 0.3s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.12)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Thumbnail / Embed */}
      <div
        style={{ position: 'relative', paddingTop: '56.25%', cursor: 'pointer', background: '#071007', overflow: 'hidden' }}
        onClick={() => setActiveVideoId(isActive ? null : video.id)}
      >
        {!isActive ? (
          <>
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
            />
            {/* Play button */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(0,0,0,0.7) 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(201,168,76,0.9)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(201,168,76,0.4)',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="#1A2E1A">
                  <path d="M4 2.5l10 5.5-10 5.5V2.5z"/>
                </svg>
              </div>
            </div>
          </>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '16px' }}>
        <div style={{ color: 'rgba(201,168,76,0.7)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>
          {video.date}
        </div>
        <h3 style={{ margin: '0 0 12px', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: 1.4, color: '#fff' }}>
          {video.title.length > 60 ? video.title.slice(0, 60) + '…' : video.title}
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveVideoId(isActive ? null : video.id)}
            style={{
              background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)',
              color: '#fff', padding: '8px 14px', borderRadius: '999px', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', fontSize: '11px', transition: 'all 0.2s',
            }}
          >
            {isActive ? 'Close' : '▶ Watch'}
          </button>
          <Link
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', padding: '8px 14px',
              border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px',
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontFamily: 'Inter, sans-serif', fontSize: '11px', transition: 'all 0.2s',
            }}
          >
            YouTube ↗
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonRow() {
  return (
    <div style={{ display: 'flex', gap: '16px', overflow: 'hidden' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ flexShrink: 0, width: 'clamp(260px,32vw,360px)', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.08)' }}>
          <div style={{ paddingTop: '56.25%', background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.6s ease-in-out infinite', position: 'relative' }} />
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ height: '10px', width: '60px', background: 'rgba(201,168,76,0.12)', borderRadius: '4px', animation: 'pulse 1.6s ease-in-out infinite' }} />
            <div style={{ height: '14px', width: '90%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', animation: 'pulse 1.6s ease-in-out infinite' }} />
            <div style={{ height: '14px', width: '70%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', animation: 'pulse 1.6s ease-in-out infinite' }} />
          </div>
        </div>
      ))}
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function YouTubeLiveArchivePage() {
  const [videos, setVideos] = useState<ArchiveVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('MDWE')
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [monthsShown, setMonthsShown] = useState(MONTHS_PER_PAGE)
  usePageReveal()

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch('/api/youtube-archive')
        if (!res.ok) throw new Error('Failed to load videos')
        const data = await res.json()
        setVideos(data.videos ?? [])
      } catch (err) {
        console.error(err)
        setError('Could not load livestream archive. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  // Reset months shown when tab changes
  useEffect(() => {
    setMonthsShown(MONTHS_PER_PAGE)
    setActiveVideoId(null)
  }, [activeTab])

  const availableTabs = TABS.filter((t) => videos.some((v) => v.category === t.key))

  const currentVideos = videos.filter((v) => v.category === activeTab)
  const monthGroups = groupByMonth(currentVideos)
  const visibleMonths = monthGroups.slice(0, monthsShown)
  const hasMore = monthGroups.length > monthsShown

  return (
    <main style={{ background: '#060e06', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        ::-webkit-scrollbar { display: none; }
        .tab-btn { 
          padding: 10px 20px; border-radius: 999px; border: 1px solid rgba(201,168,76,0.15);
          background: transparent; color: rgba(255,255,255,0.45); cursor: pointer;
          font-family: Inter, sans-serif; font-size: 11px; letter-spacing: 0.15em;
          text-transform: uppercase; transition: all 0.25s ease; white-space: nowrap;
        }
        .tab-btn:hover { color: rgba(255,255,255,0.8); border-color: rgba(201,168,76,0.3); }
        .tab-btn.active {
          background: linear-gradient(135deg,#C9A84C,#a8873a);
          color: #1A2E1A; border-color: transparent; font-weight: 700;
          box-shadow: 0 0 18px rgba(201,168,76,0.35);
        }
        .month-label {
          font-family: 'Cormorant Garamond', serif; font-weight: 400;
          font-size: clamp(22px,3vw,32px); color: #fff; margin: 0 0 16px;
        }
        .month-label span {
          color: rgba(201,168,76,0.5); font-size: 14px; font-family: Inter,sans-serif;
          letter-spacing: 0.1em; margin-left: 12px; font-weight: 400;
        }
      `}</style>

      {/* Hero */}
      <section style={{ padding: 'clamp(120px,12vw,160px) clamp(24px,5vw,80px) clamp(40px,6vw,60px)' }}>
        <div style={{ marginBottom: '14px' }}>
          <span style={{ color: '#C9A84C', fontSize: '11px', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
            YouTube Archive
          </span>
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(36px,5vw,72px)', lineHeight: 1.02, margin: '0 0 16px' }}>
          Past Live Streams
        </h1>
        <p style={{ maxWidth: '600px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontSize: '16px', margin: 0 }}>
          Browse past TWN livestream recordings by gathering. Every session, automatically updated after each stream.
        </p>
      </section>

      {/* Tabs */}
      {!loading && !error && availableTabs.length > 0 && (
        <div style={{ padding: '0 clamp(24px,5vw,80px) 40px' }}>
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
            {availableTabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
                {activeTab !== tab.key && (
                  <span style={{ marginLeft: '6px', opacity: 0.5, fontSize: '10px' }}>
                    {videos.filter((v) => v.category === tab.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Active tab full name */}
          <p style={{ marginTop: '14px', color: 'rgba(201,168,76,0.6)', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            {TABS.find((t) => t.key === activeTab)?.full} · {currentVideos.length} recordings
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ padding: '0 clamp(24px,5vw,80px) 60px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div style={{ height: '28px', width: '120px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '20px', animation: 'pulse 1.6s ease-in-out infinite' }} />
              <SkeletonRow />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div style={{ padding: 'clamp(36px,6vw,80px) clamp(24px,5vw,80px)', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter,sans-serif' }}>
          <p style={{ marginBottom: '18px' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.2)', color: '#fff', padding: '12px 24px', borderRadius: '999px', cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: '12px' }}
          >
            Try again
          </button>
        </div>
      )}

      {/* Month groups */}
      {!loading && !error && (
        <div style={{ padding: '0 clamp(24px,5vw,80px)', display: 'flex', flexDirection: 'column', gap: '52px', paddingBottom: '80px' }}>
          {visibleMonths.length === 0 && (
            <div style={{ padding: '60px 0', textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', fontSize: '13px', letterSpacing: '0.1em' }}>
              No recordings yet for this gathering — check back after the next session.
            </div>
          )}

          {visibleMonths.map((group) => (
            <div key={group.label}>
              {/* Month heading */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '18px', borderBottom: '1px solid rgba(201,168,76,0.08)', paddingBottom: '12px' }}>
                <h2 className="month-label">
                  {group.label}
                  <span>{group.videos.length} {group.videos.length === 1 ? 'video' : 'videos'}</span>
                </h2>
              </div>

              {/* Horizontal swipe row */}
              <VideoRow
                videos={group.videos}
                activeVideoId={activeVideoId}
                setActiveVideoId={setActiveVideoId}
              />
            </div>
          ))}

          {/* Load more */}
          {hasMore && (
            <div style={{ textAlign: 'center', paddingTop: '8px' }}>
              <button
                onClick={() => setMonthsShown((prev) => prev + MONTHS_PER_PAGE)}
                style={{
                  background: 'transparent', border: '1px solid rgba(201,168,76,0.25)',
                  color: 'rgba(201,168,76,0.8)', padding: '14px 36px', borderRadius: '999px',
                  cursor: 'pointer', fontFamily: 'Inter,sans-serif', fontSize: '12px',
                  letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.5)'
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.25)'
                }}
              >
                Load {Math.min(MONTHS_PER_PAGE, monthGroups.length - monthsShown)} more {monthGroups.length - monthsShown === 1 ? 'month' : 'months'}
              </button>
              <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.2)', fontSize: '11px', fontFamily: 'Inter,sans-serif' }}>
                Showing {monthsShown} of {monthGroups.length} months
              </p>
            </div>
          )}
        </div>
      )}

      <Footer />
    </main>
  )
}
