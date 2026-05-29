import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Gallery",
  description: "A visual record of worship moments, ministry gatherings, and studio sessions by Solomon Stephen and The Worship Nation.",
  alternates: { canonical: "https://solomonstephen.com/gallery" },
  openGraph: {
    url: "https://solomonstephen.com/gallery",
    title: "Gallery — Solomon Stephen",
    description: "Worship moments, ministry gatherings, and studio sessions by Solomon Stephen."
    images: [{ url: '/images/gallery-solomon-worship-intense.jpg', width: 1200, height: 630, alt: 'Gallery — Solomon Stephen' }]
  }
}
