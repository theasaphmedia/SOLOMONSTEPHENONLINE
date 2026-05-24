'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

const books = [
  {
    num: '01',
    title: 'The Cost of Ignorance',
    tag: 'Theology',
    year: '2023',
    scripture: 'Hosea 4:6',
    pull: 'Ignorance is not bliss — it is costly.',
    body: 'This book confronts the dangerous comfort of spiritual ignorance and calls believers to a higher standard of knowing God. Drawing from deep biblical study and personal encounter, Solomon delivers a clarion call to the body of Christ to pursue truth with urgency and intention.',
    link: 'https://selar.com/v8561k6070',
    img: '/images/book-cost-of-ignorance.png',
  },
  {
    num: '02',
    title: 'Sons, Not Slaves — March',
    tag: 'Devotional',
    year: '31-Day Journey',
    scripture: 'Romans 8:15',
    pull: 'You were never meant to serve from fear — but from love.',
    body: 'A 31-day devotional journey into the identity of the believer as a son of God. Each day draws from Hebrew and Greek word studies to anchor you in the truth of who you are in Christ. Encounter the Father\'s heart and walk into a new dimension of intimacy.',
    link: 'https://selar.com/41x076wbk1',
    img: '/images/book-sons-not-slaves-march.png',
  },
  {
    num: '03',
    title: 'Sons, Not Slaves — April',
    tag: 'Devotional',
    year: '31-Day Journey',
    scripture: 'Galatians 4:7',
    pull: 'You are an heir — not a servant. Walk like it.',
    body: 'The April volume continues the journey of sonship — going deeper into covenant identity, spiritual inheritance, and the posture of a son who understands his position before the Father. An essential companion to the March volume.',
    link: 'https://selar.com/8z43781b2n',
    img: '/images/book-sons-not-slaves-april.png',
  },
  {
    num: '04',
    title: 'Go In This Thy Might',
    tag: 'Discipleship',
    year: '2024',
    scripture: 'Judges 6:14',
    pull: 'God does not call the qualified — He qualifies the called.',
    body: 'Like Gideon, many believers are hiding when they should be rising. This book is a direct challenge to every believer sitting beneath their potential — an invitation to step into the fullness of what God has commissioned them for.',
    link: 'https://selar.com/books',
    img: '/images/solomon-cream-suit-books.png',
  },
]

