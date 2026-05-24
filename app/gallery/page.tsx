'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const photos = [
  { src: '/images/gallery-solomon-worship-intense.jpg',    alt: 'Solomon Stephen — Worship',          size: 'tall'   },
  { src: '/images/gallery-congregation-worship.jpg',        alt: 'Congregation in worship',            size: 'wide'   },
  { src: '/images/gallery-solomon-worship-raise.jpg',       alt: 'Solomon Stephen — Raised in praise', size: 'square' },
  { src: '/images/gallery-solomon-kneeling-surrender.jpg',  alt: 'Surrender before God',               size: 'tall'   },
  { src: '/images/gallery-solomon-kneeling-joy.jpg',        alt: 'Joy in His presence',                size: 'square' },
  { src: '/images/gallery-band-drummer-action.jpg',         alt: 'Band — Drummer',                     size: 'wide'   },
  { src: '/images/gallery-solomon-standing-deep.jpg',       alt: 'Solomon Stephen — Deep worship',     size: 'square' },
  { src: '/images/gallery-band-bassist.jpg',                alt: 'Band — Bassist',                     size: 'square' },
  { src: '/images/gallery-solomon-profile-bw.jpg',          alt: 'Solomon Stephen — Portrait',         size: 'tall'   },
  { src: '/images/gallery-band-guitarist-seated.jpg',       alt: 'Band — Guitarist',                   size: 'square' },
  { src: '/images/gallery-band-drummer-focus.jpg',          alt: 'Band — Drummer (focus)',              size: 'square' },
  { src: '/images/gallery-band-keys-motif.jpg',             alt: 'Band — Keys',                        size: 'wide'   },
]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))

    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return
      if (e.key === 'Escape')      setLightbox(null)
      if (e.key === 'ArrowRight')  setLightbox(i => i !== null ? (i + 1) % photos.length : null)
      if (e.key === 'ArrowLeft')   setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null)
    }
    window.addEventListener('keydown', onKey)
    return () => { obs.disconnect(); window.removeEventListener('keydown', onKey) }
  }, [lightbox])

  return (
    <main style={{ background: '#060c06', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
        .rv.is-visible{opacity:1;transform:none;}
        .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}

        .wc{display:inline-block;overflow:hidden;}
        .wi{display:inline-block;animation:wi 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wi{from{transform:translateY(110%)}to{transform:translateY(0)}}

        /* Masonry */
        .gallery-masonry { columns:3; column-gap:2px; line-height:0; }
        @media(max-width:860px)  { .gallery-masonry { columns:2; } }
        @media(max-width:520px)  { .gallery-masonry { columns:1; } }

        .g-item { break-inside:avoid; display:block; position:relative; overflow:hidden; margin-bottom:2px; cursor:pointer; }
        .g-item img { display:block; width:100%; height:auto; transition:transform 0.7s cubic-bezier(0.16,1,0.3,1),filter 0.5s; filter:brightness(0.88) saturate(0.8); }
        .g-item:hover img { transform:scale(1.05); filter:brightness(1) saturate(1); }
        .g-overlay { position:absolute; inset:0; background:rgba(6,12,6,0); transition:background 0.5s; display:flex; align-items:flex-end; padding:16px; }
        .g-item:hover .g-overlay { background:rgba(6,12,6,0.3); }
        .g-label { opacity:0; transform:translateY(8px); transition:opacity 0.35s,transform 0.35s; font-family:Inter,sans-serif; font-size:9px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(245,240,232,0.6); }
        .g-item:hover .g-label { opacity:1; transform:none; }

        /* Lightbox */
        .lb-bg { position:fixed; inset:0; background:rgba(4,8,4,0.97); z-index:9999; display:flex; align-items:center; justify-content:center; animation:lbIn 0.3s cubic-bezier(0.16,1,0.3,1); }
        @keyframes lbIn { from{opacity:0} to{opacity:1} }
        .lb-wrap { position:relative; max-width:min(90vw,1100px); max-height:88vh; width:100%; }
        .lb-btn { position:absolute; top:50%; transform:translateY(-50%); width:44px; height:44px; border:1px solid rgba(201,168,76,0.3); background:rgba(6,12,6,0.8); color:rgba(201,168,76,0.8); font-size:18px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:border-color 0.25s,color 0.25s; z-index:10; }
        .lb-btn:hover { border-color:rgba(201,168,76,0.7); color:#C9A84C; }
        .lb-close { position:absolute; top:-52px; right:0; width:36px; height:36px; border:1px solid rgba(201,168,76,0.2); background:transparent; color:rgba(201,168,76,0.6); font-size:16px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.25s; }
        .lb-close:hover { border-color:rgba(201,168,76,0.5); color:#C9A84C; }
      `}</style>

      {/* ════ HERO ════ */}
      <section style={{ padding: 'clamp(24px,4vw,56px)', paddingTop: '160px', paddingBottom: 'clamp(60px,8vw,100px)', background: '#060c06', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
        <div aria-hidden style={{ position: 'absolute', right: '-4vw', top: '50%', transform: 'translateY(-52%)', fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(180px,22vw,380px)', fontWeight: 700, color: 'rgba(201,168,76,0.02)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-8px' }}>LIGHT</div>

        <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '40px' }}>
          <span className="wc"><span className="wi" style={{ animationDelay: '0.05s' }}>Gallery · Moments &amp; Ministry</span></span>
        </p>

        <div style={{ marginBottom: '40px', lineHeight: 0.88 }}>
          <div className="wc" style={{ display: 'block' }}>
            <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,110px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-3px', animationDelay: '0.18s' }}>Moments</span>
          </div>
          <div className="wc" style={{ display: 'block' }}>
            <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,110px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-3px', animationDelay: '0.3s', background: 'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>In His Presence.</span>
          </div>
        </div>

        <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#C9A84C,transparent)', animation: 'wi 0.7s 0.44s both' }} />
      </section>

      {/* ════ MASONRY ════ */}
      <section style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,4vw,56px)', background: '#040a04', borderBottom: '1px solid rgba(201,168,76,0.05)' }}>
        <div className="gallery-masonry rv">
          {photos.map((photo, i) => (
            <div key={photo.src} className="g-item" onClick={() => setLightbox(i)}>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={600}
                height={photo.size === 'tall' ? 900 : photo.size === 'wide' ? 400 : 600}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div className="g-overlay">
                <span className="g-label">{photo.alt}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════ CTA ════ */}
      <section style={{ padding: 'clamp(100px,13vw,180px) clamp(24px,4vw,56px)', background: '#1A2E1A', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 75% at 50% 50%,rgba(201,168,76,0.09) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {(['top-left','top-right','bottom-left','bottom-right'] as const).map(pos => {
          const [v, h] = pos.split('-') as ['top'|'bottom','left'|'right']
          return <div key={pos} style={{ position: 'absolute', [v]: '36px', [h]: '36px', width: '44px', height: '44px', [`border${v[0].toUpperCase()+v.slice(1)}`]: '1px solid rgba(201,168,76,0.14)', [`border${h[0].toUpperCase()+h.slice(1)}`]: '1px solid rgba(201,168,76,0.14)' }} />
        })}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div className="rv" style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>The Worship Nation</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-2.5px', color: '#F5F0E8', marginBottom: '32px' }}>
            Come &amp; Be Part<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, background: 'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>of the Story.</span>
          </h2>
          <div className="rv d2" style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: '32px' }} />
          <p className="rv d2" style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.95, color: 'rgba(245,240,232,0.32)', marginBottom: '52px' }}>
            Join one of the gatherings and encounter God in an atmosphere consecrated for His presence.
          </p>
          <div className="rv d3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events"  className="btn-gold-pill"    style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>See the Events</Link>
            <Link href="/contact" className="btn-outline-pill" style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Get In Touch</Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ════ LIGHTBOX ════ */}
      {lightbox !== null && (
        <div className="lb-bg" onClick={() => setLightbox(null)}>
          <div className="lb-wrap" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLightbox(null)}>✕</button>
            <div style={{ position: 'relative', width: '100%', paddingTop: '66.66%', background: '#040a04' }}>
              <Image
                src={photos[lightbox].src}
                alt={photos[lightbox].alt}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width:1100px) 90vw, 1100px"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', padding: '0 4px' }}>
              <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)' }}>{photos[lightbox].alt}</span>
              <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', color: 'rgba(245,240,232,0.2)' }}>{lightbox + 1} / {photos.length}</span>
            </div>
            <button className="lb-btn" style={{ left: '-60px' }} onClick={() => setLightbox((lightbox - 1 + photos.length) % photos.length)}>←</button>
            <button className="lb-btn" style={{ right: '-60px' }} onClick={() => setLightbox((lightbox + 1) % photos.length)}>→</button>
          </div>
        </div>
      )}
    </main>
  )
}
