'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LiveBanner() {
  const [isLive, setIsLive] = useState(false)
  const [liveUrl, setLiveUrl] = useState('https://youtube.com/@thesolomonsteph/live')

  useEffect(() => {
    const checkLive = async () => {
      try {
        // Calls our own API route — key stays on server, never exposed
        const res = await fetch('/api/youtube-live')
        const data = await res.json()
        setIsLive(data.isLive)
        if (data.url) setLiveUrl(data.url)
      } catch {
        setIsLive(false)
      }
    }

    checkLive()
    const interval = setInterval(checkLive, 60000)
    return () => clearInterval(interval)
  }, [])

  if (!isLive) return null

  return (
    <Link
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        top: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(6,14,6,0.97)',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '999px',
        padding: '10px 24px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 20px rgba(201,168,76,0.1)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ position: 'relative', width: '8px', height: '8px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          position: 'absolute', inset: '-2px',
          borderRadius: '50%',
          background: 'rgba(239,68,68,0.35)',
          animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <span style={{
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: '#ef4444',
          boxShadow: '0 0 8px rgba(239,68,68,0.8)',
          display: 'block',
        }} />
      </span>
      <span style={{ color: '#ef4444', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
        Live Now
      </span>
      <span style={{ width: '1px', height: '14px', background: 'rgba(201,168,76,0.25)', flexShrink: 0 }} />
      <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', letterSpacing: '0.04em' }}>
        Join the Worship
      </span>
      <span style={{ color: '#C9A84C', fontSize: '12px' }}>→</span>
    </Link>
  )
}
