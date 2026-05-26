'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

const photos = [
  { src: '/images/gallery-solomon-profile-bw.jpg',         alt: 'Solomon Stephen — profile',   cat: 'Portrait'  },
  { src: '/images/gallery-solomon-standing-deep.jpg',      alt: 'Solomon in deep worship',     cat: 'Worship'   },
  { src: '/images/gallery-solomon-worship-intense.jpg',    alt: 'Intense worship moment',      cat: 'Worship'   },
  { src: '/images/gallery-solomon-worship-raise.jpg',      alt: 'Hands raised in worship',     cat: 'Worship'   },
  { src: '/images/gallery-solomon-kneeling-joy.jpg',       alt: 'Kneeling in joy',             cat: 'Devotional'},
  { src: '/images/gallery-solomon-kneeling-surrender.jpg', alt: 'Surrender',                   cat: 'Devotional'},
  { src: '/images/gallery-congregation-worship.jpg',       alt: 'Congregation in worship',     cat: 'Gathering' },
  { src: '/images/gallery-band-bassist.jpg',               alt: 'TWN band — bassist',          cat: 'Band'      },
  { src: '/images/gallery-band-drummer-action.jpg',        alt: 'Drummer in action',           cat: 'Band'      },
  { src: '/images/gallery-band-drummer-focus.jpg',         alt: 'Drummer focused',             cat: 'Band'      },
  { src: '/images/gallery-band-guitarist-seated.jpg',      alt: 'Guitarist seated',            cat: 'Band'      },
  { src: '/images/gallery-band-keys-motif.jpg',            alt: 'Keys motif',                  cat: 'Band'      },
]

const cats = ['All', 'Portrait', 'Worship', 'Devotional', 'Gathering', 'Band']

// Alternating col/row spans for editorial variety
const SPANS = [
  { c: 1, r: 2 }, { c: 2, r: 1 }, { c: 1, r: 1 },
  { c: 1, r: 1 }, { c: 1, r: 1 }, { c: 1, r: 2 },
  { c: 2, r: 1 }, { c: 1, r: 1 }, { c: 1, r: 1 },
  { c: 2, r: 1 }, { c: 1, r: 1 }, { c: 1, r: 1 },
]

