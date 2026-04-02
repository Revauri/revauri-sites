import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revauri Design — Modern Web Design for Small Business",
  description:
    "We design fast, mobile-first websites that help small businesses look as professional online as they are in person. Boutique web design studio based in the US.",
  metadataBase: new URL("https://revauridesign.com"),
  openGraph: {
    title: "Revauri Design — Modern Web Design for Small Business",
    description:
      "We design fast, mobile-first websites that help small businesses look as professional online as they are in person.",
    url: "https://revauridesign.com",
    siteName: "Revauri Design",
    locale: "en_US",
    type: "website",
  },
};

const themeScript = `
  (function() {
    var d = document.documentElement;
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    function apply() {
      var theme = localStorage.getItem('theme');
      if (theme === 'dark' || (!theme && mq.matches)) {
        d.classList.add('dark');
      } else {
        d.classList.remove('dark');
      }
    }
    apply();
    mq.addEventListener('change', apply);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
