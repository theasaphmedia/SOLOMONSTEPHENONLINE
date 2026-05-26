'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const services = [
  { num: '01', title: 'Web Design & Development', desc: 'Premium websites built on Next.js, React, and modern frameworks. From concept to Vercel deployment — animated, responsive, world-class.' },
  { num: '02', title: 'Mobile Application',       desc: 'Cross-platform Flutter applications with robust backends. Built for real users, scaled for growth. Supabase, API integrations, full-stack.' },
  { num: '03', title: 'Brand Identity',            desc: 'Logos, visual systems, typography, colour palettes — the entire language that tells the world who you are before you speak a word.' },
  { num: '04', title: 'UI/UX Design',              desc: 'Wireframes, prototypes, and design systems built in Figma. Interfaces that feel inevitable — intuitive, beautiful, purposeful.' },
]

const portfolio = [
  {
    num: '01',
    name: 'ttconline.org',
    title: 'The Transformation Camp',
    stack: 'Next.js · TypeScript · Framer Motion',
    desc: 'A multi-page website for a transformative Christian camp ministry. Light design, rich animations, real content. Built to represent a movement — and it does.',
    url: 'https://ttconline.org',
    img: '/images/solomon-green-blazer-tai.png',
    label: 'Ministry Website',
  },
  {
    num: '02',
    name: 'PulpitFlow',
    title: 'The Real-Time Preaching System',
    stack: 'Flutter · Riverpod · Supabase · API.Bible',
    desc: 'A cross-platform mobile app redefining how ministers prepare and deliver messages. Replaces printed sermon notes, WhatsApp scripture screenshots, and hand signals to projectionists with one seamless, beautiful system.',
    url: '#',
    img: '/images/solomon-photo2.png',
    label: 'Mobile App — Pending Google Play',
  },
  {
    num: '03',
    name: 'solomonstephen.com',
    title: 'This Website',
    stack: 'Next.js · TypeScript · React 19',
    desc: 'The personal website of Solomon Stephen — gospel minister, worship leader, author, and entrepreneur. A showcase of what TAI Digital builds: animated, content-rich, world-class.',
    url: 'https://solomonstephen.com',
    img: '/images/solomon-green-suit-hero.png',
    label: 'Personal Brand Website',
  },
]

