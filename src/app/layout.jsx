import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://abhinavgupta.dev"),
  title: "Abhinav Gupta | Full Stack Developer — React & Java Spring Boot",
  description:
    "Portfolio of Abhinav Gupta, a Full Stack Developer specializing in React, Next.js, Java Spring Boot, REST APIs and modern web engineering.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Java",
    "Spring Boot",
    "Next.js",
    "Portfolio",
    "Software Engineer",
    "Abhinav Gupta",
  ],
  authors: [{ name: "Abhinav Gupta" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Abhinav Gupta | Full Stack Developer",
    description:
      "Portfolio of Abhinav Gupta, a Full Stack Developer specializing in React, Next.js, Java Spring Boot, and modern web engineering.",
    url: "https://abhinavgupta.dev",
    siteName: "Abhinav Gupta Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        // FIX: was /og-image.png in metadata but /og-image.webp in dead <Head> block — unified to .png
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhinav Gupta — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Gupta | Full Stack Developer",
    description:
      "Portfolio of Abhinav Gupta, a Full Stack Developer specializing in React, Next.js, and Java Spring Boot.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      {/*
        FIX: Removed the <Head> import and block entirely.
        next/head is a Pages Router API — it is silently ignored in the App Router (src/app/).
        All meta tags are already handled correctly by the `metadata` export above.
        The old <Head> block also had a mismatched og:image filename (/og-image.webp vs .png).
      */}
      <head>
        {/* JSON-LD structured data — Person schema for richer Google search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Abhinav Gupta",
              url: "https://abhinavgupta.dev",
              sameAs: [
                "https://github.com/ABHINAVX03",
                "https://www.linkedin.com/in/abhinav-gupta-367369167/",
              ],
              jobTitle: "Full Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance",
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}