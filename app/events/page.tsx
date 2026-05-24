'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '@/components/usePageReveal'

const events = [
  { tag: 'Every Wednesday · Noon', name: 'Mid Day Worship Experience', short: 'MDWE', desc: 'A corporate worship and prophetic devotion encounter designed to shift the atmosphere of your week. Every Wednesday at noon, TWN gathers to press into the presence of God — in song, in prayer, in prophetic declaration.', highlight: 'Every Wednesday at 12:00 PM' },
  { tag: 'Last Saturday Before Final Sunday', name: 'The Slaughter House', short: 'TSH', desc: 'A high-energy night of worship and declaration in the throne room. Intense. Transformative. Unforgettable. TSH is a consecrated gathering where the atmosphere shifts and chains break.', highlight: 'Last Saturday Before Final Sunday' },
  { tag: 'Last Sunday of Every Month', name: 'Synantesis', short: 'SYN', desc: 'Encountering Jesus in an atmosphere of Word, prayer, and prophetic ministry. Synantesis — from the Greek meaning "to meet with" — is a sacred gathering where believers come face to face with the living Christ.', highlight: 'Last Sunday of Every Month' },
]

function CollapsibleMap({ address }: { address: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass rounded-3xl" style={{ overflow:'hidden' }}>
      <div className="h-[2px]" style={{ background:'linear-gradient(to right,transparent,rgba(201,168,76,0.6),transparent)' }} />
      <div style={{ padding:'28px 28px 0' }}>
        <p style={{ color:'#C9A84C', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:500, marginBottom:'8px' }}>Find Us</p>
        <h3 className="font-display text-white font-light" style={{ fontSize:'clamp(20px,2.5vw,38px)', marginBottom:'6px' }}>
          TWN <span className="text-gradient-gold font-semibold">Studios</span>
        </h3>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:'14px', marginBottom:'20px', lineHeight:1.6 }}>{address}</p>
        <button
          onClick={() => setOpen(!open)}
          style={{ display:'flex', alignItems:'center', gap:'8px', background:'rgba(201,168,76,0.06)', border:'1px solid rgba(201,168,76,0.2)', borderRadius:'999px', padding:'9px 18px', cursor:'pointer', marginBottom: open ? '0' : '28px', transition:'all 0.25s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background='rgba(201,168,76,0.12)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background='rgba(201,168,76,0.06)' }}
        >
          <span style={{ color:'#C9A84C', fontSize:'10px', letterSpacing:'0.15em', textTransform:'uppercase', fontFamily:'Inter, sans-serif' }}>{open ? 'Hide Map' : 'Show Map'}</span>
          <span style={{ color:'#C9A84C', fontSize:'14px', transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.3s', display:'inline-block' }}>▾</span>
        </button>
      </div>
      <div style={{ maxHeight: open ? '420px' : '0', overflow:'hidden', transition:'max-height 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ padding:'16px 0 0' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1675887445563!2d3.5813646750302173!3d6.500457123430608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc825df64c1%3A0xdbfac0f53ff1fdf2!2sTWN%20STUDIOS!5e0!3m2!1sen!2sng!4v1775255468341!5m2!1sen!2sng"
            width="100%" height="320"
            style={{ border:0, display:'block' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      {!open && <div style={{ height: 4 }} />}
    </div>
  )
}

export default function EventsPage() {
  usePageReveal()
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main className="bg-[#060e06] min-h-screen overflow-x-hidden page-entry">
      <style>{`
        .event-card-inner { display:grid; grid-template-columns:1fr; gap:20px; }
        @media(min-width:768px) { .event-card-inner { grid-template-columns:1fr 1fr; gap:40px; } }
        .event-card-body { padding:24px 20px; }
        @media(min-width:768px) { .event-card-body { padding:48px 56px; } }
        .event-desc-toggle { display:flex; align-items:center; gap:6px; background:none; border:none; padding:0; cursor:pointer; margin-top:8px; color:rgba(201,168,76,0.5); font-family:'Inter',sans-serif; font-size:10px; letter-spacing:0.15em; text-transform:uppercase; }
        @media(min-width:768px) { .event-desc-toggle { display:none; } }
        .event-desc-text { overflow:hidden; transition:max-height 0.4s cubic-bezier(0.16,1,0.3,1); }
      `}</style>

      <section className="page-hero" style={{ minHeight:'60vh' }}>
        <div className="page-hero-bg" />
        <div className="page-hero-orb" style={{ top:'-10%', right:'-8%' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background:'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)' }} />
        <div className="container-custom relative z-10" style={{ paddingTop:'160px', paddingBottom:'80px' }}>
          <div className="badge-pill animate-fade-up" style={{ animationDelay:'0.1s', animationFillMode:'both', display:'inline-flex', marginBottom:'32px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />TWN Gatherings
          </div>
          <h1 className="font-display text-white font-light lg:whitespace-nowrap animate-fade-up" style={{ fontSize:'clamp(28px,4.5vw,66px)', lineHeight:1.0, animationDelay:'0.2s', animationFillMode:'both', marginBottom:'28px' }}>
            Join The <span className="text-gradient-gold font-semibold">Movement</span>
          </h1>
          <p className="animate-fade-up" style={{ animationDelay:'0.35s', animationFillMode:'both' }}>
            {['MDWE','The Slaughter House','Synantesis'].map((r,i,a) => (
              <span key={r}>
                <span style={{ color:'rgba(201,168,76,0.65)', fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase' }}>{r}</span>
                {i < a.length-1 && <span style={{ color:'rgba(201,168,76,0.25)', margin:'0 14px' }}>·</span>}
              </span>
            ))}
          </p>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-padding">
        <div className="container-custom events-grid">
          {events.map((event, idx) => (
            <div key={event.name} className="glass rounded-3xl card-hover rv" style={{ overflow:'hidden' }}>
              <div className="h-[2px]" style={{ background:'linear-gradient(to right,transparent,rgba(201,168,76,0.6),transparent)' }} />
              <div className="event-card-body">
                <div className="event-card-inner">
                  <div>
                    <div style={{ marginBottom:'16px' }}>
                      <span style={{ color:'#C9A84C', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:500 }}>{event.tag}</span>
                      <h2 className="font-display text-white font-light" style={{ fontSize:'clamp(22px,3vw,44px)', lineHeight:1.05, margin:'12px 0 6px' }}>{event.name}</h2>
                      <p className="font-display font-semibold text-gradient-gold" style={{ fontSize:'clamp(18px,2vw,26px)' }}>{event.short}</p>
                    </div>
                    <div className="section-divider" style={{ marginBottom:'16px' }} />
                    <div className="event-desc-text" style={{ maxHeight: expandedEvent === idx ? '400px' : '0px' }}>
                      <p style={{ color:'rgba(255,255,255,0.55)', fontSize:'14px', lineHeight:1.85, paddingBottom:'8px' }}>{event.desc}</p>
                    </div>
                    <p className="hidden md:block" style={{ color:'rgba(255,255,255,0.55)', fontSize:'14px', lineHeight:1.85 }}>{event.desc}</p>
                    <button className="event-desc-toggle" onClick={() => setExpandedEvent(expandedEvent === idx ? null : idx)}>
                      {expandedEvent === idx ? 'Read less ▴' : 'Read more ▾'}
                    </button>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                    <div className="glass-gold rounded-xl" style={{ padding:'16px 20px' }}>
                      <p style={{ color:'#C9A84C', fontSize:'10px', letterSpacing:'0.2em', textTransform:'uppercase', fontWeight:500, marginBottom:'8px' }}>Schedule</p>
                      <p className="text-white font-medium" style={{ fontSize:'14px' }}>{event.highlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-padding reveal">
        <div className="container-custom">
          <div className="glass rounded-3xl card-hover" style={{ padding: '32px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                <span style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Missed the stream?</span>
              </div>
              <h2 className="font-display text-white font-light" style={{ fontSize: 'clamp(24px,3.5vw,38px)', lineHeight: 1.05 }}>Catch up on past livestreams from TWN.</h2>
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', lineHeight: 1.75, maxWidth: '760px' }}>
                Watch the best moments from MDWE, The Slaughter House, and Synantesis in one curated archive. Stream here or go straight to YouTube for the full experience.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link href="/youtube-live" className="btn-gold-pill">Browse Livestream Archive</Link>
                <Link href="https://youtube.com/@thesolomonsteph" target="_blank" className="btn-outline-pill">Open YouTube Channel</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-padding rv">
        <div className="container-custom">
          <CollapsibleMap address="Kenny T. Kay Building (Green Tall Building), Beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos" />
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-padding rv">
        <div className="container-custom">
          <div className="glass rounded-3xl card-hover text-center" style={{ padding:'clamp(40px,6vw,64px) clamp(20px,5vw,48px)', overflow:'hidden' }}>
            <div className="h-[2px]" style={{ background:'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)', marginBottom:'36px' }} />
            <h3 className="font-display text-white font-light" style={{ fontSize:'clamp(20px,3vw,44px)', lineHeight:1.0, marginBottom:'20px' }}>
              Come As You Are. <span className="text-gradient-gold font-semibold">Leave Transformed.</span>
            </h3>
            <div className="section-divider" style={{ maxWidth:'160px', margin:'0 auto 24px' }} />
            <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'15px', maxWidth:'440px', margin:'0 auto 36px', lineHeight:1.7 }}>
              All gatherings are free and open to everyone. Come hungry for God and ready to encounter His presence.
            </p>
            <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
              <Link href="/contact" className="btn-gold-pill">Get In Touch</Link>
              <Link href="/about" className="btn-outline-pill">Learn More About TWN</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
