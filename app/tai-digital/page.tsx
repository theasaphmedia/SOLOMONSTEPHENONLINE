'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '@/components/usePageReveal'

const services = [
  { num: '01', title: 'Web Design & Development', desc: 'Premium websites that convert and captivate from the first second. Built on Next.js, optimised for performance and SEO.', detail: 'Custom design · Next.js · Tailwind CSS · Vercel deployment · SEO setup' },
  { num: '02', title: 'App Development', desc: 'Mobile and web apps built with precision and purpose — from concept to App Store. Flutter for iOS & Android.', detail: 'Flutter · React Native · iOS & Android · API integration · Play Store & App Store' },
  { num: '03', title: 'Brand Identity & Graphics', desc: 'Logos, visual systems, and brand language that make you unforgettable across every touchpoint.', detail: 'Logo design · Brand guidelines · Print & digital · Social media kits' },
  { num: '04', title: 'Motion & Animation', desc: 'Interactions and animations that feel alive, intentional, and world-class. Design that moves people.', detail: 'Micro-interactions · Page transitions · Scroll animations · Video motion graphics' },
]

const portfolio = [
  { title: 'solomonstephen.com', type: 'Personal Brand Website', tech: 'Next.js · Tailwind · Vercel', desc: 'Full personal brand site for a gospel minister, author, and studio founder. 8 pages, YouTube API, contact forms, custom animations.', link: 'https://solomonstephen.com', live: true },
  { title: 'TWN Celebrations Hub', type: 'Web Application', tech: 'Next.js · Supabase · Vercel', desc: 'Member management and birthday celebration app for The Worship Nation ministry. Dashboard, CSV import, card generator, secure auth.', link: 'https://twn-celebrations-hub.vercel.app', live: true },
  { title: 'Floww', type: 'Mobile App', tech: 'Flutter · AI · Android', desc: 'AI-powered personal finance app for Nigeria. Bank alert reader, budget tracking, smart notifications, PDF export. Play Store ready.', link: '#', live: false },
]

const process = [
  { num: '01', label: 'Discovery', desc: 'We learn your brand, audience, goals, and what success looks like for you.' },
  { num: '02', label: 'Design', desc: 'High-fidelity mockups. Every pixel intentional. You approve before we build.' },
  { num: '03', label: 'Build', desc: 'Clean code, fast performance, mobile-first. Built to last and scale.' },
  { num: '04', label: 'Launch', desc: 'Deployed, tested, live. With dedicated post-launch support.' },
]

