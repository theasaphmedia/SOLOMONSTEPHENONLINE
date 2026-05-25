'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const services = [
  { num: '01', title: 'Recording',          sub: 'Vocal · Instrument · Full Band',       desc: 'Acoustically treated rooms built for clarity, warmth, and depth. Capture every nuance of your sound in an atmosphere consecrated for excellence.' },
  { num: '02', title: 'Mixing & Mastering', sub: 'Stereo · Stems · Streaming-Ready',     desc: 'World-class mix engineering that translates across all playback systems — from studio monitors to earphones. Final masters ready for every platform.' },
  { num: '03', title: 'Music Production',   sub: 'Beats · Arrangement · Orchestration',  desc: 'Full production from concept to final track — sonic identity crafted with intention and skill. Beats, live instrumentation, or full orchestration.' },
  { num: '04', title: 'Video Recording',    sub: 'Studio · Live · Documentary',          desc: 'High-quality video production for music videos, ministry content, live captures, and brand documentaries. Story told through image and sound.' },
  { num: '05', title: 'Live Streaming',     sub: 'Multi-Platform · Broadcast-Quality',   desc: 'Professional live stream setups for church services, concerts, conferences, and personal broadcasts — broadcast-quality from a consecrated space.' },
  { num: '06', title: 'Event Hosting',      sub: 'Up to 60 Guests · Full AV Support',    desc: 'Host intimate concerts, showcase events, listening parties, and leadership gatherings. Full audio/visual support, warm atmosphere, up to 60 guests.' },
]

