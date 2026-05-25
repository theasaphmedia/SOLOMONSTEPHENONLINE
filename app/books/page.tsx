'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const books = [
  {
    num: '01',
    title: 'The Cost of Ignorance',
    subtitle: 'A Clarion Call',
    year: '2021',
    desc: 'In a generation drowning in information yet starving for truth, ignorance is not bliss — it is peril. This book is a prophetic summons: to pursue knowledge of God with urgency, rigour, and reverence. Not optional. Not casual. Essential.',
    theme: 'Knowledge · Urgency · Truth',
    href: 'https://selar.com/v8561k6070',
    img: '/images/book-cost-of-ignorance.png',
    accent: '#C9A84C',
  },
  {
    num: '02',
    title: 'Sons Not Slaves',
    subtitle: 'March Devotional',
    year: '2023',
    desc: 'Thirty-one days of daily encounter designed to anchor believers in the identity and inheritance that Christ secured. Not performance. Not striving. Sonship — the unshakeable foundation on which every other thing must stand.',
    theme: 'Identity · Inheritance · Sonship',
    href: 'https://selar.com/41x076wbk1',
    img: '/images/book-sons-not-slaves-march.png',
    accent: '#C9A84C',
  },
  {
    num: '03',
    title: 'Sons Not Slaves',
    subtitle: 'April Devotional',
    year: '2023',
    desc: 'The continuation of the Sons Not Slaves series — deeper into the revelation of who you are in the Father. April extends the exploration: what does a son do? How does a son pray? How does a son carry the Kingdom? Day by day, word by word.',
    theme: 'Sonship · Kingdom · Daily Walk',
    href: 'https://selar.com/8z43781b2n',
    img: '/images/book-sons-not-slaves-april.png',
    accent: '#C9A84C',
  },
  {
    num: '04',
    title: 'Go In This Thy Might',
    subtitle: 'Coming Soon',
    year: '',
    desc: "God's presence forms and equips — but dependence must never transfer from the Giver to what the Giver gave. A devotional on carrying the power of encounter into the field without making the encounter itself an idol.",
    theme: 'Calling · Dependence · Courage',
    href: '',
    img: '/images/solomon-cream-suit-books.png',
    accent: '#C9A84C',
    comingSoon: true,
  },
]

