import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
  title: "Revauri AI — An AI Employee. Cheaper Than a Person.",
  description:
    "An AI employee for the work you'd otherwise put on payroll. We build it, we run it, and after setup it works without you. Less cost, less overhead, more of your time — and more of the money.",
  metadataBase: new URL("https://revauri.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Revauri AI — An AI Employee. Cheaper Than a Person.",
    description:
      "An AI employee for the work you'd otherwise put on payroll. We build it, we run it, and after setup it works without you. Less cost, less overhead, more of your time — and more of the money.",
    url: "https://revauri.ai",
    siteName: "Revauri AI",
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
  name: "Revauri AI",
  legalName: "Revauri LLC",
  url: "https://revauri.ai",
  email: "joseph@revauri.com",
  description:
    "An AI employee for the work you'd otherwise put on payroll. We build it, we run it, and after setup it works without you. Less cost, less overhead, more of your time — and more of the money.",
  areaServed: "US",
  founder: {
    "@type": "Person",
    name: "Joseph Silvagnoli",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Revauri",
    url: "https://revauri.com",
  },
  logo: "https://revauri.ai/logo.svg",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Revauri AI",
  url: "https://revauri.ai",
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
          title="Revauri AI Blog"
          href="/blog/rss.xml"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
