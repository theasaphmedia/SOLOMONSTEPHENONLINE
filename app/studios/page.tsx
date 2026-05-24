'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

const services = [
  { num: '01', title: 'Recording',          sub: 'Vocal · Instrument · Full Band',  desc: 'Acoustically treated rooms built for clarity, warmth, and depth. Capture every nuance of your sound.' },
  { num: '02', title: 'Mixing & Mastering', sub: 'Stereo · Stems · Streaming-Ready', desc: 'World-class mix engineering that translates across all playback systems — from studio monitors to phone speakers.' },
  { num: '03', title: 'Music Production',   sub: 'Beats · Arrangement · Orchestration', desc: 'Full production from concept to final track — sonic identity crafted with intention and skill.' },
  { num: '04', title: 'Video Recording',    sub: 'Music Videos · Live Sessions · Reels', desc: 'Cinematic video production for music videos, ministry content, and performances. Quality that commands attention.' },
  { num: '05', title: 'Live Streaming',     sub: 'Multi-Camera · Platform Integration', desc: 'High-quality live stream infrastructure for events, services, and broadcasts — reaching your audience wherever they are.' },
  { num: '06', title: 'Event Hosting',      sub: 'Capacity 50–60 · Full Setup', desc: 'A fully equipped venue for retreats, album launches, intimate concerts, and ministry gatherings.' },
]

