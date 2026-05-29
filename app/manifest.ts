import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Solomon Stephen',
    short_name: 'Solomon Stephen',
    description: 'Gospel Minister · Worship Leader · Author · Studio Founder',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1B0D',
    theme_color: '#C9A84C',
    orientation: 'portrait',
    icons: [
      { src: '/icon.png',       sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