export default function BooksPage() {
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

        /* Book feature */
        .book-feature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid rgba(201,168,76,0.07);
          min-height: clamp(480px,60vw,700px);
        }
        .book-feature.reverse { direction: rtl; }
        .book-feature.reverse > * { direction: ltr; }
        .book-img-wrap { position: relative; overflow: hidden; }
        .book-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(48px,7vw,100px) clamp(32px,4.5vw,72px);
        }
        .get-book-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border: 1px solid rgba(201,168,76,0.3);
          color: rgba(201,168,76,0.8);
          font-family: Inter,sans-serif;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.35s, color 0.35s, background 0.35s;
          align-self: flex-start;
        }
        .get-book-link:hover {
          border-color: rgba(201,168,76,0.7);
          color: #C9A84C;
          background: rgba(201,168,76,0.04);
        }
        @media(max-width:768px){
          .book-feature, .book-feature.reverse {
            grid-template-columns: 1fr;
            direction: ltr;
            min-height: auto;
          }
          .book-img-wrap { min-height: 60vw; }
        }
      `}</style>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px,4vw,56px)', paddingTop: '160px', background: '#060c06', position: 'relative', overflow: 'hidden' }}>
        {/* BG: decorative oversized text */}
        <div aria-hidden style={{ position: 'absolute', right: '-4vw', top: '50%', transform: 'translateY(-52%)', fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(160px,22vw,380px)', fontWeight: 700, color: 'rgba(201,168,76,0.022)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-8px' }}>WORD</div>
        {/* Photo, bleeding from right */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', overflow: 'hidden', zIndex: 1 }}>
          <Image src="/images/solomon-cream-suit-books.png" alt="" fill style={{ objectFit: 'cover', objectPosition: '50% 20%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,#060c06 0%,rgba(6,12,6,0.6) 40%,transparent 80%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top,#060c06,transparent)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #060c06 55%, transparent 80%)', zIndex: 2, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '40px' }}>
            <span className="wc"><span className="wi" style={{ animationDelay: '0.05s' }}>Published Works · Solomon Stephen</span></span>
          </p>

          <div style={{ marginBottom: '40px', lineHeight: 0.88 }}>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,110px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-3px', animationDelay: '0.18s' }}>Words That</span>
            </div>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(52px,7.5vw,110px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-3px', animationDelay: '0.3s', background: 'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Transform.</span>
            </div>
          </div>

          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#C9A84C,transparent)', marginBottom: '32px', animation: 'wi 0.7s 0.44s both' }} />

          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.95, color: 'rgba(245,240,232,0.38)', maxWidth: '460px', marginBottom: '52px', animation: 'wi 0.9s 0.5s both' }}>
            Rooted in biblical Hebrew and Greek. Written for believers who are ready to go deeper — beyond the surface of faith, into the foundation of truth.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'wi 0.9s 0.6s both' }}>
            <a href="https://selar.com" target="_blank" rel="noopener noreferrer" className="btn-gold-pill">Get the Books</a>
            <Link href="/contact" className="btn-outline-pill">Bulk Orders</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          BOOK FEATURES — alternating full-width panels
      ════════════════════════════════════ */}
      <section style={{ background: '#040a04', borderTop: '1px solid rgba(201,168,76,0.05)' }}>
        <div style={{ padding: 'clamp(80px,10vw,130px) clamp(24px,4vw,56px) 0' }}>
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>The Library</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '72px' }}>
            Four Books.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>One Foundation.</span>
          </h2>
        </div>

        {books.map((book, i) => (
          <div key={book.num} className={`book-feature rv${i % 2 === 1 ? ' reverse' : ''}`} style={{ transitionDelay: `${i * 0.08}s`, background: i % 2 === 1 ? 'rgba(255,255,255,0.008)' : 'transparent' }}>

            {/* Book image */}
            <div className="book-img-wrap">
              <Image
                src={book.img}
                alt={book.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: i % 2 === 0
                ? 'linear-gradient(to right, transparent 40%, #040a04 100%)'
                : 'linear-gradient(to left, transparent 40%, #040a04 100%)'
              }} />
            </div>

            {/* Book content */}
            <div className="book-content">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
                <span className="font-display" style={{ fontSize: 'clamp(60px,7vw,100px)', fontWeight: 700, color: 'rgba(201,168,76,0.06)', lineHeight: 1, letterSpacing: '-3px' }}>{book.num}</span>
                <div>
                  <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '4px' }}>{book.tag} · {book.year}</div>
                  <div style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: '13px', color: 'rgba(201,168,76,0.35)' }}>{book.scripture}</div>
                </div>
              </div>

              <h2 className="font-display" style={{ fontSize: 'clamp(26px,3vw,46px)', fontWeight: 300, lineHeight: 1, letterSpacing: '-0.8px', color: '#F5F0E8', marginBottom: '20px' }}>{book.title}</h2>

              <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.25)', marginBottom: '24px' }} />

              <blockquote style={{ margin: '0 0 24px', padding: '0 0 0 18px', borderLeft: '2px solid rgba(201,168,76,0.2)' }}>
                <p className="font-display" style={{ fontStyle: 'italic', fontSize: 'clamp(16px,1.5vw,22px)', color: 'rgba(245,240,232,0.5)', lineHeight: 1.5, fontWeight: 300, margin: 0 }}>
                  &ldquo;{book.pull}&rdquo;
                </p>
              </blockquote>

              <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(245,240,232,0.32)', lineHeight: 1.9, marginBottom: '36px' }}>{book.body}</p>

              <a href={book.link} target="_blank" rel="noopener noreferrer" className="get-book-link">
                Get This Book ↗
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ════════════════════════════════════
          PULL QUOTE
      ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(100px,13vw,180px) clamp(24px,4vw,56px)', background: '#060c06', borderTop: '1px solid rgba(201,168,76,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-60px', left: '-10px', fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(220px,28vw,450px)', fontWeight: 700, color: 'rgba(201,168,76,0.022)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>&ldquo;</div>
        <div className="rv" style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
          <p className="font-display" style={{ fontSize: 'clamp(32px,5vw,84px)', fontWeight: 300, fontStyle: 'italic', color: '#F5F0E8', lineHeight: 1.08, letterSpacing: '-2px' }}>
            God does not call the qualified —{' '}
            <span style={{ background: 'linear-gradient(135deg,#E8C96A,#C9A84C,#D4B85E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontWeight: 700 }}>He qualifies the called.</span>{' '}
            And every season of preparation is a seed for a harvest you cannot yet see.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '48px' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Solomon Stephen</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA
      ════════════════════════════════════ */}
      <section style={{ padding: 'clamp(100px,13vw,180px) clamp(24px,4vw,56px)', background: '#1A2E1A', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.06)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 75% at 50% 50%,rgba(201,168,76,0.09) 0%,transparent 65%)', pointerEvents: 'none' }} />
        {(['top-left','top-right','bottom-left','bottom-right'] as const).map(pos => {
          const [v, h] = pos.split('-') as ['top'|'bottom','left'|'right']
          return <div key={pos} style={{ position: 'absolute', [v]: '36px', [h]: '36px', width: '44px', height: '44px', [`border${v[0].toUpperCase()+v.slice(1)}`]: '1px solid rgba(201,168,76,0.14)', [`border${h[0].toUpperCase()+h.slice(1)}`]: '1px solid rgba(201,168,76,0.14)' }} />
        })}
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
          <div className="rv" style={{ marginBottom: '24px' }}>
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Published Works</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-2.5px', color: '#F5F0E8', marginBottom: '32px' }}>
            Truth That<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, background: 'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sets You Free.</span>
          </h2>
          <div className="rv d2" style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: '32px' }} />
          <p className="rv d2" style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.95, color: 'rgba(245,240,232,0.32)', marginBottom: '52px' }}>
            Order your copies today. Available for individuals, churches, and bulk orders.
          </p>
          <div className="rv d3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://selar.com" target="_blank" rel="noopener noreferrer" className="btn-gold-pill" style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Order Now</a>
            <Link href="/contact" className="btn-outline-pill" style={{ padding: '17px 52px', fontSize: '10px', letterSpacing: '0.16em' }}>Bulk Orders</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
