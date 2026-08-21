import type { Metadata } from "next";
import { Newsreader, Source_Sans_3, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans-3",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const description =
  "Revauri AI is an AI employee for the job you hate. Two workflows, designed around how your business already talks to customers. We run them. You stay the boss.";

export const metadata: Metadata = {
  title: "Revauri AI — Designed around your business.",
  description,
  metadataBase: new URL("https://revauristudio.com"),
  openGraph: {
    title: "Revauri AI — Designed around your business.",
    description,
    url: "https://revauristudio.com",
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
  url: "https://revauristudio.com",
  description,
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
      className={`${newsreader.variable} ${sourceSans.variable} ${fraunces.variable} antialiased`}
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
