'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Footer from '@/components/Footer'

const services = [
  {
    id: '01',
    label: 'web.design_development()',
    title: 'Web Design & Development',
    desc: 'Premium websites built on Next.js, React, and modern frameworks. From concept to Vercel deployment — animated, responsive, performant. Every pixel intentional.',
    tech: ['Next.js', 'React', 'TypeScript', 'Vercel', 'Tailwind'],
  },
  {
    id: '02',
    label: 'mobile.build_application()',
    title: 'Mobile Application',
    desc: 'Cross-platform Flutter apps with robust Supabase backends. Built for real users. Shipped to app stores. Scaled for growth.',
    tech: ['Flutter', 'Dart', 'Supabase', 'Riverpod', 'REST API'],
  },
  {
    id: '03',
    label: 'brand.create_identity()',
    title: 'Brand Identity',
    desc: 'Logos, visual systems, typography, colour palettes. The entire language that tells the world who you are — before you speak a word.',
    tech: ['Figma', 'Illustrator', 'Design Systems', 'Typography'],
  },
  {
    id: '04',
    label: 'ui.design_experience()',
    title: 'UI / UX Design',
    desc: 'Wireframes, prototypes, and design systems in Figma. Interfaces that feel inevitable — intuitive, beautiful, purposeful. No guesswork.',
    tech: ['Figma', 'Prototyping', 'User Research', 'Design Tokens'],
  },
]

const portfolio = [
  {
    id: '01',
    name: 'ttconline.org',
    title: 'The Transformation Camp',
    label: 'Ministry Website',
    stack: ['Next.js', 'TypeScript', 'Framer Motion'],
    desc: 'A multi-page website for a transformative Christian camp ministry. Light design, rich animations, real content. Built to represent a movement.',
    url: 'https://ttconline.org',
    img: '/images/solomon-green-blazer-tai.png',
    live: true,
  },
  {
    id: '02',
    name: 'PulpitFlow',
    title: 'Real-Time Preaching System',
    label: 'Mobile App',
    stack: ['Flutter', 'Riverpod', 'Supabase', 'API.Bible'],
    desc: 'Redefines how ministers prepare and deliver messages. Replaces printed notes, WhatsApp screenshots, and hand signals to projectionists — one seamless system.',
    url: '#',
    img: '/images/solomon-photo2.png',
    live: false,
  },
  {
    id: '03',
    name: 'solomonstephen.com',
    title: 'This Website',
    label: 'Personal Brand',
    stack: ['Next.js', 'TypeScript', 'React 19'],
    desc: 'A showcase of what TAI Digital builds. Animated, content-rich, world-class. The personal platform of Solomon Stephen — gospel minister, worship leader, author.',
    url: 'https://solomonstephen.com',
    img: '/images/solomon-green-suit-hero.png',
    live: true,
  },
]

const stackTicker = [
  'Next.js', 'React', 'TypeScript', 'Flutter', 'Dart', 'Supabase',
  'Figma', 'Vercel', 'Node.js', 'Tailwind CSS', 'Framer Motion',
  'Riverpod', 'REST API', 'PostgreSQL', 'Git', 'Design Systems',
]

