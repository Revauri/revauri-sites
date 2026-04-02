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
  title: "Revauri — Modern Website Redesign for Small Business",
  description:
    "We build fast, mobile-first websites for small businesses. See a free custom redesign of your site before you pay a dime. Start with a free custom redesign sample — no commitment required.",
  metadataBase: new URL("https://revauri.com"),
  openGraph: {
    title: "Revauri — Modern Website Redesign for Small Business",
    description:
      "We build fast, mobile-first websites for small businesses. See a free custom redesign of your site before you pay a dime. Start with a free custom redesign sample — no commitment required.",
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
    <html lang="en" className={`${inter.variable} antialiased`} suppressHydrationWarning>
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
