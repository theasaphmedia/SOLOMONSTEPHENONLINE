'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const DEFAULT_FACTS = [
  { id: 0, label: 'Ministry Name',   value: 'The Worship Nation (TWN)' },
  { id: 1, label: 'Based In',        value: 'Lagos, Nigeria' },
  { id: 2, label: 'Genres',          value: 'Gospel Worship · Afrobeats Gospel · Contemporary Christian' },
  { id: 3, label: 'Published Books', value: '4 Titles (Selar, Amazon)' },
  { id: 4, label: 'Monthly Events',  value: 'MDWE · TSH · Synantesis' },
  { id: 5, label: 'Studios',         value: 'TWN Studios — Ajah, Lagos' },
  { id: 6, label: 'Streaming',       value: 'Spotify · Apple Music · YouTube' },
]

const DEFAULT_RELEASES = [
  { id: 0, year: '2024', title: 'Resolute',       type: 'Single', description: 'A bold declaration of unwavering faith — standing firm when the storm rages.' },
  { id: 1, year: '2024', title: 'Alaabo Mi',      type: 'Single', description: 'My Praise — a Yoruba-language offering of pure adoration to the Most High.' },
  { id: 2, year: '2017', title: 'The Mighty God', type: 'Single', description: 'An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all.' },
  { id: 3, year: '',     title: 'CROSSOVER',      type: 'EP',     description: 'A declaration of transition and divine momentum. Multiple tracks, one trajectory — forward.' },
  { id: 4, year: '',     title: 'AIKU',           type: 'Single', description: 'A love letter from the spirit — the simplicity of devotion when all else fades.' },
]

