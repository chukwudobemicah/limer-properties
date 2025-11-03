"use client";

import React from "react";
import { Phone, MessageCircle, Mail } from "lucide-react";
import { SanityCompanyInfo } from "@/types/sanity";

interface ManagementCTAProps {
  companyInfo: SanityCompanyInfo | null;
}

export default function ManagementCTA({ companyInfo }: ManagementCTAProps) {
  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-6 md:p-8 text-white flex flex-col justify-center">
      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
        Ready to Get Started?
      </h3>
      <p className="text-white/90 mb-6 md:mb-8 text-sm md:text-base">
        Contact us today to discuss how we can help manage your property
        portfolio.
      </p>

      {companyInfo && (
        <div className="space-y-3 md:space-y-4">
          {companyInfo.phone && (
            <a
              href={`tel:${companyInfo.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-center gap-2 md:gap-3 bg-white text-primary px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm md:text-base"
            >
              <Phone size={18} className="md:w-5 md:h-5" />
              Call Us Now
            </a>
          )}

          {companyInfo.phone && (
            <a
              href={`https://wa.me/${companyInfo.phone.replace(
                /\D/g,
                ""
              )}?text=${encodeURIComponent(
                "Hello! I'm interested in your property management services. Please provide more information."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 md:gap-3 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-colors text-sm md:text-base"
            >
              <MessageCircle size={18} className="md:w-5 md:h-5" />
              Message on WhatsApp
            </a>
          )}

          {companyInfo.email && (
            <a
              href={`mailto:${companyInfo.email}?subject=Property Management Services Inquiry`}
              className="flex items-center justify-center gap-2 md:gap-3 bg-white/10 hover:bg-white/20 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-semibold transition-colors border border-white/30 text-sm md:text-base"
            >
              <Mail size={18} className="md:w-5 md:h-5" />
              Send Email
            </a>
          )}
        </div>
      )}

      {!companyInfo && (
        <p className="text-white/80 text-xs md:text-sm">
          Loading contact information...
        </p>
      )}
    </div>
  );
}
