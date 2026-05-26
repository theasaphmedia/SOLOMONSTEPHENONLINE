'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

/* ─── constants ─────────────────────────────────────────────────── */
const WHATSAPP = '2348000000000'   // ← replace with real number (digits only)
const EMAIL    = 'theasaphmedia@gmail.com'
const IG       = 'https://www.instagram.com/twnstudiosglobal'

/* ─── data ───────────────────────────────────────────────────────── */
const SERVICES = [
  { id:'recording',  icon:'◎', label:'Recording',          sub:'Vocal · Instrument · Full Band',    desc:'Acoustically treated rooms built for clarity, warmth, and depth. Every nuance captured.' },
  { id:'mixing',     icon:'◈', label:'Mixing',              sub:'Stereo · Stems · Multi-track',      desc:'World-class mix engineering that translates across every playback system.' },
  { id:'mastering',  icon:'◉', label:'Mastering',           sub:'Streaming · Vinyl · CD',            desc:'Final masters optimised for every platform — crystal clarity, balanced impact.' },
  { id:'production', icon:'◐', label:'Music Production',   sub:'Beats · Arrangement · Orchestration',desc:'Full production from idea to final track. Beats, live instrumentation, or full strings.' },
  { id:'video',      icon:'▣', label:'Video Production',   sub:'Studio · Live · Documentary',        desc:'High-quality video for music, ministry content, and brand documentaries.' },
  { id:'streaming',  icon:'◑', label:'Live Streaming',     sub:'Multi-Platform · Broadcast-Quality', desc:'Professional live stream setups for churches, concerts, and personal broadcasts.' },
  { id:'events',     icon:'◻', label:'Event Hosting',      sub:'Up to 60 Guests · Full AV',         desc:'Intimate concerts, showcases, listening parties. Full audio/visual support.' },
  { id:'creative',   icon:'✦', label:'Creative Direction', sub:'Brand · Sound · Visual Identity',   desc:'Holistic creative oversight — your sound identity shaped with intention and skill.' },
]

const GEAR = [
  { name:'Yamaha Motif ES7',         cat:'Keyboard Workstation', desc:'76-key flagship synth with orchestral, cinematic, and worship sound libraries.' },
  { name:'Behringer XR18',           cat:'Digital Mixing Console',desc:'18-channel digital mixer with built-in effects and remote control via tablet.' },
  { name:'Professional Drum Kit',    cat:'Live Percussion',      desc:'Full acoustic kit with cymbals, tuned for live recording and worship production.' },
  { name:'Studio Microphone Array',  cat:'Capture System',       desc:'Condenser and dynamic mics for every application — vocals, room, instruments.' },
  { name:'Studio Monitor System',    cat:'Reference Playback',   desc:'Calibrated studio monitors for accurate, flat reference mixing and mastering.' },
  { name:'Acoustic Treatment',       cat:'Room & Environment',   desc:'Professionally treated environment with controlled reflections and live feel.' },
]

const FAQS = [
  { q:'Do I need to bring my own engineer?',
    a:'Not at all. TWN Studios provides a skilled in-house engineer for all recording, mixing, and streaming sessions. You may also bring your own — we accommodate both.' },
  { q:'Can I visit the studio before booking?',
    a:'Yes. We welcome artists and teams to tour the space. Reach out via WhatsApp or email to arrange a convenient time.' },
  { q:'How far in advance should I book?',
    a:'We recommend at least 3–5 days for standard sessions. For events or multi-day projects, 2+ weeks is ideal to ensure full availability.' },
  { q:'Is the studio available for church and ministry use?',
    a:'Absolutely. TWN Studios was built for creative and ministry excellence. We have packages tailored specifically for worship teams and church productions.' },
  { q:'What is included in every session?',
    a:'All sessions include the recording space, in-house engineer, standard equipment setup, and client hospitality. Live-stream rigs, video crew, and additional services are available as add-ons.' },
]

const DURATIONS = [
  { label:'3 Hours',        sub:'Quick session' },
  { label:'Half Day (5h)', sub:'Single focus' },
  { label:'Full Day (10h)',sub:'Full production' },
  { label:'Multi-Day',     sub:'Album / Project' },
]

const TIME_SLOTS = ['9:00 AM','11:00 AM','1:00 PM','3:00 PM','5:00 PM','7:00 PM']

/* ─── calendar helpers ───────────────────────────────────────────── */
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate() }
function firstDayOfMonth(y: number, m: number) { return new Date(y, m, 1).getDay() }

function getAvailableDates(): Set<string> {
  const set = new Set<string>()
  const today = new Date()
  for (let i = 2; i <= 45; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() !== 0) set.add(d.toISOString().slice(0, 10))
  }
  return set
}

const AVAILABLE = getAvailableDates()
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_NAMES   = ['Su','Mo','Tu','We','Th','Fr','Sa']

