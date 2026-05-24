'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '@/components/usePageReveal'

const services = [
  { num: '01', title: 'Recording', desc: 'Professional vocal and instrument recording in an acoustically treated environment built for clarity, warmth, and depth.', detail: 'Vocal booth · Instrument tracking · Full band sessions · Podcast & spoken word' },
  { num: '02', title: 'Mixing & Mastering', desc: 'World-class mix engineering that translates across all playback systems — from studio monitors to phone speakers.', detail: 'Stereo mix · Stem mastering · Loudness optimisation · Streaming-ready delivery' },
  { num: '03', title: 'Music Production', desc: 'Full production from concept to final track — beats, arrangements, orchestration, and sonic identity.', detail: 'Beat making · Full arrangement · Gospel & Afrobeats · Worship production' },
  { num: '04', title: 'Video Recording', desc: 'Professional video production for music videos, ministry content, and live sessions. Cinematic quality, intimate setting.', detail: 'Music videos · Live session capture · Ministry content · Social media reels' },
  { num: '05', title: 'Live Streaming', desc: 'High-quality live stream setup for events, services, and online broadcasts — reaching your audience wherever they are.', detail: 'Multi-camera · Platform integration · Church services · Event broadcasts' },
  { num: '06', title: 'Event Hosting', desc: 'A fully equipped venue for up to 60 people — retreats, album launches, intimate concerts, and ministry gatherings.', detail: 'Capacity 50–60 · Sound system · Lighting · Event coordination' },
]

const clients = ['Gospel Artists', 'Worship Leaders', 'Podcasters', 'Churches & Ministries', 'Content Creators', 'Spoken Word Artists']

