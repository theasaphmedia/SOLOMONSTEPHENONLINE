'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function LAVISHBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: 'linear-gradient(90deg, #0D1B0D 0%, #1A2E1A 40%, #0D1B0D 100%)',
      borderBottom: '1px solid rgba(201,168,76,0.25)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '10px 48px 10px 16px', gap: '12px', flexWrap: 'wrap',
    }}>
      <span style={{ display:'inline-block', width:'6px', height:'6px', background:'#C9A84C', borderRadius:'50%', animation:'livePulse 1.4s ease-in-out infinite', flexShrink:0 }} />
      <span style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'11px', letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(250,247,242,0.7)' }}>
        New Release · LAVISH — Out Friday, June 6
      </span>
      <Link href="https://play.yivera.com/lavish-solomon-stephen" target="_blank" rel="noopener noreferrer"
        style={{ fontFamily:"'DM Sans',sans-serif", fontSize:'10px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'#0D1B0D', background:'#C9A84C', padding:'6px 16px', textDecoration:'none', borderRadius:'2px', flexShrink:0, transition:'opacity 0.2s' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity='0.85' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity='1' }}
      >Pre-Save Now →</Link>
      <button onClick={() => setDismissed(true)} style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(250,247,242,0.35)', cursor:'pointer', fontSize:'16px', lineHeight:1, padding:'4px' }} aria-label="Dismiss">×</button>
    </div>
  )
}
