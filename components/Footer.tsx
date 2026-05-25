import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B0D', padding: 'clamp(60px,8vw,100px) clamp(24px,4vw,56px) clamp(32px,4vw,48px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '60px' }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 600, color: '#FAF7F2', marginBottom: '16px' }}>
              Solomon<span style={{ color: '#C9A84C' }}> Stephen</span>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', lineHeight: 1.8, color: 'rgba(250,247,242,0.35)', maxWidth: '260px' }}>
              Gospel Minister · Worship Leader · Author · Founder of The Worship Nation
            </p>
          </div>

          {/* Pages */}
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '20px' }}>Pages</p>
            {[
              { href: '/about',       label: 'About' },
              { href: '/music',       label: 'Music' },
              { href: '/studios',     label: 'Studios' },
              { href: '/books',       label: 'Books' },
              { href: '/events',      label: 'Events' },
              { href: '/gallery',     label: 'Gallery' },
              { href: '/contact',     label: 'Contact' },
              { href: '/tai-digital', label: 'TAI Digital' },
            ].map(({ href, label }) => (
              <div key={href} style={{ marginBottom: '10px' }}>
                <Link href={href} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(250,247,242,0.45)', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)'}
                >{label}</Link>
              </div>
            ))}
          </div>

          {/* Social */}
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '20px' }}>Connect</p>
            {[
              { label: 'Instagram', url: 'https://www.instagram.com/thesolomonsteph' },
              { label: 'YouTube',   url: 'https://www.youtube.com/@thesolomonsteph' },
              { label: 'Facebook',  url: 'https://www.facebook.com/thesolomonsteph' },
              { label: 'TikTok',    url: 'https://www.tiktok.com/@thesolomonsteph' },
              { label: 'TWN Ministry', url: 'https://www.instagram.com/theworshipnation_twn' },
              { label: 'TWN Studios',  url: 'https://www.instagram.com/twnstudiosglobal' },
            ].map(s => (
              <div key={s.label} style={{ marginBottom: '10px' }}>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(250,247,242,0.45)', transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)'}
                >{s.label}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '20px' }}>Studio</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', lineHeight: 1.8, color: 'rgba(250,247,242,0.3)', marginBottom: '24px' }}>
              Kenny T. Kay Building<br />Langbasa Road, Ajah<br />Lagos, Nigeria
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)', marginBottom: '12px' }}>Books</p>
            <a href="https://selar.com/showlove/solomonstephen" target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(250,247,242,0.45)', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)'}
            >Browse on Selar →</a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(201,168,76,0.08)', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'rgba(250,247,242,0.2)' }}>
            © {new Date().getFullYear()} Solomon Stephen. All rights reserved.
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: 'rgba(250,247,242,0.2)' }}>
            Built with ♥ by{' '}
            <a href="https://theasaphmedia.com" target="_blank" rel="noopener noreferrer"
              style={{ color: 'rgba(201,168,76,0.5)', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.5)'}
            >TAI Digital</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
