import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    "Limer properties",
    "Limer Estate & Facility Management",
  ],
  authors: [{ name: "Limer Properties" }],
  openGraph: {
    title:
      "Limer Estate & Facility Management - Find Your Dream Home in Nigeria",
    description:
      "Discover the perfect property with Limer Properties. Browse houses for sale, rent, land, and shortlets across Nigeria.",
    type: "website",
    locale: "en_NG",
    siteName: "Limer Estate & Facility Management",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
