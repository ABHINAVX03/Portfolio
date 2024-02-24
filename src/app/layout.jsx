import "./globals.css";

export const metadata = {
  title: "Abhinav Gupta - Portfolio",
  description: "Abhinav Gupta's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" type="image/png" sizes="32x32" />
      <body>{children}</body>
    </html>
  );
}
