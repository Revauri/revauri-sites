import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revauri — Custom Websites for Businesses That Want to Stand Out",
  description:
    "We design and build custom, conversion-focused websites for businesses that want to stand out online. See a free preview of your site redesign before you spend a dime.",
  metadataBase: new URL("https://revauri.com"),
  openGraph: {
    title: "Revauri — Custom Websites for Businesses That Want to Stand Out",
    description:
      "We design and build custom, conversion-focused websites for businesses that want to stand out online. See a free preview of your site redesign before you spend a dime.",
    url: "https://revauri.com",
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
