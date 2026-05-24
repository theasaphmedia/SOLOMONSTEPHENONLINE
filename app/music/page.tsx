'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '../components/usePageReveal'

const CHANNEL_ID  = 'UCE-vJlarsrIpRFoZcxVMFfA'
const VIDEO_ID    = 'TnEp0kiJBfI'
const CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`

function MusicCard({ track }: { track: { id:string; title:string; subtitle:string; year:string; desc:string; scripture:string; lyric?:string } }) {
  const [ready, setReady] = useState(false)
  return (
    <div className="rv-scale song-card-wrap"
      style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.12)', borderRadius:'20px', overflow:'hidden', transition:'border-color 0.4s, box-shadow 0.4s, transform 0.4s' }}
      onMouseEnter={(e) => { const el=e.currentTarget; el.style.borderColor='rgba(201,168,76,0.35)'; el.style.boxShadow='0 20px 52px rgba(201,168,76,0.08)'; el.style.transform='translateY(-4px)' }}
      onMouseLeave={(e) => { const el=e.currentTarget; el.style.borderColor='rgba(201,168,76,0.12)'; el.style.boxShadow='none'; el.style.transform='none' }}
    >
      <div style={{ position:'relative', paddingTop:'56.25%', background:'#0a1a0a', cursor:'pointer' }} onClick={() => setReady(true)}>
        {!ready ? (
          <>
            <img src={`https://img.youtube.com/vi/${track.id}/hqdefault.jpg`} alt={track.title} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.55 }} />
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(6,14,6,0.5) 0%,rgba(6,14,6,0.15) 100%)' }} />
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:'52px', height:'52px', borderRadius:'50%', background:'rgba(201,168,76,0.15)', border:'2px solid rgba(201,168,76,0.45)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
                <div style={{ width:0, height:0, borderTop:'10px solid transparent', borderBottom:'10px solid transparent', borderLeft:'16px solid #C9A84C', marginLeft:'4px' }} />
              </div>
            </div>
            {/* Lyric hover reveal */}
            {track.lyric && (
              <div className="song-card-lyric">
                <p style={{ fontFamily:'Cormorant Garamond, serif', fontStyle:'italic', fontSize:'13px', color:'rgba(255,255,255,0.7)', lineHeight:1.6, margin:0 }}>&ldquo;{track.lyric}&rdquo;</p>
              </div>
            )}
          </>
        ) : (
          <iframe src={`https://www.youtube.com/embed/${track.id}?autoplay=1&rel=0&modestbranding=1`}
            title={track.title} frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
        )}
      </div>
      <div style={{ padding:'24px' }}>
        <div style={{ color:'rgba(201,168,76,0.5)', fontFamily:'Inter, sans-serif', fontSize:'8px', letterSpacing:'0.3em', textTransform:'uppercase', marginBottom:'8px' }}>{track.year}</div>
        <div className="font-display" style={{ fontSize:'22px', fontWeight:600, color:'white', lineHeight:1, marginBottom:'4px' }}>{track.title}</div>
        <div style={{ color:'rgba(201,168,76,0.6)', fontFamily:'Cormorant Garamond, serif', fontStyle:'italic', fontSize:'14px', marginBottom:'14px' }}>{track.subtitle}</div>
        <div style={{ height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.2),transparent)', marginBottom:'14px' }} />
        <p style={{ color:'rgba(255,255,255,0.35)', fontFamily:'Inter, sans-serif', fontSize:'12px', lineHeight:1.75, marginBottom:'16px' }}>{track.desc}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <span style={{ color:'rgba(201,168,76,0.35)', fontFamily:'Inter, sans-serif', fontSize:'10px', fontStyle:'italic' }}>{track.scripture}</span>
          <Link href={`https://www.youtube.com/watch?v=${track.id}`} target="_blank"
            style={{ color:'rgba(201,168,76,0.7)', fontFamily:'Inter, sans-serif', fontSize:'10px', letterSpacing:'0.1em', textDecoration:'none', transition:'color 0.2s' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color='#C9A84C' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color='rgba(201,168,76,0.7)' }}>
            Watch
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MusicPage() {
  usePageReveal()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [playerReady, setPlayerReady] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId:number, W=0, H=0
    const pts: { x:number;y:number;vx:number;vy:number;r:number;op:number;angle:number;speed:number }[] = []
    const resize = () => {
      W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; pts.length=0
      for(let i=0;i<30;i++) pts.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,r:Math.random()*1.5+0.5,op:Math.random()*0.25+0.05,angle:Math.random()*Math.PI*2,speed:Math.random()*0.005+0.002})
    }
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      pts.forEach((p,i) => {
        p.angle+=p.speed; p.x+=p.vx+Math.sin(p.angle)*0.12; p.y+=p.vy
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1
        for(let j=i+1;j<pts.length;j++){const ex=pts[j].x-p.x,ey=pts[j].y-p.y,ed=Math.sqrt(ex*ex+ey*ey);if(ed<100){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(201,168,76,${(1-ed/100)*0.06})`;ctx.lineWidth=0.5;ctx.stroke()}}
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2)
        ctx.fillStyle=`rgba(201,168,76,${p.op+Math.sin(p.angle*2)*0.04})`; ctx.fill()
      })
      animId=requestAnimationFrame(draw)
    }
    resize(); draw()
    window.addEventListener('resize', resize)
    return () => { obs.disconnect(); cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <main style={{ background:'#060e06', minHeight:'100vh', overflowX:'hidden' }} className="page-entry">
      <style>{`
        @keyframes goldPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.75)} }
        .featured-track-grid { display:grid; grid-template-columns:1fr; }
        @media(min-width:768px) { .featured-track-grid { grid-template-columns:1fr 1fr; min-height:380px; } }
        .featured-video-panel { position:relative; background:#0a1a0a; overflow:hidden; min-height:240px; }
        @media(min-width:768px) { .featured-video-panel { min-height:unset; } }
        .featured-info-panel { padding:22px 18px; display:flex; flex-direction:column; justify-content:center; gap:16px; }
        @media(min-width:768px) { .featured-info-panel { padding:40px 36px; } }
        .more-music-grid { display:grid; grid-template-columns:1fr; gap:20px; }
        @media(min-width:600px) { .more-music-grid { grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); } }

        /* CSS Waveform */
        @keyframes waveBar1 { 0%,100%{transform:scaleY(0.25)} 30%{transform:scaleY(1)} 60%{transform:scaleY(0.5)} }
        @keyframes waveBar2 { 0%,100%{transform:scaleY(0.6)} 20%{transform:scaleY(0.2)} 50%{transform:scaleY(1)} 80%{transform:scaleY(0.4)} }
        @keyframes waveBar3 { 0%,100%{transform:scaleY(0.4)} 40%{transform:scaleY(1)} 70%{transform:scaleY(0.3)} }
        @keyframes waveBar4 { 0%,100%{transform:scaleY(0.9)} 25%{transform:scaleY(0.3)} 55%{transform:scaleY(0.8)} 85%{transform:scaleY(0.2)} }
        @keyframes waveBar5 { 0%,100%{transform:scaleY(0.3)} 35%{transform:scaleY(0.8)} 65%{transform:scaleY(0.15)} }
        .wave-bar { display:inline-block; width:3px; border-radius:2px; transform-origin:bottom; background:linear-gradient(to top,rgba(201,168,76,0.6),rgba(201,168,76,0.15)); }
        .wave-bar:nth-child(5n+1) { animation:waveBar1 1.4s ease-in-out infinite; }
        .wave-bar:nth-child(5n+2) { animation:waveBar2 1.1s ease-in-out infinite; }
        .wave-bar:nth-child(5n+3) { animation:waveBar3 1.7s ease-in-out infinite; }
        .wave-bar:nth-child(5n+4) { animation:waveBar4 0.95s ease-in-out infinite; }
        .wave-bar:nth-child(5n+5) { animation:waveBar5 1.3s ease-in-out infinite; }

        /* Song card lyric overlay */
        .song-card-lyric { position:absolute; bottom:0; left:0; right:0; padding:16px; background:linear-gradient(to top,rgba(5,9,10,0.97) 0%,rgba(5,9,10,0.7) 60%,transparent); transform:translateY(100%); transition:transform 0.45s cubic-bezier(0.22,1,0.36,1); pointer-events:none; }
        .song-card-wrap:hover .song-card-lyric { transform:translateY(0); }
      `}</style>

      <section style={{ position:'relative', minHeight:'55vh', overflow:'hidden', display:'flex', alignItems:'center' }}>
        <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 100% at 70% 50%,rgba(201,168,76,0.05) 0%,transparent 65%)', zIndex:1 }} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 20% 50%,rgba(26,46,26,0.4) 0%,transparent 70%)', zIndex:1 }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'120px', background:'linear-gradient(to top,#060e06,transparent)', zIndex:2 }} />
        <div style={{ position:'relative', zIndex:10, width:'100%', paddingTop:'140px', paddingBottom:'48px', paddingLeft:'clamp(24px,5vw,80px)', paddingRight:'clamp(24px,5vw,80px)' }}>
          <div className="animate-fade-up" style={{ animationDelay:'0.1s', animationFillMode:'both', display:'inline-flex', alignItems:'center', gap:'10px', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.15)', borderRadius:'999px', padding:'8px 20px', marginBottom:'24px' }}>
            <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#C9A84C', display:'inline-block', animation:'goldPulse 2s ease-in-out infinite' }} />
            <span style={{ color:'rgba(201,168,76,0.7)', fontFamily:'Inter, sans-serif', fontSize:'9px', letterSpacing:'0.4em', textTransform:'uppercase' }}>Sacred Music</span>
          </div>
          <div className="animate-fade-up" style={{ animationDelay:'0.2s', animationFillMode:'both' }}>
            <div className="font-display" style={{ fontSize:'clamp(36px,5.5vw,82px)', fontWeight:300, color:'rgba(255,255,255,0.9)', lineHeight:0.92, letterSpacing:'-2px', marginBottom:'4px' }}>Music That Moves</div>
            <div className="font-display text-gradient-gold" style={{ fontSize:'clamp(36px,5.5vw,82px)', fontWeight:700, fontStyle:'italic', lineHeight:0.95, letterSpacing:'-2px' }}>The Soul.</div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay:'0.3s', animationFillMode:'both', display:'flex', alignItems:'center', gap:'14px', marginTop:'20px', flexWrap:'wrap', justifyContent:'flex-start' }}>
            {['Sacred Music','Live Worship','Prophetic Sound'].map((r,i,a) => (
              <span key={r} style={{ display:'flex', alignItems:'center', gap:'14px' }}>
                <span style={{ color:'rgba(201,168,76,0.6)', fontFamily:'Inter, sans-serif', fontSize:'10px', letterSpacing:'0.25em', textTransform:'uppercase' }}>{r}</span>
                {i < a.length-1 && <span style={{ color:'rgba(201,168,76,0.2)', fontSize:'16px' }}>·</span>}
              </span>
            ))}
          </div>
          <div className="animate-fade-up" style={{ animationDelay:'0.4s', animationFillMode:'both', marginTop:'28px' }}>
            <Link href={CHANNEL_URL} target="_blank" className="btn-gold-pill" style={{ fontSize:'11px' }}>Subscribe on YouTube</Link>
          </div>
        </div>
      </section>

      <section style={{ padding:'clamp(24px,4vw,60px)' }} className="reveal">
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'24px' }}>
          <div style={{ height:'1px', width:'28px', background:'rgba(201,168,76,0.5)' }} />
          <span style={{ color:'rgba(201,168,76,0.5)', fontFamily:'Inter, sans-serif', fontSize:'9px', letterSpacing:'0.35em', textTransform:'uppercase' }}>Latest Release</span>
          <div style={{ height:'1px', flex:1, background:'linear-gradient(to right,rgba(201,168,76,0.2),transparent)' }} />
        </div>
        <div style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(201,168,76,0.15)', borderRadius:'24px', overflow:'hidden', transition:'border-color 0.4s, box-shadow 0.4s' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor='rgba(201,168,76,0.35)'; e.currentTarget.style.boxShadow='0 24px 60px rgba(201,168,76,0.08)' }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor='rgba(201,168,76,0.15)'; e.currentTarget.style.boxShadow='none' }}>
          <div style={{ height:'2px', background:'linear-gradient(to right,transparent,#C9A84C,transparent)' }} />
          <div className="featured-track-grid">
            <div className="featured-video-panel">
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center,rgba(201,168,76,0.06) 0%,transparent 70%)', zIndex:1, pointerEvents:'none' }} />
              {!playerReady ? (
                <div style={{ position:'absolute', inset:0, cursor:'pointer', zIndex:2, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'12px' }} onClick={() => setPlayerReady(true)}>
                  <img src={`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`} alt="Rivers of Joy" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.6 }} onError={(e) => { (e.target as HTMLImageElement).src=`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg` }} />
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(6,14,6,0.6) 0%,rgba(6,14,6,0.2) 100%)' }} />
                  <div style={{ position:'relative', zIndex:3, width:'64px', height:'64px', borderRadius:'50%', background:'rgba(201,168,76,0.15)', border:'2px solid rgba(201,168,76,0.5)', display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)', transition:'all 0.25s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background='rgba(201,168,76,0.35)'; e.currentTarget.style.transform='scale(1.08)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background='rgba(201,168,76,0.15)'; e.currentTarget.style.transform='scale(1)' }}>
                    <div style={{ width:0, height:0, borderTop:'12px solid transparent', borderBottom:'12px solid transparent', borderLeft:'20px solid #C9A84C', marginLeft:'4px' }} />
                  </div>
                  <div style={{ position:'absolute', bottom:'14px', left:'14px', zIndex:3, display:'flex', alignItems:'center', gap:'8px', background:'rgba(0,0,0,0.7)', backdropFilter:'blur(8px)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'8px', padding:'5px 12px' }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#ef4444', display:'inline-block', animation:'goldPulse 1.5s ease-in-out infinite' }} />
                    <span style={{ color:'rgba(255,255,255,0.8)', fontFamily:'Inter, sans-serif', fontSize:'9px', letterSpacing:'0.15em', textTransform:'uppercase' }}>Live Recording · MDWE</span>
                  </div>
                  <span style={{ position:'relative', zIndex:3, color:'rgba(255,255,255,0.5)', fontFamily:'Inter, sans-serif', fontSize:'11px', letterSpacing:'0.1em' }}>Tap to play</span>
                </div>
              ) : (
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`} title="Rivers of Joy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:2 }} />
              )}
            </div>
            <div className="featured-info-panel">
              {/* Decorative CSS waveform */}
              <div style={{ display:'flex', alignItems:'flex-end', gap:'3px', height:'32px', marginBottom:'20px', opacity:0.7 }}>
                {Array.from({length:18}).map((_,i) => (
                  <div key={i} className="wave-bar" style={{ height:`${12 + Math.abs(Math.sin(i*0.8))*20}px`, animationDelay:`${i*0.08}s` }} />
                ))}
              </div>
              <div>
                <div className="font-display" style={{ fontSize:'clamp(22px,3vw,38px)', fontWeight:300, color:'#F5F0E8', lineHeight:1, marginBottom:'5px', letterSpacing:'-0.5px' }}>Rivers of Joy</div>
                <div style={{ color:'rgba(201,168,76,0.65)', fontStyle:'italic', fontFamily:'Cormorant Garamond, serif', fontSize:'15px', marginBottom:'16px' }}>Solomon Stephen</div>
                <div style={{ height:'1px', background:'linear-gradient(90deg,rgba(201,168,76,0.25),transparent)', marginBottom:'16px' }} />
                <p style={{ color:'rgba(245,240,232,0.5)', fontFamily:'Inter, sans-serif', fontSize:'13px', lineHeight:1.8, marginBottom:'16px' }}>
                  There are moments in God&apos;s presence that cannot be scripted — only surrendered to. A live spontaneous prophetic worship experience from Solomon Stephen at MDWE (Mid Day Worship Experience). &ldquo;Rivers of Joy&rdquo; is a flowing encounter of joy, thanksgiving, and heartfelt praise — a river of worship rising from the Spirit within. Jesus said in John 7:38.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding:'0 clamp(24px,5vw,80px) clamp(32px,5vw,80px)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'28px' }} className="rv">
          <div style={{ height:'1px', width:'28px', background:'rgba(201,168,76,0.5)' }} />
          <span style={{ color:'rgba(201,168,76,0.5)', fontFamily:'Inter, sans-serif', fontSize:'9px', letterSpacing:'0.35em', textTransform:'uppercase' }}>More Music</span>
          <div style={{ height:'1px', flex:1, background:'linear-gradient(to right,rgba(201,168,76,0.2),transparent)' }} />
        </div>
        <div className="more-music-grid">
          {[
            { id:'dnGEWG_A3GA', title:'Alaabo Mi',  subtitle:'My Protector',          year:'Gospel',                    desc:"Alaabo mi means God my protector — a song delving into God's protective revelation, resonating with Psalm 91.", scripture:'Psalm 91',             lyric:'You are my fortress, my shield and my refuge — no evil shall come near.' },
            { id:'c8KAM_l151s', title:'Crossover',  subtitle:'From Darkness to Light', year:'Gospel',                    desc:'Through the finished work of Christ on the Cross we are translated from darkness to light.', scripture:'Colossians 1:13',       lyric:'From darkness into His marvellous light — the Cross is our passage.' },
            { id:'EPA7cFLHg2c', title:'Aiku',        subtitle:'The Immortal One',       year:"Gospel · Prod. O'keys Music", desc:'Aiku — the Immortal One. A song heralding the encounter with the resurrected Jesus.', scripture:'1 Corinthians 15:55', lyric:'Death has no sting, the grave has no victory — He lives forevermore.' },
          ].map((track) => <MusicCard key={track.id} track={track} />)}
        </div>
        <div style={{ marginTop:'40px', paddingBottom:'8px' }}>
          <Link href={CHANNEL_URL} target="_blank" className="btn-gold-pill" style={{ fontSize:'12px' }}>Watch More on YouTube</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
