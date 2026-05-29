'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About' },
  { href: '/music',       label: 'Music' },
  { href: '/studios',     label: 'Studios' },
  { href: '/books',       label: 'Books' },
  { href: '/events',      label: 'Events' },
  { href: '/gallery',     label: 'Gallery' },
  { href: '/press',       label: 'Press' },
  { href: '/contact',     label: 'Contact' },
  { href: '/tai-digital', label: 'TAI Digital' },
]

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Cursor is handled globally by AnimationEngine + layout.tsx cursor divs

  return (
    <>
      <style>{`
        .nav-desktop { display:flex; align-items:center; gap:clamp(20px,2.5vw,38px); }
        .nav-cta { display:inline-block; }
        .hamburger { display:flex; }
        @media(min-width:769px) { .hamburger { display:none !important; } }
        @media(max-width:768px) { .nav-desktop { display:none !important; } .nav-cta { display:none !important; } }
        @media(pointer:coarse) { .cursor-dot, .cursor-ring { display:none !important; } }
      `}</style>
      {/* ── Main bar ── */}
      <header style={{
        position:       'fixed',
        top: 0, left: 0, right: 0,
        zIndex:         1000,
        padding:        '0 clamp(20px,4vw,56px)',
        height:         scrolled ? '64px' : '80px',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        background: open
          ? 'transparent'
          : scrolled
            ? 'rgba(250,247,242,0.95)'
            : 'rgba(250,247,242,0.0)',
        backdropFilter:       !open && scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: !open && scrolled ? 'blur(14px)' : 'none',
        borderBottom: !open && scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
        transition:   'height 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s',
      }}>

        {/* Logo */}
        <Link href="/" style={{ zIndex: 1010, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/solomon-stephen-logo.svg"
            alt="Solomon Stephen"
            width={48}
            height={112}
            style={{ height: scrolled ? '44px' : '56px', width: 'auto', transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)', filter: open ? 'brightness(10)' : !scrolled ? 'brightness(8)' : 'none' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {navLinks.filter(l => l.href !== '/' && l.href !== '/contact').map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily:    'DM Sans, sans-serif',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.08em',
              color:         pathname === link.href ? '#C9A84C' : scrolled ? '#3D4B3D' : 'rgba(250,247,242,0.88)',
              textTransform: 'uppercase',
              transition:    'color 0.3s',
              position:      'relative',
              paddingBottom: '4px',
            }}
              onMouseEnter={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
              onMouseLeave={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = scrolled ? '#3D4B3D' : 'rgba(250,247,242,0.88)' }}
            >
              {link.label}
              {pathname === link.href && (
                <span style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: '1px', background: '#C9A84C',
                  transformOrigin: 'left',
                  animation: 'lineGrow 0.4s cubic-bezier(0.16,1,0.3,1) both',
                }} />
              )}
            </Link>
          ))}
          <Link href="/contact" className="nav-cta" style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontSize:      '10px',
            fontWeight:    500,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding:       '11px 28px',
            background:    scrolled ? '#1A2E1A' : 'transparent',
            color:         scrolled ? '#FAF7F2' : '#C9A84C',
            border:        scrolled ? 'none' : '1px solid rgba(201,168,76,0.5)',
            transition:    'background 0.3s, color 0.3s, border-color 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C'; (e.currentTarget as HTMLElement).style.color = '#0D1B0D' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = scrolled ? '#1A2E1A' : 'transparent'; (e.currentTarget as HTMLElement).style.color = scrolled ? '#FAF7F2' : '#C9A84C' }}
          >
            Get In Touch
          </Link>
        </nav>

        {/* Hamburger — mobile only */}
        <button onClick={() => setOpen(!open)} className="hamburger" style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '8px', zIndex: 1010, position: 'relative',
          flexDirection: 'column', gap: '5px', alignItems: 'flex-end',
        }} aria-label={open ? 'Close menu' : 'Open menu'}>
          <span style={{
            display: 'block', height: '1.5px', width: '28px',
            background: open ? '#FAF7F2' : scrolled ? '#0D1B0D' : '#FAF7F2',
            transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s',
            transformOrigin: 'center',
          }} />
          <span style={{
            display: 'block', height: '1.5px', width: open ? '28px' : '18px',
            background: open ? '#FAF7F2' : scrolled ? '#0D1B0D' : '#FAF7F2',
            opacity: open ? 0 : 1,
            transition: 'opacity 0.3s, background 0.45s, width 0.4s',
          }} />
          <span style={{
            display: 'block', height: '1.5px', width: '28px',
            background: open ? '#FAF7F2' : scrolled ? '#0D1B0D' : '#FAF7F2',
            transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s',
            transformOrigin: 'center',
          }} />
        </button>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: '#0D1B0D',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(80px,10vw,120px) clamp(28px,6vw,80px)',
        overflow: 'hidden',
      }}>
        {/* Ambient gold glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 55% at 8% 90%, rgba(201,168,76,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Thin gold vertical accent */}
        <div style={{ position:'absolute', top:'15%', bottom:'15%', left:'clamp(28px,6vw,80px)', width:'1px', background:'rgba(201,168,76,0.12)', pointerEvents:'none' }} />

        {/* Menu nav links */}
        <nav style={{ position: 'relative', zIndex: 1, paddingLeft: 'clamp(20px,3vw,48px)' }}>
          {navLinks.map((link, i) => (
            <div key={link.href} style={{
              borderTop: '1px solid rgba(201,168,76,0.08)',
              opacity:   open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.6s',
              transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: `${0.1 + i * 0.05}s`,
            }}>
              <Link href={link.href} style={{
                display: 'flex', alignItems: 'baseline', gap: '20px',
                padding: 'clamp(10px,1.6vw,18px) 0',
                textDecoration: 'none',
                color: pathname === link.href ? '#C9A84C' : '#FAF7F2',
                transition: 'color 0.3s',
              }}
                onMouseEnter={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
                onMouseLeave={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = '#FAF7F2' }}
              >
                <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.22em', color:'rgba(201,168,76,0.4)', minWidth:'28px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(28px,4.5vw,56px)', fontWeight:400, letterSpacing:'-0.01em', lineHeight:1 }}>
                  {link.label}
                </span>
              </Link>
            </div>
          ))}

          {/* Bottom bar — social + contact */}
          <div style={{
            borderTop: '1px solid rgba(201,168,76,0.12)',
            marginTop: 'clamp(16px,2.5vw,32px)',
            paddingTop: 'clamp(16px,2.5vw,28px)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(16px)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '0.6s',
            transitionDelay: `${0.1 + navLinks.length * 0.05 + 0.06}s`,
          }}>
            <div style={{ display:'flex', gap:'clamp(16px,2.5vw,32px)', flexWrap:'wrap' }}>
              {[
                { label: 'Instagram', url: 'https://www.instagram.com/thesolomonsteph' },
                { label: 'YouTube',   url: 'https://www.youtube.com/@thesolomonsteph' },
                { label: 'Facebook',  url: 'https://www.facebook.com/thesolomonsteph' },
                { label: 'TikTok',    url: 'https://www.tiktok.com/@thesolomonsteph' },
              ].map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                  fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.18em',
                  textTransform:'uppercase', color:'rgba(250,247,242,0.35)', textDecoration:'none', transition:'color 0.3s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.35)'}
                >{s.label}</a>
              ))}
            </div>
            <Link href="/contact" style={{
              fontFamily:"'DM Sans',sans-serif", fontSize:'11px', fontWeight:500, letterSpacing:'0.18em',
              textTransform:'uppercase', color:'#C9A84C', textDecoration:'none',
              padding:'11px 28px', border:'1px solid rgba(201,168,76,0.35)', transition:'border-color 0.3s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.35)'}
            >Get In Touch →</Link>
          </div>
        </nav>
      </div>
    </>
  )
}
