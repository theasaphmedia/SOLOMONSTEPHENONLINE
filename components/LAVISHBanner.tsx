'use client'
import { useState, useEffect } from 'react'

export default function LAVISHBanner() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('has-lavish-banner', !dismissed)
    return () => document.body.classList.remove('has-lavish-banner')
  }, [dismissed])

  if (dismissed) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1001,
      height: '36px',
      background: 'linear-gradient(90deg, #0D1B0D 0%, #1A2E1A 50%, #0D1B0D 100%)',
      borderBottom: '1px solid rgba(201,168,76,0.2)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '10px', paddingRight: '36px', paddingLeft: '8px',
      overflow: 'hidden',
    }}>
      <span style={{ display:'inline-block', width:'5px', height:'5px', background:'#C9A84C', borderRadius:'50%', animation:'livePulse 1.4s ease-in-out infinite', flexShrink:0 }} />
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', letterSpacing:'0.16em', textTransform:'uppercase', color:'rgba(250,247,242,0.7)', whiteSpace:'nowrap' }}>
        <span className="banner-full">New Single · LAVISH — Out Friday, June 6, 2026</span>
        <span className="banner-short">LAVISH — Out Friday</span>
      </span>
      <button onClick={() => setDismissed(true)}
        style={{ position:'absolute', right:'8px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(250,247,242,0.4)', cursor:'pointer', fontSize:'16px', lineHeight:1, padding:'4px 6px' }}
        aria-label="Dismiss">×</button>
    </div>
  )
}
