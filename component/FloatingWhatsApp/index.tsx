"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/component/Icons";
import { useSanityCompanyInfo } from "@/hooks/useSanityCompanyInfo";
import { getWhatsAppUrl } from "@/lib/contact";

/** Sticky "Chat with us" pill, bottom-right on every public page. */
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { companyInfo } = useSanityCompanyInfo();

  if (pathname?.startsWith("/studio")) return null;
  // Property pages have their own sticky enquiry bar on phones.
  const onPropertyPage = pathname?.startsWith("/property/");

  return (
    <a
      href={getWhatsAppUrl(undefined, companyInfo)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`${onPropertyPage ? "max-lg:hidden " : ""}fixed right-4 bottom-4 z-50 inline-flex items-center gap-3 rounded-full bg-wa py-3.5 pr-3.5 pl-3.5 text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(14,19,37,0.22)] transition-transform hover:-translate-y-0.5 sm:right-8 sm:bottom-8 sm:pr-[22px] sm:pl-4`}
    >
      <WhatsAppIcon size={26} color="#FFFFFF" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
