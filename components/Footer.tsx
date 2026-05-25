'use client'
import Link from 'next/link'
import Image from 'next/image'

const pages = [
  { href: '/about',       label: 'About' },
  { href: '/music',       label: 'Music' },
  { href: '/studios',     label: 'Studios' },
  { href: '/books',       label: 'Books' },
  { href: '/events',      label: 'Events' },
  { href: '/gallery',     label: 'Gallery' },
  { href: '/contact',     label: 'Contact' },
  { href: '/tai-digital', label: 'TAI Digital' },
]

const socials = [
  { label: 'Instagram',    url: 'https://www.instagram.com/thesolomonsteph' },
  { label: 'YouTube',      url: 'https://www.youtube.com/@thesolomonsteph' },
  { label: 'Facebook',     url: 'https://www.facebook.com/thesolomonsteph' },
  { label: 'TikTok',       url: 'https://www.tiktok.com/@thesolomonsteph' },
  { label: 'TWN Ministry', url: 'https://www.instagram.com/theworshipnation_twn' },
  { label: 'TWN Studios',  url: 'https://www.instagram.com/twnstudiosglobal' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B0D', color: '#FAF7F2' }}>
      <style>{`
        .footer-grid{display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,4vw,80px)}
        .footer-link{font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(250,247,242,0.38);text-decoration:none;text-align:right;transition:color .3s}
        .footer-link:hover{color:#C9A84C}
        @media(max-width:600px){.footer-link{font-size:12px;text-align:left}}
        .footer-social{font-family:'DM Sans',sans-serif;font-size:12px;color:rgba(250,247,242,0.35);text-decoration:none;transition:color .3s}
        .footer-social:hover{color:#C9A84C}
        .footer-pages-label{font-family:'DM Sans',sans-serif;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(201,168,76,0.4);margin-bottom:20px;text-align:right}
        @media(max-width:600px){.footer-pages-label{text-align:left}.footer-right{align-items:flex-start!important}}
      `}</style>

      {/* ── Main body ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(64px,8vw,100px) clamp(24px,4vw,64px)' }}>

        {/* Logo — full width above the 2-col grid so Pages aligns with Gospel Minister */}
        <div style={{ marginBottom: 'clamp(36px,4.5vw,56px)' }}>
          <Link href="/" style={{ display: 'inline-block' }}>
            <Image
              src="/images/solomon-stephen-logo.svg"
              alt="Solomon Stephen"
              width={40}
              height={92}
              style={{ height: '64px', width: 'auto', filter: 'brightness(10) sepia(1) hue-rotate(5deg) saturate(0.6)' }}
            />
          </Link>
        </div>

        <div className="footer-grid">

          {/* ── LEFT: Bio + Address + Social ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', lineHeight: 1.9, color: 'rgba(250,247,242,0.38)', maxWidth: '300px', marginBottom: '8px' }}>
                Gospel Minister · Worship Leader · Music Producer<br />
                Author · Founder of The Worship Nation
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', lineHeight: 1.7, color: 'rgba(250,247,242,0.22)' }}>
                Kenny T. Kay Building, Langbasa Road<br />
                Ajah, Lagos — Nigeria
              </p>
            </div>

            {/* Social */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '16px' }}>
                Connect
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                {socials.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social">{s.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Pages + Books CTA ── */}
          <div className="footer-right" style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'flex-end' }}>
            <div style={{ width: '100%' }}>
              <p className="footer-pages-label">Pages</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 40px' }}>
                {pages.map(({ href, label }) => (
                  <Link key={href} href={href} className="footer-link">{label}</Link>
                ))}
              </div>
            </div>

            {/* Books CTA */}
            <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', padding: '12px 28px', border: '1px solid rgba(201,168,76,0.3)', transition: 'border-color 0.3s, background 0.3s, letter-spacing 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >Browse Books on Selar →</a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(201,168,76,0.07)', padding: '20px clamp(24px,4vw,64px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.18)' }}>
            © {new Date().getFullYear()} Solomon Stephen. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(250,247,242,0.18)' }}>
            Crafted by{' '}
            <a href="https://theasaphmedia.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(201,168,76,0.45)', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.45)'}
            >TAI Digital</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
