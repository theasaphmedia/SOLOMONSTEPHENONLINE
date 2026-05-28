'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

const services = [
  { id:'01', fn:'web.design_and_build()', title:'Web Design & Development', desc:'Premium websites built on Next.js, React, and modern frameworks. From concept to Vercel deployment — animated, responsive, performant. Every pixel intentional.', tech:['Next.js','React','TypeScript','Vercel','Tailwind'] },
  { id:'02', fn:'mobile.build_application()', title:'Mobile Application', desc:'Cross-platform Flutter apps with robust Supabase backends. Built for real users. Shipped to app stores. Scaled for growth.', tech:['Flutter','Dart','Supabase','Riverpod','REST API'] },
  { id:'03', fn:'brand.create_identity()', title:'Brand Identity', desc:'Logos, visual systems, typography, colour palettes. The entire language that tells the world who you are — before you speak a word.', tech:['Figma','Illustrator','Design Systems','Typography'] },
  { id:'04', fn:'ui.design_experience()', title:'UI / UX Design', desc:'Wireframes, prototypes, and design systems in Figma. Interfaces that feel inevitable — intuitive, beautiful, purposeful. No guesswork.', tech:['Figma','Prototyping','User Research','Design Tokens'] },
]

const portfolio = [
  { id:'01', name:'ttconline.org', title:'The Transformation Camp', label:'Ministry Website', stack:['Next.js','TypeScript','Framer Motion'], desc:'A multi-page website for a transformative Christian camp ministry. Light design, rich animations, real content. Built to represent a movement.', url:'https://ttconline.org', img:'/images/solomon-green-blazer-tai.png', live:true },
  { id:'02', name:'PulpitFlow', title:'Real-Time Preaching System', label:'Mobile App', stack:['Flutter','Riverpod','Supabase','API.Bible'], desc:'Redefines how ministers prepare and deliver messages. Replaces printed notes, WhatsApp screenshots, and hand signals — one seamless system.', url:'#', img:'/images/solomon-photo2.png', live:false },
  { id:'03', name:'solomonstephen.com', title:'This Website', label:'Personal Brand', stack:['Next.js','TypeScript','React 19'], desc:'A showcase of what TAI Digital builds — animated, content-rich, world-class. The personal platform of Solomon Stephen.', url:'https://solomonstephen.com', img:'/images/solomon-green-suit-hero.png', live:true },
]

const ticker = ['Next.js','React','TypeScript','Flutter','Dart','Supabase','Figma','Vercel','Node.js','Tailwind CSS','Framer Motion','Riverpod','REST API','PostgreSQL','Git','Design Systems']

/* ── scramble util ── */
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}/'
function scramble(el: HTMLElement, target: string, ms = 900) {
  let frame = 0
  const total = Math.ceil(ms / 16)
  const run = () => {
    let out = ''
    for (let i = 0; i < target.length; i++) {
      const reveal = Math.floor((frame / total) * target.length)
      if (i < reveal) out += target[i]
      else out += target[i] === ' ' ? ' ' : POOL[Math.floor(Math.random() * POOL.length)]
    }
    el.textContent = out
    frame++
    if (frame <= total) requestAnimationFrame(run)
    else el.textContent = target
  }
  requestAnimationFrame(run)
}

