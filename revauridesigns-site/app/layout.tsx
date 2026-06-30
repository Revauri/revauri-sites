import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
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

export const metadata: Metadata = {
  title: "Revauri Designs — Fast, Modern Websites for US Businesses",
  description:
    "Custom website design and development for small and medium businesses. Built on Next.js, Tailwind, and Vercel. Mobile-first, performance-ready, built to last.",
  metadataBase: new URL("https://revauridesigns.com"),
  openGraph: {
    title: "Revauri Designs — Fast, Modern Websites for US Businesses",
    description:
      "Custom website design and development for small and medium businesses. Built on Next.js, Tailwind, and Vercel.",
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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