export default function TaiDigitalPage() {
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
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .svc-row { border-top:1px solid rgba(201,168,76,0.15); padding:clamp(28px,3.5vw,48px) 0;
          display:grid; grid-template-columns:clamp(48px,6vw,80px) clamp(160px,22vw,280px) 1fr;
          align-items:start; gap:clamp(16px,3vw,48px); transition:background 0.4s; }
        .svc-row:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .svc-row:hover { background:rgba(201,168,76,0.04); }
        .portfolio-card { background:#fff; border-radius:2px; overflow:hidden; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s cubic-bezier(0.16,1,0.3,1); }
        .portfolio-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(13,27,13,0.12); }
        .img-zoom { overflow:hidden; }
        .img-zoom img { transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .portfolio-card:hover .img-zoom img { transform:scale(1.04); }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ height:'100vh', minHeight:'600px', background:'#1A2E1A', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(100px,12vw,140px) clamp(24px,4vw,80px) clamp(64px,8vw,100px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 90% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:'clamp(24px,6vw,80px)', bottom:0, width:'clamp(200px,30vw,380px)', aspectRatio:'3/4', zIndex:0, opacity:0.18 }}>
          <Image src="/images/solomon-green-blazer-tai.png" alt="" fill style={{ objectFit:'cover', objectPosition:'top' }} />
        </div>
        <div style={{ position:'relative', zIndex:1, maxWidth:'800px' }}>
          <div className="eyebrow" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)' }}>
            <span style={{ width:28, height:1, background:'rgba(201,168,76,0.7)', display:'inline-block' }} />
            TAI Digital
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,100px)', fontWeight:400, lineHeight:1, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,40px)', letterSpacing:'-0.02em' }}>
            <span className="wc"><span className="wi">The Asaph</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.1s', color:'#C9A84C' }}>Innovations.</span></span>
          </h1>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,17px)', lineHeight:1.8, color:'rgba(250,247,242,0.6)', maxWidth:'520px', marginBottom:'16px' }}>
            Premium web design, application development, and brand identity — named after Asaph, the master musician and seer appointed by King David.
          </p>
          <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', lineHeight:1.8, color:'rgba(250,247,242,0.4)' }}>
            Excellence is the only standard. Anything else is a disservice to the client.
          </p>
        </div>
      </section>

      {/* ── About TAI ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#F0EBE1' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'clamp(48px,6vw,96px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>The Agency</div>
            <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,52px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.15, marginBottom:'clamp(20px,2.5vw,32px)' }}>
              We build things that<br />make people <em style={{ color:'#C9A84C' }}>stop scrolling.</em>
            </h2>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'24px' }}>
              TAI Digital — The Asaph Innovations — is the digital arm of Solomon Stephen's work. It builds premium digital experiences for businesses, ministries, and individuals who understand that their online presence is not a checkbox, but a first impression that must be extraordinary.
            </p>
            <p className="rv d3" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'clamp(28px,4vw,48px)' }}>
              Named after Asaph — the master musician, choir leader, and prophetic seer appointed by King David — TAI Digital carries that DNA into the digital age: creativity, excellence, and the conviction that what we make should carry meaning.
            </p>
            <a href="mailto:theasaphinnovations@gmail.com" className="rv d4" style={{
              display:'inline-block', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'14px 32px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#2A4A2A'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1A2E1A'; (e.currentTarget as HTMLElement).style.transform='none' }}
            >Start a Project</a>
          </div>

          <div className="rv-right" style={{ display:'flex', flexDirection:'column', gap:'16px' }}>
            {[
              { stat:'3+',    label:'Projects Shipped' },
              { stat:'100%', label:'Client Satisfaction' },
              { stat:'∞',    label:'Attention to Detail' },
            ].map((s, i) => (
              <div key={s.stat} style={{ padding:'clamp(24px,3vw,36px)', border:'1px solid rgba(201,168,76,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'24px' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(40px,6vw,64px)', fontWeight:300, color:'#C9A84C', lineHeight:1 }}>{s.stat}</div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', letterSpacing:'0.12em', textTransform:'uppercase', color:'#3D4B3D', textAlign:'right' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background:'#FAF7F2', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ marginBottom:'clamp(40px,5vw,72px)' }}>What We Build</div>
          {services.map((s, i) => (
            <div key={s.num} className={`svc-row rv`} style={{ transitionDelay:`${i * 0.07}s` }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            >
              <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', color:'#C9A84C' }}>{s.num}</span>
              <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,3vw,36px)', fontWeight:400, color: hovered === i ? '#C9A84C' : '#0D1B0D', transition:'color 0.3s' }}>{s.title}</div>
              <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(13px,1.3vw,15px)', lineHeight:1.8, color:'#3D4B3D' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Portfolio ── */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(40px,5vw,72px)' }}>Selected Work</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'clamp(20px,3vw,32px)' }}>
            {portfolio.map((p, i) => (
              <a key={p.num} href={p.url} target={p.url === '#' ? '_self' : '_blank'} rel="noopener noreferrer"
                className={`portfolio-card rv-scale`}
                style={{ textDecoration:'none', transitionDelay:`${i * 0.1}s`, display:'block' }}
              >
                <div className="img-zoom" style={{ aspectRatio:'4/3', position:'relative', overflow:'hidden' }}>
                  <Image src={p.img} alt={p.name} fill style={{ objectFit:'cover', objectPosition:'top center' }} />
                  <div style={{ position:'absolute', inset:0, background:'rgba(13,27,13,0.4)' }} />
                  <div style={{ position:'absolute', top:'20px', left:'20px' }}>
                    <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(201,168,76,0.8)', padding:'6px 12px', border:'1px solid rgba(201,168,76,0.3)', background:'rgba(13,27,13,0.5)' }}>{p.label}</span>
                  </div>
                </div>
                <div style={{ padding:'clamp(20px,2.5vw,32px)', background:'rgba(255,255,255,0.03)' }}>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.2em', color:'rgba(201,168,76,0.6)', marginBottom:'8px' }}>{p.num} · {p.stack}</div>
                  <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,2.8vw,30px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.2, marginBottom:'8px' }}>{p.title}</h3>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', letterSpacing:'0.06em', color:'rgba(201,168,76,0.6)', marginBottom:'16px' }}>{p.name}</div>
                  <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', lineHeight:1.75, color:'rgba(250,247,242,0.5)' }}>{p.desc}</p>
                  {p.url !== '#' && (
                    <div style={{ marginTop:'20px', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A84C' }}>Visit site →</div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background:'#FAF7F2', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', textAlign:'center' }}>
        <div style={{ maxWidth:'700px', margin:'0 auto' }}>
          <div className="eyebrow rv" style={{ justifyContent:'center', marginBottom:'clamp(24px,3vw,40px)' }}>Work With Us</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,6vw,72px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1, marginBottom:'clamp(20px,2.5vw,32px)' }}>
            Your vision deserves<br />an <em style={{ color:'#C9A84C' }}>extraordinary presence.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.8, color:'#3D4B3D', marginBottom:'clamp(32px,4vw,56px)' }}>
            Whether you need a website, a mobile app, or a complete brand identity — TAI Digital is ready to build something you'll be proud to share.
          </p>
          <div className="rv d3" style={{ display:'flex', justifyContent:'center', gap:'16px', flexWrap:'wrap' }}>
            <a href="mailto:theasaphinnovations@gmail.com" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'16px 40px', background:'#1A2E1A', color:'#FAF7F2', textDecoration:'none', transition:'background 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#2A4A2A'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1A2E1A'; (e.currentTarget as HTMLElement).style.transform='none' }}
            >Start a Project</a>
            <a href="mailto:theasaphmedia@gmail.com" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase',
              padding:'16px 40px', border:'1px solid rgba(201,168,76,0.35)', color:'#3D4B3D', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.color='#3D4B3D' }}
            >theasaphinnovatio