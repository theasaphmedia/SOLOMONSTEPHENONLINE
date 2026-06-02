import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0D1B0D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        }}
      >
        <div
          style={{
            fontFamily: 'serif',
            fontSize: 16,
            fontWeight: 700,
            color: '#C9A84C',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}
        >
          SS
        </div>
      </div>
    ),
    { ...size }
  )
}
