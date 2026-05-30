'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const callings = [
  { num: '01', sub: 'The Worship Nation',  title: 'Minister',   desc: 'Prophetic gatherings that shift atmospheres — weekly and monthly across Lagos. Every meeting, an encounter with the living God.', href: '/events'  },
  { num: '02', sub: 'Worship & Music',     title: 'Worshipper', desc: 'Six studio releases and counting. Songs born in the secret place, released into the congregation. A sound that carries the weight of eternity.', href: '/music'   },
  { num: '03', sub: 'Published Works',     title: 'Author',     desc: 'Books rooted in biblical Hebrew and Greek that transform believers from the inside out. Words that outlast the moment they were written.', href: '/books'   },
  { num: '04', sub: 'TWN Studios',         title: 'Founder',    desc: 'A consecrated space in Ajah, Lagos where craft meets calling. Built for artists and ministers who refuse to separate excellence from anointing.', href: '/studios' },
]

const stats = [
  { value: '6+',  label: 'Studio Albums' },
  { value: '4+',  label: 'Books Published' },
  { value: '3',   label: 'Active Ministries' },
  { value: '10+', label: 'Years of Ministry' },
]

const ministries = [
  { title:'MDWE',       full:'Mid Day Worship Experience',    when:'Every Wednesday · 12:00 PM',            desc:'A worship and prophetic devotion gathering designed to shift the atmosphere of your week. Come as you are; leave transformed.' },
  { title:'TSH',        full:'The Slaughter House',           when:'Last Saturday before final Sunday',       desc:'A high-intensity gathering of worship, intercession, and consecration. Named for the altar — where self is surrendered and God moves.' },
  { title:'Synantesis', full:'The Divine Appointment',        when:'Last Sunday of every month',             desc:'From the Greek word for "divine appointment." A meeting with God — deep-dive worship and the Word that carries weight beyond the moment.' },
]

