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
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
      </head>
      <body>{children}</body>
    </html>
  );
}
