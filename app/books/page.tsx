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
        .eyebrow::before{content:'';width:28px;height:1px;background:#C9A84C;}
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

      {/* ── Hero — typographic, no photo of Solomon ── */}
      <section style={{ height:'100vh', minHeight:'640px', background:'#050A05', position:'relative', overflow:'hidden' }}>

        {/* Floating book covers — decorative background art */}
        <div style={{ position:'absolute', right:'6%', top:'8%', width:'clamp(130px,17vw,240px)', aspectRatio:'3/4', zIndex:1, opacity:0.22, transform:'rotate(9deg)' }}>
          <Image src="/images/book-cost-of-ignorance.png" alt="" fill style={{ objectFit:'contain' }} />
        </div>
        <div style={{ position:'absolute', right:'24%', top:'22%', width:'clamp(110px,14vw,200px)', aspectRatio:'3/4', zIndex:0, opacity:0.13, transform:'rotate(-6deg)' }}>
          <Image src="/images/book-sons-not-slaves-march.png" alt="" fill style={{ objectFit:'contain' }} />
        </div>
        <div style={{ position:'absolute', right:'11%', top:'48%', width:'clamp(120px,15vw,220px)', aspectRatio:'3/4', zIndex:2, opacity:0.11, transform:'rotate(4deg)' }}>
          <Image src="/images/book-sons-not-slaves-april.png" alt="" fill style={{ objectFit:'contain' }} />
        </div>

        {/* Atmosphere gradients */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(5,10,5,0.99) 0%, rgba(5,10,5,0.90) 28%, rgba(5,10,5,0.65) 58%, rgba(5,10,5,0.50) 100%)', zIndex:3 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(5,10,5,0.95) 0%, rgba(5,10,5,0.72) 38%, rgba(5,10,5,0.25) 65%, transparent 100%)', zIndex:3 }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'200px', background:'linear-gradient(to bottom, rgba(5,10,5,0.85) 0%, transparent 100%)', zIndex:4 }} />

        {/* Subtle gold glow mid-right */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 45% 55% at 72% 42%, rgba(201,168,76,0.06) 0%, transparent 70%)', zIndex:4, pointerEvents:'none' }} />

        {/* Big watermark number */}
        <div style={{ position:'absolute', right:'-2%', top:'50%', transform:'translateY(-50%)', fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(200px,30vw,420px)', fontWeight:400, color:'rgba(201,168,76,0.03)', lineHeight:1, pointerEvents:'none', userSelect:'none', letterSpacing:'-.05em', zIndex:5 }}>04</div>

        {/* Vertical rule */}
        <div style={{ position:'absolute', left:'clamp(24px,4vw,80px)', top:0, bottom:0, width:'1px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,.12) 30%, rgba(201,168,76,.12) 70%, transparent)', pointerEvents:'none', zIndex:5 }} />

        {/* Text — anchored bottom, font sized to fit without overflow */}
        <div style={{ position:'absolute', inset:0, zIndex:6, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(80px,10vw,120px) clamp(24px,4vw,80px) clamp(48px,6vw,72px)', animation:'heroIn .9s .15s both' }}>
          <div style={{ maxWidth:'640px' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(201,168,76,.4)', marginBottom:'clamp(20px,3vw,36px)', display:'flex', alignItems:'center', gap:'14px' }}>
              <span style={{ display:'inline-block', width:'28px', height:'1px', background:'rgba(201,168,76,.4)' }} />
              Solomon Stephen · Books
            </div>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(52px,8vw,100px)', fontWeight:400, lineHeight:.88, color:'#fff', margin:'0 0 clamp(16px,2.5vw,28px)', letterSpacing:'-.03em' }}>
              Words<br />That<br /><em style={{ color:'#C9A84C' }}>Outlast.</em>
            </h1>
            <div style={{ width:'40px', height:'1px', background:'rgba(201,168,76,.35)', marginBottom:'clamp(16px,2.5vw,28px)' }} />
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, color:'rgba(255,255,255,.35)', maxWidth:'440px', margin:'0 0 clamp(28px,4vw,44px)' }}>
              Solomon Stephen writes not to fill pages — but to recalibrate believers to the truth of who they are. Rooted in Hebrew and Greek. Each book, a stake in the ground.
            </p>
            <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-block', fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', padding:'15px 36px', border:'1px solid rgba(201,168,76,.4)', color:'#C9A84C', textDecoration:'none', transition:'all .3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.1)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.4)' }}
            >Browse on Selar →</a>
          </div>
        </div>
      </section>

      {/* ── Book Rail — all 4 visible, horizontal, no vertical scroll ── */}
      <section style={{ background:'#0A0A0A', overflow:'hidden' }}>
        <style>{`
          .book-rail{display:flex;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;height:82vh;min-height:500px}
          .book-rail::-webkit-scrollbar{display:none}
          .book-slot{flex:0 0 25%;min-width:220px;position:relative;cursor:pointer;overflow:hidden;border-right:1px solid rgba(255,255,255,.04);background:#0A0A0A}
          .book-slot:last-child{border-right:none}
          .book-slot img{transition:transform 1s cubic-bezier(0.16,1,0.3,1)}
          .book-slot:hover img{transform:scale(1.06)}
          .book-base{position:absolute;inset:0;background:linear-gradient(to top,rgba(7,13,7,0.97) 0%,rgba(7,13,7,0.7) 35%,transparent 65%);transition:background 0.5s}
          .book-slot:hover .book-base{background:linear-gradient(to top,rgba(7,13,7,0.99) 0%,rgba(7,13,7,0.85) 50%,rgba(7,13,7,0.3) 75%,transparent 90%)}
          .book-info{position:absolute;bottom:0;left:0;right:0;padding:clamp(20px,2.5vw,32px);transition:transform 0.5s cubic-bezier(0.16,1,0.3,1)}
          .book-desc{font-family:'DM Sans',sans-serif;font-size:12px;line-height:1.7;color:rgba(250,247,242,0.42);margin:12px 0 16px;max-height:0;overflow:hidden;transition:max-height 0.6s cubic-bezier(0.16,1,0.3,1),opacity 0.5s;opacity:0}
          .book-slot:hover .book-desc{max-height:200px;opacity:1}
          .book-num{font-family:'Cormorant Garamond',serif;font-size:64px;font-weight:300;color:rgba(201,168,76,0.06);position:absolute;top:20px;right:20px;line-height:1;pointer-events:none;user-select:none}
          @media(max-width:700px){
            .book-rail{height:78vw!important;min-height:360px!important}
            .book-slot{flex:0 0 75vw!important;min-width:0!important}
          }
        `}</style>

        {/* Rail header */}
        <div style={{ padding:'clamp(48px,6vw,72px) clamp(24px,4vw,60px) clamp(16px,2vw,24px)', display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'16px' }}>
          <div>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.38em', textTransform:'uppercase', color:'rgba(201,168,76,.35)', marginBottom:'12px', display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ display:'inline-block', width:'22px', height:'1px', background:'rgba(201,168,76,.35)' }} />
              The Library
            </div>
            <h2 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,52px)', fontWeight:400, color:'#fff', margin:0, lineHeight:.95, letterSpacing:'-.02em' }}>
              Four books. <em style={{ color:'#C9A84C' }}>One conviction.</em>
            </h2>
          </div>
          <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
            style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', padding:'12px 28px', border:'1px solid rgba(201,168,76,.35)', color:'rgba(201,168,76,.7)', textDecoration:'none', transition:'all .3s', whiteSpace:'nowrap' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.35)'; (e.currentTarget as HTMLElement).style.color='rgba(201,168,76,.7)' }}
          >Browse all on Selar →</a>
        </div>

        {/* Swipeable book rail */}
        <div className="book-rail">
          {books.map((b, i) => (
            <a key={b.num}
              href={b.comingSoon ? undefined : b.href}
              target={b.comingSoon ? undefined : '_blank'}
              rel={b.comingSoon ? undefined : 'noopener noreferrer'}
              className="book-slot"
              style={{ textDecoration:'none', cursor: b.comingSoon ? 'default' : 'pointer' }}
            >
              <Image src={b.img} alt={b.title} fill style={{ objectFit:'contain', objectPosition:'center 15%' }} sizes="25vw" />
              <div className="book-base" />
              {/* Decorative number */}
              <div className="book-num">{b.num}</div>
              {/* Info panel */}
              <div className="book-info">
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.55)', marginBottom:'8px' }}>
                  {b.comingSoon ? 'Coming Soon' : b.theme}
                </div>
                <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(20px,2.2vw,28px)', fontWeight:400, color:'#fff', margin:'0 0 4px', lineHeight:1.15, letterSpacing:'-.01em' }}>
                  {b.title}
                </h3>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'rgba(250,247,242,.35)', letterSpacing:'.08em' }}>{b.subtitle}</div>
                <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,.45)', margin:'12px 0' }} />
                <div className="book-desc">{b.desc}</div>
                {!b.comingSoon && (
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'#C9A84C' }}>
                    Read on Selar →
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
