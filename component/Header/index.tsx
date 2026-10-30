"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Wordmark from "@/component/Wordmark";
import { MenuIcon, WhatsAppIcon } from "@/component/Icons";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import { getWhatsAppUrl } from "@/lib/contact";
import { cn } from "@/utils/functions";

export const NAV_LINKS = [
  { label: "Buy", href: "/properties?type=sale" },
  { label: "Rent", href: "/properties?type=rent" },
  { label: "Land", href: "/properties?type=land" },
  { label: "Shortlets", href: "/properties?type=shortlet" },
  { label: "Property management", href: "/#property-management" },
  { label: "About", href: "/about" },
];

const INSPECTION_MESSAGE =
  "Hello Limer! I'd like to book a property inspection. When are you available?";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { companyInfo } = useSanityCompanyInfo();

  const whatsappUrl = getWhatsAppUrl(undefined, companyInfo);
  const inspectionUrl = getWhatsAppUrl(INSPECTION_MESSAGE, companyInfo);

  const isActive = (href: string) => href === "/about" && pathname === "/about";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-rule">
      <nav className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-4 md:px-10 xl:px-16 xl:py-[18px]">
        <Wordmark />

        <div className="hidden xl:flex items-center gap-10 text-[15px] font-medium text-ink">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "transition-colors hover:text-cobalt",
                isActive(link.href) && "text-cobalt underline underline-offset-4",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 xl:gap-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2.5 border-[1.5px] border-ink px-[18px] py-[11px] text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <WhatsAppIcon size={18} color="#1FAF55" />
            WhatsApp us
          </a>
          <a
            href={inspectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-cobalt"
          >
            Book an inspection
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="sm:hidden inline-flex h-11 w-11 items-center justify-center border-[1.5px] border-ink"
          >
            <WhatsAppIcon size={20} color="#1FAF55" />
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="xl:hidden inline-flex h-11 w-11 items-center justify-center text-ink"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="xl:hidden border-t border-rule bg-white">
          <div className="mx-auto flex max-w-[1440px] flex-col px-5 pb-6 md:px-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="border-b border-rule py-4 text-[17px] font-medium text-ink"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={inspectionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex justify-center bg-ink px-5 py-4 text-[16px] font-semibold text-white"
            >
              Book an inspection
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