/* ── counter util ── */
function animCount(el: HTMLElement, from: number, to: number, suffix: string, ms: number) {
  const start = performance.now()
  function step(now: number) {
    const p = Math.min((now - start) / ms, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(from + (to - from) * ease) + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/* ── colorize util ── */
function colorize(s: string): string {
  return s
    .replace(/\b(const|let|var)\b/g, '<span class="ck">$1</span>')
    .replace(/'([^']*)'/g, "<span class=\"cv\">'$1'</span>")
    .replace(/\/\/.*/g, '<span class="cc">$&</span>')
    .replace(/[{}[\],]/g, '<span style="color:rgba(255,255,255,.5)">$&</span>')
}

/* ── code lines ── */
const CODE_LINES = [
  "const TAIDigital = {",
  "  name: 'The Asaph Innovations',",
  "  base: 'Lagos, Nigeria',",
  "  stack: ['Next.js','Flutter','Figma'],",
  "  standard: 'excellence',",
  "  satisfaction: 1.0,  // 100%",
  "}",
]

export default function TaiDigitalPage() {
  const [entered, setEntered] = useState(false)
  const [hovSvc, setHovSvc] = useState<number | null>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const h1bRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    /* page enter */
    const t = setTimeout(() => setEntered(true), 60)

    /* IntersectionObserver — reveal classes */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.rv-wipe,.rv-flip,.rv-twist,.rv-flash,.rv-scale,.rv-left,.rv-right,.rv-line,.rv-word').forEach(el => obs.observe(el))

    /* scramble headlines */
    const t2 = setTimeout(() => { if (h1Ref.current) scramble(h1Ref.current, 'The Asaph', 1100) }, 350)
    const t3 = setTimeout(() => { if (h1bRef.current) scramble(h1bRef.current, 'Innovations.', 1000) }, 650)

    /* live code typing */
    const t4 = setTimeout(() => {
      if (!codeRef.current) return
      const wrap = codeRef.current
      wrap.innerHTML = ''
      let li = 0, ci = 0
      function addCursor() {
        const existing = wrap.querySelector('.cursor')
        if (existing) existing.remove()
        const cursor = document.createElement('span')
        cursor.className = 'cursor'
        cursor.textContent = '|'
        cursor.style.cssText = 'color:#C9A84C;animation:blink .7s step-end infinite;'
        wrap.appendChild(cursor)
      }
      function typeNext() {
        if (li >= CODE_LINES.length) { addCursor(); return }
        const line = CODE_LINES[li]
        if (ci === 0) {
          const div = document.createElement('div')
          div.className = 'code-line-el'
          div.style.cssText = 'display:flex;gap:20px;min-height:1.9em;'
          const lnSpan = document.createElement('span')
          lnSpan.style.cssText = 'color:rgba(255,255,255,.15);min-width:16px;text-align:right;user-select:none;font-size:inherit;'
          lnSpan.textContent = String(li + 1)
          const txtSpan = document.createElement('span')
          txtSpan.className = 'code-txt-' + li
          div.appendChild(lnSpan)
          div.appendChild(txtSpan)
          wrap.appendChild(div)
          addCursor()
        }
        const txtEl = wrap.querySelector('.code-txt-' + li) as HTMLElement
        if (txtEl) txtEl.innerHTML = colorize(line.slice(0, ci + 1))
        ci++
        if (ci >= line.length) { li++; ci = 0; setTimeout(typeNext, 80) }
        else setTimeout(typeNext, 28 + Math.random() * 18)
      }
      typeNext()
    }, 600)

    /* counter animations */
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement
        const target = el.dataset.count || ''
        if (target === '100%') animCount(el, 0, 100, '%', 1200)
        else if (target === '4') animCount(el, 0, 4, '', 800)
        else if (target === '3+') animCount(el, 0, 3, '+', 900)
        counterObs.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el))

    /* ── Portfolio 3D magnetic tilt + spotlight ── */
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.port-card'))
    const tiltCleanup: Array<() => void> = []
    cards.forEach(card => {
      const spotlight = card.querySelector<HTMLElement>('.card-spotlight')
      let raf = 0
      const onMove = (e: MouseEvent) => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect()
          const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
          const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
          card.style.transform = `perspective(1000px) rotateY(${dx * 9}deg) rotateX(${-dy * 7}deg) translateZ(10px)`
          if (spotlight) {
            spotlight.style.opacity = '1'
            spotlight.style.background = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(201,168,76,.11) 0%, rgba(120,66,226,.04) 40%, transparent 65%)`
          }
        })
      }
      const onEnter = () => { card.style.transition = 'transform .08s linear, border-color .4s' }
      const onLeave = () => {
        cancelAnimationFrame(raf)
        card.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1), border-color .4s'
        card.style.transform = ''
        if (spotlight) spotlight.style.opacity = '0'
        setTimeout(() => { if (card) card.style.transition = '' }, 700)
      }
      card.addEventListener('mousemove', onMove as EventListener)
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mouseleave', onLeave)
      tiltCleanup.push(() => {
        card.removeEventListener('mousemove', onMove as EventListener)
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    /* ── Service fn scramble on hover ── */
    const fnEls = Array.from(document.querySelectorAll<HTMLElement>('.svc-fn-el'))
    const fnCleanup: Array<() => void> = []
    fnEls.forEach(el => {
      const original = el.textContent || ''
      let active = false
      const row = el.closest<HTMLElement>('.svc-row')
      const onEnter = () => { if (!active) { active = true; scramble(el, original, 520) } }
      const onLeave = () => { active = false; setTimeout(() => { if (el && !active) el.textContent = original }, 580) }
      row?.addEventListener('mouseenter', onEnter)
      row?.addEventListener('mouseleave', onLeave)
      fnCleanup.push(() => {
        row?.removeEventListener('mouseenter', onEnter)
        row?.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => {
      clearTimeout(t); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4)
      obs.disconnect(); counterObs.disconnect()
      tiltCleanup.forEach(fn => fn())
      fnCleanup.forEach(fn => fn())
    }
  }, [])

  return (
    <main style={{ background:'#080808', overflowX:'hidden', color:'#F0EDE8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        /* ══════════════════════════════
           LOGO — continuous animation
        ══════════════════════════════ */
        .logo-watermark {
          position: absolute;
          right: -4%; top: 50%;
          width: clamp(300px, 40vw, 540px);
          pointer-events: none;
          z-index: 0;
          user-select: none;
          animation:
            logoFloat 13s ease-in-out infinite,
            logoBreathe 7s ease-in-out infinite;
        }
        @keyframes logoFloat {
          0%,100% { transform: translateY(-50%) rotate(0deg) scale(1); }
          28%      { transform: translateY(calc(-50% - 20px)) rotate(3.5deg) scale(1.03); }
          62%      { transform: translateY(calc(-50% + 14px)) rotate(-2deg) scale(0.97); }
        }
        @keyframes logoBreathe {
          0%,100% { opacity: .15; filter: drop-shadow(0 0 0px rgba(91,55,187,0)); }
          50%      { opacity: .24; filter: drop-shadow(0 0 44px rgba(91,55,187,.22)); }
        }

        /* ══════════════════════════════
           REVEAL CLASSES
        ══════════════════════════════ */
        .rv-wipe {
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.1s cubic-bezier(.16,1,.3,1);
        }
        .rv-wipe.is-visible { clip-path: inset(0 0% 0 0); }

        .rv-flip {
          opacity: 0;
          transform: perspective(700px) rotateX(55deg) translateY(-20px);
          transform-origin: top center;
          transition: opacity .6s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1);
        }
        .rv-flip.is-visible { opacity: 1; transform: perspective(700px) rotateX(0) translateY(0); }

        .rv-twist {
          opacity: 0;
          transform: scale(1.07) rotate(-2.5deg);
          filter: blur(4px);
          transition: opacity .8s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.34,1.4,.64,1), filter .7s;
        }
        .rv-twist.is-visible { opacity: 1; transform: none; filter: blur(0); }

        .rv-flash {
          opacity: 0;
          filter: brightness(5) blur(8px) saturate(0);
          transition: opacity .5s, filter 1.1s cubic-bezier(.16,1,.3,1);
        }
        .rv-flash.is-visible { opacity: 1; filter: brightness(1) blur(0) saturate(1); }

        .rv-scale {
          opacity: 0; transform: scale(0.82); filter: blur(6px);
          transition: opacity .9s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.34,1.5,.64,1), filter .8s;
        }
        .rv-scale.is-visible { opacity: 1; transform: none; filter: blur(0); }

        .rv-left {
          opacity: 0; transform: translateX(-56px) rotateY(-8deg); filter: blur(6px);
          transform-origin: right center;
          transition: opacity .9s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1), filter .9s;
        }
        .rv-left.is-visible { opacity: 1; transform: none; filter: blur(0); }

        .rv-right {
          opacity: 0; transform: translateX(56px) rotateY(8deg); filter: blur(6px);
          transform-origin: left center;
          transition: opacity .9s cubic-bezier(.16,1,.3,1), transform 1.1s cubic-bezier(.16,1,.3,1), filter .9s;
        }
        .rv-right.is-visible { opacity: 1; transform: none; filter: blur(0); }

        /* Word-by-word reveal */
        .word-wrap { overflow: hidden; display: inline-block; margin-right: .28em; }
        .rv-word {
          display: inline-block;
          opacity: 0; transform: translateY(105%) skewX(-5deg);
          transition: opacity .65s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1);
        }
        .rv-word.is-visible { opacity: 1; transform: none; }

        .rv-line { transform-origin:left; transform:scaleX(0); transition:transform 1.2s cubic-bezier(.16,1,.3,1); }
        .rv-line.is-visible { transform:scaleX(1); }

        /* delay helpers */
        .d1{transition-delay:.08s} .d2{transition-delay:.18s} .d3{transition-delay:.28s}
        .d4{transition-delay:.40s} .d5{transition-delay:.54s} .d6{transition-delay:.68s}

        /* ══════════════════════════════
           TICKER
        ══════════════════════════════ */
        .ticker-wrap { display:flex; gap:0; width:max-content; animation:tick 32s linear infinite; }
        .ticker-wrap:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ══════════════════════════════
           CODE BLOCK — gradient border scan
        ══════════════════════════════ */
        .code-outer {
          position: relative;
          padding: 1px;
          background: linear-gradient(135deg, rgba(201,168,76,.3) 0%, rgba(201,168,76,.06) 50%, rgba(120,66,226,.25) 100%);
          border-radius: 2px;
          overflow: hidden;
        }
        .code-outer::before {
          content: '';
          position: absolute; top: -100%; left: -100%;
          width: 60%; height: 300%;
          background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,.38) 50%, transparent 100%);
          animation: borderScan 3.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes borderScan {
          0%   { transform: translateX(0) rotate(15deg); }
          100% { transform: translateX(500%) rotate(15deg); }
        }
        .code-inner {
          background: #0A0A0A;
          padding: clamp(22px,2.5vw,32px);
          font-family: 'Space Mono','Courier New',monospace;
          font-size: clamp(11px,.95vw,13px);
          line-height: 1.9; min-height: 220px;
        }
        .ck{color:#C9A84C} .cf{color:#79B8FF} .cs{color:#9ECBFF} .cc{color:rgba(255,255,255,.25)} .cv{color:#85E89D}
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ══════════════════════════════
           GLITCH HEADLINE
        ══════════════════════════════ */
        .glitch-wrap { position:relative; display:inline-block; }
        .glitch-wrap:hover .glitch-clone {
          animation: glitch1 .3s steps(1) both, glitch2 .3s steps(1) both;
        }
        .glitch-clone {
          position:absolute; top:0; left:0; width:100%; pointer-events:none;
          color:#C9A84C; opacity:0;
        }
        @keyframes glitch1 {
          0%  { opacity:.6; clip-path:inset(20% 0 60% 0); transform:translateX(-4px); }
          33% { clip-path:inset(60% 0 10% 0); transform:translateX(4px); }
          66% { clip-path:inset(40% 0 40% 0); transform:translateX(-2px); }
          100%{ opacity:0; transform:translateX(0); }
        }
        @keyframes glitch2 {
          0%  { opacity:.4; clip-path:inset(55% 0 25% 0); transform:translateX(5px); color:#79B8FF; }
          50% { clip-path:inset(10% 0 70% 0); transform:translateX(-3px); }
          100%{ opacity:0; }
        }

        /* ══════════════════════════════
           SERVICE ROWS — enhanced
        ══════════════════════════════ */
        .svc-row {
          border-top: 1px solid rgba(255,255,255,.06);
          padding: clamp(28px,3.5vw,48px) 0;
          display: grid;
          grid-template-columns: clamp(48px,5vw,70px) 1fr auto;
          align-items: start;
          gap: clamp(20px,3vw,48px);
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: background .5s;
        }
        .svc-row:last-child { border-bottom: 1px solid rgba(255,255,255,.06); }

        /* left border draw */
        .svc-row::before {
          content: ''; position:absolute; left:0; top:0; bottom:0; width:3px;
          background: linear-gradient(to bottom, #C9A84C, rgba(201,168,76,.2));
          transform: scaleY(0); transform-origin: top;
          transition: transform .6s cubic-bezier(.16,1,.3,1);
        }
        .svc-row:hover::before { transform: scaleY(1); }

        /* horizontal light sweep */
        .svc-row::after {
          content: '';
          position: absolute; top: 0; bottom: 0; left: -65%; width: 55%;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,.04), rgba(201,168,76,.07), transparent);
          transition: left .75s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .svc-row:hover { background: rgba(201,168,76,.025); }
        .svc-row:hover::after { left: 120%; }

        /* number glitch */
        .svc-num { position:relative; font-family:'Space Mono',monospace; font-size:12px; color:rgba(201,168,76,.4); padding-top:4px; }
        .svc-num::after {
          content: attr(data-n); position:absolute; top:0; left:0;
          color:#79B8FF; opacity:0; font-family:inherit;
        }
        .svc-row:hover .svc-num { color: rgba(201,168,76,.8); }
        .svc-row:hover .svc-num::after { animation: numGlitch .45s steps(3) both; }
        @keyframes numGlitch {
          0%  { opacity:.7; transform:translateX(3px); }
          50% { transform:translateX(-2px); clip-path:inset(30% 0 40% 0); }
          100%{ opacity:0; transform:none; }
        }

        /* fn text */
        .svc-fn-el {
          font-family: 'Space Mono',monospace;
          font-size: 9px; letter-spacing: .16em;
          color: rgba(201,168,76,.32); margin-bottom: 10px;
          transition: color .3s, letter-spacing .4s;
          display: inline-block;
        }
        .svc-row:hover .svc-fn-el { color: rgba(201,168,76,.65); letter-spacing: .2em; }

        /* title */
        .svc-title {
          font-family: 'Cormorant Garamond',serif;
          font-size: clamp(22px,3vw,38px);
          font-weight: 400; line-height: 1.1; margin-bottom: 10px;
          transition: color .35s, transform .4s cubic-bezier(.16,1,.3,1);
        }
        .svc-row:hover .svc-title { color: #C9A84C !important; transform: translateX(6px); }

        /* tech stack — stagger in on hover */
        .svc-tech-item {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Space Mono',monospace; font-size: 9px;
          letter-spacing: .13em; white-space: nowrap;
          color: rgba(255,255,255,.18);
          opacity: 0; transform: translateX(18px);
          transition: opacity .35s cubic-bezier(.16,1,.3,1), transform .4s cubic-bezier(.16,1,.3,1), color .3s;
        }
        .svc-row:hover .svc-tech-item { opacity: 1; transform: none; }
        .svc-row:hover .svc-tech-item:nth-child(1) { transition-delay: .04s; }
        .svc-row:hover .svc-tech-item:nth-child(2) { transition-delay: .10s; }
        .svc-row:hover .svc-tech-item:nth-child(3) { transition-delay: .17s; }
        .svc-row:hover .svc-tech-item:nth-child(4) { transition-delay: .25s; }
        .svc-row:hover .svc-tech-item:nth-child(5) { transition-delay: .33s; }
        .svc-tech-item:hover { color: rgba(201,168,76,.7); }

        /* ══════════════════════════════
           PORTFOLIO CARDS — 3D tilt + spotlight
        ══════════════════════════════ */
        .port-card {
          background: #0E0E0E;
          border: 1px solid rgba(255,255,255,.07);
          overflow: hidden; display:flex; flex-direction:column;
          text-decoration:none; color:inherit;
          position: relative;
          transform-style: preserve-3d;
          will-change: transform;
          transition: border-color .4s;
        }
        .port-card:hover { border-color: rgba(201,168,76,.35); }

        /* spotlight layer */
        .card-spotlight {
          position: absolute; inset: 0; opacity: 0;
          pointer-events: none; z-index: 2;
          transition: opacity .25s;
          border-radius: inherit;
        }

        /* image zoom */
        .port-img img { transition: transform 1.2s cubic-bezier(.16,1,.3,1) !important; }
        .port-card:hover .port-img img { transform: scale(1.07) !important; }

        /* card content reveal on hover */
        .port-card-meta {
          transition: color .3s, transform .4s cubic-bezier(.16,1,.3,1);
        }
        .port-card:hover .port-card-meta { color: rgba(201,168,76,.6) !important; }
        .port-card-title {
          transition: color .35s;
        }
        .port-card:hover .port-card-title { color: #C9A84C !important; }

        /* ── arrow reveal on card hover ── */
        .port-arrow {
          overflow: hidden; display: inline-block;
        }
        .port-arrow-inner {
          display: inline-block;
          transform: translateX(-100%);
          opacity: 0;
          transition: transform .5s cubic-bezier(.16,1,.3,1), opacity .4s;
          transition-delay: .08s;
        }
        .port-card:hover .port-arrow-inner { transform: none; opacity: 1; }

        /* ══════════════════════════════
           TECH CHIP
        ══════════════════════════════ */
        .chip {
          font-family:'Space Mono',monospace; font-size:10px;
          padding:4px 10px; border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.32); white-space:nowrap;
          transition:border-color .3s, color .3s, background .3s;
        }
        .chip:hover { border-color:rgba(201,168,76,.45); color:rgba(201,168,76,.8); background:rgba(201,168,76,.04); }

        /* ══════════════════════════════
           BUTTONS
        ══════════════════════════════ */
        .btn-gold {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:15px 36px;
          background:#C9A84C; color:#080808;
          text-decoration:none; display:inline-block;
          transition:background .3s, letter-spacing .4s, transform .3s;
        }
        .btn-gold:hover { background:#D9B85C; letter-spacing:.22em; transform:translateY(-2px); }
        .btn-ghost {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:14px 36px;
          background:transparent; color:rgba(240,237,232,.45);
          border:1px solid rgba(255,255,255,.12);
          text-decoration:none; display:inline-block;
          transition:border-color .3s, color .3s, transform .3s;
        }
        .btn-ghost:hover { border-color:rgba(201,168,76,.5); color:#C9A84C; transform:translateY(-2px); }

        /* ══════════════════════════════
           CTA PULSE
        ══════════════════════════════ */
        @keyframes ctaPulse { 0%,100%{opacity:.04;transform:scale(1)} 50%{opacity:.1;transform:scale(1.15)} }
        .cta-glow { animation:ctaPulse 4s ease-in-out infinite; }

        /* ══════════════════════════════
           STATS — flash in
        ══════════════════════════════ */
        .stat-num {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(40px,5vw,64px); font-weight:400;
          color:#C9A84C; line-height:1; margin-bottom:10px;
          transition: color .3s;
        }
        .stat-cell:hover .stat-num { color:#E0C070; }
        .stat-cell {
          background:#080808;
          padding:clamp(28px,3.5vw,48px) clamp(20px,2.5vw,36px);
          transition: background .4s;
          position: relative; overflow: hidden;
        }
        .stat-cell::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,.4), transparent);
          transform: scaleX(0); transform-origin: center;
          transition: transform .5s cubic-bezier(.16,1,.3,1);
        }
        .stat-cell:hover::after { transform: scaleX(1); }
        .stat-cell:hover { background: rgba(201,168,76,.03); }

        /* ══════════════════════════════
           RESPONSIVE
        ══════════════════════════════ */
        @media(max-width:900px) {
          .hero-grid { grid-template-columns:1fr !important; }
          .code-col  { display:none !important; }
          .ab-grid   { grid-template-columns:1fr !important; }
          .svc-row   { grid-template-columns:40px 1fr !important; }
          .svc-tech  { display:none !important; }
          .port-grid { grid-template-columns:1fr !important; }
          .stats-grid{ grid-template-columns:1fr 1fr !important; }
          .logo-watermark { right:-18%; width:clamp(200px,65vw,340px); opacity-trick: ignore; }
          .rv-left,.rv-right { transform:scale(0.94) !important; filter:blur(4px) !important; }
          .rv-left.is-visible,.rv-right.is-visible { transform:none !important; filter:blur(0) !important; }
        }
        @media(max-width:520px) {
          .stats-grid { grid-template-columns:1fr !important; }
          .cta-flex   { flex-direction:column !important; align-items:center !important; }
        }
      `}</style>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', background:'linear-gradient(150deg,#060A06 0%,#080808 55%,#060810 100%)', padding:'clamp(120px,14vw,160px) clamp(24px,4.5vw,88px) clamp(72px,9vw,110px)' }}>

        {/* grid texture */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none', zIndex:0 }} />

        {/* TAI logo — animated watermark */}
        <div className="logo-watermark" aria-hidden="true">
          <Image src="/images/tai-logo.svg" alt="" fill={false} width={540} height={632} style={{ width:'100%', height:'auto' }} priority />
        </div>

        {/* gold atmosphere glow */}
        <div style={{ position:'absolute', top:'20%', left:'28%', width:'520px', height:'520px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,.05) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        <div style={{ maxWidth:'1320px', margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
          <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(48px,6vw,88px)', alignItems:'center' }}>

            {/* ── LEFT ── */}
            <div>
              {/* status pill */}
              <div style={{ opacity:entered?1:0, transform:entered?'none':'translateY(16px)', filter:entered?'blur(0)':'blur(4px)', transition:'opacity .8s .08s,transform .8s .08s,filter .7s .08s', marginBottom:'clamp(28px,3.5vw,48px)', display:'flex', alignItems:'center', gap:'14px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#4CAF50', boxShadow:'0 0 10px rgba(76,175,80,.8)', flexShrink:0 }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.32em', color:'rgba(255,255,255,.28)', textTransform:'uppercase' }}>TAI Digital · Available for projects</span>
              </div>

              {/* glitch headline line 1 */}
              <div style={{ overflow:'hidden', marginBottom:'4px' }}>
                <div className="glitch-wrap" style={{ opacity:entered?1:0, transform:entered?'none':'translateY(110%) rotateX(20deg)', transition:'opacity .9s .26s,transform .95s .26s cubic-bezier(.16,1,.3,1)', display:'inline-block', lineHeight:.93 }}>
                  <h1 ref={h1Ref} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,7.5vw,96px)', fontWeight:400, letterSpacing:'-0.02em', color:'#F0EDE8', margin:0, lineHeight:.93 }}>The Asaph</h1>
                  <span className="glitch-clone" aria-hidden="true" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,7.5vw,96px)', fontWeight:400, lineHeight:.93 }}>The Asaph</span>
                </div>
              </div>

              {/* glitch headline line 2 */}
              <div style={{ overflow:'hidden', marginBottom:'clamp(24px,3vw,40px)' }}>
                <div className="glitch-wrap" style={{ opacity:entered?1:0, transform:entered?'none':'translateY(110%) rotateX(20deg)', transition:'opacity .9s .4s,transform .95s .4s cubic-bezier(.16,1,.3,1)', display:'inline-block' }}>
                  <h1 ref={h1bRef} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,7.5vw,96px)', fontWeight:400, letterSpacing:'-0.02em', color:'#C9A84C', fontStyle:'italic', margin:0, lineHeight:.93 }}>Innovations.</h1>
                  <span className="glitch-clone" aria-hidden="true" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,7.5vw,96px)', fontWeight:400, fontStyle:'italic', lineHeight:.93 }}>Innovations.</span>
                </div>
              </div>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.8, color:'rgba(240,237,232,.38)', maxWidth:'460px', margin:'0 0 clamp(36px,4.5vw,56px)', opacity:entered?1:0, transform:entered?'none':'translateY(20px)', transition:'opacity .9s .56s,transform .9s .56s' }}>
                Premium web, mobile, and brand work — named after Asaph, the master musician and prophetic seer appointed by King David. Excellence is the only standard.
              </p>

              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', opacity:entered?1:0, transform:entered?'none':'translateY(16px)', transition:'opacity .9s .7s,transform .9s .7s' }}>
                <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold">Start a Project</a>
                <a href="#portfolio" className="btn-ghost">View Work</a>
              </div>
            </div>

            {/* ── RIGHT — animated code block ── */}
            <div className="code-col rv-right d3">
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.24em', color:'rgba(255,255,255,.18)', marginBottom:'10px', textTransform:'uppercase' }}>tai.config.ts</div>
              <div className="code-outer">
                <div className="code-inner" ref={codeRef} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          TICKER
      ════════════════════════════════════ */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.05)', borderBottom:'1px solid rgba(255,255,255,.05)', background:'#050805', padding:'14px 0', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right,#050805,transparent)', zIndex:2 }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left,#050805,transparent)', zIndex:2 }} />
        <div className="ticker-wrap">
          {[...ticker,...ticker].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', letterSpacing:'.12em', color:'rgba(255,255,255,.2)', whiteSpace:'nowrap', padding:'0 clamp(20px,2.5vw,36px)' }}>{s}</span>
              <span style={{ color:'rgba(201,168,76,.3)' }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════
          STATS
      ════════════════════════════════════ */}
      <section style={{ background:'#080808', padding:'clamp(64px,8vw,96px) clamp(24px,4.5vw,88px)', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,.06)' }}>
            {[
              { val:'3+', raw:'3+', label:'Projects Shipped', sub:'and counting' },
              { val:'100%', raw:'100%', label:'Client Satisfaction', sub:'every single time' },
              { val:'4', raw:'4', label:'Core Services', sub:'web · mobile · brand · UX' },
              { val:'∞', raw:undefined, label:'Attention to Detail', sub:'non-negotiable' },
            ].map((s, i) => (
              <div key={i} className="stat-cell rv-flip" style={{ transitionDelay:(i*.1)+'s' }}>
                <div className="stat-num rv-flash" data-count={s.raw} style={{ transitionDelay:(i*.1+.2)+'s' }}>{s.val}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(240,237,232,.6)', marginBottom:'6px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.16)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          ABOUT
      ════════════════════════════════════ */}
      <section style={{ background:'#080808', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div className="ab-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(56px,7vw,104px)', alignItems:'start' }}>
            <div>
              <div className="rv-line" style={{ height:'1px', background:'linear-gradient(90deg,#C9A84C,rgba(201,168,76,.08))', marginBottom:'clamp(24px,3vw,40px)', width:'100%' }} />
              <div className="rv-wipe" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', marginBottom:'clamp(16px,2vw,24px)' }}>
                {'// about.the_agency'}
              </div>

              {/* word-split heading */}
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(30px,4.5vw,58px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.1, margin:'0 0 clamp(20px,2.5vw,32px)', letterSpacing:'-.01em' }}>
                {['We','build','digital','infrastructure','that'].map((w,i) => (
                  <span key={w+i} className="word-wrap"><span className="rv-word" style={{ transitionDelay:(i*.07)+'s' }}>{w}{' '}</span></span>
                ))}
                <span className="word-wrap"><span className="rv-word" style={{ transitionDelay:'.4s', color:'#C9A84C', fontStyle:'italic' }}>carries meaning.</span></span>
              </h2>

              <p className="rv-flip d2" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.35vw,16px)', lineHeight:1.88, color:'rgba(240,237,232,.37)', margin:'0 0 clamp(16px,2vw,24px)' }}>
                Named after Asaph — the master musician and prophetic seer appointed by King David — TAI Digital carries that DNA into the digital age: creativity, spiritual depth, and the conviction that what we make should carry weight and meaning.
              </p>
              <p className="rv-flip d3" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.35vw,16px)', lineHeight:1.88, color:'rgba(240,237,232,.37)', margin:'0 0 clamp(36px,4.5vw,52px)' }}>
                We build for ministries, entrepreneurs, and individuals who understand that their digital presence is not a checkbox — it is a first impression, a declaration, and a platform.
              </p>
              <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold rv-scale d4">Let's Build Together</a>
            </div>

            <div className="rv-right d2">
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.22em', color:'rgba(255,255,255,.16)', marginBottom:'12px', textTransform:'uppercase' }}>
                POST /api/project/new → HTTP 200
              </div>
              <div className="code-outer">
                <div className="code-inner">
                  {[
                    ['1', <span key="a"><span className="ck">const</span> <span className="cf">project</span> = {'{'}</span>],
                    ['2', <span key="b">&nbsp;&nbsp;<span className="cs">"client"</span>: <span className="cv">"Your Name Here"</span>,</span>],
                    ['3', <span key="c">&nbsp;&nbsp;<span className="cs">"vision"</span>: <span className="cv">"Your Vision"</span>,</span>],
                    ['4', <span key="d">&nbsp;&nbsp;<span className="cs">"deliverable"</span>: <span className="cv">"world-class"</span>,</span>],
                    ['5', <span key="e">&nbsp;&nbsp;<span className="cs">"satisfaction"</span>: <span className="cv">true</span>,</span>],
                    ['6', <span key="f">&nbsp;&nbsp;<span className="cs">"excellence"</span>: <span className="cv">"guaranteed"</span></span>],
                    ['7', <span key="g">{'}'}</span>],
                  ].map(([ln, content]) => (
                    <div key={String(ln)} style={{ display:'flex', gap:'20px' }}>
                      <span style={{ color:'rgba(255,255,255,.15)', minWidth:'16px', textAlign:'right', userSelect:'none' }}>{ln}</span>
                      <span>{content}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop:'18px', display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {['Next.js','Flutter','Figma','TypeScript','Supabase','Vercel'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          SERVICES
      ════════════════════════════════════ */}
      <section style={{ background:'#080808', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div className="rv-line" style={{ height:'1px', background:'linear-gradient(90deg,#C9A84C,rgba(201,168,76,.08))', marginBottom:'clamp(48px,6vw,72px)', width:'100%' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'clamp(40px,5vw,64px)', flexWrap:'wrap', gap:'16px' }}>
            <h2 className="rv-wipe" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', margin:0 }}>What We Build</h2>
            <span className="rv-wipe d2" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.16)', letterSpacing:'.2em' }}>04 services</span>
          </div>

          {services.map((s, i) => (
            <div key={s.id} className="svc-row rv-flip" style={{ transitionDelay:(i*.09)+'s' }}
              onMouseEnter={() => setHovSvc(i)} onMouseLeave={() => setHovSvc(null)}>

              {/* number */}
              <div className="svc-num" data-n={s.id}>{s.id}</div>

              {/* content */}
              <div>
                <div className="svc-fn-el">{s.fn}</div>
                <div className="svc-title" style={{ color:hovSvc===i?'#C9A84C':'#F0EDE8' }}>{s.title}</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.82, color:'rgba(240,237,232,.32)', margin:0, transition:'color .3s' }}>{s.desc}</p>
              </div>

              {/* tech stack — stagger reveal on hover */}
              <div className="svc-tech" style={{ display:'flex', flexDirection:'column', gap:'8px', paddingTop:'6px', minWidth:'140px' }}>
                {s.tech.map(t => (
                  <span key={t} className="svc-tech-item">
                    <span style={{ color:'rgba(201,168,76,.5)', fontFamily:"'Space Mono',monospace" }}>→</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          PORTFOLIO
      ════════════════════════════════════ */}
      <section id="portfolio" style={{ background:'#060806', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'clamp(48px,6vw,72px)', flexWrap:'wrap', gap:'16px' }}>
            <h2 className="rv-wipe" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', margin:0 }}>Selected Work</h2>
            <span className="rv-wipe d2" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.16)', letterSpacing:'.2em' }}>03 projects</span>
          </div>

          <div className="port-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(14px,2vw,20px)' }}>
            {portfolio.map((p, i) => (
              <a key={p.id} href={p.url !== '#' ? p.url : undefined} target={p.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer" className="port-card rv-twist" style={{ transitionDelay:(i*.12)+'s' }}>

                {/* cursor spotlight */}
                <div className="card-spotlight" />

                {/* image */}
                <div className="port-img" style={{ aspectRatio:'16/10', position:'relative', overflow:'hidden', background:'#0C0C0C' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit:'cover', objectPosition:'top center' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(6,8,6,.78) 100%)' }} />
                  {/* live badge */}
                  <div style={{ position:'absolute', top:'14px', left:'14px', display:'flex', alignItems:'center', gap:'7px', background:'rgba(8,8,8,.88)', padding:'5px 10px', border:'1px solid rgba(255,255,255,.09)' }}>
                    <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:p.live?'#4CAF50':'rgba(201,168,76,.6)', flexShrink:0, boxShadow:p.live?'0 0 6px rgba(76,175,80,.7)':'none' }} />
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.2em', color:p.live?'rgba(76,175,80,.9)':'rgba(201,168,76,.65)' }}>{p.live?'LIVE':'PENDING'}</span>
                  </div>
                  <span style={{ position:'absolute', bottom:'14px', right:'14px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.25)', letterSpacing:'.15em' }}>{p.id}</span>
                </div>

                {/* body */}
                <div style={{ padding:'clamp(18px,2.5vw,28px)', flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:3 }}>
                  <div className="port-card-meta" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.2em', color:'rgba(201,168,76,.45)', textTransform:'uppercase', marginBottom:'10px' }}>
                    {p.label} · {p.name}
                  </div>
                  <h3 className="port-card-title" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(20px,2.2vw,26px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.15, margin:'0 0 12px' }}>{p.title}</h3>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', lineHeight:1.78, color:'rgba(240,237,232,.32)', margin:'0 0 18px', flex:1 }}>{p.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
                    {p.stack.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  {p.url !== '#' && (
                    <div className="port-arrow" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', letterSpacing:'.16em', color:'rgba(201,168,76,.5)' }}>
                      <span className="port-arrow-inner">{'→ visit ' + p.name}</span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section style={{ background:'#080808', padding:'clamp(96px,12vw,152px) clamp(24px,4.5vw,88px)', borderTop:'1px solid rgba(255,255,255,.04)', position:'relative', overflow:'hidden' }}>
        <div className="cta-glow" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'800px', height:'800px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,1) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:'820px', margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div className="rv-wipe" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(201,168,76,.38)', marginBottom:'clamp(24px,3vw,40px)' }}>
            {'// start.new_project()'}
          </div>

          {/* word-split CTA heading */}
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,6.5vw,80px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(20px,2.5vw,32px)', letterSpacing:'-.01em' }}>
            {['Your','vision','deserves'].map((w,i) => (
              <span key={w} className="word-wrap"><span className="rv-word" style={{ transitionDelay:(i*.08)+'s' }}>{w}{' '}</span></span>
            ))}
            <br />
            {['an'].map((w,i) => (
              <span key={w} className="word-wrap"><span className="rv-word" style={{ transitionDelay:'.28s' }}>{w}{' '}</span></span>
            ))}
            <span className="word-wrap"><span className="rv-word" style={{ transitionDelay:'.38s', color:'#C9A84C', fontStyle:'italic' }}>extraordinary</span></span>
            <br />
            <span className="word-wrap"><span className="rv-word" style={{ transitionDelay:'.50s' }}>digital presence.</span></span>
          </h2>

          <p className="rv-flip d2" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.82, color:'rgba(240,237,232,.3)', margin:'0 auto clamp(40px,5vw,64px)', maxWidth:'520px' }}>
            Whether you need a website, a mobile app, or a complete brand identity — TAI Digital builds something you will be proud to share.
          </p>
          <div className="rv-scale d3 cta-flex" style={{ display:'flex', justifyContent:'center', gap:'14px', flexWrap:'wrap' }}>
            <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold">Start a Project</a>
            <a href="mailto:theasaphinnovations@gmail.com" className="btn-ghost">theasaphinnovations@gmail.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
