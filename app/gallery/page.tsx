'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

const photos = [
  { src: '/images/gallery-solomon-profile-bw.jpg',      alt: 'Solomon Stephen — profile',        cat: 'Portrait',  span: 'col' },
  { src: '/images/gallery-solomon-standing-deep.jpg',   alt: 'Solomon in deep worship',          cat: 'Worship',   span: 'row' },
  { src: '/images/gallery-solomon-worship-intense.jpg', alt: 'Intense worship moment',           cat: 'Worship',   span: '' },
  { src: '/images/gallery-solomon-worship-raise.jpg',   alt: 'Hands raised in worship',          cat: 'Worship',   span: '' },
  { src: '/images/gallery-solomon-kneeling-joy.jpg',    alt: 'Kneeling in joy',                  cat: 'Devotional', span: '' },
  { src: '/images/gallery-solomon-kneeling-surrender.jpg', alt: 'Surrender',                    cat: 'Devotional', span: '' },
  { src: '/images/gallery-congregation-worship.jpg',    alt: 'Congregation in worship',          cat: 'Gathering',  span: 'wide' },
  { src: '/images/gallery-band-bassist.jpg',            alt: 'TWN band — bassist',               cat: 'Band',       span: '' },
  { src: '/images/gallery-band-drummer-action.jpg',     alt: 'Drummer in action',               cat: 'Band',       span: '' },
  { src: '/images/gallery-band-drummer-focus.jpg',      alt: 'Drummer focused',                 cat: 'Band',       span: '' },
  { src: '/images/gallery-band-guitarist-seated.jpg',   alt: 'Guitarist seated',                cat: 'Band',       span: '' },
  { src: '/images/gallery-band-keys-motif.jpg',         alt: 'Keys motif',                       cat: 'Band',       span: '' },
]

