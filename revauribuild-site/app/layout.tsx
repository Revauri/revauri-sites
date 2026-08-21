import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Revauri AI — We build the hire.",
  description:
    "Revauri AI builds an AI employee for the job you hate. We build the workflow around your business and run it, and you stay the boss.",
  metadataBase: new URL("https://revauribuild.com"),
  openGraph: {
    title: "Revauri AI — We build the hire.",
    description:
      "Revauri AI builds an AI employee for the job you hate. We build the workflow around your business and run it, and you stay the boss.",
    url: "https://revauribuild.com",
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
  url: "https://revauribuild.com",
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
      className={`${spaceGrotesk.variable} ${plexMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-charcoal">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