export default function TAIDigitalPage() {
  usePageReveal()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, mx = -999, my = -999, time = 0

    type Pt = { x: number; y: number; vx: number; vy: number; r: number; purple: boolean; angle: number; speed: number }
    let pts: Pt[] = []

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      pts = []
      for (let i = 0; i < 80; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.4,
        purple: Math.random() > 0.45,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.005 + 0.002,
      })
    }

    const draw = () => {
      time += 0.008
      ctx.clearRect(0, 0, W, H)

      const g = ctx.createRadialGradient(W * 0.35 + Math.sin(time * 0.5) * 60, H * 0.45 + Math.cos(time * 0.3) * 40, 0, W * 0.35, H * 0.45, W * 0.7)
      g.addColorStop(0, 'rgba(124,58,237,0.09)')
      g.addColorStop(0.5, 'rgba(37,99,235,0.04)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)

      const g2 = ctx.createRadialGradient(W * 0.7 + Math.cos(time * 0.4) * 80, H * 0.3 + Math.sin(time * 0.6) * 60, 0, W * 0.7, H * 0.3, W * 0.4)
      g2.addColorStop(0, 'rgba(96,165,250,0.05)')
      g2.addColorStop(1, 'transparent')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H)

      if (mx > 0) {
        const mg = ctx.createRadialGradient(mx, my, 0, mx, my, 180)
        mg.addColorStop(0, 'rgba(124,58,237,0.1)')
        mg.addColorStop(1, 'transparent')
        ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H)
      }

      for (let x = 40; x < W; x += 40) {
        for (let y = 40; y < H; y += 40) {
          const pulse = 0.03 + Math.sin(time * 2 + x * 0.01 + y * 0.01) * 0.015
          ctx.beginPath(); ctx.arc(x, y, 0.7, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(124,58,237,${pulse})`; ctx.fill()
        }
      }

      pts.forEach((p, i) => {
        const dx = p.x - mx, dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100 && mx > 0) { p.vx += (dx / dist) * 0.8; p.vy += (dy / dist) * 0.8 }
        p.angle += p.speed
        p.vx *= 0.97; p.vy *= 0.97
        p.x += p.vx + Math.sin(p.angle) * 0.2
        p.y += p.vy + Math.cos(p.angle * 0.8) * 0.15
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1

        for (let j = i + 1; j < pts.length; j++) {
          const ex = pts[j].x - p.x, ey = pts[j].y - p.y, ed = Math.sqrt(ex * ex + ey * ey)
          if (ed < 110) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(124,58,237,${(1 - ed / 110) * 0.12})`
            ctx.lineWidth = 0.5; ctx.stroke()
          }
        }

        const opacity = 0.3 + Math.sin(p.angle * 2) * 0.15
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.purple ? `rgba(167,139,250,${opacity})` : `rgba(96,165,250,${opacity * 0.8})`
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

    // Logo entrance
    const logo = logoRef.current
    if (logo) {
      const letters = logo.querySelectorAll('.tai-letter')
      const digital = logo.querySelector('.tai-digital-word') as HTMLElement
      const bar = logo.querySelector('.tai-bar') as HTMLElement
      const meta = logo.querySelector('.tai-meta') as HTMLElement

      letters.forEach((el, i) => {
        const letter = el as HTMLElement
        letter.style.opacity = '0'
        letter.style.transform = `scale(3.5) translateY(${i === 1 ? '20px' : '0'})`
        letter.style.filter = 'blur(10px)'
        setTimeout(() => {
          letter.style.transition = 'all 1s cubic-bezier(0.16,1,0.3,1)'
          letter.style.opacity = '1'
          letter.style.transform = 'scale(1) translateY(0)'
          letter.style.filter = 'blur(0)'
        }, 300 + i * 200)
      })

      if (digital) {
        digital.style.opacity = '0'
        digital.style.transform = 'translateX(-12px)'
        setTimeout(() => {
          digital.style.transition = 'all 0.8s cubic-bezier(0.16,1,0.3,1)'
          digital.style.opacity = '1'
          digital.style.transform = 'translateX(0)'
        }, 1050)
      }

      if (bar) { bar.style.width = '0'; setTimeout(() => { bar.style.transition = 'width 0.8s cubic-bezier(0.16,1,0.3,1)'; bar.style.width = '100%' }, 1200) }
      if (meta) { meta.style.opacity = '0'; meta.style.transform = 'translateY(14px)'; setTimeout(() => { meta.style.transition = 'all 0.7s cubic-bezier(0.16,1,0.3,1)'; meta.style.opacity = '1'; meta.style.transform = 'translateY(0)' }, 1500) }
    }

    // tai-reveal scroll trigger
    const triggered = new Set<Element>()
    const revObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !triggered.has(e.target)) {
          triggered.add(e.target)
          const el = e.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      }),
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px' }
    )
    document.querySelectorAll('.tai-reveal').forEach((el) => {
      const h = el as HTMLElement
      h.style.opacity = '0'; h.style.transform = 'translateY(28px)'
      h.style.transition = 'opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)'
      revObs.observe(el)
    })
    setTimeout(() => {
      document.querySelectorAll('.tai-reveal').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight) { const h = el as HTMLElement; h.style.opacity = '1'; h.style.transform = 'translateY(0)' }
      })
    }, 100)

    // process + cta scroll triggers
    const triggered2 = new Set<Element>()
    const animTriggerObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !triggered2.has(e.target)) {
          triggered2.add(e.target)
          e.target.querySelectorAll('.process-heading-animate, .process-step-animate, .cta-word').forEach((el) => {
            (el as HTMLElement).style.animationPlayState = 'running'
          })
          animTriggerObs.unobserve(e.target)
        }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })

    document.querySelectorAll('.process-heading-animate, .process-step-animate, .cta-word').forEach((el) => {
      ;(el as HTMLElement).style.animationPlayState = 'paused'
    })
    document.querySelectorAll('section').forEach((section) => {
      const hasAnims = section.querySelector('.process-heading-animate, .process-step-animate, .cta-word')
      if (hasAnims) animTriggerObs.observe(section)
    })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      revObs.disconnect()
      animTriggerObs.disconnect()
    }
  }, [])

  return (
    <main style={{ background: '#060010', minHeight: '100vh', overflowX: 'hidden' }} className="page-entry">
      <style>{`
        @keyframes goldPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.7)} }
        @keyframes taiLetterFloat {
          0%,100% { transform: translateY(0) rotate(-0.5deg); }
          50%      { transform: translateY(-10px) rotate(0.5deg); }
        }
        .tai-letter-idle { animation: taiLetterFloat 4s ease-in-out infinite; }
        .tai-letter-idle:nth-child(2) { animation-delay: 0.5s; animation-duration: 3.5s; }
        .tai-letter-idle:nth-child(3) { animation-delay: 1s; animation-duration: 4.5s; }
        .tai-svc-row { transition: background 0.3s, padding-left 0.4s cubic-bezier(0.16,1,0.3,1) !important; cursor: default; }
        .tai-svc-row:hover { background: rgba(124,58,237,0.05) !important; padding-left: 56px !important; }
        .tai-svc-row:hover .tai-svc-bar { transform: scaleX(1) !important; }
        .tai-svc-row:hover .tai-svc-arrow { color: rgba(124,58,237,0.8) !important; transform: translate(4px,-4px) !important; }
        .tai-svc-row:hover .tai-svc-title { color: rgba(167,139,250,0.9) !important; }
        .tai-svc-row:hover .tai-svc-detail { max-height: 40px !important; opacity: 1 !important; }
        .tai-port-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1) !important; }
        .tai-port-card:hover { border-color: rgba(124,58,237,0.4) !important; background: rgba(124,58,237,0.05) !important; transform: translateY(-6px) !important; box-shadow: 0 24px 56px rgba(124,58,237,0.12) !important; }
        .tai-process-step { transition: all 0.35s cubic-bezier(0.16,1,0.3,1) !important; }
        .tai-process-step:hover { border-color: rgba(124,58,237,0.3) !important; background: rgba(124,58,237,0.07) !important; transform: translateX(6px) !important; }
        @keyframes processSlideIn { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        .process-step-animate { opacity: 0; animation: processSlideIn 1.0s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes wordFadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .cta-word { display: inline-block; opacity: 0; animation: wordFadeUp 0.95s cubic-bezier(0.22,1,0.36,1) forwards; }
        @keyframes slideFromLeft { from { opacity: 0; transform: translateX(-32px); } to { opacity: 1; transform: translateX(0); } }
        .process-heading-animate { opacity: 0; animation: slideFromLeft 1.0s cubic-bezier(0.22,1,0.36,1) forwards; }
      `}</style>

      {/* HERO */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '140px', background: 'linear-gradient(to bottom,rgba(6,0,16,0.95),transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top,#060010,transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right,transparent,rgba(124,58,237,0.4),transparent)', zIndex: 3 }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: 'clamp(140px,12vw,180px) clamp(24px,4vw,56px) clamp(80px,8vw,120px)' }}>
          <div className="tai-hero-grid">

            {/* LEFT — Logo lockup */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.08)', marginBottom: '36px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.7)', display: 'inline-block', animation: 'goldPulse 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.8)' }}>The Asaph Innovations</span>
              </div>

              <div ref={logoRef} className="tai-letter-group">
                {/* TAI + Digital — ONE tight lockup on same line */}
                <div style={{ display: 'flex', alignItems: 'flex-end', lineHeight: 0.85 }}>
                  {['T', 'A', 'I'].map((letter, i) => (
                    <span key={letter} className="tai-letter tai-letter-idle"
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontWeight: 900,
                        fontSize: 'clamp(100px,12vw,172px)',
                        letterSpacing: '-8px',
                        display: 'inline-block',
                        ...(i === 0 ? {
                          background: 'linear-gradient(135deg,#a78bfa 0%,#7c3aed 50%,#60a5fa 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.5))',
                        } : { color: '#F0EBF8' }),
                        cursor: 'default',
                        transition: 'filter 0.3s',
                        animationDelay: `${i * 0.4}s`,
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.filter = 'drop-shadow(0 0 30px rgba(124,58,237,0.8))'
                        el.style.animationPlayState = 'paused'
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement
                        el.style.filter = i === 0 ? 'drop-shadow(0 0 40px rgba(124,58,237,0.5))' : 'none'
                        el.style.animationPlayState = 'running'
                      }}>
                      {letter}
                    </span>
                  ))}
                  {/* Digital sits right beside I — same baseline, feels like one word */}
                  <span className="tai-digital-word" style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 200,
                    fontSize: 'clamp(18px,2.2vw,32px)',
                    color: 'rgba(167,139,250,0.5)',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    marginLeft: 'clamp(6px,0.8vw,14px)',
                    marginBottom: 'clamp(10px,1.2vw,18px)',
                    display: 'inline-block',
                  }}>Digital</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px', marginBottom: '0' }}>
                  <div className="tai-bar" style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,#7c3aed,#a78bfa,#60a5fa,transparent)', width: '0' }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.4)', flexShrink: 0 }}>Est. 2026</span>
                </div>
                <div className="tai-meta" style={{ marginTop: '14px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>The Asaph Innovations · Lagos, Nigeria</span>
                </div>
              </div>
            </div>

            {/* RIGHT — copy */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: 300, lineHeight: 1.85, color: 'rgba(255,255,255,0.42)' }}>
                We build <span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>premium digital experiences</span> for brands that refuse to be ordinary — websites, apps, and identities that stop people mid-scroll.
              </p>
              <div style={{ height: '1px', background: 'rgba(124,58,237,0.15)' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Web Design', 'App Development', 'Brand Identity', 'Motion & Animation'].map((s) => (
                  <span key={s} style={{ padding: '7px 16px', borderRadius: '100px', border: '1px solid rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.06)', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(167,139,250,0.7)', letterSpacing: '0.05em', transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', cursor: 'default' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(124,58,237,0.18)'; el.style.borderColor = 'rgba(124,58,237,0.5)'; el.style.color = 'rgba(167,139,250,1)'; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 8px 20px rgba(124,58,237,0.2)' }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(124,58,237,0.06)'; el.style.borderColor = 'rgba(124,58,237,0.2)'; el.style.color = 'rgba(167,139,250,0.7)'; el.style.transform = 'none'; el.style.boxShadow = 'none' }}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ height: '1px', background: 'rgba(124,58,237,0.15)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px rgba(74,222,128,0.7)', display: 'inline-block' }} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em' }}>Currently accepting new projects</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 28px', borderRadius: '10px', background: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 32px rgba(124,58,237,0.35)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-3px)'; el.style.boxShadow = '0 14px 44px rgba(124,58,237,0.55)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 32px rgba(124,58,237,0.35)' }}>
                  Start a Project ↗
                </Link>
                <a href="mailto:theasaphinnovations@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '13px 24px', borderRadius: '10px', border: '1px solid rgba(124,58,237,0.25)', color: 'rgba(167,139,250,0.65)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(124,58,237,0.5)'; el.style.color = 'rgba(167,139,250,1)'; el.style.background = 'rgba(124,58,237,0.08)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(124,58,237,0.25)'; el.style.color = 'rgba(167,139,250,0.65)'; el.style.background = 'transparent' }}>
                  Get in Touch
                </a>
              </div>
              <a href="mailto:theasaphinnovations@gmail.com" style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.18)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(167,139,250,0.6)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.18)' }}>
                theasaphinnovations@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', background: '#060010' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)' }}>
          <div className="tai-section-grid tai-reveal" style={{ marginBottom: '56px' }}>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.6)', marginBottom: '16px' }}>What We Do</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(28px,3.5vw,52px)', color: 'white', lineHeight: 1.0, letterSpacing: '-1px' }}>
                Services Built for<br /><span style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>the Digital Age</span>
              </h2>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.3)', lineHeight: 1.85 }}>Every service is built with one goal — to make your brand impossible to ignore in a world full of noise.</p>
          </div>
          <div style={{ border: '1px solid rgba(124,58,237,0.12)', borderRadius: '20px', overflow: 'hidden' }} className="tai-reveal">
            {services.map((s, i) => (
              <div key={s.num} className="tai-svc-row"
                style={{ padding: '32px 40px', borderBottom: i < services.length - 1 ? '1px solid rgba(124,58,237,0.08)' : 'none', position: 'relative', overflow: 'hidden' }}>
                <div className="tai-svc-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,#7c3aed,#60a5fa,transparent)', transform: 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(124,58,237,0.4)', letterSpacing: '0.3em', flexShrink: 0, marginTop: '6px' }}>{s.num}</span>
                  <div style={{ flex: 1 }}>
                    <div className="tai-svc-title" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '22px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1, marginBottom: '10px', transition: 'color 0.3s' }}>{s.title}</div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75 }}>{s.desc}</p>
                    <div className="tai-svc-detail" style={{ overflow: 'hidden', maxHeight: '0', opacity: 0, transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s' }}>
                      <div style={{ height: '1px', background: 'rgba(124,58,237,0.2)', margin: '12px 0 10px' }} />
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(124,58,237,0.55)', letterSpacing: '0.05em' }}>{s.detail}</p>
                    </div>
                  </div>
                  <span className="tai-svc-arrow" style={{ fontSize: '18px', color: 'rgba(124,58,237,0.3)', flexShrink: 0, transition: 'all 0.3s' }}>↗</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', borderTop: '1px solid rgba(124,58,237,0.08)', background: '#060010' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{ height: '1px', width: '28px', background: 'rgba(124,58,237,0.5)' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(124,58,237,0.5)', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' }}>Selected Work</span>
            <div style={{ height: '1px', flex: 1, background: 'linear-gradient(to right, rgba(124,58,237,0.2), transparent)' }} />
          </div>
          <div className="tai-portfolio-grid tai-reveal">
            {portfolio.map((p) => (
              <div key={p.title} className="tai-port-card"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.1)', borderRadius: '16px', padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg,#7c3aed,#60a5fa,transparent)' }} />
                {p.live && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px', padding: '4px 12px', borderRadius: '100px', background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(74,222,128,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live</span>
                  </div>
                )}
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: 'rgba(124,58,237,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '8px' }}>{p.type}</div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', fontWeight: 600, color: 'rgba(255,255,255,0.88)', marginBottom: '12px' }}>{p.title}</div>
                <div style={{ height: '1px', background: 'rgba(124,58,237,0.12)', marginBottom: '14px' }} />
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.75, marginBottom: '20px' }}>{p.desc}</p>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(124,58,237,0.4)', marginBottom: '20px', letterSpacing: '0.05em' }}>{p.tech}</div>
                {p.live ? (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(124,58,237,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(167,139,250,1)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(124,58,237,0.6)' }}>
                    View Live ↗
                  </a>
                ) : (
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.05em' }}>Coming Soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: 'clamp(40px,6vw,80px) 0', borderTop: '1px solid rgba(124,58,237,0.08)', background: 'linear-gradient(145deg,#080010 0%,#1A001A 60%,#0a000a 100%)' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)' }}>
          <div className="tai-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' }}>
            {[
              { num: '10+', label: 'Years in Ministry' },
              { num: '100%', label: 'Client Satisfaction' },
              { num: '24/7', label: 'Support Available' },
              { num: '2026', label: 'Founded' },
            ].map((stat, i) => (
              <div key={stat.label} style={{ animationDelay: `${i * 0.1}s` }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 700, color: '#a78bfa', marginBottom: '8px' }}>{stat.num}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', borderTop: '1px solid rgba(124,58,237,0.08)' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)' }}>
          <div className="tai-hero-grid">
            <div className="tai-reveal">
              <p className="process-heading-animate" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.6)', marginBottom: '16px', animationDelay: '0.0s' }}>How We Work</p>
              <h2 className="process-heading-animate" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,52px)', color: 'white', lineHeight: 1.05, letterSpacing: '-1px', marginBottom: '20px', animationDelay: '0.18s' }}>
                From Idea to <span style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Launch</span>
              </h2>
              <div className="process-heading-animate" style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#7c3aed,#2563eb)', borderRadius: '1px', marginBottom: '20px', animationDelay: '0.34s' }} />
              <p className="process-heading-animate" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.85, animationDelay: '0.48s' }}>A clear, collaborative process that keeps you informed at every step — no surprises, no delays.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="tai-reveal">
              {process.map((p, i) => (
                <div key={p.num} className="tai-process-step process-step-animate"
                  style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '20px 24px', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.08)', background: 'rgba(124,58,237,0.02)', animationDelay: `${0.1 + i * 0.18}s` }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: i % 2 === 0 ? 'rgba(124,58,237,0.15)' : 'rgba(37,99,235,0.15)', border: `1px solid ${i % 2 === 0 ? 'rgba(124,58,237,0.25)' : 'rgba(37,99,235,0.25)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, color: i % 2 === 0 ? 'rgba(124,58,237,0.7)' : 'rgba(96,165,250,0.7)' }}>{p.num}</div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: 'rgba(255,255,255,0.82)', marginBottom: '5px' }}>{p.label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.7 }}>{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(60px,8vw,120px) 0', borderTop: '1px solid rgba(124,58,237,0.08)' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)' }}>
          <div className="tai-section-grid tai-reveal">
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(124,58,237,0.6)', marginBottom: '20px' }}>Ready to Build?</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: 'clamp(28px,4vw,56px)', lineHeight: 1.0, letterSpacing: '-1px', marginBottom: '20px' }}>
                {["Let's", 'Create', 'Something'].map((word, i) => (
                  <span key={word} className="cta-word" style={{ color: 'white', marginRight: '0.25em', animationDelay: `${i * 0.15}s` }}>{word} </span>
                ))}
                <br />
                <span className="cta-word" style={{ background: 'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animationDelay: '0.48s' }}>Extraordinary</span>
              </h2>
              <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg,#7c3aed,#2563eb)', borderRadius: '1px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 300, color: 'rgba(255,255,255,0.35)', lineHeight: 1.85 }}>
                Whether you need a website, an app, or a full brand identity — we build digital experiences that refuse to be forgotten.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link href="/contact"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '10px', background: 'linear-gradient(135deg,#7c3aed,#2563eb)', color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', boxShadow: '0 8px 40px rgba(124,58,237,0.35)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 52px rgba(124,58,237,0.5)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 40px rgba(124,58,237,0.35)' }}>
                  Start a Project ↗
                </Link>
                <a href="mailto:theasaphinnovations@gmail.com"
                  style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 24px', borderRadius: '10px', border: '1px solid rgba(124,58,237,0.25)', color: 'rgba(167,139,250,0.6)', fontFamily: 'Inter, sans-serif', fontSize: '12px', letterSpacing: '0.05em', textDecoration: 'none', transition: 'all 0.3s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(124,58,237,0.5)'; el.style.color = 'rgba(167,139,250,1)'; el.style.background = 'rgba(124,58,237,0.08)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = 'rgba(124,58,237,0.25)'; el.style.color = 'rgba(167,139,250,0.6)'; el.style.background = 'transparent' }}>
                  theasaphinnovations@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '20px 0' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.12)', textTransform: 'uppercase', margin: 0 }}>© 2026 TAI Digital · The Asaph Innovations · Lagos, Nigeria</p>
          <a href="mailto:theasaphinnovations@gmail.com"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(167,139,250,0.25)', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(167,139,250,0.6)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(167,139,250,0.25)' }}>
            theasaphinnovations@gmail.com
          </a>
        </div>
      </div>
    </main>
  )
}
