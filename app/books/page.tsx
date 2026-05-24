'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '@/components/usePageReveal'

const books = [
  {
    num: '01',
    title: 'The Cost of Ignorance',
    subtitle: null,
    tag: 'Theology',
    year: '2023',
    desc: 'A prophetic call to pursue knowledge of God with intentionality and urgency.',
    pull: '"Ignorance is not bliss — it is costly."',
    body: 'This book confronts the dangerous comfort of spiritual ignorance and calls believers to a higher standard of knowing God. Drawing from deep biblical study and personal encounter, Solomon delivers a clarion call to the body of Christ.',
    link: 'https://selar.com/v8561k6070',
    badge: 'Available Now',
    img: '/images/book-cost-of-ignorance.png',
    scripture: 'Hosea 4:6',
  },
  {
    num: '02',
    title: 'Sons, Not Slaves',
    subtitle: 'March Volume',
    tag: 'Devotional',
    year: '31-Day Journey',
    desc: 'A 31-day devotional journey into the identity of the believer as a son of God.',
    pull: '"You were never meant to serve from fear — but from love."',
    body: "Each day draws from Hebrew and Greek word studies to anchor you in the truth of who you are in Christ. Encounter the Father's heart, understand your covenant rights as a son, and walk into a new dimension of intimacy with God.",
    link: 'https://selar.com/41x076wbk1',
    badge: 'March Volume',
    img: '/images/book-sons-not-slaves-march.png',
    scripture: 'Romans 8:15',
  },
  {
    num: '03',
    title: 'Sons, Not Slaves',
    subtitle: 'April Volume',
    tag: 'Devotional',
    year: '31-Day Journey',
    desc: 'Continuing the journey — deeper into sonship, freedom, and covenant relationship.',
    pull: '"The deeper you go into sonship, the freer you become."',
    body: 'Building on the March foundation, the April volume goes deeper into the practical outworking of sonship — freedom from fear, boldness in prayer, and the fullness of your inheritance in Christ.',
    link: 'https://selar.com/5ep1bv5156',
    badge: 'April Volume',
    img: '/images/book-sons-not-slaves-april.png',
    scripture: 'Galatians 4:7',
  },
]

