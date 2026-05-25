'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const links = [
  { href: '/music',    label: 'Music' },
  { href: '/books',    label: 'Books' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/studios',  label: 'Studios' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/events',   label: 'Events' },
  { href: '/contact',  label: 'Contact' },
]

export default function InnerNav({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
  const path = usePathname()
  const isDark = theme === 'dark'
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY
      setScrolled(sy > 40)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docH > 0 ? (sy / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = isDark
    ? scrolled ? 'rgba(6,14,6,0.98)' : 'rgba(6,14,6,0.82)'
    : scrolled ? 'rgba(245,240,232,0.99)' : 'rgba(245,240,232,0.85)'

  const borderColor = isDark
    ? `rgba(201,168,76,${scrolled ? 0.14 : 0.07})`
    : `rgba(26,46,26,${scrolled ? 0.12 : 0.06})`

  const shadow = scrolled
    ? isDark ? '0 2px 28px rgba(0,0,0,0.55)' : '0 2px 20px rgba(26,46,26,0.1)'
    : 'none'

  return (
    <>
      <style>{`
        .innernav-link {
          position: relative;
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          text-decoration: none;
          padding-bottom: 3px;
          transition: color 0.22s;
        }
        .innernav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #C9A84C;
          transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .innernav-link:hover::after,
        .innernav-link.active::after { width: 100%; }

        .innernav-cta {
          background: linear-gradient(135deg, #C9A84C, #a8873a);
          color: #1A2E1A;
          font-family: 'Inter', sans-serif;
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 10px 22px;
          border-radius: 999px;
          text-decoration: none;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.28s;
          box-shadow: 0 0 16px rgba(201,168,76,0.35);
        }
        .innernav-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.45);
        }

        .mob-nav-link {
          display: block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 14px 0;
          border-bottom: 1px solid rgba(201,168,76,0.1);
          transition: color 0.2s, padding-left 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .mob-nav-link:hover { padding-left: 8px; color: #C9A84C !important; }

        @media (max-width: 768px) {
          .innernav-desktop { display: none !important; }
          .innernav-burger  { display: flex !important; }
        }
      `}</style>

      {/* SCROLL PROGRESS BAR */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'2px', zIndex:200, pointerEvents:'none' }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.35))',
          transition: 'width 0.08s linear',
          boxShadow: '0 0 8px rgba(201,168,76,0.55)',
        }}/>
      </div>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '72px', zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,4vw,48px)',
        background: navBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${borderColor}`,
        boxShadow: shadow,
        transition: 'background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '20px', fontWeight: 500,
          color: isDark ? '#fff' : '#1a1a1a',
          textDecoration: 'none', letterSpacing: '0.02em',
          transition: 'opacity 0.2s',
          whiteSpace: 'nowrap',
        }}
        onMouseOver={e=>(e.currentTarget as HTMLElement).style.opacity='0.75'}
        onMouseOut={e=>(e.currentTarget as HTMLElement).style.opacity='1'}>
          Solomon<span style={{ color: '#C9A84C' }}> Stephen</span>
        </Link>

        {/* Desktop links */}
        <div className="innernav-desktop" style={{ display:'flex', alignItems:'center', gap:'26px' }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className={`innernav-link${path === l.href ? ' active' : ''}`}
              style={{ color: path === l.href ? '#C9A84C' : isDark ? 'rgba(255,255,255,0.48)' : 'rgba(0,0,0,0.48)' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <Link href="/contact" className="innernav-cta">Book Studio</Link>

          {/* Burger */}
          <button className="innernav-burger" onClick={()=>setMenuOpen(!menuOpen)}
            style={{ display:'none', flexDirection:'column', gap:'5px', background:'none', border:'none', cursor:'pointer', padding:'4px' }}>
            {[0,1,2].map(i=>(
              <span key={i} style={{
                display:'block', width:'22px', height:'1.5px',
                background: isDark ? '#fff' : '#1a1a1a',
                transition: 'all 0.3s',
                transform: menuOpen && i===0 ? 'rotate(45deg) translate(4px,4px)'
                  : menuOpen && i===1 ? 'scaleX(0)'
                  : menuOpen && i===2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
                opacity: menuOpen && i===1 ? 0 : 1,
              }}/>
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position:'fixed', top:'72px', left:0, right:0, zIndex:99,
        background: isDark ? 'rgba(6,14,6,0.98)' : 'rgba(245,240,232,0.99)',
        backdropFilter: 'blur(24px)',
        padding: menuOpen ? '20px clamp(20px,4vw,48px) 32px' : '0 clamp(20px,4vw,48px)',
        maxHeight: menuOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), padding 0.4s',
        borderBottom: menuOpen ? `1px solid ${borderColor}` : 'none',
      }}>
        {links.map(l=>(
          <Link key={l.href} href={l.href} className="mob-nav-link"
            onClick={()=>setMenuOpen(false)}
            style={{ color: path===l.href ? '#C9A84C' : isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  )
}
