import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollEffects from "@/components/ScrollEffects";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import LiveBanner from "@/components/LiveBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://solomonstephen.com"),
  title: {
    default: "Solomon Stephen | Worship Leader, Teacher & Studio Founder",
    template: "%s | Solomon Stephen",
  },
  description: "Solomon Stephen is a gospel minister, worship leader, music producer, author, and founder of TWN Studios — Lagos, Nigeria. Experience sacred music, transformative teaching, and world-class studio production.",
  keywords: "Solomon Stephen, worship leader, gospel music, TWN Studios, Lagos, teaching, books, The Worship Nation, MDWE, Synantesis",
  authors: [{ name: "Solomon Stephen" }],
  creator: "Solomon Stephen",
  openGraph: {
    title: "Solomon Stephen | Worship Leader, Teacher & Studio Founder",
    description: "Gospel minister, worship leader, music producer, author, and founder of TWN Studios — Lagos, Nigeria.",
    type: "website",
    url: "https://solomonstephen.com",
    siteName: "Solomon Stephen",
    locale: "en_NG",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solomon Stephen — Worship Leader, Teacher & Studio Founder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solomon Stephen | Worship Leader, Teacher & Studio Founder",
    description: "Gospel minister, worship leader, music producer, author, and founder of TWN Studios — Lagos, Nigeria.",
    images: ["/images/og-image.png"],
    creator: "@thesolomonsteph",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: "https://solomonstephen.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#060e06] text-white antialiased">
        <PageTransition />
        <CustomCursor />
        <ScrollEffects />
        <Navbar />
        <LiveBanner />
        {children}
      </body>
    </html>
  );
}
