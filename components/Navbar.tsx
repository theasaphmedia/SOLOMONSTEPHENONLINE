'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

// Primary nav — always visible on desktop
const navLinks = [
  { href: '/',            label: 'Home' },
  { href: '/about',       label: 'About' },
  { href: '/music',       label: 'Music' },
  { href: '/studios',     label: 'Studios' },
  { href: '/events',      label: 'Events' },
  { href: '/tai-digital', label: 'TAI Digital' },
  { href: '/contact',     label: 'Contact' },
]

// More dropdown
const moreLinks = [
  { href: '/live',        label: 'Watch Live' },
  { href: '/books',       label: 'Books' },
  { href: '/gallery',     label: 'Gallery' },
  { href: '/press',       label: 'Press' },
]

const updatesLinks = [
  { href: '/updates',     label: 'Blog' },
  { href: '/updates#devotionals', label: 'Devotionals' },
]

export default function Navbar() {
  const [open, setOpen]           = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [dropOpen, setDropOpen]   = useState(false)
  const [mobileUpdOpen, setMobileUpdOpen] = useState(false)
  const [isLive, setIsLive]       = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkLive = () => fetch('/api/live').then(r => r.json()).then(d => setIsLive(d.live)).catch(() => {})
    checkLive()
    const interval = setInterval(checkLive, 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setMobileUpdOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const closeMenu = () => { setOpen(false); setMobileUpdOpen(false) }

  const linkColor = (href: string) =>
    pathname === href ? '#C9A84C' : scrolled ? '#3D4B3D' : 'rgba(250,247,242,0.88)'

  return (
    <>
      <style>{`
        .nav-desktop { display:flex; align-items:center; gap:clamp(16px,2vw,32px); }
        .nav-cta { display:inline-block; }
        .hamburger { display:flex; }
        @media(min-width:769px) { .hamburger { display:none !important; } }
        @media(max-width:768px) { .nav-desktop { display:none !important; } .nav-cta { display:none !important; } }
        @media(pointer:coarse) { .cursor-dot,.cursor-ring { display:none !important; } }
        .drop-menu {
          position:absolute; top:calc(100% + 10px); left:50%; transform:translateX(-50%);
          background:rgba(250,247,242,0.98); backdrop-filter:blur(16px);
          border:1px solid rgba(201,168,76,0.18); border-radius:4px;
          padding:6px 0; min-width:180px;
          box-shadow:0 8px 32px rgba(0,0,0,0.1); z-index:2000;
        }
        .drop-item {
          display:block; padding:10px 20px;
          font-family:'DM Sans',sans-serif; font-size:11px;
          letter-spacing:0.1em; text-transform:uppercase;
          color:#3D4B3D; text-decoration:none;
          transition:background 0.15s,color 0.15s; white-space:nowrap;
        }
        .drop-item:hover { background:rgba(201,168,76,0.08); color:#C9A84C; }
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        .live-badge { display:flex; align-items:center; gap:6px; background:rgba(220,38,38,0.12); border:1px solid rgba(220,38,38,0.35); border-radius:3px; padding:5px 12px; text-decoration:none; transition:background 0.2s; }
        .live-badge:hover { background:rgba(220,38,38,0.22); }
      `}</style>

      {/* ── Main bar ── */}
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        padding:'0 clamp(20px,4vw,56px)',
        height: scrolled ? '64px' : '80px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        background: open ? 'transparent' : scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
        backdropFilter: !open && scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: !open && scrolled ? 'blur(14px)' : 'none',
        borderBottom: !open && scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
        transition:'height 0.45s cubic-bezier(0.16,1,0.3,1), background 0.45s',
      }}>
        {/* Logo */}
        <Link href="/" onClick={closeMenu} style={{ zIndex:1010, position:'relative', display:'flex', alignItems:'center' }}>
          <Image src="/images/solomon-stephen-logo.svg" alt="Solomon Stephen" width={48} height={112}
            style={{ height: scrolled ? '44px' : '56px', width:'auto', transition:'height 0.45s cubic-bezier(0.16,1,0.3,1)', filter: open ? 'brightness(10)' : !scrolled ? 'brightness(8)' : 'none' }}
            priority />
        </Link>

        {/* Desktop nav */}
        <nav className="nav-desktop">
          {navLinks.filter(l => l.href !== '/').map(link => (
            <Link key={link.href} href={link.href} style={{
              fontFamily:'DM Sans,sans-serif', fontSize:'11px', fontWeight:500,
              letterSpacing:'0.08em', textTransform:'uppercase',
              color: linkColor(link.href), transition:'color 0.3s',
              position:'relative', paddingBottom:'4px', textDecoration:'none',
            }}
              onMouseEnter={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
              onMouseLeave={e => { if (pathname !== link.href) (e.currentTarget as HTMLElement).style.color = linkColor(link.href) }}
            >
              {link.label}
              {pathname === link.href && (
                <span style={{ position:'absolute', bottom:0, left:0, right:0, height:'1px', background:'#C9A84C', transformOrigin:'left', animation:'lineGrow 0.4s cubic-bezier(0.16,1,0.3,1) both' }} />
              )}
            </Link>
          ))}

          {/* More dropdown */}
          <div ref={dropRef} style={{ position:'relative' }}
            onMouseEnter={() => setDropOpen(true)}
            onMouseLeave={() => setDropOpen(false)}
          >
            <button style={{
              background:'none', border:'none', cursor:'pointer', padding:'0 0 4px',
              fontFamily:'DM Sans,sans-serif', fontSize:'11px', fontWeight:500,
              letterSpacing:'0.08em', textTransform:'uppercase',
              color: scrolled ? '#3D4B3D' : 'rgba(250,247,242,0.88)',
              display:'flex', alignItems:'center', gap:'5px', transition:'color 0.3s',
            }}>
              More
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" style={{ opacity:0.5, transition:'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }}>
                <path d="M1.5 3L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
            {dropOpen && (
              <div className="drop-menu">
                {moreLinks.map(item => (
                  <Link key={item.href} href={item.href} className="drop-item" onClick={() => setDropOpen(false)}>
                    {item.label}
                  </Link>
                ))}
                <div style={{ borderTop:'1px solid rgba(201,168,76,0.12)', margin:'4px 0' }} />
                {updatesLinks.map(item => (
                  <Link key={item.href} href={item.href} className="drop-item" onClick={() => setDropOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {isLive && (
            <Link href="/live" className="live-badge">
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#DC2626', display:'inline-block', animation:'livePulse 1.5s ease-in-out infinite' }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'#DC2626' }}>Live</span>
            </Link>
          )}

          <Link href="/contact" className="nav-cta" style={{
            fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:500,
            letterSpacing:'0.16em', textTransform:'uppercase',
            padding:'11px 28px', textDecoration:'none',
            background: scrolled ? '#1A2E1A' : 'transparent',
            color: scrolled ? '#FAF7F2' : '#C9A84C',
            border: scrolled ? 'none' : '1px solid rgba(201,168,76,0.5)',
            transition:'background 0.3s,color 0.3s,border-color 0.3s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#C9A84C'; (e.currentTarget as HTMLElement).style.color='#0D1B0D' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background=scrolled?'#1A2E1A':'transparent'; (e.currentTarget as HTMLElement).style.color=scrolled?'#FAF7F2':'#C9A84C' }}
          >Get In Touch</Link>
        </nav>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} className="hamburger" style={{
          background:'none', border:'none', cursor:'pointer',
          padding:'8px', zIndex:1010, position:'relative',
          flexDirection:'column', gap:'5px', alignItems:'flex-end',
        }} aria-label={open ? 'Close menu' : 'Open menu'}>
          {[
            { w:'28px', t: open ? 'translateY(6.5px) rotate(45deg)' : 'none' },
            { w: open ? '28px' : '18px', t:'none', o: open ? 0 : 1 },
            { w:'28px', t: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' },
          ].map((bar, i) => (
            <span key={i} style={{
              display:'block', height:'1.5px', width: bar.w,
              background: open ? '#FAF7F2' : scrolled ? '#0D1B0D' : '#FAF7F2',
              transform: bar.t, opacity: bar.o ?? 1,
              transition:'transform 0.45s cubic-bezier(0.16,1,0.3,1),background 0.45s,width 0.4s,opacity 0.3s',
              transformOrigin:'center',
            }} />
          ))}
        </button>
      </header>

      {/* ── Mobile overlay menu ── */}
      <div style={{
        position:'fixed', inset:0, zIndex:999,
        background:'#0D1B0D',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition:'opacity 0.45s cubic-bezier(0.16,1,0.3,1)',
        overflow:'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 55% at 8% 90%, rgba(201,168,76,0.09) 0%, transparent 65%)', pointerEvents:'none' }} />

        {/* Scrollable nav area — starts below header */}
        <nav style={{
          position:'absolute', top:'60px', left:0, right:0, bottom:0,
          overflowY:'auto', padding:'0px 32px 40px',
          display:'flex', flexDirection:'column', justifyContent:'flex-start',
        }}>
          <div style={{ borderLeft:'1px solid rgba(201,168,76,0.12)', paddingLeft:'20px' }}>
            {navLinks.map((link, i) => (
              <div key={link.href} style={{
                borderBottom:'1px solid rgba(201,168,76,0.07)',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(16px)',
                transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.04}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + i * 0.04}s`,
              }}>
                <Link href={link.href} onClick={closeMenu} style={{
                  display:'flex', alignItems:'center', gap:'16px',
                  padding:'14px 0', textDecoration:'none',
                  color: pathname === link.href ? '#C9A84C' : 'rgba(250,247,242,0.85)',
                }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'0.2em', color:'rgba(201,168,76,0.35)', minWidth:'22px' }}>
                    {String(i + 1).padStart(2,'0')}
                  </span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(16px,4vw,22px)', fontWeight:500, letterSpacing:'0.04em', textTransform:'uppercase' }}>
                    {link.label}
                  </span>
                </Link>
              </div>
            ))}

            {/* More links */}
            {[...moreLinks, ...updatesLinks].map((link, i) => (
              <div key={link.href} style={{
                borderBottom:'1px solid rgba(201,168,76,0.07)',
                opacity: open ? 1 : 0,
                transform: open ? 'translateY(0)' : 'translateY(16px)',
                transition:`opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + (navLinks.length + i) * 0.04}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.08 + (navLinks.length + i) * 0.04}s`,
              }}>
                <Link href={link.href} onClick={closeMenu} style={{
                  display:'flex', alignItems:'center', gap:'16px',
                  padding:'14px 0', textDecoration:'none',
                  color: pathname === link.href ? '#C9A84C' : 'rgba(250,247,242,0.55)',
                }}>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'9px', letterSpacing:'0.2em', color:'rgba(201,168,76,0.25)', minWidth:'22px' }}>
                    {String(navLinks.length + i + 1).padStart(2,'0')}
                  </span>
                  <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'clamp(14px,3.5vw,18px)', fontWeight:500, letterSpacing:'0.04em', textTransform:'uppercase' }}>
                    {link.label}
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* Live link — mobile */}
          {isLive && (
            <Link href="/live" onClick={closeMenu} style={{ display:'flex', alignItems:'center', gap:'10px', margin:'8px 0 0', padding:'12px 0', textDecoration:'none' }}>
              <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#DC2626', animation:'livePulse 1.5s ease-in-out infinite', flexShrink:0 }} />
              <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'14px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#DC2626' }}>We're Live Now — Watch</span>
            </Link>
          )}

          {/* Social links */}
          <div style={{
            marginTop:'32px', paddingLeft:'20px',
            display:'flex', gap:'24px', flexWrap:'wrap',
            opacity: open ? 1 : 0,
            transition:`opacity 0.5s 0.5s`,
          }}>
            {['Instagram','YouTube','Facebook','TikTok'].map((s, i) => (
              <a key={s} href={`https://www.${s.toLowerCase() === 'youtube' ? 'youtube.com/@thesolomonsteph' : s.toLowerCase() === 'instagram' ? 'instagram.com/thesolomonsteph' : s.toLowerCase() === 'facebook' ? 'facebook.com/thesolomonsteph' : 'tiktok.com/@thesolomonsteph'}`}
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(250,247,242,0.3)', textDecoration:'none' }}>
                {s}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  )
}
