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

  // Custom cursor
  useEffect(() => {
    const dot  = document.createElement('div')
    const ring = document.createElement('div')
    dot.className  = 'cursor-dot'
    ring.className = 'cursor-ring'
    document.body.appendChild(dot)
    document.body.appendChild(ring)

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0
    const move = (e: MouseEvent) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'
    }
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove', move)
    animate()
    return () => {
      window.removeEventListener('mousemove', move)
      dot.remove()
      ring.remove()
    }
  }, [])

  return (
    <>
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
            style={{ height: scrolled ? '44px' : '56px', width: 'auto', transition: 'height 0.45s cubic-bezier(0.16,1,0.3,1)', filter: open ? 'brightness(10)' : 'none' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(20px,2.5vw,38px)' }}>
          {navLinks.filter(l => l.href !== '/').slice(0, 6).map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily:    'DM Sans, sans-serif',
              fontSize:      '11px',
              fontWeight:    500,
              letterSpacing: '0.08em',
              color:         pathname === link.href ? '#C9A84C' : '#3D4B3D',
              textTransform: 'uppercase',
              transition:    'color 0.3s',
              position:      'relative',
              paddingBottom: '4px',
            }}
              onMouseEnter={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = '#1A2E1A' }}
              onMouseLeave={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = '#3D4B3D' }}
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
          <Link href="/contact" style={{
            fontFamily:    'DM Sans, sans-serif',
            fontSize:      '10px',
            fontWeight:    500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding:       '11px 26px',
            background:    '#1A2E1A',
            color:         '#FAF7F2',
            cursor:        'none',
            transition:    'background 0.3s, transform 0.3s',
            display:       'inline-block',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2A4A2A'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1A2E1A'; (e.currentTarget as HTMLElement).style.transform = 'none' }}
          >
            Get In Touch
          </Link>
        </nav>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          background: 'none', border: 'none', cursor: 'none',
          padding: '8px', zIndex: 1010, position: 'relative',
          display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end',
        }} aria-label={open ? 'Close menu' : 'Open menu'}>
          <span style={{
            display: 'block', height: '1.5px', width: '28px',
            background: open ? '#FAF7F2' : '#0D1B0D',
            transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s',
            transformOrigin: 'center',
          }} />
          <span style={{
            display: 'block', height: '1.5px', width: open ? '28px' : '18px',
            background: open ? '#FAF7F2' : '#0D1B0D',
            opacity: open ? 0 : 1,
            transition: 'opacity 0.3s, background 0.45s, width 0.4s',
          }} />
          <span style={{
            display: 'block', height: '1.5px', width: '28px',
            background: open ? '#FAF7F2' : '#0D1B0D',
            transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            transition: 'transform 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s',
            transformOrigin: 'center',
          }} />
        </button>
      </header>

      {/* ── Full-screen overlay menu ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: '#1A2E1A',
        clipPath: open ? 'ellipse(150% 150% at 95% 4%)' : 'ellipse(0% 0% at 95% 4%)',
        transition: 'clip-path 0.75s cubic-bezier(0.16,1,0.3,1)',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(80px,10vw,120px) clamp(24px,6vw,80px)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 15% 85%, rgba(201,168,76,0.07) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <nav style={{ position: 'relative', zIndex: 1 }}>
          {navLinks.map((link, i) => (
            <div key={link.href} style={{
              borderTop: '1px solid rgba(201,168,76,0.1)',
              opacity:   open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(24px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '0.55s',
              transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
              transitionDelay: `${0.08 + i * 0.055}s`,
            }}>
              <Link href={link.href} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: 'clamp(12px,1.8vw,20px) 0',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(26px,4vw,50px)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                color: pathname === link.href ? '#C9A84C' : '#FAF7F2',
                lineHeight: 1.1,
                transition: 'color 0.3s, padding-left 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
                onMouseEnter={e => {
                  if (pathname !== link.href) {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#C9A84C'
                    el.style.paddingLeft = '16px'
                  }
                }}
                onMouseLeave={e => {
                  if (pathname !== link.href) {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#FAF7F2'
                    el.style.paddingLeft = '0'
                  }
                }}
              >
                <span>{link.label}</span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '11px',
                  letterSpacing: '0.2em', color: 'rgba(201,168,76,0.35)',
                }}>0{i + 1}</span>
              </Link>
            </div>
          ))}

          {/* Social links */}
          <div style={{
            borderTop: '1px solid rgba(201,168,76,0.1)',
            paddingTop: 'clamp(16px,2.5vw,28px)',
            marginTop: '4px',
            opacity:   open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(24px)',
            transitionProperty: 'opacity, transform',
            transitionDuration: '0.55s',
            transitionDelay: `${0.08 + navLinks.length * 0.055 + 0.04}s`,
            display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '10px',
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.35)',
            }}>Follow —</span>
            {[
              { label: 'Instagram', url: 'https://www.instagram.com/thesolomonsteph' },
              { label: 'YouTube',   url: 'https://www.youtube.com/@thesolomonsteph' },
              { label: 'Facebook',  url: 'https://www.facebook.com/thesolomonsteph' },
              { label: 'TikTok',    url: 'https://www.tiktok.com/@thesolomonsteph' },
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '11px',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                color: 'rgba(250,247,242,0.4)', transition: 'color 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.4)'}
              >{s.label}</a>
            ))}
          </div>
        </nav>
      </div>

      <style>{`
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </>
  )
}
