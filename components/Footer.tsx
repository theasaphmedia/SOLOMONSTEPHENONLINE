import React from 'react'
import Link from 'next/link'

const W = 'clamp(24px,5vw,80px)'

const NavCol = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ textAlign: 'left' }}>
    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '8.5px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', fontWeight: 600, margin: '0 0 18px' }}>{title}</p>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>{children}</ul>
  </div>
)

const NavLink = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => (
  <li>
    {external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">{children}</a>
    ) : (
      <Link href={href} className="footer-link">{children}</Link>
    )}
  </li>
)

const socials = [
  {
    group: 'Solomon Stephen',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/thesolomonsteph' },
      { label: 'YouTube', href: 'https://youtube.com/@thesolomonsteph' },
      { label: 'Facebook', href: 'https://facebook.com/thesolomonsteph' },
      { label: 'TikTok', href: 'https://tiktok.com/@thesolomonsteph' },
    ],
  },
  {
    group: 'The Worship Nation',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/theworshipnation_twn' },
      { label: 'Facebook', href: 'https://facebook.com/theworshipnation_twn' },
    ],
  },
  {
    group: 'TWN Studios',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/twnstudiosglobal' },
      { label: 'Facebook', href: 'https://facebook.com/twnstudiosglobal' },
    ],
  },
]

function SocialIcon({ label }: { label: string }) {
  if (label === 'Instagram') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
  if (label === 'YouTube') return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  )
  if (label === 'TikTok') return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
    </svg>
  )
  // Facebook
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" width={14} height={14}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#050c05', borderTop: '1px solid rgba(201,168,76,0.08)', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        /* Topographic line texture using SVG */
        .footer-topo {
          position: absolute;
          inset: 0;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cpath d='M0 200 Q100 150 200 200 Q300 250 400 200' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3Cpath d='M0 160 Q100 110 200 160 Q300 210 400 160' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3Cpath d='M0 240 Q100 190 200 240 Q300 290 400 240' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3Cpath d='M0 120 Q100 70 200 120 Q300 170 400 120' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3Cpath d='M0 280 Q100 230 200 280 Q300 330 400 280' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3Cpath d='M0 80 Q100 30 200 80 Q300 130 400 80' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3Cpath d='M0 320 Q100 270 200 320 Q300 370 400 320' stroke='%23C9A84C' fill='none' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 400px 400px;
          pointer-events: none;
        }
        .footer-link {
          font-family: Inter, sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          padding: 6px 0;
          line-height: 1.4;
          transition: color 0.25s, transform 0.25s;
          display: inline-flex;
          align-items: center;
        }
        .footer-link:hover {
          color: #C9A84C;
          transform: translateX(5px);
        }
        .footer-social-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.14);
          color: rgba(255,255,255,0.28);
          transition: all 0.35s cubic-bezier(0.22,1,0.36,1);
          overflow: hidden;
          flex-shrink: 0;
          cursor: pointer;
        }
        .footer-social-btn:hover {
          border-color: rgba(201,168,76,0.55);
          color: #C9A84C;
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(201,168,76,0.2);
          background: rgba(201,168,76,0.06);
        }
        .footer-platform-name {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 6.5px;
          letter-spacing: 0.18em;
          color: #C9A84C;
          text-transform: uppercase;
          white-space: nowrap;
          opacity: 0;
          transition: bottom 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.3s;
          pointer-events: none;
          font-family: Inter, sans-serif;
        }
        .footer-social-btn:hover .footer-platform-name {
          bottom: 5px;
          opacity: 1;
        }
        @media (max-width: 900px) {
          .footer-nav-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; padding: 48px 24px 0 !important; }
        }
        @media (max-width: 480px) {
          .footer-nav-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; padding: 40px 20px 0 !important; }
          .footer-socials-row { flex-direction: column !important; gap: 28px !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* Topographic texture */}
      <div className="footer-topo" />

      {/* Large typographic headline */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `72px ${W} 0`, position: 'relative', zIndex: 1 }}>
        <div style={{ borderBottom: '1px solid rgba(201,168,76,0.07)', paddingBottom: '56px', marginBottom: '60px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '8.5px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '20px' }}>
            The Worship Nation
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(38px,5.5vw,88px)', fontWeight: 300, lineHeight: 0.93, letterSpacing: '-2px', color: 'rgba(255,255,255,0.88)', margin: 0 }}>
            Let&apos;s Build<br />
            <span style={{ background: 'linear-gradient(135deg,#E8C96A,#C9A84C,#D4B85E)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', fontWeight: 700 }}>
              Something Eternal.
            </span>
          </h2>
          <div style={{ display: 'flex', gap: 14, marginTop: 36 }}>
            <Link href="/contact" style={{ fontFamily: 'Inter, sans-serif', fontSize: '9.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, transition: 'gap 0.3s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.gap = '16px' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.gap = '10px' }}
            >
              Get In Touch <span style={{ fontSize: 16, lineHeight: 1 }}>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Nav grid */}
      <nav aria-label="Footer navigation">
        <div className="footer-nav-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: `0 ${W}`, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 40, alignItems: 'start', position: 'relative', zIndex: 1 }}>
          <NavCol title="Ministry">
            <NavLink href="/about">About Solomon</NavLink>
            <NavLink href="/events">TWN Gatherings</NavLink>
            <NavLink href="/events">MDWE</NavLink>
            <NavLink href="/events">The Slaughter House</NavLink>
            <NavLink href="/events">Synantesis</NavLink>
          </NavCol>
          <NavCol title="Work">
            <NavLink href="/music">Music</NavLink>
            <NavLink href="/books">Books</NavLink>
            <NavLink href="/teaching">Teaching</NavLink>
            <NavLink href="/studios">TWN Studios</NavLink>
            <NavLink href="/tai-digital">TAI Digital</NavLink>
          </NavCol>
          <NavCol title="Connect">
            <NavLink href="/contact">Get In Touch</NavLink>
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/studios">Book a Studio</NavLink>
            <NavLink href="https://selar.com/showlove/solomonstephen" external>Support Ministry</NavLink>
          </NavCol>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '8.5px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)', fontWeight: 600, margin: '0 0 18px' }}>Find Us</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.32)', lineHeight: 1.9, margin: 0 }}>
              Kenny T. Kay Building<br />Beside Azkol Fuel Station<br />Langbasa Road, Ajah<br />Lagos, Nigeria
            </p>
          </div>
        </div>
      </nav>

      {/* Social icons row */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: `56px ${W} 0`, position: 'relative', zIndex: 1 }}>
        <div className="footer-socials-row" style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          {socials.map((group, gi) => (
            <React.Fragment key={group.group}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>{group.group}</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  {group.links.map(({ label, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="footer-social-btn">
                      <SocialIcon label={label} />
                      <span className="footer-platform-name">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
              {gi < socials.length - 1 && (
                <div style={{ width: 1, height: 44, background: 'rgba(201,168,76,0.1)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ maxWidth: 1280, margin: '40px auto 0', padding: `24px ${W}`, borderTop: '1px solid rgba(201,168,76,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.16)', margin: 0, letterSpacing: '0.04em' }}>
          © {new Date().getFullYear()} Solomon Stephen · The Worship Nation
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.12)', margin: 0, letterSpacing: '0.04em' }}>
          Built by <a href="/tai-digital" style={{ color: 'rgba(201,168,76,0.35)', textDecoration: 'none' }}>TAI Digital</a>
        </p>
      </div>
    </footer>
  )
}
