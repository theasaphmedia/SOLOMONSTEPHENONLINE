'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

/* ─── Data ────────────────────────────────────────────────────────────────── */
const ROLES = ['Gospel Minister','Worship Leader','Music Producer','Author','Studio Founder','Digital Innovator']

const CALLINGS = [
  {
    num: '01', tag: 'The Worship Nation', title: 'Ministry',
    desc: 'Prophetic gatherings that shift atmospheres — Mid Day Worship Experience, The Slaughter House, Synantesis, and more.',
    href: '/events', cta: 'Explore Events',
  },
  {
    num: '02', tag: 'TWN Studios', title: 'Studio',
    desc: 'World-class recording, mixing, mastering, and production in Ajah, Lagos — consecrated for artists and ministers.',
    href: '/studios', cta: 'Book a Session',
  },
  {
    num: '03', tag: 'Published Works', title: 'Author',
    desc: 'Books rooted in biblical Hebrew and Greek study — transforming believers from the inside out into sons, not slaves.',
    href: '/books', cta: 'Get the Books',
  },
  {
    num: '04', tag: 'TAI Digital', title: 'Digital',
    desc: 'Premium websites, brand identities, and digital strategy for businesses and ministries that refuse to be ordinary.',
    href: '/tai-digital', cta: 'See the Work',
  },
]