function BookRow({ book, index }: { book: typeof books[0]; index: number }) {
  const isEven = index % 2 === 0
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('book-row-visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={rowRef}
      className="book-row-entry"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0',
        marginBottom: '2px',
        position: 'relative',
      }}
    >
      <style>{`
        .book-row-entry { opacity: 0; transform: translateY(40px); transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .book-row-visible { opacity: 1 !important; transform: translateY(0) !important; }
        @media (min-width: 768px) {
          .book-editorial-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; min-height: 560px; }
        }
      `}</style>

      <div
        className="book-editorial-grid"
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'rgba(26,46,26,0.15)',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 50% 60% at ${isEven ? '25%' : '75%'} 50%, rgba(201,168,76,0.07) 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        {/* Cover panel */}
        <div
          style={{
            order: isEven ? 0 : 1,
            position: 'relative',
            background: 'rgba(10,20,10,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '64px 40px',
            zIndex: 1,
          }}
        >
          {/* Background ambient for this book */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.09) 0%, transparent 65%)`,
            pointerEvents: 'none',
          }} />
          {/* Number watermark */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '24px',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '80px',
            fontWeight: 700,
            color: 'rgba(201,168,76,0.05)',
            lineHeight: 1,
            userSelect: 'none',
          }}>{book.num}</div>

          {/* 3D tilt book cover */}
          <div
            style={{ position: 'relative', zIndex: 1, transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)', transformStyle: 'preserve-3d' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = isEven
                ? 'perspective(900px) rotateY(-12deg) rotateX(4deg) scale(1.04)'
                : 'perspective(900px) rotateY(12deg) rotateX(4deg) scale(1.04)'
            }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)' }}
          >
            <div style={{
              width: '220px',
              height: '308px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,168,76,0.18)',
              position: 'relative',
            }}>
              <Image src={book.img} alt={book.title} fill sizes="220px" style={{ objectFit: 'cover' }} />
            </div>
            {/* Badge */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              background: 'linear-gradient(135deg, #E8C96A, #C9A84C)',
              borderRadius: '999px',
              padding: '5px 14px',
              boxShadow: '0 4px 20px rgba(201,168,76,0.45)',
            }}>
              <span style={{ color: '#060e06', fontFamily: 'Inter, sans-serif', fontSize: '9px', fontWeight: 800, letterSpacing: '0.08em' }}>{book.badge}</span>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div
          style={{
            order: isEven ? 1 : 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(40px,6vw,72px) clamp(32px,5vw,64px)',
            zIndex: 1,
            position: 'relative',
          }}
        >
          <div style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.6)',
            marginBottom: '16px',
          }}>{book.tag} · {book.year}</div>

          <div
            className="font-display"
            style={{
              fontSize: 'clamp(30px,3.5vw,52px)',
              fontWeight: 300,
              color: '#F5F0E8',
              lineHeight: 0.95,
              letterSpacing: '-1px',
              marginBottom: book.subtitle ? '6px' : '0',
            }}
          >{book.title}</div>

          {book.subtitle && (
            <div className="font-display" style={{ fontSize: '20px', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,168,76,0.65)', marginBottom: '0' }}>{book.subtitle}</div>
          )}

          {/* Pull quote */}
          <div style={{
            margin: '28px 0',
            padding: '20px 24px',
            borderLeft: '3px solid #C9A84C',
            background: 'rgba(201,168,76,0.04)',
            borderRadius: '0 12px 12px 0',
          }}>
            <p className="font-display" style={{ fontSize: '17px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,232,0.75)', lineHeight: 1.65, margin: 0 }}>{book.pull}</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(201,168,76,0.4)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '10px', marginBottom: 0 }}>{book.scripture}</p>
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(90deg, rgba(201,168,76,0.2), transparent)', marginBottom: '20px' }} />

          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(245,240,232,0.42)', lineHeight: 1.85, marginBottom: '32px' }}>{book.body}</p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href={book.link} target="_blank" className="btn-gold-pill" style={{ fontSize: '12px' }}>Get This Book</Link>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(201,168,76,0.35)', fontStyle: 'italic' }}>via Selar</span>
          </div>
        </div>

        {/* Top line accent */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  )
}

export default function BooksPage() {
  usePageReveal()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [visibleQuotes, setVisibleQuotes] = useState<{ id: number; quote: string; book: string; x: number; y: number; visible: boolean }[]>([])

  const allQuotes = [
    { quote: 'Ignorance is not bliss — it is costly.', book: 'The Cost of Ignorance' },
    { quote: 'You cannot walk in what you do not know.', book: 'The Cost of Ignorance' },
    { quote: 'You were never meant to serve from fear — but from love.', book: 'Sons, Not Slaves' },
    { quote: 'The Father is not looking for servants. He is looking for sons.', book: 'Sons, Not Slaves' },
    { quote: 'Sonship is not a title — it is an identity.', book: 'Sons, Not Slaves' },
    { quote: 'You are not a beggar at the throne — you are an heir.', book: 'Sons, Not Slaves' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, mx = -999, my = -999

    type Pt = { x: number; y: number; vx: number; vy: number; r: number; op: number; angle: number; speed: number; gold: boolean }
    let pts: Pt[] = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      pts = []
      for (let i = 0; i < 40; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.5 + 0.4, op: Math.random() * 0.22 + 0.05, angle: Math.random() * Math.PI * 2, speed: Math.random() * 0.005 + 0.002, gold: Math.random() > 0.35 })
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      if (mx > 0) {
        const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 140)
        mg.addColorStop(0, 'rgba(201,168,76,0.07)'); mg.addColorStop(1, 'transparent')
        ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H)
      }
      pts.forEach((p, i) => {
        const dx = p.x - mx, dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 80 && mx > 0) { p.vx += (dx / dist) * 0.4; p.vy += (dy / dist) * 0.4 }
        p.angle += p.speed; p.x += p.vx + Math.sin(p.angle) * 0.15; p.y += p.vy
        p.vx *= 0.97; p.vy *= 0.97
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        for (let j = i + 1; j < pts.length; j++) {
          const ex = pts[j].x - p.x, ey = pts[j].y - p.y, ed = Math.sqrt(ex * ex + ey * ey)
          if (ed < 90) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y); ctx.strokeStyle = `rgba(201,168,76,${(1 - ed / 90) * 0.06})`; ctx.lineWidth = 0.5; ctx.stroke() }
        }
        const pulse = p.op + Math.sin(p.angle * 2) * 0.04
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.gold ? `rgba(201,168,76,${pulse})` : `rgba(80,140,80,${pulse * 0.45})`
        ctx.fill()
      })
      animRef.current = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top }
    const onLeave = () => { mx = -999; my = -999 }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)
    resize(); draw()
    window.addEventListener('resize', resize)

    let quoteId = Date.now()
    const positions = [{ x: 55, y: 12 }, { x: 60, y: 36 }, { x: 52, y: 58 }, { x: 68, y: 20 }, { x: 57, y: 70 }]
    let posIndex = 0, quoteIndex = 0
    const spawnQuote = () => {
      const pos = positions[posIndex % positions.length]
      const q = allQuotes[quoteIndex % allQuotes.length]
      const id = quoteId++; posIndex++; quoteIndex++
      setVisibleQuotes((prev) => [...prev.slice(-4), { id, quote: q.quote, book: q.book, x: pos.x + (Math.random() * 5 - 2.5), y: pos.y + (Math.random() * 5 - 2.5), visible: true }])
      setTimeout(() => setVisibleQuotes((prev) => prev.map((q) => q.id === id ? { ...q, visible: false } : q)), 4000)
      setTimeout(() => setVisibleQuotes((prev) => prev.filter((q) => q.id !== id)), 4800)
    }
    spawnQuote()
    const interval = setInterval(spawnQuote, 2400)

    return () => {
      cancelAnimationFrame(animRef.current); window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave)
      clearInterval(interval)
    }
  }, [])

  return (
    <main style={{ background: '#060e06', minHeight: '100vh', overflowX: 'hidden' }} className="page-entry">
      <style>{`
        @keyframes goldPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }
        @media (min-width: 768px) {
          .book-editorial-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; min-height: 520px; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '60vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 25% 50%, rgba(26,46,26,0.35) 0%, transparent 70%)', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #060e06, transparent)', zIndex: 2 }} />

        {/* Floating quote cards */}
        {visibleQuotes.map((q) => (
          <div key={q.id} style={{ position: 'absolute', left: `${q.x}%`, top: `${q.y}%`, zIndex: 5, maxWidth: '220px', padding: '14px 18px', background: 'rgba(6,14,6,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(201,168,76,0.16)', borderRadius: '12px', borderLeft: '3px solid rgba(201,168,76,0.55)', opacity: q.visible ? 1 : 0, transform: q.visible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.96)', transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)', pointerEvents: 'none' }}>
            <p className="font-display" style={{ fontSize: '12px', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,232,0.75)', lineHeight: 1.6, marginBottom: '8px' }}>&ldquo;{q.quote}&rdquo;</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>{q.book}</p>
          </div>
        ))}

        <div style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '160px', paddingBottom: '100px', paddingLeft: 'clamp(24px,5vw,80px)', paddingRight: 'clamp(24px,5vw,80px)' }}>
          <div className="animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '999px', padding: '8px 20px', marginBottom: '32px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C', display: 'inline-block', animation: 'goldPulse 2s ease-in-out infinite' }} />
            <span style={{ color: 'rgba(201,168,76,0.7)', fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase' }}>Published Works</span>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="font-display" style={{ fontSize: 'clamp(38px,5.5vw,82px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 0.92, letterSpacing: '-2px' }}>Words That</div>
            <div className="font-display text-gradient-gold" style={{ fontSize: 'clamp(38px,5.5vw,82px)', fontWeight: 700, fontStyle: 'italic', lineHeight: 0.95, letterSpacing: '-2px' }}>Transform.</div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.34s', animationFillMode: 'both', display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
            {['Theology', 'Devotional', 'Biblical Word Studies'].map((r, i, a) => (
              <span key={r} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: 'rgba(201,168,76,0.55)', fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>{r}</span>
                {i < a.length - 1 && <span style={{ color: 'rgba(201,168,76,0.2)' }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL BOOK LIST */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,6vw,100px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {books.map((book, index) => (
          <BookRow key={book.num} book={book} index={index} />
        ))}
      </section>

      {/* SHOW LOVE CTA */}
      <section style={{ padding: '0 clamp(24px,5vw,80px) clamp(60px,6vw,100px)' }}>
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,64px)', border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(26,46,26,0.2)', transition: 'border-color 0.4s, box-shadow 0.4s' }}
          onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,168,76,0.28)'; el.style.boxShadow = '0 20px 60px rgba(201,168,76,0.07)' }}
          onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(201,168,76,0.12)'; el.style.boxShadow = 'none' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right,transparent,#C9A84C,transparent)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.5)', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '20px' }}>Support the Ministry</div>
            <div className="font-display" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, color: '#F5F0E8', lineHeight: 0.95, letterSpacing: '-1px', marginBottom: '28px' }}>
              Blessed by the <span className="text-gradient-gold" style={{ fontWeight: 700, fontStyle: 'italic' }}>Ministry?</span>
            </div>
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', maxWidth: '140px', margin: '0 auto 24px' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(245,240,232,0.35)', fontSize: '14px', lineHeight: 1.85, marginBottom: '40px', maxWidth: '480px', margin: '0 auto 40px' }}>
              If Solomon&apos;s books, music, or teaching have blessed you, you can show love and support the ministry through Selar.
            </p>
            <Link href="https://selar.com/showlove/solomonstephen" target="_blank" className="btn-gold-pill" style={{ fontSize: '12px' }}>Show Love on Selar</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
