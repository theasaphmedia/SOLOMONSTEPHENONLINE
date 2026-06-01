'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const testimonials = [
  {
    quote: "Solomon Stephen's worship is not performance — it is encounter. Every time he leads, something shifts in the room.",
    name: "Pastor Emmanuel Eze",
    title: "Senior Pastor, Lagos",
  },
  {
    quote: "CROSSOVER was the soundtrack of my year. The anointing on that project is tangible — you feel it in your spirit.",
    name: "Adaeze Okonkwo",
    title: "Listener, Enugu",
  },
  {
    quote: "I attended MDWE for the first time not knowing what to expect. I left a different person. That midweek gathering changed my life.",
    name: "Tunde Adeyemi",
    title: "MDWE Attendee, Lagos",
  },
  {
    quote: "The Slaughter House is not for the faint-hearted — and that is exactly why it is powerful. It strips everything away.",
    name: "Chisom Nwosu",
    title: "TSH Attendee",
  },
]

function TestimonialsSection() {
  return (
    <section style={{ background:'#F7F4F0', padding:'clamp(80px,10vw,130px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth:'1280px', margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:'clamp(48px,6vw,80px)' }}>
          <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.65)', marginBottom:'20px' }}>What People Say</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,5.5vw,64px)', fontWeight:400, color:'#111240', lineHeight:1.05, margin:0, letterSpacing:'-.01em' }}>
            Changed by <em style={{ color:'#C9A84C' }}>presence.</em>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'clamp(20px,3vw,36px)' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{
              background:'#FFFFFF',
              padding:'clamp(28px,3.5vw,44px)',
              borderTop:'2px solid rgba(201,168,76,0.25)',
              display:'flex', flexDirection:'column', gap:'20px',
              transition:'transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow='0 16px 48px rgba(17,18,64,0.07)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='none'; (e.currentTarget as HTMLElement).style.boxShadow='none' }}
            >
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(15px,1.6vw,19px)', fontStyle:'italic', color:'rgba(17,18,64,0.72)', lineHeight:1.75, flex:1 }}>
                &ldquo;{t.quote}&rdquo;
              </div>
              <div style={{ borderTop:'1px solid rgba(17,18,64,0.08)', paddingTop:'16px' }}>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', fontWeight:500, color:'#111240', marginBottom:'4px' }}>{t.name}</div>
                <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'.08em', color:'rgba(17,18,64,0.4)', textTransform:'uppercase' }}>{t.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      if (!res.ok) throw new Error('Failed')
      setSent(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }, [email, name])

  return (
    <section style={{ background:'#0D1B0D', borderTop:'1px solid rgba(201,168,76,0.1)', padding:'clamp(72px,10vw,120px) clamp(24px,4vw,80px)' }}>
      <div style={{ maxWidth:'640px', margin:'0 auto', textAlign:'center' }}>
        <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'.4em', textTransform:'uppercase', color:'rgba(201,168,76,0.5)', marginBottom:'clamp(20px,3vw,32px)' }}>Stay Connected</div>
        <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(36px,6vw,64px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.05, margin:'0 0 clamp(16px,2vw,24px)', letterSpacing:'-.01em' }}>
          Don&apos;t miss a <em style={{ color:'#C9A84C' }}>moment.</em>
        </h2>
        <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(13px,1.4vw,15px)', lineHeight:1.85, color:'rgba(250,247,242,0.4)', margin:'0 0 clamp(32px,4vw,48px)' }}>
          New music, gatherings, books, and updates — delivered when it matters.
        </p>

        {sent ? (
          <div style={{ padding:'32px', border:'1px solid rgba(201,168,76,0.25)', background:'rgba(201,168,76,0.05)' }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(20px,3vw,28px)', color:'#C9A84C', marginBottom:'8px' }}>You&apos;re in.</div>
            <div style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px', color:'rgba(250,247,242,0.45)', letterSpacing:'.05em' }}>Check your inbox for a welcome note.</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width:'100%', background:'rgba(250,247,242,0.04)', border:'1px solid rgba(250,247,242,0.1)', color:'#FAF7F2', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', padding:'14px 18px', outline:'none', boxSizing:'border-box', transition:'border-color .3s' }}
              onFocus={e => (e.target.style.borderColor='rgba(201,168,76,0.4)')}
              onBlur={e => (e.target.style.borderColor='rgba(250,247,242,0.1)')}
            />
            <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
              <input
                type="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ flex:1, minWidth:'200px', background:'rgba(250,247,242,0.04)', border:'1px solid rgba(250,247,242,0.1)', color:'#FAF7F2', fontFamily:"'DM Sans',sans-serif", fontSize:'14px', padding:'14px 18px', outline:'none', boxSizing:'border-box', transition:'border-color .3s' }}
                onFocus={e => (e.target.style.borderColor='rgba(201,168,76,0.4)')}
                onBlur={e => (e.target.style.borderColor='rgba(250,247,242,0.1)')}
              />
              <button type="submit" disabled={loading}
                style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'.2em', textTransform:'uppercase', padding:'14px 28px', background:'#C9A84C', color:'#0D1B0D', border:'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, transition:'opacity .3s,background .3s', whiteSpace:'nowrap', fontWeight:500 }}
              >
                {loading ? 'Sending…' : 'Subscribe'}
              </button>
            </div>
            {error && <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'12px', color:'rgba(220,100,100,0.8)', margin:0 }}>{error}</p>}
          </form>
        )}
      </div>
    </section>
  )
}


