'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Footer from '@/components/Footer'

const galleryItems = [
  { src: '/images/gallery-solomon-worship-raise.jpg',     alt: 'Hands raised in worship',         category: 'Ministry',      caption: 'Moments of surrender' },
  { src: '/images/gallery-solomon-worship-intense.jpg',   alt: 'Intense worship moment',           category: 'Ministry',      caption: 'Where glory dwells' },
  { src: '/images/gallery-solomon-kneeling-joy.jpg',      alt: 'Kneeling in joy',                  category: 'Ministry',      caption: 'Joy unspeakable' },
  { src: '/images/gallery-solomon-kneeling-surrender.jpg',alt: 'Kneeling in surrender',            category: 'Ministry',      caption: 'Total surrender' },
  { src: '/images/gallery-solomon-standing-deep.jpg',     alt: 'Standing in deep worship',         category: 'Ministry',      caption: 'Deep calls to deep' },
  { src: '/images/gallery-solomon-profile-bw.jpg',        alt: 'Black and white profile',          category: 'Ministry',      caption: 'The sound of His presence' },
  { src: '/images/gallery-congregation-worship.jpg',      alt: 'Congregation in worship',          category: 'Gatherings',    caption: 'One sound, one voice' },
  { src: '/images/gallery-band-bassist.jpg',              alt: 'Bassist on stage',                 category: 'Studio & Band', caption: 'The low end of glory' },
  { src: '/images/gallery-band-drummer-action.jpg',       alt: 'Drummer in action',                category: 'Studio & Band', caption: 'Rhythms of heaven' },
  { src: '/images/gallery-band-drummer-focus.jpg',        alt: 'Drummer focused',                  category: 'Studio & Band', caption: 'In the zone' },
  { src: '/images/gallery-band-guitarist-seated.jpg',     alt: 'Guitarist seated',                 category: 'Studio & Band', caption: 'Strings of praise' },
  { src: '/images/gallery-band-keys-motif.jpg',           alt: 'Keys player with motif',           category: 'Studio & Band', caption: 'Keys to His presence' },
]

const categories = ['All', 'Ministry', 'Gatherings', 'Studio & Band']

/* ── Lightbox with touch swipe ───────────────────────────────────────── */
function Lightbox({ item, index, total, onClose, onPrev, onNext }: {
  item: typeof galleryItems[0]; index: number; total: number;
  onClose: () => void; onPrev: () => void; onNext: () => void
}) {
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose, onPrev, onNext])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) { diff > 0 ? onNext() : onPrev() }
  }

  return createPortal(
    <div
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'fixed', inset: 0, background: 'rgba(3,7,3,0.97)', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 16px 48px' }}
    >
      {/* Close */}
      <button onClick={onClose} style={{ position: 'fixed', top: 16, right: 16, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.7)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100001, transition: 'all 0.2s' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = '#C9A84C' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.14)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)' }}
      >✕</button>

      {/* Image */}
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={item.src} alt={item.alt} style={{ maxWidth: '90vw', maxHeight: '65vh', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }} />
      </div>

      {/* Caption */}
      <div onClick={(e) => e.stopPropagation()} style={{ textAlign: 'center', marginTop: 20 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 8.5, color: 'rgba(201,168,76,0.65)', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 6 }}>{item.category}</p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginBottom: 8 }}>{item.caption}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.2em' }}>{index + 1} / {total}</p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.15)', marginTop: 6 }}>Swipe or use arrow keys to navigate</p>
      </div>

      {/* Prev/Next */}
      {['prev', 'next'].map((dir) => (
        <button key={dir}
          onClick={(e) => { e.stopPropagation(); dir === 'prev' ? onPrev() : onNext() }}
          style={{ position: 'fixed', [dir === 'prev' ? 'left' : 'right']: 14, top: '50%', transform: 'translateY(-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100001, transition: 'all 0.25s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.12)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.4)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.12)' }}
        >{dir === 'prev' ? '‹' : '›'}</button>
      ))}
    </div>,
    document.body
  )
}

