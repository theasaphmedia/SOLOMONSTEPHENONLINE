'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const callings = [
  { num: '01', sub: 'The Worship Nation', title: 'Minister',  desc: 'Prophetic gatherings that shift atmospheres — weekly and monthly across Lagos. Every meeting, an encounter with the living God.', href: '/events'      },
  { num: '02', sub: 'Worship & Music',    title: 'Worshipper', desc: 'Six studio releases and counting. Songs born in the secret place, released into the congregation. A sound that carries the weight of eternity.', href: '/music'       },
  { num: '03', sub: 'Published Works',    title: 'Author',    desc: 'Books rooted in biblical Hebrew and Greek that transform believers from the inside out. Words that outlast the moment they were written.', href: '/books'       },
  { num: '04', sub: 'TWN Studios',        title: 'Founder',   desc: 'A consecrated space in Ajah, Lagos where craft meets calling. Built for artists and ministers who refuse to separate excellence from anointing.', href: '/studios'     },
]

export default function AboutPage() {
  const [hoveredCall, setHoveredCall] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
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
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s} .d5{transition-delay:.40s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .calling-strip { border-top:1px solid rgba(201,168,76,0.15); padding:clamp(28px,3.5vw,56px) 0; transition:background 0.4s cubic-bezier(0.16,1,0.3,1); cursor:pointer; text-decoration:none; display:block; }
        .calling-strip:hover { background:rgba(201,168,76,0.04); }
        .calling-strip:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform:scale(1.04); }
        .gold-line { width:0; height:1px; background:#C9A84C; transition:width 0.6s cubic-bezier(0.16,1,0.3,1); }
        .calling-strip:hover .gold-line { width:100%; }
        .pull-quote { font-family:'Cormorant Garamond',serif; font-size:clamp(22px,3.5vw,36px); font-weight:400; font-style:italic; line-height:1.55; color:#0D1B0D; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{
        background: '#1A2E1A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(120px,14vw,180px) clamp(24px,4vw,80px) clamp(56px,7vw,100px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background photo */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }} className="img-zoom">
          <Image src="/images/solomon-blue.png" alt="Solomon Stephen" fill style={{ objectFit:'cover', objectPosition:'center top', opacity:0.35 }} priority />
        </div>
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to top, #1A2E1A 30%, rgba(26,46,26,0.5) 70%, transparent)' }} />

        <div style={{ position:'relative', zIndex:2, maxWidth:'900px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)' }}>
            <span style={{ width:28, height:1, background:'rgba(201,168,76,0.7)', display:'inline-block' }} />
            About Solomon
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,110px)', fontWeight:400, lineHeight:1, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,40px)', letterSpacing:'-0.02em' }}>
            <span className="wc" style={{ animationDelay:'0s' }}><span className="wi">Gospel</span></span>{" "}
            <span className="wc" style={{ animationDelay:'0.06s' }}><span className="wi" style={{ animationDelay:'0.06s' }}>Minister.</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.14s', color:'#C9A84C' }}>Worshipper.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.6vw,17px)', lineHeight:1.8, color:'rgba(250,247,242,0.65)', maxWidth:'520px' }}>
            Gospel minister · Worship leader · Music producer · Author · Founder of The Worship Nation
          </p>
        </div>
      </section>

      {/* ── Opening quote ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', maxWidth:'1100px', margin:'0 auto' }}>
        <div className="rv" style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
          <p className="pull-quote">
            &ldquo;There are rare individuals in whom vision and vocation converge so completely that it becomes impossible to separate the person from the purpose.&rdquo;
          </p>
          <p className="pull-quote" style={{ color:'#C9A84C', fontSize:'clamp(18px,2.5vw,26px)' }}>
            Solomon Stephen is one such individual.
          </p>
        </div>
      </section>

      {/* ── Bio split ── */}
      <section style={{ padding:'0 clamp(24px,4vw,80px) clamp(72px,9vw,120px)', maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(48px,6vw,96px)', alignItems:'start' }}>

          {/* Photo */}
          <div className="rv-scale" style={{ position:'relative' }}>
            <div className="img-zoom" style={{ borderRadius:'2px', overflow:'hidden', aspectRatio:'4/5' }}>
              <Image src="/images/solomon-photo.png" alt="Solomon Stephen" fill style={{ objectFit:'cover', objectPosition:'center top' }} />
            </div>
            {/* Gold corner brackets */}
            <div style={{ position:'absolute', top:'-12px', left:'-12px', width:40, height:40, borderTop:'2px solid #C9A84C', borderLeft:'2px solid #C9A84C' }} />
            <div style={{ position:'absolute', bottom:'-12px', right:'-12px', width:40, height:40, borderBottom:'2px solid #C9A84C', borderRight:'2px solid #C9A84C' }} />
          </div>

          {/* Text */}
          <div>
            <div className="eyebrow rv d1" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Story</div>

            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(15px,1.5vw,17px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'28px' }}>
              In a generation hungry for authenticity, Solomon Stephen is the real thing. Based in Lagos, Nigeria, he is a gospel minister, worship leader, music producer, published author, recording studio founder, and digital entrepreneur — not occupying these identities sequentially, but living each one simultaneously, every facet feeding the other in a life wholly given to the advancement of the Kingdom of God.
            </p>

            <p className="rv d3" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(15px,1.5vw,17px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'28px' }}>
              He is the founder and leader of <strong style={{ color:'#0D1B0D' }}>The Worship Nation (TWN)</strong> — a ministry movement built on the conviction that authentic encounter with God is not a luxury reserved for the few, but the birthright of every believer. Through recurring gatherings, live recordings, and a growing digital presence, TWN has become a home for thousands of worshippers across Nigeria.
            </p>

            <p className="rv d4" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(15px,1.5vw,17px)', lineHeight:1.85, color:'#3D4B3D' }}>
              His teaching is rooted in New Covenant pneumatology, drawing from Hebrew and Greek word studies — <em>hesed, derek, nephesh, splagchnizomai, zōē, eusebeia</em> — wielded not to impress, but to transform. Scholarly rigour and pastoral warmth in equal measure.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ministry & Teaching dark section ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(40px,5vw,72px)' }}>Ministry & Teaching</div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:'clamp(32px,4vw,56px)' }}>
            {[
              { title:'MDWE', full:'Mid Day Worship Experience', when:'Every Wednesday · 12:00 PM', desc:'A worship and prophetic devotion gathering designed to shift the atmosphere of your week. Come as you are; leave transformed.' },
              { title:'TSH', full:'The Slaughter House', when:'Last Saturday before final Sunday', desc:'A high-intensity gathering of worship, intercession, and consecration. Named for the altar — where self is surrendered and God moves.' },
              { title:'Synantesis', full:'The Divine Appointment', when:'Last Sunday of every month', desc:'From the Greek word for "divine appointment." A meeting with God — deep-dive worship and the Word that carries weight beyond the moment.' },
            ].map((g, i) => (
              <div key={g.title} className={`rv d${i+1}`} style={{ borderTop:'1px solid rgba(201,168,76,0.15)', paddingTop:'32px' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,5vw,54px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>{g.title}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(250,247,242,0.4)', marginBottom:'16px' }}>{g.full}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', marginBottom:'16px' }}>{g.when}</div>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', lineHeight:1.8, color:'rgba(250,247,242,0.55)' }}>{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What He Does ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#F0EBE1' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ marginBottom:'clamp(40px,5vw,72px)' }}>Many Callings, One Life</div>
          <div>
            {callings.map((c, i) => (
              <Link key={c.href} href={c.href}
                className="calling-strip rv"
                style={{ transitionDelay:`${i * 0.07}s` }}
                onMouseEnter={() => setHoveredCall(i)}
                onMouseLeave={() => setHoveredCall(null)}
              >
                <div style={{ display:'grid', gridTemplateColumns:'clamp(48px,6vw,80px) clamp(120px,14vw,200px) 1fr clamp(80px,8vw,140px)', alignItems:'center', gap:'clamp(16px,3vw,40px)' }}>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', color:'#C9A84C' }}>{c.num}</span>
                  <div>
                    <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,3vw,38px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.2 }}>{c.title}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.1em', color:'#8A9A8A', marginTop:'4px' }}>{c.sub}</div>
                  </div>
                  <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.75, color:'#3D4B3D' }}>{c.desc}</p>
                  <div style={{ textAlign:'right', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color: hoveredCall === i ? '#C9A84C' : '#8A9A8A', transition:'color 0.3s' }}>Explore →</div>
                </div>
                <div className="gold-line" style={{ marginTop:'4px', width: hoveredCall === i ? '100%' : '0' }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Author ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Author</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,5vw,56px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15, marginBottom:'clamp(20px,2.5vw,32px)' }}>
              Words That<br /><em style={{ color:'#C9A84C' }}>Outlast Moments</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'28px' }}>
              Solomon Stephen writes with the rigour of a scholar and the heart of a pastor. His books are not devotional fillers — they are prophetic instruments designed to recalibrate believers to the truth of who they are in Christ.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'clamp(28px,4vw,48px)' }}>
              From <em>The Cost of Ignorance</em> — a clarion call to take spiritual education seriously — to the <em>Sons Not Slaves</em> devotional series, each title is a stake in the ground: an assertion of who the believer was always meant to be.
            </p>
            <Link href="/books" className="rv d4" style={{
              display:'inline-block', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', transition:'background 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#2A4A2A'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1A2E1A'; (e.currentTarget as HTMLElement).style.transform='none' }}
            >View All Books</Link>
          </div>

          <div className="rv-right" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
            {[
              { src:'/images/book-cost-of-ignorance.png', title:'The Cost of Ignorance' },
              { src:'/images/book-sons-not-slaves-march.png', title:'Sons Not Slaves (March)' },
              { src:'/images/book-sons-not-slaves-april.png', title:'Sons Not Slaves (April)' },
              { src:'/images/solomon-cream-suit-books.png', title:'Solomon Stephen, Author' },
            ].map((b, i) => (
              <div key={i} className="img-zoom rv-scale" style={{ transitionDelay:`${i*0.08}s`, borderRadius:'2px', overflow:'hidden', aspectRatio:'3/4', position:'relative' }}>
                <Image src={b.src} alt={b.title} fill style={{ objectFit:'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', textAlign:'center' }}>
        <div className="rv" style={{ maxWidth:'700px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', justifyContent:'center', marginBottom:'clamp(24px,3vw,40px)' }}>Connect</div>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(38px,6vw,72px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1, marginBottom:'clamp(20px,3vw,40px)' }}>
            Every great work<br />begins with a <em style={{ color:'#C9A84C' }}>conversation.</em>
          </h2>
          <p className="rv d1" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.8, color:'rgba(250,247,242,0.6)', marginBottom:'clamp(32px,4vw,56px)' }}>
            Whether you want to book Solomon for ministry, collaborate on music, inquire about TWN Studios, or explore a project with TAI Digital — reach out.
          </p>
          <Link href="/contact" className="rv d2" style={{
            display:'inline-block', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase',
            padding:'16px 40px', border:'1px solid rgba(201,168,76,0.5)', color:'#C9A84C', transition:'all 0.3s'
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.5)' }}
          >Get In Touch</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
