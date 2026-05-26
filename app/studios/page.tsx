'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

// constants
const STUDIO_EMAIL    = 'theasaphmedia@gmail.com'
const STUDIO_WHATSAPP = '2348000000000'   // replace with real WhatsApp number (no +)
const INSTAGRAM       = 'https://www.instagram.com/twnstudiosglobal'

const services = [
  { num: '01', title: 'Recording',          sub: 'Vocal · Instrument · Full Band',       desc: 'Acoustically treated rooms built for clarity, warmth, and depth. Capture every nuance of your sound in an atmosphere consecrated for excellence.' },
  { num: '02', title: 'Mixing & Mastering', sub: 'Stereo · Stems · Streaming-Ready',     desc: 'World-class mix engineering that translates across all playback systems — from studio monitors to earphones. Final masters ready for every platform.' },
  { num: '03', title: 'Music Production',   sub: 'Beats · Arrangement · Orchestration',  desc: 'Full production from concept to final track — sonic identity crafted with intention and skill. Beats, live instrumentation, or full orchestration.' },
  { num: '04', title: 'Video Recording',    sub: 'Studio · Live · Documentary',          desc: 'High-quality video production for music videos, ministry content, live captures, and brand documentaries. Story told through image and sound.' },
  { num: '05', title: 'Live Streaming',     sub: 'Multi-Platform · Broadcast-Quality',   desc: 'Professional live stream setups for church services, concerts, conferences, and personal broadcasts — broadcast-quality from a consecrated space.' },
  { num: '06', title: 'Event Hosting',      sub: 'Up to 60 Guests · Full AV Support',    desc: 'Host intimate concerts, showcase events, listening parties, and leadership gatherings. Full audio/visual support, warm atmosphere, up to 60 guests.' },
]

const sessionTypes = ['Half Day', 'Full Day', 'Multi-Day', 'Custom']

const galleryPhotos = [
  { src: '/images/twn-studio-hall.jpg',   label: 'The Venue',      pos: 'center center' },
  { src: '/images/twn-studio-seats.jpg',  label: 'Seating — 60+',  pos: 'center center' },
  { src: '/images/twn-studio-stage.jpg',  label: 'The Stage',      pos: 'center 20%' },
  { src: '/images/twn-studio-lights.jpg', label: 'Stage Lighting', pos: 'center 20%' },
  { src: '/images/twn-studio-wide.jpg',   label: 'Full Room',      pos: 'center 25%' },
  { src: '/images/twn-studio-drums.jpg',  label: 'Drum Kit',       pos: 'center 25%' },
  { src: '/images/twn-studio-amp.jpg',    label: 'Gear',           pos: 'center center' },
]

interface BookingState {
  step: 1 | 2 | 3
  service: string
  sessionType: string
  name: string
  date: string
  notes: string
}

