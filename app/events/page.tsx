'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const gatherings = [
  {
    num: '01',
    code: 'MDWE',
    name: 'Mid Day Worship Experience',
    when: 'Every Wednesday · 12:00 PM',
    tag: 'Midweek',
    desc: 'A pause in the middle of the week. Worship and prophetic devotion designed to interrupt your schedule with the presence of God. Come as you are — mid-day, mid-week — and encounter the God who is always present.',
    verse: 'Psalm 27:4',
    verseText: '"One thing have I asked of the LORD, that will I seek after: that I may dwell in the house of the LORD all the days of my life."',
    img: '/images/gallery-congregation-worship.jpg',
    imgPos: 'center top',
  },
  {
    num: '02',
    code: 'TSH',
    name: 'The Slaughter House',
    when: 'Last Saturday before the final Sunday',
    tag: 'Intercession',
    desc: 'The name is intentional. Drawn from the altar — the place where self is surrendered and God moves in power. High-intensity worship, intercession, and consecration. Those who come leave different.',
    verse: 'Romans 12:1',
    verseText: '"Present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship."',
    img: '/images/gallery-solomon-worship-intense.jpg',
    imgPos: 'center 20%',
  },
  {
    num: '03',
    code: 'Synantesis',
    name: 'The Divine Appointment',
    when: 'Last Sunday of every month',
    tag: 'Monthly',
    desc: 'From the Greek — συνάντησις — an arranged meeting. A scheduled, intentional, depth-first encounter with God. Deep worship. The weight of the Word. Space to stay as long as He remains.',
    verse: 'Amos 3:3',
    verseText: '"Can two walk together, except they be agreed?"',
    img: '/images/gallery-solomon-kneeling-surrender.jpg',
    imgPos: 'center 30%',
  },
]

