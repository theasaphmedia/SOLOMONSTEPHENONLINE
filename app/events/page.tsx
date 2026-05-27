'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
    desc: 'From the Greek — an arranged meeting. A scheduled, intentional, depth-first encounter with God. Deep worship. The weight of the Word. Space to stay as long as He remains.',
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
      es => es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )

    const targets = document.querySelectorAll(
      '.rv,.rv-left,.rv-right,.rv-scale,.rv-title,.rv-img,.rv-tag,.rv-line'
    )
    targets.forEach(el => obs.observe(el))

    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#0A0A0A', overflowX: 'hidden' }}>
      <style>{`
        /* ── Core reveals ─────────────────────────────── */
        .rv {
          opacity: 0;
          transform: translateY(52px) scale(0.95);
          filter: blur(6px);
          transition: opacity 1s cubic-bezier(.16,1,.3,1),
                      transform 1.05s cubic-bezier(.16,1,.3,1),
                      filter .85s cubic-bezier(.16,1,.3,1);
        }
        .rv.is-visible { opacity:1; transform:none; filter:blur(0); }

        .rv-left {
          opacity: 0;
          transform: translateX(-72px) rotateY(-12deg);
          filter: blur(7px);
          transform-origin: right center;
          transition: opacity 1s cubic-bezier(.16,1,.3,1),
                      transform 1.1s cubic-bezier(.16,1,.3,1),
                      filter .9s cubic-bezier(.16,1,.3,1);
        }
        .rv-left.is-visible { opacity:1; transform:none; filter:blur(0); }

        .rv-right {
          opacity: 0;
          transform: translateX(72px) rotateY(12deg);
          filter: blur(7px);
          transform-origin: left center;
          transition: opacity 1s cubic-bezier(.16,1,.3,1),
                      transform 1.1s cubic-bezier(.16,1,.3,1),
                      filter .9s cubic-bezier(.16,1,.3,1);
        }
        .rv-right.is-visible { opacity:1; transform:none; filter:blur(0); }

        /* Scale burst — for tags and icons */
        .rv-scale {
          opacity: 0;
          transform: scale(0.6);
          filter: blur(4px);
          transition: opacity .8s cubic-bezier(.34,1.56,.64,1),
                      transform .9s cubic-bezier(.34,1.56,.64,1),
                      filter .7s;
        }
        .rv-scale.is-visible { opacity:1; transform:scale(1); filter:blur(0); }

        /* Cinematic title clip — sweeps left to right */
        .rv-title {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transform: translateX(-16px);
          transition: opacity .15s,
                      clip-path 1.3s cubic-bezier(.16,1,.3,1),
                      transform 1.3s cubic-bezier(.16,1,.3,1);
        }
        .rv-title.is-visible {
          opacity: 1;
          clip-path: inset(0 0% 0 0);
          transform: translateX(0);
        }

        /* Image zoom-out reveal */
        .rv-img {
          opacity: 0;
          transform: scale(1.1);
          filter: blur(8px);
          transition: opacity 1.3s cubic-bezier(.16,1,.3,1),
                      transform 1.6s cubic-bezier(.16,1,.3,1),
                      filter 1.1s;
        }
        .rv-img.is-visible { opacity:1; transform:scale(1); filter:blur(0); }

        /* Gold line draw */
        .rv-line {
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 1.2s cubic-bezier(.16,1,.3,1);
        }
        .rv-line.is-visible { transform: scaleX(1); }

        /* Tag pill pop */
        .rv-tag {
          opacity: 0;
          transform: scale(0.75) translateY(8px);
          filter: blur(3px);
          transition: opacity .7s cubic-bezier(.34,1.56,.64,1),
                      transform .8s cubic-bezier(.34,1.56,.64,1),
                      filter .6s;
        }
        .rv-tag.is-visible { opacity:1; transform:none; filter:blur(0); }

        /* Stagger delays */
        .d1 { transition-delay: .08s; }
        .d2 { transition-delay: .18s; }
        .d3 { transition-delay: .30s; }
        .d4 { transition-delay: .44s; }
        .d5 { transition-delay: .58s; }
        .d6 { transition-delay: .72s; }

        /* Row hover gold line sweep */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px) scale(.97); filter:blur(5px); }
          to   { opacity:1; transform:none; filter:blur(0); }
        }

        /* Gathering row */
        .gathering-row {
          border-top: 1px solid rgba(250,247,242,.07);
          display: grid;
          grid-template-columns: 64px 1fr 1fr 1fr;
          align-items: start;
          gap: clamp(20px,3vw,48px);
          padding: clamp(48px,6vw,88px) 0;
          transition: border-color .5s, background .5s, padding-left .5s cubic-bezier(.16,1,.3,1);
          position: relative;
        }
        .gathering-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: #C9A84C;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform .6s cubic-bezier(.16,1,.3,1);
        }
        .gathering-row:hover { border-color: rgba(201,168,76,.3); background: rgba(201,168,76,.015); padding-left: 14px; }
        .gathering-row:hover::before { transform: scaleY(1); }
        .gathering-row:last-child { border-bottom: 1px solid rgba(250,247,242,.07); }

        /* Photo zoom on row hover */
        .gathering-photo-inner { transition: transform 1s cubic-bezier(.16,1,.3,1), filter .8s; overflow:hidden; }
        .gathering-row:hover .gathering-photo-inner img { transform: scale(1.05) !important; }

        /* Verse quote pulse on hover */
        .verse-quote { transition: border-color .4s, color .4s; }
        .gathering-row:hover .verse-quote { border-color: rgba(201,168,76,.5); }

        /* Social links */
        .social-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: rgba(250,247,242,.5);
          text-decoration: none;
          transition: color .3s;
        }
        .social-link:hover { color: #C9A84C; }

        /* Mobile */
        @media(max-width:860px) {
          .rv { transform: translateY(28px) scale(0.97) !important; filter: blur(4px) !important; transition-duration: .65s !important; }
          .rv-left { transform: translateY(20px) !important; filter: blur(4px) !important; transition-duration: .65s !important; }
          .rv-right { transform: translateY(20px) !important; filter: blur(4px) !important; transition-duration: .65s !important; }
          .rv-title { clip-path: inset(0 100% 0 0) !important; }
          .rv-img { transform: scale(1.05) !important; filter: blur(4px) !important; transition-duration: .8s !important; }
          .d1,.d2,.d3 { transition-delay: .04s !important; }
          .d4,.d5,.d6 { transition-delay: .08s !important; }
          .gathering-row { grid-template-columns: 1fr 1fr !important; gap: clamp(16px,3vw,32px) !important; }
          .gathering-num { display: none !important; }
          .gathering-photo { grid-column: span 2 !important; }
          .gathering-row:hover { padding-left: 0 !important; }
        }
        @media(max-width:540px) {
          .gathering-row { grid-template-columns: 1fr !important; padding-right: 0 !important; }
          .gathering-photo { grid-column: 1 !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
          .follow-img { display: none !important; }
          .events-hero-pad { padding: 80px 24px clamp(40px,8vw,56px) !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{ height:'100vh', minHeight:'640px', position:'relative', overflow:'hidden', background:'#070D07' }}>
        <Image
          src="/images/gallery-congregation-worship.jpg"
          alt="Worship gathering"
          fill priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: entered ? 'scale(1.0)' : 'scale(1.08)',
            transition: 'transform 2s cubic-bezier(.16,1,.3,1)',
          }}
        />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(7,13,7,0.97) 0%, rgba(7,13,7,0.80) 28%, rgba(7,13,7,0.30) 58%, transparent 82%)', zIndex:1 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(7,13,7,0.88) 0%, rgba(7,13,7,0.52) 32%, rgba(7,13,7,0.10) 58%, transparent 75%)', zIndex:1 }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'220px', background:'linear-gradient(to bottom, rgba(7,13,7,0.65) 0%, transparent 100%)', zIndex:1 }} />

        <div className="events-hero-pad" style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,72px) clamp(48px,7vw,80px)' }}>

          {/* Eyebrow */}
          <div style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'none' : 'translateY(18px)',
            filter: entered ? 'blur(0)' : 'blur(4px)',
            transition: 'opacity .9s .2s, transform .9s .2s, filter .8s .2s',
            marginBottom: 'clamp(20px,3vw,36px)',
          }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'12px' }}>
              <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,.5)' }} />
              <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)' }}>
                The Worship Nation
              </span>
            </div>
          </div>

          {/* Heading — staggered lines */}
          <div style={{ overflow:'hidden', marginBottom:'8px' }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:.9, color:'#FAF7F2', letterSpacing:'-.02em', fontSize:'clamp(52px,8vw,104px)',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(110%) rotateX(20deg)',
              filter: entered ? 'blur(0)' : 'blur(3px)',
              transition: 'opacity .9s .38s, transform .9s .38s, filter .8s .38s',
            }}>Three</div>
          </div>
          <div style={{ overflow:'hidden', marginBottom:'8px' }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:.9, letterSpacing:'-.02em', fontSize:'clamp(52px,8vw,104px)',
              color:'#C9A84C',
              fontStyle:'italic',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(110%) rotateX(20deg)',
              filter: entered ? 'blur(0)' : 'blur(3px)',
              transition: 'opacity .9s .54s, transform .9s .54s, filter .8s .54s',
            }}>Gatherings.</div>
          </div>
          <div style={{ overflow:'hidden', marginBottom:'clamp(28px,4vw,48px)' }}>
            <div style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:.9, color:'#FAF7F2', letterSpacing:'-.02em', fontSize:'clamp(52px,8vw,104px)',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(110%) rotateX(20deg)',
              filter: entered ? 'blur(0)' : 'blur(3px)',
              transition: 'opacity .9s .68s, transform .9s .68s, filter .8s .68s',
            }}>One God.</div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'none' : 'translateY(14px)',
            transition: 'opacity .9s .9s, transform .9s .9s',
            display:'flex', alignItems:'center', gap:'16px',
          }}>
            <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom, rgba(201,168,76,.5), transparent)', flexShrink:0 }} />
            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.4)' }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ══ GATHERINGS ══ */}
      <section style={{ background:'#0A0A0A', padding:'0 clamp(24px,4vw,80px) clamp(60px,8vw,100px)' }}>
        <div style={{ maxWidth:'1280px', margin:'0 auto' }}>

          {gatherings.map((g, i) => (
            <div key={g.code} className="gathering-row">

              {/* ── Number ── */}
              <div className="gathering-num rv" style={{ transitionDelay:(i * .12)+'s' }}>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'rgba(201,168,76,0.4)', letterSpacing:'.2em' }}>{g.num}</div>
              </div>

              {/* ── Code + name + tag ── */}
              <div>
                {/* Big code title — clip-path cinema reveal */}
                <div className="rv-title" style={{ transitionDelay:(i * .12 + .06)+'s', marginBottom:'12px', lineHeight:1 }}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,6vw,80px)', fontWeight:400, color:'#FAF7F2', lineHeight:1 }}>
                    {g.code}
                  </div>
                </div>

                {/* Subtitle */}
                <div className="rv d2" style={{ transitionDelay:(i * .12 + .14)+'s', fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(250,247,242,0.32)', marginBottom:'16px' }}>
                  {g.name}
                </div>

                {/* Tag pill */}
                <div className="rv-tag" style={{ transitionDelay:(i * .12 + .22)+'s', display:'inline-block', padding:'5px 14px', border:'1px solid rgba(201,168,76,0.25)', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)' }}>
                  {g.tag}
                </div>
              </div>

              {/* ── Schedule + description ── */}
              <div>
                {/* Gold line draw */}
                <div className="rv-line" style={{ transitionDelay:(i * .12 + .1)+'s', height:'1px', background:'linear-gradient(90deg, #C9A84C, rgba(201,168,76,.2))', marginBottom:'18px', width:'100%' }} />

                <div className="rv d2" style={{ transitionDelay:(i * .12 + .18)+'s', fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', marginBottom:'18px' }}>
                  {g.when}
                </div>

                <p className="rv d3" style={{ transitionDelay:(i * .12 + .28)+'s', fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.9, color:'rgba(250,247,242,0.42)', margin:0 }}>
                  {g.desc}
                </p>
              </div>

              {/* ── Photo + verse ── */}
              <div className="gathering-photo">
                {/* Image — zoom-out reveal */}
                <div className="rv-right" style={{ transitionDelay:(i * .12 + .2)+'s', aspectRatio:'4/3', position:'relative', overflow:'hidden', marginBottom:'20px' }}>
                  <div className="rv-img is-visible" style={{ position:'absolute', inset:0 }}>
                    <Image src={g.img} alt={g.code} fill style={{ objectFit:'cover', objectPosition:g.imgPos, transition:'transform 1s cubic-bezier(.16,1,.3,1)' }} />
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, transparent 55%, rgba(10,10,10,0.5) 100%)' }} />
                  </div>
                </div>

                {/* Verse */}
                <div className="rv d4 verse-quote" style={{ transitionDelay:(i * .12 + .38)+'s', borderLeft:'2px solid rgba(201,168,76,0.25)', paddingLeft:'16px' }}>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)', marginBottom:'8px' }}>
                    {g.verse}
                  </div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,1.4vw,17px)', fontStyle:'italic', color:'rgba(250,247,242,0.52)', lineHeight:1.65 }}>
                    {g.verseText}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ══ FOLLOW ══ */}
      <section style={{ background:'#0A0A0A', borderTop:'1px solid rgba(250,247,242,.05)', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div className="follow-grid" style={{ maxWidth:'1280px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px,6vw,100px)', alignItems:'center' }}>
          <div>
            {/* Gold draw line */}
            <div className="rv-line" style={{ height:'1px', background:'linear-gradient(90deg, #C9A84C, transparent)', marginBottom:'clamp(20px,3vw,36px)', width:'100%' }} />

            <div className="rv" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(16px,2.5vw,24px)' }}>
              Follow the Movement
            </div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(32px,5vw,64px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, margin:'0 0 clamp(20px,2.5vw,32px)' }}>
              Don&apos;t miss what<br />God is <em style={{ color:'#C9A84C' }}>doing here.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.4)', margin:'0 0 clamp(28px,4vw,48px)' }}>
              Follow The Worship Nation for meeting announcements, live moments, and everything happening in the gatherings.
            </p>
            <div className="rv d3" style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <a href="https://www.instagram.com/theworshipnation_twn" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'13px 28px', border:'1px solid rgba(201,168,76,0.35)', color:'#C9A84C', textDecoration:'none', transition:'all .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.35)' }}
              >@theworshipnation_twn</a>
              <a href="https://www.instagram.com/thesolomonsteph" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'13px 28px', border:'1px solid rgba(250,247,242,.1)', color:'rgba(250,247,242,.45)', textDecoration:'none', transition:'all .3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.3)'; (e.currentTarget as HTMLElement).style.color='rgba(201,168,76,.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(250,247,242,.1)'; (e.currentTarget as HTMLElement).style.color='rgba(250,247,242,.45)' }}
              >@thesolomonsteph</a>
            </div>
          </div>

          <div className="rv-right follow-img" style={{ aspectRatio:'1', position:'relative', overflow:'hidden' }}>
            <div className="rv-img is-visible" style={{ position:'absolute', inset:0 }}>
              <Image src="/images/gallery-solomon-worship-raise.jpg" alt="Solomon Stephen in worship" fill style={{ objectFit:'cover', objectPosition:'center top', transition:'transform 1s cubic-bezier(.16,1,.3,1)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, transparent 60%, rgba(10,10,10,0.6) 100%)' }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