export default function AboutPage() {
  const [hoveredCall, setHoveredCall] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv,.rv-left,.rv-right,.rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(36px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv.is-visible{opacity:1;transform:none}
        .rv-left{opacity:0;transform:translateX(-48px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv-left.is-visible{opacity:1;transform:none}
        .rv-right{opacity:0;transform:translateX(48px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv-right.is-visible{opacity:1;transform:none}
        .rv-scale{opacity:0;transform:scale(.95);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv-scale.is-visible{opacity:1;transform:none}
        .d1{transition-delay:.07s}.d2{transition-delay:.14s}.d3{transition-delay:.21s}.d4{transition-delay:.28s}.d5{transition-delay:.35s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(.16,1,.3,1) both}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes pulse-slow{0%,100%{opacity:.25;transform:scale(1)}50%{opacity:.5;transform:scale(1.05)}}
        @keyframes lineExpand{from{scaleX:0}to{scaleX:1}}
        @keyframes scrollCue{0%,100%{opacity:.3}50%{opacity:.9}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px}
        .eyebrow::before{content:'';width:28px;height:1px;background:#C9A84C;flex-shrink:0}
        .img-zoom{overflow:hidden}
        .img-zoom img{transition:transform 1.2s cubic-bezier(.16,1,.3,1)}
        .img-zoom:hover img{transform:scale(1.04)!important}
        .calling-strip{border-top:1px solid rgba(201,168,76,.12);padding:clamp(22px,2.8vw,44px) 0;transition:background .4s;cursor:pointer;text-decoration:none;display:block}
        .calling-strip:hover{background:rgba(201,168,76,.04)}
        .calling-strip:last-child{border-bottom:1px solid rgba(201,168,76,.12)}
        .gold-reveal{height:1px;background:#C9A84C;transform-origin:left;transform:scaleX(0);transition:transform .55s cubic-bezier(.16,1,.3,1)}
        .calling-strip:hover .gold-reveal{transform:scaleX(1)}
        .stat-block{text-align:center;padding:clamp(28px,3.5vw,52px) clamp(16px,2vw,32px);border-right:1px solid rgba(201,168,76,.1)}
        .stat-block:last-child{border-right:none}
        .ministry-card{background:#0D1B0D;padding:clamp(32px,4vw,56px) clamp(24px,3vw,48px);position:relative;overflow:hidden;transition:background .4s}
        .ministry-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:#C9A84C;transform:scaleX(0);transform-origin:left;transition:transform .55s cubic-bezier(.16,1,.3,1)}
        .ministry-card:hover{background:#121f12}
        .ministry-card:hover::before{transform:scaleX(1)}
        .about-hero{display:grid;grid-template-columns:1fr 1fr;min-height:100vh}
        @media(max-width:768px){.about-hero{grid-template-columns:1fr}.about-hero-photo{min-height:65vw!important}}
        @media(max-width:900px){
          .bio-split{grid-template-columns:1fr !important}
          .author-split{grid-template-columns:1fr !important}
          .book-grid{grid-template-columns:1fr 1fr !important}
          .stat-grid{grid-template-columns:1fr 1fr !important}
          .stat-block{border-right:none !important;border-bottom:1px solid rgba(201,168,76,.1)}
          .stat-block:last-child{border-bottom:none}
          .ministry-grid{grid-template-columns:1fr !important}
          .calling-grid{grid-template-columns:40px 1fr !important;gap:12px !important}
          .calling-desc{display:none !important}
          .calling-cta{display:none !important}
        }
        @media(max-width:600px){.bio-photo{min-height:80vw !important}}
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ height:'100vh', minHeight:'640px', position:'relative', overflow:'hidden', background:'#070D07' }}>
        {/* Full-bleed photo */}
        <Image src="/images/gallery-solomon-kneeling-surrender.jpg" alt="" fill priority style={{ objectFit:'cover', objectPosition:'center bottom' }} />
        {/* Bottom-to-top fade */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(7,13,7,0.97) 0%, rgba(7,13,7,0.80) 28%, rgba(7,13,7,0.30) 58%, transparent 82%)', zIndex:1 }} />
        {/* Left-side fade */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(7,13,7,0.88) 0%, rgba(7,13,7,0.52) 32%, rgba(7,13,7,0.10) 58%, transparent 75%)', zIndex:1 }} />
        {/* Top navbar fade */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'220px', background:'linear-gradient(to bottom, rgba(7,13,7,0.35) 0%, transparent 100%)', zIndex:1 }} />

        <div style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,72px) clamp(48px,7vw,80px)' }}><div style={{ maxWidth:'920px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,.6)', marginBottom:'clamp(28px,3.5vw,52px)', animation:'heroIn 1s cubic-bezier(.16,1,.3,1) .25s both' }}>
            The Story of Solomon Stephen
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(60px,12vw,130px)', fontWeight:400, lineHeight:.9, color:'#FAF7F2', margin:'0 0 clamp(28px,3.5vw,52px)', letterSpacing:'-.025em' }}>
            <span className="wc"><span className="wi">Gospel</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'.07s' }}>Minister.</span></span>
            <br />
            <span className="wc"><span className="wi" style={{ animationDelay:'.16s', color:'#C9A84C' }}>Worshipper.</span></span>
          </h1>
          <div style={{ display:'flex', flexWrap:'wrap', gap:'clamp(12px,1.5vw,20px)', animation:'heroIn 1s cubic-bezier(.16,1,.3,1) .55s both' }}>
            {['Gospel Minister','Worship Leader','Music Producer','Author','Studio Founder'].map(tag => (
              <span key={tag} style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(250,247,242,.55)', border:'1px solid rgba(250,247,242,.12)', padding:'7px 16px', borderRadius:'1px' }}>{tag}</span>
            ))}
          </div>
        </div></div>

        <div style={{ position:'absolute', bottom:'clamp(32px,4vw,52px)', right:'clamp(24px,5vw,80px)', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', animation:'heroIn 1s cubic-bezier(.16,1,.3,1) .85s both' }}>
          <span style={{ fontFamily:'DM Sans', fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(250,247,242,.22)', writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:'1px', height:'52px', background:'linear-gradient(to bottom, rgba(201,168,76,.5), transparent)', animation:'scrollCue 2.2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section style={{ background:'#111D11', borderTop:'1px solid rgba(201,168,76,.08)', borderBottom:'1px solid rgba(201,168,76,.08)' }}>
        <div className="stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', maxWidth:'1200px', margin:'0 auto' }}>
          {stats.map((s, i) => (
            <div key={i} className={`stat-block rv d${i + 1}`}>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(48px,7vw,88px)', fontWeight:400, color:'#C9A84C', lineHeight:1 }}>{s.value}</div>
              <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.24em', textTransform:'uppercase', color:'rgba(250,247,242,.35)', marginTop:'12px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ BIO SPLIT ══ */}
      <section style={{ background:'#FAF7F2', overflow:'hidden' }}>
        <div className="bio-split" style={{ display:'grid', gridTemplateColumns:'44% 56%', minHeight:'85vh' }}>

          {/* Photo */}
          <div className="bio-photo img-zoom rv-scale" style={{ position:'relative', minHeight:'clamp(480px,65vh,860px)' }}>
            <Image src="/images/solomon-photo.png" alt="Solomon Stephen" fill style={{ objectFit:'cover', objectPosition:'center bottom' }} />
            {/* Corner brackets */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
              <div style={{ position:'absolute', top:'clamp(20px,3vw,40px)', left:'clamp(20px,3vw,40px)', width:52, height:52, borderTop:'2px solid rgba(201,168,76,.85)', borderLeft:'2px solid rgba(201,168,76,.85)' }} />
              <div style={{ position:'absolute', bottom:'clamp(20px,3vw,40px)', right:'clamp(20px,3vw,40px)', width:52, height:52, borderBottom:'2px solid rgba(201,168,76,.85)', borderRight:'2px solid rgba(201,168,76,.85)' }} />
            </div>

          </div>

          {/* Text */}
          <div style={{ padding:'clamp(56px,7vw,110px) clamp(32px,5vw,80px)', display:'flex', flexDirection:'column', justifyContent:'center', gap:'clamp(24px,3vw,40px)' }}>
            <div className="eyebrow rv">The Story</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(32px,4vw,56px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15, letterSpacing:'-.01em', margin:0 }}>
              One Life.<br /><em style={{ color:'#C9A84C' }}>Many Assignments.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'#4A5A4A', margin:0 }}>
              In a generation hungry for authenticity, Solomon Stephen is the real thing. Based in Lagos, Nigeria, he is a gospel minister, worship leader, music producer, published author, recording studio founder, and digital entrepreneur — not occupying these identities sequentially, but living each one simultaneously, every facet feeding the other in a life wholly given to the advancement of the Kingdom of God.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'#4A5A4A', margin:0 }}>
              He is the founder and leader of <strong style={{ color:'#0D1B0D', fontWeight:600 }}>The Worship Nation (TWN)</strong> — a ministry movement built on the conviction that authentic encounter with God is not a luxury reserved for the few, but the birthright of every believer.
            </p>
            <div className="rv d4" style={{ borderLeft:'2px solid #C9A84C', paddingLeft:'clamp(16px,2vw,28px)' }}>
              <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(17px,2vw,23px)', fontStyle:'italic', color:'#0D1B0D', lineHeight:1.65, margin:0 }}>
                &ldquo;His teaching is rooted in New Covenant pneumatology — drawing from Hebrew and Greek: <em style={{ color:'#C9A84C' }}>hesed, derek, nephesh, splagchnizomai, zoe, eusebeia</em> — wielded not to impress, but to transform.&rdquo;
              </p>
            </div>
            <div className="rv d5" style={{ display:'flex', gap:'clamp(12px,1.5vw,24px)', flexWrap:'wrap', alignItems:'center', paddingTop:'8px' }}>
              <Link href="/contact" style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background .3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2A4A2A'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1A2E1A'}
              >Get In Touch</Link>
              <Link href="/events" style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,.35)', paddingBottom:'2px', transition:'border-color .3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,.35)'}
              >Upcoming Events →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PULL QUOTE ══ */}
      <section style={{ background:'#1A2E1A', padding:'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 5% 50%, rgba(201,168,76,.06) 0%, transparent 60%)', pointerEvents:'none' }} />
        {/* Ghost watermark */}
        <div style={{ position:'absolute', right:'-0.04em', top:'50%', transform:'translateY(-50%)', fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(160px,22vw,320px)', fontWeight:700, color:'rgba(201,168,76,.04)', lineHeight:1, pointerEvents:'none', userSelect:'none', whiteSpace:'nowrap' }}>TWN</div>
        {/* Decorative lines removed */}
        <div style={{ maxWidth:'860px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ display:'flex', gap:'clamp(16px,2vw,32px)', marginBottom:'clamp(24px,3vw,40px)', alignItems:'flex-start' }}>
            <div style={{ width:'2px', background:'#C9A84C', flexShrink:0, alignSelf:'stretch', minHeight:'60px', opacity:.55 }} />
            <p style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(22px,3vw,36px)', fontWeight:400, fontStyle:'italic', lineHeight:1.6, color:'#FAF7F2', margin:0 }}>
              &ldquo;There are rare individuals in whom vision and vocation converge so completely that it becomes impossible to separate the person from the purpose. Solomon Stephen is one such individual.&rdquo;
            </p>
          </div>
          <div className="rv d2" style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', paddingLeft:'clamp(18px,2.4vw,34px)' }}>
            — The Worship Nation · Lagos, Nigeria
          </div>
        </div>
      </section>

      {/* ══ MINISTRY GATHERINGS ══ */}
      <section style={{ background:'#0A140A', padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(48px,6vw,80px)', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <div className="eyebrow rv" style={{ color:'rgba(201,168,76,.6)', marginBottom:'16px' }}>Ministry & Teaching</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:400, color:'#FAF7F2', margin:0, lineHeight:1.05 }}>
                Regular <em style={{ color:'#C9A84C' }}>Gatherings</em>
              </h2>
            </div>
            <Link href="/events" className="rv d2" style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(250,247,242,.35)', textDecoration:'none', transition:'color .3s', whiteSpace:'nowrap' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,.35)'}
            >All Events →</Link>
          </div>
          <div className="ministry-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'rgba(201,168,76,.08)' }}>
            {ministries.map((g, i) => (
              <div key={g.title} className={`ministry-card rv d${i + 1}`}>
                {/* Ambient glow */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px', background:`linear-gradient(to right, #C9A84C, transparent)`, opacity: i === 0 ? 1 : 0.4 }} />
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(44px,5.5vw,72px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'14px' }}>{g.title}</div>
                <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(250,247,242,.28)', marginBottom:'14px' }}>{g.full}</div>
                <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,.28)', marginBottom:'18px' }} />
                <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(201,168,76,.55)', marginBottom:'22px' }}>{g.when}</div>
                <p style={{ fontFamily:'DM Sans', fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,.42)', margin:0 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CALLINGS ══ */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background:'#F0EBE1' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ marginBottom:'clamp(48px,6vw,80px)' }}>
            <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Many Callings, One Life</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:400, color:'#0D1B0D', margin:0, lineHeight:1.05 }}>
              Every role, <em style={{ color:'#C9A84C' }}>one purpose.</em>
            </h2>
          </div>
          <div>
            {callings.map((c, i) => (
              <Link key={c.href} href={c.href}
                className="calling-strip rv"
                style={{ transitionDelay:`${i * 0.07}s` }}
                onMouseEnter={() => setHoveredCall(i)}
                onMouseLeave={() => setHoveredCall(null)}
              >
                <div className="calling-grid" style={{ display:'grid', gridTemplateColumns:'clamp(48px,5vw,72px) clamp(120px,14vw,200px) 1fr clamp(80px,8vw,120px)', alignItems:'center', gap:'clamp(16px,3vw,48px)' }}>
                  <span style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.22em', color:'rgba(201,168,76,.55)' }}>{c.num}</span>
                  <div>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(26px,3.2vw,44px)', fontWeight:400, color: hoveredCall === i ? '#1A2E1A' : '#0D1B0D', lineHeight:1.15, transition:'color .3s' }}>{c.title}</div>
                    <div style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.1em', color:'#8A9A8A', marginTop:'4px' }}>{c.sub}</div>
                  </div>
                  <p className="calling-desc" style={{ fontFamily:'DM Sans', fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.85, color:'#5A6A5A', margin:0 }}>{c.desc}</p>
                  <div className="calling-cta" style={{ textAlign:'right', fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.16em', textTransform:'uppercase', color: hoveredCall === i ? '#C9A84C' : 'rgba(90,106,90,.6)', transition:'color .3s' }}>Explore →</div>
                </div>
                <div className="gold-reveal" style={{ marginTop:'8px' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AUTHOR ══ */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background:'#FAF7F2' }}>
        <div className="author-split" style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'55% 45%', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Author</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5vw,64px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1, marginBottom:'clamp(24px,3vw,40px)', letterSpacing:'-.01em' }}>
              Words That<br /><em style={{ color:'#C9A84C' }}>Outlast Moments</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'#4A5A4A', marginBottom:'24px' }}>
              Solomon Stephen writes with the rigour of a scholar and the heart of a pastor. His books are not devotional fillers — they are prophetic instruments designed to recalibrate believers to the truth of who they are in Christ.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.95, color:'#4A5A4A', marginBottom:'clamp(32px,4vw,52px)' }}>
              From <em>The Cost of Ignorance</em> to the <em>Sons Not Slaves</em> devotional series, each title is a stake in the ground — an assertion of who the believer was always meant to be.
            </p>
            <div className="rv d4" style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/books" style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background .3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2A4A2A'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1A2E1A'}
              >View All Books</Link>
              <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'14px 32px', border:'1px solid rgba(201,168,76,.4)', color:'#C9A84C', textDecoration:'none', transition:'border-color .3s,background .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.4)'; (e.currentTarget as HTMLElement).style.background='transparent' }}
              >Buy on Selar →</a>
            </div>
          </div>
          <div className="rv-right book-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[
              { src:'/images/book-cost-of-ignorance.png',     title:'The Cost of Ignorance' },
              { src:'/images/book-sons-not-slaves-march.png', title:'Sons Not Slaves (March)' },
              { src:'/images/book-sons-not-slaves-april.png', title:'Sons Not Slaves (April)' },
              { src:'/images/book-go-in-this-thy-might.png',   title:'Go In This Thy Might' },
            ].map((b, i) => (
              <div key={i} className="img-zoom rv-scale" style={{ transitionDelay:`${i * 0.09}s`, borderRadius:'2px', overflow:'hidden', aspectRatio:'3/4', position:'relative', background:'#E0D9CE' }}>
                <Image src={b.src} alt={b.title} fill style={{ objectFit:'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background:'#0A140A', padding:'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,.05) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 40% 40% at 50% 100%, rgba(26,46,26,.8) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:'640px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,.6)', justifyContent:'center', marginBottom:'clamp(24px,3vw,40px)' }}>Connect</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(44px,6.5vw,80px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.0, marginBottom:'clamp(20px,3vw,36px)', letterSpacing:'-.015em' }}>
            Every great work<br />begins with a <em style={{ color:'#C9A84C' }}>conversation.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.9, color:'rgba(250,247,242,.45)', marginBottom:'clamp(36px,5vw,64px)' }}>
            Whether you want to book Solomon for ministry, collaborate on music, inquire about TWN Studios, or explore a project with TAI Digital — reach out.
          </p>
          <Link href="/contact" className="rv d3"
            style={{ display:'inline-block', fontFamily:'DM Sans', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase', padding:'18px 48px', border:'1px solid rgba(201,168,76,.45)', color:'#C9A84C', textDecoration:'none', transition:'all .35s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.45)' }}
          >Get In Touch →</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
