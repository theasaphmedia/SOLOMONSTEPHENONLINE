'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
    // Fire GA4 now that user has consented
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999,
      background: '#0D1B0D', borderTop: '1px solid rgba(201,168,76,0.18)',
      padding: 'clamp(16px,2vw,24px) clamp(20px,4vw,64px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '16px',
      boxShadow: '0 -8px 32px rgba(0,0,0,0.3)',
    }}>
      <p style={{
        fontFamily: "'DM Sans',sans-serif", fontSize: 'clamp(12px,1.2vw,14px)',
        color: 'rgba(250,247,242,0.65)', margin: 0, maxWidth: '640px', lineHeight: 1.7,
      }}>
        We use cookies to understand how visitors use our site (Google Analytics).{' '}
        <Link href="/privacy" style={{ color: '#C9A84C', textDecoration: 'underline' }}>
          Privacy Policy
        </Link>
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button onClick={decline} style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em',
          textTransform: 'uppercase', background: 'none', border: '1px solid rgba(250,247,242,0.2)',
          color: 'rgba(250,247,242,0.45)', padding: '10px 20px', cursor: 'pointer', borderRadius: '2px',
          transition: 'border-color 0.2s, color 0.2s',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,247,242,0.4)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.7)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(250,247,242,0.2)'; (e.currentTarget as HTMLElement).style.color = 'rgba(250,247,242,0.45)' }}
        >
          Decline
        </button>
        <button onClick={accept} style={{
          fontFamily: "'DM Sans',sans-serif", fontSize: '11px', letterSpacing: '0.12em',
          textTransform: 'uppercase', background: '#C9A84C', border: 'none',
          color: '#0D1B0D', padding: '10px 24px', cursor: 'pointer', borderRadius: '2px',
          fontWeight: 600, transition: 'background 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#d4b45a'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#C9A84C'}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