export default function StudiosPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))

    // Waveform canvas
    const canvas = canvasRef.current
    if (!canvas) return () => obs.disconnect()
    const ctx = canvas.getContext('2d')
    if (!ctx) return () => obs.disconnect()
    let animId: number
    let W = 0, H = 0, t = 0
    const resize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight }
    const draw = () => {
      t += 0.008
      ctx.clearRect(0, 0, W, H)
      const layers = [
        { amp: H * 0.25, freq: 0.012, speed: 0.6, op: 0.06, w: 1.5 },
        { amp: H * 0.18, freq: 0.02,  speed: 0.9, op: 0.09, w: 1   },
        { amp: H * 0.3,  freq: 0.008, speed: 0.4, op: 0.04, w: 2   },
        { amp: H * 0.12, freq: 0.035, speed: 1.3, op: 0.12, w: 1   },
      ]
      layers.forEach(l => {
        ctx.beginPath()
        for (let x = 0; x <= W; x += 2) {
          const y = H / 2 + Math.sin(x * l.freq + t * l.speed) * l.amp + Math.sin(x * l.freq * 1.7 + t * l.speed * 1.4) * l.amp * 0.35
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(201,168,76,${l.op})`; ctx.lineWidth = l.w; ctx.stroke()
      })
      // Bright center line
      ctx.beginPath()
      for (let x = 0; x <= W; x += 2) {
        const pulse = (Math.sin(t * 1.8) * 0.5 + 0.5)
        const y = H / 2 + Math.sin(x * 0.018 + t * 1.1) * H * (0.12 + pulse * 0.06) + Math.sin(x * 0.04 + t * 0.65) * H * 0.04
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.25, 'rgba(201,168,76,0.3)')
      grad.addColorStop(0.5,  'rgba(201,168,76,0.5)')
      grad.addColorStop(0.75, 'rgba(201,168,76,0.3)')
      grad.addColorStop(1,    'transparent')
      ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke()
      animId = requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { obs.disconnect(); cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <main style={{ background: '#060c06', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
        .rv.is-visible{opacity:1;transform:none;}
        .rv.d1{transition-delay:.1s}.rv.d2{transition-delay:.2s}.rv.d3{transition-delay:.3s}

        .wc{display:inline-block;overflow:hidden;}
        .wi{display:inline-block;animation:wi 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wi{from{transform:translateY(110%)}to{transform:translateY(0)}}

        /* Service row */
        .svc-row {
          display: grid;
          grid-template-columns: clamp(44px,6vw,80px) 1fr;
          gap: clamp(24px,4vw,56px);
          padding: clamp(36px,4.5vw,60px) clamp(24px,4vw,56px);
          border-top: 1px solid rgba(201,168,76,0.07);
          transition: background 0.5s cubic-bezier(0.16,1,0.3,1);
          position: relative;
          cursor: default;
        }
        .svc-row:last-child { border-bottom: 1px solid rgba(201,168,76,0.07); }
        .svc-row::before {
          content: '';
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom,#C9A84C,rgba(201,168,76,0.15));
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .svc-row:hover { background: rgba(201,168,76,0.025); }
        .svc-row:hover::before { transform: scaleY(1); }
        .svc-row:hover .svc-title { color: #C9A84C !important; }

        /* Location grid */
        .loc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        @media(max-width:768px) {
          .loc-grid { grid-template-columns: 1fr; }
          .loc-map  { min-height:300px !important; border-top:1px solid rgba(201,168,76,0.1) !important; border-left:none !important; }
        }

        /* Pulse dot */
        @keyframes dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.7)}}
      `}</style>

      {/* ════════════════════════════════════
          HERO — dark, waveform backdrop
      ════════════════════════════════════ */}
      <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', overflow: 'hidden', background: '#060c06' }}>
        {/* Waveform canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.9, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 70% at 25% 55%, rgba(26,46,26,0.4) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top,#060c06,transparent)', pointerEvents: 'none' }} />

        {/* Live status pill */}
        <div style={{ position: 'absolute', top: 'clamp(80px,10vw,120px)', left: 'clamp(24px,4vw,56px)', zIndex: 10, display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.18)', padding: '8px 20px', animation: 'wi 0.8s 0.1s both' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C', animation: 'dot 2s ease-in-out infinite', display: 'inline-block' }} />
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)' }}>TWN Studios · Ajah, Lagos</span>
        </div>

        <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(24px,4vw,56px)', paddingBottom: 'clamp(60px,8vw,100px)' }}>
          <div style={{ marginBottom: '8px', lineHeight: 0.88 }}>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,120px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-3px', animationDelay: '0.18s' }}>Where Sound</span>
            </div>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,120px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-3px', animationDelay: '0.3s', background: 'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Meets Spirit.</span>
            </div>
          </div>

          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#C9A84C,transparent)', marginBottom: '32px', animation: 'wi 0.7s 0.44s both' }} />

          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.9, color: 'rgba(245,240,232,0.38)', maxWidth: '480px', marginBottom: '44px', animation: 'wi 0.9s 0.5s both' }}>
            A professional creative space in Ajah, Lagos — built for{' '}
            <span style={{ color: 'rgba(245,240,232,0.8)' }}>artists, ministers, and creators</span>{' '}
            who refuse to compromise on sound.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'wi 0.9s 0.6s both' }}>
            <Link href="/contact" className="btn-gold-pill">Book A Session</Link>
            <Link href="#services" className="btn-outline-pill">Our Services</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICES — editorial rows
      ════════════════════════════════════ */}
      <section id="services" style={{ background: '#040a04', borderTop: '1px solid rgba(201,168,76,0.05)' }}>
        <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,56px) 0' }}>
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>What We Offer</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '64px' }}>
            Six Services.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>One Vision.</span>
          </h2>
        </div>

        <div>
          {services.map((s, i) => (
            <div
              key={s.num}
              className="svc-row rv"
              style={{ transitionDelay: `${i * 0.04}s` }}
              onMouseEnter={() => setHoveredService(i)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Number */}
              <div style={{ paddingTop: '4px' }}>
                <span className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,36px)', fontWeight: 300, color: 'rgba(201,168,76,0.28)', lineHeight: 1 }}>{s.num}</span>
              </div>
              {/* Content */}
              <div>
                <h3 className="svc-title font-display" style={{ fontSize: 'clamp(22px,2.8vw,40px)', fontWeight: hoveredService === i ? 700 : 300, color: '#F5F0E8', marginBottom: '8px', lineHeight: 1, letterSpacing: '-0.5px', transition: 'color 0.35s, font-weight 0.35s' }}>{s.title}</h3>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '14px' }}>{s.sub}</div>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '14px', color: 'rgba(245,240,232,0.32)', lineHeight: 1.85, margin: 0, maxWidth: '560px' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 clamp(24px,4vw,56px)', paddingTop: 'clamp(56px,7vw,80px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
          <Link href="/contact" className="btn-gold-pill">Book A Session</Link>
        </div>
      </section>

      {/* ════════════════════════════════════
          LOCATION — two-panel, no rounded card
      ════════════════════════════════════ */}
      <section style={{ background: '#060c06', borderTop: '1px solid rgba(201,168,76,0.05)', padding: 'clamp(80px,10vw,140px) 0' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)', marginBottom: 'clamp(48px,6vw,80px)' }}>
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Find the Studio</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8' }}>
            Ajah, Lagos.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>Come Create.</span>
          </h2>
        </div>

        <div className="loc-grid rv d1" style={{ borderTop: '1px solid rgba(201,168,76,0.07)', borderBottom: '1px solid rgba(201,168,76,0.07)' }}>
          {/* Info */}
          <div style={{ padding: 'clamp(48px,6vw,80px) clamp(24px,4vw,56px)', borderRight: '1px solid rgba(201,168,76,0.07)', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '18px' }}>Address</div>
              <div className="font-display" style={{ fontSize: 'clamp(24px,2.8vw,40px)', fontWeight: 600, color: '#F5F0E8', lineHeight: 1.1, marginBottom: '4px' }}>Kenny T. Kay Building</div>
              <div className="font-display" style={{ fontSize: 'clamp(16px,1.5vw,22px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,168,76,0.55)', marginBottom: '24px' }}>The Green Tall Building</div>
              <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.2)', marginBottom: '20px' }} />
              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', color: 'rgba(245,240,232,0.38)', lineHeight: 1.95, margin: 0 }}>
                Beside Azkol Fuel Station<br />
                Langbasa Road, Ajah<br />
                <span style={{ color: 'rgba(245,240,232,0.7)', fontWeight: 500 }}>Lagos, Nigeria</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-gold-pill" style={{ fontSize: '11px' }}>Book A Session</Link>
              <a href="https://maps.google.com/?q=TWN+Studios+Langbasa+Road+Ajah+Lagos" target="_blank" rel="noopener noreferrer" className="btn-outline-pill" style={{ fontSize: '11px' }}>
                Get Directions ↗
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="loc-map" style={{ position: 'relative', minHeight: '440px', overflow: 'hidden', borderLeft: '1px solid rgba(201,168,76,0.07)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1675887445563!2d3.5813646750302173!3d6.500457123430608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc825df64c1%3A0xdbfac0f53ff1fdf2!2sTWN%20STUDIOS!5e0!3m2!1sen!2sng!4v1775255468341!5m2!1sen!2sng"
              width="100%" height="100%"
              style={{ position: 'absolute', inset: 0, border: 0, filter: 'invert(88%) hue-rotate(180deg) saturate(0.45) brightness(0.82)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="TWN Studios"
            />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to right,rgba(6,12,6,0.25) 0%,transparent 25%,transparent 75%,rgba(6,12,6,0.15) 100%)' }} />
            {/* Badge */}
            <div style={{ position: 'absolute', top: '20px', left: '24px', zIndex: 10, background: 'rgba(6,12,6,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(201,168,76,0.2)', padding: '12px 18px' }}>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '11px', color: 'rgba(201,168,76,0.9)', fontWeight: 600, letterSpacing: '0.04em' }}>TWN Studios</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', color: 'rgba(245,240,232,0.38)', marginTop: '3px' }}>Langbasa Road, Ajah</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(100px,13vw,180px) clamp(24px,4vw,56px)', background: '#1A2E1A', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 75% at 50% 50%,rgba(201,168,76,0.09) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {(['top-left','top-right','bottom-left','bottom-right'] as const).map(pos => {
          const [v, h] = pos.split('-') as ['top'|'bottom','left'|'right']
          return <div key={pos} style={{ position: 'absolute', [v]: '36px', [h]: '36px', width: '44px', height: '44px', [`border${v[0].toUpperCase()+v.slice(1)}`]: '1px solid rgba(201,168,76,0.14)', [`border${h[0].toUpperCase()+h.slice(1)}`]: '1px solid rgba(201,168,76,0.14)' }} />
        })}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div className="rv" style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>TWN Studios</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-2.5px', color: '#F5F0E8', marginBottom: '32px' }}>
            Your Sound<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, background: 'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Deserves This.</span>
          </h2>
          <div className="rv d2" style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: '32px' }} />
          <p className="rv d2" style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.95, color: 'rgba(245,240,232,0.32)', marginBottom: '52px' }}>
            Reach out and let&apos;s create something that lasts far beyond the session.
          </p>
          <div className="rv d3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold-pill"    style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Book A Session</Link>
            <Link href="/contact" className="btn-outline-pill" style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Make An Enquiry</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
