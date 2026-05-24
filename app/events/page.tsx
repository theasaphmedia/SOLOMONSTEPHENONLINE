'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const gatherings = [
  {
    num:   '01',
    short: 'MDWE',
    name:  'Mid Day Worship Experience',
    when:  'Every Wednesday · 12:00 PM',
    desc:  'A corporate worship and prophetic devotion encounter designed to shift the atmosphere of your week. Every Wednesday at noon, TWN gathers to press into the presence of God — in song, in prayer, in prophetic declaration. Come as you are. Leave transformed.',
    img:   '/images/gallery-congregation-worship.jpg',
  },
  {
    num:   '02',
    short: 'TSH',
    name:  'The Slaughter House',
    when:  'Last Saturday Before Final Sunday',
    desc:  'A high-intensity night of worship and declaration in the throne room. Intense. Transformative. Unforgettable. TSH is a consecrated gathering where the atmosphere shifts, chains break, and believers are positioned for breakthrough. Prepare to encounter God in a new way.',
    img:   '/images/gallery-solomon-worship-intense.jpg',
  },
  {
    num:   '03',
    short: 'SYN',
    name:  'Synantesis',
    when:  'Last Sunday of Every Month',
    desc:  'Encountering Jesus in an atmosphere of Word, prayer, and prophetic ministry. Synantesis — from the Greek meaning "to meet with" — is a sacred gathering where believers come face to face with the living Christ. Come for the encounter. Leave with the encounter.',
    img:   '/images/gallery-solomon-kneeling-surrender.jpg',
  },
]

