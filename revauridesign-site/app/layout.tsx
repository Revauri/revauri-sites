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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
