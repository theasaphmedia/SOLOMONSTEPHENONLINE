'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const milestones = [
  { year: '2010', title: 'Called to Ministry',        desc: 'Received the call to worship leadership in Lagos — stepping into the prophetic sound God placed within.' },
  { year: '2014', title: 'Founded The Worship Nation', desc: 'Established TWN — a movement devoted to raising true worshippers across Nigeria and beyond.' },
  { year: '2018', title: 'First Live Album',           desc: 'The first recording captured the sound of TWN gatherings, touching lives across the nation.' },
  { year: '2020', title: 'TWN Studios Opens',          desc: 'A world-class recording studio opens in Ajah, Lagos — a consecrated space for artists and ministers.' },
  { year: '2021', title: 'Author: The Cost of Ignorance', desc: 'First published work — a prophetic call to pursue knowledge of God with urgency and intentionality.' },
  { year: '2023', title: 'Sons, Not Slaves',           desc: 'Two devotional volumes anchor thousands of believers in the identity of sonship before the Father.' },
  { year: '2024', title: 'Expanding the Vision',       desc: 'TAI Digital, expanded studio operations, global digital ministry — building for the generations ahead.' },
]

const callings = [
  { num: '01', sub: 'The Worship Nation', title: 'Ministry',  desc: 'Prophetic gatherings that shift atmospheres — weekly and monthly across Lagos. Every meeting is an encounter.', href: '/events'      },
  { num: '02', sub: 'TWN Studios',        title: 'Studio',    desc: 'World-class recording and production in Ajah, Lagos — built for artists and ministers who refuse to compromise.', href: '/studios'     },
  { num: '03', sub: 'Published Works',    title: 'Author',    desc: 'Books rooted in biblical Hebrew and Greek that transform believers from the inside out. Words that outlast moments.', href: '/books'       },
  { num: '04', sub: 'TAI Digital',        title: 'Digital',   desc: 'Premium websites, apps and brand identities for businesses that refuse to be ordinary. Excellence is the standard.', href: '/tai-digital' },
]