const HERO_IMG = { src: '/images/solomon-green-suit-hero.png', pos: '55% 0%' }

const stats = [
  { value: 3,    suffix: '',  label: 'Monthly Gatherings' },
  { value: 6,    suffix: '+', label: 'Original Releases' },
  { value: 4,    suffix: '',  label: 'Published Books' },
]

const pillars = [
  { num: '01', title: 'Ministry', sub: 'The Worship Nation', desc: 'Three recurring gatherings each month — MDWE, TSH, and Synantesis — creating spaces for authentic encounter with God.', href: '/events',   img: '/images/gallery-congregation-worship.jpg' },
  { num: '02', title: 'Music',    sub: 'Original Worship',   desc: 'Songs born from personal devotion and shaped into anthems for corporate worship — sound that ushers in the presence of God.', href: '/music',    img: '/images/gallery-solomon-worship-raise.jpg' },
  { num: '03', title: 'Studios',  sub: 'TWN Studios',        desc: 'A world-class recording and production space in Ajah, Lagos — built for Kingdom-minded creatives who refuse to compromise.', href: '/studios',  img: '/images/studio-home.png' },
  { num: '04', title: 'Books',    sub: 'Published Works',    desc: 'Written with the same theological depth that marks his spoken ministry — truths that place the reader in direct confrontation with Scripture.', href: '/books',   img: '/images/book-home.png' },
]

const tracks = [
  { id: 'c8KAM_l151s', title: 'CROSSOVER' },
  { id: 'EPA7cFLHg2c', title: 'AIKU' },
  { id: '6TYabI5QCO4', title: 'Awesome God' },
]

const books = [
  { title: 'The Cost of Ignorance',   img: '/images/book-cost-of-ignorance.png',    href: 'https://selar.com/v8561k6070',    comingSoon: false },
  { title: 'Sons Not Slaves (March)', img: '/images/book-sons-not-slaves-march.png', href: 'https://selar.com/41x076wbk1',    comingSoon: false },
  { title: 'Sons Not Slaves (April)', img: '/images/book-sons-not-slaves-april.png', href: 'https://selar.com/8z43781b2n',    comingSoon: false },
  { title: 'Go In This Thy Might',    img: '/images/book-go-in-this-thy-might.png',   href: '',                                comingSoon: true  },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const duration = 1600
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{count}{suffix}</span>
}