const cats = ['All', 'Portrait', 'Worship', 'Devotional', 'Gathering', 'Band']

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Set<number>>(new Set())

  const filtered = filter === 'All' ? photos : photos.filter(p => p.cat === filter)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -32px 0px' }
    )
    document.querySelectorAll('.rv, .rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [filter])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightbox === null) return
    if (e.key === 'Escape') setLightbox(null)
    if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % filtered.length : null)
    if (e.key === 'ArrowLeft')  setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  }, [lightbox, filtered.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv { opacity:0; transform:translateY(28px); transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv-scale { opacity:0; transform:scale(0.96); transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .rv-scale.is-visible { opacity:1; transform:none; }
        .d1{transition-delay:.06s} .d2{transition-delay:.12s} .d3{transition-delay:.18s} .d4{transition-delay:.24s} .d5{transition-delay:.30s} .d6{transition-delay:.36s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .photo-item { overflow:hidden; border-radius:2px; cursor:pointer; position:relative; aspect-ratio:1; }
        .photo-item img { transition:transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .photo-item:hover img { transform:scale(1.06); }
        .photo-overlay { position:absolute; inset:0; background:rgba(13,27,13,0); transition:background 0.4s; display:flex; align-items:flex-end; padding:20px; }
        .photo-item:hover .photo-overlay { background:rgba(13,27,13,0.4); }
        .photo-overlay-text { opacity:0; transform:translateY(8px); transition:opacity 0.4s, transform 0.4s; font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.12em; color:rgba(250,247,242,0.9); text-transform:uppercase; }
        .photo-item:hover .photo-overlay-text { opacity:1; transform:none; }
        .filter-btn { padding:8px 18px; border:1px solid rgba(201,168,76,0.2); background:transparent; font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:all 0.3s; color:#3D4B3D; }
        .filter-btn:hover { border-color:#C9A84C; color:#C9A84C; }
        .filter-btn.active { border-color:#C9A84C; background:rgba(201,168,76,0.08); color:#C9A84C; }
        .lightbox-bg { position:fixed; inset:0; background:rgba(13,27,13,0.96); z-index:2000; display:flex; align-items:center; justify-content:center; }
        .lightbox-img { max-width:90vw; max-height:90vh; object-fit:contain; }
      `}</style>

      {/* ── Hero — Full-bleed photo mosaic, no text section ── */}
      <section style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gridTemplateRows:'56vh 44vh', gap:'3px', background:'#0A0A0A', paddingTop:'80px' }}>
        {/* Top-left: large portrait */}
        <div style={{ gridColumn:'1', gridRow:'1', position:'relative', overflow:'hidden' }}>
          <Image src="/images/gallery-solomon-worship-intense.jpg" alt="" fill style={{ objectFit:'cover', objectPosition:'center top', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='none' }} />
        </div>
        {/* Top-center: with title overlay */}
        <div style={{ gridColumn:'2', gridRow:'1', position:'relative', overflow:'hidden', background:'#0A0A0A', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(24px,3vw,40px)' }}>
          <div>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(201,168,76,.4)', marginBottom:'20px' }}>Gallery</div>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(40px,6vw,80px)', fontWeight:400, lineHeight:.9, color:'#fff', margin:'0 0 16px', letterSpacing:'-.02em' }}>
              Moments<br /><em style={{ color:'#C9A84C' }}>Captured.</em>
            </h1>
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', lineHeight:1.8, color:'rgba(255,255,255,.3)', margin:0 }}>
              Worship. Ministry. Music.
            </p>
          </div>
        </div>
        {/* Top-right: congregation */}
        <div style={{ gridColumn:'3', gridRow:'1', position:'relative', overflow:'hidden' }}>
          <Image src="/images/gallery-congregation-worship.jpg" alt="" fill style={{ objectFit:'cover', objectPosition:'center', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='none' }} />
        </div>
        {/* Bottom-left: kneeling */}
        <div style={{ gridColumn:'1', gridRow:'2', position:'relative', overflow:'hidden' }}>
          <Image src="/images/gallery-solomon-kneeling-joy.jpg" alt="" fill style={{ objectFit:'cover', objectPosition:'center 30%', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='none' }} />
        </div>
        {/* Bottom-center: band */}
        <div style={{ gridColumn:'2', gridRow:'2', position:'relative', overflow:'hidden' }}>
          <Image src="/images/gallery-band-drummer-action.jpg" alt="" fill style={{ objectFit:'cover', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='none' }} />
        </div>
        {/* Bottom-right: profile */}
        <div style={{ gridColumn:'3', gridRow:'2', position:'relative', overflow:'hidden' }}>
          <Image src="/images/gallery-solomon-profile-bw.jpg" alt="" fill style={{ objectFit:'cover', objectPosition:'center top', transition:'transform 1.2s cubic-bezier(.16,1,.3,1)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.05)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='none' }} />
        </div>
        <style>{`@media(max-width:700px){section:first-of-type{grid-template-columns:1fr 1fr!important;grid-template-rows:repeat(3,40vw)!important}}`}</style>
      </section>

      {/* ── Gallery ── */}
      <section style={{ padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1300px', margin:'0 auto' }}>
          <h2 className="rv" style={{ fontFamily:'Cormorant Garamond,sans-serif', fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1, margin:'0 0 clamp(24px,3vw,40px)' }}>The full <em style={{ color:'#C9A84C' }}>gallery.</em></h2>

          {/* Filter bar */}
          <div className="rv d1" style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'clamp(40px,5vw,64px)' }}>
            {cats.map(c => (
              <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>

          {/* Masonry grid */}
          <div style={{ columns:'clamp(2, 3, 4)', columnCount: typeof window !== 'undefined' && window.innerWidth > 900 ? 3 : typeof window !== 'undefined' && window.innerWidth > 600 ? 2 : 1, gap:'clamp(12px,2vw,20px)' }}>
            {filtered.map((photo, i) => (
              <div key={`${photo.src}-${filter}`} className={`photo-item rv-scale`} style={{ transitionDelay:`${i * 0.04}s`, display:'block', marginBottom:'clamp(12px,2vw,20px)', breakInside:'avoid', aspectRatio:'auto' }}
                onClick={() => setLightbox(i)}
              >
                <div style={{ position:'relative', aspectRatio: i % 3 === 0 ? '3/4' : '4/3', overflow:'hidden' }}>
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw" style={{ objectFit:'cover' }} />
                  <div className="photo-overlay">
                    <span className="photo-overlay-text">{photo.cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lightbox-bg" onClick={() => setLightbox(null)}>
          <div style={{ position:'absolute', top:'20px', right:'28px', zIndex:1, cursor:'pointer' }} onClick={() => setLightbox(null)}>
            <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', color:'rgba(250,247,242,0.6)', textTransform:'uppercase' }}>Close ×</span>
          </div>
          <div style={{ position:'absolute', left:'20px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', zIndex:1 }}
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null) }}
          >
            <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'24px', color:'rgba(250,247,242,0.5)' }}>‹</span>
          </div>
          <div style={{ position:'relative', maxWidth:'90vw', maxHeight:'88vh' }} onClick={e => e.stopPropagation()}>
            <Image src={filtered[lightbox].src} alt={filtered[lightbox].alt} width={1200} height={900} style={{ maxWidth:'90vw', maxHeight:'88vh', objectFit:'contain' }} />
          </div>
          <div style={{ position:'absolute', right:'20px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', zIndex:1 }}
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % filtered.length : null) }}
          >
            <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'24px', color:'rgba(250,247,242,0.5)' }}>›</span>
          </div>
          <div style={{ position:'absolute', bottom:'20px', left:'50%', transform:'translateX(-50%)' }}>
            <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', color:'rgba(250,247,242,0.4)' }}>{lightbox + 1} / {filtered.length}</span>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
