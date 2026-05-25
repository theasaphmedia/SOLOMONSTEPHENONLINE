'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const callings = [
  { num: '01', sub: 'The Worship Nation', title: 'Minister',   desc: 'Prophetic gatherings that shift atmospheres — weekly and monthly across Lagos. Every meeting, an encounter with the living God.', href: '/events'  },
  { num: '02', sub: 'Worship & Music',    title: 'Worshipper', desc: 'Six studio releases and counting. Songs born in the secret place, released into the congregation. A sound that carries the weight of eternity.', href: '/music'   },
  { num: '03', sub: 'Published Works',    title: 'Author',     desc: 'Books rooted in biblical Hebrew and Greek that transform believers from the inside out. Words that outlast the moment they were written.', href: '/books'   },
  { num: '04', sub: 'TWN Studios',        title: 'Founder',    desc: 'A consecrated space in Ajah, Lagos where craft meets calling. Built for artists and ministers who refuse to separate excellence from anointing.', href: '/studios' },
]

const stats = [
  { value: '6+',  label: 'Studio Albums' },
  { value: '4+',  label: 'Books Published' },
  { value: '3',   label: 'Active Ministries' },
  { value: '10+', label: 'Years of Ministry' },
]

export default function AboutPage() {
  const [hoveredCall, setHoveredCall] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv { opacity:0; transform:translateY(36px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv-left { opacity:0; transform:translateX(-48px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv-left.is-visible { opacity:1; transform:none; }
        .rv-right { opacity:0; transform:translateX(48px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv-right.is-visible { opacity:1; transform:none; }
        .rv-scale { opacity:0; transform:scale(0.95); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv-scale.is-visible { opacity:1; transform:none; }
        .d1{transition-delay:.07s} .d2{transition-delay:.14s} .d3{transition-delay:.21s} .d4{transition-delay:.28s} .d5{transition-delay:.35s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        @keyframes scrollCue{0%,100%{opacity:0.3}50%{opacity:0.9}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:'';width:28px;height:1px;background:#C9A84C;flex-shrink:0;}
        .calling-strip{border-top:1px solid rgba(201,168,76,0.15);padding:clamp(24px,3vw,48px) 0;transition:background 0.4s;cursor:pointer;text-decoration:none;display:block;}
        .calling-strip:hover{background:rgba(201,168,76,0.04);}
        .calling-strip:last-child{border-bottom:1px solid rgba(201,168,76,0.15);}
        .gold-line{width:0;height:1px;background:#C9A84C;transition:width 0.6s cubic-bezier(0.16,1,0.3,1);}
        .calling-strip:hover .gold-line{width:100%;}
        .img-zoom{overflow:hidden;}
        .img-zoom img{transition:transform 1s cubic-bezier(0.16,1,0.3,1);}
        .img-zoom:hover img{transform:scale(1.04);}
        @media(max-width:768px){
          .bio-split{grid-template-columns:1fr !important;}
          .stat-grid{grid-template-columns:1fr 1fr !important;}
          .author-grid{grid-template-columns:1fr !important;}
          .ministry-grid{grid-template-columns:1fr !important;gap:1px !important;}
          .calling-grid{grid-template-columns:clamp(32px,8vw,56px) 1fr !important;gap:12px !important;}
          .calling-desc{display:none !important;}
          .calling-explore{display:none !important;}
          .bio-photo{min-height:70vw !important;}
        }
      `}</style>

      {/* HERO */}
      <section style={{ background:'#0D1B0D', minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,180px) clamp(24px,5vw,80px) clamp(56px,7vw,96px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0 }} className="img-zoom">
          <Image src="/images/solomon-blue.png" alt="" fill style={{ objectFit:'cover', objectPosition:'center 20%', opacity:0.28 }} priority />
        </div>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #0D1B0D 35%, rgba(13,27,13,0.6) 65%, rgba(13,27,13,0.15) 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(13,27,13,0.75) 40%, transparent 100%)' }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 45% at 15% 85%, rgba(201,168,76,0.07) 0%, transparent 65%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:2, maxWidth:'860px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.65)', marginBottom:'clamp(28px,3.5vw,48px)' }}>The Story of Solomon Stephen</div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(56px,11vw,120px)', fontWeight:400, lineHeight:0.95, color:'#FAF7F2', margin:'0 0 clamp(28px,3.5vw,48px)', letterSpacing:'-0.02em' }}>
            <span className="wc"><span className="wi">Gospel</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.07s' }}>Minister.</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.16s', color:'#C9A84C' }}>Worshipper.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(13px,1.4vw,16px)', lineHeight:1.9, color:'rgba(250,247,242,0.5)', maxWidth:'480px' }}>
            Gospel minister · Worship leader · Music producer<br />Author · Founder of The Worship Nation
          </p>
        </div>
        <div style={{ position:'absolute', bottom:'clamp(32px,4vw,56px)', right:'clamp(24px,5vw,80px)', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
          <span style={{ fontFamily:'DM Sans', fontSize:'9px', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(250,247,242,0.22)', writingMode:'vertical-rl' }}>Scroll</span>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)', animation:'scrollCue 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ background:'#111D11', borderTop:'1px solid rgba(201,168,76,0.08)', borderBottom:'1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'clamp(40px,5vw,64px) clamp(24px,5vw,80px)' }}>
          <div className="stat-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'clamp(24px,4vw,64px)' }}>
            {stats.map((s, i) => (
              <div key={i} className={`rv d${i + 1}`} style={{ textAlign:'center' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(44px,6vw,80px)', fontWeight:400, color:'#FAF7F2', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(250,247,242,0.35)', marginTop:'10px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL BIO */}
      <section style={{ background:'#FAF7F2', overflow:'hidden' }}>
        <div className="bio-split" style={{ display:'grid', gridTemplateColumns:'45% 55%', minHeight:'80vh' }}>
          <div className="rv-scale bio-photo" style={{ position:'relative', minHeight:'clamp(480px,65vh,800px)' }}>
            <Image src="/images/solomon-photo.png" alt="Solomon Stephen" fill style={{ objectFit:'cover', objectPosition:'center top' }} />
            <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
              <div style={{ position:'absolute', top:'clamp(20px,3vw,40px)', left:'clamp(20px,3vw,40px)', width:56, height:56, borderTop:'2px solid rgba(201,168,76,0.8)', borderLeft:'2px solid rgba(201,168,76,0.8)' }} />
              <div style={{ position:'absolute', bottom:'clamp(20px,3vw,40px)', right:'clamp(20px,3vw,40px)', width:56, height:56, borderBottom:'2px solid rgba(201,168,76,0.8)', borderRight:'2px solid rgba(201,168,76,0.8)' }} />
            </div>
          </div>
          <div style={{ padding:'clamp(56px,7vw,110px) clamp(32px,5vw,80px)', display:'flex', flexDirection:'column', justifyContent:'center', gap:'clamp(24px,3vw,40px)' }}>
            <div className="eyebrow rv">The Story</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(30px,3.8vw,52px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.2, letterSpacing:'-0.01em', margin:0 }}>
              One Life.<br /><em style={{ color:'#C9A84C' }}>Many Assignments.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.9, color:'#4A5A4A', margin:0 }}>
              In a generation hungry for authenticity, Solomon Stephen is the real thing. Based in Lagos, Nigeria, he is a gospel minister, worship leader, music producer, published author, recording studio founder, and digital entrepreneur — not occupying these identities sequentially, but living each one simultaneously, every facet feeding the other in a life wholly given to the advancement of the Kingdom of God.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.9, color:'#4A5A4A', margin:0 }}>
              He is the founder and leader of <strong style={{ color:'#0D1B0D', fontWeight:600 }}>The Worship Nation (TWN)</strong> — a ministry movement built on the conviction that authentic encounter with God is not a luxury reserved for the few, but the birthright of every believer.
            </p>
            <div className="rv d4" style={{ borderLeft:'2px solid #C9A84C', paddingLeft:'clamp(16px,2vw,28px)', margin:0 }}>
              <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(16px,1.8vw,22px)', fontStyle:'italic', color:'#0D1B0D', lineHeight:1.65, margin:0 }}>
                &ldquo;His teaching is rooted in New Covenant pneumatology — drawing from Hebrew and Greek: <em style={{ color:'#C9A84C' }}>hesed, derek, nephesh, splagchnizomai, zoe, eusebeia</em> — wielded not to impress, but to transform.&rdquo;
              </p>
            </div>
            <div className="rv d5" style={{ display:'flex', gap:'clamp(12px,1.5vw,24px)', flexWrap:'wrap', alignItems:'center' }}>
              <Link href="/contact" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2A4A2A'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1A2E1A'}
              >Get In Touch</Link>
              <Link href="/events" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#C9A84C', textDecoration:'none', borderBottom:'1px solid rgba(201,168,76,0.3)', paddingBottom:'2px', transition:'border-color 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'}
              >Upcoming Events →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section style={{ background:'#1A2E1A', padding:'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 5% 50%, rgba(201,168,76,0.06) 0%, transparent 60%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:'-0.05em', top:'50%', transform:'translateY(-50%)', fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(180px,22vw,340px)', fontWeight:700, color:'rgba(201,168,76,0.04)', lineHeight:1, pointerEvents:'none', userSelect:'none' }}>TWN</div>
        <div style={{ maxWidth:'860px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="rv" style={{ display:'flex', gap:'clamp(16px,2vw,28px)', marginBottom:'clamp(24px,3vw,40px)', alignItems:'flex-start' }}>
            <div style={{ width:'2px', background:'#C9A84C', flexShrink:0, alignSelf:'stretch', opacity:0.5 }} />
            <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,2.8vw,32px)', fontWeight:400, fontStyle:'italic', lineHeight:1.65, color:'#FAF7F2', margin:0 }}>
              &ldquo;There are rare individuals in whom vision and vocation converge so completely that it becomes impossible to separate the person from the purpose. Solomon Stephen is one such individual.&rdquo;
            </p>
          </div>
          <div className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', paddingLeft:'clamp(18px,2.2vw,30px)' }}>
            — The Worship Nation · Lagos, Nigeria
          </div>
        </div>
      </section>

      {/* MINISTRY GATHERINGS */}
      <section style={{ background:'#0D1B0D', padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'clamp(48px,6vw,80px)', flexWrap:'wrap', gap:'16px' }}>
            <div>
              <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.65)', marginBottom:'16px' }}>Ministry & Teaching</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#FAF7F2', margin:0, lineHeight:1.1 }}>
                Regular <em style={{ color:'#C9A84C' }}>Gatherings</em>
              </h2>
            </div>
            <Link href="/events" className="rv d2" style={{ fontFamily:'DM Sans', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(250,247,242,0.38)', textDecoration:'none', transition:'color 0.3s', whiteSpace:'nowrap' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.38)'}
            >All Events →</Link>
          </div>
          <div className="ministry-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1px', background:'rgba(201,168,76,0.1)' }}>
            {[
              { title:'MDWE', full:'Mid Day Worship Experience', when:'Every Wednesday · 12:00 PM', desc:'A worship and prophetic devotion gathering designed to shift the atmosphere of your week. Come as you are; leave transformed.' },
              { title:'TSH', full:'The Slaughter House', when:'Last Saturday before final Sunday', desc:'A high-intensity gathering of worship, intercession, and consecration. Named for the altar — where self is surrendered and God moves.' },
              { title:'Synantesis', full:'The Divine Appointment', when:'Last Sunday of every month', desc:'From the Greek word for "divine appointment." A meeting with God — deep-dive worship and the Word that carries weight beyond the moment.' },
            ].map((g, i) => (
              <div key={g.title} className={`rv d${i + 1}`} style={{ background:'#0D1B0D', padding:'clamp(32px,4vw,56px) clamp(24px,3.5vw,48px)' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(40px,5vw,64px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'12px' }}>{g.title}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(250,247,242,0.3)', marginBottom:'12px' }}>{g.full}</div>
                <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'16px' }} />
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)', marginBottom:'20px' }}>{g.when}</div>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.8, color:'rgba(250,247,242,0.45)', margin:0 }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALLINGS */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background:'#F0EBE1' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ marginBottom:'clamp(48px,6vw,80px)' }}>
            <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Many Callings, One Life</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#0D1B0D', margin:0, lineHeight:1.1 }}>
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
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,168,76,0.6)' }}>{c.num}</span>
                  <div>
                    <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,3vw,42px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15 }}>{c.title}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.1em', color:'#8A9A8A', marginTop:'4px' }}>{c.sub}</div>
                  </div>
                  <p className="calling-desc" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.8, color:'#5A6A5A', margin:0 }}>{c.desc}</p>
                  <div className="calling-explore" style={{ textAlign:'right', fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', color: hoveredCall === i ? '#C9A84C' : '#9AA89A', transition:'color 0.3s' }}>Explore →</div>
                </div>
                <div className="gold-line" style={{ marginTop:'6px', width: hoveredCall === i ? '100%' : '0' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,5vw,80px)', background:'#FAF7F2' }}>
        <div className="author-grid" style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'55% 45%', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Author</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15, marginBottom:'clamp(24px,3vw,40px)', letterSpacing:'-0.01em' }}>
              Words That<br /><em style={{ color:'#C9A84C' }}>Outlast Moments</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.9, color:'#4A5A4A', marginBottom:'24px' }}>
              Solomon Stephen writes with the rigour of a scholar and the heart of a pastor. His books are not devotional fillers — they are prophetic instruments designed to recalibrate believers to the truth of who they are in Christ.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.9, color:'#4A5A4A', marginBottom:'clamp(32px,4vw,52px)' }}>
              From <em>The Cost of Ignorance</em> to the <em>Sons Not Slaves</em> devotional series, each title is a stake in the ground — an assertion of who the believer was always meant to be.
            </p>
            <div className="rv d4" style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/books" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background 0.3s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2A4A2A'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1A2E1A'}
              >View All Books</Link>
              <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', padding:'14px 32px', border:'1px solid rgba(201,168,76,0.4)', color:'#C9A84C', textDecoration:'none', transition:'border-color 0.3s, background 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
              >Buy on Selar →</a>
            </div>
          </div>
          <div className="rv-right" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {[
              { src:'/images/book-cost-of-ignorance.png',     title:'The Cost of Ignorance' },
              { src:'/images/book-sons-not-slaves-march.png', title:'Sons Not Slaves (March)' },
              { src:'/images/book-sons-not-slaves-april.png', title:'Sons Not Slaves (April)' },
              { src:'/images/solomon-cream-suit-books.png',   title:'Solomon Stephen, Author' },
            ].map((b, i) => (
              <div key={i} className="img-zoom rv-scale" style={{ transitionDelay:`${i * 0.09}s`, borderRadius:'2px', overflow:'hidden', aspectRatio:'3/4', position:'relative' }}>
                <Image src={b.src} alt={b.title} fill style={{ objectFit:'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:'#0D1B0D', padding:'clamp(80px,10vw,140px) clamp(24px,5vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:'640px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.65)', justifyContent:'center', marginBottom:'clamp(24px,3vw,40px)' }}>Connect</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(40px,6vw,76px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, marginBottom:'clamp(20px,3vw,36px)', letterSpacing:'-0.01em' }}>
            Every great work<br />begins with a <em style={{ color:'#C9A84C' }}>conversation.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'rgba(250,247,242,0.5)', marginBottom:'clamp(36px,5vw,64px)' }}>
            Whether you want to book Solomon for ministry, collaborate on music, inquire about TWN Studios, or explore a project with TAI Digital — reach out.
          </p>
          <Link href="/contact" className="rv d3"
            style={{ display:'inline-block', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', padding:'18px 44px', border:'1px solid rgba(201,168,76,0.45)', color:'#C9A84C', textDecoration:'none', transition:'all 0.35s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)' }}
          >Get In Touch</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
