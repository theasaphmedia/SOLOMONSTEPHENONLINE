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

const ticker = ['Next.js','React','TypeScript','Flutter','Dart','Supabase','Figma','Vercel','Node.js','Tailwind CSS','Riverpod','REST API','PostgreSQL','Git','Design Systems','Framer Motion']

/* ── scramble ── */
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*<>[]{}/'
function scramble(el: HTMLElement, target: string, ms = 900) {
  let frame = 0; const total = Math.ceil(ms / 16)
  const run = () => {
    let out = ''
    for (let i = 0; i < target.length; i++) {
      const reveal = Math.floor((frame / total) * target.length)
      out += i < reveal ? target[i] : target[i] === ' ' ? ' ' : POOL[Math.floor(Math.random() * POOL.length)]
    }
    el.textContent = out; frame++
    if (frame <= total) requestAnimationFrame(run); else el.textContent = target
  }
  requestAnimationFrame(run)
}

/* ── counter ── */
function animCount(el: HTMLElement, to: number, suffix: string, ms: number) {
  const start = performance.now()
  const step = (now: number) => {
    const p = Math.min((now - start) / ms, 1)
    const ease = 1 - Math.pow(1 - p, 3)
    el.textContent = Math.round(to * ease) + suffix
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/* ── colorize ── */
function colorize(s: string): string {
  return s
    .replace(/\b(const|let|var)\b/g, '<span class="ck">$1</span>')
    .replace(/'([^']*)'/g, "<span class='cv'>'$1'</span>")
    .replace(/\/\/.*/g, '<span class="cc">$&</span>')
    .replace(/[{}[\],]/g, '<span style="color:rgba(255,255,255,.5)">$&</span>')
}

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
    const t0 = setTimeout(() => setEntered(true), 60)

    /* reveal observer */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('rv'); obs.unobserve(e.target) } })
    }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[class*="anim-"]').forEach(el => obs.observe(el))

    /* scramble headings */
    const t1 = setTimeout(() => { if (h1Ref.current) scramble(h1Ref.current, 'The Asaph', 1100) }, 380)
    const t2 = setTimeout(() => { if (h1bRef.current) scramble(h1bRef.current, 'Innovations.', 1000) }, 700)

    /* code typing */
    const t3 = setTimeout(() => {
      if (!codeRef.current) return
      const wrap = codeRef.current; wrap.innerHTML = ''
      let li = 0, ci = 0
      const addCursor = () => {
        wrap.querySelector('.csr')?.remove()
        const c = document.createElement('span'); c.className = 'csr'
        c.textContent = '|'; c.style.cssText = 'color:#C9A84C;animation:blink .7s step-end infinite;'
        wrap.appendChild(c)
      }
      const typeNext = () => {
        if (li >= CODE_LINES.length) { addCursor(); return }
        const line = CODE_LINES[li]
        if (ci === 0) {
          const row = document.createElement('div')
          row.style.cssText = 'display:flex;gap:20px;min-height:1.9em;'
          const ln = document.createElement('span')
          ln.style.cssText = 'color:rgba(255,255,255,.15);min-width:16px;text-align:right;user-select:none;'
          ln.textContent = String(li + 1)
          const txt = document.createElement('span'); txt.className = 'ct' + li
          row.appendChild(ln); row.appendChild(txt); wrap.appendChild(row); addCursor()
        }
        const txtEl = wrap.querySelector('.ct' + li) as HTMLElement
        if (txtEl) txtEl.innerHTML = colorize(line.slice(0, ci + 1))
        ci++
        if (ci >= line.length) { li++; ci = 0; setTimeout(typeNext, 80) }
        else setTimeout(typeNext, 28 + Math.random() * 18)
      }
      typeNext()
    }, 700)

    /* counters */
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return
        const el = e.target as HTMLElement; const v = el.dataset.count || ''
        if (v === '100%') animCount(el, 100, '%', 1200)
        else if (v === '4') animCount(el, 4, '', 800)
        else if (v === '3+') animCount(el, 3, '+', 900)
        cObs.unobserve(el)
      })
    }, { threshold: 0.5 })
    document.querySelectorAll('[data-count]').forEach(el => cObs.observe(el))

    /* 3D tilt on portfolio cards */
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.port-card'))
    const clean: Array<() => void> = []
    cards.forEach(card => {
      const spot = card.querySelector<HTMLElement>('.cspot')
      let raf = 0
      const onMove = (e: MouseEvent) => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2)
          const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2)
          card.style.transform = `perspective(1000px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg) translateZ(8px)`
          if (spot) {
            spot.style.opacity = '1'
            spot.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px,rgba(201,168,76,.12) 0%,rgba(91,55,187,.04) 45%,transparent 65%)`
          }
        })
      }
      const onIn  = () => { card.style.transition = 'transform .08s, border-color .3s, box-shadow .3s' }
      const onOut = () => {
        cancelAnimationFrame(raf)
        card.style.transition = 'transform .65s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s'
        card.style.transform = ''
        if (spot) spot.style.opacity = '0'
        setTimeout(() => { if (card) card.style.transition = '' }, 700)
      }
      card.addEventListener('mousemove', onMove as EventListener)
      card.addEventListener('mouseenter', onIn)
      card.addEventListener('mouseleave', onOut)
      clean.push(() => { card.removeEventListener('mousemove', onMove as EventListener); card.removeEventListener('mouseenter', onIn); card.removeEventListener('mouseleave', onOut) })
    })

    /* service fn scramble */
    const fnEls = Array.from(document.querySelectorAll<HTMLElement>('.sfn'))
    const fnClean: Array<() => void> = []
    fnEls.forEach(el => {
      const orig = el.textContent || ''; let active = false
      const row = el.closest<HTMLElement>('.svc-row')
      const onIn  = () => { if (!active) { active = true; scramble(el, orig, 520) } }
      const onOut = () => { active = false; setTimeout(() => { if (!active) el.textContent = orig }, 580) }
      row?.addEventListener('mouseenter', onIn); row?.addEventListener('mouseleave', onOut)
      fnClean.push(() => { row?.removeEventListener('mouseenter', onIn); row?.removeEventListener('mouseleave', onOut) })
    })

    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3)
      obs.disconnect(); cObs.disconnect()
      clean.forEach(f => f()); fnClean.forEach(f => f())
    }
  }, [])

  return (
    <main style={{ overflowX:'hidden', color:'#111240' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        /* ─── SPINNING LOGO ─── */
        .logo-spin { animation: heroSpin 22s linear infinite; transform-origin: center; }
        @keyframes heroSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        .logo-glow-ring {
          position:absolute; inset:-10%; border-radius:50%;
          border:1px solid rgba(91,55,187,.22);
          animation:ringBreath 5s ease-in-out infinite;
        }
        @keyframes ringBreath {
          0%,100%{border-color:rgba(91,55,187,.15);box-shadow:none}
          50%{border-color:rgba(91,55,187,.4);box-shadow:0 0 40px rgba(91,55,187,.14)}
        }

        .logo-orbit {
          position:absolute; inset:-10%; border-radius:50%;
          animation:orbitDot 7s linear infinite;
          pointer-events:none;
        }
        .logo-orbit::after {
          content:''; position:absolute; top:-5px; left:50%; transform:translateX(-50%);
          width:10px; height:10px; border-radius:50%;
          background:#C9A84C;
          box-shadow:0 0 14px rgba(201,168,76,.85), 0 0 28px rgba(201,168,76,.4);
        }
        @keyframes orbitDot { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        /* second ring — counter-rotate, dimmer */
        .logo-orbit2 {
          position:absolute; inset:-22%; border-radius:50%;
          border:1px dashed rgba(201,168,76,.1);
          animation:orbitDot 18s linear infinite reverse;
          pointer-events:none;
        }

        /* ─── TICKER ─── */
        .tick-wrap { display:flex; width:max-content; animation:tick 36s linear infinite; }
        .tick-wrap:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        /* ─── CODE BLOCK ─── */
        .c-outer {
          position:relative; padding:1px; border-radius:3px; overflow:hidden;
          background:linear-gradient(135deg,rgba(201,168,76,.35) 0%,rgba(201,168,76,.06) 50%,rgba(91,55,187,.28) 100%);
        }
        .c-outer::before {
          content:''; position:absolute; top:-100%; left:-100%; width:55%; height:300%;
          background:linear-gradient(90deg,transparent,rgba(201,168,76,.4),transparent);
          animation:bscan 3.5s ease-in-out infinite; pointer-events:none;
        }
        @keyframes bscan { 0%{transform:translateX(0) rotate(15deg)} 100%{transform:translateX(500%) rotate(15deg)} }
        .c-inner {
          background:#0A0A0A; padding:clamp(20px,2.5vw,30px);
          font-family:'Space Mono','Courier New',monospace;
          font-size:clamp(10.5px,.9vw,12.5px); line-height:1.9; min-height:200px;
        }
        .ck{color:#C9A84C} .cv{color:#85E89D} .cc{color:rgba(255,255,255,.25)}
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ─── REVEAL ANIMATIONS ─── */
        .anim-wipe  { clip-path:inset(0 100% 0 0); transition:clip-path 1.1s cubic-bezier(.16,1,.3,1); }
        .anim-wipe.rv { clip-path:inset(0 0% 0 0); }

        .anim-up    { opacity:0; transform:translateY(32px) blur(4px); filter:blur(4px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1),filter .7s; }
        .anim-up.rv { opacity:1; transform:none; filter:blur(0); }

        .anim-flip  { opacity:0; transform:perspective(700px) rotateX(50deg) translateY(-16px); transform-origin:top center; transition:opacity .7s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1); }
        .anim-flip.rv { opacity:1; transform:none; }

        .anim-twist { opacity:0; transform:scale(1.06) rotate(-2deg); filter:blur(3px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.34,1.4,.64,1),filter .7s; }
        .anim-twist.rv { opacity:1; transform:none; filter:blur(0); }

        .anim-left  { opacity:0; transform:translateX(-52px) rotateY(-8deg); filter:blur(5px); transform-origin:right; transition:opacity .9s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1),filter .8s; }
        .anim-left.rv { opacity:1; transform:none; filter:blur(0); }

        .anim-right { opacity:0; transform:translateX(52px) rotateY(8deg); filter:blur(5px); transform-origin:left; transition:opacity .9s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1),filter .8s; }
        .anim-right.rv { opacity:1; transform:none; filter:blur(0); }

        .anim-scale { opacity:0; transform:scale(.84); filter:blur(5px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.34,1.5,.64,1),filter .8s; }
        .anim-scale.rv { opacity:1; transform:none; filter:blur(0); }

        .anim-line  { transform:scaleX(0); transform-origin:left; transition:transform 1.2s cubic-bezier(.16,1,.3,1); }
        .anim-line.rv { transform:scaleX(1); }

        .anim-word  { display:inline-block; opacity:0; transform:translateY(110%) skewX(-4deg); transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1); }
        .anim-word.rv { opacity:1; transform:none; }
        .word-clip  { overflow:hidden; display:inline-block; margin-right:.26em; }

        /* delays */
        .d1{transition-delay:.08s} .d2{transition-delay:.17s} .d3{transition-delay:.27s}
        .d4{transition-delay:.38s} .d5{transition-delay:.50s} .d6{transition-delay:.64s}

        /* ─── GLITCH HEADLINE ─── */
        .gh-wrap { position:relative; display:inline-block; }
        .gh-wrap:hover .gh-clone { animation:g1 .32s steps(1) both, g2 .32s steps(1) both; }
        .gh-clone { position:absolute; top:0; left:0; width:100%; pointer-events:none; color:#C9A84C; opacity:0; }
        @keyframes g1 { 0%{opacity:.6;clip-path:inset(18% 0 62% 0);transform:translateX(-4px)} 33%{clip-path:inset(62% 0 8% 0);transform:translateX(4px)} 66%{clip-path:inset(40% 0 38% 0);transform:translateX(-2px)} 100%{opacity:0;transform:none} }
        @keyframes g2 { 0%{opacity:.4;clip-path:inset(52% 0 26% 0);transform:translateX(5px);color:#79B8FF} 50%{clip-path:inset(10% 0 70% 0);transform:translateX(-3px)} 100%{opacity:0} }

        /* ─── SERVICES (on cream) ─── */
        .svc-row {
          border-top:1px solid rgba(17,18,64,.08);
          padding:clamp(28px,3.5vw,48px) 0;
          display:grid; grid-template-columns:clamp(44px,5vw,68px) 1fr auto;
          align-items:start; gap:clamp(18px,3vw,44px);
          position:relative; overflow:hidden; cursor:default;
          transition:background .45s;
        }
        .svc-row:last-child { border-bottom:1px solid rgba(17,18,64,.08); }
        .svc-row::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:3px;
          background:linear-gradient(to bottom,#C9A84C,rgba(201,168,76,.15));
          transform:scaleY(0); transform-origin:top;
          transition:transform .55s cubic-bezier(.16,1,.3,1);
        }
        .svc-row:hover::before { transform:scaleY(1); }
        .svc-row::after {
          content:''; position:absolute; top:0; bottom:0; left:-65%; width:55%;
          background:linear-gradient(90deg,transparent,rgba(201,168,76,.06),transparent);
          transition:left .72s cubic-bezier(.16,1,.3,1); pointer-events:none;
        }
        .svc-row:hover { background:rgba(201,168,76,.04); }
        .svc-row:hover::after { left:120%; }

        .svc-num {
          font-family:'Space Mono',monospace; font-size:11px;
          color:rgba(201,168,76,.6); padding-top:5px; position:relative;
          transition:color .3s;
        }
        .svc-num::after { content:attr(data-n); position:absolute; top:0; left:0; color:#5B37BB; opacity:0; font-family:inherit; }
        .svc-row:hover .svc-num { color:#C9A84C; }
        .svc-row:hover .svc-num::after { animation:nglitch .42s steps(3) both; }
        @keyframes nglitch { 0%{opacity:.7;transform:translateX(3px)} 50%{transform:translateX(-2px);clip-path:inset(30% 0 40% 0)} 100%{opacity:0;transform:none} }

        .sfn {
          font-family:'Space Mono',monospace; font-size:9px; letter-spacing:.16em;
          color:rgba(17,18,64,.3); margin-bottom:10px; display:inline-block;
          transition:color .3s, letter-spacing .4s;
        }
        .svc-row:hover .sfn { color:rgba(201,168,76,.7); letter-spacing:.2em; }

        .svc-title {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(22px,3vw,36px); font-weight:400; line-height:1.1;
          margin-bottom:10px; color:#111240;
          transition:color .32s, transform .4s cubic-bezier(.16,1,.3,1);
        }
        .svc-row:hover .svc-title { color:#5B37BB; transform:translateX(6px); }

        .svc-ti {
          font-family:'Space Mono',monospace; font-size:9px; letter-spacing:.12em;
          color:rgba(17,18,64,.25); white-space:nowrap; display:flex; align-items:center; gap:6px;
          opacity:0; transform:translateX(16px);
          transition:opacity .35s cubic-bezier(.16,1,.3,1),transform .4s cubic-bezier(.16,1,.3,1),color .3s;
        }
        .svc-row:hover .svc-ti { opacity:1; transform:none; }
        .svc-row:hover .svc-ti:nth-child(1){transition-delay:.04s}
        .svc-row:hover .svc-ti:nth-child(2){transition-delay:.10s}
        .svc-row:hover .svc-ti:nth-child(3){transition-delay:.17s}
        .svc-row:hover .svc-ti:nth-child(4){transition-delay:.25s}
        .svc-row:hover .svc-ti:nth-child(5){transition-delay:.33s}
        .svc-ti:hover { color:rgba(91,55,187,.8); }

        /* ─── PORTFOLIO CARDS ─── */
        .port-card {
          background:#fff; border:1px solid rgba(17,18,64,.08);
          overflow:hidden; display:flex; flex-direction:column;
          text-decoration:none; color:inherit; position:relative;
          transform-style:preserve-3d; will-change:transform;
          transition:border-color .35s, box-shadow .35s;
        }
        .port-card:hover {
          border-color:rgba(201,168,76,.45);
          box-shadow:0 16px 52px rgba(17,18,64,.1), 0 4px 16px rgba(201,168,76,.08);
        }
        .cspot { position:absolute; inset:0; opacity:0; pointer-events:none; z-index:2; transition:opacity .25s; }
        .port-img img { transition:transform 1.1s cubic-bezier(.16,1,.3,1) !important; }
        .port-card:hover .port-img img { transform:scale(1.06) !important; }
        .port-arrow-inner { display:inline-block; transform:translateX(-110%); opacity:0; transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .4s; transition-delay:.08s; }
        .port-card:hover .port-arrow-inner { transform:none; opacity:1; }

        /* ─── TECH CHIP ─── */
        .chip {
          font-family:'Space Mono',monospace; font-size:9px;
          padding:4px 10px; border:1px solid rgba(17,18,64,.12);
          color:rgba(17,18,64,.35); white-space:nowrap;
          transition:border-color .3s,color .3s,background .3s;
        }
        .chip:hover { border-color:rgba(201,168,76,.5); color:rgba(91,55,187,.85); background:rgba(201,168,76,.04); }

        /* ─── CHIP (dark bg version) ─── */
        .chip-dark {
          font-family:'Space Mono',monospace; font-size:9px;
          padding:4px 10px; border:1px solid rgba(255,255,255,.12);
          color:rgba(255,255,255,.35); white-space:nowrap;
          transition:border-color .3s,color .3s;
        }
        .chip-dark:hover { border-color:rgba(201,168,76,.45); color:#C9A84C; }

        /* ─── BUTTONS ─── */
        .btn-gold {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:15px 36px;
          background:#C9A84C; color:#080808; text-decoration:none; display:inline-block;
          transition:background .3s,letter-spacing .4s,transform .3s;
        }
        .btn-gold:hover { background:#D9B85C; letter-spacing:.22em; transform:translateY(-2px); }

        .btn-ghost-dark {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:14px 36px;
          background:transparent; color:rgba(240,237,232,.5);
          border:1px solid rgba(255,255,255,.15); text-decoration:none; display:inline-block;
          transition:border-color .3s,color .3s,transform .3s;
        }
        .btn-ghost-dark:hover { border-color:rgba(201,168,76,.55); color:#C9A84C; transform:translateY(-2px); }

        .btn-ghost-light {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:14px 36px;
          background:transparent; color:rgba(17,18,64,.45);
          border:1px solid rgba(17,18,64,.15); text-decoration:none; display:inline-block;
          transition:border-color .3s,color .3s,transform .3s;
        }
        .btn-ghost-light:hover { border-color:rgba(91,55,187,.45); color:#5B37BB; transform:translateY(-2px); }

        /* ─── STATS CELLS (dark navy bg) ─── */
        .stat-cell {
          padding:clamp(32px,4vw,56px) clamp(20px,2.5vw,36px);
          position:relative; overflow:hidden; transition:background .4s;
        }
        .stat-cell:hover { background:rgba(255,255,255,.03); }
        .stat-cell::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,transparent,rgba(201,168,76,.5),transparent);
          transform:scaleX(0); transform-origin:center;
          transition:transform .5s cubic-bezier(.16,1,.3,1);
        }
        .stat-cell:hover::after { transform:scaleX(1); }

        /* ─── CTA GLOW ─── */
        @keyframes ctaPulse { 0%,100%{opacity:.05;transform:scale(1)} 50%{opacity:.12;transform:scale(1.14)} }
        .cta-glow { animation:ctaPulse 4s ease-in-out infinite; }

        /* ─── RESPONSIVE ─── */
        @media(max-width:960px) {
          .hero-grid { flex-direction:column !important; text-align:center !important; align-items:center !important; }
          .hero-logo  { width:clamp(160px,45vw,260px) !important; }
          .code-col   { display:none !important; }
          .ab-grid    { grid-template-columns:1fr !important; }
          .svc-row    { grid-template-columns:44px 1fr !important; }
          .svc-tech   { display:none !important; }
          .port-grid  { grid-template-columns:1fr !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
        }
        @media(max-width:520px) {
          .stats-grid { grid-template-columns:1fr !important; }
          .cta-btns   { flex-direction:column !important; align-items:center !important; }
          .hero-grid  { gap:32px !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════
          HERO — deep purple gradient, logo left, name right
      ═══════════════════════════════════════════ */}
      <section style={{ minHeight:'100vh', position:'relative', overflow:'hidden', display:'flex', alignItems:'center', background:'linear-gradient(150deg, #05021A 0%, #0C062E 30%, #130A40 58%, #0A1030 85%, #06031A 100%)', padding:'clamp(100px,12vw,140px) clamp(24px,5vw,96px) clamp(72px,9vw,110px)' }}>

        {/* grid texture */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.016) 1px,transparent 1px)', backgroundSize:'72px 72px', pointerEvents:'none', zIndex:0 }} />

        {/* ambient glows */}
        <div style={{ position:'absolute', top:'30%', left:'20%', width:'480px', height:'480px', borderRadius:'50%', background:'radial-gradient(circle,rgba(91,55,187,.14) 0%,transparent 68%)', pointerEvents:'none', zIndex:0 }} />
        <div style={{ position:'absolute', bottom:'20%', right:'15%', width:'360px', height:'360px', borderRadius:'50%', background:'radial-gradient(circle,rgba(65,157,230,.08) 0%,transparent 65%)', pointerEvents:'none', zIndex:0 }} />

        <div style={{ maxWidth:'1360px', margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
          <div className="hero-grid" style={{ display:'flex', alignItems:'center', gap:'clamp(56px,8vw,120px)' }}>

            {/* ── LEFT: Spinning Logo ── */}
            <div className="hero-logo" style={{ flexShrink:0, position:'relative', width:'clamp(200px,26vw,360px)', opacity:entered?1:0, transform:entered?'none':'scale(.88)', transition:'opacity 1.1s .1s, transform 1.1s .1s cubic-bezier(.16,1,.3,1)' }}>
              {/* outer dashed ring */}
              <div className="logo-orbit2" />
              {/* pulsing glow ring */}
              <div className="logo-glow-ring" />
              {/* orbiting gold dot */}
              <div className="logo-orbit" />
              {/* spinning logo itself */}
              <div className="logo-spin">
                <Image src="/images/tai-logo.svg" alt="TAI Digital" fill={false} width={360} height={421} style={{ width:'100%', height:'auto', display:'block' }} priority />
              </div>
            </div>

            {/* ── RIGHT: Text ── */}
            <div style={{ flex:1, minWidth:0 }}>
              {/* status */}
              <div style={{ opacity:entered?1:0, transform:entered?'none':'translateY(14px)', transition:'opacity .8s .3s, transform .8s .3s', marginBottom:'clamp(24px,3vw,40px)', display:'flex', alignItems:'center', gap:'13px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#4CAF50', boxShadow:'0 0 10px rgba(76,175,80,.8)', flexShrink:0 }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.32em', color:'rgba(255,255,255,.28)', textTransform:'uppercase' }}>TAI Digital · Available for projects</span>
              </div>

              {/* headline line 1 */}
              <div style={{ overflow:'hidden', marginBottom:'4px' }}>
                <div className="gh-wrap" style={{ opacity:entered?1:0, transform:entered?'none':'translateY(110%) rotateX(18deg)', transition:'opacity .9s .44s, transform .95s .44s cubic-bezier(.16,1,.3,1)', display:'inline-block', lineHeight:.92 }}>
                  <h1 ref={h1Ref} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(54px,8vw,104px)', fontWeight:400, letterSpacing:'-.02em', color:'#F0EDE8', margin:0, lineHeight:.92 }}>The Asaph</h1>
                  <span className="gh-clone" aria-hidden="true" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(54px,8vw,104px)', fontWeight:400, lineHeight:.92 }}>The Asaph</span>
                </div>
              </div>

              {/* headline line 2 */}
              <div style={{ overflow:'hidden', marginBottom:'clamp(28px,3.5vw,48px)' }}>
                <div className="gh-wrap" style={{ opacity:entered?1:0, transform:entered?'none':'translateY(110%) rotateX(18deg)', transition:'opacity .9s .6s, transform .95s .6s cubic-bezier(.16,1,.3,1)', display:'inline-block' }}>
                  <h1 ref={h1bRef} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(54px,8vw,104px)', fontWeight:400, letterSpacing:'-.02em', color:'#C9A84C', fontStyle:'italic', margin:0, lineHeight:.92 }}>Innovations.</h1>
                  <span className="gh-clone" aria-hidden="true" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(54px,8vw,104px)', fontWeight:400, fontStyle:'italic', lineHeight:.92 }}>Innovations.</span>
                </div>
              </div>

              {/* divider */}
              <div style={{ opacity:entered?1:0, transition:'opacity .8s .75s', marginBottom:'clamp(20px,2.5vw,32px)', display:'flex', alignItems:'center', gap:'16px' }}>
                <div style={{ height:'1px', width:'clamp(40px,5vw,72px)', background:'linear-gradient(90deg,#C9A84C,rgba(201,168,76,.2))' }} />
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.28em', color:'rgba(255,255,255,.22)', textTransform:'uppercase' }}>The Asaph Innovations</span>
              </div>

              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.82, color:'rgba(240,237,232,.38)', maxWidth:'520px', margin:'0 0 clamp(36px,4.5vw,52px)', opacity:entered?1:0, transform:entered?'none':'translateY(18px)', transition:'opacity .9s .8s, transform .9s .8s' }}>
                Premium web, mobile, and brand work — named after Asaph, the master musician and prophetic seer appointed by King David. Excellence is the only standard.
              </p>

              <div style={{ display:'flex', gap:'12px', flexWrap:'wrap', opacity:entered?1:0, transform:entered?'none':'translateY(14px)', transition:'opacity .9s .95s, transform .9s .95s' }}>
                <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold">Start a Project</a>
                <a href="#portfolio" className="btn-ghost-dark">View Work</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TICKER — dark strip
      ═══════════════════════════════════════════ */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.06)', borderBottom:'1px solid rgba(255,255,255,.06)', background:'#06031A', padding:'13px 0', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right,#06031A,transparent)', zIndex:2 }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left,#06031A,transparent)', zIndex:2 }} />
        <div className="tick-wrap">
          {[...ticker,...ticker].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', letterSpacing:'.12em', color:'rgba(255,255,255,.18)', whiteSpace:'nowrap', padding:'0 clamp(18px,2.5vw,32px)' }}>{s}</span>
              <span style={{ color:'rgba(201,168,76,.3)' }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          STATS — deep navy, gold numbers
      ═══════════════════════════════════════════ */}
      <section style={{ background:'#111240', padding:'clamp(56px,7vw,88px) clamp(24px,5vw,96px)' }}>
        <div style={{ maxWidth:'1360px', margin:'0 auto' }}>
          <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,.06)' }}>
            {[
              { val:'3+', raw:'3+', label:'Projects Shipped',    sub:'and counting' },
              { val:'100%', raw:'100%', label:'Client Satisfaction', sub:'every single time' },
              { val:'4', raw:'4', label:'Core Services',       sub:'web · mobile · brand · UX' },
              { val:'∞', raw:undefined, label:'Attention to Detail', sub:'non-negotiable' },
            ].map((s, i) => (
              <div key={i} className={`stat-cell anim-flip d${i+1}`} style={{ background:'#111240' }}>
                <div data-count={s.raw} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(44px,5.5vw,72px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'12px' }}>{s.val}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(240,237,232,.55)', marginBottom:'6px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.16)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT — warm cream
      ═══════════════════════════════════════════ */}
      <section style={{ background:'#F7F4F0', padding:'clamp(80px,10vw,128px) clamp(24px,5vw,96px)', borderBottom:'1px solid rgba(17,18,64,.06)' }}>
        <div style={{ maxWidth:'1360px', margin:'0 auto' }}>
          <div className="ab-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(56px,7vw,104px)', alignItems:'start' }}>

            {/* left text */}
            <div>
              <div className="anim-line" style={{ height:'2px', background:'linear-gradient(90deg,#C9A84C,rgba(201,168,76,.1))', marginBottom:'clamp(24px,3vw,40px)', width:'100%' }} />
              <div className="anim-wipe" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(91,55,187,.5)', marginBottom:'clamp(16px,2vw,24px)' }}>
                {'// about.the_agency'}
              </div>

              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(30px,4.5vw,58px)', fontWeight:400, color:'#111240', lineHeight:1.1, margin:'0 0 clamp(20px,2.5vw,32px)', letterSpacing:'-.01em' }}>
                {['We','build','digital','infrastructure','that'].map((w, i) => (
                  <span key={i} className="word-clip"><span className="anim-word" style={{ transitionDelay:(i*.07)+'s' }}>{w}{' '}</span></span>
                ))}
                <span className="word-clip"><span className="anim-word" style={{ transitionDelay:'.4s', color:'#5B37BB', fontStyle:'italic' }}>carries meaning.</span></span>
              </h2>

              <p className="anim-up d2" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.35vw,16px)', lineHeight:1.9, color:'rgba(17,18,64,.5)', margin:'0 0 clamp(16px,2vw,24px)' }}>
                Named after Asaph — the master musician and prophetic seer appointed by King David — TAI Digital carries that DNA into the digital age: creativity, spiritual depth, and the conviction that what we make should carry weight and meaning.
              </p>
              <p className="anim-up d3" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.35vw,16px)', lineHeight:1.9, color:'rgba(17,18,64,.5)', margin:'0 0 clamp(36px,4.5vw,52px)' }}>
                We build for ministries, entrepreneurs, and individuals who understand that their digital presence is not a checkbox — it is a first impression, a declaration, and a platform.
              </p>
              <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold anim-scale d4">Let's Build Together</a>
            </div>

            {/* right code block */}
            <div className="code-col anim-right d2">
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.22em', color:'rgba(17,18,64,.28)', marginBottom:'12px', textTransform:'uppercase' }}>
                POST /api/project/new → HTTP 200
              </div>
              <div className="c-outer">
                <div className="c-inner" ref={codeRef} />
              </div>
              <div style={{ marginTop:'20px', display:'flex', gap:'8px', flexWrap:'wrap' }}>
                {['Next.js','Flutter','Figma','TypeScript','Supabase','Vercel'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICES — pure white, dark navy text
      ═══════════════════════════════════════════ */}
      <section style={{ background:'#FFFFFF', padding:'clamp(80px,10vw,128px) clamp(24px,5vw,96px)' }}>
        <div style={{ maxWidth:'1360px', margin:'0 auto' }}>
          <div className="anim-line" style={{ height:'2px', background:'linear-gradient(90deg,#5B37BB,rgba(91,55,187,.08))', marginBottom:'clamp(44px,6vw,72px)', width:'100%' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'clamp(36px,5vw,60px)', flexWrap:'wrap', gap:'16px' }}>
            <h2 className="anim-wipe" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#111240', margin:0 }}>What We Build</h2>
            <span className="anim-wipe d2" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(17,18,64,.24)', letterSpacing:'.2em' }}>04 services</span>
          </div>

          {services.map((s, i) => (
            <div key={s.id} className={`svc-row anim-flip`} style={{ transitionDelay:(i*.09)+'s' }}
              onMouseEnter={() => setHovSvc(i)} onMouseLeave={() => setHovSvc(null)}>
              <div className="svc-num" data-n={s.id}>{s.id}</div>
              <div>
                <div className="sfn">{s.fn}</div>
                <div className="svc-title" style={{ color:hovSvc===i?'#5B37BB':'#111240' }}>{s.title}</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.84, color:'rgba(17,18,64,.42)', margin:0 }}>{s.desc}</p>
              </div>
              <div className="svc-tech" style={{ display:'flex', flexDirection:'column', gap:'8px', paddingTop:'6px', minWidth:'140px' }}>
                {s.tech.map(t => (
                  <span key={t} className="svc-ti">
                    <span style={{ color:'rgba(201,168,76,.7)', fontFamily:"'Space Mono',monospace" }}>→</span>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PORTFOLIO — warm cream
      ═══════════════════════════════════════════ */}
      <section id="portfolio" style={{ background:'#F0EDE7', padding:'clamp(80px,10vw,128px) clamp(24px,5vw,96px)', borderTop:'1px solid rgba(17,18,64,.06)' }}>
        <div style={{ maxWidth:'1360px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'clamp(44px,6vw,68px)', flexWrap:'wrap', gap:'16px' }}>
            <h2 className="anim-wipe" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#111240', margin:0 }}>Selected Work</h2>
            <span className="anim-wipe d2" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(17,18,64,.24)', letterSpacing:'.2em' }}>03 projects</span>
          </div>

          <div className="port-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(14px,2vw,20px)' }}>
            {portfolio.map((p, i) => (
              <a key={p.id} href={p.url !== '#' ? p.url : undefined} target={p.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer" className={`port-card anim-twist`} style={{ transitionDelay:(i*.12)+'s' }}>

                <div className="cspot" />

                <div className="port-img" style={{ aspectRatio:'16/10', position:'relative', overflow:'hidden', background:'#E8E4DE' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit:'cover', objectPosition:'top center' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 45%,rgba(17,18,64,.65) 100%)' }} />
                  <div style={{ position:'absolute', top:'14px', left:'14px', display:'flex', alignItems:'center', gap:'7px', background:'rgba(17,18,64,.85)', padding:'5px 10px' }}>
                    <div style={{ width:'5px', height:'5px', borderRadius:'50%', background:p.live?'#4CAF50':'rgba(201,168,76,.7)', flexShrink:0, boxShadow:p.live?'0 0 6px rgba(76,175,80,.7)':'none' }} />
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.2em', color:p.live?'rgba(76,175,80,.9)':'rgba(201,168,76,.7)' }}>{p.live?'LIVE':'PENDING'}</span>
                  </div>
                  <span style={{ position:'absolute', bottom:'14px', right:'14px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.3)', letterSpacing:'.15em' }}>{p.id}</span>
                </div>

                <div style={{ padding:'clamp(18px,2.5vw,28px)', flex:1, display:'flex', flexDirection:'column', position:'relative', zIndex:3 }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.2em', color:'rgba(91,55,187,.55)', textTransform:'uppercase', marginBottom:'10px', transition:'color .3s' }}>
                    {p.label} · {p.name}
                  </div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(20px,2.2vw,26px)', fontWeight:400, color:'#111240', lineHeight:1.15, margin:'0 0 12px', transition:'color .35s' }}>{p.title}</h3>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', lineHeight:1.78, color:'rgba(17,18,64,.42)', margin:'0 0 18px', flex:1 }}>{p.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px', marginBottom:'16px' }}>
                    {p.stack.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  {p.url !== '#' && (
                    <div style={{ overflow:'hidden' }}>
                      <span className="port-arrow-inner" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', letterSpacing:'.16em', color:'rgba(91,55,187,.6)', display:'inline-block' }}>
                        {'→ visit ' + p.name}
                      </span>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — deep purple, echoing the hero
      ═══════════════════════════════════════════ */}
      <section style={{ background:'linear-gradient(150deg,#06031A 0%,#0C062E 40%,#130A40 70%,#06031A 100%)', padding:'clamp(96px,12vw,152px) clamp(24px,5vw,96px)', position:'relative', overflow:'hidden' }}>

        {/* TAI logo watermark — large, breathing */}
        <div style={{ position:'absolute', right:'-6%', top:'50%', width:'clamp(260px,36vw,480px)', pointerEvents:'none', zIndex:0, animation:'logoWmFloat 13s ease-in-out infinite, logoWmGlow 7s ease-in-out infinite' }}>
          <Image src="/images/tai-logo.svg" alt="" fill={false} width={480} height={562} style={{ width:'100%', height:'auto' }} />
        </div>
        <style>{`
          @keyframes logoWmFloat {
            0%,100%{transform:translateY(-50%) rotate(0deg) scale(1)}
            32%{transform:translateY(calc(-50% - 18px)) rotate(3deg) scale(1.03)}
            66%{transform:translateY(calc(-50% + 12px)) rotate(-1.5deg) scale(0.97)}
          }
          @keyframes logoWmGlow {
            0%,100%{opacity:.1;filter:none}
            50%{opacity:.18;filter:drop-shadow(0 0 44px rgba(91,55,187,.2))}
          }
        `}</style>

        {/* glow orb */}
        <div className="cta-glow" style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,.8) 0%,transparent 70%)', pointerEvents:'none' }} />

        <div style={{ maxWidth:'880px', margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div className="anim-wipe" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(201,168,76,.38)', marginBottom:'clamp(24px,3vw,40px)' }}>
            {'// start.new_project()'}
          </div>

          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,6.5vw,84px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.04, margin:'0 0 clamp(20px,2.5vw,32px)', letterSpacing:'-.01em' }}>
            {['Your','vision','deserves'].map((w,i) => (
              <span key={w} className="word-clip"><span className="anim-word" style={{ transitionDelay:(i*.08)+'s' }}>{w}{' '}</span></span>
            ))}
            <br />
            <span className="word-clip"><span className="anim-word" style={{ transitionDelay:'.28s' }}>an{' '}</span></span>
            <span className="word-clip"><span className="anim-word" style={{ transitionDelay:'.38s', color:'#C9A84C', fontStyle:'italic' }}>extraordinary</span></span>
            <br />
            <span className="word-clip"><span className="anim-word" style={{ transitionDelay:'.50s' }}>digital presence.</span></span>
          </h2>

          <p className="anim-up d2" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.82, color:'rgba(240,237,232,.3)', margin:'0 auto clamp(40px,5vw,64px)', maxWidth:'520px' }}>
            Whether you need a website, a mobile app, or a complete brand identity — TAI Digital builds something you will be proud to share.
          </p>

          <div className="anim-scale d3 cta-btns" style={{ display:'flex', justifyContent:'center', gap:'14px', flexWrap:'wrap' }}>
            <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold">Start a Project</a>
            <a href="mailto:theasaphinnovations@gmail.com" className="btn-ghost-dark">theasaphinnovations@gmail.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
