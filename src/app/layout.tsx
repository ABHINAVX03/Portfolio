import React from "react";
import { Newsreader, JetBrains_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/config/site";
import { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Abhinav Gupta",
    default: "Abhinav Gupta | Software Development Engineer",
  },
  description:
    "Engineering portfolio and technical specification drawings of Abhinav Gupta. Java 21, Spring Boot, Kafka, and distributed data systems.",
  keywords: [
    "Software Development Engineer",
    "Java 21",
    "Spring Boot",
    "Kafka",
    "Neo4j",
    "Distributed Systems",
    "Abhinav Gupta",
  ],
  authors: [{ name: "Abhinav Gupta" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  openGraph: {
    title: "Abhinav Gupta | Software Development Engineer",
    description:
      "Engineering portfolio and technical drawing specifications for Abhinav Gupta. Java 21, Spring Boot, Kafka, and distributed systems.",
    url: SITE_URL,
    siteName: "Abhinav Gupta Specification Set",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Gupta | Software Development Engineer",
    description:
      "Engineering portfolio and technical drawings — Java 21, Spring Boot, Kafka, and distributed systems.",
  },
};

import Footer from "@/components/DrawingSheet/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${jetbrainsMono.variable} ${barlowCondensed.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abhinav Gupta",
              url: SITE_URL,
              sameAs: [
                "https://github.com/ABHINAVX03",
                "https://www.linkedin.com/in/abhinav-gupta-367369167/",
              ],
              jobTitle: "Software Development Engineer",
              alumniOf: [
                "Indian Institute of Information Technology Vadodara",
                "Guru Gobind Singh Indraprastha University",
              ],
            }),
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}