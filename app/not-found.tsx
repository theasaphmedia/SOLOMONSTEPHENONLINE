import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0D1B0D', padding: '40px 24px', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(96px, 18vw, 160px)', fontWeight: 300, color: 'rgba(201,168,76,.15)', lineHeight: 1, marginBottom: '0' }}>404</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, color: '#FAF7F2', margin: '-16px 0 20px', lineHeight: 1.1 }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(250,247,242,.4)', marginBottom: '40px' }}>
          The page you're looking for may have moved, or the link might be wrong.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', padding: '14px 32px', background: '#C9A84C', color: '#0D1B0D', textDecoration: 'none', display: 'inline-block' }}>
            Go Home
          </Link>
          <Link href="/music" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '.16em', textTransform: 'uppercase', padding: '13px 32px', background: 'transparent', color: 'rgba(250,247,242,.5)', border: '1px solid rgba(250,247,242,.15)', textDecoration: 'none', display: 'inline-block' }}>
            Listen to Music
          </Link>
        </div>
        <div style={{ marginTop: '56px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,.2), transparent)' }} />
        <p style={{ marginTop: '24px', fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '.2em', color: 'rgba(250,247,242,.15)', textTransform: 'uppercase' }}>
          Solomon Stephen · solomonstephen.com
        </p>
      </div>
    </main>
  )
}
