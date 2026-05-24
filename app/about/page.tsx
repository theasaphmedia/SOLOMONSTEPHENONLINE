'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const stats = [
  { num: 10, suffix: '+', label: 'Years in Ministry' },
  { num: 4,  suffix: '',  label: 'Published Books'   },
  { num: 3,  suffix: '',  label: 'Active Gatherings'  },
  { num: 1,  suffix: '',  label: 'Recording Studio'   },
]

const callings = [
  { num: '01', sub: 'The Worship Nation', title: 'Ministry', desc: 'Prophetic gatherings that shift atmospheres — weekly and monthly across Lagos.',      href: '/events'      },
  { num: '02', sub: 'TWN Studios',        title: 'Studio',   desc: 'World-class recording and production in Ajah, Lagos — built for artists and ministers.', href: '/studios'     },
  { num: '03', sub: 'Published Works',    title: 'Author',   desc: 'Books rooted in biblical Hebrew and Greek that transform believers from the inside out.', href: '/books'       },
  { num: '04', sub: 'TAI Digital',        title: 'Digital',  desc: 'Premium websites, apps and brand identities for businesses that refuse to be ordinary.',  href: '/tai-digital' },
]

const row1 = ['Worship','·','Presence','·','Sound','·','Excellence','·','Prophetic','·','Glory','·','Movement','·','Building','·','Worship','·','Presence','·','Sound','·','Excellence','·','Prophetic','·','Glory','·','Movement','·','Building']
const row2 = ['Nations','·','Teaching','·','Innovation','·','Word','·','Craft','·','Ministry','·','Spirit','·','Studio','·','Nations','·','Teaching','·','Innovation','·','Word','·','Craft','·','Ministry','·','Spirit','·','Studio']

