'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const tracks = [
  { id: 'TnEp0kiJBfI', title: 'CROSSOVER',      year: '2024', scripture: 'Psalm 23',          desc: 'A prophetic declaration of passing through — beyond every limitation, into the fullness of God.' },
  { id: 'cB0LxEjVaIs', title: 'The Mighty God',  year: '2023', scripture: 'Isaiah 9:6',         desc: 'An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all.' },
  { id: 'lDIjB11ueYM', title: 'AIKU',            year: '2023', scripture: 'Revelation 1:17–18', desc: 'Death could not hold Him. A bold, triumphant anthem declaring the resurrection power of Jesus.' },
  { id: 'aU0TFLxplck', title: 'Awesome God',     year: '2022', scripture: 'Psalm 48:1',         desc: 'A live worship experience capturing the atmosphere of surrender and awe in the presence of God.' },
  { id: 'q1-eDXBpMkY', title: 'Alagbada Ina',    year: '2022', scripture: 'Exodus 3:2',         desc: 'The God clothed in fire — a Yoruba-infused anthem from the burning bush encounter.' },
  { id: 'Ao_ZC3oHi9c', title: 'There Is No One', year: '2021', scripture: 'Isaiah 46:9',        desc: 'A tender declaration of the uniqueness and incomparability of God. Intimate. Personal. True.' },
]

const CHANNEL = 'https://www.youtube.com/@thesolomonsteph'