export default function AboutPage() {
  const [activeIdx, setActiveIdx] = useState(0)
  const tlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generic scroll reveal
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))

    // Timeline active tracking
    const steps = tlRef.current?.querySelectorAll<HTMLElement>('.tl-step')
    if (steps) {
      const stepObs = new IntersectionObserver(
        entries => entries.forEach(e => {
          if (e.isIntersecting) setActiveIdx(Number((e.target as HTMLElement).dataset.i ?? 0))
        }),
        { threshold: 0.5 }
      )
      steps.forEach(el => stepObs.observe(el))
      return () => { obs.disconnect(); stepObs.disconnect() }
    }
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#060c06', overflowX: 'hidden' }}>
      <style>{`
        /* ── Reveal system ── */
        .rv { opacity:0; transform:translateY(40px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv.d1 { transition-delay:0.12s; }
        .rv.d2 { transition-delay:0.22s; }
        .rv.d3 { transition-delay:0.32s; }

        /* ── Word-clip hero animation ── */
        .wc { display:inline-block; overflow:hidden; }
        .wi { display:inline-block; animation:wi 1s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes wi { from{transform:translateY(108%)} to{transform:translateY(0)} }

        /* ── Calling strip ── */
        .call-strip {
          display: grid;
          grid-template-columns: clamp(120px,16vw,220px) 1fr;
          border-top: 1px solid rgba(201,168,76,0.07);
          padding: clamp(36px,5vw,72px) clamp(24px,4vw,56px);
          transition: background 0.55s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .call-strip::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.35), transparent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
        }
        .call-strip:hover { background: rgba(201,168,76,0.018); }
        .call-strip:hover::after { transform: scaleX(1); }
        .call-strip:hover .call-arrow { transform: translateX(6px); }
        .call-arrow { transition: transform 0.45s cubic-bezier(0.16,1,0.3,1); }

        /* ── Timeline ── */
        .tl-step { padding: clamp(44px,5vw,72px) 0; border-top: 1px solid rgba(201,168,76,0.07); }
        .tl-step:last-child { border-bottom: 1px solid rgba(201,168,76,0.07); }

        /* ── Responsive ── */
        @media (max-width:860px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-photo  { min-height: 60svh !important; order: -1; }
          .bio-grid    { grid-template-columns: 1fr !important; }
          .bio-photo   { min-height: 50vw !important; }
          .tl-layout   { grid-template-columns: 1fr !important; }
          .sticky-yr   { display:none !important; }
          .call-strip  { grid-template-columns: 1fr !important; gap: 20px; }
        }
      `}</style>

      {/* ════════════════════════════════════
          HERO — split panel
      ════════════════════════════════════ */}
      <section style={{ minHeight:'100svh', display:'grid', gridTemplateColumns:'1fr 1fr', position:'relative' }} className="hero-grid">

        {/* Left: text */}
        <div style={{ background:'#060c06', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(24px,4vw,56px)', paddingTop:'140px', paddingBottom:'clamp(56px,7vw,100px)', position:'relative', zIndex:10 }}>

          {/* Eyebrow */}
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'10px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'40px', animationDelay:'0.05s' }} className="wc">
            <span className="wi" style={{ animationDelay:'0.05s' }}>Gospel Minister · Worship Leader · Author</span>
          </p>

          {/* Name */}
          <div style={{ marginBottom:'40px', lineHeight:0.88 }}>
            <div className="wc" style={{ display:'block', marginBottom:'6px' }}>
              <span className="wi font-display" style={{ fontSize:'clamp(52px,6.5vw,100px)', fontWeight:300, color:'#F5F0E8', letterSpacing:'-2.5px', animationDelay:'0.18s' }}>Solomon</span>
            </div>
            <div className="wc" style={{ display:'block' }}>
              <span className="wi font-display" style={{ fontSize:'clamp(52px,6.5vw,100px)', fontWeight:700, fontStyle:'italic', letterSpacing:'-2.5px', animationDelay:'0.3s', background:'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Stephen.</span>
            </div>
          </div>

          {/* Gold rule */}
          <div style={{ width:'48px', height:'1px', background:'linear-gradient(90deg,#C9A84C,transparent)', marginBottom:'32px', animation:'wi 0.7s 0.44s both' }} />

          <p style={{ fontFamily:'Inter,sans-serif', fontSize:'14px', lineHeight:1.95, color:'rgba(245,240,232,0.4)', maxWidth:'380px', marginBottom:'44px', animation:'wi 0.9s 0.5s both' }}>
            Operating at the intersection of{' '}
            <span style={{ color:'rgba(245,240,232,0.8)' }}>worship, word, craft, and innovation</span>{' '}
            — building institutions, not just moments.
          </p>

          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', animation:'wi 0.9s 0.6s both' }}>
            <Link href="/music"   className="btn-gold-pill">Listen Now</Link>
            <Link href="/contact" className="btn-outline-pill">Get In Touch</Link>
          </div>

          {/* Scroll indicator */}
          <div style={{ position:'absolute', bottom:'36px', right:'clamp(24px,4vw,56px)', display:'flex', alignItems:'center', gap:'10px' }}>
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.3)' }}>Scroll</span>
            <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)', animation:'scrollBar 2s ease-in-out infinite' }} />
          </div>
          <style>{`@keyframes scrollBar{0%,100%{opacity:0.35}50%{opacity:0.9}}`}</style>
        </div>

        {/* Right: full-bleed photo */}
        <div className="hero-photo" style={{ position:'relative', overflow:'hidden', minHeight:'100svh' }}>
          <Image
            src="/images/solomon-green-suit-hero.png"
            alt="Solomon Stephen"
            fill priority
            style={{ objectFit:'cover', objectPosition:'60% top' }}
          />
          {/* Blend into left panel */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,#060c06 0%,rgba(6,12,6,0.35) 28%,transparent 60%)' }} />
          {/* Bottom fade */}
          <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', background:'linear-gradient(to top,#060c06,transparent)' }} />
        </div>
      </section>

      {/* ════════════════════════════════════
          MANIFESTO — full-bleed statement
      ════════════════════════════════════ */}
      <section style={{ padding:'clamp(100px,13vw,200px) clamp(24px,4vw,56px)', background:'#040a04', borderTop:'1px solid rgba(201,168,76,0.05)', position:'relative', overflow:'hidden' }}>
        {/* Decorative oversized quote */}
        <div aria-hidden style={{ position:'absolute', top:'-60px', left:'-10px', fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(240px,30vw,480px)', fontWeight:700, color:'rgba(201,168,76,0.022)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>&ldquo;</div>

        <div className="rv" style={{ position:'relative', zIndex:1 }}>
          <p className="font-display" style={{ fontSize:'clamp(34px,5.5vw,90px)', fontWeight:300, fontStyle:'italic', color:'#F5F0E8', lineHeight:1.08, letterSpacing:'-2px', maxWidth:'1200px' }}>
            Worship is not a moment —{' '}
            <span style={{ background:'linear-gradient(135deg,#E8C96A,#C9A84C,#D4B85E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:700 }}>
              it is a movement.
            </span>
          </p>
          <div style={{ display:'flex', alignItems:'center', gap:'16px', marginTop:'48px' }}>
            <div style={{ width:'40px', height:'1px', background:'rgba(201,168,76,0.4)' }} />
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>Solomon Stephen</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BIO — editorial spread, no container
      ════════════════════════════════════ */}
      <section style={{ background:'#060c06', borderTop:'1px solid rgba(201,168,76,0.05)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'0.8fr 1.2fr' }} className="bio-grid">

          {/* Photo — bleeds to left edge of viewport */}
          <div className="bio-photo" style={{ position:'relative', minHeight:'clamp(420px,65vh,780px)', overflow:'hidden' }}>
            <Image
              src="/images/solomon-green-suit-hero.png"
              alt="Solomon Stephen"
              fill
              style={{ objectFit:'cover', objectPosition:'38% center' }}
            />
            {/* Right-side fade into page bg */}
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right,transparent 40%,#060c06 100%)' }} />
            <div style={{ position:'absolute', top:0, left:0, right:0, height:'30%', background:'linear-gradient(to bottom,#060c06,transparent)' }} />
          </div>

          {/* Editorial text — generous inner padding */}
          <div style={{ padding:'clamp(60px,9vw,140px) clamp(24px,4vw,56px) clamp(60px,9vw,140px) clamp(32px,4vw,60px)' }}>

            <div className="rv" style={{ marginBottom:'14px' }}>
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>The Story</span>
            </div>

            <h2 className="font-display rv d1" style={{ fontSize:'clamp(38px,4.8vw,72px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-1.8px', color:'#F5F0E8', marginBottom:'40px' }}>
              Rooted in Culture.<br />
              <span style={{ fontStyle:'italic', fontWeight:700, background:'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Reaching Every Tribe.</span>
            </h2>

            <div className="rv d2" style={{ width:'40px', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'36px' }} />

            <div className="rv d2">
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(14px,1.2vw,16px)', lineHeight:2, color:'rgba(245,240,232,0.6)', marginBottom:'24px', fontWeight:300 }}>
                Solomon Stephen is a gospel artist, songwriter, and minister who creates atmospheres of authentic worship. Rooted in Edo, his musical identity was shaped by life across Kano, Enugu, Ibadan, and Lagos — blending cultural depth with a heart that reaches every tribe and tongue.
              </p>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(13px,1.1vw,15px)', lineHeight:2, color:'rgba(245,240,232,0.34)', marginBottom:'24px', fontWeight:300 }}>
                Known for soul-stirring songs like{' '}
                <em style={{ color:'rgba(245,240,232,0.6)', fontStyle:'italic' }}>&ldquo;The Mighty God,&rdquo; &ldquo;Awesome God,&rdquo; &ldquo;Alagbada Ina,&rdquo; &ldquo;AIKU,&rdquo;</em>{' '}
                and{' '}
                <em style={{ color:'rgba(245,240,232,0.6)', fontStyle:'italic' }}>&ldquo;CROSSOVER,&rdquo;</em>{' '}
                his music draws listeners into deep encounters with God&apos;s presence.
              </p>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(13px,1.1vw,15px)', lineHeight:2, color:'rgba(245,240,232,0.34)', marginBottom:'48px', fontWeight:300 }}>
                He leads The Worship Nation (TWN) — a movement devoted to raising true worshippers and igniting intimacy with the Father. Through gatherings such as the Mid Day Worship Experience, TSH, and Synantesis, TWN has become a space of surrender, revival, and transformation.
              </p>
            </div>

            {/* Selected works */}
            <div className="rv d3" style={{ borderTop:'1px solid rgba(201,168,76,0.08)', paddingTop:'32px' }}>
              <p style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.38)', marginBottom:'18px' }}>Selected Works</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                {['The Mighty God','Awesome God','Alagbada Ina','AIKU','CROSSOVER','There Is No One'].map(s => (
                  <span key={s} style={{ padding:'6px 14px', border:'1px solid rgba(201,168,76,0.1)', color:'rgba(245,240,232,0.28)', fontSize:'11px', fontFamily:'Inter,sans-serif', letterSpacing:'0.04em' }}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          JOURNEY — sticky scroll timeline
      ════════════════════════════════════ */}
      <section style={{ background:'#040a04', borderTop:'1px solid rgba(201,168,76,0.05)', padding:'clamp(80px,10vw,150px) clamp(24px,4vw,56px)' }}>

        {/* Section heading */}
        <div className="rv" style={{ marginBottom:'80px' }}>
          <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>The Journey</span>
          <h2 className="font-display" style={{ fontSize:'clamp(44px,5.5vw,80px)', fontWeight:300, lineHeight:0.9, letterSpacing:'-2.5px', color:'#F5F0E8', marginTop:'16px' }}>
            Every Season,<br />
            <span style={{ fontStyle:'italic', fontWeight:700, color:'rgba(201,168,76,0.9)' }}>A Seed.</span>
          </h2>
        </div>

        {/* Two-column: sticky year + scrolling steps */}
        <div ref={tlRef} style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'clamp(40px,8vw,120px)', alignItems:'start' }} className="tl-layout">

          {/* Sticky year panel */}
          <div className="sticky-yr" style={{ position:'sticky', top:'50vh', transform:'translateY(-50%)' }}>
            <div className="font-display" style={{ fontSize:'clamp(80px,11vw,160px)', fontWeight:700, lineHeight:1, letterSpacing:'-5px', color:'rgba(201,168,76,0.07)', transition:'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
              {milestones[activeIdx].year}
            </div>
            <div style={{ fontFamily:'Inter,sans-serif', fontSize:'10px', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,168,76,0.35)', marginTop:'10px' }}>
              {milestones[activeIdx].title}
            </div>
            <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,0.25)', marginTop:'20px' }} />
          </div>

          {/* Milestone steps */}
          <div>
            {milestones.map((m, i) => (
              <div key={m.year} className="tl-step" data-i={String(i)}>
                <div style={{ display:'flex', gap:'clamp(24px,4vw,48px)', alignItems:'flex-start' }}>
                  <div style={{ flexShrink:0, paddingTop:'4px' }}>
                    <span className="font-display" style={{ fontSize:'clamp(22px,2.5vw,36px)', fontWeight:300, color:'rgba(201,168,76,0.3)', lineHeight:1 }}>{m.year}</span>
                  </div>
                  <div>
                    <h3 className="font-display" style={{ fontSize:'clamp(20px,2vw,30px)', fontWeight:600, color:'#F5F0E8', marginBottom:'14px', lineHeight:1, letterSpacing:'-0.5px' }}>{m.title}</h3>
                    <p style={{ fontFamily:'Inter,sans-serif', fontSize:'14px', color:'rgba(245,240,232,0.35)', lineHeight:1.85, margin:0, maxWidth:'480px' }}>{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CALLINGS — full-width horizontal strips
      ════════════════════════════════════ */}
      <section style={{ background:'#060c06', borderTop:'1px solid rgba(201,168,76,0.05)' }}>

        {/* Heading */}
        <div style={{ padding:'clamp(80px,10vw,140px) clamp(24px,4vw,56px) 0', marginBottom:'clamp(48px,6vw,80px)' }}>
          <div className="rv" style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'18px' }}>
            <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>The Callings</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize:'clamp(44px,6vw,88px)', fontWeight:300, lineHeight:0.88, letterSpacing:'-2.5px', color:'#F5F0E8' }}>
            Every Assignment<br />
            <span style={{ fontStyle:'italic', fontWeight:700, background:'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Inhabited.</span>
          </h2>
        </div>

        {/* Strips */}
        <div>
          {callings.map((c, i) => (
            <Link key={c.title} href={c.href} className="call-strip" style={{ background: i % 2 === 1 ? 'rgba(255,255,255,0.008)' : 'transparent' }}>
              {/* Left: ghost number */}
              <div style={{ display:'flex', flexDirection:'column', justifyContent:'space-between', paddingRight:'clamp(20px,3vw,40px)' }}>
                <div className="font-display" style={{ fontSize:'clamp(64px,9vw,130px)', fontWeight:700, lineHeight:1, color:'rgba(201,168,76,0.06)', letterSpacing:'-4px', transition:'color 0.55s' }}>{c.num}</div>
                <div>
                  <div style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.38)', marginBottom:'10px' }}>{c.sub}</div>
                  <div style={{ width:'0', height:'1px', background:'linear-gradient(90deg,#C9A84C,transparent)', transition:'width 0.55s cubic-bezier(0.16,1,0.3,1)' }} className="call-title-line" />
                </div>
              </div>

              {/* Right: title, desc, arrow */}
              <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:'clamp(14px,2vw,24px)' }}>
                <h3 className="font-display" style={{ fontSize:'clamp(34px,4.5vw,68px)', fontWeight:300, color:'#F5F0E8', lineHeight:0.92, letterSpacing:'-1.5px', margin:0 }}>{c.title}</h3>
                <p style={{ fontFamily:'Inter,sans-serif', fontSize:'clamp(13px,1.1vw,15px)', color:'rgba(245,240,232,0.32)', lineHeight:1.85, maxWidth:'520px', margin:0 }}>{c.desc}</p>
                <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                  <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>Explore</span>
                  <span className="call-arrow" style={{ color:'rgba(201,168,76,0.5)', fontSize:'14px' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA — forest green, cinematic
      ════════════════════════════════════ */}
      <section style={{ padding:'clamp(100px,13vw,200px) clamp(24px,4vw,56px)', background:'#1A2E1A', position:'relative', overflow:'hidden', borderTop:'1px solid rgba(201,168,76,0.06)' }}>
        {/* Radial gold glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 65% 75% at 50% 50%,rgba(201,168,76,0.09) 0%,transparent 65%)', pointerEvents:'none' }} />
        {/* Corner brackets */}
        {(['top-left','top-right','bottom-left','bottom-right'] as const).map(pos => {
          const [v, h] = pos.split('-') as ['top'|'bottom','left'|'right']
          return (
            <div key={pos} style={{ position:'absolute', [v]:'36px', [h]:'36px', width:'44px', height:'44px', [`border${v[0].toUpperCase()+v.slice(1)}`]:'1px solid rgba(201,168,76,0.14)', [`border${h[0].toUpperCase()+h.slice(1)}`]:'1px solid rgba(201,168,76,0.14)' }} />
          )
        })}

        <div style={{ position:'relative', zIndex:10, textAlign:'center', maxWidth:'680px', margin:'0 auto' }}>
          <div className="rv" style={{ marginBottom:'24px' }}>
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)' }}>The Worship Nation</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize:'clamp(44px,6.5vw,96px)', fontWeight:300, lineHeight:0.88, letterSpacing:'-2.5px', color:'#F5F0E8', marginBottom:'32px' }}>
            You Were Made<br />
            <span style={{ fontStyle:'italic', fontWeight:700, background:'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>for More.</span>
          </h2>
          <div className="rv d2" style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom:'32px' }} />
          <p className="rv d2" style={{ fontFamily:'Inter,sans-serif', fontSize:'15px', lineHeight:1.95, color:'rgba(245,240,232,0.35)', marginBottom:'52px' }}>
            There&apos;s a gathering with your name on it. A song yet to be recorded.<br />A book waiting to be read. The door is always open.
          </p>
          <div className="rv d3" style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/events"  className="btn-gold-pill"    style={{ padding:'17px 52px', fontSize:'10px', letterSpacing:'0.16em' }}>Join a Gathering</Link>
            <Link href="/contact" className="btn-outline-pill" style={{ padding:'17px 52px', fontSize:'10px', letterSpacing:'0.16em' }}>Get In Touch</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