const STATS = [
  { val: '10+', label: 'Years in Ministry' },
  { val: '4',   label: 'Published Books'   },
  { val: '6+',  label: 'Studio Services'   },
  { val: '500+',label: 'Lives Impacted'    },
]

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.07, rootMargin: '0px 0px -48px 0px' }
    )
    document.querySelectorAll('.js-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useReveal()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let W = 0, H = 0, id = 0
    type P = { x:number;y:number;vx:number;vy:number;r:number;op:number;angle:number;spd:number }
    let pts: P[] = []
    const resize = () => {
      W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight
      pts = Array.from({ length: 22 }, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx: (Math.random()-.5)*.18, vy: (Math.random()-.5)*.18,
        r: Math.random()*1.4+.3, op: Math.random()*.1+.02,
        angle: Math.random()*Math.PI*2, spd: Math.random()*.004+.001,
      }))
    }
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach(p => {
        p.angle+=p.spd; p.x+=p.vx+Math.sin(p.angle)*.08; p.y+=p.vy
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(201,168,76,${p.op+Math.sin(p.angle*2)*.02})`; ctx.fill()
      })
      id = requestAnimationFrame(draw)
    }
    resize(); draw(); window.addEventListener('resize',resize)
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize',resize) }
  }, [])

  return (
    <main style={{ background: '#060c06', overflowX: 'hidden' }}>
      <style>{`
        .js-reveal {
          opacity:0; transform:translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .js-reveal.is-visible { opacity:1; transform:translateY(0); }
        .js-reveal.d1{transition-delay:.1s} .js-reveal.d2{transition-delay:.2s}
        .js-reveal.d3{transition-delay:.3s} .js-reveal.d4{transition-delay:.4s}

        @keyframes wordUp { from{opacity:0;transform:translateY(105%)} to{opacity:1;transform:translateY(0)} }
        .wc { overflow:hidden; display:block; }
        .wi  { display:inline-block; animation:wordUp 1s cubic-bezier(0.16,1,0.3,1) both; }
        .wi2 { animation-delay:.14s; }

        @keyframes scrollDrop { 0%{height:0;opacity:1} 60%{height:36px;opacity:1} 100%{height:36px;opacity:0} }
        .scroll-line { display:block; width:1px; background:#C9A84C; animation:scrollDrop 2.4s ease infinite; }

        @keyframes mq { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .mq-track { animation:mq 32s linear infinite; display:flex; width:max-content; }

        @keyframes kenB { 0%{transform:scale(1) translate(0,0)} 100%{transform:scale(1.07) translate(-1%,.4%)} }
        .ken-burns { animation:kenB 22s ease-in-out infinite alternate; will-change:transform; }

        .calling-card {
          display:block; text-decoration:none;
          padding:clamp(32px,3.5vw,52px) clamp(24px,3vw,44px);
          border:1px solid rgba(201,168,76,0.08);
          position:relative; overflow:hidden;
          transition: border-color .4s, background .4s, transform .5s cubic-bezier(0.16,1,0.3,1), box-shadow .5s;
          background:rgba(6,12,6,0.6);
        }
        .calling-card::after {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,#E8C96A,#C9A84C,#D4B85E);
          transform:scaleX(0); transform-origin:left;
          transition:transform .4s cubic-bezier(0.16,1,0.3,1);
        }
        .calling-card:hover::after { transform:scaleX(1); }
        .calling-card:hover {
          border-color:rgba(201,168,76,0.22); background:rgba(26,46,26,0.25);
          transform:translateY(-8px);
          box-shadow:0 40px 80px rgba(0,0,0,0.55),0 0 0 1px rgba(201,168,76,0.1);
        }

        .callings-grid { display:grid; grid-template-columns:1fr; gap:1px; background:rgba(201,168,76,0.06); }
        @media(min-width:640px) { .callings-grid { grid-template-columns:1fr 1fr; } }
        @media(min-width:1200px) { .callings-grid { grid-template-columns:repeat(4,1fr); } }

        .stats-bar { display:grid; grid-template-columns:repeat(2,1fr); }
        @media(min-width:640px) { .stats-bar { grid-template-columns:repeat(4,1fr); } }
        .stat-cell {
          padding:clamp(24px,3vw,40px) 20px; text-align:center;
          border-right:1px solid rgba(201,168,76,0.07);
        }
        .stat-cell:nth-child(2n) { border-right:none; }
        @media(min-width:640px) {
          .stat-cell:nth-child(2n) { border-right:1px solid rgba(201,168,76,0.07); }
          .stat-cell:nth-child(4n) { border-right:none; }
        }

        .hero-wrap { display:grid; grid-template-columns:1fr; min-height:100svh; position:relative; overflow:hidden; }
        @media(min-width:768px) { .hero-wrap { grid-template-columns:55fr 45fr; } }
        .hero-left {
          background:#111a11;
          display:flex; flex-direction:column; justify-content:flex-end;
          padding:clamp(100px,13vw,160px) clamp(24px,4vw,56px) clamp(56px,7vw,88px);
          position:relative; z-index:2; order:2;
        }
        @media(min-width:768px) { .hero-left { order:0; justify-content:center; } }
        .hero-right { position:relative; min-height:60vw; order:1; }
        @media(min-width:768px) { .hero-right { min-height:unset; order:0; } }

        .music-grid { display:grid; grid-template-columns:1fr; gap:48px; }
        @media(min-width:800px) { .music-grid { grid-template-columns:1fr 1fr; gap:80px; align-items:center; } }

        .sec-label { display:flex; align-items:center; gap:12px; margin-bottom:20px; }
        .sec-label-line { width:28px; height:1px; background:rgba(201,168,76,0.45); flex-shrink:0; }
        .sec-label-txt {
          font-family:'Inter',sans-serif; font-size:8.5px;
          letter-spacing:.4em; text-transform:uppercase; color:rgba(201,168,76,0.55);
        }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero-wrap">
        <div className="hero-left">
          <canvas ref={canvasRef} style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0,opacity:.5,pointerEvents:'none'}} />
          <div style={{position:'absolute',inset:0,zIndex:1,pointerEvents:'none',opacity:.04,backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",backgroundSize:'180px'}} />
          <div style={{position:'relative',zIndex:3}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:32}}>
              <div style={{width:32,height:1,background:'rgba(201,168,76,0.4)'}} />
              <span style={{fontFamily:'Inter,sans-serif',fontSize:'8px',letterSpacing:'.42em',textTransform:'uppercase',color:'rgba(201,168,76,0.6)'}}>Gospel Minister · Lagos, Nigeria</span>
            </div>
            <h1 style={{margin:0,lineHeight:1}}>
              <span className="wc">
                <span className="wi" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(60px,8.5vw,130px)',fontWeight:300,color:'#F5F0E8',letterSpacing:'-3px',lineHeight:.88,display:'block'}}>Solomon</span>
              </span>
              <span className="wc" style={{marginTop:4}}>
                <span className="wi wi2" style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(60px,8.5vw,130px)',fontWeight:700,fontStyle:'italic',letterSpacing:'-3px',lineHeight:.92,display:'block',background:'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>Stephen.</span>
              </span>
            </h1>
            <div style={{display:'flex',flexWrap:'wrap',gap:'6px 12px',marginTop:28}}>
              {['Worship Leader','Music Producer','Author','Studio Founder'].map((r,i,a) => (
                <span key={r} style={{display:'flex',alignItems:'center',gap:12}}>
                  <span style={{fontFamily:'Inter,sans-serif',fontSize:'9.5px',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(245,240,232,0.35)'}}>{r}</span>
                  {i < a.length-1 && <span style={{color:'rgba(201,168,76,0.2)',fontSize:12}}>·</span>}
                </span>
              ))}
            </div>
            <div style={{display:'flex',gap:14,flexWrap:'wrap',alignItems:'center',marginTop:40}}>
              <Link href="/music" className="btn-gold-pill" style={{fontSize:'10px'}}>Listen to Music</Link>
              <Link href="/about" style={{fontFamily:'Inter,sans-serif',fontSize:'9px',letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(245,240,232,0.38)',textDecoration:'none',display:'flex',alignItems:'center',gap:8,transition:'color .3s'}}
                onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#C9A84C'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.38)'}}>
                The Story <span style={{fontSize:16}}>→</span>
              </Link>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:12,marginTop:56}}>
              <div style={{height:36,display:'flex',flexDirection:'column',alignItems:'center'}}>
                <span className="scroll-line" />
              </div>
              <span style={{fontFamily:'Inter,sans-serif',fontSize:'8px',letterSpacing:'.32em',textTransform:'uppercase',color:'rgba(245,240,232,0.18)'}}>Scroll</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <Image src="/images/solomon-green-suit-hero.png" alt="Solomon Stephen" fill priority sizes="(max-width:768px) 100vw, 45vw" style={{objectFit:'cover',objectPosition:'top center'}} className="ken-burns" />
          <div style={{position:'absolute',left:0,top:0,bottom:0,width:'50%',background:'linear-gradient(to right,#111a11 0%,#111a11 8%,transparent 100%)',zIndex:1,pointerEvents:'none'}} />
          <div style={{position:'absolute',left:0,right:0,bottom:0,height:'35%',background:'linear-gradient(to top,#060c06,transparent)',zIndex:1,pointerEvents:'none'}} />
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
      <div style={{background:'#F0EBE0',padding:'16px 0',overflow:'hidden',borderTop:'1px solid rgba(201,168,76,0.2)',borderBottom:'1px solid rgba(201,168,76,0.2)'}}>
        <div className="mq-track">
          {[...ROLES,'·',...ROLES,'·',...ROLES,'·',...ROLES,'·'].map((w,i) => (
            <span key={i} style={{fontFamily:w==='·'?'Inter,sans-serif':'Cormorant Garamond,serif',fontSize:w==='·'?'14px':'clamp(13px,1.5vw,17px)',fontStyle:w==='·'?'normal':'italic',color:w==='·'?'rgba(201,168,76,0.35)':'#8a6520',letterSpacing:w==='·'?'0':'.02em',marginRight:'clamp(16px,2.2vw,32px)',whiteSpace:'nowrap',flexShrink:0}}>{w}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <div className="stats-bar" style={{background:'rgba(17,26,17,0.9)',borderBottom:'1px solid rgba(201,168,76,0.07)'}}>
        {STATS.map((s,i) => (
          <div key={s.label} className={`stat-cell js-reveal d${i+1}`}>
            <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,4.5vw,64px)',fontWeight:300,color:'#C9A84C',lineHeight:1,letterSpacing:'-1.5px'}}>{s.val}</div>
            <div style={{fontFamily:'Inter,sans-serif',fontSize:'8px',color:'rgba(245,240,232,0.28)',letterSpacing:'.24em',textTransform:'uppercase',marginTop:8}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── FOUR CALLINGS ─────────────────────────────────────────────────── */}
      <section style={{padding:'clamp(80px,9vw,128px) 0',background:'#060c06'}}>
        <div style={{padding:'0 clamp(24px,4vw,56px)'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:20,marginBottom:'clamp(40px,5vw,64px)'}}>
            <div className="js-reveal">
              <div className="sec-label"><div className="sec-label-line" /><span className="sec-label-txt">Every Assignment</span></div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(34px,5vw,68px)',fontWeight:300,color:'#F5F0E8',lineHeight:.92,letterSpacing:'-1.5px',margin:0}}>
                Four Callings.<br />
                <em style={{fontStyle:'italic',fontWeight:700,background:'linear-gradient(135deg,#E8C96A,#C9A84C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>All Inhabited.</em>
              </h2>
            </div>
            <p className="js-reveal d2" style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(245,240,232,0.3)',lineHeight:1.9,maxWidth:340,margin:0}}>
              Each one an institution in its own right — fully present, fully committed to excellence and the glory of God.
            </p>
          </div>
          <div className="callings-grid">
            {CALLINGS.map((c,i) => (
              <Link key={c.title} href={c.href} className={`calling-card js-reveal d${i+1}`}>
                <div style={{position:'absolute',bottom:-20,right:16,fontFamily:'Cormorant Garamond,serif',fontSize:180,fontWeight:700,color:'rgba(201,168,76,0.028)',lineHeight:1,pointerEvents:'none',userSelect:'none'}}>{c.num}</div>
                <div style={{fontFamily:'Inter,sans-serif',fontSize:'8px',letterSpacing:'.38em',textTransform:'uppercase',color:'rgba(201,168,76,0.4)',marginBottom:16}}>{c.tag}</div>
                <h3 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(30px,3vw,46px)',fontWeight:300,color:'rgba(245,240,232,0.88)',lineHeight:.92,letterSpacing:'-.5px',marginBottom:16}}>{c.title}</h3>
                <div style={{width:28,height:1,background:'rgba(201,168,76,0.25)',marginBottom:18}} />
                <p style={{fontFamily:'Inter,sans-serif',fontSize:'13px',color:'rgba(245,240,232,0.3)',lineHeight:1.85,marginBottom:28}}>{c.desc}</p>
                <span style={{fontFamily:'Inter,sans-serif',fontSize:'9px',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(201,168,76,0.45)',display:'flex',alignItems:'center',gap:8}}>{c.cta} <span style={{fontSize:14}}>→</span></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────────────────────── */}
      <section style={{background:'#F0EBE0',padding:'clamp(80px,10vw,140px) 0',position:'relative',overflow:'hidden',borderTop:'1px solid rgba(201,168,76,0.2)'}}>
        <div style={{position:'absolute',top:-60,left:'clamp(24px,4vw,56px)',fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(160px,22vw,320px)',fontWeight:700,color:'rgba(139,101,32,0.07)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>&ldquo;</div>
        <div style={{padding:'0 clamp(24px,4vw,56px)',position:'relative',zIndex:1}}>
          <div className="js-reveal" style={{maxWidth:960}}>
            <blockquote style={{margin:0}}>
              <p style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(24px,4.5vw,64px)',fontWeight:300,fontStyle:'italic',color:'#1A1208',lineHeight:1.18,letterSpacing:'-.5px',marginBottom:36}}>
                Worship is not a moment —{' '}
                <span style={{background:'linear-gradient(135deg,#9a7530,#C9A84C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',fontWeight:700}}>it is a movement.</span>{' '}
                And every song is a stone laid for the altar of a generation yet to come.
              </p>
              <footer style={{display:'flex',alignItems:'center',gap:16}}>
                <div style={{width:36,height:1,background:'rgba(139,101,32,0.35)'}} />
                <cite style={{fontStyle:'normal',fontFamily:'Inter,sans-serif',fontSize:'9px',letterSpacing:'.35em',textTransform:'uppercase',color:'rgba(139,101,32,0.5)'}}>Solomon Stephen</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── MUSIC FEATURE ─────────────────────────────────────────────────── */}
      <section style={{background:'#060c06',padding:'clamp(80px,9vw,128px) 0',borderTop:'1px solid rgba(201,168,76,0.06)'}}>
        <div style={{padding:'0 clamp(24px,4vw,56px)'}}>
          <div className="music-grid">
            <div className="js-reveal">
              <div className="sec-label"><div className="sec-label-line" /><span className="sec-label-txt">Latest Release</span></div>
              <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(32px,4.5vw,62px)',fontWeight:300,color:'#F5F0E8',lineHeight:.92,letterSpacing:'-1.5px',marginBottom:6}}>Rivers of Joy</h2>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'18px',fontStyle:'italic',color:'rgba(201,168,76,0.5)',marginBottom:28}}>Solomon Stephen · Live at MDWE</div>
              <div style={{height:1,background:'linear-gradient(90deg,rgba(201,168,76,0.2),transparent)',marginBottom:24}} />
              <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(245,240,232,0.38)',lineHeight:1.9,marginBottom:28}}>
                A live spontaneous prophetic worship experience — a flowing encounter of joy, thanksgiving, and heartfelt praise rising from the Spirit within.
              </p>
              <div style={{fontFamily:'Cormorant Garamond,serif',fontSize:'15px',fontStyle:'italic',color:'rgba(245,240,232,0.28)',borderLeft:'2px solid rgba(201,168,76,0.25)',paddingLeft:16,marginBottom:36}}>
                &ldquo;Out of his belly shall flow rivers of living water.&rdquo; — John 7:38
              </div>
              <div style={{display:'flex',gap:14,flexWrap:'wrap'}}>
                <Link href="/music" className="btn-gold-pill" style={{fontSize:'10px'}}>Explore Music</Link>
                <Link href="https://youtube.com/@thesolomonsteph" target="_blank" rel="noopener noreferrer"
                  style={{fontFamily:'Inter,sans-serif',fontSize:'9px',letterSpacing:'.22em',textTransform:'uppercase',color:'rgba(245,240,232,0.3)',textDecoration:'none',display:'flex',alignItems:'center',gap:8,alignSelf:'center',transition:'color .3s'}}
                  onMouseEnter={e=>{(e.currentTarget as HTMLAnchorElement).style.color='#C9A84C'}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLAnchorElement).style.color='rgba(245,240,232,0.3)'}}>
                  YouTube ↗
                </Link>
              </div>
            </div>
            <div className="js-reveal d2" style={{position:'relative',borderRadius:16,overflow:'hidden',border:'1px solid rgba(201,168,76,0.1)',background:'rgba(17,26,17,0.5)',boxShadow:'0 40px 80px rgba(0,0,0,0.5)'}}>
              <div style={{position:'relative',paddingTop:'56.25%'}}>
                <iframe src="https://www.youtube.com/embed/TnEp0kiJBfI?rel=0&modestbranding=1" title="Rivers of Joy — Solomon Stephen" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{position:'absolute',inset:0,width:'100%',height:'100%'}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section style={{background:'#1A2E1A',padding:'clamp(88px,10vw,140px) 0',position:'relative',overflow:'hidden',textAlign:'center'}}>
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 70% at 50% 50%,rgba(201,168,76,0.09) 0%,transparent 70%)',pointerEvents:'none'}} />
        <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.4),transparent)'}} />
        <div style={{padding:'0 clamp(24px,4vw,56px)',position:'relative',zIndex:1}}>
          <div className="js-reveal" style={{maxWidth:640,margin:'0 auto'}}>
            <div style={{fontFamily:'Inter,sans-serif',fontSize:'8.5px',letterSpacing:'.42em',textTransform:'uppercase',color:'rgba(201,168,76,0.45)',marginBottom:24}}>The Worship Nation</div>
            <h2 style={{fontFamily:'Cormorant Garamond,serif',fontSize:'clamp(40px,6vw,84px)',fontWeight:300,color:'#F5F0E8',lineHeight:.9,letterSpacing:'-2px',marginBottom:8}}>
              You Were Made<br />for{' '}
              <em style={{fontStyle:'italic',fontWeight:700,background:'linear-gradient(135deg,#E8C96A,#C9A84C)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>More.</em>
            </h2>
            <div style={{height:1,background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)',maxWidth:100,margin:'28px auto'}} />
            <p style={{fontFamily:'Inter,sans-serif',fontSize:'14px',color:'rgba(245,240,232,0.35)',lineHeight:1.95,marginBottom:44}}>
              There&apos;s a gathering with your name on it. A song yet to be recorded. The door is always open.
            </p>
            <div style={{display:'flex',justifyContent:'center',gap:14,flexWrap:'wrap'}}>
              <Link href="/events"  className="btn-gold-pill"    style={{fontSize:'10px'}}>Join a Gathering</Link>
              <Link href="/contact" className="btn-outline-pill" style={{fontSize:'10px'}}>Get In Touch</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
