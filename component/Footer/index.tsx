import React from "react";
import Link from "next/link";
import { COMPANY_DETAILS } from "@/constants/companydetails";

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
          <p className="max-w-[380px] text-[19px] leading-[30px] text-white/80">
            {COMPANY_DETAILS.description}
          </p>
          <div className="flex gap-16 xl:gap-24">
            <FooterColumn title="Properties" links={PROPERTY_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
          </div>
        </div>

        <span
          aria-hidden="true"
          className="block select-none font-extrabold text-white text-[clamp(120px,31.7vw,456px)] leading-[0.79] tracking-[-0.035em]"
        >
          Limer
        </span>

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