export default function GalleryPage() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = filter === 'All' ? photos : photos.filter(p => p.cat === filter)

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightbox === null) return
    if (e.key === 'Escape')     setLightbox(null)
    if (e.key === 'ArrowRight') setLightbox(i => i !== null ? (i + 1) % filtered.length : null)
    if (e.key === 'ArrowLeft')  setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null)
  }, [lightbox, filtered.length])

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleKey])

  return (
    <main style={{ background:'#0A0A0A', overflowX:'hidden' }}>
      <style>{`
        .filter-btn{padding:7px 16px;border:1px solid rgba(201,168,76,0.18);background:transparent;font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:0.22em;text-transform:uppercase;cursor:pointer;transition:all 0.3s;color:rgba(255,255,255,.4)}
        .filter-btn:hover{border-color:rgba(201,168,76,.5);color:rgba(201,168,76,.8)}
        .filter-btn.active{border-color:#C9A84C;background:rgba(201,168,76,0.1);color:#C9A84C}
        .collage-wall{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:27vh;gap:3px}
        .c-cell{position:relative;overflow:hidden;cursor:pointer;background:#111}
        .c-cell img{transition:transform 0.8s cubic-bezier(0.16,1,0.3,1)}
        .c-cell:hover img{transform:scale(1.07)}
        .c-overlay{position:absolute;inset:0;background:rgba(7,13,7,0);transition:background 0.4s;display:flex;align-items:flex-end;padding:14px}
        .c-cell:hover .c-overlay{background:rgba(7,13,7,0.5)}
        .c-label{opacity:0;transform:translateY(6px);transition:opacity 0.35s,transform 0.35s;font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(250,247,242,0.85)}
        .c-cell:hover .c-label{opacity:1;transform:none}
        @media(max-width:700px){
          .collage-wall{display:flex!important;flex-direction:row!important;overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x mandatory!important;-webkit-overflow-scrolling:touch!important;gap:3px!important;height:75vw!important;padding-bottom:0!important}
          .c-cell{flex:0 0 65vw!important;height:100%!important;scroll-snap-align:start!important;grid-column:unset!important;grid-row:unset!important}
          .gallery-header{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
        }
        .lb-bg{position:fixed;inset:0;background:rgba(7,13,7,0.96);z-index:2000;display:flex;align-items:center;justify-content:center}
      `}</style>

      {/* Header + filters */}
      <div className="gallery-header" style={{ paddingTop:'80px', background:'#0A0A0A', padding:'clamp(90px,10vw,120px) clamp(24px,4vw,60px) clamp(20px,2.5vw,28px)', display:'flex', flexWrap:'wrap', alignItems:'flex-end', justifyContent:'space-between', gap:'20px' }}>
        <div>
          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(201,168,76,.4)', marginBottom:'14px', display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{ display:'inline-block', width:'24px', height:'1px', background:'rgba(201,168,76,.4)' }} />
            Gallery
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5.5vw,72px)', fontWeight:400, lineHeight:.9, color:'#fff', margin:0, letterSpacing:'-.02em' }}>
            Moments <em style={{ color:'#C9A84C' }}>Captured.</em>
          </h1>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
          {cats.map(c => (
            <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Collage wall — all photos visible, no vertical scroll */}
      <div className="collage-wall">
        {filtered.map((photo, i) => {
          const sp = SPANS[i % SPANS.length]
          const colSpan = filtered.length <= 4 ? 1 : sp.c
          const rowSpan = filtered.length <= 6 ? 1 : sp.r
          return (
            <div key={`${photo.src}-${filter}`} className="c-cell"
              style={{ gridColumn:`span ${colSpan}`, gridRow:`span ${rowSpan}` }}
              onClick={() => setLightbox(i)}
            >
              <Image src={photo.src} alt={photo.alt} fill
                sizes="(max-width:700px) 65vw, 25vw"
                style={{ objectFit:'cover', objectPosition: i % 5 === 0 ? 'center top' : 'center' }}
              />
              <div className="c-overlay"><span className="c-label">{photo.alt}</span></div>
            </div>
          )
        })}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lb-bg" onClick={() => setLightbox(null)}>
          <div style={{ position:'absolute', top:'20px', right:'24px', zIndex:1, cursor:'pointer' }} onClick={() => setLightbox(null)}>
            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.22em', color:'rgba(250,247,242,.5)', textTransform:'uppercase' }}>Close ×</span>
          </div>
          <div style={{ position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', zIndex:1, padding:'12px' }}
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null) }}>
            <span style={{ fontSize:'28px', color:'rgba(250,247,242,.45)' }}>‹</span>
          </div>
          <div style={{ position:'relative', maxWidth:'90vw', maxHeight:'88vh' }} onClick={e => e.stopPropagation()}>
            <Image src={filtered[lightbox].src} alt={filtered[lightbox].alt} width={1400} height={1000}
              style={{ maxWidth:'90vw', maxHeight:'88vh', objectFit:'contain', display:'block' }} />
          </div>
          <div style={{ position:'absolute', right:'16px', top:'50%', transform:'translateY(-50%)', cursor:'pointer', zIndex:1, padding:'12px' }}
            onClick={e => { e.stopPropagation(); setLightbox(i => i !== null ? (i + 1) % filtered.length : null) }}>
            <span style={{ fontSize:'28px', color:'rgba(250,247,242,.45)' }}>›</span>
          </div>
          <div style={{ position:'absolute', bottom:'20px', left:'50%', transform:'translateX(-50%)', textAlign:'center' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', color:'rgba(250,247,242,.32)' }}>{lightbox + 1} / {filtered.length}</div>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'14px', fontStyle:'italic', color:'rgba(250,247,242,.42)', marginTop:'4px' }}>{filtered[lightbox].alt}</div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
