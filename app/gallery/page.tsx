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

      {/* ── Hero ── */}
      <section style={{ background:'#080F08', minHeight:'92vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,180px) clamp(24px,4vw,80px) clamp(56px,7vw,100px)', position:'relative', overflow:'hidden' }}>
        {/* Mosaic background images */}
        <div style={{ position:'absolute', top:'-5%', right:'5%', width:'clamp(140px,22vw,290px)', height:'clamp(100px,17vw,220px)', overflow:'hidden', borderRadius:'2px', opacity:0.11, transform:'rotate(3deg)', zIndex:1 }}>
          <Image src="/images/gallery-congregation-worship.jpg" alt="" fill style={{ objectFit:'cover' }} />
        </div>
        <div style={{ position:'absolute', top:'4%', right:'clamp(160px,28vw,370px)', width:'clamp(100px,16vw,210px)', height:'clamp(140px,22vw,290px)', overflow:'hidden', borderRadius:'2px', opacity:0.08, transform:'rotate(-2deg)', zIndex:1, filter:'blur(0.5px)' }}>
          <Image src="/images/gallery-solomon-profile-bw.jpg" alt="" fill style={{ objectFit:'cover' }} />
        </div>
        <div style={{ position:'absolute', top:'38%', right:'2%', width:'clamp(110px,17vw,220px)', height:'clamp(80px,13vw,170px)', overflow:'hidden', borderRadius:'2px', opacity:0.07, transform:'rotate(-1.5deg)', zIndex:1 }}>
          <Image src="/images/gallery-band-drummer-action.jpg" alt="" fill style={{ objectFit:'cover' }} />
        </div>
        <div style={{ position:'absolute', top:'55%', right:'clamp(120px,20vw,260px)', width:'clamp(120px,18vw,240px)', height:'clamp(90px,14vw,180px)', overflow:'hidden', borderRadius:'2px', opacity:0.06, transform:'rotate(2deg)', zIndex:1, filter:'blur(1px)' }}>
          <Image src="/images/gallery-solomon-worship-intense.jpg" alt="" fill style={{ objectFit:'cover' }} />
        </div>
        {/* Gradient overlays */}
        <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to top, #080F08 52%, rgba(8,15,8,0.9) 75%, rgba(8,15,8,0.72) 100%)' }} />
        <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to right, #080F08 30%, transparent 65%)' }} />
        {/* Ambient orb */}
        <div style={{ position:'absolute', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', top:'-70px', right:'18%', animation:'float 10s ease-in-out infinite', pointerEvents:'none', zIndex:2 }} />
        {/* Vertical rule */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'clamp(24px,4vw,80px)', width:'1px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.15) 75%, transparent)', pointerEvents:'none', zIndex:3 }} />
        {/* Content */}
        <div style={{ position:'relative', zIndex:4, maxWidth:'900px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            Gallery
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,118px)', fontWeight:400, lineHeight:0.92, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,44px)', letterSpacing:'-0.025em' }}>
            <span className="wc"><span className="wi">Moments</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.1s', color:'#C9A84C' }}>Captured.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.9, color:'rgba(250,247,242,0.5)', maxWidth:'480px', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>
            Glimpses of worship, ministry, and the music that moves between heaven and earth.
          </p>
          {/* Stat strip */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0', marginTop:'clamp(36px,4.5vw,64px)', borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:'clamp(18px,2.5vw,28px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}>
            {['12 Photos', '6 Categories', 'Worship · Ministry · Band'].map((s, i) => (
              <div key={s} style={{ paddingRight:'clamp(16px,2.5vw,40px)', paddingLeft: i > 0 ? 'clamp(16px,2.5vw,40px)' : 0, borderLeft: i > 0 ? '1px solid rgba(201,168,76,0.15)' : 'none' }}>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(8px,0.9vw,10px)', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', whiteSpace:'nowrap' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'clamp(28px,3.5vw,48px)', right:'clamp(24px,4vw,80px)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 1s both', zIndex:4 }}>
          <div style={{ fontFamily:'DM Sans', fontSize:'9px', letterSpacing:'0.3em', color:'rgba(201,168,76,0.45)', textTransform:'uppercase', writingMode:'vertical-rl' }}>Scroll</div>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, rgba(201,168,76,0.45), transparent)' }} />
        </div>
      </section>

      {/* ── Gallery ── */}
      <section style={{ padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1300px', margin:'0 auto' }}>

          {/* Filter bar */}
          <div className="rv" style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'clamp(40px,5vw,64px)' }}>
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
