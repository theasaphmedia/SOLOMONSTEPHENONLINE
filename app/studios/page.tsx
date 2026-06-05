'use client'

const studiosSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "TWN Studios",
  "description": "A world-class recording and production space in Ajah, Lagos. Built for Kingdom-minded creatives.",
  "url": "https://solomonstephen.com/studios",
  "telephone": "+2348145799098",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kenny T. Kay Building, Beside Azkol Fuel Station, Langbasa Road, Ajah",
    "addressLocality": "Lagos",
    "addressCountry": "NG"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 6.4655, "longitude": 3.5691 },
  "priceRange": "$$",
  "servesCuisine": null,
  "openingHours": "Mo-Sa 09:00-20:00",
  "sameAs": ["https://www.instagram.com/twnstudiosglobal"]
}


import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

/* ─── constants ─────────────────────────────────────────────────── */
const WHATSAPP = '2348145799098'
const EMAIL    = 'twnstudiosglobal@gmail.com'
const IG       = 'https://www.instagram.com/twnstudiosglobal'
const TIKTOK   = 'https://www.tiktok.com/@twnstudiosglobal'
const FACEBOOK = 'https://www.facebook.com/twnstudiosglobal'

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

const CAPABILITIES = [
  { name:'Live Keyboard Orchestration', cat:'Keys & Synthesis',      desc:'Full orchestral and contemporary keyboard production — cinematic pads, worship textures, live arrangement and performance.' },
  { name:'Broadcast-Quality Mixing',    cat:'Live & Studio Sound',   desc:'Multi-channel live mixing for concerts, streams, and recordings. Precision-engineered for every room and platform.' },
  { name:'Complete Drum Production',    cat:'Rhythm & Percussion',   desc:'Full acoustic kit setup, tuned and mic\'d for punchy studio recordings and high-energy live worship sessions.' },
  { name:'Vocal & Instrument Capture',  cat:'Recording',             desc:'Multi-source capture for lead vocals, harmonies, acoustic guitar, bass, and full band — simultaneously if needed.' },
  { name:'Reference-Grade Monitoring',  cat:'Playback & Accuracy',   desc:'Calibrated studio monitors for accurate, flat playback. What you hear in the studio is what listeners hear everywhere.' },
  { name:'4K Video & Live Streaming',   cat:'Visual Production',     desc:'Broadcast-quality video capture and multi-platform live streaming — concerts, services, sessions, and branded content.' },
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

/* ─── component ─────────────────────────────────────────────────── */
export default function StudiosPage() {
  /* refs */
  const heroRef    = useRef<HTMLElement>(null)
  const bookRef    = useRef<HTMLElement>(null)

  /* ui state */
  const [openFaq,    setOpenFaq]    = useState<number | null>(null)
  const [svcHover,   setSvcHover]   = useState<number | null>(null)
  const [capHover,   setCapHover]   = useState<number | null>(null)

  /* booking state */
  const [bService,   setBService]   = useState('')
  const [bNotes,     setBNotes]     = useState('')
  const [bookTab,    setBookTab]    = useState<'wa'|'form'>('wa')
  const [bName,      setBName]      = useState('')
  const [bEmail,     setBEmail]     = useState('')
  const [bPhone,     setBPhone]     = useState('')
  const [bDate,      setBDate]      = useState('')
  const [bSent,      setBSent]      = useState(false)
  const [bLoading,   setBLoading]   = useState(false)
  const [bError,     setBError]     = useState('')



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
  const bookMsg = () => {
    const svc   = bService || 'Open to discuss'
    const notes = bNotes.trim() ? `\n\nNotes: ${bNotes.trim()}` : ''
    return `Hi TWN Studios! I'd like to book a session.\n\nService: ${svc}${notes}\n\nLooking forward to connecting!`
  }

  const sendWA = () => {
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(bookMsg())}`, '_blank')
  }
  const sendEmail = () => {
    const subject = bService ? `TWN Studios – ${bService}` : 'TWN Studios – Session Enquiry'
    window.open(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bookMsg())}`, '_blank')
  }

  const scrollToBook = () => bookRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })

  /* ─── render ──────────────────────────────────────────────────── */
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(studiosSchema) }} />
      <main style={{ background:'#09090E', color:'#F0EDE8', overflowX:'hidden' }}>
      <style>{`
        /* reveals — blur + scale + vertical rise */
        .rv{opacity:0;transform:translateY(48px) scale(0.96);filter:blur(5px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1.05s cubic-bezier(.16,1,.3,1),filter .85s cubic-bezier(.16,1,.3,1)}
        .rv.vis{opacity:1;transform:none;filter:blur(0)}
        .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.22s}.rv.d3{transition-delay:.34s}.rv.d4{transition-delay:.46s}
        /* keyframes */
        @keyframes fadeUp{from{opacity:0;transform:translateY(36px) scale(.97);filter:blur(5px)}to{opacity:1;transform:none;filter:blur(0)}}
        @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}50%{box-shadow:0 0 0 10px rgba(201,168,76,.14)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes shimmerBar{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes charIn{from{opacity:0;transform:translateY(65%) rotateZ(5deg) scale(.8);filter:blur(4px)}to{opacity:1;transform:none;filter:blur(0)}}
        /* eyebrow */
        .ew{font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:.38em;text-transform:uppercase;color:rgba(201,168,76,.65);display:flex;align-items:center;gap:10px}
        .ew::before{content:'';width:24px;height:1px;background:rgba(201,168,76,.5)}
        /* gold line */
        .gl{height:1px;background:linear-gradient(90deg,rgba(201,168,76,.5) 0%,transparent 100%)}
        /* service card */
        .svc-card{border:1px solid rgba(255,255,255,.05);background:rgba(255,255,255,.02);padding:clamp(20px,2.5vw,32px);border-radius:2px;transition:border-color .4s cubic-bezier(.16,1,.3,1),background .4s,transform .5s cubic-bezier(.16,1,.3,1),box-shadow .4s;cursor:default;position:relative;overflow:hidden}
        .svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#C9A84C,#E8C96A,#C9A84C);transform:scaleX(0);transform-origin:left;transition:transform .5s cubic-bezier(.16,1,.3,1)}
        .svc-card:hover{border-color:rgba(201,168,76,.25);background:rgba(201,168,76,.05);transform:translateY(-8px) scale(1.01);box-shadow:0 24px 48px rgba(0,0,0,.28),0 0 0 1px rgba(201,168,76,.08)}
        .svc-card:hover::before{transform:scaleX(1)}
        /* capability row */
        .cap-row{display:grid;grid-template-columns:56px 1fr 1fr;gap:0 clamp(24px,4vw,60px);padding:clamp(22px,3vw,36px) 0;border-bottom:1px solid rgba(255,255,255,.06);cursor:default;transition:background .4s,padding-left .4s cubic-bezier(.16,1,.3,1),box-shadow .4s}
        .cap-row:hover{background:rgba(201,168,76,.025);padding-left:12px;box-shadow:inset 3px 0 0 #C9A84C}
        .cap-num{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.18em;color:rgba(201,168,76,.35);padding-top:4px;transition:color .35s,transform .35s;user-select:none}
        .cap-row:hover .cap-num{color:#C9A84C;transform:translateX(4px)}
        /* faq */
        .faq-item{border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden}
        /* service chip */
        .svc-chip{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.1em;padding:9px 18px;border:1px solid rgba(255,255,255,.08);border-radius:20px;cursor:pointer;transition:all .25s;color:rgba(240,237,232,.5);background:transparent;white-space:nowrap}
        .svc-chip:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        .svc-chip.sel{border-color:#C9A84C;color:#09090E;background:#C9A84C;font-weight:600}
        /* inputs */
        .b-input{width:100%;font-family:'DM Sans',sans-serif;font-size:14px;color:#F0EDE8;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:2px;padding:13px 16px;outline:none;transition:border-color .3s;box-sizing:border-box}
        .b-input:focus{border-color:rgba(201,168,76,.45)}
        .b-input::placeholder{color:rgba(240,237,232,.25)}
        /* cta btn */
        .btn-gold{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;padding:15px 40px;background:#C9A84C;color:#09090E;border:none;cursor:pointer;font-weight:700;transition:background .3s,transform .3s;border-radius:1px}
        .btn-gold:hover{background:#E5C76B;transform:translateY(-2px)}
        .btn-gold:disabled{opacity:.3;cursor:default;transform:none}
        .btn-outline{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.22em;text-transform:uppercase;padding:14px 36px;background:transparent;color:rgba(240,237,232,.6);border:1px solid rgba(255,255,255,.12);cursor:pointer;transition:all .3s;border-radius:1px}
        .btn-outline:hover{border-color:rgba(201,168,76,.4);color:#C9A84C}
        /* send buttons */
        .btn-wa{font-family:'DM Sans',sans-serif;font-size:12px;letter-spacing:.18em;text-transform:uppercase;padding:17px 36px;background:#25D366;color:#fff;border:none;cursor:pointer;font-weight:700;transition:all .3s;border-radius:2px;display:inline-flex;align-items:center;gap:10px}
        .btn-wa:hover{background:#1ebe5a;transform:translateY(-2px);box-shadow:0 8px 28px rgba(37,211,102,.3)}
        .btn-em{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;padding:16px 28px;background:transparent;color:#C9A84C;border:1px solid rgba(201,168,76,.3);cursor:pointer;font-weight:600;transition:all .3s;border-radius:2px;display:inline-flex;align-items:center;gap:9px}
        .btn-em:hover{background:rgba(201,168,76,.07);border-color:#C9A84C;transform:translateY(-2px)}

        /* gallery */
        .gal-frame{position:relative;overflow:hidden;border-radius:2px}
        .gal-frame img{transition:transform 1s cubic-bezier(.16,1,.3,1)}
        .gal-frame:hover img{transform:scale(1.06)}
        /* mobile */
        @media(max-width:860px){
          .hero-sub{display:none}
          .cap-row{grid-template-columns:40px 1fr!important}
          .cap-desc{display:none!important}
          .svc-grid{grid-template-columns:1fr 1fr!important}
          .gal-masonry{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}
          .gal-big{grid-column:span 2!important;grid-row:auto!important}
          .metrics-row{grid-template-columns:1fr 1fr!important}
        }
        @media(max-width:540px){
          .svc-grid{grid-template-columns:1fr!important}
          .book-cta{flex-direction:column!important;align-items:stretch!important}
          .book-cta a,.book-cta button{text-align:center!important}
        }
      `}</style>

      {/* ════════════════════════════════════════════ HERO */}
      <section ref={heroRef} style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        {/* background video — with static image fallback */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          {/* static fallback (always rendered, hidden when video plays) */}
          <Image src="/images/twn-studio-hall.jpg" alt="TWN Studios" fill style={{ objectFit:'cover', objectPosition:'center center' }} priority />
          {/* video overlay */}
          <video
            autoPlay muted loop playsInline
            style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', objectPosition:'center center' }}
          >
            <source src="/videos/twn-studio-hero.mp4" type="video/mp4" />
          </video>
          {/* dark + gold overlay */}
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(9,9,14,.78) 0%, rgba(9,9,14,.48) 40%, rgba(9,9,14,.90) 100%)' }} />
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,.05) 0%, transparent 70%)' }} />
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
              View Capabilities
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
          <div className="rv metrics-row" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'1px', background:'rgba(201,168,76,.08)', borderRadius:'2px', overflow:'hidden', marginBottom:'clamp(56px,7vw,96px)' }}>
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
              <div style={{ display:'flex', flexDirection:'column' }}>

                {/* ── Address → Google Maps ── */}
                <a
                  href="https://maps.google.com/?q=Kenny+T+Kay+Building+beside+Azkol+Fuel+Station+Langbasa+Road+Ajah+Lagos"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display:'flex', gap:'14px', padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,.05)', textDecoration:'none', transition:'all .3s', borderRadius:'1px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = '6px'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = '0'}
                >
                  <span style={{ color:'#C9A84C', flexShrink:0, marginTop:'1px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-5.6-8-12a8 8 0 0 1 16 0c0 6.4-8 12-8 12z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.6)', marginBottom:'4px' }}>Address — Open in Maps ↗</div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', lineHeight:1.65, color:'rgba(240,237,232,.65)' }}>Kenny T. Kay Building, beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos</div>
                  </div>
                </a>

                {/* ── Capacity ── */}
                <div style={{ display:'flex', gap:'14px', padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
                  <span style={{ color:'#C9A84C', flexShrink:0, marginTop:'1px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </span>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.6)', marginBottom:'4px' }}>Capacity</div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', lineHeight:1.65, color:'rgba(240,237,232,.65)' }}>Up to 60 guests for live events and showcases</div>
                  </div>
                </div>

                {/* ── Phone — click to call + WhatsApp ── */}
                <div style={{ display:'flex', gap:'14px', padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
                  <span style={{ color:'#C9A84C', flexShrink:0, marginTop:'1px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                  </span>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.6)', marginBottom:'6px' }}>Phone / WhatsApp</div>
                    <div style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
                      <a href="tel:+2348145799098" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,.65)', textDecoration:'none', padding:'5px 12px', border:'1px solid rgba(255,255,255,.1)', borderRadius:'20px', display:'inline-flex', alignItems:'center', gap:'6px', transition:'all .25s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.5)'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.1)'; (e.currentTarget as HTMLElement).style.color='rgba(240,237,232,.65)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.89a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                        Call
                      </a>
                      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,.65)', textDecoration:'none', padding:'5px 12px', border:'1px solid rgba(255,255,255,.1)', borderRadius:'20px', display:'inline-flex', alignItems:'center', gap:'6px', transition:'all .25s' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(37,211,102,.5)'; (e.currentTarget as HTMLElement).style.color='#25D366' }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.1)'; (e.currentTarget as HTMLElement).style.color='rgba(240,237,232,.65)' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* ── Email ── */}
                <a href={`mailto:${EMAIL}`} style={{ display:'flex', gap:'14px', padding:'14px 0', borderBottom:'1px solid rgba(255,255,255,.05)', textDecoration:'none', transition:'all .3s', borderRadius:'1px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.paddingLeft = '6px'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.paddingLeft = '0'}
                >
                  <span style={{ color:'#C9A84C', flexShrink:0, marginTop:'1px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  </span>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.6)', marginBottom:'4px' }}>Email ↗</div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,.65)' }}>{EMAIL}</div>
                  </div>
                </a>

                {/* ── Social — three separate links ── */}
                <div style={{ display:'flex', gap:'14px', padding:'14px 0' }}>
                  <span style={{ color:'#C9A84C', flexShrink:0, marginTop:'1px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  </span>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(201,168,76,.6)', marginBottom:'8px' }}>Social — @twnstudiosglobal</div>
                    <div style={{ display:'flex', gap:'8px', flexWrap:'wrap' }}>
                      {[
                        { label:'Instagram', url: IG,       color:'#E4405F' },
                        { label:'TikTok',    url: TIKTOK,   color:'#ffffff' },
                        { label:'Facebook',  url: FACEBOOK, color:'#1877F2' },
                      ].map(s => (
                        <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.1em', color:'rgba(240,237,232,.5)', textDecoration:'none', padding:'5px 12px', border:'1px solid rgba(255,255,255,.1)', borderRadius:'20px', transition:'all .25s' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=s.color; (e.currentTarget as HTMLElement).style.color=s.color }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,.1)'; (e.currentTarget as HTMLElement).style.color='rgba(240,237,232,.5)' }}
                        >{s.label} ↗</a>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════ CAPABILITIES */}
      <section id="gear" style={{ background:'#09090E', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>

          {/* header row */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(48px,6vw,80px)' }}>
            <div>
              <div className="ew rv" style={{ marginBottom:'clamp(14px,2vw,20px)' }}>Studio Capabilities</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:0 }}>
                Built to produce<br /><em style={{ color:'#C9A84C' }}>at the highest level.</em>
              </h2>
            </div>
            <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,14px)', lineHeight:1.85, color:'rgba(240,237,232,.35)', maxWidth:'340px', margin:0 }}>
              Every tool, technique, and talent — precision-matched to your creative vision.
            </p>
          </div>

          {/* capability rows */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
            {CAPABILITIES.map((g, i) => (
              <div
                key={g.name}
                className="cap-row rv"
                style={{ transitionDelay:`${i*.06}s` }}
                onMouseEnter={() => setCapHover(i)}
                onMouseLeave={() => setCapHover(null)}
              >
                {/* number */}
                <div className="cap-num">0{i + 1}</div>

                {/* name + category */}
                <div>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color: capHover===i ? 'rgba(201,168,76,.8)' : 'rgba(201,168,76,.4)', marginBottom:'8px', transition:'color .3s' }}>{g.cat}</div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(22px,2.8vw,34px)', fontWeight:400, lineHeight:1.05, color: capHover===i ? '#C9A84C' : '#F0EDE8', transition:'color .35s' }}>{g.name}</div>
                </div>

                {/* description */}
                <div className="cap-desc" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(12px,1.2vw,14px)', lineHeight:1.85, color:'rgba(240,237,232,.38)', alignSelf:'center' }}>
                  {g.desc}
                </div>
              </div>
            ))}
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
                  onClick={() => { setBService(s.label); scrollToBook() }}
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
        <div style={{ maxWidth:'760px', margin:'0 auto' }}>
          <div className="ew rv" style={{ color:'rgba(201,168,76,.6)', marginBottom:'clamp(14px,2vw,20px)' }}>Book a Session</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(12px,2vw,20px)' }}>
            Your session starts<br /><em style={{ color:'#C9A84C' }}>here.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.85, color:'rgba(240,237,232,.38)', margin:'0 0 clamp(32px,4vw,48px)' }}>
            Two ways to reach us. Pick what works for you.
          </p>

          {/* Tab toggle */}
          <div className="rv d2" style={{ display:'flex', gap:'0', marginBottom:'clamp(32px,4vw,48px)', borderBottom:'1px solid rgba(201,168,76,0.12)' }}>
            {([['wa','Quick WhatsApp'],['form','Enquiry Form']] as const).map(([tab, label]) => (
              <button key={tab} onClick={() => setBookTab(tab)}
                style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', padding:'12px 24px', border:'none', background:'transparent', cursor:'pointer',
                  color: bookTab===tab ? '#C9A84C' : 'rgba(240,237,232,0.3)',
                  borderBottom: bookTab===tab ? '1px solid #C9A84C' : '1px solid transparent',
                  transition:'all .25s', marginBottom:'-1px'
                }}
              >{label}</button>
            ))}
          </div>

          {bookTab === 'wa' ? (
            <>
              {/* service chips */}
              <div style={{ marginBottom:'clamp(24px,3vw,36px)' }}>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', marginBottom:'14px' }}>Service — optional</div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {SERVICES.map(s => (
                    <button key={s.id} className={`svc-chip${bService===s.label?' sel':''}`}
                      onClick={() => setBService(prev => prev===s.label ? '' : s.label)}>{s.label}</button>
                  ))}
                </div>
              </div>
              {/* notes */}
              <div style={{ marginBottom:'clamp(32px,4vw,48px)' }}>
                <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', marginBottom:'14px' }}>Notes — optional</div>
                <textarea className="b-input" rows={3} placeholder="Tell us about your project — what are you working on?"
                  value={bNotes} onChange={e => setBNotes(e.target.value)} style={{ resize:'vertical' }} />
              </div>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
                <button className="btn-wa" onClick={sendWA}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </button>
                <button className="btn-em" onClick={sendEmail}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  Send via Email
                </button>
              </div>
            </>
          ) : bSent ? (
            <div style={{ padding:'40px', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.04)', textAlign:'center' }}>
              <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(22px,3vw,30px)', color:'#C9A84C', marginBottom:'10px' }}>Enquiry received.</div>
              <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(240,237,232,0.4)' }}>We&apos;ll be in touch within 24 hours. Check your inbox for a confirmation.</div>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault()
              setBLoading(true); setBError('')
              try {
                const res = await fetch('/api/studio-booking', {
                  method:'POST', headers:{'Content-Type':'application/json'},
                  body: JSON.stringify({ name:bName, email:bEmail, phone:bPhone, service:bService, date:bDate, notes:bNotes }),
                })
                if (!res.ok) throw new Error('Failed')
                setBSent(true)
              } catch {
                setBError('Something went wrong. Please try WhatsApp instead.')
              } finally { setBLoading(false) }
            }} style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', display:'block', marginBottom:'8px' }}>Your Name *</label>
                  <input required value={bName} onChange={e=>setBName(e.target.value)} placeholder="Full name"
                    className="b-input" style={{ padding:'12px 14px' }} />
                </div>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', display:'block', marginBottom:'8px' }}>Email *</label>
                  <input required type="email" value={bEmail} onChange={e=>setBEmail(e.target.value)} placeholder="your@email.com"
                    className="b-input" style={{ padding:'12px 14px' }} />
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', display:'block', marginBottom:'8px' }}>Phone</label>
                  <input value={bPhone} onChange={e=>setBPhone(e.target.value)} placeholder="+234 000 000 0000"
                    className="b-input" style={{ padding:'12px 14px' }} />
                </div>
                <div>
                  <label style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', display:'block', marginBottom:'8px' }}>Preferred Date</label>
                  <input type="date" value={bDate} onChange={e=>setBDate(e.target.value)}
                    className="b-input" style={{ padding:'12px 14px', colorScheme:'dark' }} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', display:'block', marginBottom:'8px' }}>Service</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                  {SERVICES.map(s => (
                    <button type="button" key={s.id} className={`svc-chip${bService===s.label?' sel':''}`}
                      onClick={() => setBService(prev => prev===s.label ? '' : s.label)}>{s.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', display:'block', marginBottom:'8px' }}>Project Notes</label>
                <textarea className="b-input" rows={4} placeholder="Tell us about your project — artist name, genre, what you're working on."
                  value={bNotes} onChange={e=>setBNotes(e.target.value)} style={{ resize:'vertical' }} />
              </div>
              {bError && <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', color:'rgba(220,100,100,0.8)', margin:0 }}>{bError}</p>}
              <button type="submit" disabled={bLoading} className="btn-gold"
                style={{ width:'100%', justifyContent:'center', opacity: bLoading ? 0.7 : 1 }}>
                {bLoading ? 'Sending…' : 'Submit Enquiry'}
              </button>
            </form>
          )}

          {/* reassurance note */}
          <p className="rv" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', color:'rgba(240,237,232,.25)', marginTop:'24px', lineHeight:1.7 }}>
            We respond to all enquiries within 24 hours. All sessions include an in-house engineer and studio hospitality.
          </p>
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
              <div style={{ position:'absolute', bottom:'14px', left:'14px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(255,255,255,.5)' }}>Live Percussion</div>
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
          <div className="rv d3" style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
            <button className="btn-gold" onClick={scrollToBook} style={{ animation:'pulseGold 3s infinite' }}>Book a Session</button>
            <a href={IG}       target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}><button className="btn-outline">Instagram</button></a>
            <a href={TIKTOK}   target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}><button className="btn-outline">TikTok</button></a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" style={{ textDecoration:'none' }}><button className="btn-outline">Facebook</button></a>
          </div>
        </div>
      </section>



      <Footer />
    </main>
    </>
  )
}
