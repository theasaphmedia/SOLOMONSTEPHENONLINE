'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

const FEATURED_ID = 'TnEp0kiJBfI'
const CHANNEL_URL = 'https://www.youtube.com/channel/UCE-vJlarsrIpRFoZcxVMFfA'

const tracks = [
  { id: 'TnEp0kiJBfI', title: 'CROSSOVER',         year: '2024', scripture: 'Psalm 23',          desc: 'A prophetic declaration of passing through — beyond every limitation, into the fullness of God.' },
  { id: 'cB0LxEjVaIs', title: 'The Mighty God',     year: '2023', scripture: 'Isaiah 9:6',         desc: 'An encounter with the power and majesty of God — unstoppable, unshakeable, reigning above all.' },
  { id: 'lDIjB11ueYM', title: 'AIKU',               year: '2023', scripture: 'Revelation 1:17–18', desc: 'Death could not hold Him. A bold, triumphant anthem declaring the resurrection power of Jesus.' },
  { id: 'aU0TFLxplck', title: 'Awesome God',        year: '2022', scripture: 'Psalm 48:1',         desc: 'A live worship experience capturing the atmosphere of surrender and awe in the presence of God.' },
  { id: 'q1-eDXBpMkY', title: 'Alagbada Ina',       year: '2022', scripture: 'Exodus 3:2',         desc: 'The God clothed in fire — a Yoruba-infused anthem drawing from the burning bush encounter.' },
  { id: 'Ao_ZC3oHi9c', title: 'There Is No One',    year: '2021', scripture: 'Isaiah 46:9',        desc: 'A tender declaration of the uniqueness and incomparability of God. Intimate. Personal. True.' },
]

