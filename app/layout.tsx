import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Solomon Stephen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solomon Stephen — Gospel Minister · Worship Leader · Author",
    description: "Gospel minister, worship leader, music producer, and published author. Founder of The Worship Nation and TWN Studios.",
    images: ["/images/og-image.png"],
    creator: "@thesolomonsteph",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://solomonstephen.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
