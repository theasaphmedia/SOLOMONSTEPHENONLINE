import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Press & Media Kit",
  description: "Press resources, biography, and media kit for Solomon Stephen — gospel minister, worship leader, and founder of The Worship Nation, Lagos, Nigeria.",
  alternates: { canonical: "https://solomonstephen.com/press" },
  openGraph: {
    url: "https://solomonstephen.com/press",
    title: "Press & Media Kit — Solomon Stephen",
    description: "Official press resources and media kit for Solomon Stephen — gospel minister, worship leader, music producer, and author.",
    images: [{ url: '/images/solomon-green-suit-hero.png', width: 1200, height: 630, alt: 'Solomon Stephen — Press Kit' }]
  }
}
