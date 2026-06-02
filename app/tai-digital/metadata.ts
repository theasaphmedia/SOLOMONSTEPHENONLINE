import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "TAI Digital - Creative Agency",
  description: "TAI Digital is a creative technology agency building premium digital experiences for ministries, brands, and visionaries - powered by AI and human craft.",
  alternates: { canonical: "https://solomonstephen.com/tai-digital" },
  icons: { icon: '/images/tai-logo.svg', apple: '/images/tai-logo.svg' },
  openGraph: {
    url: "https://solomonstephen.com/tai-digital",
    title: "TAI Digital - Creative Agency",
    description: "Premium digital experiences for ministries, brands, and visionaries. Design, development, and strategy - Lagos, Nigeria.",
    images: [{ url: '/images/solomon-green-blazer-tai.png', width: 1200, height: 630, alt: 'TAI Digital' }]
  }
}