export default function MusicPage() {
  const [active, setActive] = useState(tracks[0])
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv { opacity:0; transform:translateY(32px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv-left { opacity:0; transform:translateX(-40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-left.is-visible { opacity:1; transform:none; }
        .rv-right { opacity:0; transform:translateX(40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-right.is-visible { opacity:1; transform:none; }
        .rv-scale { opacity:0; transform:scale(0.94); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-scale.is-visible { opacity:1; transform:none; }
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .track-row { display:grid; grid-template-columns:clamp(28px,4vw,48px) 1fr auto; align-items:center; gap:clamp(16px,3vw,40px);
          padding:clamp(18px,2.2vw,28px) 0; border-top:1px solid rgba(201,168,76,0.15); cursor:pointer; transition:background 0.3s; }
        .track-row:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .track-row:hover { background:rgba(201,168,76,0.04); }
        .img-zoom img { transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform:scale(1.04); }
        .platform-pill { display:inline-flex; align-items:center; gap:8px; padding:10px 20px; border:1px solid rgba(201,168,76,0.25);
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:#3D4B3D;
          transition:all 0.3s cubic-bezier(0.16,1,0.3,1); text-decoration:none; }
        .platform-pill:hover { border-color:#C9A84C; color:#C9A84C; background:rgba(201,168,76,0.05); }
        .yt-embed { aspect-ratio:16/9; width:100%; border:none; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(140px,16vw,200px) clamp(24px,4vw,80px) clamp(72px,9vw,120px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:'1000px', position:'relative' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)' }}>
            <span style={{ width:28, height:1, background:'rgba(201,168,76,0.7)', display:'inline-block' }} />
            Music
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,110px)', fontWeight:400, lineHeight:1, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,40px)', letterSpacing:'-0.02em' }}>
            <span className="wc"><span className="wi">Sound</span></span>{" "}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.07s', color:'#C9A84C' }}>from</span></span>{" "}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.14s' }}>the</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.21s' }}>Secret</span></span>{" "}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.28s' }}>Place.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.8, color:'rgba(250,247,242,0.6)', maxWidth:'520px' }}>
            Every song is an invitation — a doorway into the reality of God that Solomon carries in his own life. Not performance. Presence.
          </p>
        </div>
      </section>

      {/* ── Featured Player ── */}
      <section style={{ padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)', background:'#F0EBE1' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ marginBottom:'clamp(32px,4vw,56px)' }}>Now Playing</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(32px,4vw,64px)', alignItems:'start' }}>

            {/* Player */}
            <div className="rv-left">
              <div className="img-zoom" style={{ borderRadius:'2px', overflow:'hidden', marginBottom:'24px' }}>
                <iframe
                  key={active.id}
                  className="yt-embed"
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=0&rel=0&modestbranding=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,4vw,42px)', fontWeight:400, color:'#0D1B0D', marginBottom:'8px' }}>{active.title}</h2>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'16px' }}>{active.scripture} · {active.year}</div>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', lineHeight:1.8, color:'#3D4B3D' }}>{active.desc}</p>
            </div>

            {/* Track list */}
            <div className="rv-right">
              {tracks.map((t, i) => (
                <div key={t.id} className="track-row" onClick={() => setActive(t)}
                  onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
                  style={{ paddingLeft:'8px', paddingRight:'8px', background: active.id === t.id ? 'rgba(201,168,76,0.06)' : hovered === i ? 'rgba(201,168,76,0.04)' : 'transparent' }}
                >
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', color: active.id === t.id ? '#C9A84C' : '#8A9A8A' }}>0{i+1}</span>
                  <div>
                    <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(18px,2.2vw,24px)', fontWeight:400, color: active.id === t.id ? '#C9A84C' : '#0D1B0D' }}>{t.title}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#8A9A8A', marginTop:'2px' }}>{t.scripture}</div>
                  </div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#8A9A8A' }}>{t.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Thumbnail Grid ── */}
      <section style={{ padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
            <div>
              <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Visual Library</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1 }}>
                On YouTube
              </h2>
            </div>
            <a href={CHANNEL} target="_blank" rel="noopener noreferrer" className="rv d2" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'12px 28px', border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.06)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.4)' }}
            >Subscribe →</a>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px,1fr))', gap:'clamp(16px,2vw,24px)' }}>
            {tracks.map((t, i) => (
              <a key={t.id} href={`https://www.youtube.com/watch?v=${t.id}`} target="_blank" rel="noopener noreferrer"
                className="rv-scale img-zoom"
                style={{ textDecoration:'none', transitionDelay:`${i * 0.06}s` }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform='translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform='none'; }}
              >
                <div style={{ position:'relative', aspectRatio:'16/9', overflow:'hidden', borderRadius:'2px', marginBottom:'12px' }}>
                  <Image src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`} alt={t.title} fill style={{ objectFit:'cover' }} unoptimized />
                  {/* Play overlay */}
                  <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(13,27,13,0.3)', opacity:0, transition:'opacity 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity='1'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity='0'; }}
                  >
                    <div style={{ width:48, height:48, borderRadius:'50%', background:'rgba(201,168,76,0.9)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><polygon points="6,3 15,9 6,15" fill="#1A2E1A"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'18px', fontWeight:400, color:'#0D1B0D', marginBottom:'4px' }}>{t.title}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#8A9A8A' }}>{t.scripture} · {t.year}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Also Known For ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(32px,4vw,56px)' }}>Also Known For</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'clamp(12px,2vw,20px)' }}>
            {['Rivers of Joy', 'Alaabo Mi', 'JESU MY LOVE'].map((t, i) => (
              <span key={t} className="rv" style={{ transitionDelay:`${i*0.1}s`, fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,3vw,36px)', fontWeight:300, color: i === 0 ? '#FAF7F2' : 'rgba(250,247,242,0.4)', fontStyle:'italic', paddingRight:'clamp(16px,2.5vw,32px)', borderRight: i < 2 ? '1px solid rgba(201,168,76,0.2)' : 'none' }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ marginTop:'clamp(32px,4vw,56px)' }}>
            <p className="rv d1" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.8, color:'rgba(250,247,242,0.55)', maxWidth:'600px' }}>
              A catalogue that spans more than a decade of worship leadership — each song a stone of remembrance marking encounters with the God who shows up.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
