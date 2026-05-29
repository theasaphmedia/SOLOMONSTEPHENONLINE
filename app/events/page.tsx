'use client'

const eventsSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "name": "Mid Day Worship Experience (MDWE)",
      "description": "A mid-week worship gathering designed to shift the atmosphere of your week.",
      "eventSchedule": {
        "@type": "Schedule",
        "repeatFrequency": "P1W",
        "byDay": "Wednesday",
        "startTime": "12:00:00"
      },
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "TWN Studios",
        "address": { "@type": "PostalAddress", "streetAddress": "Langbasa Road, Ajah", "addressLocality": "Lagos", "addressCountry": "NG" }
      },
      "organizer": { "@type": "Person", "name": "Solomon Stephen", "url": "https://solomonstephen.com" },
      "url": "https://solomonstephen.com/events"
    },
    {
      "@type": "Event",
      "name": "The Slaughter House (TSH)",
      "description": "High-intensity worship, intercession, and consecration. Not a comfortable meeting.",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "TWN Studios",
        "address": { "@type": "PostalAddress", "streetAddress": "Langbasa Road, Ajah", "addressLocality": "Lagos", "addressCountry": "NG" }
      },
      "organizer": { "@type": "Person", "name": "Solomon Stephen", "url": "https://solomonstephen.com" },
      "url": "https://solomonstephen.com/events"
    },
    {
      "@type": "Event",
      "name": "Synantesis — The Divine Appointment",
      "description": "From the Greek for divine appointment — deep worship and the full weight of the Word. Last Sunday of every month.",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "TWN Studios",
        "address": { "@type": "PostalAddress", "streetAddress": "Langbasa Road, Ajah", "addressLocality": "Lagos", "addressCountry": "NG" }
      },
      "organizer": { "@type": "Person", "name": "Solomon Stephen", "url": "https://solomonstephen.com" },
      "url": "https://solomonstephen.com/events"
    }
  ]
}


import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Build a Google Calendar link
function gcalLink(title: string, details: string, location: string, rrule: string, dtstart: string, dtend: string) {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  const params = new URLSearchParams({
    text: title,
    details,
    location,
    dates: `${dtstart}/${dtend}`,
    recur: rrule,
  })
  return `${base}&${params.toString()}`
}

// Generate and download an ICS file
function downloadICS(title: string, description: string, location: string, dtstart: string, dtend: string, rrule: string) {
  const uid = `${Date.now()}@solomonstephen.com`
  const now = new Date().toISOString().replace(/[-:]/g,'').replace(/\..+/,'') + 'Z'
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Solomon Stephen//Events//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `RRULE:${rrule}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `${title.replace(/\s+/g,'-')}.ics`; a.click()
  URL.revokeObjectURL(url)
}

const LOC = 'TWN Studios, Langbasa Road, Ajah, Lagos'

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
    desc: 'From the Greek — συνάντησις — an arranged meeting. A scheduled, intentional, depth-first encounter with God. Deep worship. The weight of the Word. Space to stay as long as He remains.',
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

  useEffect(() => {
    setTimeout(() => setEntered(true), 80)
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) } }),
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv,.rv-left,.rv-right').forEach(el => obs.observe(el))
    return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema) }} />) => obs.disconnect()
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
        @media(max-width:860px){.mobile-cal-btns{display:flex!important}}
        @media(max-width:860px){.follow-grid{grid-template-columns:1fr!important}}
        @media(max-width:860px){.follow-img{display:none!important}}
        .social-link{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(250,247,242,.5);text-decoration:none;transition:color .3s}
        .social-link:hover{color:#C9A84C}
      `}</style>

      {/* ══ HERO — Full-bleed ══ */}
      <section style={{ height:'100vh', minHeight:'640px', position:'relative', overflow:'hidden', background:'#070D07' }}>
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
        {/* Gradient layers */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(7,13,7,0.97) 0%, rgba(7,13,7,0.80) 28%, rgba(7,13,7,0.30) 58%, transparent 82%)', zIndex:1 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(7,13,7,0.88) 0%, rgba(7,13,7,0.52) 32%, rgba(7,13,7,0.10) 58%, transparent 75%)', zIndex:1 }} />
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'220px', background:'linear-gradient(to bottom, rgba(7,13,7,0.65) 0%, transparent 100%)', zIndex:1 }} />

        <div className="events-hero" style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,160px) clamp(32px,5vw,72px) clamp(48px,7vw,80px)' }}>
          <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(24px)', transition:'opacity 1s .3s, transform 1s .3s' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(20px,3vw,36px)' }}>
              The Worship Nation
            </div>
          </div>

          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontWeight:400, lineHeight:.92, color:'#FAF7F2', margin:'0 0 clamp(28px,4vw,48px)', letterSpacing:'-.02em',
            opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(32px)', transition:'opacity 1s .5s, transform 1s .5s',
            fontSize:'clamp(52px,8vw,104px)'
          }}>
            Three<br />
            <em style={{ color:'#C9A84C' }}>Gatherings.</em><br />
            One God.
          </h1>

          <div style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(20px)', transition:'opacity 1s .75s, transform 1s .75s' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <div style={{ width:'1px', height:'40px', background:'linear-gradient(to bottom, rgba(201,168,76,.4), transparent)', flexShrink:0 }} />
              <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(201,168,76,0.4)' }}>Scroll to explore</span>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:700px){.events-hero{padding:80px 24px clamp(40px,8vw,56px)!important}}
          @media(max-width:700px){.events-hero h1{font-size:clamp(48px,14vw,76px)!important}}
        `}</style>
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

              {/* When + desc + mobile calendar */}
              <div>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)', marginBottom:'16px' }}>{g.when}</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.42)', margin:'0 0 20px' }}>{g.desc}</p>
                {/* Mobile-only calendar buttons */}
                <div className="mobile-cal-btns" style={{ display:'none', gap:'8px', flexWrap:'wrap' }}>
                  <a href={g.gcal} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.18em', textTransform:'uppercase', padding:'8px 14px', border:'1px solid rgba(201,168,76,0.35)', color:'rgba(201,168,76,0.7)', textDecoration:'none', display:'flex', alignItems:'center', gap:'6px' }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    Add to Google Cal
                  </a>
                  <button onClick={g.ics}
                    style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.18em', textTransform:'uppercase', padding:'8px 14px', border:'1px solid rgba(250,247,242,.12)', color:'rgba(250,247,242,.35)', background:'transparent', cursor:'pointer', display:'flex', alignItems:'center', gap:'6px' }}
                  >Download .ics</button>
                </div>
              </div>

              {/* Photo + verse + calendar */}
              <div className="gathering-photo">
                <div style={{ aspectRatio:'4/3', position:'relative', overflow:'hidden', marginBottom:'20px' }}>
                  <Image src={g.img} alt={g.code} fill style={{ objectFit:'cover', objectPosition:g.imgPos }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(10,10,10,0.25)' }} />
                </div>
                <div style={{ borderLeft:'1px solid rgba(201,168,76,0.3)', paddingL