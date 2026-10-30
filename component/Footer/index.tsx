import React from "react";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/constants/companydetails";
import Wordmark from "@/component/Wordmark";
import { Stagger, StaggerItem } from "@/component/Motion";

const PROPERTY_LINKS = [
  { label: "Houses for sale", href: "/properties?type=sale" },
  { label: "Houses for rent", href: "/properties?type=rent" },
  { label: "Land", href: "/properties?type=land" },
  { label: "Shortlets", href: "/properties?type=shortlet" },
];

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Property management", href: "/#property-management" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-14 px-5 pt-20 pb-10 md:px-10 xl:gap-[72px] xl:px-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-6">
            <Wordmark variant="white" />
            <p className="max-w-[380px] text-[19px] leading-[30px] text-white/80">
              {COMPANY_DETAILS.description}
            </p>
          </div>
          <div className="flex gap-16 xl:gap-24">
            <FooterColumn title="Properties" links={PROPERTY_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
          </div>
        </div>

        {/* The clipping wrapper is what's observed, so the slide-up always triggers. */}
        <Stagger className="overflow-hidden">
          <StaggerItem>
            {/*
              Drawn as SVG text stretched to the container (textLength), so it fills
              the width exactly on every screen and can never be cut off, whatever
              font metrics the visitor's computer uses.
            */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 146"
              className="block h-auto w-full overflow-visible select-none"
              preserveAspectRatio="xMinYMin meet"
            >
              <text
                x="2"
                y="114"
                textLength="988"
                lengthAdjust="spacingAndGlyphs"
                fill="#FFFFFF"
                fontFamily="'Inter Tight', ui-sans-serif, system-ui, sans-serif"
                fontWeight={800}
                fontSize="141"
                letterSpacing="-6"
              >
                Limer Properties
              </text>
            </svg>
          </StaggerItem>
        </Stagger>

        <div className="flex flex-col gap-3 border-t border-white/20 pt-6 font-mono text-[12px] tracking-[0.08em] text-white/60 uppercase md:flex-row md:justify-between">
          <span>
            {`© ${year} Limer Estate & Facility Management Ltd`}
          </span>
          <span>RC {COMPANY_DETAILS.rcNumber} · Lagos, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3.5 text-[16px]">
      <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/60">
        {title}
      </span>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className="text-white hover:text-white/70">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
