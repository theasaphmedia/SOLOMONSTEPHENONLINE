import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Books",
  description: "Read books by Solomon Stephen — The Cost of Ignorance and the Sons, Not Slaves devotional series. Available on Selar.",
  alternates: { canonical: "https://solomonstephen.com/books" },
  openGraph: {
    url: "https://solomonstephen.com/books",
    title: "Books — Solomon Stephen",
    description: "The Cost of Ignorance and Sons, Not Slaves devotional series by Solomon Stephen."
    images: [{ url: '/images/book-cost-of-ignorance.png', width: 1200, height: 630, alt: 'Books by Solomon Stephen' }]
  }
}
