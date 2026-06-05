'use client'
import React from 'react'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

const inquiryTypes = [
  { id: 'ministry',  label: 'Ministry & Speaking',  desc: 'Invite Solomon to minister at your church, conference, or event' },
  { id: 'studio',    label: 'TWN Studios',           desc: 'Booking for recording, mixing, video, streaming, or events' },
  { id: 'digital',   label: 'TAI Digital',           desc: 'Website, app development, or brand/design project' },
  { id: 'music',     label: 'Music & Collaboration', desc: 'Music partnerships, licensing, or creative collaboration' },
  { id: 'general',   label: 'General Inquiry',       desc: 'Anything else on your mind' },
]

const contactPoints = [
  { label: 'Instagram', handle: '@thesolomonsteph',        url: 'https://www.instagram.com/thesolomonsteph' },
  { label: 'YouTube',   handle: '@thesolomonsteph',        url: 'https://www.youtube.com/@thesolomonsteph' },
  { label: 'Facebook',  handle: 'thesolomonsteph',         url: 'https://www.facebook.com/thesolomonsteph' },
  { label: 'TikTok',    handle: '@thesolomonsteph',        url: 'https://www.tiktok.com/@thesolomonsteph' },
  { label: 'Email',     handle: 'theasaphmedia@gmail.com', url: 'mailto:theasaphmedia@gmail.com' },
]

