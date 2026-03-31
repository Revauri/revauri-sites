import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revauri — Modern Website Redesign for Small Business",
  description:
    "We build fast, mobile-first websites for small businesses. See a free custom redesign of your site before you pay a dime. Launch in as little as 7 days.",
  metadataBase: new URL("https://revauri.com"),
  openGraph: {
    title: "Revauri — Modern Website Redesign for Small Business",
    description:
      "We build fast, mobile-first websites for small businesses. See a free custom redesign of your site before you pay a dime. Launch in as little as 7 days.",
    url: "https://revauri.com",
    siteName: "Revauri",
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
