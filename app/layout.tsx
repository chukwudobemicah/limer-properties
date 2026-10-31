import type { Metadata } from "next";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import FloatingWhatsApp from "@/component/FloatingWhatsApp";
import { ToastProvider } from "@/component/Toast";
import { MotionProvider } from "@/component/Motion";
import SiteLoader, { LOADER_SCRIPT } from "@/component/SiteLoader";

export const metadata: Metadata = {
  title:
    "Limer Estate & Facility Management LTD - Find Your Dream Home in Nigeria",
  description:
    "Discover the perfect property with Limer Estate & Facility Management. Browse houses for sale, rent, land, and shortlets across Nigeria. Your trusted real estate partner.",
  keywords: [
    "real estate",
    "properties",
    "houses for sale",
    "houses for rent",
    "land",
    "shortlets",
    "Nigeria properties",
    "Lagos properties",
    "Limer Estate And Facility Management LTD",
    "Limer Estate & Facility Management",
  ],
  authors: [{ name: "Limer Estate And Facility Management LTD" }],
  openGraph: {
    title:
      "Limer Estate & Facility Management LTD - Find Your Dream Home in Nigeria",
    description:
      "Discover the perfect property with Limer Estate And Facility Management LTD. Browse houses for sale, rent, land, and shortlets across Nigeria.",
    type: "website",
    locale: "en_NG",
    siteName: "Limer Estate & Facility Management LTD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
        <link rel="preload" href="/images/limer-logo-white.svg" as="image" />
        <link
          rel="preload"
          href="/fonts/inter-tight-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Without JavaScript, show everything (no entrance animations). */}
        <noscript>
          <style>{`.reveal,.intro,.intro-word,.intro-slide,.hero-photo{opacity:1!important;transform:none!important;animation:none!important}#site-loader{display:none!important}.roll-col{transform:translate3d(0,var(--to),0)!important;transition:none!important}`}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <SiteLoader />
        <MotionProvider>
          <ToastProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </ToastProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
