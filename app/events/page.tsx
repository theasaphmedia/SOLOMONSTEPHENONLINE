'use client'

const eventsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "name": "Mid Day Worship Experience (MDWE)",
      "description": "A mid-week worship gathering designed to shift the atmosphere of your week.",
      "eventSchedule": { "@type": "Schedule", "repeatFrequency": "P1W", "byDay": "Wednesday", "startTime": "12:00:00" },
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "TWN Studios", "address": { "@type": "PostalAddress", "streetAddress": "Langbasa Road, Ajah", "addressLocality": "Lagos", "addressCountry": "NG" } },
      "organizer": { "@type": "Person", "name": "Solomon Stephen", "url": "https://solomonstephen.com" },
      "url": "https://solomonstephen.com/events"
    },
    {
      "@type": "Event",
      "name": "The Slaughter House (TSH)",
      "description": "High-intensity worship, intercession, and consecration. Not a comfortable meeting.",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "TWN Studios", "address": { "@type": "PostalAddress", "streetAddress": "Langbasa Road, Ajah", "addressLocality": "Lagos", "addressCountry": "NG" } },
      "organizer": { "@type": "Person", "name": "Solomon Stephen", "url": "https://solomonstephen.com" },
      "url": "https://solomonstephen.com/events"
    },
    {
      "@type": "Event",
      "name": "Synantesis — The Divine Appointment",
      "description": "From the Greek for divine appointment — deep worship and the full weight of the Word. Last Sunday of every month.",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": { "@type": "Place", "name": "TWN Studios", "address": { "@type": "PostalAddress", "streetAddress": "Langbasa Road, Ajah", "addressLocality": "Lagos", "addressCountry": "NG" } },
      "organizer": { "@type": "Person", "name": "Solomon Stephen", "url": "https://solomonstephen.com" },
      "url": "https://solomonstephen.com/events"
    }
  ]
}

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
    gcal: gcalLink('MDWE – Mid Day Worship Experience', 'Mid-week worship at TWN Studios, Ajah.', LOC, 'RRULE:FREQ=WEEKLY;BYDAY=WE', '20260603T120000', '20260603T140000'),
    ics: () => downloadICS('MDWE – Mid Day Worship Experience', 'Mid-week worship at TWN Studios, Ajah.', LOC, '20260603T120000', '20260603T140000', 'FREQ=WEEKLY;BYDAY=WE'),
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
    gcal: gcalLink('TSH – The Slaughter House', 'High-intensity worship, intercession, and consecration at TWN Studios.', LOC, 'RRULE:FREQ=MONTHLY;BYDAY=-2SA', '20260627T180000', '20260627T210000'),
    ics: () => downloadICS('TSH – The Slaughter House', 'High-intensity worship, intercession, and consecration at TWN Studios.', LOC, '20260627T180000', '20260627T210000', 'FREQ=MONTHLY;BYDAY=-2SA'),
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
    gcal: gcalLink('Synantesis – The Divine Appointment', 'Deep worship and the weight of the Word. Last Sunday every month.', LOC, 'RRULE:FREQ=MONTHLY;BYDAY=-1SU', '20260628T100000', '20260628T130000'),
    ics: () => downloadICS('Synantesis – The Divine Appointment', 'Deep worship and the weight of the Word. Last Sunday every month.', LOC, '20260628T100000', '20260628T130000', 'FREQ=MONTHLY;BYDAY=-1SU'),
  },
]

