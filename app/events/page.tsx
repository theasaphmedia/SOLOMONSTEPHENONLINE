'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const gatherings = [
  {
    code: 'MDWE',
    name: 'Mid Day Worship Experience',
    when: 'Every Wednesday · 12:00 PM',
    desc: 'A pause in the middle of the week — a worship and prophetic devotion gathering designed to shift the atmosphere of your days. Come as you are, mid-day, and encounter the God who is always present. MDWE began as a conviction that worship should interrupt the week, not just cap it.',
    verse: 'Psalm 27:4',
    verseText: '"One thing have I asked of the LORD, that will I seek after..."',
    color: '#C9A84C',
    img: '/images/worship-atmosphere-bg.jpg',
  },
  {
    code: 'TSH',
    name: 'The Slaughter House',
    when: 'Last Saturday before the final Sunday',
    desc: 'A high-intensity gathering of worship, intercession, and consecration. The name is intentional — drawn from the altar, the place where self is surrendered and God moves. TSH is not a comfortable meeting. It is a meeting with fire. Those who come leave different.',
    verse: 'Romans 12:1',
    verseText: '"Present your bodies as a living sacrifice, holy and acceptable to God..."',
    color: '#8A5A2A',
    img: '/images/worship-interlude-bg.jpg',
  },
  {
    code: 'Synantesis',
    name: 'The Divine Appointment',
    when: 'Last Sunday of every month',
    desc: 'The name is drawn from the Greek word meaning divine appointment — συνάντησις, an arranged meeting. Synantesis is exactly that: a scheduled, intentional, depth-first encounter with God. Deep worship. The weight of the Word. Space to stay as long as He remains.',
    verse: 'Amos 3:3',
    verseText: '"Can two walk together, except they be agreed?"',
    color: '#4A7A6A',
    img: '/images/gallery-congregation-worship.jpg',
  },
]