export default function PressPage() {
  const [entered, setEntered] = useState(false)
  const [facts, setFacts] = useState(DEFAULT_FACTS)
  const [releases, setReleases] = useState(DEFAULT_RELEASES)

  useEffect(() => {
    fetch('/api/press').then(r => r.json()).then(data => {
      if (data.facts?.length) setFacts(data.facts)
      if (data.releases?.length) setReleases(data.releases)
    }).catch(() => {})
  }, [])

  useEffect(() => {
    setTimeout(() => setEntered(true), 80)
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.04, rootMargin: '0px 0px -20px 0px' }
    )
    // slight delay so all elements are in the DOM
    const t = setTimeout(() => {
      document.querySelectorAll('.rv,.rv-left,.rv-right').forEach(el => obs.observe(el))
    }, 100)
    return () => { obs.disconnect(); clearTimeout(t) }
  }, [])

  return (
    <>
      <main style={{ background: '#0D1B0D', overflowX: 'hidden' }}>
        <style>{`
          .rv{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
          .rv.is-visible{opacity:1;transform:none}
          .rv-left{opacity:0;transform:translateX(-32px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
          .rv-left.is-visible{opacity:1;transform:none}
          .rv-right{opacity:0;transform:translateX(32px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
          .rv-right.is-visible{opacity:1;transform:none}
          .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}
          .fact-row{display:grid;grid-template-columns:200px 1fr;gap:16px 32px;padding:18px 0;border-bottom:1px solid rgba(250,247,242,.06);align-items:baseline}
          .press-dl-btn{display:inline-flex;align-items:center;gap:10px;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:14px 32px;border:1px solid rgba(201,168,76,0.4);color:#C9A84C;text-decoration:none;transition:all .3s;cursor:pointer;background:transparent}
          .press-dl-btn:hover{background:rgba(201,168,76,.08);border-color:#C9A84C}
          .photo-wrap{aspect-ratio:3/4;position:relative;overflow:hidden;cursor:pointer}
          .photo-wrap img{transition:transform .5s cubic-bezier(.16,1,.3,1)!important}
          .photo-wrap:hover img{transform:scale(1.05)!important}
          @media(max-width:640px){.fact-row{grid-template-columns:1fr;gap:4px 0;padding:14px 0}}
          @media(max-width:640px){.press-grid{grid-template-columns:1fr!important}}
          @media(prefers-reduced-motion:reduce){.rv,.rv-left,.rv-right{opacity:1!important;transform:none!important;transition:none!important}}
        `}</style>

        {/* HERO */}
        <section style={{ height:'100vh', minHeight:'640px', position:'relative', overflow:'hidden' }}>
          <Image
            src="/images/solomon-green-suit-hero.png"
            alt="Solomon Stephen press photo"
            fill priority
            style={{
              objectFit:'cover', objectPosition:'55% 12%',
              transform: entered ? 'scale(1)' : 'scale(1.06)',
              transition:'transform 1.8s cubic-bezier(.16,1,.3,1)',
            }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,27,13,0.97) 0%, rgba(13,27,13,0.75) 35%, rgba(13,27,13,0.25) 65%, transparent 85%)', zIndex:1 }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(13,27,13,0.85) 0%, rgba(13,27,13,0.4) 40%, transparent 70%)', zIndex:1 }} />

          <div style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,80px) clamp(56px,8vw,96px)' }}>
            <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)', transition:'opacity .9s .3s, transform .9s .3s' }}>
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(20px,3vw,36px)' }}>Press &amp; Media Kit</div>
            </div>
            <h1 style={{
              fontFamily:"'Cormorant Garamond',serif", fontWeight:400, color:'#FAF7F2', lineHeight:.92,
              margin:'0 0 clamp(28px,3vw,40px)', letterSpacing:'-.02em',
              fontSize:'clamp(52px,8.5vw,110px)',
              opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(28px)',
              transition:'opacity 1s .5s, transform 1s .5s',
            }}>
              Solomon<br />
              <em style={{ color:'#C9A84C' }}>Stephen.</em>
            </h1>
            <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)', transition:'opacity .9s .75s, transform .9s .75s', maxWidth:'480px' }}>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.5)', margin:0 }}>
                Gospel Minister · Worship Leader · Music Producer · Author<br />
                Founder of The Worship Nation &amp; TWN Studios — Lagos, Nigeria
              </p>
            </div>
          </div>
        </section>

        {/* BIO */}
        <section style={{ background:'#0D1B0D', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 2fr', gap:'clamp(40px,6vw,100px)', alignItems:'start' }} className="press-grid">
            <div className="rv-left">
              <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)', marginBottom:'20px' }}>Biography</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1, margin:0 }}>Short<br /><em style={{ color:'#C9A84C' }}>Bio</em></h2>
            </div>
            <div className="rv-right">
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'rgba(250,247,242,0.55)', margin:'0 0 24px' }}>
                Solomon Stephen is a gospel minister, worship leader, music producer, published author, and founder of The Worship Nation (TWN) and TWN Studios — based in Lagos, Nigeria. His ministry centres on one conviction: that the presence of God is the only atmosphere in which people truly change.
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'rgba(250,247,242,0.55)', margin:'0 0 24px' }}>
                Solomon has built three recurring monthly gatherings — the Mid Day Worship Experience (MDWE), The Slaughter House (TSH), and Synantesis — each one a distinct and intentional encounter designed to bring people into the undiluted presence of God.
              </p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'rgba(250,247,242,0.55)', margin:0 }}>
                As a recording artist, his releases include the EP <em>CROSSOVER</em> and the single <em>AIKU</em>, available on all major streaming platforms. He is also the author of four published titles, including <em>The Cost of Ignorance</em> and <em>Sons Not Slaves</em>.
              </p>
            </div>
          </div>
        </section>

        {/* FAST FACTS */}
        <section style={{ background:'#0A1A0A', padding:'clamp(60px,8vw,100px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth:'900px', margin:'0 auto' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)', marginBottom:'40px' }} className="rv">Fast Facts</div>
            {facts.map((f, i) => (
              <div key={f.id} className={`fact-row rv d${(i % 4) + 1}`}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)' }}>{f.label}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.3vw,15px)', color:'rgba(250,247,242,0.7)' }}>{f.value}</div>
              </div>
            ))}
          </div>
        </section>


        {/* RELEASES */}
        <section style={{ background:'#0D1B0D', padding:'clamp(60px,8vw,100px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth:'900px', margin:'0 auto' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)', marginBottom:'40px' }} className="rv">Discography</div>
            {releases.map((r, i) => (
              <div key={r.id} className={`rv d${(i % 4) + 1}`} style={{ borderTop:'1px solid rgba(250,247,242,.07)', padding:'clamp(24px,3vw,40px) 0', display:'grid', gridTemplateColumns:'80px 1fr', gap:'24px 40px', alignItems:'start' }}>
                <div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'.1em', color:'rgba(201,168,76,0.55)', marginBottom:'4px' }}>{r.year}</div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.15em', textTransform:'uppercase', color:'rgba(250,247,242,.25)' }}>{r.type}</div>
                </div>
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3vw,36px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1, marginBottom:'12px' }}>{r.title}</div>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', lineHeight:1.8, color:'rgba(250,247,242,0.42)', margin:0 }}>{r.description}</p>
                </div>
              </div>
            ))}
            <div style={{ borderTop:'1px solid rgba(250,247,242,.07)', paddingTop:'24px' }} />
          </div>
        </section>

        {/* PRESS PHOTOS */}
        <section style={{ background:'#0A1A0A', padding:'clamp(60px,8vw,100px) clamp(24px,4vw,80px)' }}>
          <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)', marginBottom:'40px' }} className="rv">Press Photos</div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'clamp(12px,2vw,20px)', marginBottom:'36px' }}>
              {[
                { src:'/images/solomon-green-suit-hero.png', label:'Official Portrait' },
                { src:'/images/gallery-solomon-worship-raise.jpg', label:'Worship — Raised Hands' },
                { src:'/images/gallery-solomon-worship-intense.jpg', label:'Worship — Intense' },
                { src:'/images/gallery-solomon-kneeling-surrender.jpg', label:'Worship — Kneeling' },
              ].map((photo, i) => (
                <div key={i} className={`rv d${(i % 4) + 1}`}>
                  <div className="photo-wrap">
                    <Image src={photo.src} alt={photo.label} fill style={{ objectFit:'cover', objectPosition:'center top' }} />
                    <div style={{ position:'absolute', inset:0, background:'rgba(10,26,10,0.2)' }} />
                  </div>
                  <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(250,247,242,0.35)', marginTop:'10px' }}>{photo.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', lineHeight:1.75, color:'rgba(250,247,242,0.25)', margin:0 }}>
              For high-resolution press images, interview requests, or booking enquiries, contact us via the link below.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background:'#0D1B0D', borderTop:'1px solid rgba(201,168,76,0.08)', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', textAlign:'center' }}>
          <div style={{ maxWidth:'600px', margin:'0 auto' }}>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)', marginBottom:'24px' }} className="rv">Media Enquiries</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,5vw,60px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, margin:'0 0 24px', letterSpacing:'-.01em' }} className="rv d1">
              Let&apos;s tell the <em style={{ color:'#C9A84C' }}>story right.</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.4)', margin:'0 0 40px' }} className="rv d2">
              For interview requests, feature coverage, booking, or press assets — reach out.
            </p>
            <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }} className="rv d3">
              <Link href="/contact" className="press-dl-btn">
                Send Enquiry
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}
