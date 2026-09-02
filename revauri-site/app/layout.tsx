import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { CookieConsent } from "@/components/cookie-consent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// viewport-fit=cover so env(safe-area-inset-*) works for the chat FAB/panel.
// interactiveWidget resizes-content: when the soft keyboard opens, shrink the
// layout viewport so fullscreen UI (chat) reflows with it — standard mobile
// chat pattern on supporting browsers; iOS still uses visualViewport in JS.
export const viewport: Viewport = {
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export const metadata: Metadata = {
  title: "Revauri — The website your business actually deserves",
  description:
    "We design and build custom, conversion-focused websites for businesses that want to stand out online. See a free preview of your site redesign before you spend a dime.",
  metadataBase: new URL("https://www.revauri.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Revauri — The website your business actually deserves",
    description:
      "We design and build custom, conversion-focused websites for businesses that want to stand out online. See a free preview of your site redesign before you spend a dime.",
    url: "https://www.revauri.com",
    siteName: "Revauri",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Revauri",
  legalName: "Revauri LLC",
  url: "https://www.revauri.com",
  email: "joseph@revauri.com",
  description:
    "We design and build custom, conversion-focused websites for businesses that want to stand out online. See a free preview of your site redesign before you spend a dime.",
  areaServed: "US",
  founder: {
    "@type": "Person",
    name: "Joseph Silvagnoli",
  },
  logo: "https://www.revauri.com/logo.png",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Revauri",
  url: "https://www.revauri.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Revauri Blog"
          href="/blog/rss.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Script id="theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
