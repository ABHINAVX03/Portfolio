import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700']
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600']
});

export const metadata = {
  metadataBase: new URL('https://abhinavgupta.dev'),
  title: "Abhinav Gupta | Full Stack Developer — React & Java Spring Boot",
  description:
    "Portfolio of Abhinav Gupta, a Full Stack Developer specializing in React, Next.js, Java Spring Boot, REST APIs and modern web engineering.",
  keywords: ["Full Stack Developer", "React", "Java", "Spring Boot", "Next.js", "Portfolio", "Software Engineer"],
  authors: [{ name: "Abhinav Gupta" }],
  openGraph: {
    title: "Abhinav Gupta | Full Stack Developer",
    description: "Portfolio of Abhinav Gupta, a Full Stack Developer specializing in React, Next.js, Java Spring Boot, and modern web engineering.",
    url: "https://abhinavgupta.dev",
    siteName: "Abhinav Gupta Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhinav Gupta | Full Stack Developer",
    description: "Portfolio of Abhinav Gupta, a Full Stack Developer specializing in React, Next.js, and Java Spring Boot.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
      </head>
      <body>{children}</body>
    </html>
  );
}