export default function EventsPage() {
  const [active, setActive] = useState(0)

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
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .gathering-tab { display:block; width:100%; text-align:left; background:none; border:none; border-top:1px solid rgba(201,168,76,0.15); padding:clamp(20px,2.5vw,32px) 0; cursor:pointer; transition:background 0.3s; }
        .gathering-tab:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .gathering-tab:hover { background:rgba(201,168,76,0.04); }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition:transform 1.2s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform:scale(1.04); }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background:'#080F08', minHeight:'92vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,180px) clamp(24px,4vw,80px) clamp(56px,7vw,100px)', position:'relative', overflow:'hidden' }}>
        {/* Background image */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <Image src="/images/gallery-congregation-worship.jpg" alt="Worship gathering" fill style={{ objectFit:'cover', opacity:0.18, objectPosition:'center' }} priority />
        </div>
        {/* Layered gradients */}
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to top, #080F08 50%, rgba(8,15,8,0.82) 75%, rgba(8,15,8,0.5) 100%)' }} />
        {/* Giant ambient gathering typography */}
        <div style={{ position:'absolute', right:'-1%', top:'15%', fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(90px,18vw,210px)', fontWeight:400, color:'rgba(201,168,76,0.035)', lineHeight:1, pointerEvents:'none', zIndex:2, userSelect:'none', letterSpacing:'-0.02em' }}>MDWE</div>
        <div style={{ position:'absolute', right:'8%', top:'44%', fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(60px,12vw,150px)', fontWeight:400, color:'rgba(201,168,76,0.025)', lineHeight:1, pointerEvents:'none', zIndex:2, userSelect:'none', letterSpacing:'-0.02em' }}>TSH</div>
        {/* Animated orb */}
        <div style={{ position:'absolute', width:'520px', height:'520px', borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', top:'-90px', right:'12%', animation:'float 11s ease-in-out infinite', pointerEvents:'none', zIndex:2 }} />
        {/* Vertical rule */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'clamp(24px,4vw,80px)', width:'1px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.15) 75%, transparent)', pointerEvents:'none', zIndex:3 }} />
        {/* Content */}
        <div style={{ position:'relative', zIndex:4, maxWidth:'900px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            Gatherings
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,118px)', fontWeight:400, lineHeight:0.92, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,44px)', letterSpacing:'-0.025em' }}>
            <span className="wc"><span className="wi">Meeting</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.07s', color:'#C9A84C' }}>God</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.14s' }}>Together.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.9, color:'rgba(250,247,242,0.5)', maxWidth:'480px', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>
            Three recurring gatherings. Three different atmospheres. One conviction — that encounter with God is the birthright of every believer.
          </p>
          {/* Gathering badges */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginTop:'clamp(32px,4vw,56px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}>
            {[
              { code:'MDWE', name:'Mid Day Worship Experience' },
              { code:'TSH', name:'The Slaughter House' },
              { code:'Synantesis', name:'The Divine Appointment' },
            ].map(g => (
              <div key={g.code} style={{ padding:'8px 18px', border:'1px solid rgba(201,168,76,0.15)', background:'rgba(201,168,76,0.05)' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(14px,1.6vw,18px)', fontWeight:400, color:'#C9A84C', lineHeight:1 }}>{g.code}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'9px', letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(250,247,242,0.3)', marginTop:'3px' }}>{g.name}</div>
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

      {/* ── Tab Selector ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(40px,5vw,80px)', alignItems:'start' }}>

          {/* Tab list */}
          <div className="rv-left">
            <div className="eyebrow" style={{ marginBottom:'clamp(24px,3vw,40px)' }}>The Gatherings</div>
            {gatherings.map((g, i) => (
              <button key={g.code} className="gathering-tab" onClick={() => setActive(i)}
                style={{ paddingLeft:'8px', paddingRight:'8px', background: active === i ? 'rgba(201,168,76,0.05)' : 'transparent' }}
              >
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:'16px' }}>
                  <div>
                    <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,4vw,42px)', fontWeight:400, color: active === i ? '#C9A84C' : '#0D1B0D', lineHeight:1.1, transition:'color 0.35s' }}>{g.code}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.1em', color:'#8A9A8A', marginTop:'4px' }}>{g.name}</div>
                  </div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color: active === i ? '#C9A84C' : '#8A9A8A', transition:'color 0.35s', whiteSpace:'nowrap' }}>
                    {active === i ? 'Selected' : 'View →'}
                  </div>
                </div>
                {active === i && <div style={{ height:'1px', background:'#C9A84C', marginTop:'16px', animation:'lineGrow 0.5s cubic-bezier(0.16,1,0.3,1) both' }} />}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="rv-right" key={active}>
            <div className="img-zoom" style={{ borderRadius:'2px', overflow:'hidden', aspectRatio:'16/9', position:'relative', marginBottom:'clamp(24px,3vw,40px)' }}>
              <Image src={gatherings[active].img} alt={gatherings[active].code} fill style={{ objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'rgba(13,27,13,0.3)' }} />
              <div style={{ position:'absolute', bottom:'24px', left:'24px' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,6vw,64px)', fontWeight:400, color:'#FAF7F2', lineHeight:1 }}>{gatherings[active].code}</div>
              </div>
            </div>

            <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'16px' }}>{gatherings[active].when}</div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(26px,3.5vw,40px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.2, marginBottom:'20px' }}>{gatherings[active].name}</h2>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'28px' }}>{gatherings[active].desc}</p>
            <div style={{ borderLeft:'2px solid #C9A84C', paddingLeft:'20px', marginBottom:'clamp(24px,3vw,40px)' }}>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'8px' }}>{gatherings[active].verse}</div>
              <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(16px,2vw,20px)', fontStyle:'italic', color:'#0D1B0D', lineHeight:1.6 }}>{gatherings[active].verseText}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Three at a Glance ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(40px,5vw,72px)' }}>At a Glance</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:'clamp(24px,4vw,56px)' }}>
            {gatherings.map((g, i) => (
              <div key={g.code} className={`rv d${i+1}`} style={{ borderTop:'1px solid rgba(201,168,76,0.15)', paddingTop:'clamp(24px,3vw,40px)' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(40px,6vw,60px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>{g.code}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'16px' }}>{g.when}</div>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', lineHeight:1.8, color:'rgba(250,247,242,0.5)' }}>{g.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stay Connected ── */}
      <section style={{ background:'#F0EBE1', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', textAlign:'center' }}>
        <div style={{ maxWidth:'700px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ justifyContent:'center', marginBottom:'clamp(24px,3vw,40px)' }}>Follow the Movement</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,60px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1, marginBottom:'clamp(20px,2.5vw,32px)' }}>
            Don't miss what God<br />is <em style={{ color:'#C9A84C' }}>doing here.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.8, color:'#3D4B3D', marginBottom:'clamp(32px,4vw,56px)' }}>
            Follow The Worship Nation on Instagram for meeting announcements, live updates, and moments captured from every gathering.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap' }}>
            <a href="https://www.instagram.com/theworshipnation_twn" target="_blank" rel="noopener noreferrer" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#2A4A2A'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1A2E1A'; (e.currentTarget as HTMLElement).style.transform='none' }}
            >@theworshipnation_twn</a>
            <a href="https://www.instagram.com/thesolomonsteph" target="_blank" rel="noopener noreferrer" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'14px 32px', border:'1px solid rgba(201,168,76,0.4)', color:'#3D4B3D', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.color='#3D4B3D' }}
            >@thesolomonsteph</a>
          </div>
        </div>
      </section>

      <style>{`@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
      <Footer />
    </main>
  )
}