export default function EventsPage() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target) }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.rv').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <main style={{ background: '#060c06', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
        .rv.is-visible{opacity:1;transform:none;}
        .rv.d1{transition-delay:.12s}.rv.d2{transition-delay:.22s}.rv.d3{transition-delay:.32s}

        .wc{display:inline-block;overflow:hidden;}
        .wi{display:inline-block;animation:wi 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wi{from{transform:translateY(110%)}to{transform:translateY(0)}}

        /* Gathering section */
        .gathering {
          display: grid;
          min-height: clamp(520px,65vh,780px);
          border-top: 1px solid rgba(201,168,76,0.07);
          position: relative;
          overflow: hidden;
        }
        .gathering-even { grid-template-columns: 1fr 1fr; }
        .gathering-odd  { grid-template-columns: 1fr 1fr; direction: rtl; }
        .gathering-odd > * { direction: ltr; }

        .gathering-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(52px,7vw,100px) clamp(32px,4.5vw,72px);
          position: relative;
          z-index: 10;
        }

        .gathering-img {
          position: relative;
          overflow: hidden;
        }

        @media(max-width:768px){
          .gathering, .gathering-odd {
            grid-template-columns: 1fr;
            direction: ltr;
            min-height: auto;
          }
          .gathering-img { min-height: 55vw; order: -1; }
        }
      `}</style>

      {/* ════════════════════════════════════
          HERO — full-screen atmospheric
      ════════════════════════════════════ */}
      <section style={{ minHeight: '100svh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
        {/* Full-bleed worship photo */}
        <Image
          src="/images/worship-atmosphere-bg.jpg"
          alt="TWN Gatherings"
          fill priority
          style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
        />
        {/* Dark overlay — cinematic */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(6,12,6,0.4) 0%,rgba(6,12,6,0.2) 30%,rgba(6,12,6,0.6) 65%,rgba(6,12,6,0.97) 100%)' }} />
        {/* Left-side radial */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 20% 60%, rgba(26,46,26,0.3) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, padding: 'clamp(24px,4vw,56px)', paddingBottom: 'clamp(60px,8vw,100px)', paddingTop: '160px' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '40px' }}>
            <span className="wc"><span className="wi" style={{ animationDelay: '0.05s' }}>The Worship Nation · Lagos, Nigeria</span></span>
          </p>

          <div style={{ marginBottom: '40px', lineHeight: 0.88, maxWidth: '900px' }}>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,120px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-3px', animationDelay: '0.18s' }}>Where Heaven</span>
            </div>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,120px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-3px', animationDelay: '0.3s', background: 'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Touches Earth.</span>
            </div>
          </div>

          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#C9A84C,transparent)', marginBottom: '32px', animation: 'wi 0.7s 0.44s both' }} />

          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.9, color: 'rgba(245,240,232,0.4)', maxWidth: '480px', marginBottom: '52px', animation: 'wi 0.9s 0.5s both' }}>
            Three gatherings. One mission. Come and encounter God in an atmosphere consecrated for His presence.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'wi 0.9s 0.6s both' }}>
            <Link href="#gatherings" className="btn-gold-pill">See the Gatherings</Link>
            <Link href="/contact" className="btn-outline-pill">Get In Touch</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          GATHERINGS — alternating full-width
      ════════════════════════════════════ */}
      <section id="gatherings" style={{ background: '#040a04', borderTop: '1px solid rgba(201,168,76,0.05)' }}>
        <div style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,56px) 0' }}>
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>The Gatherings</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '72px' }}>
            Every Meeting,<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>An Encounter.</span>
          </h2>
        </div>

        {gatherings.map((g, i) => (
          <div key={g.num} className={`gathering rv${i % 2 === 0 ? ' gathering-even' : ' gathering-odd'}`} style={{ transitionDelay: `${i * 0.08}s`, background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>

            {/* Photo */}
            <div className="gathering-img">
              <Image
                src={g.img}
                alt={g.name}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: i % 2 === 0
                ? 'linear-gradient(to right, transparent 40%, #040a04 92%)'
                : 'linear-gradient(to left, transparent 40%, #040a04 92%)'
              }} />
              {/* Short code overlay */}
              <div style={{ position: 'absolute', bottom: 'clamp(24px,3vw,40px)', left: i % 2 === 0 ? 'clamp(24px,3vw,40px)' : 'auto', right: i % 2 !== 0 ? 'clamp(24px,3vw,40px)' : 'auto' }}>
                <span className="font-display" style={{ fontSize: 'clamp(48px,6vw,80px)', fontWeight: 700, color: 'rgba(201,168,76,0.15)', letterSpacing: '-2px' }}>{g.short}</span>
              </div>
            </div>

            {/* Content */}
            <div className="gathering-content" style={{ background: i % 2 === 0 ? '#040a04' : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                <span className="font-display" style={{ fontSize: 'clamp(44px,5vw,70px)', fontWeight: 700, color: 'rgba(201,168,76,0.07)', lineHeight: 1, letterSpacing: '-2px' }}>{g.num}</span>
              </div>

              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '14px' }}>
                {g.when}
              </div>

              <h2 className="font-display" style={{ fontSize: 'clamp(24px,3vw,44px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.8px', color: '#F5F0E8', marginBottom: '24px' }}>{g.name}</h2>

              <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.25)', marginBottom: '24px' }} />

              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(245,240,232,0.35)', lineHeight: 1.9, marginBottom: '36px', maxWidth: '480px' }}>{g.desc}</p>

              <Link href="/contact" className="btn-gold-pill" style={{ fontSize: '10px', alignSelf: 'flex-start' }}>
                Find Out More
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════
          LOCATION
      ════════════════════════════════════ */}
      <section style={{ background: '#060c06', borderTop: '1px solid rgba(201,168,76,0.05)', padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,56px)' }}>
        <div className="rv" style={{ marginBottom: '18px' }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Location</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,7vw,100px)', alignItems: 'start' }}>
          <div className="rv d1">
            <h2 className="font-display" style={{ fontSize: 'clamp(32px,4vw,60px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '36px' }}>
              All gatherings take place at<br />
              <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>TWN Studios.</span>
            </h2>
            <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.25)', marginBottom: '28px' }} />
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', color: 'rgba(245,240,232,0.38)', lineHeight: 1.95, marginBottom: '8px' }}>
              Kenny T. Kay Building (The Green Tall Building)<br />
              Beside Azkol Fuel Station<br />
              Langbasa Road, Ajah
            </p>
            <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', color: 'rgba(245,240,232,0.7)', fontWeight: 500, marginBottom: '40px' }}>Lagos, Nigeria</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/studios" className="btn-gold-pill" style={{ fontSize: '11px' }}>About the Studio</Link>
                            <a href="https://maps.google.com/?q=TWN+Studios+Langbasa+Road+Ajah+Lagos" target="_blank" rel="noopener noreferrer" className="btn-outline-pill" style={{ fontSize: '11px' }}>Get Directions ↗</a>
            </div>
          </div>

          <div className="rv d2" style={{ position: 'relative', minHeight: 'clamp(300px,40vh,500px)', border: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1675887445563!2d3.5813646750302173!3d6.500457123430608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc825df64c1%3A0xdbfac0f53ff1fdf2!2sTWN%20STUDIOS!5e0!3m2!1sen!2sng!4v1775255468341!5m2!1sen!2sng"
              width="100%" height="100%"
              style={{ position: 'absolute', inset: 0, border: 0, filter: 'invert(88%) hue-rotate(180deg) saturate(0.45) brightness(0.82)' }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="TWN Studios"
            />
            <div style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(6,12,6,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(201,168,76,0.2)', padding: '10px 16px', zIndex: 10 }}>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '11px', color: 'rgba(201,168,76,0.9)', fontWeight: 600 }}>TWN Studios</div>
              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', color: 'rgba(245,240,232,0.38)', marginTop: '2px' }}>All gatherings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: 'clamp(100px,13vw,180px) clamp(24px,4vw,56px)', background: '#1A2E1A', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 75% at 50% 50%,rgba(201,168,76,0.09) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {(['top-left','top-right','bottom-left','bottom-right'] as const).map(pos => {
          const [v, h] = pos.split('-') as ['top'|'bottom','left'|'right']
          return <div key={pos} style={{ position: 'absolute', [v]: '36px', [h]: '36px', width: '44px', height: '44px', [`border${v[0].toUpperCase()+v.slice(1)}`]: '1px solid rgba(201,168,76,0.14)', [`border${h[0].toUpperCase()+h.slice(1)}`]: '1px solid rgba(201,168,76,0.14)' }} />
        })}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div className="rv" style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>The Worship Nation</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-2.5px', color: '#F5F0E8', marginBottom: '32px' }}>
            There Is a Seat<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, background: 'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>With Your Name.</span>
          </h2>
          <div className="rv d2" style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: '32px' }} />
          <p className="rv d2" style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.95, color: 'rgba(245,240,232,0.32)', marginBottom: '52px' }}>
            Come and be part of what God is doing at The Worship Nation. Every gathering is an appointment.
          </p>
          <div className="rv d3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold-pill"    style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Get In Touch</Link>
            <Link href="/studios" className="btn-outline-pill" style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Find the Venue</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
