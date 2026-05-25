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
  { label: 'Instagram',   url: 'https://www.instagram.com/thesolomonsteph' },
  { label: 'YouTube',     url: 'https://www.youtube.com/@thesolomonsteph' },
  { label: 'Facebook',    url: 'https://www.facebook.com/thesolomonsteph' },
  { label: 'TikTok',      url: 'https://www.tiktok.com/@thesolomonsteph' },
  { label: 'TWN Ministry',url: 'https://www.instagram.com/theworshipnation_twn' },
  { label: 'TWN Studios', url: 'https://www.instagram.com/twnstudiosglobal' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B0D', color: '#FAF7F2' }}>

      {/* ── Main body ── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(64px,8vw,100px) clamp(24px,4vw,64px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,100px)' }}>

          {/* ── LEFT COLUMN: Brand + about + social ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'inline-block' }}>
              <Image
                src="/images/solomon-stephen-logo.svg"
                alt="Solomon Stephen"
                width={40}
                height={92}
                style={{ height: '64px', width: 'auto', filter: 'brightness(10) sepia(1) hue-rotate(5deg) saturate(0.6)' }}
              />
            </Link>

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

            {/* Social links */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '16px' }}>
                Connect
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px' }}>
                {socials.map(s => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(250,247,242,0.35)', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.35)'}
                  >{s.label}</a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Nav + books CTA ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'flex-end' }}>

            {/* Page links in 2 sub-columns */}
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '20px', textAlign: 'right' }}>
                Pages
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 40px' }}>
                {pages.map(({ href, label }) => (
                  <Link key={href} href={href}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(250,247,242,0.38)', textDecoration: 'none', textAlign: 'right', transition: 'color 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.38)'}
                  >{label}</Link>
                ))}
              </div>
            </div>

            {/* Books CTA */}
            <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', textDecoration: 'none', padding: '12px 28px', border: '1px solid rgba(201,168,76,0.3)', transition: 'border-color 0.3s, background 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.06)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >Browse Books on Selar →</a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(201,168,76,0.07)', padding: '20px clamp(24px,4vw,64px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: