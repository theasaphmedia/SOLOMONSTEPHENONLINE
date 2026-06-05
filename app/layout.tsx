import type { Metadata } from "next";
import Script from "next/script";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Solomon Stephen",
  "url": "https://solomonstephen.com",
  "image": "https://solomonstephen.com/images/solomon-green-suit-hero.png",
  "sameAs": [
    "https://www.instagram.com/thesolomonsteph",
    "https://www.youtube.com/@thesolomonsteph",
    "https://www.facebook.com/thesolomonsteph",
    "https://www.tiktok.com/@thesolomonsteph",
    "https://open.spotify.com/artist/7l1GQgXjGCQxlXRxIlHnJw",
    "https://music.apple.com/us/artist/solomon-stephen/1206709559"
  ],
  "jobTitle": ["Gospel Minister", "Worship Leader", "Music Producer", "Author"],
  "worksFor": { "@type": "Organization", "name": "The Worship Nation" },
  "address": { "@type": "PostalAddress", "addressLocality": "Lagos", "addressCountry": "NG" },
  "knowsAbout": ["Worship Music", "Gospel Ministry", "Music Production", "Christian Literature"]
}

import "./globals.css";
import Navbar from "@/components/Navbar";
import NavbarConditional from "@/components/NavbarConditional";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AnimationEngine from "@/components/AnimationEngine";
import LAVISHBanner from "@/components/LAVISHBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://solomonstephen.com"),
  title: {
    default: "Solomon Stephen — Gospel Minister · Worship Leader · Author",
    template: "%s | Solomon Stephen",
  },
  description: "Solomon Stephen is a gospel minister, worship leader, music producer, published author, and founder of The Worship Nation (TWN) and TWN Studios — Lagos, Nigeria.",
  keywords: "Solomon Stephen, worship leader, gospel music, TWN Studios, The Worship Nation, Lagos, Nigeria, MDWE, TSH, Synantesis, books, author",
  authors: [{ name: "Solomon Stephen" }],
  creator: "TAI Digital",
  openGraph: {
    title: "Solomon Stephen — Gospel Minister · Worship Leader · Author",
    description: "Gospel minister, worship leader, music producer, and published author. Founder of The Worship Nation and TWN Studios — Lagos, Nigeria.",
    type: "website",
    url: "https://solomonstephen.com",
    siteName: "Solomon Stephen",
    locale: "en_NG",
    images: [{ url: "https://solomonstephen.com/api/og?title=Solomon%20Stephen&sub=Gospel%20Minister%20%C2%B7%20Worship%20Leader%20%C2%B7%20Author", width: 1200, height: 630, alt: "Solomon Stephen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solomon Stephen — Gospel Minister · Worship Leader · Author",
    description: "Gospel minister, worship leader, music producer, and published author. Founder of The Worship Nation and TWN Studios.",
    images: ["https://solomonstephen.com/api/og?title=Solomon%20Stephen&sub=Gospel%20Minister%20%C2%B7%20Worship%20Leader%20%C2%B7%20Author"],
    creator: "@theasaphmedia",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://solomonstephen.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <meta name="google-site-verification" content="AQW8vwOGCRxvzd_dXaEzgCxA8Oy_ac3h_1_5V1cbkjA" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LAVISHBanner />
        {/* Google Analytics GA4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B7SEC9YF6Q"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B7SEC9YF6Q', { page_path: window.location.pathname });
          `}
        </Script>
        {/* Custom LERP cursor — hidden on mobile via CSS */}
        <div className="cursor-dot" aria-hidden="true" />
        <div className="cursor-ring" aria-hidden="true" />
        <NavbarConditional />
        {children}
        <WhatsAppFloat />
        <CookieBanner />
        <AnimationEngine />
      </body>
    </html>
  );
}