const stats = [
  { num: 60, suffix: '',  label: 'Venue Capacity' },
  { num: 6,  suffix: '+', label: 'Core Services'  },
  { num: 50, suffix: '+', label: 'Artists Served'  },
  { num: 1,  suffix: '',  label: 'Vision. TWN.'    },
]

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
        onPointerMove={(e) => {
          if (!isDragging.current) return
          const diff = startX.current - e.clientX
          if (Math.abs(diff) > 40) { goTo(diff > 0 ? active + 1 : active - 1); isDragging.current = false }
        }}
        onPointerUp={(e) => { isDragging.current = false; (e.currentTarget as HTMLElement).style.cursor = 'grab' }}
        onPointerLeave={(e) => { isDragging.current = false; (e.currentTarget as HTMLElement).style.cursor = 'grab' }}
      >
        {children.map((child, i) => (
          <div key={i} onClick={() => setActive(i)}
            style={{ scrollSnapAlign: 'start', flexShrink: 0, width: 'clamp(260px,75vw,340px)', transition: 'opacity 0.3s', opacity: active === i ? 1 : 0.55 }}>
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

export default function StudiosPage() {
  usePageReveal()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeService, setActiveService] = useState<number | null>(null)
  const [counts, setCounts] = useState(stats.map(() => 0))
  const [counted, setCounted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.05 }
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
            }, 1200 / s.num)
          })
        }
      })
    }, { threshold: 0.7 })
    const statsEl = document.getElementById('studio-stats')
    if (statsEl) statsObs.observe(statsEl)

    const ctaObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.studio-cta-word').forEach((el) => {
            (el as HTMLElement).style.animationPlayState = 'running'
          })
          ctaObs.unobserve(e.target)
        }
      })
    }, { threshold: 0.06 })
    const ctaEl = document.getElementById('studio-cta')
    if (ctaEl) {
      ctaEl.querySelectorAll('.studio-cta-word').forEach((el) => {
        (el as HTMLElement).style.animationPlayState = 'paused'
      })
      ctaObs.observe(ctaEl)
    }

    // Service card stagger entrance
    const cards = document.querySelectorAll('.svc-card-entry')
    const cardObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.delay || 0)
          setTimeout(() => el.classList.add('in'), delay)
          cardObs.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    cards.forEach((card) => cardObs.observe(card))

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number, W = 0, H = 0, time = 0
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    const draw = () => {
      time += 0.012; ctx.clearRect(0, 0, W, H)
      const layers = [
        { amp: H * 0.06, freq: 0.018, speed: 0.8,  opacity: 0.12, width: 1.5 },
        { amp: H * 0.1,  freq: 0.012, speed: 0.5,  opacity: 0.08, width: 1   },
        { amp: H * 0.04, freq: 0.03,  speed: 1.2,  opacity: 0.15, width: 2   },
        { amp: H * 0.08, freq: 0.008, speed: 0.3,  opacity: 0.06, width: 1   },
      ]
      layers.forEach((layer) => {
        ctx.beginPath(); ctx.moveTo(0, H / 2)
        for (let x = 0; x <= W; x += 2) {
          const y = H / 2
            + Math.sin(x * layer.freq + time * layer.speed) * layer.amp
            + Math.sin(x * layer.freq * 2.3 + time * layer.speed * 1.5) * layer.amp * 0.4
            + Math.sin(x * layer.freq * 0.5 + time * layer.speed * 0.7) * layer.amp * 0.3
          ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(201,168,76,${layer.opacity})`; ctx.lineWidth = layer.width; ctx.stroke()
      })
      ctx.beginPath()
      for (let x = 0; x <= W; x += 2) {
        const pulse = Math.sin(time * 2) * 0.5 + 0.5
        const y = H / 2
          + Math.sin(x * 0.02 + time * 1.1) * H * (0.08 + pulse * 0.04)
          + Math.sin(x * 0.045 + time * 0.7) * H * 0.03
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.3, 'rgba(201,168,76,0.35)')
      grad.addColorStop(0.5, 'rgba(201,168,76,0.5)')
      grad.addColorStop(0.7, 'rgba(201,168,76,0.35)')
      grad.addColorStop(1, 'transparent')
      ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke()
      animId = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize', resize)

    return () => {
      obs.disconnect(); statsObs.disconnect(); ctaObs.disconnect(); cardObs.disconnect()
      cancelAnimationFrame(animId); window.removeEventListener('resize', resize)
    }
  }, [counted])

  return (
    <main style={{ background: '#060e06', minHeight: '100vh', overflowX: 'hidden' }} className="page-entry">
      <style>{`
        @keyframes studioPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes ctaWordUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes noiseShift { 0%{transform:translate(0,0)} 25%{transform:translate(-2%,-1%)} 50%{transform:translate(1%,2%)} 75%{transform:translate(-1%,1%)} 100%{transform:translate(0,0)} }
        .studio-cta-word { display:inline-block; opacity:0; animation:ctaWordUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
        .studio-noise { position:absolute; inset:-10%; width:120%; height:120%; opacity:0.028; animation:noiseShift 7s steps(1) infinite; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E"); background-size:200px 200px; pointer-events:none; mix-blend-mode:overlay; }
        .svc-card-entry { opacity:0; transform:translateY(28px); transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1); }
        .svc-card-entry.in { opacity:1 !important; transform:translateY(0) !important; }
        .sticky-book-cta { display:none; }
        @media(max-width:768px) {
          .location-grid { grid-template-columns: 1fr !important; }
          .location-map { min-height: 280px !important; border-top: 1px solid rgba(201,168,76,0.1) !important; border-right: none !important; }
          .sticky-book-cta { display:flex; position:fixed; bottom:0; left:0; right:0; z-index:999; padding:12px 20px; background:rgba(6,14,6,0.94); backdrop-filter:blur(16px); border-top:1px solid rgba(201,168,76,0.2); justify-content:center; align-items:center; gap:10px; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />
        {/* Animated noise grain overlay */}
        <div className="studio-noise" style={{ zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(26,46,26,0.5) 0%, transparent 70%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 75% 40%, rgba(201,168,76,0.04) 0%, transparent 60%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #060e06, transparent)', zIndex: 3 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)', zIndex: 3 }} />
        <div style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: 'clamp(100px,12vw,160px)', paddingBottom: 'clamp(60px,8vw,120px)', paddingLeft: 'clamp(24px,4vw,56px)', paddingRight: 'clamp(24px,4vw,56px)' }}>
          <div className="animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '999px', padding: '8px 20px', marginBottom: '36px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C', display: 'inline-block', animation: 'studioPulse 2s ease-in-out infinite' }} />
            <span style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase' }}>TWN Studios · Ajah, Lagos</span>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both', marginBottom: '8px' }}>
            <div className="font-display" style={{ fontSize: 'clamp(40px,6vw,90px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 0.9, letterSpacing: '-2px' }}>Where Sound</div>
            <div className="font-display" style={{ fontSize: 'clamp(40px,6vw,90px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 0.9, letterSpacing: '-2px' }}>Meets <span className="text-gradient-gold" style={{ fontWeight: 700, fontStyle: 'italic' }}>Spirit.</span></div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.36s', animationFillMode: 'both', width: '60px', height: '1px', background: 'linear-gradient(90deg, #C9A84C, transparent)', margin: '28px 0' }} />
          <p className="animate-fade-up" style={{ animationDelay: '0.44s', animationFillMode: 'both', fontFamily: 'Inter, sans-serif', fontSize: '15px', lineHeight: 1.85, color: 'rgba(245,240,232,0.42)', maxWidth: '480px', marginBottom: '48px' }}>
            A professional recording studio and creative space in the heart of Ajah, Lagos — built for{' '}
            <span style={{ color: 'rgba(245,240,232,0.8)' }}>artists, ministers, and creators</span>{' '}
            who refuse to compromise on sound.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: '0.52s', animationFillMode: 'both', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold-pill" style={{ fontSize: '12px' }}>Book A Session</Link>
            <Link href="#services" className="btn-outline-pill" style={{ fontSize: '12px' }}>Our Services</Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div id="studio-stats" className="rv studios-stats" style={{ borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)', background: 'rgba(201,168,76,0.02)', display: 'flex', flexWrap: 'wrap' }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{ flex: '1 1 120px', padding: '28px 24px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
            <div className="font-display" style={{ fontSize: '36px', fontWeight: 300, color: '#C9A84C', lineHeight: 1 }}>{counts[i]}{s.suffix}</div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: 'clamp(60px,8vw,120px) clamp(24px,4vw,56px)' }} className="rv">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ height: '1px', width: '28px', background: 'rgba(201,168,76,0.5)' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.5)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>What We Offer</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />
        </div>
        <Carousel>
          {services.map((s, i) => (
            <div key={s.num}
              className="svc-card-entry"
              data-delay={String(i * 80)}
              style={{ padding: 'clamp(20px,3vw,36px) clamp(18px,3vw,32px)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '16px', cursor: 'pointer', transition: 'background 0.35s, border-color 0.3s, opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)', background: activeService === i ? 'rgba(26,46,26,0.5)' : 'rgba(26,46,26,0.2)', position: 'relative', overflow: 'hidden', height: '100%' }}
              onMouseEnter={() => setActiveService(i)}
              onMouseLeave={() => setActiveService(null)}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #C9A84C, transparent)', transform: activeService === i ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', color: 'rgba(201,168,76,0.35)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>{s.num}</div>
              <div className="font-display" style={{ fontSize: 'clamp(18px,2vw,22px)', fontWeight: 600, color: activeService === i ? '#C9A84C' : 'rgba(255,255,255,0.85)', lineHeight: 1, marginBottom: '12px', transition: 'color 0.3s' }}>{s.title}</div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg,rgba(201,168,76,0.2),transparent)', marginBottom: '12px' }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, marginBottom: '14px' }}>{s.desc}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(201,168,76,0.45)', letterSpacing: '0.05em' }}>{s.detail}</p>
            </div>
          ))}
        </Carousel>
      </section>

      {/* ── BUILT FOR ── */}
      <section style={{ padding: '0 clamp(24px,4vw,56px) clamp(60px,8vw,100px)' }} className="rv">
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(201,168,76,0.1)', borderRadius: '20px', padding: 'clamp(32px,4vw,48px) clamp(20px,3vw,40px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right,transparent,#C9A84C,transparent)' }} />
          <div style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.5)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '20px' }}>Built For</div>
          <h3 className="font-display text-white" style={{ fontSize: 'clamp(22px,3vw,40px)', fontWeight: 300, lineHeight: 1, marginBottom: '28px' }}>
            Creators <span className="text-gradient-gold" style={{ fontWeight: 600 }}>&amp; Ministers</span>
          </h3>
          <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)', maxWidth: '200px', margin: '0 auto 28px' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {clients.map((c) => (
              <span key={c} style={{ padding: '8px 18px', borderRadius: '100px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.05)', color: 'rgba(201,168,76,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.05em', transition: 'all 0.25s', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.background='rgba(201,168,76,0.14)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.45)'; e.currentTarget.style.color='#C9A84C'; e.currentTarget.style.transform='translateY(-3px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background='rgba(201,168,76,0.05)'; e.currentTarget.style.borderColor='rgba(201,168,76,0.2)'; e.currentTarget.style.color='rgba(201,168,76,0.7)'; e.currentTarget.style.transform='none' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIND THE STUDIO ── */}
      <section style={{ padding: '0 clamp(24px,4vw,56px) clamp(60px,8vw,100px)' }} className="rv">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ height: '1px', width: '28px', background: 'rgba(201,168,76,0.5)' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.5)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Find The Studio</span>
          <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(201,168,76,0.2), transparent)' }} />
        </div>

        {/* Two-column location card */}
        <div
          className="location-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(201,168,76,0.12)',
            borderRadius: '24px',
            overflow: 'hidden',
            transition: 'border-color 0.3s, box-shadow 0.3s',
            minHeight: '460px',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(201,168,76,0.3)'; e.currentTarget.style.boxShadow='0 16px 48px rgba(201,168,76,0.06)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor='rgba(201,168,76,0.12)'; e.currentTarget.style.boxShadow='none' }}
        >
          {/* Left — Info */}
          <div style={{ padding: 'clamp(28px,4vw,52px)', borderRight: '1px solid rgba(201,168,76,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '28px' }}>

            {/* Address block */}
            <div>
              <div style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.5)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '16px' }}>Location</div>
              <div className="font-display" style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 600, color: 'white', lineHeight: 1.1, marginBottom: '4px' }}>Kenny T. Kay Building</div>
              <div className="font-display" style={{ fontSize: '15px', fontWeight: 300, color: 'rgba(201,168,76,0.55)', fontStyle: 'italic', marginBottom: '20px' }}>The Green Tall Building</div>
              <div style={{ height: '1px', background: 'linear-gradient(90deg,rgba(201,168,76,0.2),transparent)', marginBottom: '18px' }} />
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>
                Beside Azkol Fuel Station<br />
                Langbasa Road, Ajah<br />
                <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { icon: '👥', label: 'Capacity', val: '50–60' },
                { icon: '📍', label: 'Area',     val: 'Ajah'  },
                { icon: '🕐', label: 'Sessions', val: 'By Appt.' },
              ].map((st) => (
                <div key={st.label} style={{ flex: 1, padding: '12px 8px', borderRadius: '12px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.1)', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', marginBottom: '6px' }}>{st.icon}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4px' }}>{st.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{st.val}</div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold-pill" style={{ fontSize: '12px' }}>Book A Session</Link>
              <a
                href="https://maps.google.com/?q=TWN+Studios+Langbasa+Road+Ajah+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: '999px', padding: '12px 20px', cursor: 'pointer', transition: 'all 0.25s', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(201,168,76,0.8)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background='rgba(201,168,76,0.14)'; (e.currentTarget as HTMLAnchorElement).style.borderColor='rgba(201,168,76,0.5)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background='rgba(201,168,76,0.06)'; (e.currentTarget as HTMLAnchorElement).style.borderColor='rgba(201,168,76,0.25)' }}
              >
                Open in Maps ↗
              </a>
            </div>
          </div>

          {/* Right — Map always visible */}
          <div className="location-map" style={{ position: 'relative', minHeight: '420px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1675887445563!2d3.5813646750302173!3d6.500457123430608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc825df64c1%3A0xdbfac0f53ff1fdf2!2sTWN%20STUDIOS!5e0!3m2!1sen!2sng!4v1775255468341!5m2!1sen!2sng"
              width="100%" height="100%"
              style={{ position: 'absolute', inset: 0, border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.5) brightness(0.85)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="TWN Studios"
            />
            {/* Left edge fade */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px', background: 'linear-gradient(to right, rgba(6,14,6,0.25), transparent)', zIndex: 5, pointerEvents: 'none' }} />
            {/* Badge */}
            <div style={{ position: 'absolute', top: '16px', left: '24px', zIndex: 10, background: 'rgba(6,14,6,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '10px', padding: '10px 16px' }}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(201,168,76,0.9)', fontWeight: 600 }}>TWN Studios</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Langbasa Road, Ajah</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="studio-cta" style={{ padding: 'clamp(60px,8vw,120px) clamp(24px,4vw,56px)', position: 'relative', overflow: 'hidden' }} className="rv">
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(201,168,76,0.045) 0%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.5)', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '20px' }}>TWN Studios</div>
          <div className="font-display" style={{ fontSize: 'clamp(28px,4.5vw,68px)', fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: 0.95, letterSpacing: '-1px', marginBottom: '8px' }}>
            {["Let's", 'Create', 'Something'].map((word, i) => (
              <span key={word} className="studio-cta-word" style={{ marginRight: '0.22em', animationDelay: `${i * 0.12}s` }}>{word}</span>
            ))}
          </div>
          <div className="font-display text-gradient-gold studio-cta-word" style={{ fontSize: 'clamp(28px,4.5vw,68px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1, letterSpacing: '-1px', marginBottom: '32px', animationDelay: '0.38s' }}>Extraordinary.</div>
          <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.35),transparent)', maxWidth: '160px', margin: '0 auto 28px' }} />
          <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.32)', fontSize: '15px', lineHeight: 1.85, maxWidth: '800px', margin: '0 auto 48px', whiteSpace: 'nowrap' }}>
            Your sound deserves a space that honours it. Reach out and let&apos;s build something that lasts.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold-pill">Book A Session</Link>
            <Link href="/contact" className="btn-outline-pill">Make An Enquiry</Link>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="sticky-book-cta">
        <Link href="/contact" className="btn-gold-pill" style={{ fontSize: '12px', width: '100%', justifyContent: 'center', textAlign: 'center' }}>Book A Studio Session</Link>
      </div>

      <Footer />
    </main>
  )
}