export default function StudiosPage() {
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv { opacity:0; transform:translateY(32px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv-left { opacity:0; transform:translateX(-40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-left.is-visible { opacity:1; transform:none; }
        .rv-right { opacity:0; transform:translateX(40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-right.is-visible { opacity:1; transform:none; }
        .rv-scale { opacity:0; transform:scale(0.94); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-scale.is-visible { opacity:1; transform:none; }
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes pulse-glow{0%,100%{opacity:1}50%{opacity:.55}}
        @keyframes heroIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .svc-row { border-top:1px solid rgba(201,168,76,0.15); padding:clamp(28px,3.5vw,48px) 0;
          display:grid; grid-template-columns:clamp(48px,6vw,80px) clamp(140px,18vw,240px) 1fr;
          align-items:start; gap:clamp(16px,3vw,48px); transition:background 0.4s cubic-bezier(0.16,1,0.3,1); cursor:default; }
        .svc-row:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .svc-row:hover { background:rgba(201,168,76,0.04); }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform:scale(1.04); }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ background:'#0A1408', minHeight:'92vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(120px,14vw,180px) clamp(24px,4vw,80px) clamp(56px,7vw,100px)', position:'relative', overflow:'hidden' }}>
        {/* Background image */}
        <div style={{ position:'absolute', inset:0, zIndex:0 }}>
          <Image src="/images/worship-atmosphere-bg.jpg" alt="TWN Studios" fill style={{ objectFit:'cover', objectPosition:'center', opacity:0.2 }} priority />
        </div>
        {/* Layered gradients */}
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to top, #0A1408 45%, rgba(10,20,8,0.75) 72%, rgba(10,20,8,0.45) 100%)' }} />
        <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(to right, #0A1408 0%, transparent 60%)' }} />
        {/* Animated orbs */}
        <div style={{ position:'absolute', width:'550px', height:'550px', borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)', top:'-100px', right:'2%', animation:'float 10s ease-in-out infinite', pointerEvents:'none', zIndex:2 }} />
        <div style={{ position:'absolute', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)', bottom:'100px', left:'35%', animation:'pulse-glow 8s ease-in-out 1.5s infinite', pointerEvents:'none', zIndex:2 }} />
        {/* Vertical rule */}
        <div style={{ position:'absolute', top:0, bottom:0, left:'clamp(24px,4vw,80px)', width:'1px', background:'linear-gradient(to bottom, transparent, rgba(201,168,76,0.15) 25%, rgba(201,168,76,0.15) 75%, transparent)', pointerEvents:'none', zIndex:3 }} />
        {/* Content */}
        <div style={{ position:'relative', zIndex:4, maxWidth:'900px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            TWN Studios
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,118px)', fontWeight:400, lineHeight:0.92, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,44px)', letterSpacing:'-0.025em' }}>
            <span className="wc"><span className="wi">Where</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.07s', color:'#C9A84C' }}>Craft</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.14s' }}>Meets</span></span>{' '}
            <span className="wc"><span className="wi" style={{ animationDelay:'0.21s' }}>Calling.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.9, color:'rgba(250,247,242,0.5)', maxWidth:'480px', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.55s both' }}>
            Not merely a business. A consecrated space in Ajah, Lagos — purpose-built for artists and ministers who refuse to separate excellence from anointing.
          </p>
          {/* Stat strip */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'0', marginTop:'clamp(36px,4.5vw,64px)', borderTop:'1px solid rgba(201,168,76,0.1)', paddingTop:'clamp(18px,2.5vw,28px)', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 0.8s both' }}>
            {['6 Services', '60+ Guests', 'Acoustically Treated', 'Ajah, Lagos'].map((s, i) => (
              <div key={s} style={{ paddingRight:'clamp(16px,2.5vw,40px)', paddingLeft: i > 0 ? 'clamp(16px,2.5vw,40px)' : 0, borderLeft: i > 0 ? '1px solid rgba(201,168,76,0.15)' : 'none' }}>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(8px,0.9vw,10px)', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(201,168,76,0.6)' }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:'clamp(28px,3.5vw,48px)', right:'clamp(24px,4vw,80px)', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', animation:'heroIn 1s cubic-bezier(0.16,1,0.3,1) 1s both', zIndex:4 }}>
          <div style={{ fontFamily:'DM Sans', fontSize:'9px', letterSpacing:'0.3em', color:'rgba(201,168,76,0.45)', textTransform:'uppercase', writingMode:'vertical-rl' }}>Scroll</div>
          <div style={{ width:'1px', height:'48px', background:'linear-gradient(to bottom, rgba(201,168,76,0.45), transparent)' }} />
        </div>
      </section>

      {/* ── Vision ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Space</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,52px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15, marginBottom:'clamp(20px,2.5vw,32px)' }}>
              Excellence is not<br />an <em style={{ color:'#C9A84C' }}>option here.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'24px' }}>
              TWN Studios was born from a conviction that the space where you create shapes what you create. Situated in the Kenny T. Kay Building on Langbasa Road, Ajah, Lagos — the studio is acoustically treated, professionally equipped, and spiritually consecrated.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'clamp(28px,4vw,48px)' }}>
              Artists, ministers, content creators, and brands have found in TWN Studios not just a facility, but a collaborative partner — a team that cares about the integrity of your vision as much as you do.
            </p>
            <div className="rv d4" style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
              {[
                { label:'Location', value:'Kenny T. Kay Building, beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos' },
                { label:'Capacity',  value:'Up to 60 guests for live events' },
                { label:'Email',    value:'theasaphmedia@gmail.com' },
              ].map(d => (
                <div key={d.label} style={{ display:'flex', gap:'16px' }}>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'#C9A84C', minWidth:'80px', paddingTop:'2px' }}>{d.label}</span>
                  <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', lineHeight:1.6, color:'#3D4B3D' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }} className="rv-right">
            {[
              { src:'/images/stage-lights-concert.jpg', alt:'Stage lights' },
              { src:'/images/event-hosting.jpg',        alt:'Event hosting' },
              { src:'/images/live-streaming.jpg',       alt:'Live streaming' },
              { src:'/images/video-recording.jpg',      alt:'Video recording' },
            ].map((img, i) => (
              <div key={i} className="img-zoom rv-scale" style={{ transitionDelay:`${i*0.07}s`, borderRadius:'2px', overflow:'hidden', aspectRatio:'1', position:'relative' }}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit:'cover' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background:'#F0EBE1', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ marginBottom:'clamp(40px,5vw,72px)' }}>What We Do</div>
          <div>
            {services.map((s, i) => (
              <div key={s.title} className={`svc-row rv`} style={{ transitionDelay:`${i*0.06}s` }}
                onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              >
                <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', color:'#C9A84C' }}>{s.num}</span>
                <div>
                  <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,3vw,38px)', fontWeight:400, color: hovered === i ? '#C9A84C' : '#0D1B0D', transition:'color 0.3s' }}>{s.title}</div>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.1em', color:'#8A9A8A', marginTop:'4px' }}>{s.sub}</div>
                </div>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.8, color:'#3D4B3D' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1000px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:'clamp(40px,5vw,80px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(20px,2.5vw,32px)' }}>Book a Session</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,5.5vw,64px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1 }}>
              Your sound is<br />waiting to be <em style={{ color:'#C9A84C' }}>heard.</em>
            </h2>
          </div>
          <div className="rv d2" style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.8, color:'rgba(250,247,242,0.6)' }}>
              Ready to record, produce, shoot, or stream? Reach out and let us talk about how TWN Studios can serve your vision.
            </p>
            <div style={{ display:'flex', gap:'16px', flexWrap:'wrap' }}>
              <Link href="/contact" style={{
                fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
                padding:'14px 32px', background:'#C9A84C', color:'#0D1B0D', textDecoration:'none', fontWeight:500,
                transition:'background 0.3s, transform 0.3s'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#E8C96A'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#C9A84C'; (e.currentTarget as HTMLElement).style.transform='none' }}
              >Book a Session</Link>
              <a href="https://www.instagram.com/twnstudiosglobal" target="_blank" rel="noopener noreferrer" style={{
                fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
                padding:'14px 32px', border:'1px solid rgba(201,168,76,0.35)', color:'rgba(250,247,242,0.7)', textDecoration:'none',
                transition:'all 0.3s'
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.color='rgba(250,247,242,0.7)' }}
              >Follow @twnstudiosglobal</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
