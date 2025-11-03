"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { SanityCompanyInfo } from "@/types/sanity";
import ManagementCTA from "@/component/ManagementCTA";

interface PropertyManagementServicesProps {
  companyInfo: SanityCompanyInfo | null;
}

export default function PropertyManagementServices({
  companyInfo,
}: PropertyManagementServicesProps) {
  return (
    <section
      id="property-management"
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-primary/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3 md:mb-4">
            Property Management Services
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto px-4">
            Are you a landlord looking for professional property management
            services? Let us handle your property while you relax.
          </p>
        </div>

        <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-6 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Benefits */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                Why Partner With Us?
              </h3>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary-lighter p-2 rounded-full mr-3 md:mr-4 mt-0.5 shrink-0">
                    <CheckCircle className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                      Tenant Screening
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Thorough background checks and verification process
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-primary-lighter p-2 rounded-full mr-3 md:mr-4 mt-0.5 shrink-0">
                    <CheckCircle className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                      Rent Collection
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Timely rent collection and transparent reporting
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-primary-lighter p-2 rounded-full mr-3 md:mr-4 mt-0.5 shrink-0">
                    <CheckCircle className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                      Property Maintenance
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Regular inspections and prompt maintenance solutions
                    </p>
                  </div>
                </li>

                <li className="flex items-start">
                  <div className="bg-primary-lighter p-2 rounded-full mr-3 md:mr-4 mt-0.5 shrink-0">
                    <CheckCircle className="text-primary" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm md:text-base">
                      24/7 Support
                    </h4>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Round-the-clock assistance for all property matters
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact CTA */}
            <ManagementCTA companyInfo={companyInfo} />
          </div>
        </div>
      </div>
    </section>
  );
}
