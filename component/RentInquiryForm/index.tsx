"use client";

import React, { useState } from "react";
import ContactMethodModal from "@/component/ContactMethodModal";
import { SanityCompanyInfo } from "@/types/sanity";

interface RentInquiryFormProps {
  companyInfo: SanityCompanyInfo | null;
}

interface FormData {
  location: string;
  bedrooms: string;
  bathrooms: string;
  budget: string;
  structure: string;
}

export default function RentInquiryForm({ companyInfo }: RentInquiryFormProps) {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: "",
    bedrooms: "",
    bathrooms: "",
    budget: "",
    structure: "",
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowContactOptions(true);
  };

  const { location, bedrooms, bathrooms, budget, structure } = formData;

  const detailsMessage = `Location: ${location || "Any"}
Bedrooms: ${bedrooms || "Any"}
Bathrooms: ${bathrooms || "Any"}
Maximum Budget: ${budget || "Any budget"}
House Structure: ${structure || "Any"}`;

  const emailData = {
    subject: "Property Rental Inquiry",
    message: `Hello! I'm looking for a property to rent.\n\n${detailsMessage}\n\nPlease let me know if you have anything that matches my criteria.\n\nThank you!`,
  };

  const handleContact = (method: "whatsapp" | "email" | "call") => {
    if (!companyInfo) return;

    if (method === "call" && companyInfo.phone) {
      window.location.href = `tel:${companyInfo.phone.replace(/\s+/g, "")}`;
      setShowContactOptions(false);
    } else if (method === "whatsapp" && companyInfo.phone) {
      const whatsappMessage = encodeURIComponent(
        `Hello! I'm looking for a property to rent.\n\n${detailsMessage}\n\nPlease let me know if you have anything that matches my criteria.\n\nThank you!`
      );
      const whatsappUrl = `https://wa.me/${companyInfo.phone.replace(
        /\D/g,
        ""
      )}?text=${whatsappMessage}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setShowContactOptions(false);
      setFormData({
        location: "",
        bedrooms: "",
        bathrooms: "",
        budget: "",
        structure: "",
      });
    }
    // Email is now handled by ContactMethodModal via API
  };

  return (
    <>
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 sm:p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
          Looking for a Property to Rent?
        </h3>
        <p className="text-gray-700 mb-6 text-center text-xs sm:text-sm md:text-base">
          Share your requirements and we&apos;ll find the perfect rental for
          you.
        </p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location */}
            <div className="sm:col-span-2">
              <label
                htmlFor="rent-location"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Location
              </label>
              <input
                id="rent-location"
                type="text"
                value={formData.location}
                onChange={(event) =>
                  handleInputChange("location", event.target.value)
                }
                placeholder="Enter preferred location"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* Bedrooms */}
            <div>
              <label
                htmlFor="rent-bedrooms"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Bedrooms
              </label>
              <input
                id="rent-bedrooms"
                type="text"
                value={formData.bedrooms}
                onChange={(event) =>
                  handleInputChange("bedrooms", event.target.value)
                }
                placeholder="Number of bedrooms"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label
                htmlFor="rent-bathrooms"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Bathrooms
              </label>
              <input
                id="rent-bathrooms"
                type="text"
                value={formData.bathrooms}
                onChange={(event) =>
                  handleInputChange("bathrooms", event.target.value)
                }
                placeholder="Number of bathrooms"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* Budget */}
            <div>
              <label
                htmlFor="rent-budget"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                Maximum Budget
              </label>
              <input
                id="rent-budget"
                type="text"
                value={formData.budget}
                onChange={(event) =>
                  handleInputChange("budget", event.target.value)
                }
                placeholder="Your maximum budget"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>

            {/* House Structure */}
            <div>
              <label
                htmlFor="rent-structure"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2"
              >
                House Structure
              </label>
              <input
                id="rent-structure"
                type="text"
                value={formData.structure}
                onChange={(event) =>
                  handleInputChange("structure", event.target.value)
                }
                placeholder="e.g., Bungalow, Duplex, Flat"
                className="w-full rounded-lg border border-gray-300 bg-white py-2 sm:py-2.5 px-3 sm:px-4 text-xs sm:text-sm text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-primary-dark transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <ContactMethodModal
        isOpen={showContactOptions}
        onClose={() => {
          setShowContactOptions(false);
          setFormData({
            location: "",
            bedrooms: "",
            bathrooms: "",
            budget: "",
            structure: "",
          });
        }}
        companyInfo={companyInfo}
        onSubmit={handleContact}
        emailData={emailData}
      />
    </>
  );
}
