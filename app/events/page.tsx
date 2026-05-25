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
      <section style={{ background:'#1A2E1A', padding:'clamp(140px,16vw,200px) clamp(24px,4vw,80px) clamp(72px,9vw,120px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <Image src="/images/gallery-congregation-worship.jpg" alt="Worship gathering" fill style={{ objectFit:'cover', opacity:0.25, objectPosition:'center' }} priority />
        </div>
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to top, #1A2E1A 40%, rgba(26,46,26,0.4) 80%, transparent)' }} />
        <div style={{ position:'relative', zIndex:2, maxWidth:'900px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)' }}>
            <span style={{ width:28, height:1, background:'rgba(201,168,76,0.7)', display:'inline-block' }} />
            Gatherings
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,110px)', fontWeight:400, lineHeight:1, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,40px)', letterSpacing:'-0.02em' }}>
            <span className="wc"><span className="wi">Meeting</span></span>{" "}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.07s', color:'#C9A84C' }}>God</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.14s' }}>Together.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.8, color:'rgba(250,247,242,0.6)', maxWidth:'520px' }}>
            Three recurring gatherings. Three different atmospheres. One conviction — that encounter with God is the birthright of every believer.
          </p>
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