export default function HomePage() {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null)
  const [hoveredBook, setHoveredBook] = useState<number | null>(null)
  const [announcements, setAnnouncements] = useState<{id:string;title:string;body:string;link:string;link_label:string}[]>([])

  useEffect(() => {
    fetch('/api/announcements').then(r => r.json()).then(data => {
      if (Array.isArray(data)) setAnnouncements(data)
    }).catch(() => {})
  }, [])


  useEffect(() => {
    // Scroll reveal
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-right, .rv-scale').forEach(el => obs.observe(el))

    return () => { obs.disconnect() }
  }, [])

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      {/* ANNOUNCEMENTS BANNER */}
      {announcements.map(a => (
        <div key={a.id} style={{ background:'#C9A84C', color:'#080E08', padding:'12px clamp(20px,4vw,48px)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'16px', flexWrap:'wrap' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase' }}>Announcement</span>
            <span style={{ width:'1px', height:'14px', background:'rgba(8,14,8,0.25)', display:'inline-block' }} />
            <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'13px' }}>{a.title}{a.body ? ` — ${a.body}` : ''}</span>
          </div>
          {a.link && (
            <a href={a.link} target='_blank' rel='noopener noreferrer' style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#080E08', border:'1px solid rgba(8,14,8,0.3)', padding:'6px 14px', borderRadius:'2px', textDecoration:'none', whiteSpace:'nowrap' }}>
              {a.link_label || 'Learn More'}
            </a>
          )}
        </div>
      ))}

      <style>{`
        .rv { opacity:0; transform:translateY(32px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv-left { opacity:0; transform:translateX(-40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-left.is-visible { opacity:1; transform:none; }
        .rv-right { opacity:0; transform:translateX(40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-right.is-visible { opacity:1; transform:none; }
        .rv-scale { opacity:0; transform:scale(0.94); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-scale.is-visible { opacity:1; transform:none; }
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s} .d5{transition-delay:.40s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1.1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        .eyebrow-light{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:rgba(201,168,76,0.7);display:flex;align-items:center;gap:12px;}
        .eyebrow-light::before{content:\'\';width:28px;height:1px;background:rgba(201,168,76,0.7);}
        .slide-img { position:absolute; transition:opacity 1.4s cubic-bezier(0.16,1,0.3,1); }
        .pillar-card { position:relative; overflow:hidden; aspect-ratio:3/4; cursor:pointer; }
        .pillar-card img { transition:transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .pillar-card:hover img { transform:scale(1.06); }
        .book-card { overflow:hidden; border-radius:2px; transition:transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s; }
        .book-card:hover { transform:translateY(-8px); box-shadow:0 24px 56px rgba(13,27,13,0.12); }
        .book-card img { transition:transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .book-card:hover img { transform:scale(1.04); }
        .marquee-wrap { overflow:hidden; }
        .marquee-track { display:flex; width:max-content; animation:marquee 28s linear infinite; }
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .gathering-row { border-top:1px solid rgba(201,168,76,0.15); padding:clamp(20px,2.5vw,32px) 0; display:grid; grid-template-columns:clamp(60px,8vw,100px) 1fr auto; align-items:center; gap:clamp(16px,3vw,48px); }
        .gathering-row:last-child { border-bottom:1px solid rgba(201,168,76,0.15); }
        .hide-mobile { display:flex; }
        .cta-outline { display:inline-block;font-family:'DM Sans',sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;padding:16px 48px;border:1px solid rgba(201,168,76,0.45);color:#C9A84C;text-decoration:none;transition:background 0.3s,border-color 0.3s; }
        .cta-outline:hover { background:rgba(201,168,76,0.08); border-color:#C9A84C; }
        .hero-h1 { font-family:'Cormorant Garamond',serif; font-weight:400; font-size:clamp(72px,13vw,148px); line-height:0.9; color:#FAF7F2; margin:0 0 clamp(24px,3vw,40px); letter-spacing:-0.02em; }
        .hero-sub { font-family:'DM Sans',sans-serif; font-size:clamp(13px,1.4vw,17px); line-height:1.75; color:rgba(250,247,242,0.6); max-width:460px; margin-bottom:clamp(32px,4vw,52px); }
        .hero-eyebrow { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(201,168,76,0.75); display:flex; align-items:center; gap:10px; margin-bottom:clamp(18px,2.2vw,30px); }
        .slide-dots { position:absolute; bottom:32px; right:28px; z-index:3; display:flex; flex-direction:column; gap:8px; }
        @media(max-width:768px) {
          .hide-mobile { display:none; }
          .pillar-grid { grid-template-columns:1fr 1fr !important; }
          .hero-h1 { font-size:clamp(60px,16vw,96px) !important; }
          .hero-sub { display:none; }
          .hero-side-label { display:none; }
          .gathering-row { grid-template-columns:auto 1fr !important; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section style={{ height:'100vh', minHeight:'600px', position:'relative', overflow:'hidden', background:'#0D1B0D' }}>

        {/* Single hero image — full bleed */}
        <Image src={HERO_IMG.src} alt="Solomon Stephen" fill priority
          style={{ objectFit:'cover', objectPosition:'55% 12%' }}
        />

        {/* Layer 1 — bottom vignette (deep, protects text) */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(8,18,8,0.97) 0%, rgba(8,18,8,0.80) 30%, rgba(8,18,8,0.30) 58%, transparent 82%)', zIndex:1 }} />
        {/* Layer 2 — left vignette (strong, text legibility) */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(8,18,8,0.82) 0%, rgba(8,18,8,0.50) 30%, rgba(8,18,8,0.10) 55%, transparent 72%)', zIndex:1 }} />
        {/* Layer 3 — top vignette (navbar area) */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:'200px', background:'linear-gradient(to bottom, rgba(8,18,8,0.60) 0%, transparent 100%)', zIndex:1 }} />

        {/* Vertical side label — desktop only */}
        <div className="hero-side-label" style={{ position:'absolute', right:'clamp(20px,2.5vw,40px)', top:'50%', transform:'translateY(-50%) rotate(90deg)', transformOrigin:'center center', zIndex:2, fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'0.38em', textTransform:'uppercase', color:'rgba(201,168,76,0.45)', whiteSpace:'nowrap' }}>
          The Worship Nation · Lagos, Nigeria
        </div>

        {/* Main content — bottom-left */}
        <div style={{ position:'absolute', inset:0, zIndex:2, display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'0 clamp(24px,5vw,96px) clamp(24px,3vw,36px)' }}>

          {/* Name */}
          <h1 className="hero-h1">
            <span className="wc"><span className="wi">Solomon</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.12s', color:'#C9A84C' }}>Stephen.</span></span>
          </h1>

          {/* Role tags — replaces redundant eyebrow */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'8px', margin:'clamp(8px,1vw,14px) 0 clamp(20px,2.5vw,32px)' }}>
            {['Worship Leader', 'Music Producer', 'Author', 'Studio Founder'].map(role => (
              <span key={role} style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(250,247,242,0.55)', padding:'6px 14px', border:'1px solid rgba(250,247,242,0.15)', display:'inline-block' }}>
                {role}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
            <Link href="/music" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', padding:'14px 36px', background:'#C9A84C', color:'#0D1B0D', textDecoration:'none', fontWeight:600, display:'inline-block' }}>
              Listen to Music
            </Link>
            <Link href="/about" style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', padding:'14px 36px', border:'1px solid rgba(250,247,242,0.28)', color:'rgba(250,247,242,0.8)', textDecoration:'none', display:'inline-block' }}>
              The Story →
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════ INTRO QUOTE ══════════════ */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'clamp(48px,7vw,100px)', alignItems:'center' }}>
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(24px,3vw,40px)' }}>About Solomon</div>
            <p className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,3.5vw,38px)', fontWeight:400, fontStyle:'italic', lineHeight:1.5, color:'#0D1B0D', marginBottom:'clamp(20px,2.5vw,32px)' }}>
              &ldquo;There are rare individuals in whom vision and vocation converge so completely that it becomes impossible to separate the person from the purpose.&rdquo;
            </p>
            <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.85, color:'#3D4B3D', marginBottom:'clamp(28px,3.5vw,48px)' }}>
              In a generation hungry for authenticity, Solomon Stephen is the real thing. Gospel minister, worship leader, music producer, published author, studio founder — not occupying these identities sequentially, but living each one simultaneously.
            </p>
            <Link href="/about" className="rv d3" style={{
              display:'inline-flex', alignItems:'center', gap:'12px',
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase', color:'#0D1B0D', textDecoration:'none',
              borderBottom:'1px solid rgba(201,168,76,0.4)', paddingBottom:'6px', transition:'color 0.3s, border-color 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='#C9A84C'; (e.currentTarget as HTMLElement).style.borderColor='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='#0D1B0D'; (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.4)' }}
            >Read His Story <span>→</span></Link>
          </div>

          <div className="rv-scale" style={{ position:'relative' }}>
            <div style={{ borderRadius:'2px', overflow:'hidden', aspectRatio:'4/5', position:'relative' }}>
              <Image src="/images/solomon-photo.png" alt="Solomon Stephen" fill style={{ objectFit:'cover', objectPosition:'top' }} />
            </div>
            <div style={{ position:'absolute', top:'-12px', left:'-12px', width:36, height:36, borderTop:'2px solid #C9A84C', borderLeft:'2px solid #C9A84C' }} />
            <div style={{ position:'absolute', bottom:'-12px', right:'-12px', width:36, height:36, borderBottom:'2px solid #C9A84C', borderRight:'2px solid #C9A84C' }} />
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section style={{ background:'#1A2E1A', padding:'clamp(64px,8vw,100px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px,1fr))', gap:'clamp(32px,5vw,64px)' }}>
          {stats.map((s, i) => (
            <div key={s.label} className={`rv d${i+1}`} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(48px,7vw,80px)', fontWeight:300, color:'#C9A84C', lineHeight:1, marginBottom:'8px' }}>
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(250,247,242,0.45)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ FOUR PILLARS ══════════════ */}
      <section style={{ background:'#F0EBE1', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
            <div>
              <div className="eyebrow rv" style={{ marginBottom:'16px' }}>What He Does</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(36px,5vw,60px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1 }}>Many Callings.<br />One Life.</h2>
            </div>
          </div>
          <div className="pillar-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'clamp(8px,1.5vw,16px)' }}>
            {pillars.map((p, i) => (
              <Link key={p.href} href={p.href}
                className={`pillar-card rv-scale d${i+1}`}
                style={{ textDecoration:'none', display:'block' }}
                onMouseEnter={() => setHoveredPillar(i)} onMouseLeave={() => setHoveredPillar(null)}
              >
                <Image src={p.img} alt={p.title} fill style={{ objectFit:'cover' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,27,13,0.88) 0%, rgba(13,27,13,0.3) 55%, transparent 80%)', transition:'background 0.4s' }} />
                <div style={{ position:'absolute', inset:0, padding:'clamp(16px,2vw,28px)', display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)', marginBottom:'8px' }}>{p.num} · {p.sub}</div>
                  <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,3vw,36px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1, marginBottom:'10px' }}>{p.title}</div>
                  <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', lineHeight:1.7, color:'rgba(250,247,242,0.65)', maxHeight: hoveredPillar === i ? '120px' : '0px', overflow:'hidden', transition:'max-height 0.5s cubic-bezier(0.16,1,0.3,1)' }}>{p.desc}</p>
                  <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', color:'#C9A84C', marginTop:'8px', opacity: hoveredPillar === i ? 1 : 0, transform: hoveredPillar === i ? 'translateY(0)' : 'translateY(8px)', transition:'opacity 0.35s, transform 0.35s' }}>Explore →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ MUSIC ══════════════ */}
      <section style={{ background:'#FAF7F2', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(32px,4vw,56px)' }}>
            <div>
              <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Music</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1 }}>Sound from the<br /><em style={{ color:'#C9A84C' }}>Secret Place.</em></h2>
            </div>
            <Link href="/music" className="rv d2" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase',
              padding:'12px 28px', border:'1px solid rgba(201,168,76,0.35)', color:'#3D4B3D', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.color='#3D4B3D' }}
            >All Music →</Link>
          </div>

          {/* Track grid — 3 columns on desktop */}
          <div className="rv" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))', gap:'clamp(10px,1.5vw,16px)' }}>
            {tracks.map((t, i) => (
              <a key={t.id} href={`https://www.youtube.com/watch?v=${t.id}`} target="_blank" rel="noopener noreferrer"
                className="rv-scale"
                style={{ textDecoration:'none', transitionDelay:`${i * 0.06}s`, display:'block', borderRadius:'2px', overflow:'hidden', aspectRatio:'16/9', position:'relative' }}
              >
                <Image src={`https://img.youtube.com/vi/${t.id}/hqdefault.jpg`} alt={t.title} fill unoptimized
                  style={{ objectFit:'cover', transition:'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform='scale(1.06)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform='none' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(13,27,13,0.85) 0%, transparent 55%)' }} />
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'clamp(8px,1.2vw,14px)' }}>
                  <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', fontWeight:500, color:'#FAF7F2', margin:0, letterSpacing:'0.04em' }}>{t.title}</p>
                </div>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'36px', height:'36px', borderRadius:'50%', background:'rgba(201,168,76,0.85)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity='1' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity='0' }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="4,2 12,7 4,12" fill="#1A2E1A"/></svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ GATHERINGS ══════════════ */}
      <section style={{ background:'#1A2E1A', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
            <div>
              <div className="eyebrow-light rv" style={{ marginBottom:'16px' }}>Gatherings</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.1 }}>Every month.<br /><em style={{ color:'#C9A84C' }}>Every time.</em></h2>
            </div>
            <Link href="/events" className="rv d2" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase',
              padding:'12px 28px', border:'1px solid rgba(201,168,76,0.3)', color:'rgba(201,168,76,0.8)', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.color='rgba(201,168,76,0.8)' }}
            >All Events →</Link>
          </div>

          {[
            { code:'MDWE', name:'Mid Day Worship Experience', when:'Every Wednesday · 12:00 PM', desc:'A mid-week worship gathering designed to shift the atmosphere of your week.' },
            { code:'TSH',  name:'The Slaughter House',        when:'Last Saturday before the final Sunday', desc:'High-intensity worship, intercession, and consecration. Not a comfortable meeting.' },
            { code:'Synantesis', name:'The Divine Appointment', when:'Last Sunday of every month', desc:'From the Greek for "divine appointment" — deep worship and the full weight of the Word.' },
          ].map((g, i) => (
            <div key={g.code} className={`gathering-row rv d${i+1}`}>
              <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,3vw,32px)', fontWeight:400, color:'#C9A84C' }}>{g.code}</div>
              <div>
                <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.1em', color:'rgba(201,168,76,0.55)', marginBottom:'6px' }}>{g.when}</div>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,2.5vw,30px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.2 }}>{g.name}</div>
              </div>
              <p className="hide-mobile" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'13px', lineHeight:1.75, color:'rgba(250,247,242,0.5)', maxWidth:'300px' }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ BOOKS ══════════════ */}
      <section style={{ background:'#F0EBE1', padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:'24px', marginBottom:'clamp(40px,5vw,64px)' }}>
            <div>
              <div className="eyebrow rv" style={{ marginBottom:'16px' }}>Books</div>
              <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,5vw,56px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.1 }}>Words that<br /><em style={{ color:'#C9A84C' }}>outlast moments.</em></h2>
            </div>
            <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer" className="rv d2" style={{
              fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase',
              padding:'12px 28px', border:'1px solid rgba(201,168,76,0.35)', color:'#3D4B3D', textDecoration:'none', transition:'all 0.3s'
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor='rgba(201,168,76,0.35)'; (e.currentTarget as HTMLElement).style.color='#3D4B3D' }}
            >Browse on Selar →</a>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'clamp(16px,2.5vw,28px)' }}>
            {books.map((b, i) => (
              b.comingSoon ? (
                <div key={b.title}
                  className="book-card rv-scale"
                  style={{ transitionDelay:`${i * 0.08}s`, display:'block', background:'#1A2E1A', cursor:'default' }}
                >
                  <div style={{ aspectRatio:'3/4', position:'relative', overflow:'hidden', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 24px', textAlign:'center' }}>
                    <Image src={b.img} alt={b.title} fill style={{ objectFit:'cover', objectPosition:'top', opacity:0.12 }} />
                    <div style={{ position:'relative', zIndex:1 }}>
                      <div style={{ width:40, height:1, background:'rgba(201,168,76,0.6)', margin:'0 auto 20px' }} />
                      <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(201,168,76,0.7)', marginBottom:'16px' }}>Coming Soon</div>
                      <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,2.5vw,28px)', fontWeight:400, color:'#FAF7F2', lineHeight:1.3, marginBottom:'20px' }}>{b.title}</div>
                      <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'12px', lineHeight:1.75, color:'rgba(250,247,242,0.45)' }}>A companion to <em style={{ color:'rgba(250,247,242,0.65)' }}>Go In This Thy Might</em> — arriving soon.</p>
                      <div style={{ width:40, height:1, background:'rgba(201,168,76,0.3)', margin:'20px auto 0' }} />
                    </div>
                  </div>
                </div>
              ) : (
                <a key={b.title} href={b.href} target="_blank" rel="noopener noreferrer"
                  className="book-card rv-scale"
                  style={{ textDecoration:'none', transitionDelay:`${i * 0.08}s`, display:'block', background:'#fff' }}
                  onMouseEnter={() => setHoveredBook(i)} onMouseLeave={() => setHoveredBook(null)}
                >
                  <div style={{ aspectRatio:'3/4', position:'relative', overflow:'hidden' }}>
                    <Image src={b.img} alt={b.title} fill style={{ objectFit:'cover', objectPosition:'top' }} />
                    <div style={{ position:'absolute', inset:0, background:'rgba(13,27,13,0.4)', opacity: hoveredBook === i ? 1 : 0, transition:'opacity 0.4s', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase', color:'#C9A84C' }}>Read →</span>
                    </div>
                  </div>
                  <div style={{ padding:'clamp(14px,2vw,20px)' }}>
                    <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(16px,2vw,22px)', fontWeight:400, color:'#0D1B0D', lineHeight:1.3 }}>{b.title}</p>
                  </div>
                </a>
              )
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div style={{ background:'#C9A84C', padding:'clamp(16px,2vw,24px) 0', overflow:'hidden' }}>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {['MDWE', '·', 'TSH', '·', 'Synantesis', '·', 'TWN Studios', '·', 'The Worship Nation', '·', 'CROSSOVER', '·', 'AIKU', '·', 'Alagbada Ina', '·',
              'MDWE', '·', 'TSH', '·', 'Synantesis', '·', 'TWN Studios', '·', 'The Worship Nation', '·', 'CROSSOVER', '·', 'AIKU', '·', 'Alagbada Ina', '·'
            ].map((word, i) => (
              <span key={i} style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.24em', textTransform:'uppercase', color:'#0D1B0D', padding:'0 clamp(16px,2vw,28px)', whiteSpace:'nowrap' }}>{word}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ CTA ══════════════ */}
      <section style={{ background:'#1A2E1A', padding:'clamp(80px,10vw,140px) clamp(24px,4vw,80px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:'700px', margin:'0 auto' }}>
          {/* Gold corner brackets */}
          <div style={{ position:'absolute', top:'-20px', left:'50%', transform:'translateX(-50%)', width:'min(400px, 80vw)', height:'100%', pointerEvents:'none' }}>
            <div style={{ position:'absolute', top:0, left:0, width:32, height:32, borderTop:'1px solid rgba(201,168,76,0.4)', borderLeft:'1px solid rgba(201,168,76,0.4)' }} />
            <div style={{ position:'absolute', top:0, right:0, width:32, height:32, borderTop:'1px solid rgba(201,168,76,0.4)', borderRight:'1px solid rgba(201,168,76,0.4)' }} />
            <div style={{ position:'absolute', bottom:0, left:0, width:32, height:32, borderBottom:'1px solid rgba(201,168,76,0.4)', borderLeft:'1px solid rgba(201,168,76,0.4)' }} />
            <div style={{ position:'absolute', bottom:0, right:0, width:32, height:32, borderBottom:'1px solid rgba(201,168,76,0.4)', borderRight:'1px solid rgba(201,168,76,0.4)' }} />
          </div>

          <div className="eyebrow-light rv" style={{ justifyContent:'center', marginBottom:'clamp(24px,3vw,40px)' }}>Connect</div>
          <h2 className="rv d1" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(44px,8vw,96px)', fontWeight:400, color:'#FAF7F2', lineHeight:1, marginBottom:'clamp(20px,2.5vw,36px)', letterSpacing:'-0.01em' }}>
            His <em style={{ color:'#C9A84C' }}>Presence.</em>
          </h2>
          <p className="rv d2" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.5vw,16px)', lineHeight:1.8, color:'rgba(250,247,242,0.55)', marginBottom:'clamp(32px,4vw,56px)' }}>
            Every great work begins with a conversation. Whether ministry, music, studio, or digital — reach out.
          </p>
          <Link href="/contact" className="rv d3 cta-outline">Get In Touch</Link>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <TestimonialsSection />

      {/* ══ NEWSLETTER ══ */}
      <NewsletterSection />

      <Footer />
    </main>
  )
}
