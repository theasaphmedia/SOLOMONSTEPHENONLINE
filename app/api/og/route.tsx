import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'Solomon Stephen'
  const sub = searchParams.get('sub') || 'Gospel Minister · Worship Leader · Author'
  const category = searchParams.get('category') || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0D1B0D',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px 72px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Background gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0D1B0D 0%, #1A2E1A 50%, #0A1A0A 100%)', display: 'flex' }} />

        {/* Gold accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(to right, #C9A84C, transparent)', display: 'flex' }} />

        {/* Gold accent line left */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, #C9A84C, transparent)', display: 'flex' }} />

        {/* Watermark */}
        <div style={{ position: 'absolute', top: '48px', left: '72px', fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.5)', display: 'flex' }}>
          Solomon Stephen
        </div>

        {/* Category badge */}
        {category && (
          <div style={{ position: 'absolute', top: '48px', right: '72px', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', padding: '6px 16px', borderRadius: '3px', display: 'flex' }}>
            {category}
          </div>
        )}

        {/* Main content */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '56px', fontWeight: 400, color: '#FAF7F2', lineHeight: 1.05, marginBottom: '20px', letterSpacing: '-0.02em', display: 'flex' }}>
            {title}
          </div>
          <div style={{ fontSize: '20px', color: 'rgba(201,168,76,0.7)', letterSpacing: '0.05em', display: 'flex' }}>
            {sub}
          </div>

          {/* Bottom bar */}
          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '32px', height: '1px', background: '#C9A84C', display: 'flex' }} />
            <div style={{ fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.3)', display: 'flex' }}>
              solomonstephen.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
