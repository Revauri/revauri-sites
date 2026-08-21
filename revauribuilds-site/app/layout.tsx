import type { Metadata } from "next";
import { Libre_Franklin, Space_Mono, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revauri AI — The jobs a hire can take.",
  description:
    "Revauri AI builds an AI employee for the job you hate. We build the workflow around your business and run it, and you stay the boss.",
  metadataBase: new URL("https://revauribuilds.com"),
  openGraph: {
    title: "Revauri AI — The jobs a hire can take.",
    description:
      "Revauri AI builds an AI employee for the job you hate. We build the workflow around your business and run it, and you stay the boss.",
    url: "https://revauribuilds.com",
    siteName: "Revauri AI",
    locale: "en_US",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Revauri AI",
  legalName: "Revauri LLC",
  url: "https://revauribuilds.com",
  description:
    "Revauri AI builds an AI employee for the job you hate. We build the workflow around your business and run it, and you stay the boss.",
  areaServed: "US",
  email: "joseph@revauri.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "725 Joralemon Street, Unit 127",
    addressLocality: "Belleville",
    addressRegion: "NJ",
    postalCode: "07109",
    addressCountry: "US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${libreFranklin.variable} ${spaceMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-ink">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