export default function EventsPage() {
  const [entered, setEntered] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80)

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )

    const selectors = [
      '.anim-num',
      '.anim-code',
      '.anim-name',
      '.anim-tag',
      '.anim-line',
      '.anim-when',
      '.anim-desc',
      '.anim-img',
      '.anim-verse',
      '.anim-up',
      '.anim-left',
      '.anim-right',
      '.anim-pop',
      '.anim-draw',
      '.anim-fade',
    ]
    document.querySelectorAll(selectors.join(',')).forEach((el) => obs.observe(el))

    return () => { clearTimeout(t); obs.disconnect() }
  }, [])

  const d = (s: number) => ({ transitionDelay: s + 's' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }} />
      <main ref={mainRef} style={{ background: '#080D08', overflowX: 'hidden' }}>
      <style>{`
        /* ─── Base: every animated element starts hidden ─── */
        .anim-up,
        .anim-num,
        .anim-code,
        .anim-name,
        .anim-tag,
        .anim-when,
        .anim-desc,
        .anim-verse,
        .anim-fade,
        .anim-left,
        .anim-right {
          opacity: 0;
        }

        /* ─── translateY rise + blur ─── */
        .anim-up,
        .anim-num,
        .anim-code,
        .anim-when,
        .anim-desc,
        .anim-verse,
        .anim-fade {
          transform: translateY(44px) scale(0.97);
          filter: blur(5px);
          transition:
            opacity 0.9s cubic-bezier(0.16,1,0.3,1),
            transform 1s cubic-bezier(0.16,1,0.3,1),
            filter 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-up.is-visible,
        .anim-num.is-visible,
        .anim-code.is-visible,
        .anim-when.is-visible,
        .anim-desc.is-visible,
        .anim-verse.is-visible,
        .anim-fade.is-visible {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        /* ─── Name: large title slides up with extra spring ─── */
        .anim-name {
          transform: translateY(60px) scale(0.95);
          filter: blur(8px);
          transition:
            opacity 1.1s cubic-bezier(0.16,1,0.3,1),
            transform 1.2s cubic-bezier(0.16,1,0.3,1),
            filter 1s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-name.is-visible {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        /* ─── Tag: spring scale pop ─── */
        .anim-tag {
          transform: scale(0.6) translateY(10px);
          filter: blur(4px);
          transition:
            opacity 0.7s cubic-bezier(0.34,1.56,0.64,1),
            transform 0.8s cubic-bezier(0.34,1.56,0.64,1),
            filter 0.6s;
        }
        .anim-tag.is-visible {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }

        /* ─── Gold line: scaleX draw from left ─── */
        .anim-line,
        .anim-draw {
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 1.1s cubic-bezier(0.16,1,0.3,1);
        }
        .anim-line.is-visible,
        .anim-draw.is-visible {
          transform: scaleX(1);
        }

        /* ─── Image: zoom-out reveal ─── */
        .anim-img {
          opacity: 0;
          transform: scale(1.12);
          filter: blur(10px);
          transition:
            opacity 1.4s cubic-bezier(0.16,1,0.3,1),
            transform 1.7s cubic-bezier(0.16,1,0.3,1),
            filter 1.2s;
        }
        .anim-img.is-visible {
          opacity: 1;
          transform: scale(1);
          filter: blur(0);
        }

        /* ─── Slide from sides ─── */
        .anim-left {
          transform: translateX(-60px) rotateY(-8deg);
          filter: blur(6px);
          transform-origin: right center;
          transition:
            opacity 1s cubic-bezier(0.16,1,0.3,1),
            transform 1.1s cubic-bezier(0.16,1,0.3,1),
            filter 0.9s;
        }
        .anim-left.is-visible { opacity:1; transform:none; filter:blur(0); }

        .anim-right {
          transform: translateX(60px) rotateY(8deg);
          filter: blur(6px);
          transform-origin: left center;
          transition:
            opacity 1s cubic-bezier(0.16,1,0.3,1),
            transform 1.1s cubic-bezier(0.16,1,0.3,1),
            filter 0.9s;
        }
        .anim-right.is-visible { opacity:1; transform:none; filter:blur(0); }

        /* ─── Mobile overrides — simpler, faster ─── */
        @media(max-width:860px) {
          .anim-up,
          .anim-num,
          .anim-code,
          .anim-name,
          .anim-when,
          .anim-desc,
          .anim-verse,
          .anim-fade {
            transform: translateY(28px) scale(0.98) !important;
            filter: blur(4px) !important;
          }
          .anim-left, .anim-right {
            transform: translateY(24px) !important;
            filter: blur(4px) !important;
          }
          .anim-name {
            transform: translateY(36px) scale(0.97) !important;
            filter: blur(5px) !important;
          }
          .anim-up.is-visible,
          .anim-num.is-visible,
          .anim-code.is-visible,
          .anim-name.is-visible,
          .anim-when.is-visible,
          .anim-desc.is-visible,
          .anim-verse.is-visible,
          .anim-fade.is-visible,
          .anim-left.is-visible,
          .anim-right.is-visible {
            transform: none !important;
            filter: blur(0) !important;
          }
        }

        /* ─── Gathering row ─── */
        .gathering-row {
          border-top: 1px solid rgba(250,247,242,0.07);
          padding: clamp(52px,7vw,96px) 0;
          position: relative;
          transition: border-color 0.5s, background 0.5s;
        }
        .gathering-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.3));
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .gathering-row:hover { border-color: rgba(201,168,76,0.2); background: rgba(201,168,76,0.012); }
        .gathering-row:hover::before { transform: scaleY(1); }
        .gathering-row:last-child { border-bottom: 1px solid rgba(250,247,242,0.07); }

        /* Photo zoom on hover */
        .photo-wrap { overflow: hidden; }
        .gathering-row:hover .photo-wrap img { transform: scale(1.06) !important; }

        /* Verse hover */
        .verse-block { transition: border-color 0.4s; }
        .gathering-row:hover .verse-block { border-color: rgba(201,168,76,0.45); }

        /* Social links */
        .soc-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s;
        }

        /* ─── Responsive layout ─── */
        .g-grid {
          display: grid;
          grid-template-columns: 56px 1fr 1fr 1fr;
          align-items: start;
          gap: clamp(24px,3.5vw,52px);
        }
        @media(max-width:1024px) {
          .g-grid { grid-template-columns: 48px 1fr 1fr; }
          .g-col-right { grid-column: 2 / 4; margin-top: 8px; }
        }
        @media(max-width:720px) {
          .g-grid { grid-template-columns: 1fr; gap: 24px; }
          .g-num { display: none !important; }
          .g-col-right { grid-column: 1; }
          .gathering-row:hover { padding-left: 0 !important; }
          .follow-grid { grid-template-columns: 1fr !important; }
          .follow-img { display: none !important; }
        }
        @media(max-width:480px) {
          .events-hero-pad { padding: 80px 24px 40px !important; }
        }
      `}</style>

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section style={{ height:'100vh', minHeight:'640px', position:'relative', overflow:'hidden', background:'#060D06' }}>
        <Image
          src="/images/gallery-congregation-worship.jpg"
          alt="Worship gathering"
          fill priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: entered ? 'scale(1.0)' : 'scale(1.09)',
            transition: 'transform 2.2s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
        {/* gradient overlays */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(6,13,6,0.97) 0%, rgba(6,13,6,0.75) 30%, rgba(6,13,6,0.25) 60%, transparent 82%)', zIndex:1 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(6,13,6,0.88) 0%, rgba(6,13,6,0.45) 35%, transparent 65%)', zIndex:1 }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'180px', background:'linear-gradient(to bottom, rgba(6,13,6,0.6) 0%, transparent 100%)', zIndex:1 }} />

        <div className="events-hero-pad" style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,72px) clamp(52px,7vw,88px)' }}>

          {/* Eyebrow */}
          <div style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'none' : 'translateY(20px)',
            filter: entered ? 'blur(0)' : 'blur(5px)',
            transition: 'opacity 0.9s 0.18s, transform 0.9s 0.18s, filter 0.8s 0.18s',
            marginBottom: 'clamp(22px,3vw,40px)',
          }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:'14px' }}>
              <div style={{ width:'32px', height:'1px', background:'rgba(201,168,76,0.5)' }} />
              <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)' }}>
                The Worship Nation
              </span>
            </div>
          </div>

          {/* ── Each hero word in its own overflow:hidden container ── */}
          <div style={{ overflow:'hidden', marginBottom:'6px' }}>
            <div style={{
              fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:0.9,
              color:'#FAF7F2', letterSpacing:'-0.02em', fontSize:'clamp(54px,8.5vw,110px)',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(115%) rotateX(22deg)',
              filter: entered ? 'blur(0)' : 'blur(4px)',
              transition: 'opacity 0.9s 0.36s, transform 0.95s 0.36s cubic-bezier(0.16,1,0.3,1), filter 0.8s 0.36s',
            }}>Three</div>
          </div>

          <div style={{ overflow:'hidden', marginBottom:'6px' }}>
            <div style={{
              fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:0.9,
              color:'#C9A84C', fontStyle:'italic', letterSpacing:'-0.02em', fontSize:'clamp(54px,8.5vw,110px)',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(115%) rotateX(22deg)',
              filter: entered ? 'blur(0)' : 'blur(4px)',
              transition: 'opacity 0.9s 0.52s, transform 0.95s 0.52s cubic-bezier(0.16,1,0.3,1), filter 0.8s 0.52s',
            }}>Gatherings.</div>
          </div>

          <div style={{ overflow:'hidden', marginBottom:'clamp(32px,5vw,56px)' }}>
            <div style={{
              fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:0.9,
              color:'#FAF7F2', letterSpacing:'-0.02em', fontSize:'clamp(54px,8.5vw,110px)',
              opacity: entered ? 1 : 0,
              transform: entered ? 'none' : 'translateY(115%) rotateX(22deg)',
              filter: entered ? 'blur(0)' : 'blur(4px)',
              transition: 'opacity 0.9s 0.68s, transform 0.95s 0.68s cubic-bezier(0.16,1,0.3,1), filter 0.8s 0.68s',
            }}>One God.</div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'none' : 'translateY(14px)',
            transition: 'opacity 0.9s 0.95s, transform 0.9s 0.95s',
            display:'flex', alignItems:'center', gap:'16px',
          }}>
            <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)', flexShrink:0 }} />
            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(201,168,76,0.4)' }}>Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ GATHERINGS ══════════════════════════════ */}
      <section style={{ background:'#080D08', padding:'0 clamp(24px,4.5vw,88px) clamp(64px,9vw,112px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>

          {gatherings.map((g, i) => {
            const base = i * 0.1
            return (
              <div key={g.code} className="gathering-row">
                <div className="g-grid">

                  {/* ── COL 1: Number ── */}
                  <div className="g-num">
                    <div
                      className="anim-num"
                      style={{ ...d(base), fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'0.24em', color:'rgba(201,168,76,0.35)', paddingTop:'6px' }}
                    >{g.num}</div>
                  </div>

                  {/* ── COL 2: Identity ── */}
                  <div>
                    {/* Code badge — small eyebrow */}
                    <div
                      className="anim-code"
                      style={{ ...d(base + 0.05), display:'inline-flex', alignItems:'center', gap:'10px', marginBottom:'clamp(14px,2vw,20px)' }}
                    >
                      <div style={{ width:'20px', height:'1px', background:'rgba(201,168,76,0.4)', flexShrink:0 }} />
                      <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)' }}>{g.code}</span>
                    </div>

                    {/* ── LARGE TITLE: full gathering name ── */}
                    <div
                      className="anim-name"
                      style={{ ...d(base + 0.13), marginBottom:'clamp(18px,2.5vw,28px)', lineHeight:1.05 }}
                    >
                      <h2 style={{
                        fontFamily:'Cormorant Garamond,serif',
                        fontSize:'clamp(38px,5.5vw,76px)',
                        fontWeight:400,
                        color:'#FAF7F2',
                        lineHeight:1.05,
                        margin:0,
                        letterSpacing:'-0.01em',
                      }}>{g.name}</h2>
                    </div>

                    {/* Tag pill */}
                    <div
                      className="anim-tag"
                      style={{ ...d(base + 0.26) }}
                    >
                      <div style={{ display:'inline-block', padding:'6px 16px', border:'1px solid rgba(201,168,76,0.3)', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(201,168,76,0.75)' }}>
                        {g.tag}
                      </div>
                    </div>
                  </div>

                  {/* ── COL 3: Schedule + description ── */}
                  <div>
                    {/* Gold line draw */}
                    <div
                      className="anim-line"
                      style={{ ...d(base + 0.08), height:'1px', background:'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.15))', marginBottom:'clamp(18px,2.5vw,28px)', width:'100%' }}
                    />

                    {/* When */}
                    <div
                      className="anim-when"
                      style={{ ...d(base + 0.18), fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)', marginBottom:'clamp(16px,2vw,24px)' }}
                    >{g.when}</div>

                    {/* Description */}
                    <p
                      className="anim-desc"
                      style={{ ...d(base + 0.28), fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.25vw,15px)', lineHeight:1.95, color:'rgba(250,247,242,0.4)', margin:0 }}
                    >{g.desc}</p>
                  </div>

                  {/* ── COL 4: Photo + verse ── */}
                  <div className="g-col-right">
                    {/* Image */}
                    <div
                      className="anim-right"
                      style={{ ...d(base + 0.2), aspectRatio:'4/3', position:'relative', overflow:'hidden', marginBottom:'clamp(16px,2.5vw,24px)' }}
                    >
                      <div className="photo-wrap" style={{ position:'absolute', inset:0 }}>
                        <div className="anim-img is-visible" style={{ position:'absolute', inset:0 }}>
                          <Image
                            src={g.img}
                            alt={g.name}
                            fill
                            style={{ objectFit:'cover', objectPosition:g.imgPos, transition:'transform 1.1s cubic-bezier(0.16,1,0.3,1)' }}
                          />
                          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, transparent 55%, rgba(8,13,8,0.55) 100%)' }} />
                        </div>
                      </div>
                    </div>

                    {/* Verse */}
                    <div
                      className="anim-verse verse-block"
                      style={{ ...d(base + 0.38), borderLeft:'2px solid rgba(201,168,76,0.2)', paddingLeft:'18px' }}
                    >
                      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'0.24em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'10px' }}>
                        {g.verse}
                      </div>
                      <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(14px,1.35vw,17px)', fontStyle:'italic', color:'rgba(250,247,242,0.5)', lineHeight:1.7 }}>
                        {g.verseText}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════ FOLLOW ══════════════════════════════ */}
      <section style={{ background:'#080D08', borderTop:'1px solid rgba(250,247,242,0.05)', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)' }}>
        <div className="follow-grid" style={{ maxWidth:'1320px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(48px,7vw,112px)', alignItems:'center' }}>
          <div>
            {/* Draw line */}
            <div className="anim-draw" style={{ height:'1px', background:'linear-gradient(90deg, #C9A84C, transparent)', marginBottom:'clamp(24px,3.5vw,40px)', width:'100%' }} />

            <div className="anim-up" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(18px,2.5vw,28px)' }}>
              Follow the Movement
            </div>

            <h2 className="anim-name" style={{ ...d(0.1), fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(34px,5vw,66px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, margin:'0 0 clamp(22px,3vw,36px)' }}>
              Don&apos;t miss what<br />God is <em style={{ color:'#C9A84C' }}>doing here.</em>
            </h2>

            <p className="anim-up" style={{ ...d(0.2), fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.9, color:'rgba(250,247,242,0.4)', margin:'0 0 clamp(32px,4.5vw,52px)' }}>
              Follow The Worship Nation for meeting announcements, live moments, and everything happening in the gatherings.
            </p>

            <div className="anim-up" style={{ ...d(0.3), display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <a
                href="https://www.instagram.com/theworshipnation_twn"
                target="_blank" rel="noopener noreferrer"
                className="soc-link"
                style={{ padding:'13px 26px', border:'1px solid rgba(201,168,76,0.35)', color:'#C9A84C' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.35)' }}
              >@theworshipnation_twn</a>
              <a
                href="https://www.instagram.com/thesolomonsteph"
                target="_blank" rel="noopener noreferrer"
                className="soc-link"
                style={{ padding:'13px 26px', border:'1px solid rgba(250,247,242,0.1)', color:'rgba(250,247,242,0.45)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.color='rgba(201,168,76,0.75)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(250,247,242,0.1)'; (e.currentTarget as HTMLElement).style.color='rgba(250,247,242,0.45)' }}
              >@thesolomonsteph</a>
            </div>
          </div>

          <div className="anim-right follow-img" style={{ aspectRatio:'1', position:'relative', overflow:'hidden' }}>
            <div className="photo-wrap anim-img is-visible" style={{ position:'absolute', inset:0 }}>
              <Image
                src="/images/gallery-solomon-worship-raise.jpg"
                alt="Solomon Stephen in worship"
                fill
                style={{ objectFit:'cover', objectPosition:'center top', transition:'transform 1.1s cubic-bezier(0.16,1,0.3,1)' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg, transparent 60%, rgba(8,13,8,0.6) 100%)' }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
