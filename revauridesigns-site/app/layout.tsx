import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revauri Designs — Custom Website Redesigns for Growth",
  description:
    "Custom website redesigns that turn visitors into customers. Built for speed, clarity, and results. Web design studio serving businesses across the United States.",
  metadataBase: new URL("https://revauridesigns.com"),
  openGraph: {
    title: "Revauri Designs — Custom Website Redesigns for Growth",
    description:
      "Custom website redesigns that turn visitors into customers. Built for speed, clarity, and results.",
    url: "https://revauridesigns.com",
    siteName: "Revauri Designs",
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
