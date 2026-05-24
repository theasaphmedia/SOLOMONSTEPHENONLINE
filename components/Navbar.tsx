"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const allLinks = [
  { href: "/",            label: "Home",       num: "01" },
  { href: "/about",       label: "About",      num: "02" },
  { href: "/music",       label: "Music",      num: "03" },
  { href: "/books",       label: "Books",      num: "04" },
  { href: "/studios",     label: "Studios",    num: "05" },
  { href: "/events",      label: "Events",     num: "06" },
  { href: "/gallery",     label: "Gallery",    num: "07" },
  { href: "/teaching",    label: "Teaching",   num: "08" },
  { href: "/tai-digital", label: "TAI Digital",num: "09" },
  { href: "/contact",     label: "Contact",    num: "10" },
]

const desktopLinks = [
  { href: "/about",   label: "About"   },
  { href: "/music",   label: "Music"   },
  { href: "/studios", label: "Studios" },
  { href: "/events",  label: "Events"  },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const [hovered, setHovered]     = useState<string | null>(null)
  const pathname = usePathname()

  const isTAI  = pathname === "/tai-digital"
  const isHome = pathname === "/"

  // Scroll detection
  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  const navBg = scrolled || !isHome
    ? isTAI
      ? "rgba(6,0,16,0.97)"
      : "rgba(5,9,10,0.97)"
    : "transparent"

  const navBorder = scrolled || !isHome
    ? isTAI
      ? "1px solid rgba(124,58,237,0.15)"
      : "1px solid rgba(201,168,76,0.1)"
    : "1px solid transparent"

  return (
    <>
      <style>{`
        /* ── Nav link draw animation ── */
        .nl { position:relative; text-decoration:none; padding:4px 0; }
        .nl::after {
          content:''; position:absolute; bottom:0; left:0;
          width:0; height:1px; background:#C9A84C;
          transition:width 0.38s cubic-bezier(0.22,1,0.36,1);
        }
        .nl:hover::after, .nl.active::after { width:100%; }
        .nl.active { color:#C9A84C !important; }

        /* ── Hamburger ── */
        .hb-line {
          display:block; height:1.5px; background:#C9A84C;
          transition:all 0.38s cubic-bezier(0.22,1,0.36,1);
          transform-origin:center;
        }

        /* ── Full-screen menu ── */
        @keyframes menuReveal {
          from { clip-path: inset(0 0 100% 0); }
          to   { clip-path: inset(0 0 0% 0); }
        }
        @keyframes menuHide {
          from { clip-path: inset(0 0 0% 0); }
          to   { clip-path: inset(0 0 100% 0); }
        }
        .fs-menu {
          position:fixed; inset:0; z-index:60;
          background:#1A2E1A;
          display:flex; flex-direction:column;
          animation: menuReveal 0.65s cubic-bezier(0.77,0,0.18,1) forwards;
          overflow:hidden;
        }
        .fs-menu.closing {
          animation: menuHide 0.5s cubic-bezier(0.77,0,0.18,1) forwards;
        }

        @keyframes linkSlide {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fs-link-wrap {
          opacity:0;
          animation: linkSlide 0.55s cubic-bezier(0.16,1,0.3,1) forwards;
          border-bottom:1px solid rgba(201,168,76,0.08);
        }

        .fs-link {
          display:flex; align-items:center; gap:clamp(16px,3vw,32px);
          padding:clamp(12px,2.5vw,22px) clamp(32px,6vw,80px);
          text-decoration:none;
          transition:all 0.3s ease;
          position:relative; overflow:hidden;
        }
        .fs-link::before {
          content:''; position:absolute; left:0; top:0; bottom:0;
          width:3px; background:linear-gradient(to bottom,#E8C96A,#C9A84C);
          transform:scaleY(0); transform-origin:bottom;
          transition:transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-link:hover::before, .fs-link.fs-active::before { transform:scaleY(1); }
        .fs-link:hover .fs-link-num  { color:rgba(201,168,76,0.5); }
        .fs-link:hover .fs-link-name { color:#F5F0E8; transform:translateX(8px); }
        .fs-link.fs-active .fs-link-name { color:#C9A84C; }
        .fs-link.fs-active .fs-link-num  { color:rgba(201,168,76,0.35); }

        .fs-link-num {
          font-family:'Inter',sans-serif; font-size:clamp(9px,1.2vw,11px);
          letter-spacing:0.2em; color:rgba(245,240,232,0.18);
          transition:color 0.3s; flex-shrink:0; width:28px;
        }
        .fs-link-name {
          font-family:'Cormorant Garamond',serif;
          font-size:clamp(32px,5.5vw,72px);
          font-weight:300; color:rgba(245,240,232,0.6);
          letter-spacing:-0.5px; line-height:1;
          transition:color 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }

        @media(min-width:768px) {
          .fs-menu { flex-direction:row; }
          .fs-links-col { flex:1; display:flex; flex-direction:column; justify-content:center; }
          .fs-side-col {
            width:320px; border-left:1px solid rgba(201,168,76,0.1);
            display:flex; flex-direction:column; justify-content:space-between;
            padding:80px 48px;
          }
        }
        @media(max-width:767px) {
          .fs-side-col { padding:32px; border-top:1px solid rgba(201,168,76,0.08); }
        }
      `}</style>

      {/* ══════════════════ NAV BAR ══════════════════ */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:50,
        background: navBg,
        backdropFilter: (scrolled || !isHome) ? "blur(24px)" : "none",
        WebkitBackdropFilter: (scrolled || !isHome) ? "blur(24px)" : "none",
        borderBottom: navBorder,
        transition: "background 0.5s ease, border-color 0.5s ease, padding 0.4s ease",
        padding: scrolled ? "14px 0" : isHome ? "24px 0" : "16px 0",
      }}>
        <div style={{
          maxWidth:1320, margin:"0 auto", padding:"0 clamp(20px,4vw,56px)",
          display:"flex", alignItems:"center", justifyContent:"space-between", gap:24,
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{ textDecoration:"none", flexShrink:0 }}>
            <span style={{
              fontFamily:"Cormorant Garamond, serif",
              fontSize:"clamp(18px,1.8vw,24px)",
              fontWeight:300, fontStyle:"italic",
              letterSpacing:"0.06em",
              color:"#F5F0E8",
              transition:"opacity 0.3s",
            }}>
              Solomon{" "}
              <span style={{
                fontWeight:700, fontStyle:"italic",
                background:"linear-gradient(135deg,#E8C96A,#C9A84C,#D4B85E)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text",
              }}>Stephen.</span>
            </span>
          </Link>

          {/* ── Desktop Links ── */}
          <div
            style={{ display:"flex", alignItems:"center", gap:"clamp(16px,2.5vw,36px)" }}
            className="hidden-mobile"
            onMouseLeave={() => setHovered(null)}
          >
            {desktopLinks.map((link) => {
              const isActive = pathname === link.href
              const isFaded = hovered !== null && hovered !== link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  className={`nl${isActive ? " active" : ""}`}
                  style={{
                    fontFamily:"Inter, sans-serif",
                    fontSize:"9px",
                    letterSpacing:"0.28em",
                    textTransform:"uppercase",
                    fontWeight:500,
                    color: isActive
                      ? "#C9A84C"
                      : isFaded
                        ? "rgba(245,240,232,0.2)"
                        : "rgba(245,240,232,0.55)",
                    transition:"color 0.3s ease",
                    textDecoration:"none",
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* ── Right side: Get in touch + Menu btn ── */}
          <div style={{ display:"flex", alignItems:"center", gap:20, flexShrink:0 }}>
            {/* Desktop contact link */}
            <Link
              href="/contact"
              className="hidden-mobile"
              style={{
                fontFamily:"Inter, sans-serif",
                fontSize:"9px",
                letterSpacing:"0.24em",
                textTransform:"uppercase",
                color:"rgba(245,240,232,0.35)",
                textDecoration:"none",
                borderLeft:"1px solid rgba(201,168,76,0.2)",
                paddingLeft:20,
                transition:"color 0.3s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A84C" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(245,240,232,0.35)" }}
            >
              Get in touch
            </Link>

            {/* Menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{
                background:"none", border:"none", cursor:"pointer",
                display:"flex", flexDirection:"column",
                alignItems:"flex-end", gap:"5px",
                padding:"6px", borderRadius:4,
              }}
            >
              <span className="hb-line" style={{
                width:22,
                transform: menuOpen ? "rotate(45deg) translate(0,6px)" : "none",
              }} />
              <span className="hb-line" style={{
                width: menuOpen ? 22 : 14,
                transform: menuOpen ? "rotate(-45deg) translate(0,-6px)" : "none",
              }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Responsive show/hide — inject once */}
      <style>{`
        .hidden-mobile { display:none !important; }
        @media(min-width:768px) { .hidden-mobile { display:flex !important; } }
        @media(min-width:768px) { .hidden-mobile.block-d { display:block !important; } }
      `}</style>

      {/* ══════════════════ FULL-SCREEN MENU ══════════════════ */}
      {menuOpen && (
        <div className="fs-menu">

          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close menu"
            style={{
              position:"absolute", top:20, right:28, zIndex:10,
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"Inter, sans-serif", fontSize:"10px",
              letterSpacing:"0.25em", textTransform:"uppercase",
              color:"rgba(245,240,232,0.4)",
              display:"flex", alignItems:"center", gap:10,
              transition:"color 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#C9A84C" }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(245,240,232,0.4)" }}
          >
            Close
            <span style={{ fontSize:18, lineHeight:1, fontWeight:300 }}>✕</span>
          </button>

          {/* Links column */}
          <div className="fs-links-col" style={{ paddingTop:"80px" }}>
            {allLinks.map((link, i) => {
              const isActive = pathname === link.href
              return (
                <div
                  key={link.href}
                  className="fs-link-wrap"
                  style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                >
                  <Link
                    href={link.href}
                    onClick={close}
                    className={`fs-link${isActive ? " fs-active" : ""}`}
                  >
                    <span className="fs-link-num">{link.num}</span>
                    <span className="fs-link-name">{link.label}</span>
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Side column */}
          <div className="fs-side-col">
            <div>
              <div style={{
                fontFamily:"Inter, sans-serif", fontSize:"8px",
                letterSpacing:"0.38em", textTransform:"uppercase",
                color:"rgba(201,168,76,0.45)", marginBottom:16,
              }}>The Worship Nation</div>
              <div style={{
                fontFamily:"Cormorant Garamond, serif", fontStyle:"italic",
                fontSize:"clamp(20px,2.5vw,28px)", fontWeight:300,
                color:"rgba(245,240,232,0.5)", lineHeight:1.3,
              }}>
                Every season of<br />preparation is a seed<br />
                <span style={{ color:"#C9A84C" }}>for an unseen harvest.</span>
              </div>
            </div>

            <div>
              <div style={{ height:1, background:"rgba(201,168,76,0.15)", marginBottom:24 }} />
              <Link
                href="/studios"
                onClick={close}
                style={{
                  display:"inline-flex", fontFamily:"Inter, sans-serif",
                  fontSize:"10px", letterSpacing:"0.2em", textTransform:"uppercase",
                  color:"#1A2E1A", background:"linear-gradient(135deg,#E8C96A,#C9A84C)",
                  padding:"12px 28px", borderRadius:999, fontWeight:700,
                  textDecoration:"none", transition:"transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 32px rgba(201,168,76,0.4)" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none" }}
              >
                Book a Session
              </Link>
              <div style={{
                fontFamily:"Inter, sans-serif", fontSize:"9px",
                color:"rgba(245,240,232,0.2)", letterSpacing:"0.15em",
                textTransform:"uppercase", marginTop:10,
              }}>TWN Studios · Ajah, Lagos</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
