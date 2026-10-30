import type { Metadata } from "next";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import FloatingWhatsApp from "@/component/FloatingWhatsApp";
import { ToastProvider } from "@/component/Toast";
import { MotionProvider } from "@/component/Motion";

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
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/inter-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-serif-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/instrument-serif-latin-400-italic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
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
