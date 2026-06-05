import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Solomon",
  description: "Meet Solomon Stephen — gospel minister, worship leader, music producer, author, and founder of The Worship Nation and TWN Studios in Lagos, Nigeria.",
  alternates: { canonical: "https://solomonstephen.com/about" },
  openGraph: {
    url: "https://solomonstephen.com/about",
    title: "About Solomon Stephen",
    description: "Gospel minister, worship leader, music producer, author, and founder of TWN Studios — Lagos, Nigeria.",
    images: [{ url: 'https://solomonstephen.com/images/about-og.png', width: 1200, height: 630, alt: 'Solomon Stephen — Gospel Minister' }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Solomon Stephen",
    description: "Gospel minister, worship leader, music producer, author, and founder of TWN Studios — Lagos, Nigeria.",
    images: ["https://solomonstephen.com/images/about-og.png"],
    creator: "@theasaphmedia",
  },
}