export default function EventsPage() {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    setTimeout(() => setEntered(true), 80)
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv,.rv-left,.rv-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#0A0A0A', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(28px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv.is-visible{opacity:1;transform:none}
        .rv-left{opacity:0;transform:translateX(-32px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv-left.is-visible{opacity:1;transform:none}
        .rv-right{opacity:0;transform:translateX(32px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv-right.is-visible{opacity:1;transform:none}
        .d1{transition-delay:.1s}.d2{transition-delay:.2s}.d3{transition-delay:.3s}.d4{transition-delay:.4s}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes revealLine{from{width:0}to{width:100%}}
        .grow-line{animation:revealLine .8s cubic-bezier(.16,1,.3,1) both}
        .gathering-row{border-top:1px solid rgba(250,247,242,.07);display:grid;grid-template-columns:56px 1fr 1fr 1fr;align-items:start;gap:clamp(20px,3vw,48px);padding:clamp(28px,5vw,72px) 0;transition:border-color .4s}
        .gathering-row:hover{border-color:rgba(201,168,76,.25)}
        .gathering-row:last-child{border-bottom:1px solid rgba(250,247,242,.07)}
        @media(max-width:860px){.gathering-row{grid-template-columns:1fr 1fr;gap:clamp(16px,3vw,32px)}}
        @media(max-width:860px){.gathering-num{display:none!important}}
        @media(max-width:860px){.gathering-photo{display:none!important}}
        @media(max-width:540px){.gathering-row{grid-template-columns:1fr;padding-right:72px!important}}
        @media(max-width:860px){.hide-mobile{display:none!important}}
        @media(max-width:860px){.follow-grid{grid-template-columns:1fr!important}}
        @media(max-width:860px){.follow-img{display:none!important}}
        .social-link{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(250,247,242,.5);text-decoration:none;transition:color .3s}
        .social-link:hover{color:#C9A84C}
      `}</style>

      {/* ══ HERO — Full-bleed split ══ */}
      <section style={{ height:'100vh', minHeight:'640px', display:'grid', gridTemplateColumns:'55% 45%', position:'relative' }}>

        {/* LEFT — Photo side */}
        <div className="hero-photo" style={{ position:'relative', overflow:'hidden', minHeight:'unset' }}>
          <Image
            src="/images/gallery-congregation-worship.jpg"
            alt="Worship gathering"
            fill
            priority
            style={{
              objectFit:'cover',
              objectPosition:'center top',
              transform: entered ? 'scale(1.0)' : 'scale(1.06)',
              transition:'transform 1.8s cubic-bezier(.16,1,.3,1)',
            }}
          />
          {/* Subtle right-edge vignette only */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, transparent 50%, rgba(10,10,10,0.7) 100%)' }} />
          {/* Bottom label on photo */}
          <div style={{ position:'absolute', bottom:'clamp(28px,4vw,48px)', left:'clamp(24px,4vw,48px)' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(250,247,242,0.4)' }}>
              Lagos, Nigeria
            </div>
          </div>
        </div>

        {/* RIGHT — Text panel */}
        <div className="hero-text" style={{ background:'#0A0A0A', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(100px,12vw,140px) clamp(32px,5vw,60px) clamp(48px,7vw,80px)' }}>
          <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(24px)', transition:'opacity 1s .3s, transform 1s .3s' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(28px,4vw,52px)' }}>
              The Worship Nation
            </div>
          </div>

          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:.92, color:'#FAF7F2', margin:'0 0 clamp(28px,4vw,48px)', letterSpacing:'-.02em',
            opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(32px)', transition:'opacity 1s .5s, transform 1s .5s',
            fontSize:'clamp(52px,8vw,96px)'
          }}>
            Three<br />
            <em style={{ color:'#C9A84C' }}>Gatherings.</em><br />
            One God.
          </h1>

          <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(20px)', transition:'opacity 1s .75s, transform 1s .75s' }}>
            {/* Gathering list */}
            {gatherings.map((g, i) => (
              <div key={g.code} style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'14px' }}>
                <div style={{ width:'20px', height:'1px', background:'rgba(201,168,76,0.35)', flexShrink:0 }} />
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.24em', textTransform:'uppercase', color:'rgba(250,247,242,0.35)' }}>{g.code}</span>
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'rgba(250,247,242,0.18)' }}>·</span>
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'rgba(250,247,242,0.22)' }}>{g.when}</span>
              </div>
            ))}

            {/* Scroll cue */}
            <div style={{ marginTop:'clamp(32px,5vw,56px)', display:'flex', alignItems:'center', gap:'16px' }}>
              <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, rgba(201,168,76,.4), transparent)', flexShrink:0 }} />
              <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.4)' }}>Scroll to explore</span>
            </div>
          </div>
        </div>

        {/* Mobile override */}
        <style>{`@media(max-width:700px){section:first-of-type{grid-template-columns:1fr!important;height:auto!important;min-height:100vh!important}.hero-photo{min-height:52vw!important}.hero-text{padding:32px 80px 48px 24px!important}}`}</style>
      </section>

      {/* ══ GATHERINGS — Full-width rows on black ══ */}
      <section style={{ background:'#0A0A0A', padding:'0 clamp(24px,4vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          {gatherings.map((g, i) => (
            <div key={g.code} className={`gathering-row rv d${i % 4 + 1}`}>

              {/* Number */}
              <div className="rv gathering-num">
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'rgba(201,168,76,0.4)', letterSpacing:'.2em' }}>{g.num}</div>
              </div>

              {/* Code + name + tag */}
              <div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,6vw,72px)', fontWeight:400, color:'#FAF7F2', lineHeight:1, marginBottom:'10px' }}>{g.code}</div>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(250,247,242,0.35)', marginBottom:'12px' }}>{g.name}</div>
                <div style={{ display:'inline-block', padding:'4px 12px', border:'1px solid rgba(201,168,76,0.2)', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)' }}>{g.tag}</div>
              </div>

              {/* When + desc */}
              <div>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', marginBottom:'16px' }}>{g.when}</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.42)', margin:0 }}>{g.desc}</p>
              </div>

              {/* Photo + verse */}
              <div className="gathering-photo">
                <div style={{ aspectRatio:'4/3', position:'relative', overflow:'hidden', marginBottom:'20px' }}>
                  <Image src={g.img} alt={g.code} fill style={{ objectFit:'cover', objectPosition:g.imgPos }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.25)' }} />
                </div>
                <div style={{ borderLeft:'1px solid rgba(201,168,76,0.3)', paddingLeft:'16px' }}>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'8px' }}>{g.verse}</div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,1.4vw,17px)', fontStyle:'italic', color:'rgba(250,247,242,0.55)', lineHeight:1.6 }}>{g.verseText}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ══ FOLLOW — Pure black, no green ══ */}
      <section style={{ background:'#0A0A0A', borderTop:'1px solid rgba(250,247,242,.05)', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div className="follow-grid" style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,100px)', alignItems:'center' }}>
          <div className="rv-left">
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(20px,3vw,36px)' }}>
              Follow the Movement
            </div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(32px,5vw,64px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, margin:'0 0 clamp(20px,2.5vw,32px)' }}>
              Don't miss what<br />God is <em style={{ color:'#C9A84C' }}>doing here.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.4)', margin:'0 0 clamp(28px,4vw,48px)' }}>
              Follow The Worship Nation for meeting announcements, live moments, and everything happening in the gatherings.
            </p>
            <div className="rv d3" style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <a href="https://www.instagram.com/theworshipnation_twn" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'13px 28px', border:'1px solid rgba(201,168,76,0.35)', color:'#C9A84C', textDecoration:'none', transition:'all .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.35)' }}
              >@theworshipnation_twn ↗</a>
              <a href="https://www.instagram.com/thesolomonsteph" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'13px 28px', border:'1px solid rgba(250,247,242,.1)', color:'rgba(250,247,242,.45)', textDecoration:'none', transition:'all .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.3)'; (e.currentTarget as HTMLElement).style.color='rgba(201,168,76,.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(250,247,242,.1)'; (e.currentTarget as HTMLElement).style.color='rgba(250,247,242,.45)' }}
              >@thesolomonsteph ↗</a>
            </div>
          </div>
          <div className="rv-right follow-img" style={{ aspectRatio:'1', position:'relative', overflow:'hidden' }}>
            <Image src="/images/gallery-solomon-worship-raise.jpg" alt="Solomon Stephen in worship" fill style={{ objectFit:'cover', objectPosition:'center top' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, transparent 60%, rgba(10,10,10,0.6) 100%)' }} />
          </div>
        </div>
      </section>

 