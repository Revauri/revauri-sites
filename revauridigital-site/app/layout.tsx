import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: "Revauri AI: Follow-ups, inbox, and admin, handled",
  description:
    "Revauri AI builds and runs an AI employee for the digital work that never ends: follow-ups, inbox, reminders. You approve anything a customer will see.",
  metadataBase: new URL("https://revauridigital.com"),
  openGraph: {
    title: "Revauri AI: Follow-ups, inbox, and admin, handled",
    description:
      "Revauri AI builds and runs an AI employee for the digital work that never ends: follow-ups, inbox, reminders. You approve anything a customer will see.",
    url: "https://revauridigital.com",
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
  url: "https://revauridigital.com",
  description:
    "Revauri AI builds and runs an AI employee for the digital work that never ends: follow-ups, inbox, reminders. You approve anything a customer will see.",
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
      className={`${instrumentSans.variable} ${jetbrainsMono.variable} ${fraunces.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-text">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