export default function MusicPage() {
  const [playing, setPlaying] = useState<string | null>(null)
  const [featuredReady, setFeaturedReady] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)

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
        .rv { opacity:0; transform:translateY(36px); transition:opacity 0.9s cubic-bezier(0.16,1,0.3,1),transform 0.9s cubic-bezier(0.16,1,0.3,1); }
        .rv.is-visible { opacity:1; transform:none; }
        .rv.d1{transition-delay:.1s} .rv.d2{transition-delay:.2s} .rv.d3{transition-delay:.3s}

        /* Word clip */
        .wc{display:inline-block;overflow:hidden;}
        .wi{display:inline-block;animation:wi 1s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes wi{from{transform:translateY(110%)}to{transform:translateY(0)}}

        /* Track row */
        .track-row {
          display: grid;
          grid-template-columns: clamp(28px,4vw,52px) 1fr clamp(80px,10vw,160px);
          align-items: center;
          gap: clamp(16px,3vw,40px);
          padding: clamp(22px,2.5vw,32px) clamp(24px,4vw,56px);
          border-top: 1px solid rgba(201,168,76,0.07);
          cursor: pointer;
          position: relative;
          transition: background 0.45s cubic-bezier(0.16,1,0.3,1);
          text-decoration: none;
        }
        .track-row:last-child { border-bottom: 1px solid rgba(201,168,76,0.07); }
        .track-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.2));
          transform: scaleY(0);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          transform-origin: top;
        }
        .track-row.active, .track-row:hover { background: rgba(201,168,76,0.03); }
        .track-row.active::before, .track-row:hover::before { transform: scaleY(1); }

        .track-play-icon {
          width: clamp(28px,4vw,44px);
          height: clamp(28px,4vw,44px);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.3s, background 0.3s;
        }
        .track-row:hover .track-play-icon,
        .track-row.active .track-play-icon {
          border-color: rgba(201,168,76,0.6);
          background: rgba(201,168,76,0.08);
        }

        /* Platform link */
        .plat-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border: 1px solid rgba(201,168,76,0.14);
          color: rgba(245,240,232,0.55);
          font-family: Inter,sans-serif;
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.35s, color 0.35s, background 0.35s;
        }
        .plat-link:hover {
          border-color: rgba(201,168,76,0.4);
          color: #C9A84C;
          background: rgba(201,168,76,0.04);
        }

        @media(max-width:640px){
          .track-row { grid-template-columns: clamp(24px,4vw,40px) 1fr; }
          .track-scripture { display:none; }
        }
      `}</style>

      {/* ════════════════════════════════════
          HERO
      ════════════════════════════════════ */}
      <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(24px,4vw,56px)', paddingTop: '160px', background: '#060c06', position: 'relative', overflow: 'hidden' }}>
        {/* Background texture - giant text */}
        <div aria-hidden style={{ position: 'absolute', right: '-5vw', top: '50%', transform: 'translateY(-55%)', fontFamily: 'Cormorant Garamond,serif', fontSize: 'clamp(200px,28vw,480px)', fontWeight: 700, color: 'rgba(201,168,76,0.025)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-12px' }}>SOUND</div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 20% 60%, rgba(26,46,26,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px' }}>
          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '40px' }}>
            <span className="wc"><span className="wi" style={{ animationDelay: '0.05s' }}>The Music of Solomon Stephen</span></span>
          </p>

          <div style={{ marginBottom: '40px', lineHeight: 0.88 }}>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(56px,8vw,120px)', fontWeight: 300, color: '#F5F0E8', letterSpacing: '-3px', animationDelay: '0.18s' }}>Sounds of</span>
            </div>
            <div className="wc" style={{ display: 'block' }}>
              <span className="wi font-display" style={{ fontSize: 'clamp(56px,8vw,120px)', fontWeight: 700, fontStyle: 'italic', letterSpacing: '-3px', animationDelay: '0.3s', background: 'linear-gradient(135deg,#E8C96A 0%,#C9A84C 45%,#D4B85E 72%,#a8873a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Heaven.</span>
            </div>
          </div>

          <div style={{ width: '48px', height: '1px', background: 'linear-gradient(90deg,#C9A84C,transparent)', marginBottom: '32px', animation: 'wi 0.7s 0.44s both' }} />

          <p style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.9, color: 'rgba(245,240,232,0.38)', maxWidth: '480px', marginBottom: '52px', animation: 'wi 0.9s 0.5s both' }}>
            Every song is an invitation — into the presence of God, into a deeper understanding of who He is and who you are in Him.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'wi 0.9s 0.6s both' }}>
            <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-gold-pill">Watch on YouTube</a>
            <Link href="#tracklist" className="btn-outline-pill">See All Songs</Link>
          </div>
        </div>

        {/* Scroll nudge */}
        <div style={{ position: 'absolute', bottom: '36px', right: 'clamp(24px,4vw,56px)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.28)' }}>Scroll</span>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom,rgba(201,168,76,0.4),transparent)', animation: 'scrollp 2s ease-in-out infinite' }} />
        </div>
        <style>{`@keyframes scrollp{0%,100%{opacity:.35}50%{opacity:.9}}`}</style>
      </section>

      {/* ════════════════════════════════════
          FEATURED — immersive video section
      ════════════════════════════════════ */}
      <section style={{ background: '#040a04', borderTop: '1px solid rgba(201,168,76,0.05)', padding: 'clamp(80px,10vw,140px) 0' }}>
        <div style={{ padding: '0 clamp(24px,4vw,56px)', marginBottom: 'clamp(40px,5vw,64px)' }}>
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Featured</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8' }}>
            CROSSOVER<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>Official Video</span>
          </h2>
        </div>

        {/* Video — full width, cinematic */}
        <div className="rv d1" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setFeaturedReady(true)}>
          {!featuredReady ? (
            <div style={{ position: 'relative', paddingTop: '42.85%', background: '#040a04', overflow: 'hidden' }}>
              <img
                src={`https://img.youtube.com/vi/${FEATURED_ID}/maxresdefault.jpg`}
                alt="CROSSOVER — Solomon Stephen"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
              />
              {/* Cinematic letterbox overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(4,10,4,0.55) 0%,transparent 25%,transparent 75%,rgba(4,10,4,0.7) 100%)' }} />
              {/* Play button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '72px', height: '72px', border: '1px solid rgba(201,168,76,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,12,6,0.7)', backdropFilter: 'blur(12px)', transition: 'all 0.3s' }}>
                    <div style={{ width: 0, height: 0, borderTop: '13px solid transparent', borderBottom: '13px solid transparent', borderLeft: '22px solid #C9A84C', marginLeft: '6px' }} />
                  </div>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.6)' }}>Play</span>
                </div>
              </div>
              {/* Title overlay bottom-left */}
              <div style={{ position: 'absolute', bottom: '32px', left: 'clamp(24px,4vw,56px)' }}>
                <div style={{ fontFamily: 'Inter,sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', marginBottom: '6px' }}>Solomon Stephen · 2024</div>
                <div className="font-display" style={{ fontSize: 'clamp(24px,3vw,44px)', fontWeight: 700, color: '#F5F0E8', letterSpacing: '-1px' }}>CROSSOVER</div>
              </div>
            </div>
          ) : (
            <div style={{ position: 'relative', paddingTop: '42.85%', background: '#000' }}>
              <iframe
                src={`https://www.youtube.com/embed/${FEATURED_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="CROSSOVER — Solomon Stephen"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════
          TRACKLIST — editorial rows
      ════════════════════════════════════ */}
      <section id="tracklist" style={{ background: '#060c06', borderTop: '1px solid rgba(201,168,76,0.05)' }}>
        <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,56px)', paddingBottom: '0' }}>
          <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.35)' }} />
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Discography</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '60px' }}>
            The Songs.<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>The Encounters.</span>
          </h2>
        </div>

        {/* Track rows */}
        <div>
          {tracks.map((t, i) => (
            <div
              key={t.id}
              className={`track-row rv${playing === t.id ? ' active' : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPlaying(playing === t.id ? null : t.id)}
            >
              {/* Number / play icon */}
              <div className="track-play-icon">
                {playing === t.id ? (
                  /* Pause bars */
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                    <div style={{ width: '3px', height: '12px', background: '#C9A84C', borderRadius: '1px' }} />
                    <div style={{ width: '3px', height: '12px', background: '#C9A84C', borderRadius: '1px' }} />
                  </div>
                ) : (
                  <div style={{ width: 0, height: 0, borderTop: '6px solid transparent', borderBottom: '6px solid transparent', borderLeft: `10px solid ${hovered === i ? '#C9A84C' : 'rgba(201,168,76,0.5)'}`, marginLeft: '2px', transition: 'border-left-color 0.3s' }} />
                )}
              </div>

              {/* Track info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(10px,2vw,24px)', flexWrap: 'wrap' }}>
                  <span className="font-display" style={{ fontSize: 'clamp(18px,2.2vw,28px)', fontWeight: 600, color: playing === t.id ? '#C9A84C' : '#F5F0E8', letterSpacing: '-0.3px', transition: 'color 0.3s', whiteSpace: 'nowrap' }}>{t.title}</span>
                  <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.35)' }}>{t.year}</span>
                </div>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 'clamp(12px,1vw,14px)', color: 'rgba(245,240,232,0.28)', lineHeight: 1.7, margin: 0, maxWidth: '600px' }}>{t.desc}</p>

                {/* Embedded player — expands inline */}
                {playing === t.id && (
                  <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
                    <div style={{ position: 'relative', paddingTop: '56.25%', background: '#040a04' }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${t.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={t.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Scripture — right column */}
              <div className="track-scripture" style={{ textAlign: 'right' }}>
                <span style={{ fontFamily: 'Cormorant Garamond,serif', fontStyle: 'italic', fontSize: 'clamp(13px,1.1vw,15px)', color: 'rgba(201,168,76,0.3)', whiteSpace: 'nowrap' }}>{t.scripture}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '0 clamp(24px,4vw,56px)', paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(80px,10vw,140px)' }}>
          <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="btn-outline-pill">
            More on YouTube ↗
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════
          STREAMING
      ════════════════════════════════════ */}
      <section style={{ background: '#040a04', borderTop: '1px solid rgba(201,168,76,0.05)', padding: 'clamp(80px,10vw,140px) clamp(24px,4vw,56px)' }}>
        <div className="rv" style={{ marginBottom: '18px' }}>
          <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>Listen Everywhere</span>
        </div>
        <h2 className="font-display rv d1" style={{ fontSize: 'clamp(32px,4vw,60px)', fontWeight: 300, lineHeight: 0.92, letterSpacing: '-1.5px', color: '#F5F0E8', marginBottom: '48px' }}>
          Find the Music<br />
          <span style={{ fontStyle: 'italic', fontWeight: 700, color: 'rgba(201,168,76,0.85)' }}>Wherever You Are.</span>
        </h2>

        <div className="rv d2" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
          {[
            { name: 'YouTube',         href: CHANNEL_URL },
            { name: 'Spotify',         href: 'https://open.spotify.com/artist/solomon-stephen' },
            { name: 'Apple Music',     href: 'https://music.apple.com' },
            { name: 'Audiomack',       href: 'https://audiomack.com' },
            { name: 'Boomplay',        href: 'https://www.boomplaymusic.com' },
          ].map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" className="plat-link">
              {p.name} ↗
            </a>
          ))}
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
            <span style={{ fontFamily: 'Inter,sans-serif', fontSize: '9px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)' }}>The Worship Nation</span>
          </div>
          <h2 className="font-display rv d1" style={{ fontSize: 'clamp(44px,6.5vw,96px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-2.5px', color: '#F5F0E8', marginBottom: '32px' }}>
            Come Into<br />
            <span style={{ fontStyle: 'italic', fontWeight: 700, background: 'linear-gradient(135deg,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>His Presence.</span>
          </h2>
          <div className="rv d2" style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)', marginBottom: '32px' }} />
          <p className="rv d2" style={{ fontFamily: 'Inter,sans-serif', fontSize: '15px', lineHeight: 1.95, color: 'rgba(245,240,232,0.32)', marginBottom: '52px' }}>
            Join a live gathering. Experience the sound that is shifting atmospheres across Nigeria and beyond.
          </p>
          <div className="rv d3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/events" className="btn-gold-pill" style={{ padding: '17px 48px', fontSize: '10px', letterSpacing: '0.16em' }}>Join a Gathering</Link>
            <Link href="/contact" className="btn-outline-pill" style={{ padding: '17px 48px', fontSize: '10px', letterSpacing: '0.16em' }}>Get In Touch</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
