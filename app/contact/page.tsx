'use client'

import { useEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'

/* ── Collapsible map ─────────────────────────────────────────────────── */
function CollapsibleMap() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.1)', marginBottom: '32px', overflow: 'hidden' }}>
      <div style={{ padding: '20px 24px' }}>
        <p style={{ color: 'rgba(201,168,76,0.55)', fontSize: '8.5px', letterSpacing: '0.32em', textTransform: 'uppercase', marginBottom: '6px', fontFamily: 'Inter, sans-serif' }}>Visit TWN Studios</p>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', fontWeight: 500, marginBottom: '3px', fontFamily: 'Inter, sans-serif' }}>Kenny T. Kay Building (Green Tall Building)</p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>Beside Azkol Fuel Station, Langbasa Road, Ajah, Lagos</p>
        <button onClick={() => setOpen(!open)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid rgba(201,168,76,0.2)', padding: '8px 18px', cursor: 'pointer', transition: 'all 0.25s' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.5)' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.2)' }}
        >
          <span style={{ color: '#C9A84C', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{open ? 'Hide Map' : 'View on Map'}</span>
          <span style={{ color: '#C9A84C', fontSize: '12px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', display: 'inline-block' }}>▾</span>
        </button>
      </div>
      <div style={{ maxHeight: open ? '280px' : '0', overflow: 'hidden', transition: 'max-height 0.45s cubic-bezier(0.16,1,0.3,1)' }}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1675887445563!2d3.5813646750302173!3d6.500457123430608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bfbc825df64c1%3A0xdbfac0f53ff1fdf2!2sTWN%20STUDIOS!5e0!3m2!1sen!2sng!4v1775255468341!5m2!1sen!2sng"
          width="100%" height="260" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </div>
  )
}

/* ── Success overlay ─────────────────────────────────────────────────── */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(5,9,10,0.97)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <svg width="88" height="88" viewBox="0 0 88 88" fill="none">
          <circle className="check-circle" cx="44" cy="44" r="36" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
          <path className="check-mark" d="M28 44 L40 56 L60 34" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.55)', marginBottom: 16 }}>Message Sent</p>
      <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(30px,4vw,52px)', fontWeight: 300, color: '#fff', lineHeight: 1, textAlign: 'center', marginBottom: 16 }}>
        We&apos;ll be in touch.
      </h2>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 40, textAlign: 'center', maxWidth: 340, lineHeight: 1.8 }}>
        Thank you for reaching out. We typically respond within 24–48 hours.
      </p>
      <button onClick={onReset} className="btn-outline-pill" style={{ fontSize: '10px' }}>
        Send Another Message
      </button>
    </div>
  )
}