export default function ContactPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv, .rv-left, .rv-right').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: name.split(' ')[0] || name,
          lastName: name.split(' ').slice(1).join(' ') || '',
          email,
          subject: selected || '',
          message,
          _honeypot: '',
        }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      setName(''); setEmail(''); setMessage(''); setSelected(null)
    } catch {
      setError('Something went wrong. Please email theasaphmedia@gmail.com directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '14px 0', background: 'transparent',
    border: 'none', borderBottom: '1px solid rgba(201,168,76,0.25)',
    fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#0D1B0D',
    outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' as const,
  }

  return (
    <main style={{ background: '#FAF7F2', overflowX: 'hidden' }}>
      <style>{`
        .rv { opacity:0; transform:translateY(32px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv-left { opacity:0; transform:translateX(-40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-left.is-visible { opacity:1; transform:none; }
        .rv-right { opacity:0; transform:translateX(40px); transition:opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
        .rv-right.is-visible { opacity:1; transform:none; }
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s} .d4{transition-delay:.32s}
        .wc{display:inline-block;overflow:hidden;vertical-align:bottom;}
        .wi{display:inline-block;animation:wordIn 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wordIn{from{transform:translateY(108%)}to{transform:translateY(0)}}
        .eyebrow{font-family:'DM Sans',sans-serif;font-size:10px;letter-spacing:0.32em;text-transform:uppercase;color:#C9A84C;display:flex;align-items:center;gap:12px;}
        .eyebrow::before{content:\'\';width:28px;height:1px;background:#C9A84C;}
        input:focus, textarea:focus { border-bottom-color:#C9A84C !important; }
        input::placeholder, textarea::placeholder { color:#8A9A8A; }
        textarea { resize:vertical; min-height:120px; }
        .inq-btn { padding:clamp(14px,2vw,20px) clamp(16px,2.5vw,28px); border:1px solid rgba(201,168,76,0.2); background:transparent;
          font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.08em; color:#3D4B3D;
          cursor:pointer; transition:all 0.35s cubic-bezier(0.16,1,0.3,1); text-align:left; }
        .inq-btn:hover { border-color:#C9A84C; color:#C9A84C; background:rgba(201,168,76,0.04); }
        .inq-btn.active { border-color:#C9A84C; background:rgba(201,168,76,0.08); color:#C9A84C; }
        .social-link { display:flex; justify-content:space-between; align-items:center; padding:clamp(14px,2vw,20px) 0;
          border-top:1px solid rgba(201,168,76,0.12); text-decoration:none; transition:padding-left 0.35s cubic-bezier(0.16,1,0.3,1); }
        .social-link:last-child { border-bottom:1px solid rgba(201,168,76,0.12); }
        .social-link:hover { padding-left:8px; }
      `}</style>

      {/* ── Hero ── */}
      <section style={{ height:'100vh', minHeight:'600px', background:'#1A2E1A', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(100px,12vw,140px) clamp(24px,4vw,80px) clamp(64px,8vw,100px)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 15% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'relative', maxWidth:'900px' }}>
          <div className="eyebrow rv" style={{ color:'rgba(201,168,76,0.7)', marginBottom:'clamp(24px,3vw,40px)' }}>
            <span style={{ width:28, height:1, background:'rgba(201,168,76,0.7)', display:'inline-block' }} />
            Contact
          </div>
          <h1 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(52px,10vw,110px)', fontWeight:400, lineHeight:1, color:'#FAF7F2', margin:'0 0 clamp(24px,3vw,40px)', letterSpacing:'-0.02em' }}>
            <span className="wc"><span className="wi">Every great</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.1s', color:'#C9A84C' }}>work begins</span></span><br />
            <span className="wc"><span className="wi" style={{ animationDelay:'0.18s' }}>with a conversation.</span></span>
          </h1>
        </div>
      </section>

      {/* ── Main ── */}
      <section style={{ padding:'clamp(72px,9vw,120px) clamp(24px,4vw,80px)', background:'#FAF7F2' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px,1fr))', gap:'clamp(56px,7vw,120px)', alignItems:'start' }}>

          {/* Form */}
          <div>
            <div className="eyebrow rv" style={{ marginBottom:'clamp(28px,3.5vw,48px)' }}>Send a Message</div>

            {/* Inquiry type */}
            <p className="rv d1" style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'#8A9A8A', marginBottom:'16px' }}>What is this about?</p>
            <div className="rv d2" style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(160px,1fr))', gap:'10px', marginBottom:'clamp(32px,4vw,56px)' }}>
              {inquiryTypes.map(t => (
                <button key={t.id} className={`inq-btn${selected === t.id ? ' active' : ''}`} onClick={() => setSelected(t.id)}>
                  <div style={{ fontWeight:500, marginBottom:'4px' }}>{t.label}</div>
                  <div style={{ fontSize:'11px', color:'inherit', opacity:0.65, lineHeight:1.5 }}>{t.desc}</div>
                </button>
              ))}
            </div>

            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'32px' }} className="rv d3">
                <div>
                  <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#8A9A8A', display:'block', marginBottom:'8px' }}>Your Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Solomon Stephen" required style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#8A9A8A', display:'block', marginBottom:'8px' }}>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="hello@example.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontFamily:'DM Sans, sans-serif', fontSize:'10px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#8A9A8A', display:'block', marginBottom:'8px' }}>Your Message</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell Solomon what's on your mind..." required style={{ ...inputStyle, resize:'vertical', minHeight:'120px' }} />
                </div>
                {error && <p style={{ fontFamily:"DM Sans,sans-serif", fontSize:"13px", color:"#C0392B", marginBottom:"8px" }}>{error}</p>}
                <button type="submit" disabled={loading} style={{
                  alignSelf:'flex-start', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase',
                  padding:'16px 40px', background:'#1A2E1A', color:'#FAF7F2', border:'none', cursor:'pointer',
                  transition:'background 0.3s, transform 0.3s'
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#2A4A2A'; (e.currentTarget as HTMLElement).style.transform='translateY(-2px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='#1A2E1A'; (e.currentTarget as HTMLElement).style.transform='none' }}
                >{loading ? 'Sending…' : 'Send Message →'}</button>
              </form>
            ) : (
              <div style={{ padding:'40px', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', textAlign:'center' }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,4vw,42px)', color:'#C9A84C', marginBottom:'12px' }}>Message sent.</div>
                <p style={{ fontFamily:'DM Sans, sans-serif', fontSize:'14px', lineHeight:1.8, color:'#3D4B3D' }}>Your email client should open. If not, email directly at theasaphmedia@gmail.com</p>
                <button onClick={() => setSent(false)} style={{ marginTop:'24px', fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.16em', textTransform:'uppercase', background:'none', border:'none', color:'#C9A84C', cursor:'pointer' }}>Send Another</button>
              </div>
            )}
          </div>

          {/* Right side info */}
          <div className="rv-right">
            <div style={{ marginBottom:'clamp(40px,5vw,64px)' }}>
              <div className="eyebrow" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>Direct Contact</div>
              {contactPoints.map(c => (
                <a key={c.label} href={c.url} target={c.url.startsWith('mailto') ? '_self' : '_blank'} rel="noopener noreferrer"
                  className="social-link"
                >
                  <div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color:'#C9A84C', marginBottom:'4px' }}>{c.label}</div>
                    <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'15px', color:'#0D1B0D' }}>{c.handle}</div>
                  </div>
                  <span style={{ color:'#C9A84C', fontSize:'18px' }}>→</span>
                </a>
              ))}
            </div>

            <div className="rv d1">
              <div className="eyebrow" style={{ marginBottom:'clamp(20px,2.5vw,32px)' }}>Studio Location</div>
              <div style={{ fontFamily:'DM Sans, sans-serif', fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.9, color:'#3D4B3D' }}>
                Kenny T. Kay Building<br />
                Beside Azkol Fuel Station<br />
                Langbasa Road, Ajah<br />
                Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