export default function TaiDigitalPage() {
  const [entered, setEntered] = useState(false)
  const [hovSvc, setHovSvc] = useState<number | null>(null)
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60)
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.t-up,.t-left,.t-right,.t-pop,.t-line,.t-fade').forEach((el) => obs.observe(el))
    return () => { clearTimeout(t); obs.disconnect() }
  }, [])

  return (
    <main ref={mainRef} style={{ background:'#080808', overflowX:'hidden', color:'#F0EDE8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');

        .t-up { opacity:0; transform:translateY(40px) scale(0.97); filter:blur(5px);
          transition:opacity .9s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1),filter .8s; }
        .t-up.is-visible { opacity:1; transform:none; filter:blur(0); }

        .t-left { opacity:0; transform:translateX(-48px); filter:blur(5px);
          transition:opacity .9s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1),filter .8s; }
        .t-left.is-visible { opacity:1; transform:none; filter:blur(0); }

        .t-right { opacity:0; transform:translateX(48px); filter:blur(5px);
          transition:opacity .9s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1),filter .8s; }
        .t-right.is-visible { opacity:1; transform:none; filter:blur(0); }

        .t-line { transform-origin:left; transform:scaleX(0);
          transition:transform 1.1s cubic-bezier(.16,1,.3,1); }
        .t-line.is-visible { transform:scaleX(1); }

        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.26s}
        .d4{transition-delay:.36s} .d5{transition-delay:.48s}

        .ticker-track { display:flex; gap:0; width:max-content; animation:tick 32s linear infinite; }
        .ticker-track:hover { animation-play-state:paused; }
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }

        .svc-row {
          border-top:1px solid rgba(255,255,255,.06);
          padding:clamp(28px,3.5vw,48px) 0;
          display:grid;
          grid-template-columns:clamp(48px,5vw,72px) 1fr auto;
          align-items:start;
          gap:clamp(20px,3vw,48px);
          transition:background .4s;
          position:relative;
        }
        .svc-row:last-child { border-bottom:1px solid rgba(255,255,255,.06); }
        .svc-row:hover { background:rgba(201,168,76,.03); }
        .svc-row::before {
          content:''; position:absolute; left:0; top:0; bottom:0; width:2px;
          background:#C9A84C; transform:scaleY(0); transform-origin:top;
          transition:transform .5s cubic-bezier(.16,1,.3,1);
        }
        .svc-row:hover::before { transform:scaleY(1); }

        .port-card {
          background:#0E0E0E; border:1px solid rgba(255,255,255,.07); overflow:hidden;
          transition:border-color .4s, transform .5s cubic-bezier(.16,1,.3,1);
          display:flex; flex-direction:column; text-decoration:none; color:inherit;
        }
        .port-card:hover { border-color:rgba(201,168,76,.35); transform:translateY(-6px); }
        .port-card .ci img { transition:transform 1s cubic-bezier(.16,1,.3,1) !important; }
        .port-card:hover .ci img { transform:scale(1.06) !important; }

        .code-block {
          background:#0C0C0C; border:1px solid rgba(255,255,255,.08);
          font-family:'Space Mono','Courier New',monospace;
          font-size:clamp(11px,1vw,13px); line-height:1.9;
          padding:clamp(20px,2.5vw,32px);
        }
        .cl { display:flex; gap:20px; }
        .ln { color:rgba(255,255,255,.15); user-select:none; min-width:16px; text-align:right; }
        .kw  { color:#C9A84C; }
        .fn  { color:#79B8FF; }
        .str { color:#9ECBFF; }
        .cm  { color:rgba(255,255,255,.25); }
        .pun { color:rgba(255,255,255,.5); }
        .val { color:#85E89D; }

        .chip {
          font-family:'Space Mono',monospace; font-size:10px;
          padding:4px 10px; border:1px solid rgba(255,255,255,.1);
          color:rgba(255,255,255,.35); white-space:nowrap;
          transition:border-color .3s,color .3s;
        }
        .chip:hover { border-color:rgba(201,168,76,.4); color:rgba(201,168,76,.75); }

        .btn-gold {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:15px 36px;
          background:#C9A84C; color:#080808; border:none;
          text-decoration:none; display:inline-block;
          transition:background .3s,transform .3s;
        }
        .btn-gold:hover { background:#D9B85C; transform:translateY(-2px); }

        .btn-ghost {
          font-family:'DM Sans',sans-serif; font-size:11px; letter-spacing:.16em;
          text-transform:uppercase; padding:14px 36px;
          background:transparent; color:rgba(240,237,232,.5);
          border:1px solid rgba(255,255,255,.12);
          text-decoration:none; display:inline-block;
          transition:border-color .3s,color .3s,transform .3s;
        }
        .btn-ghost:hover { border-color:rgba(201,168,76,.5); color:#C9A84C; transform:translateY(-2px); }

        @media(max-width:860px){
          .svc-row { grid-template-columns:40px 1fr !important; }
          .svc-tech { display:none !important; }
          .port-grid { grid-template-columns:1fr !important; }
          .stats-grid { grid-template-columns:1fr 1fr !important; }
          .hero-grid { grid-template-columns:1fr !important; }
          .code-col { display:none !important; }
          .ab-grid { grid-template-columns:1fr !important; }
          .t-left,.t-right { transform:translateY(28px) !important; filter:blur(4px) !important; }
          .t-left.is-visible,.t-right.is-visible { transform:none !important; filter:blur(0) !important; }
        }
        @media(max-width:540px){
          .stats-grid { grid-template-columns:1fr !important; }
          .cta-btns { flex-direction:column !important; align-items:center !important; }
        }
      `}</style>

      {/* ══ HERO ══ */}
      <section style={{
        minHeight:'100vh', position:'relative', overflow:'hidden',
        display:'flex', alignItems:'center',
        background:'linear-gradient(150deg,#060A06 0%,#080808 55%,#06080E 100%)',
        padding:'clamp(120px,14vw,160px) clamp(24px,4.5vw,88px) clamp(72px,9vw,110px)',
      }}>
        {/* grid texture */}
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.022) 1px,transparent 1px)', backgroundSize:'64px 64px', pointerEvents:'none', zIndex:0 }} />
        {/* gold glow */}
        <div style={{ position:'absolute', top:'15%', right:'-8%', width:'560px', height:'560px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        <div style={{ maxWidth:'1320px', margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
          <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(48px,6vw,88px)', alignItems:'center' }}>

            {/* LEFT */}
            <div>
              {/* TAI logo + status */}
              <div style={{
                opacity: entered ? 1 : 0,
                transform: entered ? 'none' : 'translateY(16px)',
                filter: entered ? 'blur(0)' : 'blur(4px)',
                transition:'opacity .8s .1s,transform .8s .1s,filter .7s .1s',
                marginBottom:'clamp(28px,3.5vw,48px)',
                display:'flex', alignItems:'center', gap:'20px',
              }}>
                <Image src="/images/tai-logo.svg" alt="TAI Digital" width={48} height={48} style={{ height:'40px', width:'auto', filter:'brightness(10) sepia(1) saturate(3) hue-rotate(5deg)' }} />
                <div style={{ width:'1px', height:'28px', background:'rgba(255,255,255,.1)' }} />
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4CAF50', boxShadow:'0 0 8px rgba(76,175,80,.7)', flexShrink:0 }} />
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.28em', color:'rgba(255,255,255,.3)', textTransform:'uppercase' }}>Available for projects</span>
                </div>
              </div>

              {/* Headline */}
              <div style={{ overflow:'hidden', marginBottom:'4px' }}>
                <h1 style={{
                  fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,7.5vw,96px)',
                  fontWeight:400, lineHeight:.93, letterSpacing:'-0.02em', color:'#F0EDE8', margin:0,
                  opacity: entered ? 1 : 0,
                  transform: entered ? 'none' : 'translateY(105%)',
                  transition:'opacity .9s .26s,transform .95s .26s cubic-bezier(.16,1,.3,1)',
                }}>The Asaph</h1>
              </div>
              <div style={{ overflow:'hidden', marginBottom:'clamp(24px,3vw,40px)' }}>
                <h1 style={{
                  fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(52px,7.5vw,96px)',
                  fontWeight:400, lineHeight:.93, letterSpacing:'-0.02em', color:'#C9A84C', fontStyle:'italic', margin:0,
                  opacity: entered ? 1 : 0,
                  transform: entered ? 'none' : 'translateY(105%)',
                  transition:'opacity .9s .4s,transform .95s .4s cubic-bezier(.16,1,.3,1)',
                }}>Innovations.</h1>
              </div>

              <p style={{
                fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.4vw,17px)', lineHeight:1.8,
                color:'rgba(240,237,232,.4)', maxWidth:'480px', margin:'0 0 clamp(36px,4.5vw,56px)',
                opacity: entered ? 1 : 0,
                transform: entered ? 'none' : 'translateY(20px)',
                transition:'opacity .9s .56s,transform .9s .56s',
              }}>
                Premium web, mobile, and brand work — named after Asaph, the master musician and prophetic seer appointed by King David. Excellence is the only standard.
              </p>

              <div style={{
                display:'flex', gap:'12px', flexWrap:'wrap',
                opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)',
                transition:'opacity .9s .7s,transform .9s .7s',
              }}>
                <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold">Start a Project</a>
                <a href="#portfolio" className="btn-ghost">View Work</a>
              </div>
            </div>

            {/* RIGHT — code block */}
            <div className="code-col t-right d3">
              <div className="code-block">
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'20px', paddingBottom:'14px', borderBottom:'1px solid rgba(255,255,255,.06)' }}>
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'rgba(255,90,90,.6)' }} />
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'rgba(255,190,0,.5)' }} />
                  <div style={{ width:'10px', height:'10px', borderRadius:'50%', background:'rgba(76,175,80,.6)' }} />
                  <span style={{ marginLeft:'8px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.2)' }}>tai.config.ts</span>
                </div>
                <div className="cl"><span className="ln">1</span><span><span className="kw">const</span> <span className="fn">TAIDigital</span> <span className="pun">= {'{'}</span></span></div>
                <div className="cl"><span className="ln">2</span><span>&nbsp;&nbsp;<span className="str">name</span><span className="pun">:</span> <span className="val">'The Asaph Innovations'</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">3</span><span>&nbsp;&nbsp;<span className="str">location</span><span className="pun">:</span> <span className="val">'Lagos, Nigeria'</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">4</span><span>&nbsp;&nbsp;<span className="str">stack</span><span className="pun">: [</span></span></div>
                <div className="cl"><span className="ln">5</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="val">'Next.js'</span><span className="pun">, </span><span className="val">'Flutter'</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">6</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="val">'Figma'</span><span className="pun">, </span><span className="val">'Supabase'</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">7</span><span>&nbsp;&nbsp;<span className="pun">],</span></span></div>
                <div className="cl"><span className="ln">8</span><span>&nbsp;&nbsp;<span className="str">standard</span><span className="pun">:</span> <span className="val">'excellence'</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">9</span><span>&nbsp;&nbsp;<span className="str">satisfaction</span><span className="pun">:</span> <span className="val">1.0</span><span className="pun">, </span><span className="cm">// 100%</span></span></div>
                <div className="cl"><span className="ln">10</span><span><span className="pun">{'}'}</span></span></div>
                <div style={{ marginTop:'16px', paddingTop:'14px', borderTop:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#4CAF50', boxShadow:'0 0 6px rgba(76,175,80,.6)' }} />
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(76,175,80,.65)' }}>Build status: passing</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ TECH TICKER ══ */}
      <div style={{ borderTop:'1px solid rgba(255,255,255,.05)', borderBottom:'1px solid rgba(255,255,255,.05)', background:'#060806', padding:'14px 0', overflow:'hidden', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to right,#060806,transparent)', zIndex:2 }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:'80px', background:'linear-gradient(to left,#060806,transparent)', zIndex:2 }} />
        <div className="ticker-track">
          {[...stackTicker, ...stackTicker].map((s, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', letterSpacing:'.12em', color:'rgba(255,255,255,.22)', whiteSpace:'nowrap', padding:'0 clamp(20px,2.5vw,36px)' }}>{s}</span>
              <span style={{ color:'rgba(201,168,76,.3)', fontSize:'10px' }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ STATS ══ */}
      <section style={{ background:'#080808', padding:'clamp(64px,8vw,96px) clamp(24px,4.5vw,88px)', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div className="stats-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'rgba(255,255,255,.06)' }}>
            {[
              { val:'3+',   label:'Projects Shipped',    sub:'and counting' },
              { val:'100%', label:'Client Satisfaction', sub:'every single time' },
              { val:'4',    label:'Core Services',       sub:'web · mobile · brand · UX' },
              { val:'∞',    label:'Attention to Detail', sub:'non-negotiable' },
            ].map((s, i) => (
              <div key={i} className="t-up" style={{ transitionDelay:(i*.08)+'s', background:'#080808', padding:'clamp(28px,3.5vw,48px) clamp(20px,2.5vw,36px)' }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,5vw,64px)', fontWeight:400, color:'#C9A84C', lineHeight:1, marginBottom:'10px' }}>{s.val}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(240,237,232,.65)', marginBottom:'6px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.18)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section style={{ background:'#080808', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div className="ab-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(56px,7vw,104px)', alignItems:'center' }}>
            <div>
              <div className="t-line" style={{ height:'1px', background:'linear-gradient(90deg,#C9A84C,rgba(201,168,76,.1))', marginBottom:'clamp(24px,3vw,40px)', width:'100%' }} />
              <div className="t-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(201,168,76,.45)', marginBottom:'clamp(16px,2vw,24px)' }}>
                {'// about the agency'}
              </div>
              <h2 className="t-up d1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(30px,4.5vw,58px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.1, margin:'0 0 clamp(20px,2.5vw,32px)', letterSpacing:'-.01em' }}>
                We build digital<br />infrastructure that<br /><em style={{ color:'#C9A84C' }}>carries meaning.</em>
              </h2>
              <p className="t-up d2" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.35vw,16px)', lineHeight:1.88, color:'rgba(240,237,232,.38)', margin:'0 0 clamp(16px,2vw,24px)' }}>
                Named after Asaph — the master musician and prophetic seer appointed by King David — TAI Digital carries that DNA into the digital age: creativity, spiritual depth, and the conviction that what we make should carry weight and meaning.
              </p>
              <p className="t-up d3" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.35vw,16px)', lineHeight:1.88, color:'rgba(240,237,232,.38)', margin:'0 0 clamp(36px,4.5vw,52px)' }}>
                We build for ministries, entrepreneurs, and individuals who understand that their digital presence is not a checkbox — it is a first impression, a declaration, and a platform.
              </p>
              <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold t-up d4">Let's Build Together</a>
            </div>

            <div className="t-right d2">
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', letterSpacing:'.2em', color:'rgba(255,255,255,.18)', marginBottom:'12px', textTransform:'uppercase' }}>
                POST /api/project/new {'→'} 200 OK
              </div>
              <div className="code-block">
                <div className="cl"><span className="ln">1</span><span><span className="pun">{'{'}</span></span></div>
                <div className="cl"><span className="ln">2</span><span>&nbsp;&nbsp;<span className="str">"client"</span><span className="pun">:</span> <span className="val">"Your Name Here"</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">3</span><span>&nbsp;&nbsp;<span className="str">"project"</span><span className="pun">:</span> <span className="val">"Your Vision"</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">4</span><span>&nbsp;&nbsp;<span className="str">"deliverable"</span><span className="pun">:</span> <span className="val">"world-class"</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">5</span><span>&nbsp;&nbsp;<span className="str">"timeline"</span><span className="pun">:</span> <span className="val">"on schedule"</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">6</span><span>&nbsp;&nbsp;<span className="str">"satisfaction"</span><span className="pun">:</span> <span className="val">true</span><span className="pun">,</span></span></div>
                <div className="cl"><span className="ln">7</span><span>&nbsp;&nbsp;<span className="str">"excellence"</span><span className="pun">:</span> <span className="val">"guaranteed"</span></span></div>
                <div className="cl"><span className="ln">8</span><span><span className="pun">{'}'}</span></span></div>
              </div>
              <div style={{ marginTop:'20px', display:'flex', gap:'10px', flexWrap:'wrap' }}>
                {['Next.js','Flutter','Figma','TypeScript','Supabase','Vercel'].map(t => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section style={{ background:'#080808', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div className="t-line" style={{ height:'1px', background:'linear-gradient(90deg,#C9A84C,rgba(201,168,76,.1))', marginBottom:'clamp(48px,6vw,72px)', width:'100%' }} />
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'clamp(40px,5vw,64px)', flexWrap:'wrap', gap:'16px' }}>
            <h2 className="t-up" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', margin:0 }}>What We Build</h2>
            <span className="t-up d1" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.18)', letterSpacing:'.2em' }}>04 services</span>
          </div>

          {services.map((s, i) => (
            <div key={s.id} className="svc-row t-up" style={{ transitionDelay:(i*.07)+'s' }}
              onMouseEnter={() => setHovSvc(i)} onMouseLeave={() => setHovSvc(null)}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'11px', color:'rgba(201,168,76,.4)', paddingTop:'4px' }}>{s.id}</div>
              <div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.14em', color:'rgba(201,168,76,.35)', marginBottom:'8px' }}>{s.label}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(22px,3vw,38px)', fontWeight:400, lineHeight:1.1, marginBottom:'10px', color: hovSvc === i ? '#C9A84C' : '#F0EDE8', transition:'color .3s' }}>{s.title}</div>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.82, color:'rgba(240,237,232,.33)', margin:0 }}>{s.desc}</p>
              </div>
              <div className="svc-tech" style={{ display:'flex', flexDirection:'column', gap:'6px', paddingTop:'4px', minWidth:'140px' }}>
                {s.tech.map(t => (
                  <span key={t} style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.12em', color:'rgba(255,255,255,.22)', whiteSpace:'nowrap' }}>{'→'} {t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PORTFOLIO ══ */}
      <section id="portfolio" style={{ background:'#060806', padding:'clamp(80px,10vw,128px) clamp(24px,4.5vw,88px)', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth:'1320px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'clamp(48px,6vw,72px)', flexWrap:'wrap', gap:'16px' }}>
            <h2 className="t-up" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(32px,4.5vw,56px)', fontWeight:400, color:'#F0EDE8', margin:0 }}>Selected Work</h2>
            <span className="t-up d1" style={{ fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.18)', letterSpacing:'.2em' }}>03 projects</span>
          </div>

          <div className="port-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'clamp(14px,2vw,20px)' }}>
            {portfolio.map((p, i) => (
              <a key={p.id} href={p.url !== '#' ? p.url : undefined} target={p.url !== '#' ? '_blank' : undefined} rel="noopener noreferrer"
                className="port-card t-up" style={{ transitionDelay:(i*.1)+'s' }}>
                {/* image */}
                <div className="ci" style={{ aspectRatio:'16/10', position:'relative', overflow:'hidden', background:'#0C0C0C' }}>
                  <Image src={p.img} alt={p.title} fill style={{ objectFit:'cover', objectPosition:'top center' }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 40%,rgba(6,8,6,.75) 100%)' }} />
                  {/* status */}
                  <div style={{ position:'absolute', top:'14px', left:'14px', display:'flex', alignItems:'center', gap:'7px', background:'rgba(8,8,8,.85)', padding:'5px 10px', border:'1px solid rgba(255,255,255,.1)' }}>
                    <div style={{ width:'5px', height:'5px', borderRadius:'50%', background: p.live ? '#4CAF50' : 'rgba(201,168,76,.6)', flexShrink:0, boxShadow: p.live ? '0 0 6px rgba(76,175,80,.7)' : 'none' }} />
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.2em', color: p.live ? 'rgba(76,175,80,.9)' : 'rgba(201,168,76,.65)' }}>{p.live ? 'LIVE' : 'PENDING PLAY'}</span>
                  </div>
                  <div style={{ position:'absolute', bottom:'14px', right:'14px', fontFamily:"'Space Mono',monospace", fontSize:'10px', color:'rgba(255,255,255,.28)', letterSpacing:'.15em' }}>{p.id}</div>
                </div>
                {/* content */}
                <div style={{ padding:'clamp(18px,2.5vw,28px)', flex:1, display:'flex', flexDirection:'column' }}>
                  <div style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.2em', color:'rgba(201,168,76,.45)', textTransform:'uppercase', marginBottom:'10px' }}>{p.label} · {p.name}</div>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(20px,2.2vw,26px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.15, margin:'0 0 12px' }}>{p.title}</h3>
                  <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', lineHeight:1.78, color:'rgba(240,237,232,.33)', margin:'0 0 18px', flex:1 }}>{p.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                    {p.stack.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  {p.url !== '#' && (
                    <div style={{ marginTop:'18px', fontFamily:"'Space Mono',monospace", fontSize:'10px', letterSpacing:'.16em', color:'rgba(201,168,76,.55)' }}>
                      {'→ visit ' + p.name}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section style={{ background:'#080808', padding:'clamp(96px,12vw,152px) clamp(24px,4.5vw,88px)', borderTop:'1px solid rgba(255,255,255,.04)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'700px', height:'700px', borderRadius:'50%', background:'radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:'820px', margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <div className="t-up" style={{ fontFamily:"'Space Mono',monospace", fontSize:'9px', letterSpacing:'.42em', textTransform:'uppercase', color:'rgba(201,168,76,.4)', marginBottom:'clamp(24px,3vw,40px)' }}>
            {'// start.new_project()'}
          </div>
          <h2 className="t-up d1" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(40px,6.5vw,80px)', fontWeight:400, color:'#F0EDE8', lineHeight:1.05, margin:'0 0 clamp(20px,2.5vw,32px)', letterSpacing:'-.01em' }}>
            Your vision deserves<br />an <em style={{ color:'#C9A84C' }}>extraordinary</em><br />digital presence.
          </h2>
          <p className="t-up d2" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.82, color:'rgba(240,237,232,.32)', margin:'0 auto clamp(40px,5vw,64px)', maxWidth:'540px' }}>
            Whether you need a website, a mobile app, or a complete brand identity — TAI Digital builds something you will be proud to share.
          </p>
          <div className="t-up d3 cta-btns" style={{ display:'flex', justifyContent:'center', gap:'14px', flexWrap:'wrap' }}>
            <a href="mailto:theasaphinnovations@gmail.com" className="btn-gold">Start a Project</a>
            <a href="mailto:theasaphinnovations@gmail.com" className="btn-ghost">theasaphinnovations@gmail.com</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