/* ── Field wrapper component ─────────────────────────────────────────── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="field-wrapper">
        {children}
        <div className="field-underline" />
      </div>
    </div>
  )
}

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  const [charCount, setCharCount] = useState(0)
  const MAX_CHARS = 1000

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'sent' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <main style={{ background: '#05090a', minHeight: '100vh', overflowX: 'hidden' }} className="page-enter">

      {status === 'sent' && <SuccessState onReset={() => { setStatus('idle'); setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' }); setCharCount(0) }} />}

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 52px !important; }
        }
        select.field-line option { background: #060e06; color: #fff; }
      `}</style>

      {/* Hero */}
      <section style={{ minHeight: '52vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', paddingBottom: '80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 30% 60%, rgba(26,46,26,0.55) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '160px clamp(24px,4vw,56px) 0', position: 'relative', zIndex: 2 }}>
          <p className="section-label animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', display: 'block', marginBottom: 24 }}>Get In Touch</p>
          <h1 className="font-display animate-fade-up" style={{ fontSize: 'clamp(36px,5vw,80px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-2px', color: '#fff', marginBottom: 28, animationDelay: '0.2s', animationFillMode: 'both' }}>
            Let&apos;s Create<br />
            <span className="text-gradient-gold" style={{ fontWeight: 700, fontStyle: 'italic' }}>Something Together</span>
          </h1>
          <div className="animate-fade-up" style={{ animationDelay: '0.35s', animationFillMode: 'both', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {['Studio Booking', 'Ministry Collaboration', 'General Enquiry'].map((r, i, a) => (
              <span key={r} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>{r}</span>
                {i < a.length - 1 && <span style={{ color: 'rgba(201,168,76,0.2)' }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.12),transparent)' }} />

      {/* Main content */}
      <section style={{ padding: 'clamp(80px,8vw,140px) 0' }}>
        <div className="container-custom">
          <div className="contact-grid reveal">

            {/* Left: info */}
            <div>
              <h2 className="font-display" style={{ fontSize: 'clamp(22px,2.5vw,38px)', fontWeight: 300, lineHeight: 1.0, color: '#fff', marginBottom: 20 }}>
                How Can We <span className="text-gradient-gold" style={{ fontStyle: 'italic' }}>Help?</span>
              </h2>
              <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.35)', marginBottom: 24 }} />
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginBottom: 36 }}>
                Whether you&apos;re looking to book a studio session, collaborate on ministry, request a speaking engagement, or simply connect — we&apos;d love to hear from you.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 36 }}>
                {[
                  { title: 'Studio Booking', desc: 'Recording, mixing, mastering, video, live streaming, event hosting' },
                  { title: 'Ministry Collaboration', desc: 'Speaking engagements, worship leading, ministry partnerships' },
                  { title: 'General Enquiry', desc: 'Books, teachings, TWN gatherings, and everything else' },
                ].map((item, i) => (
                  <div key={item.title} style={{ padding: '18px 20px', border: '1px solid rgba(201,168,76,0.08)', borderTop: i === 0 ? '1px solid rgba(201,168,76,0.08)' : 'none', transition: 'border-color 0.3s, background 0.3s' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.22)'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.03)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.08)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                  >
                    <p style={{ fontFamily: 'Inter, sans-serif', color: '#C9A84C', fontSize: 12, fontWeight: 600, marginBottom: 4, letterSpacing: '0.04em' }}>{item.title}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.35)', fontSize: 13, lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              <CollapsibleMap />

              <div>
                <p className="section-label" style={{ marginBottom: 14 }}>Connect On Social</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {[
                    { label: 'Instagram', href: 'https://instagram.com/thesolomonsteph' },
                    { label: 'YouTube', href: 'https://youtube.com/@thesolomonsteph' },
                    { label: 'Facebook', href: 'https://facebook.com/thesolomonsteph' },
                    { label: 'TikTok', href: 'https://tiktok.com/@thesolomonsteph' },
                  ].map((s) => (
                    <Link key={s.label} href={s.href} target="_blank"
                      style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(201,168,76,0.65)', fontSize: 11, padding: '7px 16px', border: '1px solid rgba(201,168,76,0.15)', textDecoration: 'none', letterSpacing: '0.06em', transition: 'all 0.25s' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.45)'; (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.15)'; (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.65)' }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div style={{ border: '1px solid rgba(201,168,76,0.1)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#C9A84C,transparent)' }} />
              <div style={{ padding: 'clamp(28px,4vw,48px) clamp(24px,4vw,56px)' }}>
                <h3 className="font-display" style={{ fontSize: 'clamp(22px,2.2vw,32px)', fontWeight: 300, color: '#fff', marginBottom: 36 }}>
                  Send A <span className="text-gradient-gold" style={{ fontStyle: 'italic' }}>Message</span>
                </h3>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <Field label="First Name">
                      <input type="text" placeholder="John" required className="field-line"
                        value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                    </Field>
                    <Field label="Last Name">
                      <input type="text" placeholder="Doe" required className="field-line"
                        value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                    </Field>
                  </div>

                  <Field label="Email Address">
                    <input type="email" placeholder="you@example.com" required className="field-line"
                      value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </Field>

                  <Field label="Subject">
                    <select required className="field-line" style={{ cursor: 'pointer' }}
                      value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
                      <option value="">Select a subject</option>
                      <option value="studio">Studio Booking</option>
                      <option value="ministry">Ministry Collaboration</option>
                      <option value="speaking">Speaking Engagement</option>
                      <option value="books">Books & Teaching</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </Field>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                      <label className="field-label">Message</label>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: charCount > MAX_CHARS * 0.85 ? 'rgba(201,168,76,0.7)' : 'rgba(255,255,255,0.2)' }}>
                        {charCount}/{MAX_CHARS}
                      </span>
                    </div>
                    <div className="field-wrapper">
                      <textarea placeholder="Tell us how we can help you..." rows={5} required className="field-line"
                        style={{ resize: 'none' }}
                        value={form.message}
                        onChange={(e) => { setForm({ ...form, message: e.target.value }); setCharCount(e.target.value.length) }}
                        maxLength={MAX_CHARS}
                      />
                      <div className="field-underline" />
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'sending'} className="btn-gold-pill"
                    style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1, cursor: status === 'sending' ? 'not-allowed' : 'pointer', marginTop: 4 }}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>

                  {status === 'error' && (
                    <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(239,68,68,0.75)', fontSize: 13 }}>
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.2)', fontSize: 11, textAlign: 'center' }}>
                    We typically respond within 24–48 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
