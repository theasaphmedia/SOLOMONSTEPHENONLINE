"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NAV_LINKS = [
  { href: "/",            label: "Home",        num: "01" },
  { href: "/about",       label: "About",       num: "02" },
  { href: "/music",       label: "Music",       num: "03" },
  { href: "/books",       label: "Books",       num: "04" },
  { href: "/studios",     label: "Studios",     num: "05" },
  { href: "/events",      label: "Events",      num: "06" },
  { href: "/gallery",     label: "Gallery",     num: "07" },
  { href: "/teaching",    label: "Teaching",    num: "08" },
  { href: "/tai-digital", label: "TAI Digital", num: "09" },
  { href: "/contact",     label: "Contact",     num: "10" },
]

const DESKTOP_LINKS = [
  { href: "/about",   label: "About"   },
  { href: "/music",   label: "Music"   },
  { href: "/studios", label: "Studios" },
  { href: "/events",  label: "Events"  },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [closing,   setClosing]   = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname  = usePathname()
  const menuRef   = useRef<HTMLDivElement>(null)

  const isHome = pathname === "/"
  const isTAI  = pathname === "/tai-digital"

  /* ── Scroll detection ── */
  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const fn = () => setScrolled(window.scrollY > 60)
    fn()
    window.addEventListener("scroll", fn, { passive: true })
    return () => window.removeEventListener("scroll", fn)
  }, [isHome])

  /* ── Close on route change ── */
  useEffect(() => { closeMenu() }, [pathname]) // eslint-disable-line

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const openMenu = useCallback(() => {
    setClosing(false)
    setMenuOpen(true)
  }, [])

  const closeMenu = useCallback(() => {
    setClosing(true)
    setTimeout(() => { setMenuOpen(false); setClosing(false) }, 480)
  }, [])

  /* Nav bg */
  const solid = scrolled || !isHome
  const bg = solid
    ? isTAI ? "rgba(4,0,12,0.96)" : "rgba(4,8,4,0.96)"
    : "transparent"
  const border = solid
    ? isTAI ? "rgba(124,58,237,0.12)" : "rgba(201,168,76,0.08)"
    : "transparent"

  return (
    <>
      {/* ─────────────────────────────────────────────────────
          STYLES
      ───────────────────────────────────────────────────── */}
      <style>{`
        /* Link underline draw */
        .nv-link {
          position: relative;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 500;
          color: rgba(245,240,232,0.45);
          transition: color 0.3s;
        }
        .nv-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: #C9A84C;
          transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .nv-link:hover,
        .nv-link.is-active { color: #C9A84C; }
        .nv-link:hover::after,
        .nv-link.is-active::after { width: 100%; }

        /* Menu toggle */
        .nv-menu-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 0;
          color: rgba(245,240,232,0.55);
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          font-weight: 500;
          transition: color 0.3s;
        }
        .nv-menu-btn:hover { color: #C9A84C; }
        .nv-bars {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          width: 20px;
        }
        .nv-bar {
          display: block;
          height: 1px;
          background: currentColor;
          border-radius: 1px;
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1),
                      transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.2s;
        }

        /* Full-screen overlay */
        @keyframes fsIn  { from { clip-path: inset(0 0 100% 0); } to { clip-path: inset(0 0 0% 0); } }
        @keyframes fsOut { from { clip-path: inset(0 0 0% 0); } to { clip-path: inset(0 0 100% 0); } }

        .fs-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          background: #111a11;
          display: flex;
          overflow: hidden;
          animation: fsIn 0.6s cubic-bezier(0.77,0,0.18,1) forwards;
        }
        .fs-overlay.closing {
          animation: fsOut 0.48s cubic-bezier(0.77,0,0.18,1) forwards;
        }

        /* Link slide-in */
        @keyframes linkIn {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fs-item {
          opacity: 0;
          animation: linkIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
          border-top: 1px solid rgba(201,168,76,0.07);
        }
        .fs-item:last-child { border-bottom: 1px solid rgba(201,168,76,0.07); }

        /* Individual link row */
        .fs-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: clamp(9px,1.1vh,14px) clamp(24px,4vw,56px);
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: background 0.25s;
          cursor: pointer;
        }
        .fs-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #E8C96A, #C9A84C);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-row:hover { background: rgba(201,168,76,0.04); }
        .fs-row:hover::before,
        .fs-row.is-current::before { transform: scaleY(1); }

        .fs-num {
          font-family: 'Inter', sans-serif;
          font-size: 9px;
          letter-spacing: 0.18em;
          color: rgba(245,240,232,0.15);
          flex-shrink: 0;
          width: 24px;
          transition: color 0.3s;
        }
        .fs-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px,1.9vw,26px);
          font-weight: 300;
          color: rgba(245,240,232,0.55);
          letter-spacing: -0.2px;
          line-height: 1;
          transition: color 0.3s, transform 0.35s cubic-bezier(0.16,1,0.3,1);
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }
        .fs-arrow {
          font-size: 14px;
          color: rgba(201,168,76,0);
          transition: color 0.3s, transform 0.35s;
          margin-left: auto;
        }
        .fs-row:hover .fs-num { color: rgba(201,168,76,0.4); }
        .fs-row:hover .fs-name { color: #F5F0E8; transform: translateX(6px); }
        .fs-row:hover .fs-arrow { color: rgba(201,168,76,0.6); transform: translateX(4px); }
        .fs-row.is-current .fs-name { color: #C9A84C; }
        .fs-row.is-current .fs-num  { color: rgba(201,168,76,0.35); }
        .fs-row.is-current .fs-arrow { color: rgba(201,168,76,0.5); }

        /* Side panel */
        .fs-side {
          width: 300px;
          flex-shrink: 0;
          border-left: 1px solid rgba(201,168,76,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 80px 40px 48px;
        }
        @media (max-width: 860px) { .fs-side { display: none; } }

        /* Responsive show/hide */
        .desk-only { display: none !important; }
        @media (min-width: 768px) { .desk-only { display: flex !important; } }
      `}</style>

      {/* ─────────────────────────────────────────────────────
          NAV BAR
      ───────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: solid ? "14px 0" : isHome ? "22px 0" : "16px 0",
          background: bg,
          backdropFilter: solid ? "blur(20px) saturate(1.6)" : "none",
          WebkitBackdropFilter: solid ? "blur(20px) saturate(1.6)" : "none",
          borderBottom: `1px solid ${border}`,
          transition: "padding 0.4s, background 0.5s, border-color 0.5s",
        }}
      >
        <div
          style={{
            padding: "0 clamp(24px,4vw,56px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <span
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "clamp(17px,1.6vw,22px)",
                fontWeight: 300,
                fontStyle: "italic",
                letterSpacing: "0.04em",
                color: "#F5F0E8",
                lineHeight: 1,
              }}
            >
              Solomon{" "}
              <strong
                style={{
                  fontWeight: 700,
                  fontStyle: "italic",
                  background: "linear-gradient(135deg,#E8C96A 0%,#C9A84C 55%,#D4B85E 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Stephen.
              </strong>
            </span>
          </Link>

          {/* Desktop links */}
          <div
            className="desk-only"
            style={{ alignItems: "center", gap: "clamp(20px,2.5vw,40px)" }}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {DESKTOP_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHoveredLink(l.href)}
                className={`nv-link${pathname === l.href ? " is-active" : ""}`}
                style={{
                  opacity: hoveredLink && hoveredLink !== l.href ? 0.3 : 1,
                  transition: "color 0.3s, opacity 0.3s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: Contact + Menu */}
          <div style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
            <Link
              href="/contact"
              className="desk-only nv-link"
              style={{
                paddingLeft: 20,
                borderLeft: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              Get in touch
            </Link>

            <button
              className="nv-menu-btn"
              onClick={menuOpen ? closeMenu : openMenu}
              aria-label="Toggle menu"
            >
              <span className="nv-bars">
                <span
                  className="nv-bar"
                  style={{
                    width: 20,
                    transform: menuOpen ? "rotate(45deg) translate(3px,3px)" : "none",
                  }}
                />
                <span
                  className="nv-bar"
                  style={{
                    width: menuOpen ? 20 : 13,
                    transform: menuOpen ? "rotate(-45deg) translate(3px,-3px)" : "none",
                  }}
                />
              </span>
              <span className="desk-only" style={{ fontSize: 9, letterSpacing: "0.28em" }}>
                {menuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ─────────────────────────────────────────────────────
          FULL-SCREEN OVERLAY
      ───────────────────────────────────────────────────── */}
      {menuOpen && (
        <div ref={menuRef} className={`fs-overlay${closing ? " closing" : ""}`}>

          {/* Decorative large number */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "55%",
              transform: "translate(-50%,-50%)",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "clamp(180px,28vw,360px)",
              fontWeight: 700,
              color: "rgba(201,168,76,0.025)",
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 0,
            }}
          >
            {NAV_LINKS.find(l => l.href === pathname)?.num ?? "01"}
          </div>

          {/* Links column */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: 60,
              position: "relative",
              zIndex: 1,
              overflowY: "auto",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <div
                key={link.href}
                className="fs-item"
                style={{ animationDelay: `${0.04 + i * 0.05}s` }}
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`fs-row${pathname === link.href ? " is-current" : ""}`}
                >
                  <span className="fs-num">{link.num}</span>
                  <span className="fs-name">{link.label}</span>
                  <span className="fs-arrow">→</span>
                </Link>
              </div>
            ))}
          </div>

          {/* Side panel */}
          <div className="fs-side">
            <div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 8,
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  color: "rgba(201,168,76,0.4)",
                  marginBottom: 20,
                }}
              >
                The Worship Nation
  
              </div>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(18px,1.8vw,24px)",
                  fontWeight: 300,
                  color: "rgba(245,240,232,0.42)",
                  lineHeight: 1.5,
                }}
              >
                Every season of preparation is a seed{" "}
                <span style={{ color: "#C9A84C" }}>for an unseen harvest.</span>
              </p>
            </div>

            <div>
              <div style={{ height: 1, background: "rgba(201,168,76,0.12)", marginBottom: 28 }} />
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(245,240,232,0.18)", marginBottom: 16 }}>
                TWN Studios · Ajah, Lagos
              </div>
              <Link
                href="/studios"
                onClick={closeMenu}
                style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "Inter, sans-serif", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: "#0a1505", background: "linear-gradient(135deg,#E8C96A,#C9A84C)", padding: "12px 24px", borderRadius: 999, textDecoration: "none", transition: "transform 0.3s, box-shadow 0.3s" }}
                onMouseEnter={e => { ;(e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(201,168,76,0.4)" }}
                onMouseLeave={e => { ;(e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none" }}
              >
                Book a Session <span style={{ fontSize: 14 }}>\u2192</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
