'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const inquiries = [
  { num: '01', label: 'Ministry & Speaking', desc: 'Invite Solomon to minister, speak, or lead worship at your event, conference, or church.' },
  { num: '02', label: 'Studio Bookings',     desc: 'Schedule a recording, mixing, production, video, or event hosting session at TWN Studios.' },
  { num: '03', label: 'Book Orders',         desc: 'Bulk orders for churches, groups, or personal orders of any published titles.' },
  { num: '04', label: 'General Enquiries',   desc: 'Any other questions, partnership opportunities, or media requests.' },
]

type FieldName = 'name' | 'email' | 'subject' | 'message'

type FormData = {
  name:    string
  email:   string
  subject: string
  message: string
}

export default function ContactPage() {
  const [form, setForm]   = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]   = useState(false)
  const [focus, setFocus] = useState<FieldName | null>(null)

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
    } catch {}
    setSent(true)
  }

  const fieldStyle = (name: FieldName): React.CSSProperties => ({
    width:           '100%',
    background:      'transparent',
    border:          'none',
    borderBottom:    `1px solid ${focus === name ? 'rgba(201,168,76,0.6)' : 'rgba(201,168,76,0.15)'}`,
    padding:         '14px 0',
    color:           '#F5F0E8',
    fontFamily:      'Inter,sans-serif',
    fontSize:        '15px',
    outline:         'none',
    transition:      'border-color 0.35s',
    display:         'block',
  })

  return (
    <main style={{ background: '#060c06', overflowX: 'hidden' }}>
      <style>{`
        .rv{opacity:0;transform:translateY(36px);transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1);}
        .rv.is-visible{opacity:1;transform:none;}
        .rv.d1{transition-delay:.12s}.rv.d2{transition-delay:.22s}.rv.d3{transition-delay:.32s}

        .wc{display:inline-block;overflow:hidden;}
        .wi{display:inline-block;animation:wi 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wi{from{transform:translateY(110%)}to{transform:translateY(0)}}

        /* Textarea override */
        textarea { resize: vertical; min-height: 100px; }
        ::placeholder { color: rgba(245,240,232,0.2); }

        /* Inquiry row */
        .inq-row {
          display: grid;
          grid-template-columns: clamp(32px,4vw,52px) 1fr;
          gap: clamp(18px,3vw,36px);
          padding: clamp(24px,3vw,36px) 0;
          border-top: 1px solid rgba(201,168,76,0.07);
          cursor: default;
          transition: background 0.35s;
        }
        .inq-row:last-child { border-bottom: 1px solid rgba(201,168,76,0.07); }
        .inq-row:hover { background: rgba(201,168,76,0.02); }

        /* Contact grid */
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px,7vw,100px); align-items: start; }
        @media(max-width:768px) { .contact-grid { grid-template-columns: 1fr; } }
      `}</style>

      {/* ════════════════════════════════════
          HERO — split: photo left, headline right
      ════════════════════════════════════ */}
      <section style={{ minHeight: '100svh', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden' }}>

        {/* Photo — bleeds to left edge */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/images/gallery-solomon-standing-deep.jpg"
            alt="Solomon Stephen"
            fill priority
            style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 40%, #060c06 100%), linear-gradient(to bottom, #060c06 0%, transparent 15%, transparent 80%, #060c06 100%)' }} />
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px,4vw,56px)', paddingTop: '140px', paddingBottom: 'clamp(60px,8vw,100px)', background: '#060c06' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '40px' }}>
            <span className="wc"><span className="wi" style={{ animationDelay: '0.05s' }}>Get In Touch</span></span>
          </p>

          <div style={{ marginBottom: '40px', lineHeight: 0.88 }}>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(48px,6.5vw,100px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-2.5px', animationDelay: '0.18s' }}>Let&apos;s Build</span>
            </div>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(48px,6.5vw,100px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-2.5px', animationDelay: '0.3s', background: 'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Something Eternal.</span>
            </div>
          </div>

          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#C9A84C,transparent)', marginBottom: '32px', animation: 'wi 0.7s 0.44s both' }} />

          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '14px', lineHeight: 1.9, color: 'rgba(245,240,232,0.38)', maxWidth: '380px', animation: 'wi 0.9s 0.5s both' }}>
            Whether you&apos;re reaching out for ministry, studio, books, or partnership — the door is open.
          </p>
        </div>

        {/* Mobile: full-cover background */}
        <style>{`@media(max-width:860px){
          section:first-of-type { grid-template-columns:1fr !important; }
          section:first-of-type > div:first-child { position:absolute; inset:0; width:100%; z-index:0; }
          section:first-of-type > div:last-child { position:relative; z-index:10; background:linear-gradient(to top,#060c06 50%,transparent) !important; padding-top:160px !important; }
        }`}</style>
      </section>

      {/* ════════════════════════════════════
          INQUIRY TYPES
      ════════════════════════════════════ */}
      <section style={{ background: '#040a04', borderTop: '1px solid rgba(201,168,76,0.05)', padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,56px)' }}>
        <div className="rv" style={{ marginBottom: '18px' }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>What Can We Help With?</span>
        </div>
        <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '64px' }}>
          Choose Your<br />
          <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>Enquiry.</span>
        </h2>

        <div className="rv d2">
          {inquiries.map((inq, i) => (
            <div key={inq.num} className="inq-row" style={{ transitionDelay: `${i * 0.06}s` }}>
              <span className="font-display" style={{ fontSize: 'clamp(20px,2.2vw,30px)', fontWeight: 300, color: 'rgba(201,168,76,0.28)', lineHeight: 1, paddingTop: '2px' }}>{inq.num}</span>
              <div>
                <h3 className="font-display" style={{ fontSize: 'clamp(20px,2.2vw,32px)', fontWeight: 300, color: '#F5F0E8', marginBottom: '8px', letterSpacing: '-0.3px', lineHeight: 1 }}>{inq.label}</h3>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '14px', color: 'rgba(245,240,232,0.3)', lineHeight: 1.8, margin: 0 }}>{inq.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════
          FORM + DIRECT CONTACT
      ════════════════════════════════════ */}
      <section style={{ background: '#060c06', borderTop: '1px solid rgba(201,168,76,0.05)', padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,56px)' }}>
        <div className="contact-grid">

          {/* Left: Form */}
          <div className="rv">
            <div style={{ marginBottom: '48px' }}>
              <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', display: 'block', marginBottom: '16px' }}>Send a Message</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(30px,3.5vw,52px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8' }}>
                Start the<br /><span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>Conversation.</span>
              </h2>
            </div>

            {sent ? (
              <div style={{ padding: 'clamp(40px,5vw,64px) 0' }}>
                <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(40px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(201,168,76,0.8)', lineHeight: 1, marginBottom: '20px' }}>
                  Received.
                </div>
                <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.35)', marginBottom: '20px' }} />
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', color: 'rgba(245,240,232,0.4)', lineHeight: 1.9 }}>
                  Thank you for reaching out. We&apos;ll be in touch within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '8px' }}>Full Name</label>
                  <input
                    type="text" required placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocus('name')} onBlur={() => setFocus(null)}
                    style={fieldStyle('name')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '8px' }}>Email Address</label>
                  <input
                    type="email" required placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocus('email')} onBlur={() => setFocus(null)}
                    style={fieldStyle('email')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '8px' }}>Subject</label>
                  <input
                    type="text" required placeholder="How can we help?"
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    onFocus={() => setFocus('subject')} onBlur={() => setFocus(null)}
                    style={fieldStyle('subject')}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '8px' }}>Message</label>
                  <textarea
                    required placeholder="Tell us more..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    onFocus={() => setFocus('message')} onBlur={() => setFocus(null)}
                    style={{ ...fieldStyle('message'), lineHeight: 1.8 }}
                  />
                </div>
                <div>
                  <button type="submit" className="btn-gold-pill" style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.18em', cursor: 'pointer', border: 'none', width: '100%', display: 'block', textAlign: 'center' }}>
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Direct contact info */}
          <div className="rv d2">
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', display: 'block', marginBottom: '48px' }}>Direct Contact</span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { label: 'Email',    value: 'theasaphmedia@gmail.com',    href: 'mailto:theasaphmedia@gmail.com' },
                { label: 'WhatsApp', value: 'Chat with us',               href: 'https://wa.me/2349018880200'    },
                { label: 'YouTube',  value: 'The Worship Nation Channel', href: 'https://www.youtube.com/channel/UCE-vJlarsrIpRFoZcxVMFfA' },
                { label: 'Instagram', value: '@solomonstephenonline',     href: 'https://instagram.com/solomonstephenonline' },
              ].map((item, i) => (
                <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ display: 'block', padding: 'clamp(22px,3vw,32px) 0', borderTop: '1px solid rgba(201,168,76,0.07)', textDecoration: 'none', transition: 'background 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '12px'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.paddingLeft = '0'}
                >
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '6px', transition: 'inherit' }}>{item.label}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 300, color: 'rgba(245,240,232,0.7)', letterSpacing: '-0.3px' }}>{item.value}</div>
                </a>
              ))}

              {/* Studio location */}
              <div style={{ padding: 'clamp(22px,3vw,32px) 0', borderTop: '1px solid rgba(201,168,76,0.07)', borderBottom: '1px solid rgba(201,168,76,0.07)' }}>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '6px' }}>Studio Location</div>
                <div className="font-display" style={{ fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 300, color: 'rgba(245,240,232,0.7)' }}>
                  Kenny T. Kay Building<br />
                  <span style={{ fontStyle: 'italic', color: 'rgba(201,168,76,0.6)' }}>Langbasa Road, Ajah, Lagos</span>
                </div>
              </div>
            </div>

            {/* Photo accent */}
            <div style={{ marginTop: '48px', position: 'relative', height: 'clamp(180px,25vw,300px)', overflow: 'hidden' }}>
              <Image
                src="/images/gallery-solomon-profile-bw.jpg"
                alt="Solomon Stephen"
                fill
                                style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(6,12,6,0.3) 0%,transparent 60%,rgba(6,12,6,0.5) 100%)' }} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