function Carousel({ children }: { children: React.ReactNode[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const startX = useRef(0)
  const isDragging = useRef(false)
  const count = children.length
  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(i, count - 1))
    setActive(clamped)
    if (trackRef.current) {
      const card = trackRef.current.children[clamped] as HTMLElement
      card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }
  return (
    <div style={{ position: 'relative' }}>
      <div ref={trackRef}
        style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', paddingBottom: 4, cursor: 'grab' }}
        onPointerDown={(e) => { isDragging.current = true; startX.current = e.clientX; (e.currentTarget as HTMLElement).style.cursor = 'grabbing' }}
        onPointerMove={(e) => { if (!isDragging.current) return; const diff = startX.current - e.clientX; if (Math.abs(diff) > 40) { goTo(diff > 0 ? active + 1 : active - 1); isDragging.current = false } }}
        onPointerUp={(e) => { isDragging.current = false; (e.currentTarget as HTMLElement).style.cursor = 'grab' }}
        onPointerLeave={(e) => { isDragging.current = false; (e.currentTarget as HTMLElement).style.cursor = 'grab' }}
      >
        {children.map((child, i) => (
          <div key={i} onClick={() => setActive(i)}
            style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'clamp(260px,75vw,320px)', transition: 'opacity 0.3s', opacity: active === i ? 1 : 0.55 }}>
            {child}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        {children.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ width: i === active ? 20 : 6, height: 6, borderRadius: 3, background: i === active ? '#C9A84C' : 'rgba(201,168,76,0.25)', border: 'none', cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ milestone, index }: { milestone: { year: string; title: string; desc: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('tl-visible'); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="tl-item" style={{
      display: 'flex',
      gap: 'clamp(24px,5vw,60px)',
      paddingBottom: '52px',
      paddingLeft: 'clamp(50px,8vw,80px)',
      position: 'relative',
      opacity: 0,
      transform: 'translateX(-20px)',
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
    }}>
      <style>{`.tl-item.tl-visible { opacity: 1 !important; transform: translateX(0) !important; }`}</style>
      {/* Dot on line */}
      <div style={{
        position: 'absolute',
        left: 'clamp(44px,7.5vw,74px)',
        top: '6px',
        width: '13px',
        height: '13px',
        borderRadius: '50%',
        border: '2px solid rgba(201,168,76,0.5)',
        background: '#060e06',
        boxShadow: '0 0 0 3px rgba(201,168,76,0.08)',
        flexShrink: 0,
        transform: 'translateX(-50%)',
      }} />
      {/* Year */}
      <div style={{ flexShrink: 0, paddingTop: '2px' }}>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px,2.5vw,30px)', fontWeight: 300, color: 'rgba(201,168,76,0.5)', lineHeight: 1 }}>{milestone.year}</div>
      </div>
      {/* Content */}
      <div>
        <h4 className="font-display" style={{ fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 600, color: '#F5F0E8', lineHeight: 1, marginBottom: '10px' }}>{milestone.title}</h4>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(245,240,232,0.38)', lineHeight: 1.8, margin: 0 }}>{milestone.desc}</p>
      </div>
    </div>
  )
}

export default function AboutPage() {
  const heroCanvasRef     = useRef<HTMLCanvasElement>(null)
  const callingsCanvasRef = useRef<HTMLCanvasElement>(null)
  const grainCanvasRef    = useRef<HTMLCanvasElement>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.01 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))

    const statsObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !counted) {
          setCounted(true)
          stats.forEach((s, i) => {
            let cur = 0
            const timer = setInterval(() => {
              cur += 1
              setCounts((prev) => { const n = [...prev]; n[i] = cur; return n })
              if (cur >= s.num) clearInterval(timer)
            }, 1400 / s.num)
          })
        }
      })
    }, { threshold: 0.8 })
    const statsEl = document.getElementById('about-stats')
    if (statsEl) statsObs.observe(statsEl)

    // Particle canvas — left panel only
    const hCanvas = heroCanvasRef.current
    if (!hCanvas) return
    const hCtx = hCanvas.getContext('2d')
    if (!hCtx) return
    let hAnimId: number, hW = 0, hH = 0
    const hPts: { x:number;y:number;vx:number;vy:number;r:number;gold:boolean;op:number;angle:number;speed:number }[] = []
    const hResize = () => {
      hW = hCanvas.width = hCanvas.offsetWidth; hH = hCanvas.height = hCanvas.offsetHeight; hPts.length = 0
      for (let i = 0; i < 28; i++) hPts.push({ x:Math.random()*hW*.45, y:Math.random()*hH, vx:(Math.random()-.5)*.25, vy:(Math.random()-.5)*.25, r:Math.random()*1.2+.3, gold:Math.random()>.4, op:Math.random()*.15+.03, angle:Math.random()*Math.PI*2, speed:Math.random()*.005+.002 })
    }
    const hDraw = () => {
      hCtx.clearRect(0,0,hW,hH)
      hPts.forEach((p,i) => {
        p.angle+=p.speed; p.x+=p.vx+Math.sin(p.angle)*.12; p.y+=p.vy+Math.cos(p.angle*.7)*.08
        if(p.x<0||p.x>hW*.5) p.vx*=-1; if(p.y<0||p.y>hH) p.vy*=-1
        for(let j=i+1;j<hPts.length;j++){const ex=hPts[j].x-p.x,ey=hPts[j].y-p.y,ed=Math.sqrt(ex*ex+ey*ey);if(ed<80){hCtx.beginPath();hCtx.moveTo(p.x,p.y);hCtx.lineTo(hPts[j].x,hPts[j].y);hCtx.strokeStyle=`rgba(201,168,76,${(1-ed/80)*.04})`;hCtx.lineWidth=.4;hCtx.stroke()}}
        hCtx.beginPath();hCtx.arc(p.x,p.y,p.r,0,Math.PI*2)
        hCtx.fillStyle=p.gold?`rgba(201,168,76,${p.op+Math.sin(p.angle*2)*.03})`:`rgba(80,160,80,${(p.op+Math.sin(p.angle*2)*.03)*.35})`
        hCtx.fill()
      })
      hAnimId = requestAnimationFrame(hDraw)
    }
    hResize(); hDraw()

    // Film grain
    const gCanvas = grainCanvasRef.current
    let gAnimId: number
    if (gCanvas) {
      const gCtx = gCanvas.getContext('2d')
      if (gCtx) {
        let gW = 0, gH = 0
        const gResize = () => { gW = gCanvas.width = gCanvas.offsetWidth; gH = gCanvas.height = gCanvas.offsetHeight }
        const gDraw = () => {
          const imageData = gCtx.createImageData(gW, gH)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            const n = (Math.random() * 2 - 1) * 18
            data[i] = data[i+1] = data[i+2] = 128 + n
            data[i+3] = Math.random() * 9 + 3
          }
          gCtx.putImageData(imageData, 0, 0)
          gAnimId = requestAnimationFrame(gDraw)
        }
        gResize(); gDraw()
        window.addEventListener('resize', gResize)
      }
    }

    // Callings canvas
    const cCanvas = callingsCanvasRef.current
    if (!cCanvas) { window.addEventListener('resize', hResize); return }
    const cCtx = cCanvas.getContext('2d')
    if (!cCtx) { window.addEventListener('resize', hResize); return }
    let cAnimId: number, cW = 0, cH = 0
    const cPts: { x:number;y:number;vx:number;vy:number;r:number;gold:boolean;op:number;angle:number;speed:number }[] = []
    const cResize = () => {
      cW=cCanvas.width=cCanvas.offsetWidth; cH=cCanvas.height=cCanvas.offsetHeight; cPts.length=0
      for(let i=0;i<40;i++) cPts.push({x:Math.random()*cW,y:Math.random()*cH,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*2+.4,gold:Math.random()>.45,op:Math.random()*.28+.05,angle:Math.random()*Math.PI*2,speed:Math.random()*.007+.003})
    }
    const cDraw = () => {
      cCtx.clearRect(0,0,cW,cH)
      const g=cCtx.createRadialGradient(cW*.25,cH*.4,0,cW*.25,cH*.4,cW*.6); g.addColorStop(0,'rgba(26,56,26,0.45)'); g.addColorStop(1,'transparent'); cCtx.fillStyle=g; cCtx.fillRect(0,0,cW,cH)
      cPts.forEach((p,i)=>{
        p.angle+=p.speed; p.x+=p.vx+Math.sin(p.angle)*.15; p.y+=p.vy
        if(p.x<0||p.x>cW) p.vx*=-1; if(p.y<0||p.y>cH) p.vy*=-1
        p.vx*=.97; p.vy*=.97
        for(let j=i+1;j<cPts.length;j++){const ex=cPts[j].x-p.x,ey=cPts[j].y-p.y,ed=Math.sqrt(ex*ex+ey*ey);if(ed<90){cCtx.beginPath();cCtx.moveTo(p.x,p.y);cCtx.lineTo(cPts[j].x,cPts[j].y);cCtx.strokeStyle=`rgba(201,168,76,${(1-ed/90)*.07})`;cCtx.lineWidth=.5;cCtx.stroke()}}
        cCtx.beginPath();cCtx.arc(p.x,p.y,p.r,0,Math.PI*2)
        cCtx.fillStyle=p.gold?`rgba(201,168,76,${p.op+Math.sin(p.angle*2)*.06})`:`rgba(100,180,100,${(p.op+Math.sin(p.angle*2)*.06)*.35})`
        cCtx.fill()
      })
      cAnimId = requestAnimationFrame(cDraw)
    }
    cResize(); cDraw()

    const onResize = () => { hResize(); cResize() }
    window.addEventListener('resize', onResize)
    return () => {
      obs.disconnect(); statsObs.disconnect()
      cancelAnimationFrame(hAnimId); cancelAnimationFrame(cAnimId)
      if (gAnimId) cancelAnimationFrame(gAnimId)
      window.removeEventListener('resize', onResize)
    }
  }, [counted])

  return (
    <main style={{ background: '#060d0a', minHeight: '100vh', overflowX: 'hidden' }} className="page-enter">
      <style>{`
        @keyframes roleScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-33.33%)} }
        @keyframes marquee    { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        .about-hero {
          position: relative; min-height: 100svh; background: #060d0a;
          overflow: hidden; display: flex; flex-direction: column;
        }

        /* MOBILE: full cover, face top */
        .about-hero-photo { position: absolute; inset: 0; z-index: 1; }
        .about-hero-photo img {
          width: 100% !important; height: 100% !important;
          object-fit: cover !important; object-position: top center !important;
        }

        /* MOBILE overlay */
        .about-hero-overlay {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(to bottom,
            rgba(6,13,10,0.15) 0%,
            rgba(6,13,10,0.05) 20%,
            rgba(6,13,10,0.5)  65%,
            rgba(6,13,10,0.97) 100%
          );
        }

        .about-hero-text {
          position: relative; z-index: 10;
          padding: 100px 24px 200px;
          display: flex; flex-direction: column;
          justify-content: flex-end; flex: 1;
        }
        .about-hero-name { display: none; }
        .about-hero-buttons { display: none; }
        .about-hero-buttons-mobile { display: flex; }

        .about-stats-bar {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 20;
          border-top: 1px solid rgba(201,168,76,0.08); background: rgba(6,13,10,0.92);
          backdrop-filter: blur(24px); display: grid; grid-template-columns: 1fr 1fr;
        }
        .about-stat-item {
          padding: 16px 12px; text-align: center;
          border-right: 1px solid rgba(201,168,76,0.08);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }
        .about-stat-item:nth-child(2) { border-right: none; }
        .about-stat-item:nth-child(3) { border-bottom: none; }
        .about-stat-item:nth-child(4) { border-right: none; border-bottom: none; }
        .about-role-bar {
          position: absolute; bottom: 130px; left: 0; right: 0; z-index: 15;
          overflow: hidden; padding: 8px 0;
          border-top: 1px solid rgba(201,168,76,0.08); border-bottom: 1px solid rgba(201,168,76,0.08);
          background: rgba(0,0,0,0.2); backdrop-filter: blur(8px);
        }
        .bs-grid { display: grid; }

        /* ── DESKTOP ONLY ── */
        @media (min-width: 768px) {
          .about-hero { flex-direction: column; }

          /* Photo: FULL COVER — face top, hands show at bottom */
          .about-hero-photo {
            position: absolute;
            inset: 0;
          }
          .about-hero-photo img {
            object-position: 75% 15% !important;
          }

          /* Overlay: left side darker for text, right reveals photo
             The two greens are similar so blend is natural */
          .about-hero-overlay {
            background:
              linear-gradient(to right,
                rgba(6,13,10,0.92)  0%,
                rgba(6,13,10,0.75)  25%,
                rgba(6,13,10,0.4)   50%,
                rgba(6,13,10,0.12)  70%,
                transparent         85%
              ),
              linear-gradient(to bottom,
                rgba(6,13,10,0.55)  0%,
                rgba(6,13,10,0.05)  10%,
                transparent         20%,
                transparent         75%,
                rgba(6,13,10,0.95) 100%
              );
          }

          .about-photo-blend { display: none; }

          /* Text: centred vertically */
          .about-hero-text {
            padding: 0 60px 0 120px;
            justify-content: center;
            max-width: 48%;
          }
          .about-hero-buttons {
            position: absolute;
            bottom: 200px;
            right: 80px;
            z-index: 11;
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: flex-end;
          }
          .about-hero-name { display: block; }
          .about-hero-buttons { display: flex; }
          .about-hero-buttons-mobile { display: none !important; }
          .about-stats-bar { grid-template-columns: repeat(4,1fr); }
          .about-stat-item { border-bottom: none; border-right: 1px solid rgba(201,168,76,0.08); }
          .about-stat-item:nth-child(2) { border-right: 1px solid rgba(201,168,76,0.08); }
          .about-stat-item:nth-child(4) { border-right: none; }
          .about-role-bar { bottom: 82px; }
        }

        /* Hide blend div on mobile */
        .about-photo-blend { display: none; }

        /* Bio two-col grid */
        .about-bio-grid { grid-template-columns: 1fr 2fr !important; gap: 80px !important; }

        /* Callings grid */
        .callings-grid { display: grid !important; }
        .callings-mobile { display: none !important; }

        /* Books/Studios grid */
        .bs-grid { grid-template-columns: 1fr 1fr !important; gap: 2px !important; }

        @media (max-width: 860px) {
          .about-bio-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .callings-grid  { grid-template-columns: 1fr !important; gap: 0 !important; }
          .bs-grid        { grid-template-columns: 1fr !important; gap: 0 !important; }
        }

        @media (max-width: 640px) {
          .callings-grid  { display: none !important; }
          .callings-mobile{ display: block !important; }
        }
      `}</style>

      <section className="about-hero">
        <canvas ref={heroCanvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:8, opacity:0.3, pointerEvents:'none' }} />
        <canvas ref={grainCanvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:9, opacity:0.4, pointerEvents:'none', mixBlendMode:'overlay' }} />

        {/* Photo — full cover always */}
        <div className="about-hero-photo">
          <Image src="/images/solomon-green-suit-hero.png" alt="Solomon Stephen" fill priority style={{ objectFit:'cover', objectPosition:'top center' }} />
        </div>

        {/* Overlay */}
        <div className="about-hero-overlay" />

        {/* Bottom anchor into stats */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'280px', zIndex:4, pointerEvents:'none',
          background:'linear-gradient(to top, #060d0a 20%, rgba(6,13,10,0.7) 50%, transparent)'
        }} />

        {/* Text */}
        <div className="about-hero-text">
          {/* Name — desktop only, ONE LINE */}
          <div className="about-hero-name animate-fade-up" style={{ animationDelay:'0.2s', animationFillMode:'both', marginBottom:'28px' }}>
            <p style={{ fontFamily:'Inter, sans-serif', fontSize:'10px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)', marginBottom:'20px' }}>
              Gospel Minister · Worship Leader · Author
            </p>
            <h1 className="font-display" style={{ fontSize:'clamp(47px,5vw,83px)', fontWeight:300, color:'#F5F0E8', lineHeight:0.92, letterSpacing:'-3px', whiteSpace:'nowrap' }}>
              Solomon <span className="text-gradient-gold" style={{ fontWeight:700 }}>Stephen.</span>
            </h1>
          </div>

          <div className="animate-fade-up" style={{ animationDelay:'0.35s', animationFillMode:'both', width:'56px', height:'1px', background:'linear-gradient(90deg,#C9A84C,transparent)', marginBottom:'24px' }} />

          <div className="animate-fade-up" style={{ animationDelay:'0.44s', animationFillMode:'both', marginBottom:'32px' }}>
            <p style={{ fontSize:'15px', lineHeight:1.9, color:'rgba(255,255,255,0.5)', marginBottom:'14px', fontFamily:'Inter, sans-serif', maxWidth:'420px' }}>
              Operating at the intersection of{' '}
              <span style={{ color:'rgba(255,255,255,0.88)' }}>worship, word, craft, and innovation</span>
              {' '}— building institutions, not just moments.
            </p>
            <p className="font-display" style={{ fontSize:'18px', lineHeight:1.6, color:'rgba(255,255,255,0.55)', fontStyle:'italic', fontWeight:300 }}>
              &ldquo;Worship is not a moment —{' '}
              <span className="text-gradient-gold" style={{ fontWeight:600 }}>it&apos;s a movement.&rdquo;</span>
            </p>
          </div>

          {/* Mobile buttons — hidden on desktop */}
          <div className="about-hero-buttons-mobile animate-fade-up" style={{ animationDelay:'0.56s', animationFillMode:'both', display:'flex', gap:'14px', flexWrap:'wrap' }}>
            <Link href="/music"   className="btn-gold-pill"    style={{ fontSize:'13px' }}>Listen Now</Link>
            <Link href="/contact" className="btn-outline-pill" style={{ fontSize:'13px' }}>Get In Touch</Link>
          </div>

        </div>

        {/* Buttons — right side on desktop */}
        <div className="about-hero-buttons animate-fade-up" style={{ animationDelay:'0.56s', animationFillMode:'both' }}>
          <Link href="/music"   className="btn-gold-pill"    style={{ fontSize:'13px' }}>Listen Now</Link>
          <Link href="/contact" className="btn-outline-pill" style={{ fontSize:'13px' }}>Get In Touch</Link>
        </div>

        {/* Role tags */}
        <div className="about-role-bar">
          <div style={{ display:'flex', gap:'12px', animation:'roleScroll 22s linear infinite', width:'max-content' }}>
            {['Gospel Minister','Worship Leader','Music Producer','Author','Studio Founder','Digital Innovator','·','Gospel Minister','Worship Leader','Music Producer','Author','Studio Founder','Digital Innovator','·','Gospel Minister','Worship Leader','Music Producer','Author','Studio Founder','Digital Innovator','·'].map((r,i) => (
              r==='·'
                ? <span key={i} style={{ color:'rgba(201,168,76,0.3)', fontSize:'14px', flexShrink:0 }}>·</span>
                : <span key={i} style={{ padding:'6px 16px', borderRadius:'100px', border:'1px solid rgba(201,168,76,0.2)', background:'rgba(0,0,0,0.25)', backdropFilter:'blur(8px)', color:'rgba(201,168,76,0.7)', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'Inter, sans-serif', whiteSpace:'nowrap', flexShrink:0 }}>{r}</span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div id="about-stats" className="about-stats-bar">
          {stats.map((s,i) => (
            <div key={s.label} className="about-stat-item">
              <div className="font-display" style={{ fontSize:'clamp(22px,3vw,30px)', color:'#C9A84C', fontWeight:300, lineHeight:1 }}>{counts[i]}{s.suffix}</div>
              <div style={{ fontSize:'8px', color:'rgba(255,255,255,0.28)', letterSpacing:'0.2em', textTransform:'uppercase', marginTop:'5px', fontFamily:'Inter, sans-serif' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BIO — Editorial, no emojis ── */}
      <section style={{ padding:'clamp(80px,9vw,140px) 0', background:'linear-gradient(180deg,#05090a 0%,#060e06 50%,#05090a 100%)', borderTop:'1px solid rgba(201,168,76,0.06)' }} className="reveal">
        <div className="container-custom">
          <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'0' }}>

            {/* Section header */}
            <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'60px' }}>
              <div style={{ width:'32px', height:'1px', background:'rgba(201,168,76,0.4)' }} />
              <span style={{ color:'rgba(201,168,76,0.55)', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', fontFamily:'Inter, sans-serif' }}>The Story</span>
            </div>

            {/* Two-column editorial layout */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:'80px', alignItems:'start' }} className="about-bio-grid">

              {/* Left: Big pull-quote headline */}
              <div>
                <h2 className="font-display" style={{ fontSize:'clamp(34px,4vw,58px)', fontWeight:300, lineHeight:0.95, color:'rgba(255,255,255,0.9)', letterSpacing:'-1.5px', marginBottom:'32px' }}>
                  Rooted in<br />
                  <span className="text-gradient-gold" style={{ fontWeight:700, fontStyle:'italic' }}>Culture.</span><br />
                  Reaching<br />Every Tribe.
                </h2>
                <div style={{ width:'40px', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'28px' }} />
                {/* Pull quote */}
                <blockquote style={{ margin:0, padding:'20px 0 20px 20px', borderLeft:'2px solid rgba(201,168,76,0.25)' }}>
                  <p className="font-display" style={{ fontStyle:'italic', fontSize:'clamp(16px,1.4vw,20px)', color:'rgba(255,255,255,0.45)', lineHeight:1.55, fontWeight:300 }}>
                    &ldquo;Worship is not a moment — it is a movement.&rdquo;
                  </p>
                </blockquote>
              </div>

              {/* Right: Body copy */}
              <div style={{ paddingTop:'6px' }}>
                <p style={{ fontSize:'clamp(15px,1.2vw,17px)', lineHeight:1.95, color:'rgba(255,255,255,0.7)', marginBottom:'26px', fontFamily:'Inter, sans-serif', fontWeight:300 }}>
                  Solomon Stephen is a gospel artist, songwriter, and minister who creates atmospheres of authentic worship. Rooted in Edo, his musical identity was shaped by life across Kano, Enugu, Ibadan, and Lagos — blending cultural depth with a heart that reaches every tribe and tongue.
                </p>

                <p style={{ fontSize:'clamp(14px,1.1vw,16px)', lineHeight:1.95, color:'rgba(255,255,255,0.45)', marginBottom:'26px', fontFamily:'Inter, sans-serif', fontWeight:300 }}>
                  Known for soul-stirring songs like <em style={{ color:'rgba(255,255,255,0.65)', fontStyle:'italic' }}>&ldquo;The Mighty God,&rdquo; &ldquo;Awesome God,&rdquo; &ldquo;Alagbada Ina,&rdquo; &ldquo;AIKU,&rdquo;</em> and <em style={{ color:'rgba(255,255,255,0.65)', fontStyle:'italic' }}>&ldquo;CROSSOVER,&rdquo;</em> Solomon&apos;s music draws listeners into deep encounters with God&apos;s presence.
                </p>

                <p style={{ fontSize:'clamp(14px,1.1vw,16px)', lineHeight:1.95, color:'rgba(255,255,255,0.45)', marginBottom:'40px', fontFamily:'Inter, sans-serif', fontWeight:300 }}>
                  He leads The Worship Nation (TWN) — a movement devoted to raising true worshippers and igniting intimacy with the Father. Through gatherings such as the Mid Day Worship Experience, TSH, Synantesis, and other prophetic meetings, TWN has become a space of surrender, revival, and transformation. His mission is unchanged: to awaken hearts to God&apos;s presence through sound.
                </p>

                {/* Inline discography list */}
                <div style={{ borderTop:'1px solid rgba(201,168,76,0.08)', paddingTop:'32px' }}>
                  <p style={{ color:'rgba(201,168,76,0.4)', fontSize:'8.5px', letterSpacing:'0.38em', textTransform:'uppercase', fontFamily:'Inter, sans-serif', marginBottom:'18px' }}>Selected Works</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'8px' }}>
                    {['The Mighty God','Awesome God','Alagbada Ina','AIKU','CROSSOVER','There Is No One'].map((song) => (
                      <span key={song} style={{ padding:'6px 14px', border:'1px solid rgba(201,168,76,0.12)', color:'rgba(255,255,255,0.3)', fontSize:'11px', letterSpacing:'0.04em', fontFamily:'Inter, sans-serif' }}>{song}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH PULL QUOTE ── */}
      <section style={{ padding:'clamp(80px,8vw,120px) clamp(24px,5vw,80px)', background:'#060d0a', borderTop:'1px solid rgba(201,168,76,0.06)', overflow:'hidden', position:'relative' }} className="reveal">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)', pointerEvents:'none' }} />
        {/* Decorative quote mark */}
        <div style={{ position:'absolute', top:'-20px', left:'clamp(24px,5vw,80px)', fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(120px,15vw,220px)', fontWeight:700, color:'rgba(201,168,76,0.035)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>&ldquo;</div>
        <div style={{ position:'relative', zIndex:1, maxWidth:'1100px', margin:'0 auto' }}>
          <blockquote style={{ margin:0 }}>
            <p className="font-display" style={{ fontSize:'clamp(28px,4.5vw,68px)', fontWeight:300, fontStyle:'italic', color:'#F5F0E8', lineHeight:1.15, letterSpacing:'-1px', marginBottom:'32px' }}>
              God does not call the qualified —{' '}
              <span style={{ background:'linear-gradient(135deg,#E8C96A,#C9A84C,#D4B85E)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', fontWeight:700 }}>He qualifies the called.</span>{' '}
              And every season of preparation is a seed for a harvest you cannot yet see.
            </p>
            <footer style={{ display:'flex', alignItems:'center', gap:'16px' }}>
              <div style={{ width:'40px', height:'1px', background:'rgba(201,168,76,0.4)' }} />
              <cite style={{ fontStyle:'normal', fontFamily:'Inter, sans-serif', fontSize:'9px', letterSpacing:'0.35em', textTransform:'uppercase', color:'rgba(201,168,76,0.55)' }}>Solomon Stephen</cite>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── MILESTONE TIMELINE ── */}
      <section style={{ padding:'clamp(80px,8vw,120px) clamp(24px,5vw,80px)', background:'linear-gradient(180deg,#060d0a 0%,#060e06 100%)', borderTop:'1px solid rgba(201,168,76,0.06)' }} className="reveal">
        <div style={{ maxWidth:'960px', margin:'0 auto' }}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'64px' }}>
            <div style={{ width:'32px', height:'1px', background:'rgba(201,168,76,0.4)' }} />
            <span style={{ color:'rgba(201,168,76,0.55)', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', fontFamily:'Inter, sans-serif' }}>The Journey</span>
          </div>

          {/* Timeline */}
          <div style={{ position:'relative' }}>
            {/* Vertical line */}
            <div style={{ position:'absolute', left:'clamp(50px,8vw,80px)', top:0, bottom:0, width:'1px', background:'linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.05))', pointerEvents:'none' }} />

            {[
              { year:'2010', title:'Called to Ministry',       desc:'Received the call to worship leadership in Lagos, stepping into the prophetic sound God placed within.' },
              { year:'2014', title:'Founded The Worship Nation', desc:'Established TWN as a movement — not just a ministry — devoted to raising true worshippers across Nigeria and beyond.' },
              { year:'2018', title:'First Live Worship Album',  desc:'Released the first live recording capturing the sound and atmosphere of TWN gatherings, touching lives nationally.' },
              { year:'2020', title:'Launched TWN Studios',      desc:'Opened a world-class recording studio in Ajah, Lagos — a consecrated space for artists, ministers, and creators.' },
              { year:'2021', title:'Author: The Cost of Ignorance', desc:'Published the first book — a prophetic call to pursue knowledge of God with urgency and intentionality.' },
              { year:'2023', title:'Sons, Not Slaves Series',   desc:'Released two volumes of the devotional series, anchoring thousands of believers in the identity of sonship.' },
              { year:'2024', title:'Expanding the Vision',      desc:'Digital ministry, TAI Digital agency, and expanded studio operations — building institutions for the generations ahead.' },
            ].map((milestone, i) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CALLINGS — 2×2 desktop grid ── */}
      <section style={{ position:'relative', overflow:'hidden', padding:'clamp(80px,9vw,140px) 0', background:'linear-gradient(145deg,#060f07 0%,#0d1c0e 55%,#060f07 100%)', borderTop:'1px solid rgba(201,168,76,0.06)' }} className="reveal">
        <canvas ref={callingsCanvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.6 }} />
        <div className="container-custom" style={{ position:'relative', zIndex:10 }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:'20px', marginBottom:'60px' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px' }}>
                <div style={{ height:'1px', width:'32px', background:'rgba(201,168,76,0.4)' }} />
                <span style={{ color:'rgba(201,168,76,0.5)', fontSize:'9px', letterSpacing:'0.38em', textTransform:'uppercase', fontFamily:'Inter, sans-serif' }}>The Callings</span>
              </div>
              <h2 className="font-display" style={{ color:'#fff', fontWeight:300, fontSize:'clamp(30px,4vw,60px)', lineHeight:0.92, letterSpacing:'-1.5px' }}>
                Every Assignment <span className="text-gradient-gold" style={{ fontStyle:'italic' }}>Inhabited.</span>
              </h2>
            </div>
            <p style={{ fontSize:'13px', lineHeight:1.85, color:'rgba(255,255,255,0.28)', maxWidth:'320px', fontFamily:'Inter, sans-serif' }}>Each one an institution in its own right — fully present, fully committed.</p>
          </div>

          {/* Desktop 2×2 grid */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }} className="callings-grid">
            {callings.map((c) => (
              <Link key={c.title} href={c.href} style={{ textDecoration:'none', display:'block' }}>
                <div style={{ padding:'44px 40px', background:'rgba(255,255,255,0.013)', border:'1px solid rgba(201,168,76,0.08)', position:'relative', overflow:'hidden', cursor:'pointer', transition:'border-color 0.45s, background 0.45s, transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s' }}
                  onMouseEnter={(e) => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(201,168,76,0.32)'; el.style.background='rgba(201,168,76,0.03)'; el.style.transform='translateY(-5px)'; el.style.boxShadow='0 28px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(201,168,76,0.18)' }}
                  onMouseLeave={(e) => { const el=e.currentTarget as HTMLElement; el.style.borderColor='rgba(201,168,76,0.08)'; el.style.background='rgba(255,255,255,0.013)'; el.style.transform='none'; el.style.boxShadow='none' }}
                >
                  {/* Top accent line */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.35),transparent)' }} />
                  {/* Ghost number */}
                  <div style={{ position:'absolute', bottom:'-16px', right:'20px', fontFamily:'Cormorant Garamond,serif', fontSize:'160px', fontWeight:700, color:'rgba(201,168,76,0.028)', lineHeight:1, pointerEvents:'none', letterSpacing:'-8px' }}>{c.num}</div>

                  <div style={{ fontSize:'8px', letterSpacing:'0.42em', textTransform:'uppercase', color:'rgba(201,168,76,0.35)', marginBottom:'14px', fontFamily:'Inter, sans-serif' }}>{c.sub}</div>
                  <h3 className="font-display" style={{ fontSize:'clamp(26px,2.8vw,44px)', fontWeight:300, color:'rgba(255,255,255,0.88)', marginBottom:'16px', lineHeight:0.95, letterSpacing:'-0.5px' }}>{c.title}</h3>
                  <div style={{ width:'32px', height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.4),transparent)', marginBottom:'16px' }} />
                  <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.3)', lineHeight:1.85, fontFamily:'Inter, sans-serif', maxWidth:'360px' }}>{c.desc}</p>
                  <div style={{ marginTop:'28px', display:'flex', alignItems:'center', gap:'10px' }}>
                    <span style={{ color:'rgba(201,168,76,0.35)', fontSize:'9px', letterSpacing:'0.2em', fontFamily:'Inter, sans-serif' }}>EXPLORE</span>
                    <div style={{ width:'20px', height:'1px', background:'rgba(201,168,76,0.25)' }} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="callings-mobile">
            <Carousel>
              {callings.map((c) => (
                <Link key={c.title} href={c.href} style={{ textDecoration:'none', display:'block', height:'100%' }}>
                  <div style={{ padding:'32px 28px', background:'rgba(255,255,255,0.013)', border:'1px solid rgba(201,168,76,0.1)', position:'relative', overflow:'hidden', height:'100%' }}>
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.3),transparent)' }} />
                    <div style={{ fontSize:'8px', letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.35)', marginBottom:'12px', fontFamily:'Inter, sans-serif' }}>{c.sub}</div>
                    <h3 className="font-display" style={{ fontSize:'clamp(24px,6vw,34px)', fontWeight:300, color:'rgba(255,255,255,0.88)', marginBottom:'14px', lineHeight:1 }}>{c.title}</h3>
                    <div style={{ width:'28px', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'14px' }} />
                    <p style={{ fontSize:'13px', color:'rgba(255,255,255,0.3)', lineHeight:1.8, fontFamily:'Inter, sans-serif' }}>{c.desc}</p>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section style={{ padding:'clamp(36px,5vw,64px) 0', background:'#05090a', borderTop:'1px solid rgba(201,168,76,0.05)', overflow:'hidden' }} className="reveal">
        <div style={{ overflow:'hidden', marginBottom:'10px' }}>
          <div style={{ display:'flex', gap:'clamp(20px,3vw,40px)', animation:'marquee 32s linear infinite', width:'max-content' }}>
            {row1.map((w,i) => (<span key={i} className="font-display" style={{ fontSize:'clamp(22px,3vw,44px)', fontWeight:300, whiteSpace:'nowrap', color:w==='·'?'rgba(201,168,76,0.18)':i%4===0?'rgba(201,168,76,0.55)':'rgba(255,255,255,0.07)' }}>{w}</span>))}
          </div>
        </div>
        <div style={{ overflow:'hidden' }}>
          <div style={{ display:'flex', gap:'clamp(20px,3vw,40px)', animation:'marquee 24s linear infinite reverse', width:'max-content' }}>
            {row2.map((w,i) => (<span key={i} className="font-display" style={{ fontSize:'clamp(22px,3vw,44px)', fontWeight:300, whiteSpace:'nowrap', color:w==='·'?'rgba(201,168,76,0.18)':i%4===2?'rgba(201,168,76,0.55)':'rgba(255,255,255,0.07)' }}>{w}</span>))}
          </div>
        </div>
      </section>

      {/* ── BOOKS + STUDIOS ── */}
      <section style={{ padding:'clamp(80px,9vw,140px) 0', background:'linear-gradient(145deg,#060f07 0%,#0d1c0e 55%,#060f07 100%)', borderTop:'1px solid rgba(201,168,76,0.06)' }} className="reveal">
        <div className="container-custom">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }} className="bs-grid">
            {/* Books */}
            <div style={{ padding:'clamp(32px,3.5vw,52px)', background:'rgba(255,255,255,0.013)', border:'1px solid rgba(201,168,76,0.08)', position:'relative', overflow:'hidden', transition:'all 0.45s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={(e) => { const el=e.currentTarget; el.style.borderColor='rgba(201,168,76,0.3)'; el.style.background='rgba(201,168,76,0.025)'; el.style.transform='translateY(-5px)'; el.style.boxShadow='0 24px 56px rgba(0,0,0,0.5)' }}
              onMouseLeave={(e) => { const el=e.currentTarget; el.style.borderColor='rgba(201,168,76,0.08)'; el.style.background='rgba(255,255,255,0.013)'; el.style.transform='none'; el.style.boxShadow='none' }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.3),transparent)' }} />
              <div style={{ position:'absolute', bottom:'-10px', right:'20px', fontFamily:'Cormorant Garamond,serif', fontSize:'140px', fontWeight:700, color:'rgba(201,168,76,0.025)', lineHeight:1, pointerEvents:'none' }}>03</div>
              <p style={{ color:'rgba(201,168,76,0.45)', fontSize:'8.5px', letterSpacing:'0.38em', textTransform:'uppercase', fontFamily:'Inter, sans-serif', marginBottom:'16px' }}>Published Works</p>
              <h3 className="font-display" style={{ fontSize:'clamp(22px,2.5vw,36px)', fontWeight:300, lineHeight:0.95, color:'rgba(255,255,255,0.88)', letterSpacing:'-0.5px', marginBottom:'20px' }}>Words That<br /><span className="text-gradient-gold" style={{ fontStyle:'italic' }}>Transform.</span></h3>
              <div style={{ width:'32px', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'24px' }} />
              {['The Cost of Ignorance','Sons, Not Slaves — March','Sons, Not Slaves — April','Go In This Thy Might','The Exploit of His Presence'].map((book, i) => (
                <div key={book} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'11px 0', borderBottom:'1px solid rgba(201,168,76,0.07)' }}>
                  <span style={{ color:'rgba(201,168,76,0.25)', fontFamily:'Inter,sans-serif', fontSize:'9px', letterSpacing:'0.1em', flexShrink:0, minWidth:'18px' }}>0{i+1}</span>
                  <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.4)', fontFamily:'Inter, sans-serif', letterSpacing:'0.02em' }}>{book}</span>
                </div>
              ))}
              <div style={{ marginTop:'28px' }}>
                <Link href="/books" className="btn-gold-pill" style={{ display:'inline-flex' }}>Get the Books</Link>
              </div>
            </div>

            {/* Studios */}
            <div style={{ padding:'clamp(32px,3.5vw,52px)', background:'rgba(255,255,255,0.013)', border:'1px solid rgba(201,168,76,0.08)', position:'relative', overflow:'hidden', transition:'all 0.45s cubic-bezier(0.16,1,0.3,1)' }}
              onMouseEnter={(e) => { const el=e.currentTarget; el.style.borderColor='rgba(201,168,76,0.3)'; el.style.background='rgba(201,168,76,0.025)'; el.style.transform='translateY(-5px)'; el.style.boxShadow='0 24px 56px rgba(0,0,0,0.5)' }}
              onMouseLeave={(e) => { const el=e.currentTarget; el.style.borderColor='rgba(201,168,76,0.08)'; el.style.background='rgba(255,255,255,0.013)'; el.style.transform='none'; el.style.boxShadow='none' }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.3),transparent)' }} />
              <div style={{ position:'absolute', bottom:'-10px', right:'20px', fontFamily:'Cormorant Garamond,serif', fontSize:'140px', fontWeight:700, color:'rgba(201,168,76,0.025)', lineHeight:1, pointerEvents:'none' }}>02</div>
              <p style={{ color:'rgba(201,168,76,0.45)', fontSize:'8.5px', letterSpacing:'0.38em', textTransform:'uppercase', fontFamily:'Inter, sans-serif', marginBottom:'16px' }}>TWN Studios · Ajah, Lagos</p>
              <h3 className="font-display" style={{ fontSize:'clamp(22px,2.5vw,36px)', fontWeight:300, lineHeight:0.95, color:'rgba(255,255,255,0.88)', letterSpacing:'-0.5px', marginBottom:'20px' }}>Where Sound<br /><span className="text-gradient-gold" style={{ fontStyle:'italic' }}>Meets Spirit.</span></h3>
              <div style={{ width:'32px', height:'1px', background:'rgba(201,168,76,0.3)', marginBottom:'24px' }} />
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.55)', marginBottom:'4px', fontFamily:'Inter, sans-serif', fontWeight:500 }}>Kenny T. Kay Building, Green Tall Building</p>
              <p style={{ fontSize:'12px', color:'rgba(255,255,255,0.25)', marginBottom:'24px', lineHeight:1.7, fontFamily:'Inter, sans-serif' }}>Beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'28px' }}>
                {['Recording','Mixing & Mastering','Music Production','Video','Live Streaming','Event Hosting'].map((s) => (
                  <span key={s} style={{ padding:'5px 12px', border:'1px solid rgba(201,168,76,0.14)', color:'rgba(201,168,76,0.55)', fontSize:'10px', fontFamily:'Inter, sans-serif', letterSpacing:'0.04em' }}>{s}</span>
                ))}
              </div>
              <Link href="/studios" className="btn-gold-pill" style={{ display:'inline-flex' }}>Book a Session</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding:'clamp(100px,10vw,160px) 0', position:'relative', overflow:'hidden', background:'#040709', borderTop:'1px solid rgba(201,168,76,0.06)' }} className="reveal">
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(201,168,76,0.06) 0%,transparent 65%)' }} />
        {/* Corner brackets */}
        <div style={{ position:'absolute', top:'36px', left:'36px', width:'48px', height:'48px', borderTop:'1px solid rgba(201,168,76,0.12)', borderLeft:'1px solid rgba(201,168,76,0.12)' }} />
        <div style={{ position:'absolute', top:'36px', right:'36px', width:'48px', height:'48px', borderTop:'1px solid rgba(201,168,76,0.12)', borderRight:'1px solid rgba(201,168,76,0.12)' }} />
        <div style={{ position:'absolute', bottom:'36px', left:'36px', width:'48px', height:'48px', borderBottom:'1px solid rgba(201,168,76,0.12)', borderLeft:'1px solid rgba(201,168,76,0.12)' }} />
        <div style={{ position:'absolute', bottom:'36px', right:'36px', width:'48px', height:'48px', borderBottom:'1px solid rgba(201,168,76,0.12)', borderRight:'1px solid rgba(201,168,76,0.12)' }} />
        <div className="container-custom" style={{ position:'relative', zIndex:10, maxWidth:'640px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ marginBottom:'24px' }}>
            <span style={{ color:'rgba(201,168,76,0.4)', fontSize:'9px', letterSpacing:'0.42em', textTransform:'uppercase', fontFamily:'Inter, sans-serif' }}>The Worship Nation</span>
          </div>
          <h2 className="font-display" style={{ color:'#fff', fontWeight:300, fontSize:'clamp(36px,5.5vw,74px)', lineHeight:0.9, letterSpacing:'-2px', marginBottom:'26px' }}>
            You Were Made<br />for <span className="text-gradient-gold" style={{ fontWeight:700, fontStyle:'italic' }}>More.</span>
          </h2>
          <div style={{ height:'1px', background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.28),transparent)', marginBottom:'28px' }} />
          <p style={{ color:'rgba(255,255,255,0.32)', fontSize:'15px', lineHeight:1.95, marginBottom:'48px', fontFamily:'Inter, sans-serif' }}>
            There&apos;s a gathering with your name on it. A song yet to be recorded. A book waiting to be read. The door is always open.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'12px', alignItems:'center' }}>
            <Link href="/events"  className="btn-gold-pill" style={{ padding:'17px 52px', fontSize:'10px', letterSpacing:'0.16em' }}>Join a Gathering</Link>
            <Link href="/contact" className="btn-outline-pill" style={{ padding:'17px 52px', fontSize:'10px', letterSpacing:'0.16em' }}>Get In Touch</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
