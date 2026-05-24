'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

// ─── Marquee data ────────────────────────────────────────────────────────────
const MARQUEE = ['Gospel Minister','·','Worship Leader','·','Music Producer','·','Author','·','Studio Founder','·','Digital Innovator','·','Prophet of Sound','·']

// ─── Callings ────────────────────────────────────────────────────────────────
const callings = [
  { num:'01', tag:'The Worship Nation', title:'Ministry',   desc:'Prophetic gatherings that shift atmospheres — the Mid Day Worship Experience, The Slaughter House, Synantesis, and more.', href:'/events',      cta:'Explore Events'    },
  { num:'02', tag:'TWN Studios',        title:'Studio',     desc:'World-class recording, mixing, mastering, and production in Ajah, Lagos — consecrated for artists and ministers.',           href:'/studios',     cta:'Book a Session'    },
  { num:'03', tag:'Published Works',    title:'Author',     desc:'Books rooted in biblical Hebrew and Greek study — transforming believers from the inside out into sons, not slaves.',         href:'/books',       cta:'Get the Books'     },
  { num:'04', tag:'TAI Digital',        title:'Digital',    desc:'Premium websites, brand identities, and digital strategy for businesses and ministries that refuse to be ordinary.',          href:'/tai-digital', cta:'See the Work'      },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = [
  { val:'10+', label:'Years in Ministry' },
  { val:'4',   label:'Published Books'   },
  { val:'6+',  label:'Studio Services'   },
  { val:'60',  label:'Venue Capacity'    },
]

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [, setCounts] = useState(stats.map(() => false))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W=0, H=0, animId:number
    const pts: {x:number;y:number;vx:number;vy:number;r:number;op:number;angle:number;speed:number}[] = []
    const resize = () => {
      W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; pts.length=0
      for(let i=0;i<20;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.2+.3,op:Math.random()*.12+.03,angle:Math.random()*Math.PI*2,speed:Math.random()*.004+.001})
    }
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.angle+=p.speed; p.x+=p.vx+Math.sin(p.angle)*.1; p.y+=p.vy
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(201,168,76,${p.op+Math.sin(p.angle*2)*.03})`; ctx.fill()
      })
      animId=requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize',resize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize',resize) }
  },[])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('hp-in')),
      { threshold:0.08, rootMargin:'0px 0px -40px 0px' }
    )
    document.querySelectorAll('.hp-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  },[])

  return (
    <main style={{background:'#060e06', overflowX:'hidden'}}>
      <style>{`
        /* ── Consistent page container ── */
        .page-w {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 56px);
        }

        /* ── Reveal animations ── */
        @keyframes hpFadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        .hp-reveal { opacity:0; transform:translateY(32px); transition:opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .hp-reveal.hp-in { opacity:1; transform:translateY(0); }
        .hp-d1 { transition-delay:0.1s; }
        .hp-d2 { transition-delay:0.2s; }
        .hp-d3 { transition-delay:0.3s; }
        .hp-d4 { transition-delay:0.4s; }

        /* ── Word reveal ── */
        @keyframes wordUp { from{opacity:0;transform:translateY(100%);} to{opacity:1;transform:translateY(0);} }
        .word-clip { overflow:hidden; display:block; }
        .word-inner { display:inline-block; animation:wordUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; opacity:0; }

        /* ── Ken Burns ── */
        @keyframes kenB { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.08) translate(-1%,0.5%)} }
        .ken-b { animation:kenB 20s ease-in-out infinite alternate; will-change:transform; }

        /* ── Marquee ── */
        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .mq-track { animation:mq 28s linear infinite; display:flex; width:max-content; }

        /* ── Scroll cue ── */
        @keyframes scrollDrop { 0%{height:0;opacity:1} 60%{height:32px;opacity:1} 100%{height:32px;opacity:0} }
        .scroll-cue-line { display:block; width:1px; background:#C9A84C; animation:scrollDrop 2.2s ease infinite; }

        /* ── Calling card ── */
        .calling-card {
          padding:44px 36px; border:1px solid rgba(201,168,76,0.08);
          position:relative; overflow:hidden; cursor:pointer;
          transition:border-color 0.4s, background 0.4s, transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s;
          text-decoration:none; display:block;
        }
        .calling-card::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#C9A84C,transparent);
          transform:scaleX(0); transform-origin:left;
          transition:transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .calling-card:hover::before { transform:scaleX(1); }
        .calling-card:hover {
          border-color:rgba(201,168,76,0.28);
          background:rgba(26,46,26,0.3);
          transform:translateY(-6px);
          box-shadow:0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.12);
        }
        .calling-grid {
          display:grid; grid-template-columns:1fr; gap:2px;
        }
        @media(min-width:640px) { .calling-grid { grid-template-columns:1fr 1fr; } }
        @media(min-width:1024px) { .calling-grid { grid-template-columns:repeat(4,1fr); } }

        /* ── Hero layout ── */
        .hero-layout {
          display:grid; grid-template-columns:1fr;
          min-height:100svh; position:relative; overflow:hidden;
        }
        @media(min-width:768px) {
          .hero-layout { grid-template-columns:1fr 1fr; }
        }
        .hero-left {
          background:#1A2E1A;
          display:flex; flex-direction:column; justify-content:flex-end;
          padding: clamp(100px,14vw,160px) clamp(24px,4vw,56px) clamp(60px,8vw,100px);
          position:relative; z-index:2; order:2;
        }
        @media(min-width:768px) { .hero-left { order:0; justify-content:center; } }
        .hero-right {
          position:relative; min-height:55vw; order:1;
        }
        @media(min-width:768px) {
          .hero-right { min-height:unset; order:0; }
        }

        /* ── Music grid ── */
        .music-flip-grid {
          display:grid; grid-template-columns:1fr; gap:48px;
        }
        @media(min-width:768px) { .music-flip-grid { grid-template-columns:1fr 1fr; gap:80px; align-items:center; } }

        /* ── Stats bar ── */
        .stats-bar {
          display:grid; grid-template-columns:repeat(2,1fr);
          border-top:1px solid rgba(201,168,76,0.1);
          border-bottom:1px solid rgba(201,168,76,0.1);
        }
        @media(min-width:640px) { .stats-bar { grid-template-columns:repeat(4,1fr); } }
        .stat-cell {
          padding:32px 20px; text-align:center;
          border-right:1px solid rgba(201,168,76,0.08);
        }
        .stat-cell:last-child { border-right:none; }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          HERO — Split screen
      ══════════════════════════════════════════════════════ */}
      <section className="hero-layout">

        {/* LEFT — Forest Green, headline */}
        <div className="hero-left">
          <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0,opacity:0.4,pointerEvents:'none'}} />
          <div style={{position:'absolute',inset:0,zIndex:1,opacity:0.03,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px 180px',pointerEvents:'none'}} />
          <div style={{position:'relative',zIndex:3}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:28}}>
              <div style={{width:28,height:1,background:'rgba(201,168,76,0.5)'}} />
              <span style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(201,168,76,0.65)'}}>Gospel Minister · Lagos, Nigeria</span>
            </div>
            <h1 style={{fontFamily:'Cormorant Garamond,serif',fontWeight:300,lineHeight:0.9,letterSpacing:'-2px',marginBottom:8}}>
              <div className="word-clip" style={{animationFillMode:'both'}}>
                <span style={{display:'block',fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(52px,7vw,110px)',color:'#F5F0E8',fontWeight:300,letterSpacing:'-3px',lineHeight:0.9}} className="word-inner">Solomon</span>
              </div>
              <div className="word-clip" style={{animationFillMode:'both'}}>
                <span style={{display:'block',fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(52px,7vw,110px)',fontWeight:700,fontStyle:'italic',letterSpacing:'-3px',lineHeight:0.95,background:'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Stephen.</span>
              </div>
            </h1>
            <div style={{display:'flex',flexWrap:'wrap',gap:'8px 14px',marginTop:28,marginBottom:36}}>
              {['Worship Leader','Music Producer','Author','Studio Founder'].map((r,i,a) => (
                <span key={r} style={{display:'flex',alignItems:'center',gap:14}}>
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'10px',letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(245,240,232,0.4)'}}>{r}</span>
                  {i < a.length-1 && <span style={{color:'rgba(201,168,76,0.25)',fontSize:12}}>·</span>}
                </span>
              ))}
            </div>
            <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center',marginBottom:48}}>
              <Link href="/music" className="btn-gold-pill" style={{fontSize:'11px'}}>Listen to Music</Link>
              <Link href="/about" style={{fontFamily:'Inter,sans-serif',fontSize:'9.5px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(245,240,232,0.45)',textDecoration:'none',display:'flex',alignItems:'center',gap:8,transition:'color 0.3s'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#C9A84C'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.45)'}}>
                The Story <span style={{fontSize:16}}>→</span>
              </Link>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{height:32,display:'flex',flexDirection:'column',alignItems:'center'}}>
                <span className="scroll-cue-line" />
              </div>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:'8px',letterSpacing:'0.3em',textTransform:'uppercase',color:'rgba(245,240,232,0.22)'}}>Scroll</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Solomon photo */}
        <div className="hero-right">
          <Image
            src="/images/solomon-green-suit-hero.png"
            alt="Solomon Stephen"
            fill priority
            sizes="(max-width:768px) 100vw, 50vw"
            style={{objectFit:'cover', objectPosition:'top center'}}
            className="ken-b"
          />
          {/* Wide left blend — matches hero-left background exactly */}
          <div style={{position:'absolute',left:0,top:0,bottom:0,width:'45%',background:'linear-gradient(to right,#1A2E1A 0%,#1A2E1A 15%,transparent 100%)',zIndex:1,pointerEvents:'none'}} />
          <div style={{position:'absolute',left:0,right:0,bottom:0,height:'30%',background:'linear-gradient(to top,#060e06,transparent)',zIndex:1,pointerEvents:'none'}} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════════════════ */}
      <div style={{background:'#F0EBE0',padding:'18px 0',overflow:'hidden',borderTop:'1px solid rgba(201,168,76,0.15)',borderBottom:'1px solid rgba(201,168,76,0.15)'}}>
        <div className="mq-track">
          {[...MARQUEE,...MARQUEE,...MARQUEE,...MARQUEE].map((w,i) => (
            <span key={i} style={{
              fontFamily: w==='·' ? 'Inter,sans-serif' : 'Cormorant Garamond,serif',
              fontSize: w==='·' ? '14px' : 'clamp(13px,1.6vw,18px)',
              fontStyle: w==='·' ? 'normal' : 'italic',
              color: w==='·' ? 'rgba(201,168,76,0.4)' : '#8a6520',
              letterSpacing: w==='·' ? '0' : '0.02em',
              marginRight:'clamp(14px,2vw,28px)',
              whiteSpace:'nowrap', flexShrink:0,
            }}>{w}</span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════ */}
      <div className="stats-bar" style={{background:'rgba(26,46,26,0.15)'}}>
        {stats.map((s) => (
          <div key={s.label} className="stat-cell hp-reveal">
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,4vw,56px)',fontWeight:300,color:'#C9A84C',lineHeight:1,letterSpacing:'-1px'}}>{s.val}</div>
            <div style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',color:'rgba(245,240,232,0.35)',letterSpacing:'0.22em',textTransform:'uppercase',marginTop:6}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════
          CALLINGS — dark section
      ══════════════════════════════════════════════════════ */}
      <section style={{padding:'clamp(80px,8vw,120px) 0', background:'#060e06'}}>
        <div className="page-w">
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginBottom:'clamp(40px,5vw,64px)'}}>
            <div className="hp-reveal">
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
                <div style={{width:28,height:1,background:'rgba(201,168,76,0.45)'}} />
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(201,168,76,0.55)'}}>Every Assignment</span>
              </div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(32px,4.5vw,62px)',fontWeight:300,color:'#F5F0E8',lineHeight:0.93,letterSpacing:'-1.5px'}}>
                Four Callings.<br/>
                <span style={{fontStyle:'italic',fontWeight:700,background:'linear-gradient(135deg,#E8C96A,#C9A84C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>All Inhabited.</span>
              </h2>
            </div>
            <p className="hp-reveal hp-d2" style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(245,240,232,0.32)',lineHeight:1.85,maxWidth:340}}>Each one an institution in its own right — fully present, fully committed to excellence.</p>
          </div>
          <div className="calling-grid">
            {callings.map((c,i) => (
              <Link key={c.title} href={c.href} className={`calling-card hp-reveal hp-d${Math.min(i+1,4)}`} style={{transitionDelay:`${i*0.08}s`}}>
                <div style={{position:'absolute',bottom:-16,right:16,fontFamily:'Cormorant Garamond,serif',fontSize:160,fontWeight:700,color:'rgba(201,168,76,0.025)',lineHeight:1,pointerEvents:'none',userSelect:'none'}}>{c.num}</div>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'8px',letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(201,168,76,0.4)',marginBottom:14}}>{c.tag}</div>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(28px,2.8vw,42px)',fontWeight:300,color:'rgba(245,240,232,0.9)',lineHeight:0.93,letterSpacing:'-0.5px',marginBottom:14}}>{c.title}</h3>
                <div style={{width:28,height:1,background:'rgba(201,168,76,0.3)',marginBottom:16}} />
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(245,240,232,0.32)',lineHeight:1.8,marginBottom:24}}>{c.desc}</p>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'9px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(201,168,76,0.45)',display:'flex',alignItems:'center',gap:8}}>
                  {c.cta} <span style={{fontSize:14}}>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PULL QUOTE — cream background
      ══════════════════════════════════════════════════════ */}
      <section style={{background:'#F0EBE0',padding:'clamp(80px,9vw,130px) 0',position:'relative',overflow:'hidden',borderTop:'1px solid rgba(201,168,76,0.2)'}}>
        <div style={{position:'absolute',top:-40,left:'clamp(24px,4vw,56px)',fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(120px,18vw,260px)',fontWeight:700,color:'rgba(139,101,32,0.06)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>&ldquo;</div>
        <div className="page-w" style={{position:'relative',zIndex:1}}>
          <div className="hp-reveal" style={{maxWidth:1000}}>
            <blockquote style={{margin:0}}>
              <p style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(26px,4vw,60px)',fontWeight:300,fontStyle:'italic',color:'#1A1208',lineHeight:1.15,letterSpacing:'-0.5px',marginBottom:32}}>
                Worship is not a moment —{' '}
                <span style={{background:'linear-gradient(135deg,#9a7530,#C9A84C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',fontWeight:700}}>it is a movement.</span>{' '}
                And every song is a stone laid for the altar of a generation yet to come.
              </p>
              <footer style={{display:'flex',alignItems:'center',gap:16}}>
                <div style={{width:40,height:1,background:'rgba(139,101,32,0.35)'}} />
                <cite style={{fontStyle:'normal',fontFamily:'Inter,sans-serif',fontSize:'9px',letterSpacing:'0.35em',textTransform:'uppercase',color:'rgba(139,101,32,0.55)'}}>Solomon Stephen</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MUSIC FEATURE
      ══════════════════════════════════════════════════════ */}
      <section style={{background:'#060e06',padding:'clamp(80px,8vw,120px) 0',borderTop:'1px solid rgba(201,168,76,0.06)'}}>
        <div className="page-w">
          <div className="music-flip-grid">
            <div className="hp-reveal">
              <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
                <div style={{width:28,height:1,background:'rgba(201,168,76,0.45)'}} />
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',letterSpacing:'0.38em',textTransform:'uppercase',color:'rgba(201,168,76,0.55)'}}>Latest Release</span>
              </div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(32px,4vw,58px)',fontWeight:300,color:'#F5F0E8',lineHeight:0.93,letterSpacing:'-1.5px',marginBottom:4}}>Rivers of Joy</h2>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'18px',fontStyle:'italic',color:'rgba(201,168,76,0.55)',marginBottom:24}}>Solomon Stephen · Live at MDWE</div>
              <div style={{height:1,background:'linear-gradient(90deg,rgba(201,168,76,0.25),transparent)',marginBottom:20}} />
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(245,240,232,0.42)',lineHeight:1.85,marginBottom:28}}>
                A live spontaneous prophetic worship experience — a flowing encounter of joy, thanksgiving, and heartfelt praise rising from the Spirit within.
              </p>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'16px',fontStyle:'italic',color:'rgba(245,240,232,0.35)',borderLeft:'2px solid rgba(201,168,76,0.3)',paddingLeft:16,marginBottom:32}}>
                &ldquo;He that believeth on me, as the scripture hath said, out of his belly shall flow rivers of living water.&rdquo; — John 7:38
              </div>
              <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
                <Link href="/music" className="btn-gold-pill" style={{fontSize:'11px'}}>Explore Music</Link>
                <Link href="https://youtube.com/@thesolomonsteph" target="_blank" rel="noopener noreferrer"
                  style={{fontFamily:'Inter,sans-serif',fontSize:'9.5px',letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(245,240,232,0.35)',textDecoration:'none',display:'flex',alignItems:'center',gap:8,alignSelf:'center',transition:'color 0.3s'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#C9A84C'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.35)'}}>
                  YouTube ↗
                </Link>
              </div>
            </div>
            <div className="hp-reveal hp-d2" style={{position:'relative',borderRadius:20,overflow:'hidden',border:'1px solid rgba(201,168,76,0.12)',background:'rgba(26,46,26,0.2)'}}>
              <div style={{position:'relative',paddingTop:'56.25%'}}>
                <iframe
                  src="https://www.youtube.com/embed/TnEp0kiJBfI?rel=0&modestbranding=1"
                  title="Rivers of Joy — Solomon Stephen"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{position:'absolute',inset:0,width:'100%',height:'100%'}}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — forest green
      ══════════════════════════════════════════════════════ */}
      <section style={{background:'#1A2E1A',padding:'clamp(80px,9vw,130px) 0',position:'relative',overflow:'hidden',textAlign:'center'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,0.08) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)'}} />
        <div className="page-w" style={{position:'relative',zIndex:1}}>
          <div style={{maxWidth:640,margin:'0 auto'}} className="hp-reveal">
            <div style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',letterSpacing:'0.4em',textTransform:'uppercase',color:'rgba(201,168,76,0.5)',marginBottom:20}}>The Worship Nation</div>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(36px,5.5vw,76px)',fontWeight:300,color:'#F5F0E8',lineHeight:0.93,letterSpacing:'-2px',marginBottom:8}}>
              You Were Made<br/>for{' '}
              <span style={{fontStyle:'italic',fontWeight:700,background:'linear-gradient(135deg,#E8C96A,#C9A84C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>More.</span>
            </h2>
            <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.35),transparent)',maxWidth:120,margin:'24px auto'}} />
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(245,240,232,0.38)',lineHeight:1.9,marginBottom:40}}>
              There&apos;s a gathering with your name on it. A song yet to be recorded. The door is always open.
            </p>
            <div style={{display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap'}}>
              <Link href="/events"  className="btn-gold-pill" style={{fontSize:'11px'}}>Join a Gathering</Link>
              <Link href="/contact" className="btn-outline-pill" style={{fontSize:'11px'}}>Get In Touch</Link>
         