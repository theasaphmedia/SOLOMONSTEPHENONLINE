'use client'

import { useEffect } from 'react'
import Footer from '@/components/Footer'
import Link from 'next/link'
import '../inner-animations.css'
import '../mobile.css'
import { usePageReveal } from '@/components/usePageReveal'

const teachings = [
  { title: 'The Power of Authentic Worship', category: 'Worship', desc: 'What does it mean to worship in spirit and in truth? This teaching unpacks the Hebrew and Greek roots of worship and calls believers to a deeper place of encounter.', duration: '45 min', type: 'Teaching' },
  { title: 'Sons, Not Slaves — The Identity Series', category: 'Identity', desc: "A foundational series on the believer's identity as a son of God. Drawing from Romans 8 and Galatians 4, walking through the transformative truth of adoption and covenant sonship.", duration: '52 min', type: 'Series' },
  { title: 'The Weight of His Presence', category: 'Presence', desc: 'What does it mean to carry the presence of God? Explores the biblical concept of the shekinah glory and what it means for New Covenant believers to be carriers of His presence.', duration: '38 min', type: 'Teaching' },
  { title: 'Worship as Warfare', category: 'Worship', desc: 'There is a dimension of worship that the enemy fears. This teaching reveals the prophetic and strategic nature of worship — how praise shifts atmospheres and opens heavens.', duration: '41 min', type: 'Teaching' },
]

export default function TeachingPage() {
  usePageReveal()

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-revealed')),
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    const cardObs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Array.from(entry.target.querySelectorAll('.stagger-card')).forEach((card, i) => {
            setTimeout(() => { (card as HTMLElement).style.opacity = '1'; (card as HTMLElement).style.transform = 'translateY(0)' }, i * 120)
          })
        }
      }),
      { threshold: 0.05 }
    )
    document.querySelectorAll('.stagger-grid').forEach((el) => cardObs.observe(el))
    return () => { obs.disconnect(); cardObs.disconnect() }
  }, [])

  return (
    <main className="bg-[#060e06] min-h-screen overflow-x-hidden page-entry">

      <section className="page-hero" style={{ minHeight: '60vh' }}>
        <div className="page-hero-bg" />
        <div className="page-hero-orb" style={{ top: '-15%', right: '-8%' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)' }} />
        <div className="container-custom relative z-10" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
          <div className="badge-pill animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', display: 'inline-flex', marginBottom: '32px' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />Biblical Teaching
          </div>
          <h1 className="font-display text-white font-light animate-fade-up" style={{ fontSize: 'clamp(28px,4.5vw,66px)', lineHeight: 1.0, animationDelay: '0.2s', animationFillMode: 'both', marginBottom: '28px' }}>
            Teaching That <span className="text-gradient-gold font-semibold">Transforms</span>
          </h1>
          <div className="animate-fade-up" style={{ animationDelay: '0.35s', animationFillMode: 'both', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {['Biblical Teaching', 'Hebrew & Greek Studies', 'Transformative Truth'].map((r, i, a) => (
              <span key={r} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: 'rgba(201,168,76,0.65)', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{r}</span>
                {i < a.length - 1 && <span style={{ color: 'rgba(201,168,76,0.25)' }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="section-padding reveal">
        <div className="container-custom">

          <div style={{ marginBottom: '52px' }}>
            <div className="badge-pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Featured Teaching</div>
            <h2 className="font-display text-white font-light" style={{ fontSize: 'clamp(28px,4vw,54px)', lineHeight: 1.0 }}>
              From The <span className="text-gradient-gold">Pulpit</span>
            </h2>
          </div>

          <div className="section-divider" style={{ marginBottom: '52px' }} />

          <div className="glass rounded-3xl card-hover" style={{ marginBottom: '80px', overflow: 'hidden' }}>
            <div className="h-[2px]" style={{ background: 'linear-gradient(to right,transparent,#C9A84C,transparent)' }} />
            <div style={{ padding: 'clamp(28px,4vw,48px) clamp(20px,4vw,56px)' }}>
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/TnEp0kiJBfI"
                    title="Solomon Stephen Teaching" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="w-full h-full" />
                </div>
                <div>
                  <span style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>Latest Teaching</span>
                  <div className="section-divider" style={{ margin: '20px 0' }} />
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '15px', lineHeight: 1.85, marginBottom: '32px' }}>
                    Solomon Stephen teaches with theological precision, drawing from biblical Hebrew and Greek to bring timeless truth into present reality. Every teaching is designed not just to inform — but to transform.
                  </p>
                  <Link href="https://www.youtube.com/channel/UCE-vJlarsrIpRFoZcxVMFfA" target="_blank" className="btn-gold-pill inline-flex">
                    More Teachings →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="rv" style={{ marginBottom: '48px' }}>
            <div className="badge-pill" style={{ display: 'inline-flex', marginBottom: '16px' }}>Teaching Topics</div>
            <h2 className="font-display text-white font-light" style={{ fontSize: 'clamp(24px,3.5vw,46px)', lineHeight: 1.0 }}>
              What We <span className="text-gradient-gold">Cover</span>
            </h2>
          </div>

          <div className="section-divider" style={{ marginBottom: '48px' }} />

          <div className="teaching-grid stagger-grid rv" style={{ marginBottom: '80px' }}>
            {teachings.map((t) => (
              <div key={t.title} className="glass rounded-2xl stagger-card card-hover">
                <div className="h-px" style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.3),transparent)' }} />
                <div style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ color: '#C9A84C', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 500 }}>{t.category}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>{t.duration}</span>
                      <span className="glass-gold rounded-full" style={{ color: '#C9A84C', fontSize: '11px', padding: '5px 14px' }}>{t.type}</span>
                    </div>
                  </div>
                  <h3 className="font-display text-white font-light" style={{ fontSize: 'clamp(16px,1.8vw,22px)', marginBottom: '16px', lineHeight: 1.2 }}>{t.title}</h3>
                  <div className="section-divider" style={{ marginBottom: '16px' }} />
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.75 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass rounded-3xl card-hover rv" style={{ padding: 'clamp(36px,5vw,64px) clamp(20px,4vw,48px)', overflow: 'hidden' }}>
            <div className="h-[2px]" style={{ background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.4),transparent)', marginBottom: '36px' }} />
            <h3 className="font-display text-white font-light" style={{ fontSize: 'clamp(22px,3vw,44px)', lineHeight: 1.0, marginBottom: '20px' }}>
              Go Deeper With The <span className="text-gradient-gold font-semibold">Books</span>
            </h3>
            <div style={{ height: '1px', width: '48px', background: 'rgba(201,168,76,0.4)', marginBottom: '24px' }} />
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '15px', maxWidth: '440px', marginBottom: '40px', lineHeight: 1.7 }}>
              The teachings come alive in Solomon&apos;s books — rooted in biblical Hebrew and Greek.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/books" className="btn-gold-pill">Get The Books →</Link>
              <Link href="https://www.youtube.com/channel/UCE-vJlarsrIpRFoZcxVMFfA" target="_blank" className="btn-outline-pill">YouTube Channel →</Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