export default function StudiosPage() {
  const [hovered, setHovered]   = useState<number | null>(null)
  const [booking, setBooking]   = useState<BookingState>({
    step: 1, service: '', sessionType: '', name: '', date: '', notes: '',
  })
  const [sent, setSent] = useState(false)
  const galRef  = useRef<HTMLDivElement>(null)
  const bookRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (booking.step > 1) bookRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [booking.step])

  const set = (patch: Partial<BookingState>) => setBooking(b => ({ ...b, ...patch }))

  const buildMessage = () =>
    `Hi TWN Studios!

Booking enquiry:

Service: ${booking.service}
Session: ${booking.sessionType}
Name: ${booking.name}
Date / Period: ${booking.date || 'Flexible'}
Project Notes: ${booking.notes || 'None'}

Looking forward to hearing from you!`

  const sendWhatsApp = () => {
    window.open(`https://wa.me/${STUDIO_WHATSAPP}?text=${encodeURIComponent(buildMessage())}`, '_blank')
    setSent(true)
  }

  const sendEmail = () => {
    const subject = encodeURIComponent(`TWN Studios Booking — ${booking.service}`)
    const body    = encodeURIComponent(buildMessage())
    window.open(`mailto:${STUDIO_EMAIL}?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
  }

  const resetBooking = () => {
    setSent(false)
    setBooking({ step: 1, service: '', sessionType: '', name: '', date: '', notes: '' })
  }

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(32px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv.is-visible{opacity:1;transform:none}
        .rv-left{opacity:0;transform:translateX(-40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-left.is-visible{opacity:1;transform:none}
        .rv-right{opacity:0;transform:translateX(40px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-right.is-visible{opacity:1;transform:none}
        .rv-scale{opacity:0;transform:scale(.94);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)}
        .rv-scale.is-visible{opacity:1;transform:none}
        .d1{transition-delay:.08s}.d2{transition-delay:.16s}.d3{transition-delay:.24s}.d4{transition-delay:.32s}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        @keyframes stepIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C}
        .svc-row{border-top:1px solid rgba(201,168,76,.15);padding:clamp(28px,3.5vw,48px) 0;
          display:grid;grid-template-columns:clamp(48px,6vw,80px) clamp(140px,18vw,240px) 1fr;
          align-items:start;gap:clamp(16px,3vw,48px);transition:background .4s cubic-bezier(.16,1,.3,1)}
        .svc-row:last-child{border-bottom:1px solid rgba(201,168,76,.15)}
        .svc-row:hover{background:rgba(201,168,76,.04)}
        .gal-track{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none}
        .gal-track::-webkit-scrollbar{display:none}
        .gal-card{flex:0 0 clamp(240px,36vw,440px);aspect-ratio:3/4;position:relative;overflow:hidden;border-radius:2px;scroll-snap-align:start;cursor:grab}
        .gal-card:active{cursor:grabbing}
        .gal-card img{transition:transform .9s cubic-bezier(.16,1,.3,1)}
        .gal-card:hover img{transform:scale(1.05)}
        .gal-label{position:absolute;bottom:0;left:0;right:0;padding:36px 20px 18px;
          background:linear-gradient(to top,rgba(0,0,0,.65) 0%,transparent 100%);
          font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:.26em;text-transform:uppercase;color:rgba(255,255,255,.65)}
        .book-chip{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.14em;text-transform:uppercase;
          padding:11px 20px;border:1px solid rgba(201,168,76,.25);color:rgba(250,247,242,.5);
          background:transparent;cursor:pointer;transition:all .3s;border-radius:1px}
        .book-chip:hover{border-color:rgba(201,168,76,.6);color:#C9A84C;background:rgba(201,168,76,.06)}
        .book-chip.sel{border-color:#C9A84C;color:#0D1B0D;background:#C9A84C;font-weight:600}
        .book-input{font-family:'DM Sans',sans-serif;font-size:14px;color:#FAF7F2;background:rgba(255,255,255,.05);
          border:1px solid rgba(201,168,76,.18);border-radius:1px;padding:14px 16px;width:100%;
          outline:none;transition:border-color .3s;box-sizing:border-box}
        .book-input:focus{border-color:rgba(201,168,76,.55)}
        .book-input::placeholder{color:rgba(250,247,242,.28)}
        .book-next{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
          padding:15px 40px;background:#C9A84C;color:#0D1B0D;border:none;cursor:pointer;font-weight:600;
          transition:background .3s,transform .3s;border-radius:1px}
        .book-next:hover{background:#E8C96A;transform:translateY(-2px)}
        .book-next:disabled{opacity:.3;cursor:default;transform:none}
        .send-btn{font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
          padding:16px 32px;cursor:pointer;font-weight:600;transition:all .35s;border-radius:1px;
          display:inline-flex;align-items:center;gap:10px}
        .send-btn:disabled{opacity:.3;cursor:default}
        .send-wa{background:#25D366;color:#fff;border:none}
        .send-wa:hover{background:#1ebe5a;transform:translateY(-2px)}
        .send-email{background:transparent;color:#C9A84C;border:1px solid rgba(201,168,76,.35)}
        .send-email:hover{background:rgba(201,168,76,.08);border-color:#C9A84C;transform:translateY(-2px)}
        .step-pill{height:8px;border-radius:4px;transition:all .4s cubic-bezier(.16,1,.3,1)}
        .back-btn{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:.18em;text-transform:uppercase;
          background:transparent;border:none;color:rgba(250,247,242,.3);cursor:pointer;padding:4px 0;transition:color .3s}
        .back-btn:hover{color:rgba(250,247,242,.6)}
        @media(max-width:800px){
          .hero-grid{grid-template-columns:1fr!important}
          .hero-photo-panel{display:none!important}
          .hero-text-panel{border-right:none!important;min-height:100vh!important}
          .svc-row{grid-template-columns:40px 1fr!important}
          .svc-desc{display:none}
        }
        @media(max-width:540px){.book-chip{font-size:10px;padding:9px 14px}.send-btn{padding:14px 22px;font-size:10px}}
      `}</style>

      {/* HERO */}
      <section className="hero-grid" style={{ minHeight:'100vh', display:'grid', gridTemplateColumns:'45% 55%', background:'#F2EDE4' }}>
        <div className="hero-text-panel" style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding:'clamp(120px,13vw,160px) clamp(32px,5vw,64px) clamp(48px,7vw,80px)', borderRight:'1px solid rgba(0,0,0,.06)' }}>
          <div style={{ animation:'heroIn .9s .15s both' }}>
            <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.45em', textTransform:'uppercase', color:'rgba(60,60,60,.45)', marginBottom:'clamp(32px,5vw,56px)' }}>
              TWN Studios · Ajah, Lagos
            </div>
            <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(48px,8vw,100px)', fontWeight:400, lineHeight:.9, color:'#0D0D0D', margin:'0 0 clamp(24px,3.5vw,44px)', letterSpacing:'-.02em' }}>
              Where<br />Craft<br />Meets<br /><em style={{ color:'#C9A84C' }}>Calling.</em>
            </h1>
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.9, color:'rgba(0,0,0,.45)', maxWidth:'360px', margin:'0 0 clamp(32px,4vw,52px)' }}>
              A consecrated recording space in Ajah, Lagos. Purpose-built for artists and ministers who refuse to separate excellence from anointing.
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px 0', marginBottom:'clamp(32px,4vw,52px)' }}>
              {[['6','Services'],['60+','Guests'],['Acoustically','Treated'],['Kenny T. Kay','Building']].map(([val,lbl]) => (
                <div key={lbl}>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(22px,3vw,32px)', fontWeight:400, color:'#0D0D0D', lineHeight:1 }}>{val}</div>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(0,0,0,.35)', marginTop:'4px' }}>{lbl}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => bookRef.current?.scrollIntoView({ behavior:'smooth', block:'start' })}
              style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.22em', textTransform:'uppercase', background:'#C9A84C', color:'#0D1B0D', border:'none', padding:'15px 36px', cursor:'pointer', fontWeight:600, transition:'background .3s,transform .3s' }}
              onMouseEnter={e => { (e.currentTarget).style.background='#E8C96A'; (e.currentTarget).style.transform='translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget).style.background='#C9A84C'; (e.currentTarget).style.transform='none' }}
            >
              Book a Session
            </button>
          </div>
        </div>

        <div className="hero-photo-panel" style={{ position:'relative', padding:'clamp(100px,12vw,140px) clamp(24px,4vw,48px) clamp(40px,6vw,64px)', display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'1fr 1fr', gap:'clamp(8px,1vw,16px)', background:'#E8E1D5', animation:'heroIn 1s .4s both' }}>
          {[
            { src:'/images/twn-studio-hall.jpg',  style:{ gridRow:'1/3' }, pos:'center center' },
            { src:'/images/twn-studio-stage.jpg', style:{},                 pos:'center 20%' },
            { src:'/images/twn-studio-drums.jpg', style:{},                 pos:'center 20%' },
          ].map((img, i) => (
            <div key={i} style={{ position:'relative', overflow:'hidden', borderRadius:'2px', minHeight:'180px', ...img.style }}>
              <Image src={img.src} alt="TWN Studios" fill style={{ objectFit:'cover', objectPosition:img.pos }} />
            </div>
          ))}
        </div>
      </section>

      {/* THE SPACE */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Space</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(32px,5vw,52px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15, marginBottom:'clamp(20px,2.5vw,32px)' }}>
              Excellence is not<br />an <em style={{ color:'#C9A84C' }}>option here.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'24px' }}>
              TWN Studios was born from a conviction that the space where you create shapes what you create. Situated in the Kenny T. Kay Building on Langbasa Road, Ajah, Lagos — the studio is acoustically treated, professionally equipped, and spiritually consecrated.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'clamp(28px,4vw,48px)' }}>
              Artists, ministers, content creators, and brands have found in TWN Studios not just a facility, but a collaborative partner — a team that cares about the integrity of your vision as much as you do.
            </p>
            <div className="rv d4" style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {[
                { label:'Location', value:'Kenny T. Kay Building, beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos' },
                { label:'Capacity', value:'Up to 60 guests for live events' },
                { label:'Email',    value:'theasaphmedia@gmail.com' },
                { label:'Instagram',value:'@twnstudiosglobal' },
              ].map(d => (
                <div key={d.label} style={{ display:'flex', gap:'16px' }}>
                  <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', color:'#C9A84C', minWidth:'80px', paddingTop:'2px' }}>{d.label}</span>
                  <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', lineHeight:1.6, color:'#3D4B3D' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }} className="rv-right">
            {[
              { src:'/images/twn-studio-seats.jpg',  pos:'center center' },
              { src:'/images/twn-studio-lights.jpg', pos:'center 20%' },
              { src:'/images/twn-studio-wide.jpg',   pos:'center 25%' },
              { src:'/images/twn-studio-amp.jpg',    pos:'center center' },
            ].map((img, i) => (
              <div key={i} className="rv-scale" style={{ transitionDelay:`${i*.07}s`, borderRadius:'2px', overflow:'hidden', aspectRatio:'1', position:'relative' }}>
                <Image src={img.src} alt="TWN Studios" fill style={{ objectFit:'cover', objectPosition:img.pos }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background:'#F0EBE1', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ marginBottom:'clamp(40px,5vw,72px)' }}>What We Do</div>
          <div>
            {services.map((s, i) => (
              <div key={s.title} className="svc-row rv" style={{ transitionDelay:`${i*.06}s` }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              >
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.2em', color:'#C9A84C' }}>{s.num}</span>
                <div>
                  <div style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(24px,3vw,38px)', fontWeight:400, color:hovered===i?'#C9A84C':'#0D1B0D', transition:'color .3s' }}>{s.title}</div>
                  <div style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.1em', color:'#8A9A8A', marginTop:'4px' }}>{s.sub}</div>
                  <button
                    onClick={() => { set({ service: s.title, step: 2 }); setTimeout(() => bookRef.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 80) }}
                    style={{ marginTop:'14px', fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.22em', textTransform:'uppercase', color:'#C9A84C', background:'transparent', border:'1px solid rgba(201,168,76,.28)', padding:'7px 18px', cursor:'pointer', transition:'all .3s' }}
                    onMouseEnter={e => { (e.currentTarget).style.background='rgba(201,168,76,.08)'; (e.currentTarget).style.borderColor='#C9A84C' }}
                    onMouseLeave={e => { (e.currentTarget).style.background='transparent'; (e.currentTarget).style.borderColor='rgba(201,168,76,.28)' }}
                  >
                    Book this →
                  </button>
                </div>
                <p className="svc-desc" style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.8, color:'#3D4B3D' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ background:'#111D11', padding:'clamp(72px,9vw,120px) 0' }}>
        <div style={{ padding:'0 clamp(24px,4vw,80px)', marginBottom:'clamp(32px,4vw,52px)' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,.65)' }}>Inside the Space</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(30px,4.5vw,52px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1, marginTop:'clamp(16px,2vw,24px)', marginBottom:0 }}>
            See where your sound<br />comes to life.
          </h2>
        </div>

        <div
          ref={galRef}
          className="gal-track rv"
          style={{ padding:'0 clamp(24px,4vw,80px)' }}
          onMouseDown={e => {
            const el = galRef.current!
            const startX = e.pageX - el.offsetLeft
            const scrollLeft = el.scrollLeft
            let dragging = true
            const move = (ev: MouseEvent) => { if (!dragging) return; el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX) }
            const up   = () => { dragging = false; window.removeEventListener('mousemove', move); window.removeEventListener('mouseup', up) }
            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', up)
          }}
        >
          {galleryPhotos.map((p, i) => (
            <div key={i} className="gal-card">
              <Image src={p.src} alt={p.label} fill style={{ objectFit:'cover', objectPosition:p.pos }} draggable={false} unoptimized />
              <div className="gal-label">{p.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding:'clamp(20px,2.5vw,28px) clamp(24px,4vw,80px) 0', display:'flex', alignItems:'center', gap:'12px' }}>
          <svg width="28" height="8" viewBox="0 0 28 8" fill="none"><path d="M0 4h22M19 1.5l4 2.5-4 2.5" stroke="rgba(201,168,76,.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'9px', letterSpacing:'.28em', textTransform:'uppercase', color:'rgba(201,168,76,.4)' }}>Drag to explore</span>
        </div>
      </section>

      {/* BOOKING WIDGET */}
      <section ref={bookRef} style={{ background:'#0D1B0D', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', borderTop:'1px solid rgba(201,168,76,.07)' }}>
        <div style={{ maxWidth:'860px', margin:'0 auto' }}>

          <div style={{ marginBottom:'clamp(40px,5vw,64px)' }}>
            <div className="eyebrow rv" style={{ color:'rgba(201,168,76,.65)', marginBottom:'clamp(16px,2vw,24px)' }}>Book a Session</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(34px,5vw,60px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, margin:0 }}>
              Your sound is<br />waiting to be <em style={{ color:'#C9A84C' }}>heard.</em>
            </h2>
          </div>

          {/* step progress */}
          {!sent && (
            <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'clamp(32px,4vw,52px)' }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div className="step-pill" style={{
                    width: booking.step === n ? '32px' : '8px',
                    background: booking.step > n ? '#C9A84C' : booking.step === n ? '#C9A84C' : 'rgba(201,168,76,.18)',
                  }} />
                  {n < 3 && <div style={{ width:'20px', height:'1px', background:'rgba(201,168,76,.12)' }} />}
                </div>
              ))}
              <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', marginLeft:'10px' }}>
                Step {booking.step} of 3
              </span>
            </div>
          )}

          {/* STEP 1 — pick service */}
          {!sent && booking.step === 1 && (
            <div style={{ animation:'stepIn .45s cubic-bezier(.16,1,.3,1) both' }}>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.4vw,16px)', color:'rgba(250,247,242,.45)', marginBottom:'clamp(20px,3vw,32px)', lineHeight:1.7, margin:'0 0 clamp(20px,3vw,32px)' }}>
                What brings you to the studio?
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'clamp(28px,4vw,44px)' }}>
                {services.map(s => (
                  <button key={s.title}
                    className={`book-chip${booking.service === s.title ? ' sel' : ''}`}
                    onClick={() => set({ service: s.title })}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
              <button className="book-next" disabled={!booking.service} onClick={() => set({ step: 2 })}>
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 — session type */}
          {!sent && booking.step === 2 && (
            <div style={{ animation:'stepIn .45s cubic-bezier(.16,1,.3,1) both' }}>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.4vw,16px)', color:'rgba(250,247,242,.45)', margin:'0 0 clamp(20px,3vw,32px)', lineHeight:1.7 }}>
                <span style={{ color:'#C9A84C' }}>{booking.service}</span> — how long do you need?
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'10px', marginBottom:'clamp(28px,4vw,44px)' }}>
                {sessionTypes.map(t => (
                  <button key={t}
                    className={`book-chip${booking.sessionType === t ? ' sel' : ''}`}
                    onClick={() => set({ sessionType: t })}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', gap:'14px', flexWrap:'wrap', alignItems:'center' }}>
                <button className="book-next" disabled={!booking.sessionType} onClick={() => set({ step: 3 })}>
                  Continue →
                </button>
                <button className="back-btn" onClick={() => set({ step: 1 })}>← Back</button>
              </div>
            </div>
          )}

          {/* STEP 3 — details + send */}
          {!sent && booking.step === 3 && (
            <div style={{ animation:'stepIn .45s cubic-bezier(.16,1,.3,1) both' }}>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(14px,1.4vw,16px)', color:'rgba(250,247,242,.45)', margin:'0 0 clamp(20px,3vw,32px)', lineHeight:1.7 }}>
                <span style={{ color:'#C9A84C' }}>{booking.service} · {booking.sessionType}</span> — almost done.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'clamp(28px,4vw,44px)' }}>
                <input className="book-input" placeholder="Your name *" value={booking.name}
                  onChange={e => set({ name: e.target.value })} />
                <input className="book-input" placeholder="Preferred date or period (e.g. June 3rd, or Flexible)" value={booking.date}
                  onChange={e => set({ date: e.target.value })} />
                <textarea className="book-input" placeholder="Brief project notes — what are you working on?" rows={4}
                  value={booking.notes} onChange={e => set({ notes: e.target.value })}
                  style={{ resize:'vertical', fontFamily:'DM Sans,sans-serif', fontSize:'14px' }} />
              </div>

              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(250,247,242,.28)', marginBottom:'16px' }}>
                Send your enquiry via:
              </p>
              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'20px' }}>
                <button className="send-btn send-wa" disabled={!booking.name} onClick={sendWhatsApp}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </button>
                <button className="send-btn send-email" disabled={!booking.name} onClick={sendEmail}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  Email
                </button>
              </div>
              <button className="back-btn" onClick={() => set({ step: 2 })}>← Back</button>
            </div>
          )}

          {/* CONFIRMATION */}
          {sent && (
            <div style={{ animation:'stepIn .55s cubic-bezier(.16,1,.3,1) both', textAlign:'center', padding:'clamp(32px,5vw,64px) 0' }}>
              <div style={{ width:'56px', height:'56px', borderRadius:'50%', background:'rgba(201,168,76,.1)', border:'1px solid rgba(201,168,76,.28)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h3 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'clamp(28px,4vw,44px)', fontWeight:400, color:'#FAF7F2', margin:'0 0 16px' }}>
                Your enquiry is on its way.
              </h3>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'15px', color:'rgba(250,247,242,.4)', lineHeight:1.8, maxWidth:'460px', margin:'0 auto 36px' }}>
                We will be in touch shortly to confirm your session. In the meantime, follow us for updates from the studio.
              </p>
              <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase', padding:'14px 32px', border:'1px solid rgba(201,168,76,.3)', color:'#C9A84C', textDecoration:'none', transition:'all .35s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(201,168,76,.08)'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='transparent'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,.3)' }}
                >
                  Follow @twnstudiosglobal
                </a>
                <button onClick={resetBooking}
                  style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', letterSpacing:'.2em', textTransform:'uppercase', padding:'14px 32px', background:'transparent', border:'1px solid rgba(255,255,255,.1)', color:'rgba(250,247,242,.35)', cursor:'pointer', transition:'all .3s' }}
                  onMouseEnter={e => { (e.currentTarget).style.borderColor='rgba(255,255,255,.25)'; (e.currentTarget).style.color='rgba(250,247,242,.65)' }}
                  onMouseLeave={e => { (e.currentTarget).style.borderColor='rgba(255,255,255,.1)'; (e.currentTarget).style.color='rgba(250,247,242,.35)' }}
                >
                  Book Another
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  )
}
