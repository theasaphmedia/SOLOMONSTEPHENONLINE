'use client'

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
  const [floatShow,  setFloatShow]  = useState(false)

  /* booking state */
  const [bService,   setBService]   = useState('')
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
    <main style={{ background:'#09090E', color:'#F0EDE8', overflowX:'hidden' }}>
      <style>{`
        /* reveals */
        .rv{opacity:0;transform:translateY(24px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
        .rv.vis{opacity:1;transform:none}
        .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}.rv.d4{transition-delay:.4s}
        /* keyframes */
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
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
        /* floating book */
        .float-book{position:fixed;bottom:32px;right:32px;z-index:90;font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.22em;text-transform:uppercase;padding:13px 28px;background:#C9A84C;color:#09090E;border:none;cursor:pointer;font-weight:700;border-radius:32px;box-shadow:0 8px 32px rgba(201,168,76,.25);transition:all .4s cubic-bezier(.16,1,.3,1);animation:pulseGold 3s infinite}
        .float-book:hover{background:#E5C76B;transform:translateY(-3px) scale(1.04);box-shadow:0 12px 40px rgba(201,168,76,.35)}
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
          .float-book{bottom:20px;right:20px;padding:11px 22px}
          .gal-masonry{grid-template-columns:1fr 1fr!important;grid-template-rows:auto!important}
          .gal-big{grid-column:span 2!important;grid-row:auto!important}
        }
        @media(max-width:540px){
          .svc-grid{grid-template-columns:1fr!important}
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
                  ['Phone / WA', '+234 814 579 9098'],
                  ['Email', 'twnstudiosglobal@gmail.com'],
                  ['Social', '@twnstudiosglobal — Instagram · TikTok · Facebook'],
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

      {/* ════════════════════════════════════════════ CAPABILITIES */}
      <section id="gear" style={{ background:'#09090E', padding:'clamp(80px,10vw,140px) 0', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 clamp(24px,4vw,80px)' }}>
          <div className="ew rv" style={{ marginBottom:'clamp(16px,2vw,24px)' }}>Studio Capabilities</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(40px,5vw,72px)' }}>
            Built to produce<br /><em style={{ color:'#C9A84C' }}>at the highest level.</em>
          </h2>
        </div>

        <div className="gear-grid" style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 480px', gap:'0', padding:'0 clamp(24px,4vw,80px)' }}>
          {/* gear list */}
          <div style={{ borderTop:'1px solid rgba(255,255,255,.06)' }}>
            {CAPABILITIES.map((g, i) => (
              <div key={g.name} className="gear-card rv" style={{ transitionDelay:`${i*.07}s` }}
                onMouseEnter={() => setCapHover(i)} onMouseLeave={() => setCapHover(null)}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'16px' }}>
                  <div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.25em', textTransform:'uppercase', color:'rgba(201,168,76,.5)', marginBottom:'6px' }}>{g.cat}</div>
                    <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(20px,2.5vw,28px)', fontWeight:400, color: capHover===i ? '#C9A84C' : '#F0EDE8', transition:'color .3s', lineHeight:1.1 }}>{g.name}</div>
                    <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', lineHeight:1.7, color:'rgba(240,237,232,.38)', marginTop:'8px', maxWidth:'480px' }}>{g.desc}</div>
                  </div>
                  <div style={{ flexShrink:0, width:'24px', height:'24px', border:'1px solid rgba(201,168,76,.2)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', transition:'all .3s', background: capHover===i ? 'rgba(201,168,76,.1)' : 'transparent', borderColor: capHover===i ? '#C9A84C' : 'rgba(201,168,76,.2)' }}>
                    <div style={{ width:'6px', height:'6px', borderRadius:'50%', background: capHover===i ? '#C9A84C' : 'rgba(201,168,76,.4)', transition:'all .3s' }} />
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
          <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.85, color:'rgba(240,237,232,.38)', margin:'0 0 clamp(40px,5vw,60px)' }}>
            The fastest way to book is a quick WhatsApp message. Tell us what you need — we'll confirm your session personally.
          </p>

          {/* service chips — optional */}
          <div className="rv d2" style={{ marginBottom:'clamp(24px,3vw,36px)' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', marginBottom:'14px' }}>
              Service — optional
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  className={`svc-chip${bService===s.label?' sel':''}`}
                  onClick={() => setBService(prev => prev===s.label ? '' : s.label)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* notes — optional */}
          <div className="rv d3" style={{ marginBottom:'clamp(32px,4vw,48px)' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.22em', textTransform:'uppercase', color:'rgba(240,237,232,.3)', marginBottom:'14px' }}>
              Notes — optional
            </div>
            <textarea
              className="b-input"
              rows={3}
              placeholder="Tell us about your project — what are you working on?"
              value={bNotes}
              onChange={e => setBNotes(e.target.value)}
              style={{ resize:'vertical' }}
            />
          </div>

          {/* action buttons */}
          <div className="rv d4" style={{ display:'flex', gap:'12px', flexWrap:'wrap', alignItems:'center' }}>
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

      {/* FLOATING BOOK */}
      {floatShow && (
        <button className="float-book" onClick={scrollToBook}>
          Book a Session
        </button>
      )}

      <Footer />
    </main>
  )
}