/* ── Masonry item with entrance animation ────────────────────────────── */
function MasonryItem({ item, index, onClick }: { item: typeof galleryItems[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'scale(1)' }, index * 60)
        obs.disconnect()
      }
    }, { threshold: 0.05 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={ref} onClick={onClick}
      style={{ position: 'relative', breakInside: 'avoid', marginBottom: 10, overflow: 'hidden', cursor: 'pointer', opacity: 0, transform: 'scale(0.95)', transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)' }}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        style={{ display: 'block', width: '100%', height: 'auto', transition: 'transform 0.55s cubic-bezier(0.22,1,0.36,1)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
      />
      {/* Hover overlay */}
      <div className="masonry-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,9,10,0.88) 0%, transparent 60%)', opacity: 0, transition: 'opacity 0.35s', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 14 }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 8, color: 'rgba(201,168,76,0.8)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{item.category}</span>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>⊕</span>
        </div>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 14, color: 'rgba(255,255,255,0.85)', fontStyle: 'italic', lineHeight: 1.3 }}>{item.caption}</p>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter(i => i.category === activeCategory)

  const changeFilter = (cat: string) => {
    setVisible(false)
    setTimeout(() => { setActiveCategory(cat); setVisible(true) }, 200)
  }

  return (
    <main style={{ background: '#060e06', minHeight: '100vh', overflowX: 'hidden' }} className="page-enter">

      {/* Hero */}
      <section style={{ minHeight: '52vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingBottom: 80 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 70% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '160px clamp(24px,5vw,80px) 0', width: '100%' }}>
          <p className="section-label animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', display: 'block', marginBottom: 24 }}>Gallery</p>
          <h1 className="font-display animate-fade-up" style={{ fontSize: 'clamp(40px,5.5vw,82px)', fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: 0.92, letterSpacing: '-2px', marginBottom: 6, animationDelay: '0.2s', animationFillMode: 'both' }}>
            Moments of
          </h1>
          <h1 className="font-display text-gradient-gold animate-fade-up" style={{ fontSize: 'clamp(40px,5.5vw,82px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-2px', animationDelay: '0.32s', animationFillMode: 'both' }}>
            His Presence.
          </h1>
          <p className="animate-fade-up" style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.35)', marginTop: 24, lineHeight: 1.7, animationDelay: '0.44s', animationFillMode: 'both' }}>
            A visual record of worship, ministry, and the sacred work of TWN Studios.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) 36px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => changeFilter(cat)}
              style={{ padding: '8px 20px', border: '1px solid', fontFamily: 'Inter, sans-serif', fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s', background: activeCategory === cat ? 'rgba(201,168,76,0.08)' : 'transparent', borderColor: activeCategory === cat ? '#C9A84C' : 'rgba(255,255,255,0.1)', color: activeCategory === cat ? '#C9A84C' : 'rgba(255,255,255,0.35)' }}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry grid */}
      <section style={{ padding: '0 clamp(16px,3vw,40px) 100px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ columns: 3, columnGap: 10, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(8px)', transition: 'opacity 0.22s, transform 0.22s' }}
          className="masonry-responsive"
        >
          <style>{`
            @media (max-width: 768px) { .masonry-responsive { columns: 2 !important; } }
            @media (max-width: 480px) { .masonry-responsive { columns: 1 !important; } }
          `}</style>
          {filtered.map((item, index) => (
            <MasonryItem key={item.src} item={item} index={index} onClick={() => setLightboxIndex(index)} />
          ))}
        </div>

        {/* Instagram CTA */}
        <div style={{ marginTop: 64, padding: 'clamp(28px,4vw,48px) clamp(20px,4vw,56px)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={{ height: 1, width: 40, background: 'rgba(201,168,76,0.4)', marginBottom: 16 }} />
            <p className="font-display" style={{ fontSize: 'clamp(18px,2.5vw,28px)', color: '#fff', fontWeight: 300, marginBottom: 6 }}>More moments on Instagram</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.3)' }}>Follow @thesolomonsteph for daily behind-the-scenes</p>
          </div>
          <a href="https://instagram.com/thesolomonsteph" target="_blank" rel="noopener noreferrer" className="btn-gold-pill" style={{ fontSize: 11, whiteSpace: 'nowrap' }}>
            @thesolomonsteph
          </a>
        </div>
      </section>

      {mounted && lightboxIndex !== null && (
        <Lightbox
          item={filtered[lightboxIndex]}
          index={lightboxIndex}
          total={filtered.length}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)}
          onNext={() => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null)}
        />
      )}

      <Footer />
    </main>
  )
}