/* ─── component ─────────────────────────────────────────────────── */
export default function StudiosPage() {
  /* refs */
  const heroRef    = useRef<HTMLElement>(null)
  const bookRef    = useRef<HTMLElement>(null)
  const galRef     = useRef<HTMLDivElement>(null)

  /* ui state */
  const [openFaq,    setOpenFaq]    = useState<number | null>(null)
  const [svcHover,   setSvcHover]   = useState<number | null>(null)
  const [gearHover,  setGearHover]  = useState<number | null>(null)
  const [floatShow,  setFloatShow]  = useState(false)
  const [sent,       setSent]       = useState(false)

  /* booking state */
  const [bStep,      setBStep]      = useState<1|2|3|4>(1)
  const [bService,   setBService]   = useState('')
  const [calYear,    setCalYear]    = useState(() => new Date().getFullYear())
  const [calMonth,   setCalMonth]   = useState(() => new Date().getMonth())
  const [bDate,      setBDate]      = useState('')
  const [bSlot,      setBSlot]      = useState('')
  const [bDuration,  setBDuration]  = useState('')
  const [bName,      setBName]      = useState('')
  const [bNotes,     setBNotes]     = useState('')

  /* scroll observer for floating button */
  useEffect(() => {
    const handler = () => {
      const top = bookRef.current?.getBoundingClientRect().top ?? 9999
      const bot = bookRef.current?.getBoundingClientRect().bottom ?? 0
      const inView = top < window.innerHeight && bot > 0
      setFloatShow(window.scrollY > 600 && !inView)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  /* intersection observers for reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target) } }),
      { threshold: 0.07, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  /* booking helpers */
  const bookMsg = () =>
    `Hi TWN Studios!\n\nBooking enquiry:\nService: ${bService}\nDate: ${bDate}\nTime: ${bSlot}\nDuration: ${bDuration}\nName: ${bName}\nNotes: ${bNotes || 'None'}\n\nLooking forward to connecting!`

  const sendWA = () => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(bookMsg())}`, '_blank')
    setSent(true)
  }
  const sendEmail = () => {
    window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(`TWN Studios – ${bService}`)}&body=${encodeURIComponent(bookMsg())}`, '_blank')
    setSent(true)
  }
  const resetBook = () => { setSent(false); setBStep(1); setBService(''); setBDate(''); setBSlot(''); setBDuration(''); setBName(''); setBNotes('') }

  /* calendar grid */
  const calDays = useCallback(() => {
    const first = firstDayOfMonth(calYear, calMonth)
    const total = daysInMonth(calYear, calMonth)
    const cells: Array<{ day: number | null; key: string | null }> = []
    for (let i = 0; i < first; i++) cells.push({ day: null, key: null })
    for (let d = 1; d <= total; d++) {
      const key = `${calYear}-${String(calMonth + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
      cells.push({ day: d, key })
    }
    while (cells.length % 7 !== 0) cells.push({ day: null, key: null })
    return cells
  }, [calYear, calMonth])

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  const scrollToBook = () => bookRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })

  /* ─── render ──────────────────────────────────────────────────── */
  return (
    <main style={{ background:'#09090E', color:'#F0EDE8', overflowX:'hidden' }}>
      <style>{`
        /* reveals */
        .rv{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv.vis{opacity:1;transform:none}
        .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}.rv.d4{transition-delay:.4s}
        /* keyframes */
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes stepIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
        @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}50%{box-shadow:0 0 0 6px rgba(201,168,76,.12)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        /* eyebrow */
        .ew{font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:.38em;text-transform:uppercase;color:rgba(201,168,76,.65);display:flex;align-items:center;gap:10px}
        .ew::before{content:'';width:24px;height:1px;background:rgba(201,168,76,.5)}
        /* gold line */
        .gl{height:1px;background:linear-gradient(90deg,rgba(201,168,76,.5) 0%,transparent 100%)}
        /* service card */
        .svc-card{border:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.02);padding:clamp(20px,2.5vw,32px);border-radius:2px;transition:all .4s cubic-bezier(.16,1,.3,1);cursor:default}
        .svc-card:hover{border-color:rgba(201,168,76,.3);background:rgba(201,168,76,.04);transform:translateY(-4px)}
        /* gear card */
        .gear-card{border-left:1px solid rgba(201,168,76,.12);padding:clamp(16px,2vw,24px) clamp(16px,2vw,24px);transition:all .35s;cursor:default}
        .gear-card:hover{border-left-color:#C9A84C;background:rgba(201,168,76,.03)}
        /* faq */
        .faq-item{border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden}
        /* calendar cell */
        .cal-cell{width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;
          border-radius:50%;font-family:'DM Sans',sans-serif;font-size:13px;cursor:default;transition:all .25s;position:relative}
        .cal-cell.avail{cursor:pointer;color:#F0EDE8}
        .cal-cell.avail:hover{background:rgba(201,168,76,.15);color:#C9A84C}
        .cal-cell.selected{background:#C9A84C!important;color:#09090E!important;font-weight:700}
        .cal-cell.past{color:rgba(255,255,255,.15)}
        .cal-cell.empty{pointer-events:none}
        /* slot chip */
        .slot-chip{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.1em;padding:9px 16px;border:1px solid rgba(255,255,255,.08);border-radius:1px;cursor:pointer;transition:all .25s;color:rgba(240,237,232,.5);background:transparent}
        .slot-chip:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        .slot-chip.sel{border-color:#C9A84C;color:#09090E;background:#C9A84C;font-weight:600}
        /* dur chip */
        .dur-chip{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.08em;padding:10px 20px;border:1px solid rgba(255,255,255,.08);border-radius:1px;cursor:pointer;transition:all .25s;color:rgba(240,237,232,.5);background:transparent;text-align:left}
        .dur-chip:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        .dur-chip.sel{border-color:#C9A84C;color:#09090E;background:#C9A84C;font-weight:600}
        .dur-chip.sel small{color:rgba(13,27,13,.7)}
        /* inputs */
        .b-input{width:100%;font-family:'DM Sans',sans-serif;font-size:14px;color:#F0EDE8;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:1px;padding:13px 16px;outline:none;transition:border-color .3s;box-sizing:border-box}
        .b-input:focus{border-color:rgba(201,168,76,.45)}
        .b-input::placeholder{color:rgba(240,237,232,.25)}
        /* cta btn */
        .btn-gold{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;padding:15px 40px;background:#C9A84C;color:#09090E;border:none;cursor:pointer;font-weight:700;transition:background .3s,transform .3s;border-radius:1px}
        .btn-gold:hover{background:#E5C76B;transform:translateY(-2px)}
        .btn-gold:disabled{opacity:.3;cursor:default;transform:none}
        .btn-outline{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;padding:14px 36px;background:transparent;color:rgba(240,237,232,.6);border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:all .3s;border-radius:1px}
        .btn-outline:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        /* send buttons */
        .btn-wa{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:15px 32px;background:#25D366;color:#fff;border:none;cursor:pointer;font-weight:700;transition:all .3s;border-radius:1px;display:inline-flex;align-items:center;gap:9px}
        .btn-wa:hover{background:#1ebe5a;transform:translateY(-2px)}
        .btn-wa:disabled{opacity:.3;cursor:default;transform:none}
        .btn-em{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:14px 28px;background:transparent;color:#C9A84C;border:1px solid rgba(201,168,76,.3);cursor:pointer;font-weight:600;transition:all .3s;border-radius:1px;display:inline-flex;align-items:center;gap:9px}
        .btn-em:hover{background:rgba(201,168,76,.07);border-color:#C9A84C;transform:translateY(-2px)}
        .btn-em:disabled{opacity:.3;cursor:default;transform:none}
        /* back */
        .btn-back{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;background:transparent;border:none;color:rgba(240,237,232,.3);cursor:pointer;transition:color .3s;padding:0}
        .btn-back:hover{color:rgba(240,237,232,.65)}
        /* floating book */
        .float-book{position:fixed;bottom:32px;right:32px;z-index:90;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;padding:13px 28px;background:#C9A84C;color:#09090E;border:none;cursor:pointer;font-weight:700;border-radius:32px;box-shadow:0 8px 32px rgba(201,168,76,.25);transition:all .4s cubic-bezier(.16,1,.3,1);animation:pulseGold 3s infinite}
        .float-book:hover{background:#E5C76B;transform:translateY(-3px) scale(1.04);box-shadow:0 12px 40px rgba(201,168,76,.35)}
        /* progress steps */
        .prog-pill{height:3px;border-radius:2px;transition:all .5s cubic-bezier(.16,1,.3,1)}
        /* book summary */
        .sum-row{display:flex;justify-content:space-between;align-items:baseline;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05)}
        .sum-row:last-child{border-bottom:none}
        /* gallery */
        .gal-frame{position:relative;overflow:hidden;border-radius:2px}
        .gal-frame img{transition:transform 1s cubic-bezier(.16,1,.3,1)}
        .gal-frame:hover img{transform:scale(1.06)}
        /* mobile */
        @media(max-width:860px){
          .hero-sub{display:none}
          .gear-grid{grid-template-columns:1fr!important}
          .gear-photo{display:none!important}
          .svc-grid{grid-template-columns:1fr 1fr!important}
          .book-layout{grid-template-columns:1fr!important}
          .book-summary{display:none!important}
          .float-book{bottom:20px;right:20px;padding:11px 22px}
          .gal-masonry{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}
          .gal-big{grid-column:span 2!important;grid-row:auto!important}
        }
        @media(max-width:540px){
          .svc-grid{grid-template-columns:1fr!important}
          .slot-grid{grid-template-columns:repeat(3,1fr)!important}
        }
      `}</style>

      {/* ════════════════════════════════════════════ HERO */}
      <section ref={heroRef} style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        {/* background photo */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <Image src="/images/twn-studio-hall.jpg" alt="TWN Studios" fill style={{ objectFit:'cover', objectPosition:'center center' }} priority />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(9,9,14,.82) 0%, rgba(9,9,14,.55) 40%, rgba(9,9,14,.92) 100%)' }} />
          {/* subtle gold vignette */}
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,.04) 0%, transparent 70%)' }} />
        </div>

        {/* content */}
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'clamp(120px,15vw,180px) clamp(24px,6vw,80px) clamp(80px,10vw,120px)', maxWidth:'900px', margin:'0 auto', animation:'fadeUp .9s .2s both' }}>
          <div className="ew" style={{ justifyContent:'center', marginBottom:'clamp(24px,3.5vw,40px)', color:'rgba(201,168,76,.55)' }}>
            TWN Studios International · Ajah, Lagos
          </div>

          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(52px,9vw,116px)', fontWeight:400, lineHeight:.88, color:'#F0EDE8', margin:'0 0 clamp(24px,3vw,36px)', letterSpacing:'-.025em' }}>
            Where Craft<br />Meets <em style={{ color:'#C9A84C' }}>Calling.</em>
          </h1>

          <p className="hero-sub" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.85, color:'rgba(240,237,232,.52)', maxWidth:'520px', margin:'0 auto clamp(36px,5vw,60px)' }}>
            A consecrated recording sanctuary in Lagos. Purpose-built for artists and ministers who refuse to separate excellence from anointing.
          </p>

          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn-gold" onClick={scrollToBook}>Book a Session</button>
            <button className="btn-outline" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior:'smooth' })}>
              Explore Services
            </button>
            <button className="btn-outline" onClick={() => document.getElementById('gear')?.scrollIntoView({ behavior:'smooth' })}>
              View Gear
            </button>
          </div>
        </div>

        {/* scroll indicator */}
        <div style={{ position:'absolute', bottom:'36px', left:'50%', transform:'translateX(-50%)', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', animation:'float 2.5s ease-in-out infinite' }}>
          <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,.5))' }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════ OVERVIEW */}
      <section style={{ background:'#0D1117', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(201,168,76,.07)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          {/* metrics row */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'rgba(201,168,76,.08)', borderRadius:'2px', overflow:'hidden', marginBottom:'clamp(56px,7vw,96px)' }} className="rv">
            {[['6','Studio Services'],['60+','Guest Capacity'],['4K','Video Capability'],['24/7','Booking Support']].map(([n,l]) => (
              <div key={l} style={{ background:'#0D1117', padding:'clamp(24px,3vw,40px) clamp(20px,3vw,36px)' }}>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>{n}</div>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(240,237,232,.35)' }}>{l}</div>
              </div>
            ))}
          </div>

          {/* two-col text */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'clamp(40px,6vw,96px)' }}>
            <div>
              <div className="ew rv" style={{ marginBottom:'clamp(20px,2.5vw,28px)' }}>The Vision</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,48px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.1, margin:'0 0 clamp(16px,2vw,24px)' }}>
                A creative sanctuary<br />built for <em style={{ color:'#C9A84C' }}>excellence.</em>
              </h2>
              <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.9, color:'rgba(240,237,232,.45)' }}>
                TWN Studios International was built on a conviction: the space where you create shapes what you create. Situated in the Kenny T. Kay Building on Langbasa Road, Ajah, Lagos — acoustically treated, professionally equipped, and spiritually consecrated.
              </p>
            </div>
            <div className="rv d2">
              <div className="ew" style={{ marginBottom:'clamp(20px,2.5vw,28px)' }}>Location</div>
              <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
                {[
                  ['Address', 'Kenny T. Kay Building, beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos'],
                  ['Capacity', 'Up to 60 guests for live events and showcases'],
                  ['Contact', EMAIL],
                  ['Instagram', '@twnstudiosglobal'],
                ].map(([lbl, val]) => (
                  <div key={lbl} style={{ display:'flex', gap:'16px' }}>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'#C9A84C', minWidth:'76px', paddingTop:'2px', flexShrink:0 }}>{lbl}</span>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', lineHeight:1.65, color:'rgba(240,237,232,.5)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ GEAR */}
      <section id="gear" style={{ background:'#09090E', padding:'clamp(80px,10vw,140px) 0', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(24px,4vw,80px)' }}>
          <div className="ew rv" style={{ marginBottom:'clamp(16px,2vw,24px)' }}>Studio Gear</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(40px,5vw,72px)' }}>
            Tools built for<br /><em style={{ color:'#C9A84C' }}>world-class work.</em>
          </h2>
        </div>

        <div className="gear-grid" style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 480px', gap:'0', padding:'0 clamp(24px,4vw,80px)' }}>
          {/* gear list */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
            {GEAR.map((g, i) => (
              <div key={g.name} className="gear-card rv" style={{ transitionDelay:`${i*.07}s` }}
                onMouseEnter={() => setGearHover(i)} onMouseLeave={() => setGearHover(null)}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px' }}>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(201,168,76,.5)', marginBottom:'6px' }}>{g.cat}</div>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(20px,2.5vw,28px)', fontWeight:400, color: gearHover===i ? '#C9A84C' : '#F0EDE8', transition:'color .3s', lineHeight:1.1 }}>{g.name}</div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', lineHeight:1.7, color:'rgba(240,237,232,.38)', marginTop:'8px', maxWidth:'480px' }}>{g.desc}</div>
                  </div>
                  <div style={{ flexShrink:0, width:'24px', height:'24px', border:'1px solid rgba(201,168,76,.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .3s', background: gearHover===i ? 'rgba(201,168,76,.1)' : 'transparent', borderColor: gearHover===i ? '#C9A84C' : 'rgba(201,168,76,.2)' }}>
                    <div style={{ width:'6px', height:'6px', borderRadius:'50%', background: gearHover===i ? '#C9A84C' : 'rgba(201,168,76,.4)', transition:'all .3s' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* featured gear photo */}
          <div className="gear-photo" style={{ position:'relative', marginLeft:'48px', borderRadius:'2px', overflow:'hidden' }}>
            <Image src="/images/twn-studio-drums.jpg" alt="Studio drum kit" fill style={{ objectFit:'cover', objectPosition:'center 20%' }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(9,9,14,.3) 0%, transparent 60%)' }} />
            {/* gear badge */}
            <div style={{ position:'absolute', bottom:'24px', left:'24px', background:'rgba(9,9,14,.8)', backdropFilter:'blur(12px)', border:'1px solid rgba(201,168,76,.2)', padding:'12px 18px', borderRadius:'2px' }}>
              <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.7)', marginBottom:'4px' }}>Live Percussion</div>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'18px', color:'#F0EDE8' }}>Professional Drum Kit</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ SERVICES */}
      <section id="services" style={{ background:'#0D1117', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,72px)' }}>
            <div>
              <div className="ew rv" style={{ marginBottom:'clamp(14px,2vw,20px)' }}>What We Do</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:0 }}>
                Every service.<br /><em style={{ color:'#C9A84C' }}>Crafted with intention.</em>
              </h2>
            </div>
            <button className="btn-gold rv d2" onClick={scrollToBook}>Book Now</button>
          </div>

          <div className="svc-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,.04)' }}>
            {SERVICES.map((s, i) => (
              <div key={s.id} className="svc-card rv" style={{ transitionDelay:`${i*.05}s`, borderRadius:0, border:'none' }}
                onMouseEnter={() => setSvcHover(i)} onMouseLeave={() => setSvcHover(null)}>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'18px', color:'rgba(201,168,76,.55)', marginBottom:'16px', transition:'color .3s', ...(svcHover===i ? { color:'#C9A84C' } : {}) }}>{s.icon}</div>
                <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(20px,2vw,26px)', fontWeight:400, color:svcHover===i?'#C9A84C':'#F0EDE8', transition:'color .3s', marginBottom:'6px' }}>{s.label}</div>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', marginBottom:'14px' }}>{s.sub}</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', lineHeight:1.75, color:'rgba(240,237,232,.4)', margin:0 }}>{s.desc}</p>
                <button
                  onClick={() => { setBService(s.label); setBStep(2); scrollToBook() }}
                  style={{ marginTop:'20px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.6)', background:'transparent', border:'1px solid rgba(201,168,76,.18)', padding:'7px 16px', cursor:'pointer', transition:'all .3s', borderRadius:'1px' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.18)'; (e.currentTarget as HTMLElement).style.color='rgba(201,168,76,.6)' }}
                >Book this →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ BOOKING */}
      <section ref={bookRef as React.RefObject<HTMLElement>} id="book" style={{ background:'#080B08', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(201,168,76,.08)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div className="ew rv" style={{ color:'rgba(201,168,76,.6)', marginBottom:'clamp(14px,2vw,20px)' }}>Book a Session</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(40px,5vw,64px)' }}>
            Your session starts<br /><em style={{ color:'#C9A84C' }}>here.</em>
          </h2>

          {!sent ? (
            <div>
              {/* progress bar */}
              <div style={{ display:'flex', gap:'6px', marginBottom:'clamp(36px,5vw,60px)', alignItems:'center' }}>
                {[1,2,3,4].map(n => (
                  <div key={n} className="prog-pill" style={{ flex:1, background: bStep >= n ? '#C9A84C' : 'rgba(201,168,76,.12)', maxWidth:'80px', opacity: bStep >= n ? 1 : 0.5 }} />
                ))}
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', marginLeft:'12px', flexShrink:0 }}>
                  {['Select Service','Choose Date','Session Details','Review & Send'][bStep-1]}
                </span>
              </div>

              <div className="book-layout" style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:'48px', alignItems:'start' }}>

                {/* main panel */}
                <div>
                  {/* STEP 1 — service */}
                  {bStep === 1 && (
                    <div style={{ animation:'stepIn .4s both' }}>
                      <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color:'rgba(240,237,232,.4)', marginBottom:'24px', lineHeight:1.7 }}>
                        What are you coming in for?
                      </p>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', marginBottom:'36px' }}>
                        {SERVICES.map(s => (
                          <button key={s.id} className={`slot-chip${bService===s.label?' sel':''}`}
                            onClick={() => setBService(s.label)}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                      <button className="btn-gold" disabled={!bService} onClick={() => setBStep(2)}>Continue →</button>
                    </div>
                  )}

                  {/* STEP 2 — calendar + time */}
                  {bStep === 2 && (
                    <div style={{ animation:'stepIn .4s both' }}>
                      <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,.35)', marginBottom:'28px' }}>
                        <span style={{ color:'#C9A84C' }}>{bService}</span> — select a date and time
                      </p>

                      {/* calendar */}
                      <div style={{ background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.07)', borderRadius:'2px', padding:'clamp(16px,2vw,24px)', marginBottom:'28px' }}>
                        {/* month nav */}
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px' }}>
                          <button onClick={prevMonth} style={{ background:'transparent', border:'1px solid rgba(255,255,255,.08)', color:'rgba(240,237,232,.5)', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'14px', transition:'all .25s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.4)'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.color='rgba(240,237,232,.5)' }}>
                            ‹
                          </button>
                          <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'20px', color:'#F0EDE8', letterSpacing:'.02em' }}>
                            {MONTH_NAMES[calMonth]} {calYear}
                          </span>
                          <button onClick={nextMonth} style={{ background:'transparent', border:'1px solid rgba(255,255,255,.08)', color:'rgba(240,237,232,.5)', width:'32px', height:'32px', borderRadius:'50%', cursor:'pointer', fontSize:'14px', transition:'all .25s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.4)'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.color='rgba(240,237,232,.5)' }}>
                            ›
                          </button>
                        </div>
                        {/* day headers */}
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px', marginBottom:'4px' }}>
                          {DAY_NAMES.map(d => (
                            <div key={d} style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(240,237,232,.25)', textAlign:'center', padding:'6px 0' }}>{d}</div>
                          ))}
                        </div>
                        {/* date cells */}
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px' }}>
                          {calDays().map((cell, i) => {
                            if (!cell.key) return <div key={i} className="cal-cell empty" />
                            const today = new Date(); today.setHours(0,0,0,0)
                            const cellDate = new Date(cell.key + 'T00:00:00')
                            const isPast = cellDate <= today
                            const isAvail = AVAILABLE.has(cell.key)
                            const isSel = bDate === cell.key
                            return (
                              <button key={cell.key}
                                className={`cal-cell${isPast?' past':isAvail?' avail':''}${isSel?' selected':''}`}
                                onClick={() => isAvail && !isPast && cell.key && setBDate(cell.key)}
                                disabled={isPast || !isAvail}
                                style={{ color: isPast ? 'rgba(255,255,255,.12)' : isAvail ? (isSel ? '#09090E' : '#F0EDE8') : 'rgba(255,255,255,.18)' }}
                              >
                                {cell.day}
                                {isAvail && !isPast && !isSel && (
                                  <div style={{ position:'absolute', bottom:'3px', left:'50%', transform:'translateX(-50%)', width:'3px', height:'3px', borderRadius:'50%', background:'rgba(201,168,76,.55)' }} />
                                )}
                              </button>
                            )
                          })}
                        </div>
                        <div style={{ marginTop:'12px', fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'rgba(240,237,232,.25)', display:'flex', alignItems:'center', gap:'6px' }}>
                          <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:'rgba(201,168,76,.55)' }} />
                          Available dates
                        </div>
                      </div>

                      {/* time slots */}
                      {bDate && (
                        <div style={{ animation:'stepIn .35s both' }}>
                          <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.35)', marginBottom:'12px' }}>
                            Available slots — {new Date(bDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })}
                          </div>
                          <div className="slot-grid" style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'8px', marginBottom:'28px' }}>
                            {TIME_SLOTS.map(t => (
                              <button key={t} className={`slot-chip${bSlot===t?' sel':''}`} onClick={() => setBSlot(t)}>{t}</button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{ display:'flex', gap:'14px', alignItems:'center' }}>
                        <button className="btn-gold" disabled={!bDate || !bSlot} onClick={() => setBStep(3)}>Continue →</button>
                        <button className="btn-back" onClick={() => setBStep(1)}>← Back</button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 — duration + details */}
                  {bStep === 3 && (
                    <div style={{ animation:'stepIn .4s both' }}>
                      <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,.35)', marginBottom:'24px' }}>
                        <span style={{ color:'#C9A84C' }}>{bService}</span> · {bDate && new Date(bDate+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'long'})} · {bSlot}
                      </p>

                      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.35)', marginBottom:'12px' }}>Session duration</div>
                      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px', marginBottom:'28px' }}>
                        {DURATIONS.map(d => (
                          <button key={d.label} className={`dur-chip${bDuration===d.label?' sel':''}`} onClick={() => setBDuration(d.label)}>
                            <div>{d.label}</div>
                            <small style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'rgba(240,237,232,.35)', letterSpacing:'.08em', textTransform:'uppercase' }}>{d.sub}</small>
                          </button>
                        ))}
                      </div>

                      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.35)', marginBottom:'12px' }}>Your details</div>
                      <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'28px' }}>
                        <input className="b-input" placeholder="Your name *" value={bName} onChange={e => setBName(e.target.value)} />
                        <textarea className="b-input" placeholder="Project notes — what are you working on?" rows={3} value={bNotes} onChange={e => setBNotes(e.target.value)} style={{ resize:'vertical' }} />
                      </div>

                      <div style={{ display:'flex', gap:'14px', alignItems:'center' }}>
                        <button className="btn-gold" disabled={!bDuration || !bName} onClick={() => setBStep(4)}>Review Booking →</button>
                        <button className="btn-back" onClick={() => setBStep(2)}>← Back</button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 — review + send */}
                  {bStep === 4 && (
                    <div style={{ animation:'stepIn .4s both' }}>
                      <div style={{ background:'rgba(201,168,76,.04)', border:'1px solid rgba(201,168,76,.12)', borderRadius:'2px', padding:'clamp(20px,3vw,32px)', marginBottom:'28px' }}>
                        <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.55)', marginBottom:'20px' }}>Booking Summary</div>
                        {[
                          ['Service',  bService],
                          ['Date',     bDate ? new Date(bDate+'T00:00:00').toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}) : ''],
                          ['Time',     bSlot],
                          ['Duration', bDuration],
                          ['Name',     bName],
                          ['Notes',    bNotes || 'None'],
                        ].map(([l,v]) => (
                          <div key={l} className="sum-row">
                            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.35)' }}>{l}</span>
                            <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,.75)', textAlign:'right', maxWidth:'60%' }}>{v}</span>
                          </div>
                        ))}
                      </div>

                      <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', color:'rgba(240,237,232,.3)', marginBottom:'20px', lineHeight:1.7 }}>
                        Send your enquiry via WhatsApp for fastest response, or via email. We confirm all sessions within 24 hours.
                      </p>

                      <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'16px' }}>
                        <button className="btn-wa" disabled={!bName} onClick={sendWA}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                          Send via WhatsApp
                        </button>
                        <button className="btn-em" disabled={!bName} onClick={sendEmail}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                          Send via Email
                        </button>
                      </div>
                      <button className="btn-back" onClick={() => setBStep(3)}>← Edit details</button>
                    </div>
                  )}
                </div>

                {/* summary sidebar */}
                <div className="book-summary" style={{ position:'sticky', top:'80px', background:'rgba(255,255,255,.03)', border:'1px solid rgba(255,255,255,.06)', borderRadius:'2px', padding:'clamp(20px,2.5vw,28px)' }}>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.5)', marginBottom:'20px' }}>Your Session</div>
                  {[
                    { label:'Service',  value:bService || '—' },
                    { label:'Date',     value:bDate ? new Date(bDate+'T00:00:00').toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—' },
                    { label:'Time',     value:bSlot || '—' },
                    { label:'Duration', value:bDuration || '—' },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ padding:'12px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.16em', textTransform:'uppercase', color:'rgba(240,237,232,.25)', marginBottom:'4px' }}>{label}</div>
                      <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color: value === '—' ? 'rgba(240,237,232,.2)' : '#C9A84C' }}>{value}</div>
                    </div>
                  ))}
                  <div style={{ marginTop:'20px', fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'rgba(240,237,232,.3)', lineHeight:1.7 }}>
                    Pricing confirmed on enquiry. All sessions include in-house engineer and hospitality.
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* SENT STATE */
            <div style={{ textAlign:'center', padding:'clamp(40px,6vw,80px) 0', animation:'fadeUp .6s both' }}>
              <div style={{ width:'64px', height:'64px', borderRadius:'50%', background:'rgba(201,168,76,.08)', border:'1px solid rgba(201,168,76,.25)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4vw,48px)', fontWeight:400, color:'#F0EDE8', margin:'0 0 16px' }}>Enquiry sent.</h3>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'15px', color:'rgba(240,237,232,.38)', lineHeight:1.8, maxWidth:'440px', margin:'0 auto 40px' }}>
                We will confirm your session within 24 hours. In the meantime, follow us for updates from the studio.
              </p>
              <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                <a href={IG} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}><button className="btn-outline">Follow @twnstudiosglobal</button></a>
                <button className="btn-outline" onClick={resetBook}>Book Another Session</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════ GALLERY */}
      <section style={{ background:'#09090E', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div className="ew rv" style={{ marginBottom:'clamp(14px,2vw,20px)' }}>Inside the Space</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(36px,4.5vw,60px)' }}>
            See where your<br /><em style={{ color:'#C9A84C' }}>sound comes alive.</em>
          </h2>

          {/* masonry grid — 5 photos, zero repeats */}
          <div className="gal-masonry rv" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gridTemplateRows:'340px 280px', gap:'10px' }}>
            {/* large left: stage */}
            <div className="gal-big gal-frame rv" style={{ gridColumn:'1 / 2', gridRow:'1 / 3' }}>
              <Image src="/images/twn-studio-stage.jpg" alt="The stage" fill style={{ objectFit:'cover', objectPosition:'center 20%' }} />
              <div style={{ position:'absolute', bottom:'18px', left:'18px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>The Stage</div>
            </div>
            {/* top center: lights */}
            <div className="gal-frame rv d1">
              <Image src="/images/twn-studio-lights.jpg" alt="Stage lighting" fill style={{ objectFit:'cover', objectPosition:'center 15%' }} />
              <div style={{ position:'absolute', bottom:'14px', left:'14px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>Stage Lighting</div>
            </div>
            {/* top right: seats */}
            <div className="gal-frame rv d2">
              <Image src="/images/twn-studio-seats.jpg" alt="Seating" fill style={{ objectFit:'cover', objectPosition:'center center' }} />
              <div style={{ position:'absolute', bottom:'14px', left:'14px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>Seating — 60+</div>
            </div>
            {/* bottom center: wide */}
            <div className="gal-frame rv d1">
              <Image src="/images/twn-studio-wide.jpg" alt="Full room" fill style={{ objectFit:'cover', objectPosition:'center 25%' }} />
              <div style={{ position:'absolute', bottom:'14px', left:'14px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>Full Room</div>
            </div>
            {/* bottom right: amp */}
            <div className="gal-frame rv d2">
              <Image src="/images/twn-studio-amp.jpg" alt="Studio gear" fill style={{ objectFit:'cover', objectPosition:'center center' }} />
              <div style={{ position:'absolute', bottom:'14px', left:'14px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>Studio Gear</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ FAQ */}
      <section style={{ background:'#0D1117', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'800px', margin:'0 auto' }}>
          <div className="ew rv" style={{ marginBottom:'clamp(14px,2vw,20px)' }}>FAQ</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,48px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.1, margin:'0 0 clamp(36px,4.5vw,56px)' }}>
            Common questions,<br /><em style={{ color:'#C9A84C' }}>honest answers.</em>
          </h2>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-item rv" style={{ transitionDelay:`${i*.06}s` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'clamp(18px,2.5vw,24px) 0', background:'transparent', border:'none', cursor:'pointer', textAlign:'left', gap:'16px' }}
                >
                  <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.5vw,16px)', color: openFaq===i ? '#C9A84C' : '#F0EDE8', transition:'color .3s', lineHeight:1.4 }}>{f.q}</span>
                  <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'20px', color:'rgba(201,168,76,.5)', flexShrink:0, transition:'transform .35s', transform: openFaq===i ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq===i ? '300px' : '0', overflow:'hidden', transition:'max-height .5s cubic-bezier(.16,1,.3,1)' }}>
                  <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', lineHeight:1.85, color:'rgba(240,237,232,.45)', paddingBottom:'clamp(18px,2.5vw,24px)', margin:0 }}>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ FINAL CTA */}
      <section style={{ background:'#09090E', padding:'clamp(100px,12vw,160px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(201,168,76,.07)', textAlign:'center' }}>
        <div style={{ maxWidth:'700px', margin:'0 auto' }}>
          <div className="ew rv" style={{ justifyContent:'center', marginBottom:'clamp(20px,2.5vw,32px)', color:'rgba(201,168,76,.55)' }}>TWN Studios International</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(38px,7vw,88px)', fontWeight:400, color:'#F0EDE8', lineHeight:.9, letterSpacing:'-.02em', margin:'0 0 clamp(20px,2.5vw,32px)' }}>
            Your sound<br />is <em style={{ color:'#C9A84C' }}>waiting.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.5vw,16px)', lineHeight:1.85, color:'rgba(240,237,232,.4)', margin:'0 auto clamp(36px,5vw,56px)', maxWidth:'440px' }}>
            Artists. Ministers. Creators. Brands. If your work demands excellence and anointing in the same room — TWN Studios is your space.
          </p>
          <div className="rv d3" style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn-gold" onClick={scrollToBook} style={{ animation:'pulseGold 3s infinite' }}>Book a Session</button>
            <a href={IG} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}><button className="btn-outline">Follow on Instagram</button></a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ FLOATING BOOK */}
      {floatShow && (
        <button className="float-book" onClick={scrollToBook}>
          Book a Session
        </button>
      )}

      <Footer />
    </main>
  )
}