export default function BooksPage() {
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
        @keyframes float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-20px) rotate(-4deg)}}
        @keyframes float2{0%,100%{transform:translateY(0) rotate(6deg)}50%{transform:translateY(-14px) rotate(6deg)}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .book-card { background:#fff; border-radius:2px; overflow:hidden; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1); }
        .book-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(13,27,13,0.12); }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .book-card:hover .img-zoom img { transform:scale(1.04); }
        .book-strip { border-top:1px solid rgba(201,168,76,0.15); padding:clamp(32px,4vw,56px) 0;
          display:grid; grid-template-columns:clamp(120px,18vw,200px) 1fr clamp(80px,10vw,160px);
          gap:clamp(24px,4vw,64px); align-items:center; cursor:pointer; transition:background 0.4s; }
        .book-strip:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .book-strip:hover { background:rgba(201,168,76,0.04); }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background:'#080F08', minHeight:'92vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,180px) clamp(24px,4vw,80px) clamp(56px,7vw,100px)', position:'relative', overflow:'hidden' }}>
        {/* Floating book covers */}
        <div style={{ position:'absolute', right:'clamp(-20px,3vw,60px)', top:'6%', width:'clamp(160px,24vw,320px)', aspectRatio:'3/4', zIndex:1, opacity:0.13, animation:'float 12s ease-in-out infinite', filter:'blur(0.5px)' }}>
          <Image src="/images/book-cost-of-ignorance.png" alt="" fill style={{ objectFit:'contain' }} />
        </div>
        <div style={{ position:'absolute', right:'clamp(100px,22vw,300px)', top:'12%', width:'clamp(100px,15vw,200px)', aspectRatio:'3/4', zIndex:1, opacity:0.07, animation:'float2 9s ease-in-out 1s infinite', filter:'blur(1.5px)' }}>
          <Image src="/images/book-sons-not-slaves-march.png" alt="" fill style={{ objectFit:'contain' }} />
        </div>
        {/* Gold ambient glow */}
        <div style={{ position:'absolute', width:'580px', height:'580px', borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', top:'-80px', right:'-60px', pointerEvents:'none', zIndex:2 }} />
        {/* Gradient overlays */}
        <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to top, #080F08 50%, rgba(8,15,8,0.85) 78%, rgba(8,15,8,0.6) 100%)' }} />
        <div style={{ position:'absolute', inset:0, zIndex:2, background:'linear-gradient(to right, #080F08 28%, transparent 65%)' }} />
        {/* Vertical rule */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'clamp(24px,4vw,80px)', width:'1px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.15) 75%, transparent)', pointerEvents:'none', zIndex:3 }} />
        {/* Content */}
        <div style={{ position:'relative', zIndex:4, maxWidth:'800px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>Books</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,118px)', fontWeight:400, lineHeight:0.92, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,44px)', letterSpacing:'-0.025em' }}>
            <span className="wc"><span className="wi">Words</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.07s' }}>That</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.14s', color:'#C9A84C' }}>Outlast</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.21s' }}>Moments.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.9, color:'rgba(250,247,242,0.5)', maxWidth:'480px', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>
            Solomon Stephen writes not to fill pages — but to recalibrate believers to the truth of who they are. Each book is a stake in the ground.
          </p>
          {/* Stat strip */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0', marginTop:'clamp(36px,4.5vw,64px)', borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:'clamp(18px,2.5vw,28px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}>
            {['04 Books', 'Hebrew & Greek Studies', 'Available on Selar', 'Since 2021'].map((s, i) => (
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

      {/* ── Grid of Books ── */}
      <section style={{ background:'#F0EBE1', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ marginBottom:'clamp(40px,5vw,64px)' }}>The Library</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:'clamp(20px,3vw,32px)' }}>
            {books.map((b, i) => (
              <a key={b.num} href={b.href} target="_blank" rel="noopener noreferrer"
                className="book-card rv-scale"
                style={{ textDecoration:'none', transitionDelay:`${i * 0.09}s` }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              >
                <div className="img-zoom" style={{ aspectRatio:'3/4', position:'relative' }}>
                  <Image src={b.img} alt={b.title} fill style={{ objectFit:'cover', objectPosition:'center top' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,27,13,0.8) 0%, transparent 50%)', opacity: hovered === i ? 1 : 0, transition:'opacity 0.4s', display:'flex', alignItems:'flex-end', padding:'24px' }}>
                    <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A84C' }}>Read on Selar →</span>
                  </div>
                </div>
                <div style={{ padding:'clamp(20px,2.5vw,32px)' }}>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'8px' }}>{b.num} · {b.year}</div>
                  <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,2.5vw,30px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.2, marginBottom:'6px' }}>{b.title}</h3>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#8A9A8A', marginBottom:'16px', letterSpacing:'0.06em' }}>{b.subtitle}</div>
                  <div style={{ width:'32px', height:'1px', background:'#C9A84C', marginBottom:'16px', transition:'width 0.5s cubic-bezier(0.16,1,0.3,1)', ...(hovered === i ? { width:'100%' } : {}) }} />
                  <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', lineHeight:1.75, color:'#3D4B3D' }}>{b.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Theme Banner ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'clamp(40px,5vw,80px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(20px,2.5vw,32px)' }}>Writing Approach</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.15 }}>
              Scholarly rigour.<br /><em style={{ color:'#C9A84C' }}>Pastoral warmth.</em>
            </h2>
          </div>
          <div>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'rgba(250,247,242,0.6)', marginBottom:'24px' }}>
              Solomon writes with one conviction: that a transformed mind always precedes a transformed life. His books draw from Hebrew and Greek word studies — <em style={{ color:'rgba(250,247,242,0.8)' }}>hesed, nephesh, zōē, eusebeia</em> — not to impress, but to unlock layers of Scripture that English translations can only gesture toward.
            </p>
            <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer" className="rv d3" style={{
              display:'inline-block', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'14px 32px', border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.4)' }}
            >Browse All Books on Selar →</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
