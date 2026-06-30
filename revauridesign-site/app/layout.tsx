import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Revauri Design — Craft Websites for Small Business",
  description:
    "A small web design studio that sweats the details. We build fast, handcrafted websites for US small and medium businesses — on Next.js, Tailwind, and Vercel.",
  metadataBase: new URL("https://revauridesign.com"),
  openGraph: {
    title: "Revauri Design — Craft Websites for Small Business",
    description:
      "A small web design studio that sweats the details. We build fast, handcrafted websites for US small and medium businesses.",
    url: "https://revauridesign.com",
    siteName: "Revauri Design",
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Revauri Design",
  legalName: "Revauri LLC",
  url: "https://revauridesign.com",
  description:
    "A small web design studio building fast, handcrafted websites for US small and medium businesses.",
  areaServed: "US",
  email: "david.mercer@revauridesign.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "725 Joralemon Street, Unit 127",
    addressLocality: "Belleville",
    addressRegion: "NJ",
    postalCode: "07109",
    addressCountry: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-cream text-brand-dark">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
